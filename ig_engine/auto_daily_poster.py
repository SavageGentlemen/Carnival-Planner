"""
Carnival Planner - 24/7 Automated Social Media Poster
Generates cinematic 9:16 vertical reels & viral captions, and auto-publishes to:
- Instagram Reels (Meta Graph API)
- Facebook Page (Meta Graph API)
- YouTube Shorts (YouTube Data API v3)
- TikTok (Postiz / Direct API)
"""

import os
import sys
import json
import random
from datetime import datetime

from cinematic_engine import run_cinematic_pipeline, CARNIVAL_CALENDAR if 'CARNIVAL_CALENDAR' in dir() else None

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Upcoming Carnival Focus Queue
CARNIVAL_CALENDAR = [
    {"name": "Notting Hill Carnival (London)", "date": "August 31"},
    {"name": "New York Labor Day Carnival (Brooklyn)", "date": "September 7"},
    {"name": "Miami Carnival", "date": "October 11"},
    {"name": "Tobago Carnival", "date": "November 1"},
    {"name": "Sugar Mas (St. Kitts)", "date": "December 26"},
    {"name": "Trinidad Carnival 2027", "date": "February 8"},
    {"name": "Jamaica Carnival 2027", "date": "April 11"},
    {"name": "Barbados Crop Over 2027", "date": "August 2"}
]

def run_daily_post(live=True):
    """
    Executes an automated cinematic post cycle:
    1. Selects target upcoming carnival from dynamic calendar.
    2. Uses AI Creative Director to compose viral hook & script.
    3. Renders 1080x1920 MP4 with neural voiceover, kinetic visuals & Soca BGM.
    4. Publishes live across all connected social channels.
    """
    print("=" * 60)
    print(f"🤖 24/7 AUTOMATED POSTING CYCLE LAUNCHED [{datetime.now().strftime('%Y-%m-%d %H:%M')}]")
    print(f"⚙️ Target Mode: {'LIVE PRODUCTION' if live else 'SIMULATION (DRY-RUN)'}")
    print("=" * 60)

    target = random.choice(CARNIVAL_CALENDAR)
    carnival_name = f"{target['name']} ({target['date']})"
    print(f"📍 Target Event: {carnival_name}")

    results = run_cinematic_pipeline(carnival=carnival_name, publish=live)

    print("\n" + "=" * 60)
    print("🎉 24/7 AUTO-POST CYCLE COMPLETE")
    print("=" * 60)
    return results

if __name__ == "__main__":
    is_live = "--dry-run" not in sys.argv
    run_daily_post(live=is_live)
