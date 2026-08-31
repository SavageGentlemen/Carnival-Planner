"""
Carnival Planner - Instagram Graph API Publisher
Publishes image & video Reels to Instagram Business accounts via Meta Graph API.
Automatically converts local video/image paths to temporary public HTTPS URLs.
"""

import os
import sys
import time
import requests
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

IG_USER_ID = os.getenv("IG_USER_ID")
IG_ACCESS_TOKEN = os.getenv("IG_ACCESS_TOKEN")
GRAPH_API_URL = "https://graph.facebook.com/v19.0"

def get_public_media_url(file_path_or_url):
    """
    If file_path_or_url is a local file, uploads to catbox.moe CDN to get a public HTTPS URL.
    """
    if not file_path_or_url:
        return file_path_or_url

    if file_path_or_url.startswith("http://files.catbox.moe") or file_path_or_url.startswith("https://files.catbox.moe"):
        return file_path_or_url

    if file_path_or_url.startswith("http://") or file_path_or_url.startswith("https://"):
        return file_path_or_url

    clean_path = file_path_or_url.lstrip("/")
    candidate_paths = [
        os.path.abspath(file_path_or_url),
        os.path.abspath(clean_path),
        os.path.join(os.path.dirname(__file__), "output", os.path.basename(clean_path)),
        os.path.join(os.path.dirname(__file__), "assets", os.path.basename(clean_path)),
        os.path.join(os.getcwd(), "output", os.path.basename(clean_path)),
        os.path.join(os.getcwd(), "public", os.path.basename(clean_path)),
        os.path.join(os.getcwd(), "uploads", "videos", os.path.basename(clean_path)),
    ]

    target_file = next((p for p in candidate_paths if os.path.exists(p)), None)

    if not target_file:
        print(f"❌ Local file does not exist in candidate paths: {file_path_or_url}")
        return file_path_or_url

    print(f"☁️ Uploading local file '{os.path.basename(target_file)}' for Meta Graph API access...")
    try:
        with open(target_file, "rb") as f:
            res = requests.post("https://catbox.moe/user/api.php", data={"reqtype": "fileupload"}, files={"fileToUpload": f}, timeout=60)
            if res.status_code == 200 and res.text.strip().startswith("http"):
                direct_url = res.text.strip()
                print(f"🔗 Public direct video URL generated: {direct_url}")
                return direct_url
    except Exception as e:
        print(f"⚠️ Catbox public URL upload failed: {e}")

    return file_path_or_url

def publish_to_instagram(media_url_or_path, caption, media_type="auto", dry_run=True):
    """
    Publishes an image or video Reel to Instagram via Meta Graph API.
    :param media_url_or_path: Public URL or local file path
    :param caption: Text caption with hashtags and links
    :param media_type: 'image', 'video', 'REELS', or 'auto'
    :param dry_run: If True, skips actual network API calls
    """
    if dry_run or not IG_USER_ID or not IG_ACCESS_TOKEN:
        print("\n--- [IG DRY-RUN MODE / SIMULATION] ---")
        print(f"📷 Media: {media_url_or_path}")
        print(f"📝 Caption:\n{caption}")
        print("--------------------------------------\n")
        return {"status": "success", "mode": "dry_run", "post_id": "dry_run_mock_id"}

    # Ensure we have a public URL for Meta to download
    public_url = get_public_media_url(media_url_or_path)

    # Detect video vs image
    is_video = media_type.lower() in ["video", "reels"] or public_url.lower().endswith((".mp4", ".mov", ".m4v"))

    print(f"🚀 Publishing {'Reel' if is_video else 'Photo'} to Instagram Business Account ID: {IG_USER_ID}...")

    # Step 1: Create Container
    container_url = f"{GRAPH_API_URL}/{IG_USER_ID}/media"
    
    if is_video:
        container_payload = {
            "media_type": "REELS",
            "video_url": public_url,
            "caption": caption,
            "access_token": IG_ACCESS_TOKEN
        }
    else:
        container_payload = {
            "image_url": public_url,
            "caption": caption,
            "access_token": IG_ACCESS_TOKEN
        }

    try:
        response = requests.post(container_url, data=container_payload, timeout=45)
        res_json = response.json()

        if "id" not in res_json:
            print(f"❌ Error creating IG media container: {res_json}")
            return {"status": "error", "error": res_json}

        creation_id = res_json["id"]
        print(f"📦 Container created successfully: {creation_id}")

        # Step 2: Poll container status for video processing if applicable
        if is_video:
            print("⏳ Waiting for Meta servers to process video Reel...")
            status_url = f"{GRAPH_API_URL}/{creation_id}"
            status_params = {"fields": "status_code", "access_token": IG_ACCESS_TOKEN}
            
            for _ in range(15):
                time.sleep(5)
                st_res = requests.get(status_url, params=status_params, timeout=20).json()
                status_code = st_res.get("status_code", "")
                print(f"   Video Status: {status_code}")
                if status_code == "FINISHED":
                    break
                elif status_code == "ERROR":
                    print(f"❌ Meta Video Processing Error: {st_res}")
                    return {"status": "error", "error": st_res}

        # Step 3: Publish Container
        publish_url = f"{GRAPH_API_URL}/{IG_USER_ID}/media_publish"
        publish_payload = {
            "creation_id": creation_id,
            "access_token": IG_ACCESS_TOKEN
        }

        pub_response = requests.post(publish_url, data=publish_payload, timeout=45)
        pub_json = pub_response.json()

        if "id" in pub_json:
            print(f"🎉 Post published live on Instagram! Post ID: {pub_json['id']}")
            return {"status": "success", "post_id": pub_json["id"]}
        else:
            print(f"❌ Error publishing container: {pub_json}")
            return {"status": "error", "error": pub_json}

    except Exception as e:
        print(f"❌ Instagram Graph API Exception: {e}")
        return {"status": "error", "error": str(e)}

if __name__ == "__main__":
    publish_to_instagram(
        media_url_or_path="https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
        caption="🎉 Notting Hill & NYC Carnival 2026! #Carnival2026",
        dry_run=True
    )
