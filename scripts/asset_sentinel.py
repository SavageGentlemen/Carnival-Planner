#!/usr/bin/env python3
"""
Caribbean Carnival Planner — Asset & Dead Link Sentinel Bot
Scans event flyer URLs, ticketing links, and media assets to detect 404s,
broken CDN links, or missing imagery. Automatically replaces broken links
with high-res verified fallback carnival imagery or generates an audit report.
"""

import sys
import json
import argparse
from pathlib import Path
import urllib.request
import urllib.error

# High-resolution verified fallback images by category
FALLBACK_HERO_IMAGES = [
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80"
]

def check_url_health(url: str, timeout: int = 5) -> bool:
    """Performs a lightweight HEAD/GET request to verify URL accessibility."""
    if not url or not url.startswith(('http://', 'https://')):
        return False
    try:
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'CaribPulse-Asset-Sentinel/1.0 (HealthCheck)'}
        )
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return response.status in (200, 201, 301, 302)
    except Exception:
        return False

def scan_events_file(file_path: Path, dry_run: bool = False):
    """Scans and repairs broken event flyers in an events JSON file."""
    if not file_path.exists():
        print(f"[Sentinel] File not found: {file_path}")
        return {"scanned": 0, "broken": 0, "fixed": 0}

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    events = data if isinstance(data, list) else data.get("events", [])
    scanned = 0
    broken = 0
    fixed = 0

    print(f"[Sentinel] Scanning {len(events)} event entries in {file_path.name}...")

    for idx, event in enumerate(events[:50]): # Sample first 50 for quick execution
        scanned += 1
        flyer_url = event.get("imageUrl") or event.get("flyerUrl") or event.get("image")
        
        if flyer_url:
            is_alive = check_url_health(flyer_url)
            if not is_alive:
                broken += 1
                fallback = FALLBACK_HERO_IMAGES[idx % len(FALLBACK_HERO_IMAGES)]
                print(f"  ❌ Broken Flyer: {event.get('title', 'Unknown')} -> {flyer_url[:40]}...")
                
                if not dry_run:
                    if "imageUrl" in event:
                        event["imageUrl"] = fallback
                    elif "flyerUrl" in event:
                        event["flyerUrl"] = fallback
                    elif "image" in event:
                        event["image"] = fallback
                    fixed += 1

    if not dry_run and fixed > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"[Sentinel] Saved {fixed} repaired image links to {file_path.name}.")

    return {"scanned": scanned, "broken": broken, "fixed": fixed}

def main():
    if sys.stdout.encoding.lower() != 'utf-8':
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')

    parser = argparse.ArgumentParser(description="Asset & Dead Link Sentinel Bot")
    parser.add_argument("--file", type=str, default="events.json", help="Path to events JSON file")
    parser.add_argument("--dry-run", action="store_true", help="Audit mode without modifying files")
    args = parser.parse_args()

    project_root = Path(__file__).parent.parent
    target_file = project_root / args.file

    print("==================================================")
    print(" [*] Caribbean Carnival Planner Asset Sentinel Bot ")
    print("==================================================")
    print(f"Mode: {'DRY RUN (Audit Only)' if args.dry_run else 'AUTO-REPAIR'}")
    
    results = scan_events_file(target_file, dry_run=args.dry_run)
    print("\n--- Sentinel Scan Results ---")
    print(f"Total Scanned: {results['scanned']}")
    print(f"Broken Assets Detected: {results['broken']}")
    print(f"Repaired / Fallbacks Applied: {results['fixed']}")
    print("==================================================")

if __name__ == "__main__":
    main()
