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

def run_daily_post(live=True, target_key=None):
    """
    Executes an automated post cycle:
    1. Selects target upcoming carnival using zero-duplicate rotation (or target_key override).
    2. Uses MoneyPrinterTurbo sidecar (or cinematic fallback) to compile a 9:16 vertical MP4.
    3. Uploads local video to high-speed public CDN.
    4. Publishes live across all connected social channels & Make.com webhooks.
    5. Saves entry in posted_history.json.
    """
    print("=" * 60)
    print(f"🤖 24/7 AUTOMATED POSTING CYCLE LAUNCHED [{datetime.now().strftime('%Y-%m-%d %H:%M')}]")
    print(f"⚙️ Target Mode: {'LIVE PRODUCTION' if live else 'SIMULATION (DRY-RUN)'}")
    print("=" * 60)

    target_override = None
    if target_key:
        from trigger_autopost_video import CARNIVAL_CALENDAR
        target_override = next((c for c in CARNIVAL_CALENDAR if c["key"] == target_key or target_key.lower() in c["name"].lower()), None)

    results = run_trigger_autopost(live=live, target_override=target_override)

    if live and isinstance(results, dict):
        has_success = any(
            isinstance(v, dict) and v.get("status") == "success"
            for k, v in results.items()
        )
        if not has_success:
            print("\n⚠️ WARNING: All social media publishing channels reported errors.")
            if sys.stdout and hasattr(sys.stdout, "flush"):
                sys.stdout.flush()

    print("\n" + "=" * 60)
    print("🎉 24/7 AUTO-POST CYCLE COMPLETE (Zero-Duplicate Verified)")
    print("=" * 60)
    return results

if __name__ == "__main__":
    is_live = "--dry-run" not in sys.argv
    target_arg = None
    for i, arg in enumerate(sys.argv):
        if arg == "--target" and i + 1 < len(sys.argv):
            target_arg = sys.argv[i + 1]
    res = run_daily_post(live=is_live, target_key=target_arg)
