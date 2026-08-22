"""
Carnival Planner - TikTok Auto-Publisher Bridge
Posts videos to TikTok via Postiz Open-Source API Bridge or TikTok Content Posting API.
"""

import os
import sys
import requests
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

POSTIZ_API_URL = os.getenv("POSTIZ_API_URL", "http://localhost:3000/api")
POSTIZ_API_KEY = os.getenv("POSTIZ_API_KEY")
TIKTOK_ACCESS_TOKEN = os.getenv("TIKTOK_ACCESS_TOKEN")

def publish_to_tiktok(video_url_or_path, caption, tags=None, dry_run=True):
    """
    Publishes a short video to TikTok via Postiz Self-Hosted API or Direct TikTok API.
    :param video_url_or_path: Public URL or local path of the MP4 video file
    :param caption: Text caption with hashtags
    :param tags: List of hashtags
    :param dry_run: If True, skips actual network API calls
    """
    if tags is None:
        tags = ["#carnival2026", "#socamusic", "#trinidadcarnival", "#carnivalplanner"]

    full_caption = f"{caption}\n\n{' '.join(tags)}"

    if dry_run or (not POSTIZ_API_KEY and not TIKTOK_ACCESS_TOKEN):
        print("\n--- [TIKTOK DRY-RUN MODE / SIMULATION] ---")
        print(f"🎵 Platform: TikTok (via Postiz Bridge / API)")
        print(f"🔗 Video URL: {video_url_or_path}")
        print(f"📝 Caption:\n{full_caption}")
        print("-------------------------------------------\n")
        return {"status": "success", "mode": "dry_run", "platform": "tiktok", "post_id": "dry_run_tiktok_id"}

    print("🚀 Uploading video short to TikTok...")

    try:
        # Route 1: Postiz Open-Source Self-Hosted API (Recommended)
        if POSTIZ_API_KEY:
            endpoint = f"{POSTIZ_API_URL}/v1/posts/schedule"
            headers = {
                "Authorization": f"Bearer {POSTIZ_API_KEY}",
                "Content-Type": "application/json"
            }
            payload = {
                "providers": ["tiktok"],
                "content": full_caption,
                "media": [video_url_or_path],
                "publishNow": True
            }
            res = requests.post(endpoint, json=payload, headers=headers, timeout=45)
            data = res.json()

            if res.status_code in [200, 201]:
                print(f"🎉 Video dispatched to TikTok via Postiz! ID: {data.get('id')}")
                return {"status": "success", "platform": "tiktok", "post_id": data.get("id")}
            else:
                print(f"❌ Postiz TikTok error: {data}")
                return {"status": "error", "platform": "tiktok", "error": data}

        # Route 2: TikTok Official Direct Content Posting API
        elif TIKTOK_ACCESS_TOKEN:
            endpoint = "https://open.tiktokapis.com/v2/post/publish/video/init/"
            headers = {
                "Authorization": f"Bearer {TIKTOK_ACCESS_TOKEN}",
                "Content-Type": "application/json"
            }
            payload = {
                "post_info": {
                    "title": full_caption[:150],
                    "privacy_level": "PUBLIC_TO_EVERYONE",
                    "disable_duet": False,
                    "disable_stitch": False,
                    "disable_comment": False
                },
                "source_info": {
                    "source": "PULL_FROM_URL",
                    "video_url": video_url_or_path
                }
            }
            res = requests.post(endpoint, json=payload, headers=headers, timeout=45)
            data = res.json()

            if data.get("error", {}).get("code") == "ok":
                publish_id = data.get("data", {}).get("publish_id")
                print(f"🎉 Video submitted to TikTok Direct API! Publish ID: {publish_id}")
                return {"status": "success", "platform": "tiktok", "publish_id": publish_id}
            else:
                print(f"❌ TikTok API error: {data}")
                return {"status": "error", "platform": "tiktok", "error": data}

    except Exception as e:
        print(f"❌ TikTok Publisher Exception: {e}")
        return {"status": "error", "platform": "tiktok", "error": str(e)}

if __name__ == "__main__":
    publish_to_tiktok(
        video_url_or_path="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
        caption="POV: You're getting ready for Trinidad Carnival 2026 🎉",
        dry_run=True
    )
