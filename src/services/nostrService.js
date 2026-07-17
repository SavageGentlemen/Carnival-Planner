import { generateSecretKey, getPublicKey, finalizeEvent } from 'nostr-tools/pure';
import { SimplePool } from 'nostr-tools/pool';
import * as nip19 from 'nostr-tools/nip19';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';

// Default relays to publish to
const DEFAULT_RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.nostr.band'
];

const pool = new SimplePool();

/**
 * Generate a new Nostr keypair.
 * Returns { privateKeyHex, publicKeyHex, npub, nsec }
 */
export const generateNostrKeyPair = () => {
  const sk = generateSecretKey();
  const pk = getPublicKey(sk);
  return {
    privateKeyHex: bytesToHex(sk),
    publicKeyHex: pk,
    npub: nip19.npubEncode(pk),
    nsec: nip19.nsecEncode(sk)
  };
};

/**
 * Encode a hex public key to bech32 npub.
 */
export const encodePubkey = (pubkeyHex) => {
  try {
    return nip19.npubEncode(pubkeyHex);
  } catch (e) {
    console.error("Error encoding npub:", e);
    return pubkeyHex;
  }
};

/**
 * Publish a message to Nostr relays.
 * @param {string} privKeyHex - The private key hex of the squad
 * @param {string} content - The message content
 * @param {Array} tags - Optional tags (e.g. metadata)
 * @param {string[]} relays - Custom relays list
 */
export const publishNostrMessage = async (privKeyHex, content, tags = [], relays = DEFAULT_RELAYS) => {
  try {
    if (!privKeyHex) {
      console.warn("Nostr: No private key provided to publish message.");
      return null;
    }
    const sk = hexToBytes(privKeyHex);
    const eventTemplate = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: tags,
      content: content
    };

    const signedEvent = finalizeEvent(eventTemplate, sk);
    console.log(`Nostr: Publishing event ${signedEvent.id} to relays:`, relays);

    pool.publish(relays, signedEvent);
    
    return signedEvent;
  } catch (err) {
    console.error("Failed to publish Nostr message:", err);
    return null;
  }
};
