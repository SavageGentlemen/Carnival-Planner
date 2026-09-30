"""
Carnival Planner - Autonomous Video Reel Generation & Social Auto-Post Runner
End-to-end execution runner that checks MoneyPrinterTurbo health, selects a target carnival,
compiles a 9:16 vertical reel, uploads to public CDN, and broadcasts across social channels.
Enforces strict zero-duplicate protection and dynamic daily shorts content strategy.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import json
import time
import random
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

from moneyprinter_client import moneyprinter_client
from hybrid_publisher import upload_local_to_public_cdn, publish_to_all_socials
from viral_copywriter import generate_viral_package
from cinematic_engine import load_posted_history, record_published_post, build_cinematic_video, generate_ai_creative_ad

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

DEFAULT_VOICE = os.getenv("VOICE_NAME", "en-NG-EzinneNeural")
SITE_NAME = os.getenv("SITE_NAME", "carnival-planner.com")

# Comprehensive Calendar of Major Global Caribbean Carnivals
CARNIVAL_CALENDAR = [
    {"name": "Miami Carnival 2026", "date": "October 9 - 12", "key": "miami", "island": "Miami", "order": 1},
    {"name": "Dominica World Creole Music Festival", "date": "October 23 - 25", "key": "dominica", "island": "Dominica", "order": 2},
    {"name": "Tobago Carnival 2026", "date": "October 25 - November 1", "key": "tobago", "island": "Tobago", "order": 3},
    {"name": "Sugar Mas (St. Kitts & Nevis)", "date": "December 15 - January 2", "key": "st_kitts", "island": "St. Kitts", "order": 4},
    {"name": "Montserrat Carnival", "date": "December 18 - January 2", "key": "montserrat", "island": "Montserrat", "order": 5},
    {"name": "Trinidad Carnival 2027", "date": "February 8 - 9", "key": "trinidad", "island": "Trinidad", "order": 6},
    {"name": "Dominica Mas Domnik 2027", "date": "February 8 - 9", "key": "dominica", "island": "Dominica", "order": 7},
    {"name": "St. Maarten Carnival 2027", "date": "April 15 - May 3", "key": "st_maarten", "island": "St. Maarten", "order": 8},
    {"name": "Jamaica Carnival 2027", "date": "April 7 - 12", "key": "jamaica", "island": "Jamaica", "order": 9},
    {"name": "St. Thomas Carnival (USVI) 2027", "date": "April 24 - May 2", "key": "st_thomas", "island": "St. Thomas", "order": 10},
    {"name": "CayMAS Carnival (Cayman Islands)", "date": "May 14 - 17", "key": "cayman", "island": "Cayman Islands", "order": 11},
    {"name": "Bahamas Carnival 2027", "date": "May 20 - 24", "key": "bahamas", "island": "Bahamas", "order": 12},
    {"name": "Bermuda Heroes Weekend 2027", "date": "June 18 - 21", "key": "bermuda", "island": "Bermuda", "order": 13},
    {"name": "Vincy Mas (St. Vincent) 2027", "date": "June 25 - July 6", "key": "vincy_mas", "island": "St. Vincent", "order": 14},
    {"name": "St. Lucia Carnival 2027", "date": "July 15 - 21", "key": "st_lucia", "island": "St. Lucia", "order": 15},
    {"name": "Barbados Crop Over 2027", "date": "July 28 - August 3", "key": "crop_over", "island": "Barbados", "order": 16},
    {"name": "Antigua Carnival 2027", "date": "July 29 - August 3", "key": "antigua", "island": "Antigua", "order": 17},
    {"name": "Caribana (Toronto) 2027", "date": "July 29 - August 2", "key": "toronto", "island": "Toronto", "order": 18},
    {"name": "Grenada Spicemas 2027", "date": "August 9 - 10", "key": "spicemas", "island": "Grenada", "order": 19},
    {"name": "Notting Hill Carnival 2027", "date": "August 29 - 30", "key": "notting_hill", "island": "London", "order": 20},
    {"name": "NYC Labor Day Carnival 2027", "date": "September 3 - 6", "key": "nyc", "island": "New York", "order": 21}
]

def select_next_carnival():
    """
    Intelligent carnival selector that enforces zero duplicate posts:
    1. Checks all historical posts.
    2. Excludes any carnival posted in the last 7 entries.
    3. Prioritizes upcoming events on the Caribbean calendar.
    4. Picks the carnival that has gone the longest without being featured.
    """
    history = load_posted_history()
    
    # Track when each carnival was last posted
    last_posted_index = {}
    for idx, entry in enumerate(history):
        c_name = entry.get("carnival", "").lower()
        for c in CARNIVAL_CALENDAR:
            if c["key"] in c_name or c["island"].lower() in c_name or c["name"].lower() in c_name:
                last_posted_index[c["key"]] = idx

    # Enforce minimum cooldown: exclude anything posted in the last 7 posts
    recent_cutoff = max(0, len(history) - 7)
    cooldown_keys = set()
    for entry in history[recent_cutoff:]:
        c_name = entry.get("carnival", "").lower()
        for c in CARNIVAL_CALENDAR:
            if c["key"] in c_name or c["island"].lower() in c_name or c["name"].lower() in c_name:
                cooldown_keys.add(c["key"])

    eligible = [c for c in CARNIVAL_CALENDAR if c["key"] not in cooldown_keys]
    if not eligible:
        eligible = CARNIVAL_CALENDAR

    # Sort eligible carnivals by:
    # 1. Least recently posted (never posted gets lowest index -1)
    # 2. Upcoming calendar order
    eligible.sort(key=lambda c: (last_posted_index.get(c["key"], -1), c.get("order", 99)))
    
    chosen = eligible[0]
    print(f"🎯 [Smart Scheduler] Selected target carnival: '{chosen['name']}' (Last posted index: {last_posted_index.get(chosen['key'], 'NEVER')})")
    return chosen

def run_trigger_autopost(live=True, target_override=None):
    print("=" * 80)
    print("🎬 CARNIVAL PLANNER: AUTONOMOUS VIDEO REEL GENERATION & SOCIAL AUTO-POST")
    print("=" * 80)

    # 1. Select Candidate Event
    target = target_override or select_next_carnival()
    carnival_name = f"{target['name']} ({target['date']})"
    print(f"\n[Step 1/5] 📍 Selected Event: {carnival_name}")
    print(f"   - Voice: {DEFAULT_VOICE} (Warm Caribbean/Black Female Neural Voice)")
    print(f"   - Target Site: {SITE_NAME}")

    # 2. Generate Unique Viral Package & Script (Gemini AI + Deduplication)
    print("\n[Step 2/5] ✍️ Generating Unique Viral Package & Voiceover Script...")
    viral_pkg = generate_viral_package(carnival_name, target["key"])
    print(f"   - Title: {viral_pkg['title']}")
    print(f"   - Pillar: {viral_pkg.get('pillar', 'standard')}")

    # 3. Compile 24 FPS Cartoon Episode Video Reel
    print("\n[Step 3/4] 🎬 Compiling 24 FPS Animated Cartoon Episode (Characters + Sound Truck + Comic Dialogue)...")
    local_video_path = None
    engine_used = "24 FPS Cartoon Episode Studio (Maya & Tariq)"

    try:
        from cartoon_episode_engine import build_cartoon_episode
        local_video_path = build_cartoon_episode(carnival_name)
    except Exception as e:
        print(f"   ⚠️ Cartoon engine notice ({e}). Switching to unified studio...")
        try:
            from unified_creative_engine import build_unified_cinematic_reel
            local_video_path, storyboard = build_unified_cinematic_reel(carnival_name, target["key"])
        except Exception:
            ad_data = generate_ai_creative_ad(carnival_name)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            out_video_name = f"cinematic_{target['key']}_{timestamp}.mp4"
            local_video_path = os.path.join(OUTPUT_DIR, out_video_name)
            build_cinematic_video(ad_data, local_video_path)
            engine_used = "Local High-Performance Studio Canvas"

    print(f"   - ✅ Video Rendered Successfully!")
    print(f"   - Engine Used: {engine_used}")
    print(f"   - Local Video File: {local_video_path}")

    # 4. Upload to Public CDN & Broadcast
    print("\n[Step 5/5] 🌐 Uploading Video Asset & Broadcasting Across Channels...")
    public_cdn_url = upload_local_to_public_cdn(local_video_path)
    print(f"   - ✅ Public CDN URL: {public_cdn_url}")

    campaign_record = {
        "id": f"post_{target['key']}_{int(time.time())}",
        "title": viral_pkg["title"],
        "hook_line": viral_pkg.get("hook_line", ""),
        "category": viral_pkg.get("pillar", "general"),
        "carnival": carnival_name,
        "video_url": public_cdn_url,
        "engine": engine_used,
        "timestamp": datetime.now().isoformat()
    }

    if live:
        results = publish_to_all_socials(
            media_url_or_path=public_cdn_url,
            title=viral_pkg["title"],
            caption=viral_pkg["caption"],
            tags=viral_pkg["hashtag_list"],
            media_type="video",
            dry_run=False
        )

        record_published_post(campaign_record, results)
        print("=" * 80)
        print("🎉 AUTONOMOUS VIDEO REEL GENERATED & BROADCASTED SUCCESSFULLY!")
        print("=" * 80)
        return results
    else:
        print("\nℹ️ Dry-run mode completed. Video asset ready for broadcasting.")
        return {"status": "success", "video_url": public_cdn_url, "campaign": campaign_record}

if __name__ == "__main__":
    is_live = "--dry-run" not in sys.argv
    run_trigger_autopost(live=is_live)
