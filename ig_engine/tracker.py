"""
Carnival Planner - Fete Drop & Flight Alert Tracker CLI
Main orchestration engine for reading drops, generating visuals, and publishing to IG.
"""

import os
import sys
import json
import argparse
import requests
from dotenv import load_dotenv

# Ensure stdout supports UTF-8 on Windows terminals
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Load env variables from root or local .env if present
load_dotenv()

from image_generator import create_alert_graphic
from ig_publisher import publish_to_instagram

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAMPLE_ALERTS_FILE = os.path.join(BASE_DIR, "sample_alerts.json")
POSTED_ALERTS_FILE = os.path.join(BASE_DIR, "posted_alerts.json")

def load_posted_ids():
    """Loads list of already posted alert IDs."""
    if os.path.exists(POSTED_ALERTS_FILE):
        try:
            with open(POSTED_ALERTS_FILE, "r", encoding="utf-8") as f:
                return set(json.load(f))
        except Exception:
            return set()
    return set()

def save_posted_id(alert_id):
    """Appends posted alert ID to local JSON state."""
    posted = load_posted_ids()
    posted.add(alert_id)
    with open(POSTED_ALERTS_FILE, "w", encoding="utf-8") as f:
        json.dump(list(posted), f, indent=2)

def load_alerts(source_url=None):
    """
    Loads alerts from Google Sheets CSV URL or local sample_alerts.json file.
    """
    sheet_url = source_url or os.getenv("GOOGLE_SHEET_CSV_URL")
    if sheet_url:
        print(f"📊 Fetching alerts from Google Sheets CSV: {sheet_url}...")
        try:
            resp = requests.get(sheet_url, timeout=15)
            if resp.status_code == 200:
                # Basic CSV parser
                lines = resp.text.splitlines()
                if len(lines) > 1:
                    headers = [h.strip().lower() for h in lines[0].split(",")]
                    alerts = []
                    for line in lines[1:]:
                        cols = line.split(",")
                        if len(cols) >= len(headers):
                            alert = {headers[i]: cols[i].strip() for i in range(len(headers))}
                            alerts.append(alert)
                    return alerts
        except Exception as e:
            print(f"⚠️ Failed to fetch Google Sheet CSV: {e}. Falling back to sample JSON.")

    print(f"📁 Loading alerts from local JSON: {SAMPLE_ALERTS_FILE}")
    if os.path.exists(SAMPLE_ALERTS_FILE):
        with open(SAMPLE_ALERTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def generate_caption(alert):
    """Formats an engaging Instagram caption with hashtags and app CTAs."""
    alert_type = alert.get("type", "FETE_DROP")
    title = alert.get("title", "")
    carnival = alert.get("carnival", "Caribbean Carnival")
    price = alert.get("price", "")

    if alert_type == "FLIGHT_ALERT":
        caption = (
            f"✈️ FLIGHT PRICE DROP ALERT! 🏝️\n\n"
            f"📍 Route: {title}\n"
            f"💰 Price: {price} (Roundtrip)\n"
            f"📅 Dates: {alert.get('travel_dates', 'N/A')}\n"
            f"✈️ Airline: {alert.get('airline', 'N/A')}\n\n"
            f"🔥 {alert.get('details', 'Book before fares go back up!')}\n\n"
            f"📲 Never miss a flight drop or fete ticket drop for {carnival}!\n"
            f"Track your full carnival itinerary & squad budget at CARNIVALPLANNER.APP (Link in bio)\n\n"
            f"#CarnivalPlanner #{carnival.replace(' ', '')} #FlightAlert #CheapFlights #CarnivalChasers #Soca #SocaMusic #CaribbeanTravel"
        )
    else:
        caption = (
            f"🔥 FETE TICKET DROP ALERT! 🎟️\n\n"
            f"🎉 Event: {title}\n"
            f"📍 Carnival: {carnival}\n"
            f"📅 Date: {alert.get('event_date', 'N/A')}\n"
            f"💵 Price: {price} ({alert.get('tier', 'General')})\n\n"
            f"⚡ {alert.get('details', 'Tickets sell out in minutes! Grab yours now.')}\n\n"
            f"📲 Organise your fete schedule, costume status & budget on CARNIVALPLANNER.APP (Link in bio)\n\n"
            f"#CarnivalPlanner #{carnival.replace(' ', '')} #FeteAlert #TicketDrop #SocaLife #TrinidadCarnival #BarbadosCropOver #JamaicaCarnival"
        )
    return caption

def run_tracker(dry_run=False, sheet_url=None):
    """Main execution loop for processing alerts."""
    alerts = load_alerts(sheet_url)
    posted_ids = load_posted_ids()

    print(f"\n🔎 Total alerts loaded: {len(alerts)}")
    pending_alerts = [a for a in alerts if a.get("id") not in posted_ids]
    print(f"⏳ Pending new alerts: {len(pending_alerts)}\n")

    if not pending_alerts:
        print("✨ No new alerts to process. All up to date!")
        return

    for alert in pending_alerts:
        alert_id = alert.get("id")
        print(f"==================================================")
        print(f"⚡ Processing Alert [{alert_id}]: {alert.get('title')}")
        print(f"==================================================")

        # Step 1: Generate Feed & Story Graphics
        feed_img_path = create_alert_graphic(alert, is_story=False)
        story_img_path = create_alert_graphic(alert, is_story=True)

        # Step 2: Format Caption
        caption = generate_caption(alert)

        # Step 3: Publish to Instagram
        # Note: In production, image_url must be a public URL (e.g. uploaded to S3 / Firebase / Imgur / GitHub raw)
        image_public_url = alert.get("image_url", f"https://raw.githubusercontent.com/user/repo/main/ig_engine/output/{os.path.basename(feed_img_path)}")
        
        res = publish_to_instagram(image_public_url, caption, dry_run=dry_run)

        if res.get("status") == "success":
            print(f"✅ Alert [{alert_id}] successfully handled ({res.get('mode', 'published')}).")
            if not dry_run:
                save_posted_id(alert_id)
        else:
            print(f"❌ Failed to publish Alert [{alert_id}]. Skipping save.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fete Drop & Flight Alert Tracker CLI")
    parser.add_argument("--dry-run", action="store_true", help="Run without posting to Instagram Graph API")
    parser.add_argument("--sheet-url", type=str, help="Google Sheet CSV URL")
    args = parser.parse_args()

    # Default to dry_run if flag passed or explicitly requested
    is_dry_run = args.dry_run or os.getenv("DRY_RUN", "true").lower() == "true"
    run_tracker(dry_run=is_dry_run, sheet_url=args.sheet_url)
