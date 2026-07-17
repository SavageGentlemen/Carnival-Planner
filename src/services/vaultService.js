/**
 * vaultService.js — Client-side service layer for Squad Vault (Sou Sou)
 * Handles Firestore queries + Cloud Function calls for vault operations.
 */
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, onSnapshot, Timestamp, increment
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app, { db } from '../firebase';

const functions = getFunctions(app);

// ── Cloud Function Wrappers ──

/** Create a new vault. Returns { vaultId, success }. */
export async function createVault(data) {
  const fn = httpsCallable(functions, 'createVault');
  const result = await fn(data);
  return result.data;
}

/** Send email invites to join a vault. */
export async function inviteToVault(vaultId, emails) {
  const fn = httpsCallable(functions, 'inviteToVault');
  const result = await fn({ vaultId, emails });
  return result.data;
}

/** Join a vault via invite link/code. */
export async function joinVault(vaultId, inviteCode) {
  const fn = httpsCallable(functions, 'joinVault');
  const result = await fn({ vaultId, inviteCode });
  return result.data;
}

/** Contribute to vault (creates Stripe Checkout session). Returns { checkoutUrl }. */
export async function contributeToVault(vaultId, amount) {
  const fn = httpsCallable(functions, 'contributeToVault');
  const result = await fn({ vaultId, amount });
  return result.data;
}

/** Admin: Request payout from vault. */
export async function requestVaultPayout(vaultId, amount, type, description) {
  const fn = httpsCallable(functions, 'requestVaultPayout');
  const result = await fn({ vaultId, amount, type, description });
  return result.data;
}

/** Admin: Freeze vault. */
export async function freezeVault(vaultId, reason) {
  const fn = httpsCallable(functions, 'freezeVault');
  const result = await fn({ vaultId, reason });
  return result.data;
}

/** Admin: Close vault and refund members. */
export async function closeVault(vaultId) {
  const fn = httpsCallable(functions, 'closeVault');
  const result = await fn({ vaultId });
  return result.data;
}

// ── Firestore Direct Queries ──

/** Get all vaults a user belongs to. Returns unsubscribe function via callback. */
export function subscribeToUserVaults(userId, callback) {
  const vaultsRef = collection(db, 'vaults');
  const q = query(
    vaultsRef,
    where('members', 'array-contains', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const vaults = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(vaults);
  }, (err) => {
    console.error('[VaultService] Error subscribing to user vaults:', err);
    callback([]);
  });
}

/** Subscribe to a single vault's details (real-time). */
export function subscribeToVault(vaultId, callback) {
  const vaultRef = doc(db, 'vaults', vaultId);
  return onSnapshot(vaultRef, (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() });
    } else {
      callback(null);
    }
  }, (err) => {
    console.error('[VaultService] Error subscribing to vault:', err);
    callback(null);
  });
}

/** Subscribe to vault members subcollection. */
export function subscribeToVaultMembers(vaultId, callback) {
  const membersRef = collection(db, 'vaults', vaultId, 'members');
  const q = query(membersRef, orderBy('joinedAt', 'asc'));

  return onSnapshot(q, (snapshot) => {
    const members = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(members);
  }, (err) => {
    console.error('[VaultService] Error subscribing to vault members:', err);
    callback([]);
  });
}

/** Subscribe to vault contributions (recent first). */
export function subscribeToVaultContributions(vaultId, callback) {
  const contribRef = collection(db, 'vaults', vaultId, 'contributions');
  const q = query(contribRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const contributions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(contributions);
  }, (err) => {
    console.error('[VaultService] Error subscribing to contributions:', err);
    callback([]);
  });
}

/** Subscribe to vault payouts. */
export function subscribeToVaultPayouts(vaultId, callback) {
  const payoutsRef = collection(db, 'vaults', vaultId, 'payouts');
  const q = query(payoutsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const payouts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(payouts);
  }, (err) => {
    console.error('[VaultService] Error subscribing to payouts:', err);
    callback([]);
  });
}

/** Get all vaults for admin panel (no member filter). */
export function subscribeToAllVaults(callback) {
  const vaultsRef = collection(db, 'vaults');
  const q = query(vaultsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const vaults = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(vaults);
  }, (err) => {
    console.error('[VaultService] Error subscribing to all vaults:', err);
    callback([]);
  });
}

// ── Utility ──

/** Generate a WhatsApp share link for a vault invite. */
export function getWhatsAppShareLink(vaultName, inviteCode, vaultId) {
  const url = `${window.location.origin}?joinVault=${vaultId}&code=${inviteCode}`;
  const text = `🎭 Join my Squad Vault "${vaultName}" on Carnival Planner!\n\nSave together for carnival — no awkward Venmo texts.\n\n${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Format currency. */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Calculate vault progress percentage. */
export function getVaultProgress(totalSaved, goalAmount) {
  if (!goalAmount || goalAmount <= 0) return 0;
  return Math.min(Math.round((totalSaved / goalAmount) * 100), 100);
}
