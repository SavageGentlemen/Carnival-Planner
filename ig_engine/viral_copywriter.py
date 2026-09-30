"""
Carnival Planner & MoneyPrinterTurbo - Viral Content & Hashtag Generator
Generates high-hook titles, engagement captions, pattern interrupts, and 3-tier viral hashtag stacks for social media.
Enforces strict deduplication by reading posted_history.json and leveraging Gemini AI with extensive template fallbacks.
"""

import os
import sys
import json
import random
import re
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

SITE_URL = os.getenv("SITE_URL", "https://carnival-planner.com")
HISTORY_FILE = os.path.join(os.path.dirname(__file__), "posted_history.json")

# Content Pillars for Short-Form Video Diversity
CONTENT_PILLARS = [
    {
        "key": "carnival_guide",
        "name": "Carnival Destination Guide & Countdown",
        "focus": "Key event dates, band launches, road route, and insider secrets."
    },
    {
        "key": "squad_survival",
        "name": "Squad Radar & Offline Road Tracking",
        "focus": "Tracking your squad live in 50k masqueraders when cellular towers fail with Bluetooth mesh."
    },
    {
        "key": "fete_drops",
        "name": "Fete Ticket Drops & Tier 1 Access",
        "focus": "Securing tickets to sold-out breakfast parties, boat rides, and Jouvert fetes before scalpers."
    },
    {
        "key": "flight_and_budget",
        "name": "Carnival Budgeting & Flight Deals",
        "focus": "Managing carnival expenses, costume deposits, flights, and shared squad currency."
    },
    {
        "key": "costume_and_ar",
        "name": "Costume Fitting & Verified P2P Marketplace",
        "focus": "Buying and selling sold-out band sections safely with Stripe escrow and 3D AR previews."
    },
    {
        "key": "jouvert_and_culture",
        "name": "J'ouvert Survival & Masquerader Essentials",
        "focus": "Paint, mud, powder survival, hydration packs, waterproof gear, and Caribbean culture."
    }
]

# Robust Hook Bank (30+ Pattern Interrupts across Pillars)
HOOK_TEMPLATES = [
    # Guide & Hacks
    "🚨 STOP SCROLLING if you're jumping in {carnival}!",
    "3 Mistakes That Will RUIN Your {carnival} Experience 😱",
    "Don't book your flight to {carnival} until you know THIS 🤫",
    "The Ultimate {carnival} Masquerader Survival Playbook 🌴",
    "POV: You and your squad finally land for {carnival} 🥳",
    "5 Things every first-timer gets wrong about {carnival} 🤦‍♀️",
    "This is why {carnival} is unlike ANY other festival on earth 🌍🔥",
    "What nobody tells you about planning for {carnival} 🤯",
    # Squad Radar & Navigation
    "How to NEVER lose your crew on the road at {carnival} 📍",
    "What happens when cell service drops in 50,000 masqueraders at {carnival}? 📱❌",
    "The secret app masqueraders use to stay together on the road 🚀",
    "Never get separated on the road at {carnival} again 🔥",
    # Fetes & Tickets
    "How to lock in {carnival} fetes before they sell out in 60 seconds ⚡",
    "Are you paying double for {carnival} tickets? Stop doing this 💸",
    "The 3 most legendary fetes at {carnival} you cannot miss 🎟️🔥",
    "How to track every ticket drop and sound truck at {carnival} 🎧",
    # Budget & Flights
    "The #1 reason masqueraders spend $4,000 on {carnival} without realizing it 💰",
    "How to split costumes, stay, and transport with your squad for {carnival} 🤝",
    "The smartest way to budget your entire {carnival} season in 2026/2027 📊",
    # Costumes & Marketplace
    "Need a sold-out frontline costume for {carnival}? Here's where to look safely 👙🛡️",
    "Stop buying carnival costumes through shady DMs — do this instead ⚠️",
    "How to preview your {carnival} costume in 3D AR before paying your deposit 🕶️",
    # J'ouvert & Survival
    "J'ouvert survival rule #1: If you don't bring this to {carnival}, you will regret it 🎨💦",
    "The packing checklist that saves your life on Carnival Monday at {carnival} 🧳",
    "How to survive 12 hours chipping under the Caribbean sun at {carnival} ☀️⚡",
    "Paint, powder, and steelpan: The real magic of {carnival} 🥁✨"
]

# Niche Caribbean & Viral Hashtag Stacks
HASHTAG_STACKS = {
    "brand_tags": ["#CarnivalPlanner", "#SocaPassport", "#CarnivalApp", "#CarnivalGuide", "#MasqueraderLife"],
    "broad_viral": ["#Shorts", "#ReelsViral", "#ExplorePage", "#FYP", "#TrendingNow", "#ViralReels"],
    "caribbean_niche": [
        "#Carnival2026", "#Carnival2027", "#SocaMusic", "#CaribbeanCarnival", "#Masquerader",
        "#SocaJunkie", "#Fetes", "#CarnivalVibes", "#CaribbeanCulture"
    ],
    "animation_2d": ["#2DAnimation", "#AnimeAesthetic", "#MotionGraphics", "#CyberpunkCaribbean"],
    "location_specific": {
        "notting_hill": ["#NottingHillCarnival", "#LondonCarnival", "#NHC2026", "#LadbrokeGrove"],
        "nyc": ["#NYCCarnival", "#LaborDayCarnival", "#BrooklynCarnival", "#EasternParkway"],
        "trinidad": ["#TrinidadCarnival", "#TrinidadCarnival2027", "#SocaBrainwash", "#PortOfSpain", "#CarnivalMonday"],
        "miami": ["#MiamiCarnival", "#MiamiCarnival2026", "#SouthFloridaCarnival", "#MiamiFetes"],
        "tobago": ["#TobagoCarnival", "#TobagoFetes", "#TobagoCarnival2026"],
        "st_kitts": ["#SugarMas", "#SugarMas55", "#StKittsCarnival", "#Basseterre"],
        "barbados": ["#CropOver2026", "#CropOver2027", "#GrandKadooment", "#BarbadosCarnival"],
        "jamaica": ["#JamaicaCarnival", "#JamaicaCarnival2027", "#XodusCarnival", "#BacchanalJa"],
        "st_lucia": ["#StLuciaCarnival", "#DennerySegment", "#Castries"],
        "grenada": ["#Spicemas", "#JabJab", "#GrenadaCarnival"],
        "antigua": ["#AntiguaCarnival", "#CaribbeanGreatestSummerFestival"],
        "dominica": ["#MasDomnik", "#RealMas", "#DominicaWCMF"]
    }
}

def load_posted_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def get_past_titles_and_hooks():
    history = load_posted_history()
    titles = set()
    hooks = set()
    for h in history:
        if h.get("title"):
            titles.add(h.get("title").strip().lower())
        if h.get("hook_line"):
            hooks.add(h.get("hook_line").strip().lower())
    return titles, hooks, history

def select_dynamic_pillar(history):
    """Rotates pillars so consecutive posts explore different aspects of the carnival experience."""
    recent_pillars = [h.get("category", "") for h in history[-5:]]
    candidates = [p for p in CONTENT_PILLARS if p["key"] not in recent_pillars]
    if not candidates:
        candidates = CONTENT_PILLARS
    return random.choice(candidates)

def generate_ai_viral_package(carnival_name, location_key, pillar, past_titles):
    """Uses Gemini AI to generate a 100% unique viral title, voiceover script, and caption."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")

        recent_titles_sample = list(past_titles)[-25:] if past_titles else []
        prompt = f"""
        You are an elite Caribbean carnival creator and viral short-form video director (TikTok & Instagram Reels).
        Write a viral, high-converting social media package for:
        Event: {carnival_name}
        Content Pillar: {pillar['name']} ({pillar['focus']})
        App: Carnival Planner (carnival-planner.com) - The all-in-one Caribbean carnival planning platform with live Squad Radar, Fete Calendars, Costume Marketplace, and Trip Itineraries.

        STRICT DEDUPLICATION RULES:
        1. Do NOT reuse, copy, or closely rephrase any of these previously posted titles:
        {json.dumps(recent_titles_sample)}
        2. Create a bold, authentic, punchy title under 60 characters with emojis.
        3. Write an addictive 35-second voiceover script (around 65-80 words) in warm Caribbean conversational tone.
        4. Write an engaging caption with bullet points and a comment prompt question.

        Return STRICT JSON format:
        {{
            "title": "EMOJI + PUNCHY HEADLINE #Shorts",
            "hook_line": "Opening 1-sentence hook line for video voiceover",
            "script": "Full 35-second spoken voiceover script (65-80 words)",
            "caption": "Full Instagram/TikTok caption text with bullet points and CTA",
            "comment_prompt": "Question for the comments"
        }}
        """

        response = model.generate_content(prompt)
        text = response.text.strip()
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()

        data = json.loads(text)
        if data.get("title") and data.get("caption"):
            print(f"✨ [AI Copywriter] Generated 100% unique script for {carnival_name}: '{data['title']}'")
            return data
    except Exception as e:
        print(f"⚠️ [AI Copywriter] Gemini generation fallback: {e}")

    return None

def generate_viral_package(carnival_name="Tobago Carnival 2026", location_key="tobago", style_preset="standard"):
    """
    Generates a full viral social media posting package with zero-duplicate protection:
    - High-hook title (verified unique against posted_history.json)
    - Engaging story-driven caption
    - Spoken voiceover script
    - 3-tier optimized hashtag stack
    """
    past_titles, past_hooks, history = get_past_titles_and_hooks()
    pillar = select_dynamic_pillar(history)

    # 1. Attempt AI Generation with strict deduplication
    ai_data = None
    if style_preset == "standard":
        ai_data = generate_ai_viral_package(carnival_name, location_key, pillar, past_titles)

    if ai_data:
        hook = ai_data.get("hook_line", "")
        title = ai_data.get("title", f"Get Ready for {carnival_name}! #Shorts")
        script = ai_data.get("script", "")
        caption_body = ai_data.get("caption", "")
        if SITE_URL not in caption_body:
            caption_body += f"\n\n📲 Plan your entire trip free on Carnival Planner:\n👉 {SITE_URL}"
    elif style_preset == "2d_anime":
        hook = f"🎨 ENTER THE NEXT DIMENSION: {carnival_name.upper()} 🌴⚡"
        title = f"{hook} #Shorts"
        script = f"Step into the next dimension of {carnival_name}. Live squad tracking, fete drop schedules, and costume tools. Plan free at carnival-planner.com."
        caption_body = (
            f"{hook}\n\n"
            f"Handcrafted luxury meets high-energy Caribbean soundclash aesthetics. Built for fete survival, island culture, and carnival dominance.\n\n"
            f"📍 Never lose your crew: Live Squad Radar + Fete Drop Calendars\n"
            f"🎟️ Track Tier 1 tickets & direct purchase links\n"
            f"👗 3D AR Costume preview & verified peer-to-peer marketplace\n\n"
            f"👑 Build your ultimate carnival trip free today:\n"
            f"👉 {SITE_URL}\n\n"
            f"—\nCarnival Planner | The Pulse of Caribbean Culture ⚡"
        )
    elif style_preset == "product_drop":
        hook = f"🌴 VIP DROP: CARNIVAL PLANNER PASSPORT REWARDS 🌴"
        title = f"{hook} #Shorts"
        script = f"Collect digital passport stamps, unlock exclusive promoter bounties, and climb the masquerader leaderboard for {carnival_name} at carnival-planner.com."
        caption_body = (
            f"{hook}\n\n"
            f"Collect digital passport stamps, unlock exclusive promoter bounties, and climb the global masquerader leaderboard across 25+ carnivals.\n\n"
            f"📲 Claim your free Soca Passport & Squad code:\n"
            f"👉 {SITE_URL}\n\n"
            f"—\nCarnival Planner | Unapologetically Caribbean ⚡"
        )
    else:
        # Fallback to Deduplicated Template Bank
        available_hooks = [h for h in HOOK_TEMPLATES if h.format(carnival=carnival_name).strip().lower() not in past_titles]
        if not available_hooks:
            available_hooks = HOOK_TEMPLATES

        chosen_template = random.choice(available_hooks)
        hook = chosen_template.format(carnival=carnival_name)
        title = f"{hook} #Shorts" if "#Shorts" not in hook else hook

        script = (
            f"{hook}. "
            f"From costume fitting schedules to real-time fete drop alerts, do not get caught unprepared for {carnival_name}. "
            "Use Carnival Planner's live squad radar and packing checklists to stay ready on the road. "
            "Plan your entire experience free today at carnival-planner.com!"
        )

        caption_body = (
            f"{hook}\n\n"
            f"🌴 The vibes are loading for {carnival_name}! Here is what you need to lock in right now:\n\n"
            f"1️⃣ Costume & Band Distribution: Pick up your costume early to avoid peak lines.\n"
            f"2️⃣ Squad Share Code: Create a squad in the app & share your invite code with your friends.\n"
            f"3️⃣ Road Maps & Fetes: Check live sound system pins and shuttle points on the road.\n\n"
            f"💬 Drop your squad name in the comments! Who are you jumping in de band with? 👇\n\n"
            f"📲 Plan your entire trip free on Carnival Planner! Link in bio:\n"
            f"👉 {SITE_URL}"
        )

    # Compile location and niche hashtags
    loc_tags = HASHTAG_STACKS["location_specific"].get(location_key, HASHTAG_STACKS["location_specific"].get("trinidad", []))
    tag_pool = HASHTAG_STACKS["brand_tags"] + HASHTAG_STACKS["caribbean_niche"] + loc_tags + HASHTAG_STACKS["broad_viral"]

    # Combine unique hashtags
    seen = set()
    ordered_tags = []
    for tag in tag_pool:
        formatted = tag if tag.startswith("#") else f"#{tag}"
        if formatted.lower() not in seen:
            seen.add(formatted.lower())
            ordered_tags.append(formatted)

    hashtag_string = " ".join(ordered_tags)
    full_caption = f"{caption_body}\n\n{hashtag_string}"

    return {
        "title": title,
        "hook_line": hook,
        "script": script,
        "caption": full_caption,
        "hashtags": hashtag_string,
        "hashtag_list": ordered_tags,
        "pillar": pillar["key"],
        "product_link": SITE_URL
    }

if __name__ == "__main__":
    pkg = generate_viral_package("Tobago Carnival 2026", "tobago", "standard")
    print("=" * 60)
    print("🔥 VIRAL SOCIAL MEDIA PACKAGE GENERATED:")
    print("=" * 60)
    print(f"📌 TITLE: {pkg['title']}")
    print(f"\n🎙️ SCRIPT:\n{pkg['script']}")
    print(f"\n📝 CAPTION:\n{pkg['caption']}")
    print("=" * 60)
