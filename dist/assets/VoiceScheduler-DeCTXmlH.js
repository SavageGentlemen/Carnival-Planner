import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { M as MicOff } from "./mic-off-WRkOT9w8.js";
import { a as Mic } from "./index-CXUot43X.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const VoiceScheduler = ({ onScheduleDetected }) => {
  const [isListening, setIsListening] = reactExports.useState(false);
  const [transcript, setTranscript] = reactExports.useState("");
  const [feedback, setFeedback] = reactExports.useState("");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return null;
  }
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  const startListening = () => {
    setIsListening(true);
    setFeedback('Listening... Say "Add [Event] for [Day] at [Time]"');
    recognition.start();
  };
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    setTranscript(text);
    setFeedback("Processing...");
    parseCommand(text);
    setIsListening(false);
  };
  recognition.onerror = (event) => {
    console.error("Voice Error:", event.error);
    setIsListening(false);
    setFeedback("Error listening. Try again.");
  };
  const parseCommand = (text) => {
    let eventName = text;
    let eventDay = "";
    let eventTime = "";
    const lower = text.toLowerCase();
    if (lower.startsWith("add") || lower.startsWith("schedule") || lower.startsWith("remind me to")) {
      eventName = text.replace(/^(Add|Schedule|Remind me to)\s+/i, "");
    }
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (const day of days) {
      if (lower.includes(day.toLowerCase())) {
        eventDay = day;
        eventName = eventName.replace(new RegExp(`(on|for)?\\s*${day}`, "i"), "");
      }
    }
    const timeMatch = eventName.match(/(\d{1,2}(?::\d{2})?\s?(?:am|pm)?)/i);
    if (timeMatch) {
      if (timeMatch[0].toLowerCase().includes("am") || timeMatch[0].toLowerCase().includes("pm") || timeMatch[0].includes(":")) {
        eventTime = timeMatch[0];
        eventName = eventName.replace(timeMatch[0], "");
      }
    }
    eventName = eventName.replace(/\s+(at|for|on)\s*$/i, "").trim();
    eventName = eventName.replace(/^\s+(at|for|on)\s+/i, "").trim();
    if (eventName) {
      setFeedback(`Found: ${eventName} (${eventDay || "No Day"} @ ${eventTime || "No Time"})`);
      onScheduleDetected({
        name: eventName,
        day: eventDay || "Friday",
        // Default assumption or leave blank
        time: eventTime || "12:00 PM",
        note: `Voice: "${text}"`
      });
    } else {
      setFeedback("Could not understand event name.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: isListening ? stopListening : startListening,
        className: `
            flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105
            ${isListening ? "bg-red-500 text-white animate-pulse shadow-red-500/50 shadow-lg" : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"}
        `,
        children: [
          isListening ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-5 h-5" }),
          isListening ? "Stop Listening" : "Voice Add Event (Free)"
        ]
      }
    ),
    (transcript || feedback) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: transcript && `"${transcript}"` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-500 mt-1 font-mono", children: feedback })
    ] })
  ] });
};
export {
  VoiceScheduler as default
};
