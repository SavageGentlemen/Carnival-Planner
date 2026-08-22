"""
Carnival Planner - Facebook Page Graph API Publisher
Publishes image & video posts to Facebook Pages via Meta Graph API.
Supports direct local file binary uploads & public media URLs.
"""

import os
import sys
import requests
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

FB_PAGE_ID = os.getenv("FB_PAGE_ID")
FB_PAGE_ACCESS_TOKEN = os.getenv("FB_PAGE_ACCESS_TOKEN")
GRAPH_API_URL = "https://graph.facebook.com/v19.0"

def get_public_media_url(file_path_or_url):
    """If file_path_or_url is a local file, uploads to a temporary host to get a public HTTPS URL."""
    if file_path_or_url.startswith("http://") or file_path_or_url.startswith("https://"):
        return file_path_or_url

    if not os.path.exists(file_path_or_url):
        return file_path_or_url

    print(f"☁️ Uploading local file '{os.path.basename(file_path_or_url)}' for Facebook Page video access...")
    try:
        with open(file_path_or_url, "rb") as f:
            res = requests.post("https://catbox.moe/user/api.php", data={"reqtype": "fileupload"}, files={"fileToUpload": f}, timeout=90)
            if res.status_code == 200 and res.text.startswith("https://"):
                direct_url = res.text.strip()
                print(f"🔗 Public direct video URL generated: {direct_url}")
                return direct_url
    except Exception as e:
        print(f"⚠️ Catbox public URL upload failed: {e}")

    return file_path_or_url

def publish_to_facebook(media_url_or_path, caption, media_type="auto", dry_run=True):
    """
    Publishes an image or video to a Facebook Page via Meta Graph API.
    :param media_url_or_path: Public URL or local file path
    :param caption: Text caption with hashtags and links
    :param media_type: 'image', 'video', or 'auto'
    :param dry_run: If True, skips actual network API calls
    """
    if dry_run or not FB_PAGE_ID or not FB_PAGE_ACCESS_TOKEN:
        print("\n--- [FB DRY-RUN MODE / SIMULATION] ---")
        print(f"📘 FB Page ID: {FB_PAGE_ID or 'MOCK_PAGE_ID'}")
        print(f"🔗 Media: {media_url_or_path}")
        print(f"📝 Caption:\n{caption}")
        print("--------------------------------------\n")
        return {"status": "success", "mode": "dry_run", "platform": "facebook", "post_id": "dry_run_fb_id"}

    public_url = get_public_media_url(media_url_or_path)
    is_video = media_type.lower() == "video" or public_url.lower().endswith((".mp4", ".mov", ".m4v"))

    print(f"🚀 Publishing {'Video' if is_video else 'Photo'} to Facebook Page ID: {FB_PAGE_ID}...")

    try:
        if is_video:
            # Video Upload to Facebook Page
            endpoint = f"{GRAPH_API_URL}/{FB_PAGE_ID}/videos"
            
            # If local file exists, send direct binary source stream
            if os.path.exists(media_url_or_path):
                with open(media_url_or_path, "rb") as video_file:
                    payload = {
                        "description": caption,
                        "access_token": FB_PAGE_ACCESS_TOKEN
                    }
                    files = {"source": video_file}
                    response = requests.post(endpoint, data=payload, files=files, timeout=120)
            else:
                payload = {
                    "file_url": public_url,
                    "description": caption,
                    "access_token": FB_PAGE_ACCESS_TOKEN
                }
                response = requests.post(endpoint, data=payload, timeout=90)
        else:
            # Photo Upload to Facebook Page
            endpoint = f"{GRAPH_API_URL}/{FB_PAGE_ID}/photos"
            if os.path.exists(media_url_or_path):
                with open(media_url_or_path, "rb") as img_file:
                    payload = {
                        "caption": caption,
                        "access_token": FB_PAGE_ACCESS_TOKEN
                    }
                    files = {"source": img_file}
                    response = requests.post(endpoint, data=payload, files=files, timeout=60)
            else:
                payload = {
                    "url": public_url,
                    "caption": caption,
                    "access_token": FB_PAGE_ACCESS_TOKEN
                }
                response = requests.post(endpoint, data=payload, timeout=60)

        res_json = response.json()

        if "id" in res_json or "post_id" in res_json:
            post_id = res_json.get("id") or res_json.get("post_id")
            print(f"🎉 Post published live on Facebook Page! Post ID: {post_id}")
            return {"status": "success", "platform": "facebook", "post_id": post_id}
        else:
            print(f"❌ Error publishing to Facebook: {res_json}")
            return {"status": "error", "platform": "facebook", "error": res_json}

    except Exception as e:
        print(f"❌ Facebook Graph API Exception: {e}")
        return {"status": "error", "platform": "facebook", "error": str(e)}

if __name__ == "__main__":
    publish_to_facebook(
        media_url_or_path="https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
        caption="🎉 Notting Hill & NYC Carnival 2026 Alert! #Carnival2026",
        dry_run=True
    )
