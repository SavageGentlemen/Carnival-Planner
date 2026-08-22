"""
Carnival Planner - YouTube Shorts & Video Data API v3 Publisher
Publishes video shorts directly to YouTube using Google API Client.
"""

import os
import sys
import json
import requests
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

YOUTUBE_CLIENT_SECRET_FILE = os.getenv("YOUTUBE_CLIENT_SECRET_FILE", "client_secret.json")
YOUTUBE_REFRESH_TOKEN = os.getenv("YOUTUBE_REFRESH_TOKEN")
YOUTUBE_CLIENT_ID = os.getenv("YOUTUBE_CLIENT_ID")
YOUTUBE_CLIENT_SECRET = os.getenv("YOUTUBE_CLIENT_SECRET")

def get_youtube_access_token():
    """Obtains a fresh access token using refresh token credentials."""
    if not (YOUTUBE_REFRESH_TOKEN and YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET):
        return None
    
    url = "https://oauth2.googleapis.com/token"
    payload = {
        "client_id": YOUTUBE_CLIENT_ID,
        "client_secret": YOUTUBE_CLIENT_SECRET,
        "refresh_token": YOUTUBE_REFRESH_TOKEN,
        "grant_type": "refresh_token"
    }
    res = requests.post(url, data=payload, timeout=20)
    data = res.json()
    return data.get("access_token")

def publish_to_youtube(video_path_or_url, title, description, tags=None, category_id="24", privacy_status="public", dry_run=True):
    """
    Publishes a video or short to YouTube via YouTube Data API v3.
    :param video_path_or_url: Path to local MP4 file or public URL
    :param title: Video title (max 100 chars)
    :param description: Video description with #Shorts hashtag
    :param tags: List of tag strings
    :param category_id: Category ID (24 = Entertainment)
    :param privacy_status: 'public', 'unlisted', or 'private'
    :param dry_run: If True, skips actual network API calls
    """
    if tags is None:
        tags = ["Carnival", "Soca", "Shorts", "CarnivalPlanner"]

    # Ensure #Shorts tag is in title/description for Shorts shelf placement
    if "#Shorts" not in title and "#Shorts" not in description:
        description += " #Shorts"

    access_token = get_youtube_access_token()

    if dry_run or not access_token:
        print("\n--- [YOUTUBE DRY-RUN MODE / SIMULATION] ---")
        print(f"🎬 Title: {title[:100]}")
        print(f"📝 Description:\n{description}")
        print(f"🏷️ Tags: {', '.join(tags)}")
        print(f"🔒 Privacy Status: {privacy_status}")
        print(f"📁 Video Location: {video_path_or_url}")
        print("-------------------------------------------\n")
        return {"status": "success", "mode": "dry_run", "platform": "youtube", "video_id": "dry_run_yt_id"}

    print(f"🚀 Uploading video short to YouTube: '{title}'...")

    try:
        # YouTube Resumable Upload protocol endpoint
        upload_url = "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status"
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json; charset=UTF-8"
        }

        body = {
            "snippet": {
                "title": title[:100],
                "description": description,
                "tags": tags,
                "categoryId": category_id
            },
            "status": {
                "privacyStatus": privacy_status,
                "selfDeclaredMadeForKids": False
            }
        }

        init_res = requests.post(upload_url, headers=headers, json=body, timeout=30)
        if init_res.status_code != 200:
            print(f"❌ YouTube Upload Init Failed: {init_res.text}")
            return {"status": "error", "platform": "youtube", "error": init_res.text}

        upload_location = init_res.headers.get("Location")

        # Download or read video data
        if video_path_or_url.startswith("http://") or video_path_or_url.startswith("https://"):
            video_bytes = requests.get(video_path_or_url, timeout=60).content
        else:
            with open(video_path_or_url, "rb") as f:
                video_bytes = f.read()

        # Upload video binary payload
        upload_headers = {"Content-Type": "video/mp4"}
        upload_res = requests.put(upload_location, headers=upload_headers, data=video_bytes, timeout=120)
        res_json = upload_res.json()

        if "id" in res_json:
            video_id = res_json["id"]
            print(f"🎉 Short published live on YouTube! Video URL: https://youtube.com/shorts/{video_id}")
            return {"status": "success", "platform": "youtube", "video_id": video_id, "url": f"https://youtube.com/shorts/{video_id}"}
        else:
            print(f"❌ YouTube upload error: {res_json}")
            return {"status": "error", "platform": "youtube", "error": res_json}

    except Exception as e:
        print(f"❌ YouTube API Exception: {e}")
        return {"status": "error", "platform": "youtube", "error": str(e)}

if __name__ == "__main__":
    publish_to_youtube(
        video_path_or_url="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
        title="Trinidad Carnival 2026 Packing Essentials #Shorts",
        description="Don't travel to Trinidad Carnival without these 5 essentials! Check out Carnival Planner app.",
        dry_run=True
    )
