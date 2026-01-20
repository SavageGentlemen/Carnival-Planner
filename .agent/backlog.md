# Carnival Planner - Feature Backlog

## Nostr Bridge for Bitchat Integration
**Priority**: Medium  
**Effort**: 2-3 days  
**Cost**: Free  

### Goal
Bridge Squad Chat messages to Nostr protocol so Bitchat users can receive them.

### Technical Approach
1. Install `nostr-tools` npm package
2. Generate Nostr keypair per squad (or per user)
3. On message send in `chatService.js`, also publish to public relay
4. Bitchat users subscribe to the squad's Nostr pubkey

### Relays to Use
- `wss://relay.damus.io`
- `wss://nos.lol`
- `wss://relay.nostr.band`

### Implementation Steps
- [ ] Add `nostr-tools` dependency
- [ ] Create `nostrService.js` with publish/subscribe functions
- [ ] Store squad Nostr keypair in Firestore
- [ ] Modify `sendMessage()` to also publish to Nostr
- [ ] Display Nostr pubkey in Road Mode UI for Bitchat users to follow

---

*Created: 2026-01-19*
