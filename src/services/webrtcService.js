/**
 * WebRTC P2P Voice Service
 * Manages peer-to-peer audio connections using Firestore as the signaling server.
 * Designed for squad voice chat — audio-only, mesh topology for ≤6 members.
 */

import { db } from '../firebase';
import {
    collection, doc, setDoc, onSnapshot, deleteDoc, getDocs, addDoc
} from 'firebase/firestore';

const ICE_SERVERS = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
];

/**
 * WebRTC Voice Manager — manages all peer connections for a squad voice session.
 */
export class VoiceManager {
    constructor(squadId, localUid, onPeerStateChange) {
        this.squadId = squadId;
        this.localUid = localUid;
        this.onPeerStateChange = onPeerStateChange; // callback({ peerId, state })
        this.peers = new Map();          // peerId -> { pc, stream }
        this.localStream = null;
        this.signalUnsubs = [];
        this.isMuted = false;
        this.isActive = false;
    }

    /**
     * Start the voice session — acquire mic and begin listening for peers.
     */
    async start() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                },
                video: false,
            });
            this.isActive = true;

            // Announce ourselves in the signaling collection
            await this._announcePresence();

            // Listen for other peers
            this._listenForPeers();

            return { success: true };
        } catch (err) {
            console.error('VoiceManager: Failed to start:', err);
            return { success: false, error: err.message };
        }
    }

    /**
     * Stop all connections and clean up.
     */
    async stop() {
        this.isActive = false;

        // Stop all peer connections
        for (const [peerId, peer] of this.peers) {
            peer.pc?.close();
        }
        this.peers.clear();

        // Stop local audio
        this.localStream?.getTracks().forEach(t => t.stop());
        this.localStream = null;

        // Unsubscribe from signaling listeners
        this.signalUnsubs.forEach(unsub => unsub());
        this.signalUnsubs = [];

        // Clean up signaling docs
        await this._removePresence();
    }

    /**
     * Toggle mute state.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = !this.isMuted;
            });
        }
        return this.isMuted;
    }

    /**
     * Set mute state for a specific peer.
     */
    mutePeer(peerId, muted) {
        const peer = this.peers.get(peerId);
        if (peer?.remoteAudio) {
            peer.remoteAudio.muted = muted;
        }
    }

    // --- Private Methods ---

    _getSignalingRef() {
        return collection(db, 'squads', this.squadId, 'voiceSession');
    }

    async _announcePresence() {
        const ref = doc(this._getSignalingRef(), this.localUid);
        await setDoc(ref, {
            uid: this.localUid,
            joinedAt: Date.now(),
            type: 'presence',
        });
    }

    async _removePresence() {
        try {
            const ref = doc(this._getSignalingRef(), this.localUid);
            await deleteDoc(ref);

            // Clean up offer/answer docs we created
            const offersRef = collection(db, 'squads', this.squadId, 'voiceSession', this.localUid, 'offers');
            const offersSnap = await getDocs(offersRef);
            for (const d of offersSnap.docs) {
                await deleteDoc(d.ref);
            }
        } catch (err) {
            console.log('VoiceManager: Cleanup error (non-fatal):', err.message);
        }
    }

    _listenForPeers() {
        const ref = this._getSignalingRef();
        const unsub = onSnapshot(ref, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                const data = change.doc.data();
                const peerId = change.doc.id;

                if (peerId === this.localUid) return;

                if (change.type === 'added' && data.type === 'presence') {
                    this._connectToPeer(peerId);
                } else if (change.type === 'removed') {
                    this._disconnectPeer(peerId);
                }
            });
        });
        this.signalUnsubs.push(unsub);
    }

    async _connectToPeer(peerId) {
        if (this.peers.has(peerId)) return;
        if (!this.localStream) return;

        const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
        const remoteAudio = new Audio();
        remoteAudio.autoplay = true;

        this.peers.set(peerId, { pc, remoteAudio, state: 'connecting' });
        this.onPeerStateChange?.({ peerId, state: 'connecting' });

        // Add local audio tracks
        this.localStream.getTracks().forEach(track => {
            pc.addTrack(track, this.localStream);
        });

        // Handle remote audio
        pc.ontrack = (event) => {
            remoteAudio.srcObject = event.streams[0];
            this.peers.set(peerId, { ...this.peers.get(peerId), state: 'connected' });
            this.onPeerStateChange?.({ peerId, state: 'connected' });
        };

        // ICE candidate handling via Firestore
        const candidatesRef = collection(
            db, 'squads', this.squadId, 'voiceSession', this.localUid, 'candidates-' + peerId
        );

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                addDoc(candidatesRef, event.candidate.toJSON());
            }
        };

        pc.onconnectionstatechange = () => {
            const state = pc.connectionState;
            if (state === 'disconnected' || state === 'failed') {
                this._disconnectPeer(peerId);
            }
        };

        // Determine who creates the offer (alphabetically lower UID creates offer)
        const isOfferer = this.localUid < peerId;

        if (isOfferer) {
            // Create offer
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            const offerRef = doc(
                db, 'squads', this.squadId, 'voiceSession', peerId, 'offers', this.localUid
            );
            await setDoc(offerRef, {
                type: offer.type,
                sdp: offer.sdp,
                from: this.localUid,
            });

            // Listen for answer
            const answerRef = doc(
                db, 'squads', this.squadId, 'voiceSession', this.localUid, 'offers', peerId
            );
            const answerUnsub = onSnapshot(answerRef, async (snap) => {
                if (!snap.exists()) return;
                const answerData = snap.data();
                if (answerData.type === 'answer' && !pc.currentRemoteDescription) {
                    await pc.setRemoteDescription(new RTCSessionDescription(answerData));
                }
            });
            this.signalUnsubs.push(answerUnsub);
        } else {
            // Listen for offer
            const offerRef = doc(
                db, 'squads', this.squadId, 'voiceSession', this.localUid, 'offers', peerId
            );
            const offerUnsub = onSnapshot(offerRef, async (snap) => {
                if (!snap.exists()) return;
                const offerData = snap.data();
                if (offerData.type === 'offer' && !pc.currentRemoteDescription) {
                    await pc.setRemoteDescription(new RTCSessionDescription(offerData));
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);

                    // Send answer back
                    const answerRef = doc(
                        db, 'squads', this.squadId, 'voiceSession', peerId, 'offers', this.localUid
                    );
                    await setDoc(answerRef, {
                        type: answer.type,
                        sdp: answer.sdp,
                        from: this.localUid,
                    });
                }
            });
            this.signalUnsubs.push(offerUnsub);
        }

        // Listen for remote ICE candidates
        const remoteCandidatesRef = collection(
            db, 'squads', this.squadId, 'voiceSession', peerId, 'candidates-' + this.localUid
        );
        const candidateUnsub = onSnapshot(remoteCandidatesRef, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate).catch(err =>
                        console.log('ICE candidate error:', err.message)
                    );
                }
            });
        });
        this.signalUnsubs.push(candidateUnsub);
    }

    _disconnectPeer(peerId) {
        const peer = this.peers.get(peerId);
        if (peer) {
            peer.pc?.close();
            peer.remoteAudio?.pause();
            if (peer.remoteAudio) peer.remoteAudio.srcObject = null;
            this.peers.delete(peerId);
            this.onPeerStateChange?.({ peerId, state: 'disconnected' });
        }
    }
}

/**
 * Check if WebRTC is supported in the current browser.
 */
export function isWebRTCSupported() {
    return !!(
        window.RTCPeerConnection &&
        navigator.mediaDevices?.getUserMedia
    );
}
