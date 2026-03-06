import useSWR from 'swr';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Firestore document fetcher for SWR.
 * Accepts a Firestore path string like "users/abc123" or "userProfiles/xyz".
 * Returns the document data with `id`, or null if not found.
 */
const firestoreDocFetcher = async (path) => {
    if (!path) return null;
    const segments = path.split('/');
    const docRef = doc(db, ...segments);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

/**
 * Firestore collection fetcher for SWR.
 * Accepts a Firestore path string like "users/abc123/apps".
 * Returns an array of documents with `id`.
 */
const firestoreCollectionFetcher = async (path) => {
    if (!path) return [];
    const segments = path.split('/');
    const colRef = collection(db, ...segments);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * SWR hook for a single Firestore document.
 * Data loads instantly from cache on re-mount, revalidates silently in background.
 *
 * @param {string|null} path - Firestore document path (e.g. "userProfiles/uid123")
 * @param {object} options - Additional SWR options
 * @returns {{ data, error, isLoading, mutate }}
 *
 * Usage:
 *   const { data: profile, error } = useFirestoreDoc(user ? `userProfiles/${user.uid}` : null);
 */
export function useFirestoreDoc(path, options = {}) {
    return useSWR(
        path ? `firestore:doc:${path}` : null,
        () => firestoreDocFetcher(path),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 30000, // 30s — prevent duplicate requests
            errorRetryCount: 2,
            ...options,
        }
    );
}

/**
 * SWR hook for a Firestore collection.
 * Caches the entire collection result and revalidates silently.
 *
 * @param {string|null} path - Firestore collection path (e.g. "users/uid123/apps")
 * @param {object} options - Additional SWR options
 * @returns {{ data, error, isLoading, mutate }}
 *
 * Usage:
 *   const { data: events } = useFirestoreCollection(user ? `events` : null);
 */
export function useFirestoreCollection(path, options = {}) {
    return useSWR(
        path ? `firestore:col:${path}` : null,
        () => firestoreCollectionFetcher(path),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 60000, // 60s for collections
            errorRetryCount: 2,
            ...options,
        }
    );
}
