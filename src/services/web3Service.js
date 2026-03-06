/**
 * Web3 Service — Wallet management and on-chain interactions
 * Uses ethers.js v6 for MetaMask connection and contract reads.
 * All minting is server-side (Cloud Functions) — this is read-only + wallet auth.
 */
import { ethers } from 'ethers';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// ── Base Chain Config ──
const BASE_MAINNET = {
    chainId: '0x2105',         // 8453
    chainName: 'Base',
    rpcUrls: ['https://mainnet.base.org'],
    blockExplorerUrls: ['https://basescan.org'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
};

const BASE_SEPOLIA = {
    chainId: '0x14a34',       // 84532
    chainName: 'Base Sepolia',
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorerUrls: ['https://sepolia.basescan.org'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
};

// Use testnet in development
const CHAIN_CONFIG = import.meta.env.DEV ? BASE_SEPOLIA : BASE_MAINNET;

// ERC-1155 ABI (read-only subset we need on the client)
const PASSPORT_ABI = [
    'function balanceOf(address account, uint256 id) view returns (uint256)',
    'function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])',
    'function uri(uint256 id) view returns (string)'
];

// Contract address — set after deployment
const CONTRACT_ADDRESS = import.meta.env.VITE_PASSPORT_CONTRACT || '';

// ── Wallet Connection ──

/**
 * Connect to MetaMask or compatible browser wallet.
 * Returns the connected wallet address.
 */
export async function connectExternalWallet() {
    if (!window.ethereum) {
        throw new Error('No wallet detected. Please install MetaMask or a compatible browser wallet.');
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (!accounts || accounts.length === 0) {
            throw new Error('No accounts found. Please unlock your wallet.');
        }

        // Switch to Base chain if not already on it
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: CHAIN_CONFIG.chainId }]
            });
        } catch (switchError) {
            // Chain not added yet — add it
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [CHAIN_CONFIG]
                });
            } else {
                console.warn('Could not switch chain:', switchError);
            }
        }

        return ethers.getAddress(accounts[0]); // checksummed
    } catch (error) {
        if (error.code === 4001) {
            throw new Error('Wallet connection rejected by user.');
        }
        throw error;
    }
}

/**
 * Check if a wallet is currently connected.
 */
export async function getConnectedWallet() {
    if (!window.ethereum) return null;

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });
        return accounts?.[0] ? ethers.getAddress(accounts[0]) : null;
    } catch {
        return null;
    }
}

/**
 * Listen for account and chain changes.
 */
export function onWalletChange(callback) {
    if (!window.ethereum) return () => { };

    const handleAccountsChanged = (accounts) => {
        callback({
            type: 'accountsChanged',
            address: accounts[0] ? ethers.getAddress(accounts[0]) : null
        });
    };

    const handleChainChanged = (chainId) => {
        callback({ type: 'chainChanged', chainId });
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
}

// ── Firestore Wallet Storage ──

/**
 * Save wallet address to user's passport profile.
 */
export async function saveWalletAddress(uid, walletAddress, walletType = 'external') {
    const profileRef = doc(db, 'squad-db', 'passportProfiles', uid);
    try {
        await updateDoc(profileRef, {
            walletAddress: walletAddress,
            walletType: walletType, // 'external' (MetaMask) or 'custodial'
            walletLinkedAt: new Date()
        });
        return true;
    } catch (error) {
        // If document doesn't exist yet, try the direct path
        const altRef = doc(db, `passportProfiles/${uid}`);
        await updateDoc(altRef, {
            walletAddress,
            walletType,
            walletLinkedAt: new Date()
        });
        return true;
    }
}

/**
 * Get wallet address from user's profile.
 */
export async function getWalletAddress(uid) {
    const profileRef = doc(db, 'squad-db', 'passportProfiles', uid);
    try {
        const snap = await getDoc(profileRef);
        return snap.exists() ? snap.data().walletAddress || null : null;
    } catch {
        return null;
    }
}

// ── On-Chain Reads ──

/**
 * Get a read-only provider for the Base chain.
 */
function getProvider() {
    return new ethers.JsonRpcProvider(CHAIN_CONFIG.rpcUrls[0]);
}

/**
 * Get the CarnivalPassport contract (read-only).
 */
function getContract() {
    if (!CONTRACT_ADDRESS) return null;
    return new ethers.Contract(CONTRACT_ADDRESS, PASSPORT_ABI, getProvider());
}

/**
 * Check if a user owns a specific token.
 */
export async function checkTokenOwnership(walletAddress, tokenId) {
    const contract = getContract();
    if (!contract) return false;

    try {
        const balance = await contract.balanceOf(walletAddress, tokenId);
        return balance > 0n;
    } catch {
        return false;
    }
}

/**
 * Get balances for multiple tokens at once.
 */
export async function getTokenBalances(walletAddress, tokenIds) {
    const contract = getContract();
    if (!contract || !tokenIds.length) return {};

    try {
        const addresses = tokenIds.map(() => walletAddress);
        const balances = await contract.balanceOfBatch(addresses, tokenIds);
        const result = {};
        tokenIds.forEach((id, i) => {
            result[id] = Number(balances[i]);
        });
        return result;
    } catch {
        return {};
    }
}

/**
 * Get token metadata URI.
 */
export async function getTokenURI(tokenId) {
    const contract = getContract();
    if (!contract) return null;

    try {
        return await contract.uri(tokenId);
    } catch {
        return null;
    }
}

// ── Helpers ──

/**
 * Truncate wallet address for display: 0x1234...abcd
 */
export function truncateAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Get block explorer URL for a transaction or address.
 */
export function getExplorerUrl(hashOrAddress, type = 'tx') {
    const base = CHAIN_CONFIG.blockExplorerUrls[0];
    return `${base}/${type}/${hashOrAddress}`;
}

/**
 * Check if MetaMask or a compatible wallet is available.
 */
export function isWalletAvailable() {
    return typeof window !== 'undefined' && !!window.ethereum;
}

/**
 * Validate an Ethereum address.
 */
export function isValidAddress(address) {
    try {
        ethers.getAddress(address);
        return true;
    } catch {
        return false;
    }
}

// ── Auto-Generated Invisible Wallets ──

import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

/**
 * Ensure the user has an embedded wallet.
 * If they don't have one, the Cloud Function generates one automatically.
 * Called silently on login — user never sees wallet prompts.
 *
 * @returns {{ walletAddress: string, walletType: string, isNew: boolean }}
 */
export async function ensureAutoWallet() {
    try {
        const functions = getFunctions(app);
        const ensure = httpsCallable(functions, 'ensureWallet');
        const result = await ensure({});
        return result.data;
    } catch (error) {
        console.warn('[Web3] Auto-wallet generation failed:', error.message);
        return null;
    }
}

/**
 * Get the user's wallet address from their profile (Firestore).
 * Tries both Firestore paths used in the app.
 * @returns {string|null} Wallet address or null
 */
export async function getUserWallet(uid) {
    if (!uid) return null;

    // Try primary path
    let address = await getWalletAddress(uid);
    if (address) return address;

    // Try the direct passportProfiles path
    try {
        const profileRef = doc(db, `passportProfiles/${uid}`);
        const snap = await getDoc(profileRef);
        return snap.exists() ? snap.data().walletAddress || null : null;
    } catch {
        return null;
    }
}

