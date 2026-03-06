/**
 * Thirdweb Client Configuration
 * Used for on-chain reads and embedded wallet interactions.
 */
import { createThirdwebClient } from 'thirdweb';

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

if (!clientId) {
    console.warn('[Thirdweb] No VITE_THIRDWEB_CLIENT_ID found in .env');
}

export const thirdwebClient = createThirdwebClient({
    clientId: clientId || '',
});

export default thirdwebClient;
