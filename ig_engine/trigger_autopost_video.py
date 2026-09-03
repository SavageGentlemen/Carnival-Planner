"""
Carnival Planner - Autonomous Video Reel Generation & Social Auto-Post Runner
End-to-end execution runner that checks MoneyPrinterTurbo health, selects a target carnival,
compiles a 9:16 vertical reel, uploads to public CDN, and broadcasts across social channels.
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

CARNIVAL_CALENDAR = [
    {"name": "Tobago Carnival 2026", "date": "October 25 - November 1", "key": "tobago", "island": "Tobago"},
    {"name": "Sugar Mas (St. Kitts & Nevis)", "date": "December 15 - January 2", "key": "st_kitts", "island": "St. Kitts"},
    {"name": "Montserrat Carnival", "date": "December 18 - January 2", "key": "montserrat", "island": "Montserrat"},
    {"name": "Trinidad Carnival 2027", "date": "February 8 - 9", "key": "trinidad", "island": "Trinidad"},
    {"name": "Dominica Mas Domnik", "date": "February 8 - 9", "key": "dominica", "island": "Dominica"},
    {"name": "St. Maarten Carnival", "date": "April 15 - May 3", "key": "st_maarten", "island": "St. Maarten"},
    {"name": "Jamaica Carnival 2027", "date": "April 7 - 12", "key": "jamaica", "island": "Jamaica"},
    {"name": "St. Thomas Carnival (USVI)", "date": "April 24 - May 2", "key": "st_thomas", "island": "St. Thomas"},
    {"name": "Bermuda Heroes Weekend", "date": "June 18 - 21", "key": "bermuda", "island": "Bermuda"},
    {"name": "Vincy Mas (St. Vincent)", "date": "June 25 - July 6", "key": "vincy_mas", "island": "St. Vincent"},
    {"name": "St. Lucia Carnival", "date": "July 15 - 21", "key": "st_lucia", "island": "St. Lucia"},
    {"name": "Antigua Carnival", "date": "July 29 - August 3", "key": "antigua", "island": "Antigua"},
    {"name": "Barbados Crop Over 2027", "date": "July 28 - August 3", "key": "crop_over", "island": "Barbados"},
    {"name": "Grenada Spicemas 2027", "date": "August 9 - 10", "key": "spicemas", "island": "Grenada"}
]

def select_next_carnival():
    history = load_posted_history()
    recent_carnivals = [h.get("carnival", "") for h in history[-5:]]
    candidates = [c for c in CARNIVAL_CALENDAR if not any(c["name"] in rc for rc in recent_carnivals)]
    if not candidates:
        candidates = CARNIVAL_CALENDAR
    return random.choice(candidates)

def run_trigger_autopost(live=True, target_override=None):
    print("=" * 80)
    print("🎬 CARNIVAL PLANNER: AUTONOMOUS VIDEO REEL GENERATION & SOCIAL AUTO-POST")
    print("=" * 80)

    # 1. Health Check
    print("\n[Step 1/5] 📡 Checking MoneyPrinterTurbo AI Engine Status...")
    health = moneyprinter_client.check_health()
    print(f"   - Status: {'🟢 ONLINE' if health['online'] else '🟡 STANDBY (Fallback Active)'}")
    print(f"   - Endpoint: {health['api_url']}")
    print(f"   - Message: {health['message']}")

    # 2. Select Candidate Event
    target = target_override or select_next_carnival()
    carnival_name = f"{target['name']} ({target['date']})"
    print(f"\n[Step 2/5] 📍 Selected Event: {carnival_name}")
    print(f"   - Voice: {DEFAULT_VOICE} (Warm Caribbean/Black Female Neural Voice)")
    print(f"   - Target Site: {SITE_NAME}")

    # 3. Generate Video Reel
    print("\n[Step 3/5] 🎥 Compiling 9:16 Vertical Video Reel...")
    local_video_path = None
    engine_used = "fallback"

    if health["online"]:
        try:
            print(f"   - Using MoneyPrinterTurbo AI Sidecar (Voice: {DEFAULT_VOICE})...")
            terms = [
                f"{target['key']} caribbean carnival",
                "caribbean masquerader feathers",
                "soca music festival crowd",
                "tropical island carnival dancers",
                "carnival parade costume"
            ]
            script = (
                f"Get ready for {target['name']} and all the upcoming Caribbean island carnivals! "
                "Never lose your squad on the road, track live sound trucks, and find costume drops on carnival-planner.com. "
                "Download free and plan your entire trip at carnival-planner.com today!"
            )
            
            task_id = moneyprinter_client.submit_task(
                video_subject=f"Carnival Planner: {carnival_name} & Caribbean Island Guide",
                video_script=script,
                video_terms=terms,
                video_aspect="9:16",
                voice_name=DEFAULT_VOICE,
                subtitles_enabled=True
            )
            task_result = moneyprinter_client.poll_task(task_id, max_wait_seconds=360)
            
            if task_result.get("status") == "completed" and task_result.get("video_url"):
                local_video_path = moneyprinter_client.save_video_locally(
                    task_result["video_url"],
                    filename_prefix=f"reel_{target['key']}"
                )
                engine_used = f"MoneyPrinterTurbo AI Engine ({DEFAULT_VOICE})"
        except Exception as e:
            print(f"   ⚠️ Sidecar render error: {e}. Switching to cinematic canvas generator.")

    if not local_video_path:
        print("   - Using High-Performance Cinematic Canvas Generator...")
        ad_data = generate_ai_creative_ad(carnival_name)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        out_video_name = f"cinematic_{target['key']}_{timestamp}.mp4"
        local_video_path = os.path.join(OUTPUT_DIR, out_video_name)
        build_cinematic_video(ad_data, local_video_path)
        engine_used = "Local High-Performance Studio Canvas"

    print(f"   - ✅ Video Rendered Successfully!")
    print(f"   - Engine Used: {engine_used}")
    print(f"   - Local Video File: {local_video_path}")

    # 4. Upload to Public CDN
    print("\n[Step 4/5] 🌐 Uploading Video Asset to Fast Public CDN...")
    public_cdn_url = upload_local_to_public_cdn(local_video_path)
    print(f"   - ✅ Public CDN URL: {public_cdn_url}")

    # 5. Format Copy & Broadcast
    print("\n[Step 5/5] ✍️ Formatting Social Media Copy & Multi-Channel Broadcast...")
    viral_pkg = generate_viral_package(carnival_name, target["key"])

    campaign_record = {
        "id": f"post_{target['key']}_{int(time.time())}",
        "title": viral_pkg["title"],
        "carnival": carnival_name,
        "video_url": public_cdn_url,
        "engine": engine_used
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
        return {"status": "success", "video_url": public_cdn_url}

if __name__ == "__main__":
    is_live = "--dry-run" not in sys.argv
    run_trigger_autopost(live=is_live)
