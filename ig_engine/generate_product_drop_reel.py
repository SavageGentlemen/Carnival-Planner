"""
Carnival Planner - VIP Feature & Merch Drop Showcase Reel Generator
Generates high-fashion, visual-first 9:16 showcase reels for Carnival Planner features,
Soca Passport rewards, and VIP drops.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import time
import requests
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

from moneyprinter_client import moneyprinter_client
from hybrid_publisher import upload_local_to_public_cdn, publish_to_all_socials
from viral_copywriter import generate_viral_package

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def run_product_drop_reel(title="Soca Passport Loyalty & VIP Fete Drops", live=True):
    print("=" * 80)
    print("🌴 CARNIVAL PLANNER: COMPILING VIP PASSPORT & REWARDS SHOWCASE REEL")
    print("=" * 80)

    subject = f"Carnival Planner: {title}"
    script = (
        "Unlock exclusive fete discounts, early bird costume access, and digital passport stamps across Caribbean island carnivals. "
        "Claim your squad invite link and build your entire trip free at carnival-planner.com."
    )
    terms = [
        "luxury travel caribbean",
        "carnival costume feather",
        "tropical sunset beach party",
        "festival stage lights",
        "sound system speaker"
    ]

    default_voice = os.getenv("VOICE_NAME", "en-NG-EzinneNeural")

    print("\n[1/4] 🎬 Requesting High-Impact Video Reel from MoneyPrinterTurbo...")
    task_id = moneyprinter_client.submit_task(
        video_subject=subject,
        video_script=script,
        video_terms=terms,
        video_aspect="9:16",
        voice_name=default_voice,
        subtitles_enabled=True
    )
    print(f"   - Task ID: {task_id}")

    print("\n[2/4] ⏳ Rendering 9:16 Showcase Reel...")
    task_result = moneyprinter_client.poll_task(task_id, max_wait_seconds=360)

    if task_result.get("status") != "completed" or not task_result.get("video_url"):
        raise RuntimeError(f"Video generation failed: {task_result.get('error')}")

    local_video_path = moneyprinter_client.save_video_locally(
        task_result["video_url"],
        filename_prefix="product_drop_reel"
    )
    print(f"   - ✅ Video Rendered: {local_video_path}")

    print("\n[3/4] 🌐 Uploading Video to Fast Public CDN...")
    public_cdn_url = upload_local_to_public_cdn(local_video_path)
    print(f"   - ✅ Public CDN URL: {public_cdn_url}")

    print("\n[4/4] ✍️ Formatting Social Copy & Direct Checkout Link...")
    viral_pkg = generate_viral_package("Trinidad & Notting Hill 2026", "trinidad", style_preset="product_drop")

    if live:
        print("\n🚀 Broadcasting Product Reel to Instagram, YouTube Shorts, TikTok & Pinterest...")
        results = publish_to_all_socials(
            media_url_or_path=public_cdn_url,
            title=viral_pkg["title"],
            caption=viral_pkg["caption"],
            tags=viral_pkg["hashtag_list"],
            media_type="video",
            dry_run=False
        )

        print("=" * 80)
        print("🎉 PRODUCT DROP REEL BROADCAST COMPLETED!")
        print("=" * 80)
        return results
    else:
        print("\nℹ️ Dry-run mode completed.")
        return {"status": "success", "video_url": public_cdn_url}

if __name__ == "__main__":
    is_live = "--dry-run" not in sys.argv
    run_product_drop_reel(live=is_live)
