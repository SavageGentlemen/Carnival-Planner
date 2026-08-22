#!/usr/bin/env python3
"""
Faceless Video Distribution Engine
Generates vertical 1080x1920 promotional videos & audio voiceovers for YouTube Shorts.
"""

import os
import sys
import json
import argparse
import asyncio
from PIL import Image, ImageDraw, ImageFont

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

VIDEO_OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "output", "shorts")

PROMOTIONAL_SCRIPTS = [
    {
        "id": "trinidad-flight-drop",
        "title": "🚨 Trinidad Carnival Flight Drop Alert!",
        "script": "Flight prices to Port of Spain just dropped by 35 percent! JetBlue and Caribbean Airlines have roundtrip deals under 450 dollars. Download the Carnival Planner app to track live deals before prices surge!",
        "bg_color": (20, 10, 35),
        "accent_color": (236, 72, 153),
        "headline": "TRINIDAD FLIGHT DROP",
        "subhead": "POS Roundtrips starting at $425"
    },
    {
        "id": "crop-over-fete-guide",
        "title": "🌴 Barbados Crop Over 2026 Secrets",
        "script": "Heading to Barbados Crop Over? Mimosa Breakfast Party tickets and Foreday Morning bands are filling up fast. Get your complete Crop Over itinerary and costume guide at carnival-planner.web.app!",
        "bg_color": (15, 30, 45),
        "accent_color": (6, 182, 212),
        "headline": "BARBADOS CROP OVER",
        "subhead": "Essential Fetes & Kadooment Guide"
    }
]

async def generate_speech_edge_tts(text, output_mp3):
    """Synthesizes high quality neural speech audio using edge-tts."""
    try:
        import edge_tts
        communicate = edge_tts.Communicate(text, "en-US-ChristopherNeural")
        await communicate.save(output_mp3)
        print(f"  🎙️ Synthesized voiceover audio: {output_mp3}")
        return True
    except Exception as e:
        print(f"  ⚠️ edge-tts audio synthesis warning: {e}")
        return False

def generate_vertical_thumbnail(promo, output_png):
    """Generates 1080x1920 vertical canvas graphic frame for YouTube Shorts."""
    width, height = 1080, 1920
    img = Image.new("RGB", (width, height), color=promo["bg_color"])
    draw = ImageDraw.Draw(img)

    # Decorative gradient glow circles
    draw.ellipse([(-100, -100), (600, 600)], fill=(promo["accent_color"][0]//2, promo["accent_color"][1]//2, promo["accent_color"][2]//2))
    draw.ellipse([(400, 1200), (1200, 2000)], fill=(120, 40, 200))

    # Header Card
    draw.rectangle([(80, 250), (1000, 400)], fill=promo["accent_color"])
    
    # Simple font fallback
    try:
        font_large = ImageFont.truetype("arial.ttf", 64)
        font_sub = ImageFont.truetype("arial.ttf", 44)
        font_body = ImageFont.truetype("arial.ttf", 36)
    except IOError:
        font_large = ImageFont.load_default()
        font_sub = font_large
        font_body = font_large

    draw.text((120, 300), promo["headline"], fill=(255, 255, 255), font=font_large)
    draw.text((100, 480), promo["subhead"], fill=(255, 255, 255), font=font_sub)

    # Content preview box
    draw.rectangle([(80, 600), (1000, 1400)], outline=promo["accent_color"], width=6)
    
    # Multiline text wrap
    words = promo["script"].split()
    lines = []
    curr_line = ""
    for w in words:
        if len(curr_line + " " + w) < 32:
            curr_line += " " + w
        else:
            lines.append(curr_line)
            curr_line = w
    if curr_line:
        lines.append(curr_line)

    y_off = 680
    for line in lines[:12]:
        draw.text((120, y_off), line.strip(), fill=(230, 230, 240), font=font_body)
        y_off += 55

    # Footer CTA
    draw.rectangle([(140, 1550), (940, 1680)], fill=(255, 255, 255))
    draw.text((180, 1600), "PLAN ON CARNIVAL-PLANNER.WEB.APP", fill=(10, 10, 20), font=font_sub)

    os.makedirs(os.path.dirname(output_png), exist_ok=True)
    img.save(output_png)
    print(f"  🖼️ Generated vertical frame: {output_png}")

async def main_async(dry_run):
    os.makedirs(VIDEO_OUTPUT_DIR, exist_ok=True)
    print("🎬 Running Faceless Video Generation Pipeline...")

    generated_assets = []
    for promo in PROMOTIONAL_SCRIPTS:
        frame_file = os.path.join(VIDEO_OUTPUT_DIR, f"{promo['id']}_frame.png")
        audio_file = os.path.join(VIDEO_OUTPUT_DIR, f"{promo['id']}_audio.mp3")
        meta_file = os.path.join(VIDEO_OUTPUT_DIR, f"{promo['id']}_meta.json")

        generate_vertical_thumbnail(promo, frame_file)
        
        if not dry_run:
            await generate_speech_edge_tts(promo["script"], audio_file)

        meta = {
            "id": promo["id"],
            "title": promo["title"],
            "description": f"{promo['script']}\n\nPlan your trip now: https://carnival-planner.web.app\n#CarnivalPlanner #Soca #Carnival2026 #Shorts",
            "frameImage": frame_file,
            "audioFile": audio_file,
            "status": "ready_for_upload"
        }
        with open(meta_file, "w") as f:
            json.dump(meta, f, indent=2)

        generated_assets.append(meta)

    print(f"✨ Faceless Video Distribution prepared {len(generated_assets)} Shorts packages under {VIDEO_OUTPUT_DIR}")

def main():
    parser = argparse.ArgumentParser(description="Faceless Video Distribution Pipeline")
    parser.add_argument("--dry-run", action="store_true", help="Run without generating audio")
    args = parser.parse_args()

    asyncio.run(main_async(args.dry_run))

if __name__ == "__main__":
    main()
