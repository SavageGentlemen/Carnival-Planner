"""
Carnival Planner & MoneyPrinterTurbo - Local 3x Daily Auto-Poster Daemon
Runs in the background on your PC and triggers 3 live social media posts daily (9:00 AM, 3:00 PM, 9:00 PM local time).
"""

import sys
import time
import subprocess

def run_scheduler():
    try:
        import schedule
    except ImportError:
        print("📦 Installing 'schedule' package...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "schedule"])
        import schedule

    from auto_daily_poster import run_daily_post

    print("=" * 60)
    print("🤖 LOCAL 24/7 AUTO-POSTER DAEMON LAUNCHED")
    print("⏰ Posting Schedule: 9:00 AM | 3:00 PM | 9:00 PM (Daily)")
    print("=" * 60)

    def job():
        print(f"\n⏰ Scheduled Trigger Activated at {time.strftime('%Y-%m-%d %H:%M:%S')}")
        run_daily_post(live=True)

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
