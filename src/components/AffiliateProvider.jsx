/**
 * AffiliateProvider.jsx — Captures ?ref= affiliate codes from URL parameters
 *
 * Wraps the app to transparently capture affiliate referral codes.
 * Stores the ref code in localStorage with a 30-day attribution window.
 * Provides the active affiliate ref to any child component via context.
 */
import { createContext, useContext, useEffect, useState } from 'react';

const AffiliateContext = createContext({ affiliateRef: null });

const STORAGE_KEY = 'carnival_affiliate_ref';
const STORAGE_TIMESTAMP_KEY = 'carnival_affiliate_ref_ts';
const ATTRIBUTION_WINDOW_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function useAffiliate() {
    return useContext(AffiliateContext);
}

export default function AffiliateProvider({ children }) {
    const [affiliateRef, setAffiliateRef] = useState(null);

    useEffect(() => {
        // 1. Check URL for ?ref= parameter
        const params = new URLSearchParams(window.location.search);
        const urlRef = params.get('ref');

        if (urlRef && urlRef.trim()) {
            // New referral — store it
            const code = urlRef.trim().toUpperCase();
            localStorage.setItem(STORAGE_KEY, code);
            localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
            setAffiliateRef(code);

            // Clean the URL without reloading (remove ?ref= param)
            const url = new URL(window.location.href);
            url.searchParams.delete('ref');
            window.history.replaceState({}, '', url.toString());
            return;
        }

        // 2. Check localStorage for existing referral within attribution window
        const stored = localStorage.getItem(STORAGE_KEY);
        const storedTs = localStorage.getItem(STORAGE_TIMESTAMP_KEY);

        if (stored && storedTs) {
            const elapsed = Date.now() - parseInt(storedTs, 10);
            if (elapsed < ATTRIBUTION_WINDOW_MS) {
                setAffiliateRef(stored);
            } else {
                // Attribution window expired — clean up
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
            }
        }
    }, []);

    return (
        <AffiliateContext.Provider value={{ affiliateRef }}>
            {children}
        </AffiliateContext.Provider>
    );
}
