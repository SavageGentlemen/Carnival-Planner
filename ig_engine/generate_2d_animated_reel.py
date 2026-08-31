"""
Carnival Planner - 2D Animated & Motion Graphics Caribbean Viral Reel Generator
Uses MoneyPrinterTurbo sidecar with 2D animation / anime search terms, synchronized neural TTS voiceover,
and kinetic subtitles, then uploads to public CDN and broadcasts to Make.com & social channels.
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

def run_2d_animated_reel(live=True):
    print("=" * 80)
    print("🎨 CARNIVAL PLANNER: COMPILING 2D ANIMATED & MOTION GRAPHICS VIRAL REEL")
    print("=" * 80)

    subject = "Carnival Planner: 2D Animated Caribbean Sound System & Squad Radar Drop"
    script = (
        "Level up your Carnival standard with Carnival Planner. "
        "Real-time squad radar, automated fete drop alerts, and verified costume marketplace. "
        "Step into the next dimension of Caribbean lifestyle at carnival-planner dot com."
    )
    terms = [
        "2d animation motion graphics",
        "anime city night lights",
        "cartoon party dance loop",
        "2d neon sound waves",
        "anime aesthetic street"
    ]

    print("\n[1/4] 📡 Submitting 2D Animated Reel Task to MoneyPrinterTurbo...")
    print(f"   - Subject: {subject}")
    print(f"   - Animation Terms: {', '.join(terms)}")

    task_id = moneyprinter_client.submit_task(
        video_subject=subject,
        video_script=script,
        video_terms=terms,
        video_aspect="9:16",
        voice_name="en-US-ChristopherNeural",
        subtitles_enabled=True
    )
    print(f"   - Task ID: {task_id}")

    print("\n[2/4] ⏳ Rendering 2D Motion Graphics Video (Pexels Animation + Voiceover + Subtitles)...")
    task_result = moneyprinter_client.poll_task(task_id, max_wait_seconds=360)

    if task_result.get("status") != "completed" or not task_result.get("video_url"):
        raise RuntimeError(f"Video rendering failed: {task_result.get('error', 'Unknown error')}")

    local_video_path = moneyprinter_client.save_video_locally(
        task_result["video_url"],
        filename_prefix="2d_animated_carnival_reel"
    )
    print(f"   - ✅ 2D Animated Video saved locally: {local_video_path}")

    print("\n[3/4] 🌐 Uploading Video to Fast Public CDN...")
    public_cdn_url = upload_local_to_public_cdn(local_video_path)
    print(f"   - ✅ Public CDN URL: {public_cdn_url}")

    print("\n[4/4] ✍️ Formatting Viral Copy & Brand Hashtags...")
    viral_pkg = generate_viral_package("Notting Hill & NYC Carnival 2026", "notting_hill", style_preset="2d_anime")

    print("\n" + "-" * 50)
    print("📌 VIRAL POST DETAILS:")
    print(f"Title: {viral_pkg['title']}")
    print(f"CDN Video: {public_cdn_url}")
    print("-" * 50)

    if live:
        print("\n🚀 Broadcasting 2D Reel to Connected Social Channels & Webhooks...")
        results = publish_to_all_socials(
            media_url_or_path=public_cdn_url,
            title=viral_pkg["title"],
            caption=viral_pkg["caption"],
            tags=viral_pkg["hashtag_list"],
            media_type="video",
            dry_run=False
        )

        print("=" * 80)
        print("🎉 2D ANIMATED REEL GENERATED & BROADCAST DISPATCHED SUCCESSFULLY!")
        print("=" * 80)
        print(f"📹 Video Asset: {public_cdn_url}")
        print(f"📡 Dispatched To: Instagram Reels (Feed Enabled), YouTube Shorts, TikTok, Pinterest")
        print("=" * 80)
        return results
    else:
        print("\nℹ️ Dry-run mode. Reel compiled and ready for publishing.")
        return {"status": "success", "video_url": public_cdn_url}

if __name__ == "__main__":
    is_live = "--dry-run" not in sys.argv
    run_2d_animated_reel(live=is_live)
