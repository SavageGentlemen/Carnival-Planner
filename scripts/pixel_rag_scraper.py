#!/usr/bin/env python3
"""
Pixel RAG Scraper — Autonomous Visual Web Scraping & Ingestion Engine
Renders target websites with Headless Chrome, splits screenshots into visual tiles,
and uses Gemini Vision to extract structured event and costume band package data.

Features:
- Single URL/file scraping (`--url`, `--file`)
- Multi-target batch scraping from catalog (`--targets scripts/pixel_targets.json`)
- Dual extraction modes: 'events' (parties/fetes) and 'bands' (costume packages)
- Direct integration with `events.json` and Firebase Firestore (`carnivalEvents`)
- Dry-run and simulation fallbacks for offline testing
"""

import os
import sys
import json
import time
import shutil
import hashlib
import argparse
import subprocess
from pathlib import Path
from PIL import Image

# Default configuration
DEFAULT_VIEWPORT_WIDTH = 1280
DEFAULT_VIEWPORT_HEIGHT = 1400
DEFAULT_TILE_HEIGHT = 900
DEFAULT_TILE_OVERLAP = 150
DEFAULT_TIMEOUT = 45
DEFAULT_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

BAND_PROMPT = """
You are a precise multimodal visual web scraper.
You are given a rendered screenshot tile from a carnival costume/band package website.

Extract all package and section information present in the image into structured JSON adhering to this schema:
{
  "band_name": "String or null",
  "event_name": "String or null",
  "sections": [
    {
      "name": "Section Name",
      "tier": "Backline / Midline / Frontline / VIP / etc.",
      "price_usd": "Price with currency or null",
      "status": "AVAILABLE | FEW LEFT | SOLD OUT | WAITLIST ONLY | UNKNOWN",
      "deposit": "Deposit amount or null",
      "features": ["Feature 1", "Feature 2"],
      "inclusions_summary": "Short summary of inclusions"
    }
  ],
  "comparison_table": [
    {
      "feature": "Feature name",
      "values": { "Section A": "Value", "Section B": "Value" }
    }
  ],
  "route_or_notes": "Any parade route, dates, or logistical details visible in this tile"
}

IMPORTANT:
- Pay close attention to visual badges, pill tags, and color cues (e.g. green 'AVAILABLE', amber 'FEW LEFT', red 'SOLD OUT').
- For tables or checkmarks/crosses, read the visual row alignment accurately.
- Return ONLY valid JSON wrapped in ```json ... ``` code block.
"""

EVENT_PROMPT = """
You are a precise multimodal visual web scraper.
You are given a rendered screenshot tile from a Caribbean carnival / soca ticketing or event website.

Extract all parties, fetes, and events visible in this image into structured JSON adhering to this schema:
{
  "events": [
    {
      "title": "Exact Event or Fete Title",
      "date": "Exact Date and Time string (e.g. 'Fri Feb 13th 10pm - 4am') or null",
      "venue": "Venue name or street address or null",
      "city": "City or Country",
      "price": "Price string with currency (e.g. '$50 USD') or null",
      "status": "AVAILABLE | SOLD OUT | FEW LEFT | EARLY BIRD | TBD",
      "url": "Ticket or event URL if visible on page or null",
      "badge": "Any highlight badge like 'FEATURED', 'NEW', 'TIER 1' or null"
    }
  ]
}

IMPORTANT:
- Do not output 'TBD' if the date, venue, or price is readable in the image.
- Capture status badges, featured ribbons, and price tags accurately.
- Return ONLY valid JSON wrapped in ```json ... ``` code block.
"""

def find_chrome_binary():
    """Detect available Google Chrome / Chromium executable."""
    candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        shutil.which("google-chrome"),
        shutil.which("google-chrome-stable"),
        shutil.which("chromium"),
        shutil.which("chromium-browser"),
    ]
    for candidate in candidates:
        if candidate and os.path.exists(candidate) and os.access(candidate, os.X_OK):
            return candidate
    return None

def load_env_gemini_key(cli_key=None):
    """Attempt to load Gemini API key from CLI arg, environment, or project .env file."""
    if cli_key:
        return cli_key

    for var in ["GEMINI_API_KEY", "GOOGLE_API_KEY", "VITE_GOOGLE_API_KEY", "VITE_GEMINI_API_KEY"]:
        val = os.getenv(var)
        if val:
            return val

    env_paths = [Path(".env"), Path(__file__).resolve().parent.parent / ".env"]
    for env_path in env_paths:
        if env_path.exists():
            try:
                with open(env_path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        for var in ["GEMINI_API_KEY", "GOOGLE_API_KEY", "VITE_GOOGLE_API_KEY", "VITE_GEMINI_API_KEY"]:
                            if line.startswith(f"{var}="):
                                return line.split("=", 1)[1].strip().strip('"').strip("'")
            except Exception:
                pass
    return None

def render_page_to_screenshot(target_path_or_url, output_png_path, viewport_w=DEFAULT_VIEWPORT_WIDTH, viewport_h=DEFAULT_VIEWPORT_HEIGHT, timeout=DEFAULT_TIMEOUT):
    """Render page or HTML file to a high-resolution PNG using Headless Chrome."""
    chrome_bin = find_chrome_binary()
    if not chrome_bin:
        raise RuntimeError("No Google Chrome / Chromium executable found on system.")

    if target_path_or_url.startswith("http://") or target_path_or_url.startswith("https://"):
        url = target_path_or_url
    else:
        abs_path = os.path.abspath(target_path_or_url)
        if not os.path.exists(abs_path):
            raise FileNotFoundError(f"Target local file does not exist: {abs_path}")
        url = f"file://{abs_path}"

    os.makedirs(os.path.dirname(os.path.abspath(output_png_path)), exist_ok=True)
    profile_dir = os.path.abspath(".cache/chrome_headless_profile")
    os.makedirs(profile_dir, exist_ok=True)

    cmd = [
        chrome_bin,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        f"--user-data-dir={profile_dir}",
        "--virtual-time-budget=3000",
        f"--window-size={viewport_w},{viewport_h}",
        f"--screenshot={output_png_path}",
        url
    ]

    if os.path.exists(output_png_path):
        try:
            os.remove(output_png_path)
        except OSError:
            pass

    print(f"📸 [Pixel RAG] Rendering screenshot: {url}")
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    start_time = time.time()

    while time.time() - start_time < timeout:
        if os.path.exists(output_png_path) and os.path.getsize(output_png_path) > 1000:
            time.sleep(0.5)
            try:
                proc.kill()
            except Exception:
                pass
            break
        if proc.poll() is not None:
            break
        time.sleep(0.4)
    else:
        try:
            proc.kill()
        except Exception:
            pass

    if not os.path.exists(output_png_path) or os.path.getsize(output_png_path) == 0:
        raise RuntimeError(f"Screenshot capture timed out after {timeout}s for {url}")

    img = Image.open(output_png_path)
    print(f"   ✅ Captured {img.width}x{img.height}px ({os.path.getsize(output_png_path):,} bytes)")
    return output_png_path

def generate_pixel_tiles(screenshot_path, tiles_dir, tile_height=DEFAULT_TILE_HEIGHT, overlap_px=DEFAULT_TILE_OVERLAP):
    """Slices a screenshot into overlapping visual tiles to preserve 2D layout and text resolution."""
    os.makedirs(tiles_dir, exist_ok=True)
    img = Image.open(screenshot_path)
    width, height = img.size

    tiles = []
    if height <= tile_height:
        tile_path = os.path.join(tiles_dir, "tile_0.png")
        img.save(tile_path, "PNG")
        tiles.append({"index": 0, "path": tile_path, "box": (0, 0, width, height)})
        return tiles

    stride = tile_height - overlap_px
    y_start = 0
    tile_index = 0

    while y_start < height:
        y_end = min(y_start + tile_height, height)
        box = (0, y_start, width, y_end)
        tile_img = img.crop(box)
        tile_path = os.path.join(tiles_dir, f"tile_{tile_index}.png")
        tile_img.save(tile_path, "PNG")
        tiles.append({
            "index": tile_index,
            "path": tile_path,
            "box": box,
            "width": width,
            "height": y_end - y_start
        })
        tile_index += 1
        if y_end >= height:
            break
        y_start += stride

    print(f"   🧩 Generated {len(tiles)} visual tile(s) with {overlap_px}px overlap")
    return tiles

def extract_from_tile(tile_path, api_key, mode="bands", model_name=DEFAULT_MODEL):
    """Passes a single screenshot tile to Gemini Vision for structured data extraction."""
    import google.generativeai as genai

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name)
    prompt = EVENT_PROMPT if mode == "events" else BAND_PROMPT

    image = Image.open(tile_path)
    response = model.generate_content([prompt, image])

    raw_text = response.text.strip()
    if raw_text.startswith("```json"):
        raw_text = raw_text[7:]
    if raw_text.startswith("```"):
        raw_text = raw_text[3:]
    if raw_text.endswith("```"):
        raw_text = raw_text[:-3]

    return json.loads(raw_text.strip())

def merge_band_results(extractions):
    """Merges and deduplicates band extractions across overlapping tiles."""
    merged = {
        "band_name": None,
        "event_name": None,
        "sections": {},
        "comparison_table": [],
        "route_or_notes": []
    }

    for ext in extractions:
        if not ext:
            continue
        if ext.get("band_name") and not merged["band_name"]:
            merged["band_name"] = ext["band_name"]
        if ext.get("event_name") and not merged["event_name"]:
            merged["event_name"] = ext["event_name"]

        for sec in ext.get("sections", []):
            name = sec.get("name")
            if not name:
                continue
            if name not in merged["sections"]:
                merged["sections"][name] = sec
            else:
                existing = merged["sections"][name]
                for k, v in sec.items():
                    if v and not existing.get(k):
                        existing[k] = v
                if "features" in sec:
                    existing_feats = set(existing.get("features", []))
                    existing["features"] = list(existing_feats.union(sec["features"]))

        for row in ext.get("comparison_table", []):
            feat = row.get("feature")
            if feat and not any(r.get("feature") == feat for r in merged["comparison_table"]):
                merged["comparison_table"].append(row)

        route = ext.get("route_or_notes")
        if route and route not in merged["route_or_notes"]:
            merged["route_or_notes"].append(route)

    merged["sections"] = list(merged["sections"].values())
    return merged

def merge_event_results(extractions, default_location="caribbean", source="PixelRAG"):
    """Merges and standardizes events into the project's events.json format."""
    events_by_id = {}

    for ext in extractions:
        if not ext or "events" not in ext:
            continue
        for evt in ext["events"]:
            title = evt.get("title", "").strip()
            if not title:
                continue
            
            # Generate deterministic ID
            raw_key = f"{title}_{evt.get('date', '')}_{evt.get('venue', '')}".lower()
            evt_id = hashlib.md5(raw_key.encode("utf-8")).hexdigest()[:16]

            events_by_id[evt_id] = {
                "id": evt_id,
                "title": title,
                "date": evt.get("date") or "TBD",
                "venue": evt.get("venue") or "TBD",
                "price": evt.get("price") or "TBD",
                "url": evt.get("url") or "#",
                "source": source,
                "image": evt.get("image"),
                "location": default_location,
                "status": evt.get("status", "AVAILABLE")
            }

    return list(events_by_id.values())

def sync_to_root_events_json(new_events, events_json_path="events.json"):
    """Merges new events into root events.json without duplicate IDs."""
    existing_events = []
    if os.path.exists(events_json_path):
        try:
            with open(events_json_path, "r", encoding="utf-8") as f:
                existing_events = json.load(f)
        except Exception as e:
            print(f"⚠️  Could not read existing {events_json_path}: {e}")

    # Build map of existing events
    event_map = {e.get("id"): e for e in existing_events if e.get("id")}
    
    # Update or prepend fresh events
    updated_count = 0
    for evt in new_events:
        evt_id = evt.get("id")
        if evt_id:
            event_map[evt_id] = evt
            updated_count += 1

    final_list = list(event_map.values())
    with open(events_json_path, "w", encoding="utf-8") as f:
        json.dump(final_list, f, indent=2)

    print(f"💾 [Pixel RAG] Synced {updated_count} fresh event(s) to {events_json_path} (Total: {len(final_list):,} events)")
    return len(final_list)

def sync_to_firestore(carnival_id, events):
    """Optionally syncs scraped events to Firebase Firestore squad-db."""
    try:
        import firebase_admin
        from firebase_admin import credentials, firestore

        if not firebase_admin._apps:
            sa_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")
            if sa_json:
                cred = credentials.Certificate(json.loads(sa_json))
                firebase_admin.initialize_app(cred)
            else:
                firebase_admin.initialize_app()

        db = firestore.client()
        doc_ref = db.collection("carnivalEvents").document(carnival_id)
        doc_ref.set({
            "carnivalId": carnival_id,
            "eventCount": len(events),
            "events": events,
            "lastScrapedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "source": "PixelRAG"
        }, merge=True)
        print(f"🔥 [Pixel RAG] Synced {len(events)} event(s) to Firestore doc: carnivalEvents/{carnival_id}")
    except Exception as e:
        print(f"ℹ️  [Pixel RAG] Firestore sync skipped: {e}")

def run_single_target(target, api_key, dry_run=False, model=DEFAULT_MODEL, output_dir="scripts/output_tiles"):
    """Scrapes a single URL or file target and returns extracted payload."""
    target_id = target.get("id", "target")
    url = target.get("url") or target.get("file")
    mode = target.get("type", "events")
    carnival_id = target.get("carnivalId", "caribbean")
    target_dir = os.path.join(output_dir, target_id)

    screenshot_path = os.path.join(target_dir, "full_screenshot.png")
    render_page_to_screenshot(url, screenshot_path, timeout=DEFAULT_TIMEOUT)
    tiles = generate_pixel_tiles(screenshot_path, target_dir)

    if dry_run or not api_key:
        return {"target": target_id, "dry_run": True, "tiles": len(tiles)}

    print(f"🧠 [Pixel RAG] Extracting with Gemini Vision ({mode} mode)...")
    tile_extractions = []
    for tile in tiles:
        try:
            res = extract_from_tile(tile["path"], api_key, mode=mode, model_name=model)
            tile_extractions.append(res)
        except Exception as e:
            print(f"   ❌ Tile extraction error: {e}")

    if mode == "bands":
        return merge_band_results(tile_extractions)
    else:
        return merge_event_results(tile_extractions, default_location=carnival_id, source=target.get("name", "PixelRAG"))

def main():
    parser = argparse.ArgumentParser(description="Pixel RAG Scraper — Visual Web Scraping Engine")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--file", help="Path to local HTML file to scrape")
    group.add_argument("--url", help="Web URL to scrape")
    group.add_argument("--targets", help="Path to targets JSON file for batch scraping")

    parser.add_argument("--limit", type=int, default=None, help="Limit number of targets in batch mode")
    parser.add_argument("--output", default="scripts/extracted_carnival_data.json", help="Path to output JSON")
    parser.add_argument("--tiles-dir", default="scripts/output_tiles", help="Directory to save visual tiles")
    parser.add_argument("--dry-run", action="store_true", help="Render and tile without calling Gemini API")
    parser.add_argument("--sync-firestore", action="store_true", help="Sync results directly to Firestore")
    parser.add_argument("--sync-events-json", action="store_true", default=True, help="Merge results to root events.json")
    parser.add_argument("--api-key", default=None, help="Gemini API Key")
    parser.add_argument("--model", default=DEFAULT_MODEL, help="Gemini vision model name")

    args = parser.parse_args()

    print("=" * 65)
    print("🚀 PIXEL RAG SCRAPER: AUTONOMOUS VISUAL EXTRACTION ENGINE")
    print("=" * 65)

    api_key = load_env_gemini_key(args.api_key)

    # 1. Batch Targets Mode
    if args.targets:
        with open(args.targets, "r", encoding="utf-8") as f:
            all_targets = json.load(f)

        active_targets = [t for t in all_targets if t.get("active", True)]
        if args.limit:
            active_targets = active_targets[:args.limit]

        print(f"📋 Running batch extraction across {len(active_targets)} target(s)...")
        collected_events = []
        collected_bands = []

        for target in active_targets:
            print(f"\n--- Target: {target.get('name')} ({target.get('url')}) ---")
            try:
                result = run_single_target(
                    target,
                    api_key=api_key,
                    dry_run=args.dry_run,
                    model=args.model,
                    output_dir=args.tiles_dir
                )
                if isinstance(result, list):
                    collected_events.extend(result)
                    if args.sync_firestore:
                        sync_to_firestore(target.get("carnivalId", "caribbean"), result)
                elif isinstance(result, dict) and "sections" in result:
                    collected_bands.append(result)
            except Exception as e:
                print(f"❌ Error scraping target {target.get('name')}: {e}")

        # Sync events.json if events were extracted
        if collected_events and args.sync_events_json:
            sync_to_root_events_json(collected_events)

        print("\n" + "=" * 65)
        print(f"🎉 Batch scraping finished! Processed {len(active_targets)} target(s).")
        print("=" * 65)
        return

    # 2. Single Target Mode
    target_info = {
        "id": "single_target",
        "url": args.url,
        "file": args.file,
        "type": "bands" if args.file else "events",
        "carnivalId": "caribbean"
    }

    result = run_single_target(
        target_info,
        api_key=api_key,
        dry_run=args.dry_run,
        model=args.model,
        output_dir=args.tiles_dir
    )

    os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)

    print(f"\n🎉 Saved extracted data to: {args.output}")

if __name__ == "__main__":
    main()
