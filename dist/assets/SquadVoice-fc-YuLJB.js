import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as createLucideIcon, d as db, a as Mic, U as Users } from "./index-CXUot43X.js";
import { c as collection, d as doc, s as setDoc, f as deleteDoc, j as getDocs, o as onSnapshot, a as addDoc } from "./vendor-firebase-data-O6IN0zfq.js";
import { A as AlertCircle } from "./alert-circle-lhG861Pl.js";
import { M as MicOff } from "./mic-off-WRkOT9w8.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PhoneOff = createLucideIcon("PhoneOff", [
  [
    "path",
    {
      d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91",
      key: "z86iuo"
    }
  ],
  ["line", { x1: "22", x2: "2", y1: "2", y2: "22", key: "11kh81" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Phone = createLucideIcon("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Volume2 = createLucideIcon("Volume2", [
  ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", key: "16drj5" }],
  ["path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07", key: "ltjumu" }],
  ["path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14", key: "1kegas" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wifi = createLucideIcon("Wifi", [
  ["path", { d: "M5 13a10 10 0 0 1 14 0", key: "6v8j51" }],
  ["path", { d: "M8.5 16.5a5 5 0 0 1 7 0", key: "sej527" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["line", { x1: "12", x2: "12.01", y1: "20", y2: "20", key: "of4bc4" }]
]);
const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" }
];
class VoiceManager {
  constructor(squadId, localUid, onPeerStateChange) {
    this.squadId = squadId;
    this.localUid = localUid;
    this.onPeerStateChange = onPeerStateChange;
    this.peers = /* @__PURE__ */ new Map();
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
          autoGainControl: true
        },
        video: false
      });
      this.isActive = true;
      await this._announcePresence();
      this._listenForPeers();
      return { success: true };
    } catch (err) {
      console.error("VoiceManager: Failed to start:", err);
      return { success: false, error: err.message };
    }
  }
  /**
   * Stop all connections and clean up.
   */
  async stop() {
    this.isActive = false;
    for (const [peerId, peer] of this.peers) {
      peer.pc?.close();
    }
    this.peers.clear();
    this.localStream?.getTracks().forEach((t) => t.stop());
    this.localStream = null;
    this.signalUnsubs.forEach((unsub) => unsub());
    this.signalUnsubs = [];
    await this._removePresence();
  }
  /**
   * Toggle mute state.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach((track) => {
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
    return collection(db, "squads", this.squadId, "voiceSession");
  }
  async _announcePresence() {
    const ref = doc(this._getSignalingRef(), this.localUid);
    await setDoc(ref, {
      uid: this.localUid,
      joinedAt: Date.now(),
      type: "presence"
    });
  }
  async _removePresence() {
    try {
      const ref = doc(this._getSignalingRef(), this.localUid);
      await deleteDoc(ref);
      const offersRef = collection(db, "squads", this.squadId, "voiceSession", this.localUid, "offers");
      const offersSnap = await getDocs(offersRef);
      for (const d of offersSnap.docs) {
        await deleteDoc(d.ref);
      }
    } catch (err) {
      console.log("VoiceManager: Cleanup error (non-fatal):", err.message);
    }
  }
  _listenForPeers() {
    const ref = this._getSignalingRef();
    const unsub = onSnapshot(ref, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const peerId = change.doc.id;
        if (peerId === this.localUid) return;
        if (change.type === "added" && data.type === "presence") {
          this._connectToPeer(peerId);
        } else if (change.type === "removed") {
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
    this.peers.set(peerId, { pc, remoteAudio, state: "connecting" });
    this.onPeerStateChange?.({ peerId, state: "connecting" });
    this.localStream.getTracks().forEach((track) => {
      pc.addTrack(track, this.localStream);
    });
    pc.ontrack = (event) => {
      remoteAudio.srcObject = event.streams[0];
      this.peers.set(peerId, { ...this.peers.get(peerId), state: "connected" });
      this.onPeerStateChange?.({ peerId, state: "connected" });
    };
    const candidatesRef = collection(
      db,
      "squads",
      this.squadId,
      "voiceSession",
      this.localUid,
      "candidates-" + peerId
    );
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(candidatesRef, event.candidate.toJSON());
      }
    };
    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      if (state === "disconnected" || state === "failed") {
        this._disconnectPeer(peerId);
      }
    };
    const isOfferer = this.localUid < peerId;
    if (isOfferer) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      const offerRef = doc(
        db,
        "squads",
        this.squadId,
        "voiceSession",
        peerId,
        "offers",
        this.localUid
      );
      await setDoc(offerRef, {
        type: offer.type,
        sdp: offer.sdp,
        from: this.localUid
      });
      const answerRef = doc(
        db,
        "squads",
        this.squadId,
        "voiceSession",
        this.localUid,
        "offers",
        peerId
      );
      const answerUnsub = onSnapshot(answerRef, async (snap) => {
        if (!snap.exists()) return;
        const answerData = snap.data();
        if (answerData.type === "answer" && !pc.currentRemoteDescription) {
          await pc.setRemoteDescription(new RTCSessionDescription(answerData));
        }
      });
      this.signalUnsubs.push(answerUnsub);
    } else {
      const offerRef = doc(
        db,
        "squads",
        this.squadId,
        "voiceSession",
        this.localUid,
        "offers",
        peerId
      );
      const offerUnsub = onSnapshot(offerRef, async (snap) => {
        if (!snap.exists()) return;
        const offerData = snap.data();
        if (offerData.type === "offer" && !pc.currentRemoteDescription) {
          await pc.setRemoteDescription(new RTCSessionDescription(offerData));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          const answerRef = doc(
            db,
            "squads",
            this.squadId,
            "voiceSession",
            peerId,
            "offers",
            this.localUid
          );
          await setDoc(answerRef, {
            type: answer.type,
            sdp: answer.sdp,
            from: this.localUid
          });
        }
      });
      this.signalUnsubs.push(offerUnsub);
    }
    const remoteCandidatesRef = collection(
      db,
      "squads",
      this.squadId,
      "voiceSession",
      peerId,
      "candidates-" + this.localUid
    );
    const candidateUnsub = onSnapshot(remoteCandidatesRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate).catch(
            (err) => console.log("ICE candidate error:", err.message)
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
      this.onPeerStateChange?.({ peerId, state: "disconnected" });
    }
  }
}
function isWebRTCSupported() {
  return !!(window.RTCPeerConnection && navigator.mediaDevices?.getUserMedia);
}
function SquadVoice({ squadId, userId, userName, isPremium, squadMembers = [] }) {
  const [isInCall, setIsInCall] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [peerStates, setPeerStates] = reactExports.useState({});
  const [error, setError] = reactExports.useState(null);
  const voiceManagerRef = reactExports.useRef(null);
  const supported = isWebRTCSupported();
  const handlePeerStateChange = reactExports.useCallback(({ peerId, state }) => {
    setPeerStates((prev) => ({ ...prev, [peerId]: state }));
  }, []);
  const startCall = async () => {
    if (!supported || !squadId || !userId) return;
    setError(null);
    const manager = new VoiceManager(squadId, userId, handlePeerStateChange);
    voiceManagerRef.current = manager;
    const result = await manager.start();
    if (result.success) {
      setIsInCall(true);
    } else {
      setError(result.error || "Failed to start voice chat. Check microphone permissions.");
    }
  };
  const endCall = async () => {
    if (voiceManagerRef.current) {
      await voiceManagerRef.current.stop();
      voiceManagerRef.current = null;
    }
    setIsInCall(false);
    setIsMuted(false);
    setPeerStates({});
  };
  const toggleMute = () => {
    if (voiceManagerRef.current) {
      const muted = voiceManagerRef.current.toggleMute();
      setIsMuted(muted);
    }
  };
  reactExports.useEffect(() => {
    return () => {
      if (voiceManagerRef.current) {
        voiceManagerRef.current.stop();
      }
    };
  }, []);
  const connectedPeers = Object.entries(peerStates).filter(([, s]) => s === "connected").length;
  const connectingPeers = Object.entries(peerStates).filter(([, s]) => s === "connecting").length;
  if (!isPremium) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎙️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-amber-900 dark:text-amber-300", children: "Squad Voice Chat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 dark:text-amber-400", children: "Talk to your squad hands-free with P2P voice — no cell service needed" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 text-[10px] font-bold bg-amber-500 text-white rounded-full uppercase", children: "Premium" })
    ] }) });
  }
  if (!supported) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Voice chat requires a browser with WebRTC support (Chrome, Safari, Firefox)." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl border border-indigo-200 dark:border-indigo-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-3 flex items-center justify-between ${isInCall ? "bg-gradient-to-r from-indigo-600 to-purple-600" : "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/30 dark:to-purple-900/30"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: `w-4 h-4 ${isInCall ? "text-white" : "text-indigo-600 dark:text-indigo-400"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-bold ${isInCall ? "text-white" : "text-indigo-800 dark:text-indigo-300"}`, children: "Squad Voice" }),
        isInCall && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white font-medium", children: "LIVE" })
        ] })
      ] }),
      isInCall && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-white/80 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          connectedPeers,
          " connected"
        ] }),
        connectingPeers > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/50", children: [
          "(",
          connectingPeers,
          " joining...)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-white dark:bg-gray-800", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: error }) }),
      !isInCall ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-3", children: "Start a voice call with your squad — P2P, no data plan needed once connected." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: startCall,
            disabled: !squadId,
            className: "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
              "Start Voice Chat"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        Object.entries(peerStates).length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Object.entries(peerStates).map(([peerId, state]) => {
          const member = squadMembers.find((m) => m.uid === peerId || m.id === peerId);
          const name = member?.displayName || member?.name || peerId.slice(0, 8);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2 h-2 rounded-full ${state === "connected" ? "bg-green-500" : state === "connecting" ? "bg-amber-500 animate-pulse" : "bg-gray-400"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 flex-1", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 uppercase", children: state }),
            state === "connected" && /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-3.5 h-3.5 text-green-500" })
          ] }, peerId);
        }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-4 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Waiting for squad members to join..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: toggleMute,
              className: `p-3 rounded-full transition-all ${isMuted ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`,
              children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: endCall,
              className: "p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-500/30",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "w-5 h-5" })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  SquadVoice as default
};
