"""
Carnival Planner & MoneyPrinterTurbo - Viral Content & Hashtag Generator
Generates high-hook titles, engagement captions, pattern interrupts, and 3-tier viral hashtag stacks for social media.
"""

import os
import sys
import random
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

SITE_URL = os.getenv("SITE_URL", "https://carnival-planner.com")

# High-converting hook templates (Pattern Interrupts)
HOOK_TEMPLATES = [
    "🚨 STOP SCROLLING if you're going to {carnival}!",
    "3 Mistakes That Will RUIN Your {carnival} Trip 😱",
    "How to lock in {carnival} fetes before they sell out in 60 seconds ⚡",
    "The Ultimate {carnival} Survival Guide for Masqueraders 🌴",
    "POV: You're getting ready for {carnival} with your Squad 🥳",
    "Don't travel to {carnival} without knowing THIS secret 🤫",
    "How to track your Squad live on Carnival Monday when cell service drops 📍",
    "The #1 reason masqueraders spend $4,000 on Carnival without realizing it 💰"
]

# Niche Caribbean & Viral Hashtag Stacks
HASHTAG_STACKS = {
    "brand_tags": ["#CarnivalPlanner", "#SocaPassport", "#CarnivalApp", "#CarnivalGuide", "#MasqueraderLife"],
    "broad_viral": ["#Shorts", "#ReelsViral", "#ExplorePage", "#FYP", "#TrendingNow", "#ViralReels"],
    "caribbean_niche": [
        "#Carnival2026", "#SocaMusic", "#CaribbeanCarnival", "#Masquerader",
        "#SocaJunkie", "#Fetes", "#CarnivalVibes", "#CaribbeanCulture"
    ],
    "animation_2d": ["#2DAnimation", "#AnimeAesthetic", "#MotionGraphics", "#CyberpunkCaribbean"],
    "location_specific": {
        "notting_hill": ["#NottingHillCarnival", "#LondonCarnival", "#NHC2026", "#LadbrokeGrove"],
        "nyc": ["#NYCCarnival", "#LaborDayCarnival", "#BrooklynCarnival", "#EasternParkway"],
        "trinidad": ["#TrinidadCarnival", "#SocaBrainwash", "#PortOfSpain", "#CarnivalMonday"],
        "miami": ["#MiamiCarnival", "#SouthFloridaCarnival", "#MiamiFetes"],
        "tobago": ["#TobagoCarnival", "#TobagoFetes"],
        "barbados": ["#CropOver2026", "#GrandKadooment", "#BarbadosCarnival"],
        "jamaica": ["#JamaicaCarnival", "#XodusCarnival", "#BacchanalJa"]
    }
}

def generate_viral_package(carnival_name="Notting Hill & NYC Carnival 2026", location_key="notting_hill", style_preset="standard"):
    """
    Generates a full viral social media posting package:
    - High-hook title
    - Engaging story-driven caption
    - Comment engagement question
    - 3-tier optimized hashtag stack
    """
    if style_preset == "2d_anime":
        hook = f"🎨 ENTER THE NEXT DIMENSION: {carnival_name.upper()} 🌴⚡"
        caption_body = (
            f"{hook}\n\n"
            f"Handcrafted luxury meets 2D anime soundclash aesthetics. Built for high-energy fete survival, island culture, and global carnival dominance.\n\n"
            f"📍 Never lose your crew: Live Squad Radar + Fete Drop Calendars\n"
            f"🎟️ Track Tier 1 tickets & direct purchase links\n"
            f"👗 3D AR Costume preview & verified peer-to-peer marketplace\n\n"
            f"👑 Build your ultimate carnival trip free today:\n"
            f"👉 {SITE_URL}\n\n"
            f"—\nCarnival Planner | The Pulse of Caribbean Culture ⚡"
        )
        tag_pool = HASHTAG_STACKS["brand_tags"] + HASHTAG_STACKS["animation_2d"] + HASHTAG_STACKS["caribbean_niche"] + HASHTAG_STACKS["broad_viral"]
    elif style_preset == "product_drop":
        hook = f"🌴 VIP DROP: CARNIVAL PLANNER PASSPORT REWARDS 🌴"
        caption_body = (
            f"{hook}\n\n"
            f"Collect digital passport stamps, unlock exclusive promoter bounties, and climb the global masquerader leaderboard across 25+ carnivals.\n\n"
            f"📲 Claim your free Soca Passport & Squad code:\n"
            f"👉 {SITE_URL}\n\n"
            f"—\nCarnival Planner | Unapologetically Caribbean ⚡"
        )
        tag_pool = HASHTAG_STACKS["brand_tags"] + HASHTAG_STACKS["caribbean_niche"] + HASHTAG_STACKS["broad_viral"]
    else:
        hook = random.choice(HOOK_TEMPLATES).format(carnival=carnival_name)
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
        loc_tags = HASHTAG_STACKS["location_specific"].get(location_key, HASHTAG_STACKS["location_specific"]["notting_hill"])
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
        "title": f"{hook} #Shorts" if "#Shorts" not in hook else hook,
        "caption": full_caption,
        "hashtags": hashtag_string,
        "hashtag_list": ordered_tags,
        "product_link": SITE_URL
    }

if __name__ == "__main__":
    pkg = generate_viral_package("Notting Hill & NYC Carnival 2026", "notting_hill", "standard")
    print("=" * 60)
    print("🔥 VIRAL SOCIAL MEDIA PACKAGE GENERATED:")
    print("=" * 60)
    print(f"📌 TITLE: {pkg['title']}")
    print(f"\n📝 CAPTION:\n{pkg['caption']}")
    print("=" * 60)
