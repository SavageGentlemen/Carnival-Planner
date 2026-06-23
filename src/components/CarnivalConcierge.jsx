import React, { useState, useEffect, useRef } from 'react';

// Curated Local Knowledge Bases for each country/carnival
const COUNTRY_CONFIGS = {
  trinidad: {
    name: "Trinidad",
    displayName: "Trinidad Carnival",
    flag: "🇹🇹",
    welcome: "👋 Welcome to Trinidad! I'm your local Carnival Concierge. Ask me anything about fete locations, transport, costume pickup, or the best doubles spots!",
    keywords: ["doubles", "shark", "maracas", "curepe", "savannah", "woodbrook"],
    knowledge: {
      fetes: "Trinidad Carnival has legendary fetes! Here are the top ones for your schedule:\n\n1. **Soca Brainwash** (Saturdays, absolute staple) 🍹\n2. **AM Bush** (Saturdays, dirty mas/paint & powder) 🎨\n3. **Phuket** (Friday, ultra-premium all-inclusive) 🍾\n4. **Soaka Street Festival** (Sunday, high-energy rhythm & iron) 🥁\n\n*Pro-tip: Buy tickets early as they sell out fast on committee sites!*",
      food: "Trinidad's street food is world-famous. You must try:\n\n1. **Doubles:** Two baras (flat fried dough) filled with channa (chickpeas). Check out *Sauce Doubles* in Curepe or the stalls around the Savannah! 🌽\n2. **Bake & Shark:** Crispy fried shark meat in a fried bake, loaded with garlic sauce, chadon beni, and tamarind. Head to *Maracas Bay* for the original! 🦈\n3. **Corn Soup:** Thick, spicy split pea soup with corn, dumplings, and provisions. Best enjoyed hot after a late-night fete near the Savannah. 🥣",
      transport: "Getting around during Carnival can be hectic. Here are safety and transit tips:\n\n1. **Rideshare:** Use local rideshare apps like **TT RideShare** or **Travelr**. They are safer and have tracked fares. 🚗\n2. **Private Drivers:** For squad groups, it is highly recommended to pre-book a registered driver for late-night fete returns. 🤝\n3. **Red Band Maxi Taxis:** Cheap and routes run along the Eastern Main Road, but can get extremely crowded during peak road times. 🚌\n\n*Safety note: Never walk alone at night; always travel with your squad!*",
      costumes: "Costume distribution guidelines:\n\n1. **Tribe / Bliss / Lost Tribe:** Collection takes place at the **Queen's Park Savannah** distribution center. 🎭\n2. **What to bring:** You *must* present your costume distribution slip, the original credit card used for payment, and your national ID/Passport. 🎫\n3. **Pick-up by proxy:** If someone else is collecting for you, write an authorization letter and provide a copy of your ID. 📝",
      safety: "Stay safe on the road:\n\n1. **Hydration:** The Caribbean sun is intense. Drink coconut water and carry a reusable water bottle. 💧\n2. **Valuables:** Keep your phone in a secure pouch/fanny pack under your costume. Avoid wearing expensive jewelry. 🔒\n3. **Squad Sync:** Stay close to your band's security fence. Use the app's **Road Mode SOS** feature if you get separated from your squad! 🚨"
    },
    chips: [
      { label: "🎟️ Fetes", prompt: "Tell me about fetes tonight" },
      { label: "🌽 Doubles & Food", prompt: "Where can I find the best doubles?" },
      { label: "🚗 Transit Tips", prompt: "Tips for transport and safety" },
      { label: "🎭 Costume Info", prompt: "Costume pickup distribution guidelines" }
    ]
  },
  jamaica: {
    name: "Jamaica",
    displayName: "Jamaica Carnival",
    flag: "🇯🇲",
    welcome: "👋 Welcome to Jamaica! I'm your local Jamaica Carnival Concierge. Ask me anything about fete locations, transport, costume pickup, or where to get the best jerk chicken!",
    keywords: ["jerk", "kingston", "xodus", "yard mas", "genxs", "constant spring"],
    knowledge: {
      fetes: "Jamaica Carnival has incredible energy! Some must-attend events are:\n\n1. **Sunrise Breakfast Party** (A major highlight of Carnival week) 🍳\n2. **Frenchmen** (Ultra-premium event, incredible vibe) 🍾\n3. **A.M.B.U.S.H. Jamaica** (High-energy J'ouvert) 🎨\n4. **PM Fete** (Great vibes, late night) 🍹",
      food: "Jamaica's culinary scene is outstanding. Make sure to try:\n\n1. **Jerk Chicken/Pork:** Spiced and smoked over pimento wood. Best from roadside jerk pan drums in Kingston! 🍗\n2. **Ackee & Saltfish:** Jamaica's national dish, savory and delicious, served with fried dumplings or festival. 🥟\n3. **Devon House Ice Cream:** Grab a scoop of local flavors like Gravenstein Mango or Rum & Raisin in Kingston. 🍦",
      transport: "Transportation tips for Kingston during Carnival:\n\n1. **Registered Taxis:** Look for official **red plate** taxis for safety. 🚗\n2. **Private Shuttles:** Pre-booking a private driver/shuttle for your squad is highly recommended for late-night fete runs. 🚐\n3. **Rideshares:** Use reputable rideshare services locally if available. 📱",
      costumes: "Jamaica Costume Collection info:\n\n1. **Bands:** Xodus, GenXS, and Yard Mas are the top bands. 🎭\n2. **Mas Camps:** Collections happen at the respective mas camps/distribution sites in Kingston. 🏢\n3. **What to bring:** Bring your printed receipt, the purchasing credit card, and a valid government-issued ID. 🎫",
      safety: "Road safety and health:\n\n1. **Squad Coordination:** Kingston crowds are large. Agree on meet-up spots and keep your squad sync active. 👥\n2. **Stay Hydrated:** Drink plenty of water and sports drinks. 💧\n3. **Valuables:** Carry cash and phone in a secure under-costume pouch. Avoid flashing large amounts of cash. 🔒"
    },
    chips: [
      { label: "🎟️ Fetes", prompt: "Tell me about Jamaica Carnival fetes" },
      { label: "🍗 Jerk & Food", prompt: "Where are the best spots for jerk chicken?" },
      { label: "🚗 Transport", prompt: "How do I safely get around Kingston?" },
      { label: "🎭 Costume Pickup", prompt: "Where do I pick up GenXS or Xodus costumes?" }
    ]
  },
  stlucia: {
    name: "St. Lucia",
    displayName: "St. Lucia Carnival",
    flag: "🇱🇨",
    welcome: "👋 Welcome to Saint Lucia! I'm your St. Lucia Carnival Concierge. Ask me about Remedy, beach fetes, transport, costume collection, or local food like green fig and saltfish!",
    keywords: ["gros islet", "remedy", "just 4 fun", "xuvo", "legends", "rodney bay", "castries"],
    knowledge: {
      fetes: "St. Lucia Carnival features breathtaking scenic fetes! Key events include:\n\n1. **Remedy** (Famous beach fete/coolers allowed) 🏖️\n2. **Mess** (Paint, powder, mud J'ouvert) 🎨\n3. **Indulgence** (Scenic breakfast fete) 🍳\n4. **Brazen** (High energy party) 🍹",
      food: "Taste the unique Saint Lucian flavors:\n\n1. **Green Fig & Saltfish:** St. Lucia's national dish made with green bananas and salted codfish. 🍌\n2. **Bouillon:** A hearty local stew with meat, dumplings, and ground provisions. 🍲\n3. **Fresh Seafood:** Head to the **Gros Islet Friday Night Street Party** or Anse La Raye for delicious grilled fish! 🐟",
      transport: "Transit tips around Rodney Bay and Castries:\n\n1. **Authorized Taxis:** Use taxis with **green license plates** (official tourist transport). 🚕\n2. **Minibuses:** Minibuses (like Route 1A running Castries to Gros Islet) are affordable, but can be crowded. 🚌\n3. **Squad Drivers:** Pre-booking a private driver for late-night fete returns is safest. 🤝",
      costumes: "St. Lucia Costume Pick-up details:\n\n1. **Bands:** Just 4 Fun, Legends, and Xuvo Mas. 🎭\n2. **Collection:** Done at the band houses or designated hotel conference rooms in Rodney Bay. 🏢\n3. **Bring:** Your collection slip, ID, and the original payment card. 🎫",
      safety: "Road safety guidelines:\n\n1. **Heat Warning:** Saint Lucia is extremely humid. Drink local piton water or coconut water. 💧\n2. **Gros Islet Street Party:** Keep valuables zipped in front pockets. Stay with your squad. 🚨\n3. **Road March:** Stay inside the band security lines on the highway. 🚧"
    },
    chips: [
      { label: "🎟️ Fetes", prompt: "What are the main St. Lucia Carnival fetes?" },
      { label: "🍌 Fig & Saltfish", prompt: "Where can I try green fig and saltfish?" },
      { label: "🚗 Green Plates", prompt: "How do I hire a green plate taxi?" },
      { label: "🎭 Band Pickup", prompt: "How does Just 4 Fun costume pickup work?" }
    ]
  },
  barbados: {
    name: "Barbados",
    displayName: "Crop Over (Barbados)",
    flag: "🇧🇧",
    welcome: "👋 Welcome to Barbados! I'm your Crop Over Concierge. Ask me about the best beach fetes, Cohobblopot, costume pickup, or local delicacies like flying fish and cou-cou!",
    keywords: ["crop over", "kadooment", "foreday", "bridgetown", "oistins", "spring garden", "flying fish"],
    knowledge: {
      fetes: "Crop Over is the sweet summer festival! Must-attend events include:\n\n1. **Cohobblopot** (Huge stage show with masquerade and live music) 🎭\n2. **Foreday Morning Jam** (Mud, paint, cocoa, late-night J'ouvert jump) 🎨\n3. **Lifted / Mimosa** (Premium all-inclusive breakfast fetes) 🍳\n4. **Scorch Crop Over** (High energy fete) 🍹",
      food: "Barbados local eats are top tier:\n\n1. **Flying Fish & Cou-Cou:** The national dish—steamed flying fish in spicy gravy served with cornmeal and okra. 🐟\n2. **Fish Cakes:** Spicy, deep-fried saltfish batter. Get them hot from **Oistins Fish Fry** on Friday night! 🧆\n3. **Macaroni Pie:** Bajan baked macaroni pie is cheesy and packed with flavor. 🥧",
      transport: "Getting around Barbados:\n\n1. **ZR Vans:** Small white vans with maroon stripes (Route 11 for South Coast) are fast and cheap. 🚐\n2. **Z-Plate Taxis:** Official registered taxis have 'Z' on their license plates. 🚕\n3. **Yellow Buses:** Loud, fun, local transport buses. 🚌",
      costumes: "Grand Kadooment Costume distribution:\n\n1. **Bands:** Aura, Zulu, Baje International, Blue Box Cart. 🎭\n2. **Showrooms:** Collections happen at the bands' mas camps or showrooms around Bridgetown. 🏢\n3. **Documents:** Passport/ID, receipt, and payment verification are required. 🎫",
      safety: "Road safety and health:\n\n1. **Grand Kadooment Day:** The march goes down the Mighty Grynner Highway. Hydration is vital! 💧\n2. **Sun Protection:** The Bajan sun is intense. Use high-SPF sunblock. ☀️\n3. **Valuables:** Carry a secure fanny pack or neck pouch. Avoid wearing expensive jewelry. 🔒"
    },
    chips: [
      { label: "🎟️ Crop Over Fetes", prompt: "Tell me about Cohobblopot and Foreday Morning" },
      { label: "🐟 Flying Fish", prompt: "Where can I try flying fish and fish cakes?" },
      { label: "🚐 ZR Vans & Transit", prompt: "How do ZR vans work in Barbados?" },
      { label: "🎭 Costume Pickup", prompt: "Where do I pick up my Kadooment costume?" }
    ]
  },
  tobago: {
    name: "Tobago",
    displayName: "Tobago Carnival",
    flag: "🇹🇹",
    welcome: "👋 Welcome to Tobago! I'm your Tobago Carnival Concierge. Ask me about Fog Angels J'ouvert & Mas packages, Pigeon Point fetes, transport, or where to get local crab & dumpling!",
    keywords: ["fog angels", "pigeon point", "scarborough", "bon accord", "crab and dumpling", "tobago", "store bay"],
    knowledge: {
      fetes: "Tobago Carnival has wonderful beach and road events! Top ones include:\n\n1. **Wave & Rave Boat Party** (Thursday before parade) ⛵\n2. **Fog Angels J'ouvert** (Paint, mud & powder, Friday morning) 🎨\n3. **Beach to Beach Parade** (Scenic Scarborough to Pigeon Point road march) 🏖️\n4. **Pretty Mas Parade** (Sunday showpiece) 🎭",
      food: "Tobago's food is delicious. You must try:\n\n1. **Curry Crab & Dumpling:** The absolute signature dish of Tobago! Check out the food huts at *Store Bay* or *Pigeon Point*. 🦀\n2. **Benne Balls:** Sweet crunchy treats made of sesame seeds (benne) and brown sugar. 🧆\n3. **Dirt Oven Bread:** Traditional baking in clay dirt ovens, incredibly soft oven fresh. 🍞",
      transport: "Transit tips for Tobago:\n\n1. **Authorized Taxis:** Look for license plates starting with **H** (hired). Always confirm the fare before departing Store Bay or Crown Point. 🚕\n2. **Car Rentals:** Highly recommended for squads wanting to explore Parlatuvier or Speyside. 🚗\n3. **Private Drivers:** Pre-book a registered taxi for late-night fete returns. 🤝",
      costumes: "Tobago Costume collection (e.g., Fog Angels):\n\n1. **Mas Camp:** Collection takes place at **Chill Out Bar, Bon Accord, Tobago**. 🏢\n2. **What to bring:** Bring your registration slip, ID, and original credit card. 🎫\n3. **Double Play:** If you registered for both J'ouvert and Pretty Mas, ensure you collect both packages! 🎭",
      safety: "Tobago safety tips:\n\n1. **Sun & Surf:** Tobago is sunny. Wear sunblock and stay hydrated. ☀️\n2. **Store Bay / Crown Point:** Keep valuables secure when swimming. 🔒\n3. **Road March:** Stick close to your band security fence on the Milford Road. 🚧"
    },
    chips: [
      { label: "🎟️ Tobago Fetes", prompt: "Tell me about Tobago Carnival events" },
      { label: "🦀 Crab & Dumplings", prompt: "Where is the best place for curry crab and dumpling?" },
      { label: "🎭 Fog Angels Info", prompt: "How does Fog Angels costume pickup work?" },
      { label: "🚗 Getting Around", prompt: "What is the best way to get around Tobago?" }
    ]
  },
  default: {
    name: "Carnival",
    displayName: "Carnival",
    flag: "🌴",
    welcome: "👋 Welcome to the Carnival! I'm your local Carnival Concierge. Ask me anything about fete locations, transport, costume pickup, or the best local spots!",
    keywords: ["party", "fete", "mas", "costume", "safe", "food"],
    knowledge: {
      fetes: "Check the **Schedule** tab in your planner! We support listing all popular local fetes, beach party cruises, and J'ouvert jumps. 🎟️",
      food: "Make sure to try local street food, local fruits, and traditional dishes. Ask locals for the highest-rated spots! 🍽️",
      transport: "We recommend using registered taxis, pre-booked private drivers for your squad, or official ridesharing apps. 🚗",
      costumes: "Mas band costume pickup usually requires bringing your ID, payment confirmation, and arriving at the mas camp distribution hub. 🎭",
      safety: "Stay hydrated, use sun protection, keep your phone in a secure pouch, and stay synced with your squad! 🚨"
    },
    chips: [
      { label: "🎟️ Fetes", prompt: "Tell me about the popular events" },
      { label: "🍽️ Local Food", prompt: "What local food should I try?" },
      { label: "🚗 Transport", prompt: "What is the safest way to get around?" },
      { label: "🎭 Costume Pickup", prompt: "What do I need to bring for costume pickup?" }
    ]
  }
};

const getSystemPrompt = (countryId, scrapedEvents) => {
  const cid = countryId || 'trinidad';
  const cfg = COUNTRY_CONFIGS[cid] || COUNTRY_CONFIGS.default;
  
  let scrapedEventsContext = "";
  if (scrapedEvents && scrapedEvents.length > 0) {
    scrapedEventsContext = "\nHere are the actual live events scraped for this carnival:\n" + 
      scrapedEvents.slice(0, 10).map(evt => `- **${evt.title}** on ${evt.date || evt.date_raw || 'TBA'} at ${evt.venue || 'TBA'} (Link: ${evt.url})`).join('\n') + 
      "\nUse these real live events to answer questions about what's happening, what events/parties/fetes are scheduled, or what to attend. Provide the ticket links so users can purchase tickets!";
  }

  return `
You are the AI Carnival Concierge, a friendly, local Caribbean helper for the Carnival Planner PWA.
Your goal is to assist masqueraders with questions about ${cfg.displayName} 2026, including:
1. Fete locations and ticket recommendations.
2. Local street food options (e.g. ${cfg.keywords.join(', ')}).
3. Transport, rideshares, and safety.
4. Costume pickup guidelines.
5. Road safety, hydration, and squad coordination.
${scrapedEventsContext}

Guidelines:
- Keep your answers concise, structured, and friendly.
- Use bullet points, bold text, and emojis (e.g. ${cfg.flag}, 🍹, 🍗, 🚗, 🎭) to make answers highly readable on mobile screens.
- Adopt a helpful, welcoming local Caribbean tone (professional but warm).
- If the user asks about locations, mention keywords relevant to ${cfg.name}: ${cfg.keywords.join(', ')}.
`;
};

// Offline local responder fallback
const getMockResponse = (query, countryId, scrapedEvents) => {
  const cid = countryId || 'trinidad';
  const cfg = COUNTRY_CONFIGS[cid] || COUNTRY_CONFIGS.default;
  const lower = query.toLowerCase();
  
  if (lower.includes('fete') || lower.includes('party') || lower.includes('show') || lower.includes('event')) {
    if (scrapedEvents && scrapedEvents.length > 0) {
      let list = scrapedEvents.slice(0, 5).map((evt, idx) => {
        return `${idx + 1}. **${evt.title}** (${evt.date || 'TBA'}) - ${evt.venue || 'TBA'} 🎟️\n   [Purchase Tickets](${evt.url})`;
      }).join('\n\n');
      return `Here are the live events scheduled for ${cfg.displayName}:\n\n${list}\n\n*Check the Schedule tab to add them to your planner!*`;
    }
    return cfg.knowledge.fetes;
  }
  if (lower.includes('food') || lower.includes('eat') || lower.includes('doubles') || lower.includes('shark') || lower.includes('soup') || lower.includes('hungry') || lower.includes('jerk') || lower.includes('fish') || lower.includes('fig') || lower.includes('pie') || lower.includes('crab') || lower.includes('dumpling')) {
    return cfg.knowledge.food;
  }
  if (lower.includes('transport') || lower.includes('taxi') || lower.includes('drive') || lower.includes('ride') || lower.includes('car') || lower.includes('maxi') || lower.includes('zr') || lower.includes('bus')) {
    return cfg.knowledge.transport;
  }
  if (lower.includes('costume') || lower.includes('mas') || lower.includes('band') || lower.includes('pickup') || lower.includes('collect')) {
    return cfg.knowledge.costumes;
  }
  if (lower.includes('safe') || lower.includes('police') || lower.includes('lost') || lower.includes('water') || lower.includes('hydrate')) {
    return cfg.knowledge.safety;
  }
  
  return `I'm not fully sure about that specific topic, but I can help you with **Fetes**, **Local food**, **Costume pickup**, **Transport**, or **Road Safety** for ${cfg.displayName}! Ask me any of those to get local tips. ${cfg.flag}`;
};

export default function CarnivalConcierge({ user, isPremium, activeCarnivalId, scrapedEvents }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const countryId = activeCarnivalId || 'trinidad';
  const config = COUNTRY_CONFIGS[countryId] || COUNTRY_CONFIGS.default;

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: config.welcome,
      senderId: 'bot',
      senderName: 'Concierge',
      createdAt: new Date().toISOString(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiStatus, setAiStatus] = useState('Checking...'); // 'Local 7B', 'Local 1.5B', 'Offline'
  
  const chatEndRef = useRef(null);

  // Automatically scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Check the status of the local AI models
  useEffect(() => {
    const checkAIStatus = async () => {
      try {
        // Try 7B model port first
        const res4001 = await fetch('http://localhost:4001/v1/models').catch(() => null);
        if (res4001 && res4001.ok) {
          setAiStatus('Local 7B');
          return;
        }

        // Try 1.5B model port second
        const res4000 = await fetch('http://localhost:4000/v1/models').catch(() => null);
        if (res4000 && res4000.ok) {
          setAiStatus('Local 1.5B');
          return;
        }

        setAiStatus('Offline');
      } catch (err) {
        setAiStatus('Offline');
      }
    };

    checkAIStatus();
    // Re-check every 30 seconds
    const interval = setInterval(checkAIStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Reset message history when active country changes
  useEffect(() => {
    const currentConfig = COUNTRY_CONFIGS[activeCarnivalId || 'trinidad'] || COUNTRY_CONFIGS.default;
    setMessages([
      {
        id: 'welcome-' + (activeCarnivalId || 'trinidad') + '-' + Date.now(),
        text: currentConfig.welcome,
        senderId: 'bot',
        senderName: 'Concierge',
        createdAt: new Date().toISOString(),
      }
    ]);
  }, [activeCarnivalId]);

  // Main handler to query local AI endpoints
  const fetchAIResponse = async (userMessage, history) => {
    const ports = [4001, 4000];
    
    // Map existing history to OpenAI message format
    const formattedHistory = history.map(msg => ({
      role: msg.senderId === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    for (const port of ports) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

        const response = await fetch(`http://localhost:${port}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer dummy'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            messages: [
              { role: 'system', content: getSystemPrompt(countryId, scrapedEvents) },
              ...formattedHistory,
              { role: 'user', content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 300
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data?.choices?.[0]?.message?.content) {
            return data.choices[0].message.content;
          }
        }
      } catch (err) {
        console.warn(`Local AI query failed on port ${port}, trying next...`, err);
      }
    }

    // All local AI calls failed, fallback to mock response
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getMockResponse(userMessage, countryId, scrapedEvents));
      }, 1000);
    });
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setInputText('');
    const userMsg = {
      id: Date.now().toString(),
      text,
      senderId: 'user',
      senderName: user?.displayName || 'Me',
      createdAt: new Date().toISOString()
    };

    // Add user message to history
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const botResponse = await fetchAIResponse(text, updatedMessages);
      
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        senderId: 'bot',
        senderName: 'Concierge',
        createdAt: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("Failed to generate bot response:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const triggerChipPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="fixed bottom-6 right-24 z-[60] font-body">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_8px_32px_0_rgba(236,72,153,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 glass-btn-primary"
          style={{ touchAction: 'manipulation' }}
        >
          {/* Pulsing Status indicator */}
          <span className={`absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${aiStatus === 'Offline' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
          <span className={`absolute top-0 right-0 w-3.5 h-3.5 rounded-full ${aiStatus === 'Offline' ? 'bg-yellow-500 animate-ping' : 'bg-green-500 animate-ping'}`}></span>
          
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[500px] rounded-2xl flex flex-col overflow-hidden animate-slideIn border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] glass-panel text-white">
          
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-orange-900/40">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-display font-bold text-white shadow-md">
                {config.flag}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-slate-900"></span>
              </div>
              <div>
                <h3 className="font-display font-bold text-sm tracking-wide">Carnival Concierge</h3>
                <span className="text-[10px] text-white/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Active ({aiStatus})
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Messages Panel */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[82%] ${msg.senderId === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                {/* Sender Name */}
                <span className="text-[10px] text-white/40 mb-1 px-1">{msg.senderName}</span>
                
                {/* Bubble */}
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.senderId === 'user'
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-tr-none shadow-md'
                      : 'bg-white/10 text-white rounded-tl-none border border-white/5 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start max-w-[80%]">
                <span className="text-[10px] text-white/40 mb-1 px-1">Concierge</span>
                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white/10 border border-white/5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-hide select-none">
            {config.chips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => triggerChipPrompt(chip.prompt)}
                className={`flex-shrink-0 px-3 py-1 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/5 rounded-full text-xs font-medium transition-colors ${
                  idx === 0 ? 'text-purple-200' :
                  idx === 1 ? 'text-pink-200' :
                  idx === 2 ? 'text-yellow-200' : 'text-orange-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-white/10 flex gap-2 bg-black/20"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about fetes, food, venues..."
              className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none bg-white/5 border border-white/10 focus:border-pink-500/50 text-white placeholder-white/30 transition-colors"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 glass-btn-primary"
            >
              <svg className="w-5 h-5 text-white transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
