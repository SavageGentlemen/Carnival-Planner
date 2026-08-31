"""
Carnival Planner & MoneyPrinterTurbo - Hybrid Multi-Platform Auto-Publisher
Orchestrates simultaneous publishing to YouTube Shorts, Instagram Reels, Facebook Pages, TikTok, and Pinterest.
Automatically converts local MP4/image files to high-speed public CDN URLs for Make.com & Ayrshare webhooks.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import time
import json
import requests
import argparse
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

from ig_publisher import publish_to_instagram
from fb_publisher import publish_to_facebook
from youtube_publisher import publish_to_youtube
from tiktok_publisher import publish_to_tiktok

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

SITE_URL = os.getenv("SITE_URL", "https://carnival-planner.com")

def upload_local_to_public_cdn(media_url_or_path):
    """
    Checks if media is local; if so, searches candidate directories and uploads to
    fast public CDN (catbox.moe) so Make.com and social APIs can download the MP4/image.
    """
    if not media_url_or_path:
        return media_url_or_path

    if media_url_or_path.startswith("http://files.catbox.moe") or media_url_or_path.startswith("https://files.catbox.moe"):
        return media_url_or_path

    if media_url_or_path.startswith("http://") or media_url_or_path.startswith("https://"):
        return media_url_or_path

    # Clean local path
    clean_path = media_url_or_path.lstrip("/")
    candidate_paths = [
        os.path.abspath(media_url_or_path),
        os.path.abspath(clean_path),
        os.path.join(os.path.dirname(__file__), "output", os.path.basename(clean_path)),
        os.path.join(os.path.dirname(__file__), "assets", os.path.basename(clean_path)),
        os.path.join(os.getcwd(), "output", os.path.basename(clean_path)),
        os.path.join(os.getcwd(), "public", os.path.basename(clean_path)),
        os.path.join(os.getcwd(), "uploads", "videos", os.path.basename(clean_path)),
    ]

    target_file = next((p for p in candidate_paths if os.path.exists(p)), None)

    if not target_file:
        print(f"⚠️ Local asset not found in candidate paths for CDN upload: {media_url_or_path}")
        return media_url_or_path

    print(f"☁️ Uploading local asset ({os.path.basename(target_file)}) to public CDN for Make.com / Webhooks...")
    try:
        with open(target_file, "rb") as f:
            res = requests.post(
                "https://catbox.moe/user/api.php",
                data={"reqtype": "fileupload"},
                files={"fileToUpload": f},
                timeout=45
            )
            if res.status_code == 200 and res.text.strip().startswith("http"):
                cdn_url = res.text.strip()
                print(f"✅ Public CDN URL generated: {cdn_url}")
                return cdn_url
            else:
                print(f"⚠️ CDN response error ({res.status_code}): {res.text}")
    except Exception as e:
        print(f"⚠️ Public CDN upload error: {e}")

    return media_url_or_path

def publish_to_all_socials(media_url_or_path, title, caption, tags=None, media_type="video", dry_run=True):
    """
    Publishes media (video/photo) to YouTube Shorts, Instagram Reels, Facebook, TikTok, and Pinterest simultaneously.
    Supports both direct Make.com / Universal Social Webhooks and native Graph/YouTube APIs.
    """
    if tags is None:
        tags = ["#CarnivalPlanner", "#SocaPassport", "#Carnival2026", "#SocaMusic", "#Shorts", "#ReelsViral", "#FYP"]

    hashtag_str = " ".join([t if t.startswith("#") else f"#{t}" for t in tags])
    
    # Ensure Headline/Title is at top of caption if missing
    caption_text = caption.strip()
    if title and not caption_text.startswith(title):
        caption_text = f"{title}\n\n{caption_text}"

    # Ensure Hashtag stack is at bottom of caption if missing
    if hashtag_str and hashtag_str.split()[0] not in caption_text:
        caption_text = f"{caption_text}\n\n{hashtag_str}"

    full_caption = caption_text
    is_video = media_type.lower() in ["video", "reels"]

    print("=" * 60)
    print(f"🚀 HYBRID MULTI-PLATFORM AUTO-PUBLISHER [{media_type.upper()}]")
    print(f"📌 Title: {title}")
    print(f"⚙️ Mode: {'DRY-RUN (Simulation)' if dry_run else 'LIVE PRODUCTION'}")
    print("=" * 60)

    # 1. Upload local media to fast public CDN for cloud webhooks
    public_media_url = upload_local_to_public_cdn(media_url_or_path)

    results = {}

    # 2. Check for configured Make.com / Social Webhooks
    configured_webhooks = list(set(filter(None, [
        os.getenv("MAKE_WEBHOOK_URL"),
        os.getenv("INSTAGRAM_WEBHOOK_URL"),
        os.getenv("YOUTUBE_WEBHOOK_URL"),
        os.getenv("SOCIAL_WEBHOOK_URL")
    ])))

    if configured_webhooks and not dry_run:
        print(f"\n📡 Broadcasting via {len(configured_webhooks)} Webhook(s) to Make.com automation...")
        webhook_payload = {
            "title": title,
            "caption": full_caption,
            "videoUrl": public_media_url if is_video else None,
            "imageUrl": public_media_url if not is_video else None,
            "productLink": SITE_URL,
            "platforms": ["instagram", "youtube", "facebook", "tiktok", "pinterest"],
            "hashtags": tags,
            "timestamp": datetime.now().isoformat()
        }

        for hook_url in configured_webhooks:
            try:
                res = requests.post(hook_url, json=webhook_payload, headers={"Content-Type": "application/json"}, timeout=30)
                print(f"   - Webhook {hook_url} -> Status: {res.status_code} ({res.text.strip()[:60]})")
                results[f"webhook_{hook_url.split('/')[-1][:8]}"] = {
                    "status": "success" if res.status_code in [200, 201, 202] else "failed",
                    "code": res.status_code,
                    "response": res.text.strip()
                }
            except Exception as hook_err:
                print(f"   ❌ Webhook {hook_url} failed: {hook_err}")
                results[f"webhook_{hook_url.split('/')[-1][:8]}"] = {
                    "status": "error",
                    "error": str(hook_err)
                }

    # 3. Parallel Native API publishing
    def run_yt():
        if is_video:
            return ("youtube", publish_to_youtube(
                video_path_or_url=public_media_url,
                title=title,
                description=full_caption,
                tags=[t.strip("#") for t in tags],
                dry_run=dry_run
            ))
        return ("youtube", {"status": "skipped", "reason": "YouTube requires video media"})

    def run_ig():
        return ("instagram", publish_to_instagram(
            media_url_or_path=public_media_url,
            caption=full_caption,
            media_type="REELS" if is_video else "image",
            dry_run=dry_run
        ))

    def run_fb():
        return ("facebook", publish_to_facebook(
            media_url_or_path=public_media_url,
            caption=full_caption,
            media_type="REELS" if is_video else "image",
            dry_run=dry_run
        ))

    def run_tiktok():
        if is_video:
            return ("tiktok", publish_to_tiktok(
                video_url_or_path=public_media_url,
                caption=caption,
                tags=tags,
                dry_run=dry_run
            ))
        return ("tiktok", {"status": "skipped", "reason": "TikTok requires video media"})

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
        print(f"{status_icon} {platform.upper():<16}: {res.get('status', 'unknown').upper()} | Details: {res}")
    print("=" * 60 + "\n")

    return results

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Hybrid Social Media Auto-Publisher")
    parser.add_argument("--media", default="https://files.catbox.moe/dm4a33.mp4", help="Video or Image URL/path")
    parser.add_argument("--title", default="Notting Hill & NYC Carnival 2026 Survival Guide #Shorts", help="Title of post/video")
    parser.add_argument("--caption", default="Lock in your costume pickup, squad invite code, and road fete maps on Carnival Planner!", help="Caption body")
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
