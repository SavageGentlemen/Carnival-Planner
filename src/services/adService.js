/**
 * adService.js — Unified ad-serving abstraction
 *
 * Phase A: Serves sponsored ads from Firestore `sponsoredAds` collection.
 * Phase B: Flip AD_SOURCE to 'revive' and point REVIVE_SERVER_URL to
 *          your self-hosted Revive Adserver instance.
 */
import {
    collection, query, where, getDocs, doc, updateDoc, increment, setDoc,
    Timestamp, onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

// ── Configuration ──────────────────────────────────────────────────────
export const AD_SOURCE = 'firestore'; // 'firestore' | 'revive'
export const REVIVE_SERVER_URL = ''; // e.g. 'https://ads.carnival-planner.com'

// ── Zone Definitions (match Revive zone IDs when migrated) ────────────
export const AD_ZONES = {
    'banner-top': { label: 'Top Banner', size: '728x90' },
    'sidebar-right': { label: 'Sidebar Right', size: '300x250' },
    'inline-feed': { label: 'Inline (Between Sections)', size: '468x60' },
    'fete-map': { label: 'Fete Map Overlay', size: '320x50' },
};

// ── Firestore-backed Ad Fetching ──────────────────────────────────────

/**
 * Fetch a single active sponsored ad for a given zone.
 * Returns the best candidate (random from active, un-capped campaigns).
 */
export async function fetchAdForZone(zoneId) {
    if (AD_SOURCE === 'revive') {
        return fetchReviveAd(zoneId);
    }

    try {
        const now = Timestamp.now();
        const adsRef = collection(db, 'sponsoredAds');
        const q = query(
            adsRef,
            where('zone', '==', zoneId),
            where('active', '==', true),
        );

        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;

        // Filter by date range and impression cap
        const candidates = [];
        snapshot.forEach(docSnap => {
            const data = { id: docSnap.id, ...docSnap.data() };
            const startOk = !data.startDate || data.startDate.toMillis() <= now.toMillis();
            const endOk = !data.endDate || data.endDate.toMillis() >= now.toMillis();
            const capOk = !data.impressionCap || (data.impressions || 0) < data.impressionCap;
            if (startOk && endOk && capOk) candidates.push(data);
        });

        if (candidates.length === 0) return null;

        // Weighted random selection (higher-paying ads get priority)
        const totalWeight = candidates.reduce((sum, c) => sum + (c.weight || 1), 0);
        let pick = Math.random() * totalWeight;
        for (const c of candidates) {
            pick -= (c.weight || 1);
            if (pick <= 0) return c;
        }
        return candidates[0];
    } catch (err) {
        console.error('[adService] fetchAdForZone error:', err);
        return null;
    }
}

/**
 * Subscribe to all active sponsored ads (for admin views).
 */
export function subscribeToSponsoredAds(callback) {
    const adsRef = collection(db, 'sponsoredAds');
    return onSnapshot(adsRef, (snapshot) => {
        const ads = [];
        snapshot.forEach(d => ads.push({ id: d.id, ...d.data() }));
        ads.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
        callback(ads);
    });
}

/**
 * Subscribe to all advertisers.
 */
export function subscribeToAdvertisers(callback) {
    const ref = collection(db, 'advertisers');
    return onSnapshot(ref, (snapshot) => {
        const list = [];
        snapshot.forEach(d => list.push({ id: d.id, ...d.data() }));
        list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        callback(list);
    });
}

// ── Impression & Click Tracking ───────────────────────────────────────

/**
 * Record an impression for a sponsored ad.
 * Increments the ad's impression counter and writes to daily analytics.
 */
export async function recordImpression(adId) {
    if (!adId) return;
    try {
        // Increment on the ad doc
        const adRef = doc(db, 'sponsoredAds', adId);
        await updateDoc(adRef, { impressions: increment(1) });

        // Daily analytics bucket
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const analyticsRef = doc(db, 'adAnalytics', `${adId}_${today}`);
        await setDoc(analyticsRef, {
            adId,
            date: today,
            impressions: increment(1),
        }, { merge: true });
    } catch (err) {
        console.error('[adService] recordImpression error:', err);
    }
}

/**
 * Record a click for a sponsored ad.
 */
export async function recordClick(adId) {
    if (!adId) return;
    try {
        const adRef = doc(db, 'sponsoredAds', adId);
        await updateDoc(adRef, { clicks: increment(1) });

        const today = new Date().toISOString().slice(0, 10);
        const analyticsRef = doc(db, 'adAnalytics', `${adId}_${today}`);
        await setDoc(analyticsRef, {
            adId,
            date: today,
            clicks: increment(1),
        }, { merge: true });
    } catch (err) {
        console.error('[adService] recordClick error:', err);
    }
}

// ── Revive Adserver Integration (Phase B) ─────────────────────────────

function fetchReviveAd(zoneId) {
    // Revive async JS invocation — returns a promise that resolves to ad HTML
    // This is a placeholder for Phase B. Revive uses zone IDs like:
    //   <ins data-revive-zoneid="1" data-revive-id="REVIVE_ID"></ins>
    return new Promise((resolve) => {
        if (!REVIVE_SERVER_URL) {
            resolve(null);
            return;
        }
        // In Phase B, fetch from Revive's delivery API
        resolve(null);
    });
}
