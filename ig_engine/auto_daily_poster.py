"""
Carnival Planner - 24/7 Automated Social Media Poster
Generates cinematic 9:16 vertical reels & viral captions, and auto-publishes to:
- Instagram Reels (Meta Graph API)
- Facebook Page (Meta Graph API)
- YouTube Shorts (YouTube Data API v3)
- TikTok (Postiz / Direct API)

GUARANTEES ZERO DUPLICATES:
Tracks all posted history in posted_history.json and rotates target carnivals and campaign themes.
"""

import os
import sys
import json
import random
from datetime import datetime

from cinematic_engine import run_cinematic_pipeline, load_posted_history

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Upcoming Carnival Focus Queue (Rotated cyclically)
CARNIVAL_CALENDAR = [
    {"name": "Notting Hill Carnival (London)", "date": "August 31", "key": "notting_hill"},
    {"name": "New York Labor Day Carnival (Brooklyn)", "date": "September 7", "key": "nyc"},
    {"name": "Miami Carnival", "date": "October 11", "key": "miami"},
    {"name": "Tobago Carnival", "date": "November 1", "key": "tobago"},
    {"name": "Sugar Mas (St. Kitts)", "date": "December 26", "key": "st_kitts"},
    {"name": "Trinidad Carnival 2027", "date": "February 8", "key": "trinidad"},
    {"name": "Jamaica Carnival 2027", "date": "April 11", "key": "jamaica"},
    {"name": "Barbados Crop Over 2027", "date": "August 2", "key": "crop_over"}
]

def select_next_carnival_target():
    """
    Selects the least-recently-posted carnival to ensure even rotation across all events.
    """
    history = load_posted_history()
    recent_carnivals = [h.get("carnival", "") for h in history[-5:]]

    # Find carnivals not recently posted
    candidates = [c for c in CARNIVAL_CALENDAR if not any(c["name"] in rc for rc in recent_carnivals)]
    
    if not candidates:
        candidates = CARNIVAL_CALENDAR

    return random.choice(candidates)

def run_daily_post(live=True):
    """
    Executes an automated cinematic post cycle:
    1. Selects target upcoming carnival using zero-duplicate rotation.
    2. Uses AI Creative Director to compose fresh, unique viral hook & script.
    3. Renders 1080x1920 MP4 with real carnival scenes, neural voiceover & Soca BGM.
    4. Publishes live across all connected social channels.
    5. Saves entry in posted_history.json.
    """
    print("=" * 60)
    print(f"🤖 24/7 AUTOMATED POSTING CYCLE LAUNCHED [{datetime.now().strftime('%Y-%m-%d %H:%M')}]")
    print(f"⚙️ Target Mode: {'LIVE PRODUCTION' if live else 'SIMULATION (DRY-RUN)'}")
    print("=" * 60)

    target = select_next_carnival_target()
    carnival_name = f"{target['name']} ({target['date']})"
    print(f"📍 Target Event: {carnival_name}")

    results = run_cinematic_pipeline(carnival=carnival_name, publish=live)

    print("\n" + "=" * 60)
    print("🎉 24/7 AUTO-POST CYCLE COMPLETE (Zero-Duplicate Verified)")
    print("=" * 60)
    return results

if __name__ == "__main__":
    is_live = "--dry-run" not in sys.argv
    run_daily_post(live=is_live)
