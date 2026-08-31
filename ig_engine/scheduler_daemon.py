"""
Carnival Planner & MoneyPrinterTurbo - Local 3x Daily Auto-Poster Daemon
Runs in the background and triggers 3 live social media posts daily (9:00 AM, 3:00 PM, 9:00 PM local time).
"""

import os
import sys
import time
import subprocess
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

def run_scheduler():
    try:
        import schedule
    except ImportError:
        print("📦 Installing 'schedule' package...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "schedule"])
        import schedule

    from auto_daily_poster import run_daily_post
    from moneyprinter_client import moneyprinter_client

    print("=" * 70)
    print("🤖 CARNIVAL PLANNER: 24/7 AUTO-POSTER DAEMON LAUNCHED")
    print("⏰ Posting Slots: 09:00 AM | 03:00 PM | 09:00 PM (Daily)")
    health = moneyprinter_client.check_health()
    print(f"📡 AI Sidecar Status: {'🟢 ONLINE' if health['online'] else '🟡 STANDBY'}")
    print("=" * 70)

    def job():
        print(f"\n⏰ Scheduled Trigger Activated at {time.strftime('%Y-%m-%d %H:%M:%S')}")
        try:
            run_daily_post(live=True)
        except Exception as e:
            print(f"❌ Error during scheduled auto-post job: {e}")

    # Schedule 3 posts a day
    schedule.every().day.at("09:00").do(job)
    schedule.every().day.at("15:00").do(job)
    schedule.every().day.at("21:00").do(job)

    print("🟢 Daemon is active and waiting for next scheduled posting slot...")

    while True:
        schedule.run_pending()
        time.sleep(30)

if __name__ == "__main__":
    run_scheduler()
