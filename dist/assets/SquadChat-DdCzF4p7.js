import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as collection, q as query, l as limit, i as orderBy, o as onSnapshot, r as ref, u as uploadBytes, g as getDownloadURL, k as serverTimestamp, a as addDoc, d as doc, h as getDoc } from "./vendor-firebase-data-O6IN0zfq.js";
import { c as createLucideIcon, ah as hexToBytes, ai as getPublicKey, aj as finalizeEvent, ak as SimplePool, s as storage, d as db, al as subscribeToLiveStream, X, J as Camera, am as Send, an as startLiveStream, ao as endLiveStream } from "./index-CXUot43X.js";
import SquadLiveStream from "./SquadLiveStream-C8FjuTmo.js";
import { U as User } from "./user-B1jUIL0e.js";
import { V as Video } from "./video-B7OFzPXm.js";
import { I as Image } from "./image-Br-Gm6dl.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./check-LoUvj2UR.js";
import "./copy-DeHw19Y5.js";
import "./minimize-2-BEh34R84.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bot = createLucideIcon("Bot", [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
]);
const RELAYS = [
  "wss://relay.damus.io",
  "wss://nos.lol",
  "wss://relay.nostr.band"
];
const pool = new SimplePool();
class NostrService {
  /**
   * Publish a Squad Chat message to the Nostr network
   */
  static async publishMessage(squadPrivateKeyHex, messageContent) {
    try {
      const sk = hexToBytes(squadPrivateKeyHex);
      const publicKey = getPublicKey(sk);
      let eventTemplate = {
        kind: 1,
        // Kind 1 is a standard text note in Nostr
        pubkey: publicKey,
        created_at: Math.floor(Date.now() / 1e3),
        tags: [],
        content: messageContent
      };
      const event = finalizeEvent(eventTemplate, sk);
      console.log("Publishing event to relays...", event);
      const results = await Promise.allSettled(pool.publish(RELAYS, event));
      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          console.log(`Successfully bridged to ${RELAYS[i]}`);
        } else {
          console.warn(`Failed to bridge to ${RELAYS[i]}`);
        }
      });
      return event;
    } catch (error) {
      console.error("Error publishing to Nostr:", error);
    }
  }
  /**
   * Listen for incoming messages on the Nostr network for a specific squad
   */
  static subscribeToSquad(squadPublicKeyHex, onMessageReceived) {
    console.log(`Opening bridge for squad: ${squadPublicKeyHex}`);
    const sub = pool.subscribeMany(RELAYS, [
      {
        authors: [squadPublicKeyHex],
        kinds: [1]
      }
    ], {
      onevent(event) {
        console.log("Incoming Nostr event:", event);
        onMessageReceived(event);
      },
      oneose() {
        console.log("Historical events loaded. Listening for new messages...");
      }
    });
    return () => {
      sub.close();
      console.log("Nostr bridge connection closed.");
    };
  }
}
let DEMO_MESSAGES = [
  { id: "1", text: "Who's ready for the road?! 🇹🇹", senderId: "2", senderName: "Soca Junkie", createdAt: new Date(Date.now() - 864e5).toISOString(), isBot: false },
  { id: "2", text: "My costume is ready! The Monarch section looks fire 🔥", senderId: "3", senderName: "Fete King", createdAt: new Date(Date.now() - 8e7).toISOString(), isBot: false },
  { id: "3", text: "Just waiting on my flight confirmation.", senderId: "4", senderName: "Carnival Baby", createdAt: new Date(Date.now() - 7e7).toISOString(), isBot: false },
  { id: "4", text: "Welcome to Trinidad! I'm your Carnival Concierge. Ask me anything about fete locations, transport, or safety tips!", senderId: "bot", senderName: "Carnival Concierge", createdAt: new Date(Date.now() - 6e4).toISOString(), isBot: true }
];
const subscribeToMessages = (squadId, isDemoMode, callback) => {
  if (isDemoMode) {
    callback(DEMO_MESSAGES);
    return () => {
    };
  }
  if (!squadId) {
    console.warn("subscribeToMessages aborted: No squadId provided.");
    return () => {
    };
  }
  console.log("Subscribing to messages for squad:", squadId);
  const messagesRef = collection(db, "squads", squadId, "messages");
  const q = query(messagesRef, orderBy("createdAt", "asc"), limit(50));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc2) => ({
      id: doc2.id,
      ...doc2.data(),
      // Handle Firestore Timestamp vs Date vs String
      createdAt: doc2.data().createdAt?.toDate ? doc2.data().createdAt.toDate().toISOString() : (/* @__PURE__ */ new Date()).toISOString()
    }));
    callback(messages);
  }, (error) => {
    console.error("❌ Chat subscription error:", error);
  });
  return unsubscribe;
};
const sendMessage = async (squadId, user, text, imageFile, isDemoMode, callback) => {
  let imageUrl = null;
  if (imageFile) {
    if (isDemoMode) {
      imageUrl = URL.createObjectURL(imageFile);
    } else {
      try {
        const storageRef = ref(storage, `squads/${squadId}/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }
  }
  const messageData = {
    text,
    imageUrl,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString(),
    // 24 Hours from now
    senderId: user.uid || "demo-user",
    senderName: user.displayName || "Me",
    senderPhoto: user.photoURL || null,
    createdAt: isDemoMode ? (/* @__PURE__ */ new Date()).toISOString() : serverTimestamp(),
    isBot: false
  };
  if (isDemoMode) {
    const tempMsg = { id: Date.now().toString(), ...messageData };
    DEMO_MESSAGES = [...DEMO_MESSAGES, tempMsg];
    callback([...DEMO_MESSAGES]);
    setTimeout(() => {
      const aiReply = generateMockAIReply(text || (imageFile ? "Nice photo! 📸" : "..."));
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: aiReply,
        senderId: "bot",
        senderName: "Carnival Concierge",
        senderPhoto: null,
        // We'll handle icon in UI
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        isBot: true
      };
      DEMO_MESSAGES = [...DEMO_MESSAGES, botMsg];
      callback([...DEMO_MESSAGES]);
    }, 1500);
    return;
  }
  if (!squadId) {
    console.warn("sendMessage aborted: No squadId provided.");
    return;
  }
  console.log("Sending message to Firestore...", { squadId, messageData });
  await addDoc(collection(db, "squads", squadId, "messages"), messageData);
  if (!messageData.isBot) {
    try {
      const squadRef = doc(db, "squads", squadId);
      const squadSnap = await getDoc(squadRef);
      if (squadSnap.exists()) {
        const squadData = squadSnap.data();
        if (squadData.nostrPrivKey) {
          console.log("Bridging message to Nostr...");
          await NostrService.publishMessage(squadData.nostrPrivKey, text || (imageFile ? "Sent an image 📸" : ""));
        }
      }
    } catch (err) {
      console.error("Nostr bridge failed:", err);
    }
    setTimeout(async () => {
      const aiReply = generateMockAIReply(text || (imageFile ? "Nice photo! 📸" : "..."));
      const botMsg = {
        text: aiReply,
        senderId: "bot",
        senderName: "Carnival Concierge",
        senderPhoto: null,
        createdAt: serverTimestamp(),
        isBot: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString()
      };
      try {
        await addDoc(collection(db, "squads", squadId, "messages"), botMsg);
        console.log("🤖 AI Concierge replied:", aiReply);
      } catch (err) {
        console.error("Failed to send AI reply:", err);
      }
    }, 2e3);
  }
};
const generateMockAIReply = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes("fete") || lower.includes("party")) {
    return "Based on your schedule, I recommend 'Phuket' on Friday night. It's close to your Airbnb in Woodbrook and tickets are running low! 🎫";
  }
  if (lower.includes("food") || lower.includes("hungry") || lower.includes("eat")) {
    return "You have to try 'Sauce Doubles' in Curepe! Or if you're near the Savannah, check out the corn soup vendor near the exit. 🌽";
  }
  if (lower.includes("transport") || lower.includes("taxi") || lower.includes("uber")) {
    return "Rideshare apps like TT RideShare are reliable. For late nights, I recommend pre-booking a driver for your squad. Safety first! 🚗";
  }
  if (lower.includes("costume") || lower.includes("mas")) {
    return "Costume pickup for Tribe is at the Queen's Park Savannah. Don't forget your distribution slip and ID! 🎭";
  }
  return "That sounds like a vibe! Remember to stay hydrated 💧. Need help with transport or fete tickets?";
};
function SquadChat({ squadId, user, isDemoMode, isPremium }) {
  const [messages, setMessages] = reactExports.useState([]);
  const [inputText, setInputText] = reactExports.useState("");
  const [selectedImage, setSelectedImage] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [activeRoomId, setActiveRoomId] = reactExports.useState(null);
  const [streamHostId, setStreamHostId] = reactExports.useState(null);
  const [showLiveStream, setShowLiveStream] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  console.log("SquadChat Rendered. squadId:", squadId, "User:", user?.uid);
  reactExports.useEffect(() => {
    const effectiveSquadId = isDemoMode ? "demo-squad" : squadId;
    const unsubscribe = subscribeToMessages(effectiveSquadId, isDemoMode, (msgs) => {
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [squadId, isDemoMode]);
  reactExports.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  reactExports.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  reactExports.useEffect(() => {
    if (!squadId || isDemoMode) return;
    const unsubscribe = subscribeToLiveStream(squadId, (liveStream) => {
      if (liveStream?.roomId) {
        setActiveRoomId(liveStream.roomId);
        setStreamHostId(liveStream.hostId || null);
        setShowLiveStream(true);
      } else {
        setActiveRoomId(null);
        setStreamHostId(null);
        setShowLiveStream(false);
      }
    });
    return () => unsubscribe();
  }, [squadId, isDemoMode]);
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;
    const text = inputText;
    const image = selectedImage;
    setInputText("");
    setSelectedImage(null);
    setPreviewUrl(null);
    try {
      const effectiveSquadId = isDemoMode ? "demo-squad" : squadId;
      await sendMessage(effectiveSquadId, user, text, image, isDemoMode, setMessages);
    } catch (err) {
      console.error("Failed to send:", err);
      setInputText(text);
    }
  };
  const handleStartStream = async (roomId) => {
    setActiveRoomId(roomId);
    setShowLiveStream(true);
    if (squadId && user?.uid && !isDemoMode) {
      try {
        await startLiveStream(squadId, user.uid, roomId);
        console.log("Live stream synced to Firestore");
      } catch (err) {
        console.error("Failed to sync stream to Firestore:", err);
      }
    }
  };
  const handleEndStream = async () => {
    setActiveRoomId(null);
    setShowLiveStream(false);
    if (squadId && user?.uid && !isDemoMode) {
      try {
        await endLiveStream(squadId, user.uid);
        console.log("Live stream ended in Firestore");
      } catch (err) {
        console.error("Failed to end stream in Firestore:", err);
      }
    }
  };
  if (!squadId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[300px] items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-gray-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-700 dark:text-gray-200", children: "No Active Squad" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm max-w-xs mx-auto", children: "Join or create a squad above to verify your Road Mode connection and start chatting!" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[65vh] sm:h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center shadow-md z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-full backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "Squad Chat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-purple-100 opacity-90 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse" }),
            "Carnival Concierge Active"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        isPremium && !activeRoomId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowLiveStream(true),
            className: "flex items-center gap-1 px-3 py-1.5 bg-pink-500/80 hover:bg-pink-500 text-white text-xs font-semibold rounded-lg transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3.5 h-3.5" }),
              "Go Live"
            ]
          }
        ),
        activeRoomId && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded animate-pulse", children: "🔴 LIVE" }),
        isDemoMode && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 text-[10px] font-black tracking-widest bg-yellow-400 text-yellow-900 rounded uppercase", children: "Demo" })
      ] })
    ] }),
    (showLiveStream || activeRoomId) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-gray-100 dark:bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SquadLiveStream,
      {
        squadId,
        isPremium,
        isHost: streamHostId === user?.uid || !streamHostId && isPremium,
        activeRoomId,
        onStartStream: handleStartStream,
        onEndStream: handleEndStream
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50", children: [
      messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center h-full text-gray-400 opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No messages yet. Say hi!" }) }) : messages.map((msg) => {
        const isMe = msg.senderId === (user?.uid || "demo-user");
        const isBot = msg.isBot;
        let isExpired = false;
        let expiresAtDate = null;
        if (msg.expiresAt) {
          expiresAtDate = new Date(msg.expiresAt);
          if (/* @__PURE__ */ new Date() > expiresAtDate) isExpired = true;
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex w-full ${isMe ? "justify-end" : "justify-start"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex max-w-[85%] sm:max-w-[80%] gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm 
                    ${isBot ? "bg-gradient-to-br from-pink-500 to-orange-400" : "bg-gray-300 dark:bg-gray-700"}`, children: isBot ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col ${isMe ? "items-end" : "items-start"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 mb-1 ml-1", children: msg.senderName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-2 sm:py-3 rounded-2xl shadow-sm text-sm leading-relaxed relative break-words
                        ${isMe ? "bg-blue-600 text-white rounded-tr-none" : isBot ? "bg-white dark:bg-gray-800 border-l-4 border-pink-500 text-gray-800 dark:text-gray-100 rounded-tl-none" : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none"}
                    `, children: [
                  msg.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: isExpired ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8 mb-1 opacity-50" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs italic", children: "Image expired" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: msg.imageUrl,
                        alt: "Shared",
                        className: "w-48 h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity",
                        onClick: () => window.open(msg.imageUrl, "_blank")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm", children: "⏳ 24h" })
                  ] }) }),
                  msg.text
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 mt-1 opacity-50", children: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
              ] })
            ] })
          },
          msg.id
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSend, className: "p-2 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700", children: [
      previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 relative inline-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewUrl, alt: "Preview", className: "h-20 w-20 object-cover rounded-lg border border-purple-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setSelectedImage(null);
              setPreviewUrl(null);
            },
            className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            ref: fileInputRef,
            onChange: handleFileSelect,
            accept: "image/*",
            className: "hidden"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => fileInputRef.current?.click(),
            className: "p-2 sm:p-3 flex-shrink-0 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors",
            title: "Upload Image (Expires in 24h)",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: inputText,
            onChange: (e) => setInputText(e.target.value),
            placeholder: selectedImage ? "Add caption..." : "Message squad...",
            className: "flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 dark:bg-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 dark:text-white placeholder-gray-400 transition-all text-sm sm:text-base min-w-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: !inputText.trim() && !selectedImage,
            className: "p-2 sm:p-3 flex-shrink-0 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-purple-500/30",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5" })
          }
        )
      ] })
    ] })
  ] });
}
export {
  SquadChat as default
};
