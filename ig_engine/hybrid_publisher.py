"""
Carnival Planner & MoneyPrinterTurbo - Hybrid Multi-Platform Auto-Publisher
Orchestrates simultaneous publishing to YouTube Shorts, Instagram Reels, Facebook Pages, and TikTok.
"""

import os
import sys
import json
import argparse
from concurrent.futures import ThreadPoolExecutor

from ig_publisher import publish_to_instagram
from fb_publisher import publish_to_facebook
from youtube_publisher import publish_to_youtube
from tiktok_publisher import publish_to_tiktok

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def publish_to_all_socials(media_url_or_path, title, caption, tags=None, media_type="video", dry_run=True):
    """
    Publishes media (video/photo) to YouTube, Instagram, Facebook, and TikTok simultaneously.
    :param media_url_or_path: Public URL or local path to video (MP4) or graphic (PNG/JPG)
    :param title: Video/post title
    :param caption: Main caption text with details & call-to-actions
    :param tags: List of hashtags
    :param media_type: 'video' or 'image'
    :param dry_run: If True, operates in simulation mode without posting live network API requests
    """
    if tags is None:
        tags = ["#Carnival2026", "#SocaMusic", "#TrinidadCarnival", "#CarnivalPlanner"]

    hashtag_str = " ".join([t if t.startswith("#") else f"#{t}" for t in tags])
    
    # Ensure Headline/Title is at top of caption if missing
    caption_text = caption.strip()
    if title and not caption_text.startswith(title):
        caption_text = f"{title}\n\n{caption_text}"

    # Ensure Hashtag stack is at bottom of caption if missing
    if hashtag_str and hashtag_str.split()[0] not in caption_text:
        caption_text = f"{caption_text}\n\n{hashtag_str}"

    full_caption = caption_text

    print("=" * 60)
    print(f"🚀 HYBRID AUTO-PUBLISHER LAUNCHING [{media_type.upper()}]")
    print(f"📌 Title: {title}")
    print(f"⚙️ Mode: {'DRY-RUN (Simulation)' if dry_run else 'LIVE PRODUCTION'}")
    print("=" * 60)

    results = {}

    def run_yt():
        if media_type == "video":
            return ("youtube", publish_to_youtube(
                video_path_or_url=media_url_or_path,
                title=title,
                description=full_caption,
                tags=[t.strip("#") for t in tags],
                dry_run=dry_run
            ))
        return ("youtube", {"status": "skipped", "reason": "YouTube only supports video uploads"})

    def run_ig():
        return ("instagram", publish_to_instagram(
            media_url_or_path=media_url_or_path,
            caption=full_caption,
            media_type=media_type,
            dry_run=dry_run
        ))

    def run_fb():
        return ("facebook", publish_to_facebook(
            media_url_or_path=media_url_or_path,
            caption=full_caption,
            media_type=media_type,
            dry_run=dry_run
        ))

    def run_tiktok():
        if media_type == "video":
            return ("tiktok", publish_to_tiktok(
                video_url_or_path=media_url_or_path,
                caption=caption,
                tags=tags,
                dry_run=dry_run
            ))
        return ("tiktok", {"status": "skipped", "reason": "TikTok requires short video media"})

    # Run tasks in parallel threads
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = [
            executor.submit(run_yt),
            executor.submit(run_ig),
            executor.submit(run_fb),
            executor.submit(run_tiktok)
        ]
        for f in futures:
            platform, res = f.result()
            results[platform] = res

    print("\n" + "=" * 60)
    print("📊 HYBRID MULTI-PUBLISHER SUMMARY REPORT")
    print("=" * 60)
    for platform, res in results.items():
        status_icon = "✅" if res.get("status") == "success" else ("⚠️" if res.get("status") == "skipped" else "❌")
        print(f"{status_icon} {platform.upper():<10}: {res.get('status', 'unknown').upper()} | Details: {res}")
    print("=" * 60 + "\n")

    return results

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Hybrid Social Media Auto-Publisher")
    parser.add_argument("--media", default="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", help="Video or Image URL/path")
    parser.add_argument("--title", default="Trinidad Carnival 2026 Fete Drop Alert!", help="Title of post/video")
    parser.add_argument("--caption", default="Tickets for Soca Brainwash 2026 are officially droping! Check details on Carnival Planner app.", help="Caption body")
    parser.add_argument("--type", choices=["video", "image"], default="video", help="Media type (video or image)")
    parser.add_argument("--live", action="store_true", help="Set flag to post live (default is dry-run simulation)")

    args = parser.parse_args()

    publish_to_all_socials(
        media_url_or_path=args.media,
        title=args.title,
        caption=args.caption,
        media_type=args.type,
        dry_run=not args.live
    )
