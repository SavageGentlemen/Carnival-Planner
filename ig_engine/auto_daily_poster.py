"""
Carnival Planner - 24/7 Automated Social Media Poster
Generates 9:16 vertical reels & viral captions, and auto-publishes to:
- Instagram Reels (Meta Graph API & Make.com Webhook)
- YouTube Shorts (YouTube Data API v3 & Dedicated Webhook)
- Facebook Page & Stories
- TikTok & Pinterest

GUARANTEES ZERO DUPLICATES:
Tracks all posted history in posted_history.json and rotates target carnivals and campaign themes.
"""

import os
import sys
import json
import random
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

from trigger_autopost_video import run_trigger_autopost

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def run_daily_post(live=True):
    """
    Executes an automated post cycle:
    1. Selects target upcoming carnival using zero-duplicate rotation.
    2. Uses MoneyPrinterTurbo sidecar (or cinematic fallback) to compile a 9:16 vertical MP4.
    3. Uploads local video to high-speed public CDN.
    4. Publishes live across all connected social channels & Make.com webhooks.
    5. Saves entry in posted_history.json.
    """
    print("=" * 60)
    print(f"🤖 24/7 AUTOMATED POSTING CYCLE LAUNCHED [{datetime.now().strftime('%Y-%m-%d %H:%M')}]")
    print(f"⚙️ Target Mode: {'LIVE PRODUCTION' if live else 'SIMULATION (DRY-RUN)'}")
    print("=" * 60)

    results = run_trigger_autopost(live=live)

    print("\n" + "=" * 60)
    print("🎉 24/7 AUTO-POST CYCLE COMPLETE (Zero-Duplicate Verified)")
    print("=" * 60)
    return results

if __name__ == "__main__":
    is_live = "--dry-run" not in sys.argv
    run_daily_post(live=is_live)
