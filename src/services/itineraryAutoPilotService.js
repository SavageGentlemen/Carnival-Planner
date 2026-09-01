import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase.js';

const functions = getFunctions(app);

/**
 * Format a Date object to YYYY-MM-DD
 */
function formatDate(d) {
    return d.toISOString().split('T')[0];
}

/**
 * Local heuristic itinerary generator when offline or functions unavailable
 */
function generateLocalItinerary({ destination, carnivalId, startDate, endDate, pace = 'balanced' }) {
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
    const dayCount = Math.max(3, Math.min(10, Math.round((end - start) / (24 * 60 * 60 * 1000)) + 1));

    const dates = [];
    for (let i = 0; i < dayCount; i++) {
        const cur = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        dates.push(formatDate(cur));
    }

    const templateItems = [
        {
            dayOffset: 0,
            time: "14:00",
            title: `Arrival in ${destination || 'Destination'} & Check-in`,
            category: "Travel",
            priority: "essential",
            venue: "Airport / Stay",
            note: "Unpack, pickup local essentials, test roaming/eSIM and hydrate."
        },
        {
            dayOffset: 0,
            time: "17:30",
            title: "Costume Camp Distribution Window",
            category: "Costume",
            priority: "essential",
            venue: "Band House / Distribution Center",
            note: "Bring photo ID, receipt slip, and original payment card for try-on."
        },
        {
            dayOffset: 1,
            time: "07:30",
            title: "Sunrise Breakfast Fete",
            category: "Fete",
            priority: "essential",
            venue: "Scenic Coastal Venue",
            note: "Wear chic shades and pastel linen. Eat hearty breakfast early!"
        },
        {
            dayOffset: 1,
            time: "14:00",
            title: "Mandatory Squad Rest & Recharge",
            category: "Rest",
            priority: "recommended",
            venue: "Accommodation",
            note: "3-hour sleep and hydration window to pace energy for the night."
        },
        {
            dayOffset: 1,
            time: "20:00",
            title: "Sunset Cooler Fete",
            category: "Fete",
            priority: "recommended",
            venue: "Outdoor Festival Grounds",
            note: "Bring designated plastic bottles and ice in cooler before entry cutoff."
        },
        {
            dayOffset: 2,
            time: "16:00",
            title: "Ultra-Premium All-Inclusive Fete",
            category: "Fete",
            priority: "essential",
            venue: "Estate Grounds",
            note: "Glamour wear. Gourmet Caribbean food stations and drinks included."
        },
        {
            dayOffset: 3,
            time: "03:30",
            title: "Official J'ouvert Morning (Paint, Mud & Oil)",
            category: "Parade",
            priority: "essential",
            venue: "City Streets",
            note: "Wear old sacrificial sneakers and use baby oil before paint hits."
        },
        {
            dayOffset: 3,
            time: "10:30",
            title: "J'ouvert Recovery & Sleep Window",
            category: "Rest",
            priority: "essential",
            venue: "Accommodation",
            note: "Scrub off paint and rest up for Carnival Monday road march."
        },
        {
            dayOffset: 4,
            time: "09:30",
            title: "Carnival Monday Road March (Monday Wear)",
            category: "Parade",
            priority: "essential",
            venue: "Band Route",
            note: "Comfortable Monday wear swimwear/shorts. Track your music truck on Mesh Radar."
        },
        {
            dayOffset: 5,
            time: "08:30",
            title: "Carnival Tuesday — Full Costume Pretty Mas On Stage",
            category: "Parade",
            priority: "essential",
            venue: "Judging Stage / Savannah",
            note: "Full feather backpack, headpiece, and wristbands. The main spectacle!"
        },
        {
            dayOffset: Math.min(dayCount - 1, 6),
            time: "12:00",
            title: "Post-Carnival Cool-Down Lime & Departure",
            category: "Travel",
            priority: "recommended",
            venue: "Beach / Airport",
            note: "Local bake & shark, chill vibes by the water before flight home."
        }
    ];

    return templateItems
        .filter(item => item.dayOffset < dates.length)
        .map((item, idx) => ({
            id: `auto-${Date.now()}-${idx}`,
            title: item.title,
            date: dates[item.dayOffset],
            time: item.time,
            category: item.category,
            priority: item.priority,
            venue: item.venue,
            note: item.note,
            isAutoPilot: true,
            isCustom: false
        }));
}

/**
 * Request smart itinerary generation from Cloud Functions (with local fallback)
 */
export async function generateSmartItinerary({ destination, carnivalId, startDate, endDate, pace = 'balanced', budget = 'moderate' }) {
    try {
        const generateFn = httpsCallable(functions, 'generateSmartItinerary');
        const res = await generateFn({ destination, carnivalId, startDate, endDate, pace, budget });
        if (res.data?.success && Array.isArray(res.data.itinerary)) {
            return {
                success: true,
                source: res.data.source || 'ai_optimized',
                itinerary: res.data.itinerary
            };
        }
    } catch (err) {
        console.warn('[ItineraryAutoPilot] Cloud function call failed, using local generator:', err.message);
    }

    // Local heuristic generator fallback
    const items = generateLocalItinerary({ destination, carnivalId, startDate, endDate, pace, budget });
    return {
        success: true,
        source: 'local_heuristic',
        itinerary: items
    };
}

/**
 * Non-destructive merge: preserves existing custom items, avoids exact duplicates
 */
export function mergeItinerary(existingItems = [], newItems = []) {
    const existingMap = new Set();

    existingItems.forEach(item => {
        const key = `${(item.title || '').trim().toLowerCase()}_${item.date || ''}`;
        existingMap.add(key);
    });

    const itemsToAdd = [];
    newItems.forEach(item => {
        const key = `${(item.title || '').trim().toLowerCase()}_${item.date || ''}`;
        if (!existingMap.has(key)) {
            itemsToAdd.push({
                ...item,
                id: item.id || `sched-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
            });
            existingMap.add(key);
        }
    });

    const merged = [...existingItems, ...itemsToAdd];

    // Sort chronologically
    return merged.sort((a, b) => {
        const dateA = a.date || '9999-99-99';
        const dateB = b.date || '9999-99-99';
        if (dateA !== dateB) return dateA.localeCompare(dateB);
        const timeA = a.time || '00:00';
        const timeB = b.time || '00:00';
        return timeA.localeCompare(timeB);
    });
}
