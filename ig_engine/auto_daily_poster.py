"""
Carnival Planner & MoneyPrinterTurbo - 24/7 Auto Daily Poster Engine
Generates and publishes 3 viral short videos & alert graphics per day across all social media.
"""

import os
import sys
import json
import random
from datetime import datetime

from generate_video import generate_carnival_short_video
from viral_copywriter import generate_viral_package
from hybrid_publisher import publish_to_all_socials

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Upcoming 2026/2027 Carnivals
CARNIVAL_CALENDAR = [
    {"name": "Notting Hill Carnival (London)", "key": "notting_hill", "date": "August 31"},
    {"name": "New York Labor Day Carnival (Brooklyn)", "key": "nyc", "date": "September 7"},
    {"name": "Miami Carnival", "key": "miami", "date": "October 11"},
    {"name": "Tobago Carnival", "key": "tobago", "date": "November 1"},
    {"name": "Sugar Mas (St. Kitts)", "key": "st_kitts", "date": "December 26"},
    {"name": "Trinidad Carnival 2027", "key": "trinidad", "date": "February 8"}
]

def run_daily_post(live=True):
    """
    Executes a 3x-a-day automated post cycle:
    1. Selects upcoming target carnival.
    2. Generates dynamic viral video & copy.
    3. Publishes live across Instagram Reels, YouTube Shorts, TikTok & Facebook Pages.
    """
    print("=" * 60)
    print(f"🤖 24/7 AUTOMATED POSTING CYCLE LAUNCHED [{datetime.now().strftime('%Y-%m-%d %H:%M')}]")
    print(f"⚙️ Target Mode: {'LIVE PRODUCTION' if live else 'SIMULATION (DRY-RUN)'}")
    print("=" * 60)

    # 1. Select upcoming carnival
    target = random.choice(CARNIVAL_CALENDAR)
    carnival_name = f"{target['name']} ({target['date']})"
    location_key = target['key']

    print(f"📍 Target Event: {carnival_name}")

    # 2. Generate Viral Copy Package
    copy_pkg = generate_viral_package(carnival_name, location_key)
    print(f"📌 Generated Title: {copy_pkg['title']}")

    # 3. Generate Video File
    video_filename = f"auto_short_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp4"
    video_path = generate_carnival_short_video(video_filename)

    # 4. Auto-Publish Live
    print(f"\n🚀 Dispatching Live Auto-Post across Social Networks...")
    results = publish_to_all_socials(
        media_url_or_path=video_path,
        title=copy_pkg['title'],
        caption=copy_pkg['caption'],
        tags=copy_pkg['hashtag_list'],
        media_type="video",
        dry_run=not live
    )

    print("\n" + "=" * 60)
    print("🎉 24/7 AUTO-POST CYCLE COMPLETE")
    print("=" * 60)
    return results

if __name__ == "__main__":
    is_live = "--dry-run" not in sys.argv
    run_daily_post(live=is_live)
