"""
Carnival Planner & MoneyPrinterTurbo - Viral Content & Hashtag Generator
Generates high-hook titles, engagement captions, and 3-tier viral hashtag stacks for social media.
"""

import os
import sys
import random

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# High-converting hook templates (Pattern Interrupts)
HOOK_TEMPLATES = [
    "🚨 STOP SCROLLING if you're going to {carnival}!",
    "3 Mistakes That Will RUIN Your {carnival} Trip 😱",
    "How to lock in {carnival} fetes before they sell out in 60 seconds ⚡",
    "The Ultimate {carnival} Survival Guide for Masqueraders 🌴",
    "POV: You're getting ready for {carnival} with your Squad 🥳",
    "Don't travel to {carnival} without knowing THIS secret 🤫"
]

# Niche Caribbean & Viral Hashtag Stacks
HASHTAG_STACKS = {
    "broad_viral": ["#shorts", "#reels", "#fyp", "#foryou", "#viral", "#trending"],
    "caribbean_niche": ["#carnival2026", "#socamusic", "#caribbeancarnival", "#masquerader", "#socajunkie", "#carnivalplanner", "#fetes"],
    "location_specific": {
        "notting_hill": ["#nottinghillcarnival", "#londoncarnival", "#nhc2026", "#ladbrokegrove"],
        "nyc": ["#nyccarnival", "#labordaycarnival", "#brooklyncarnival", "#easternparkway"],
        "trinidad": ["#trinidadcarnival", "#socabrainwash", "#portofspain", "#carnivalmonday"],
        "miami": ["#miamicarnival", "#southfloridacarnival", "#miamifetes"],
        "tobago": ["#tobagocarnival", "#tobagofetes"]
    }
}

def generate_viral_package(carnival_name="Notting Hill & NYC Carnival 2026", location_key="notting_hill"):
    """
    Generates a full viral social media posting package:
    - High-hook title
    - Engaging story-driven caption
    - Comment engagement question
    - 3-tier optimized hashtag stack
    """
    hook = random.choice(HOOK_TEMPLATES).format(carnival=carnival_name)
    
    caption_body = (
        f"{hook}\n\n"
        f"🌴 The vibes are loading for {carnival_name}! Here is what you need to lock in right now:\n\n"
        f"1️⃣ Costume & Band Distribution: Pick up your costume early to avoid peak lines.\n"
        f"2️⃣ Squad Share Code: Create a squad in the app & share your invite code with your friends.\n"
        f"3️⃣ Road Maps & Fetes: Check live sound system pins and shuttle points on the road.\n\n"
        f"💬 Drop your squad name in the comments! Who are you jumping in de band with? 👇\n\n"
        f"📲 Plan your entire trip free on Carnival Planner! Link in bio."
    )

    # Combine hashtags
    broad = HASHTAG_STACKS["broad_viral"]
    niche = HASHTAG_STACKS["caribbean_niche"]
    loc = HASHTAG_STACKS["location_specific"].get(location_key, HASHTAG_STACKS["location_specific"]["notting_hill"])
    
    all_hashtags = list(set(broad + niche + loc))
    hashtag_string = " ".join(all_hashtags)

    full_caption = f"{caption_body}\n\n{hashtag_string}"

    return {
        "title": hook,
        "caption": full_caption,
        "hashtags": hashtag_string,
        "hashtag_list": all_hashtags
    }

if __name__ == "__main__":
    pkg = generate_viral_package("Notting Hill & NYC Carnival 2026", "notting_hill")
    print("=" * 60)
    print("🔥 VIRAL SOCIAL MEDIA PACKAGE GENERATED:")
    print("=" * 60)
    print(f"📌 TITLE: {pkg['title']}")
    print(f"\n📝 CAPTION:\n{pkg['caption']}")
    print("=" * 60)
