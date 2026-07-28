"""
Carnival Planner - Instagram Graph API Publisher
Publishes image & caption to Instagram Business account or runs in Dry-Run mode.
"""

import os
import sys
import requests

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

IG_USER_ID = os.getenv("IG_USER_ID")
IG_ACCESS_TOKEN = os.getenv("IG_ACCESS_TOKEN")
GRAPH_API_URL = "https://graph.facebook.com/v19.0"

def publish_to_instagram(image_url, caption, dry_run=True):
    """
    Publishes an image post to Instagram via Meta Graph API.
    :param image_url: Public URL of the image to post
    :param caption: Text caption with hashtags and links
    :param dry_run: If True, skips actual network API calls
    """
    if dry_run or not IG_USER_ID or not IG_ACCESS_TOKEN:
        print("\n--- [DRY-RUN MODE / SIMULATION] ---")
        print(f"📷 Image URL: {image_url}")
        print(f"📝 Caption:\n{caption}")
        print("-----------------------------------\n")
        return {"status": "success", "mode": "dry_run", "post_id": "dry_run_mock_id"}

    print(f"🚀 Publishing to Instagram Business Account ID: {IG_USER_ID}...")

    # Step 1: Create Container
    container_url = f"{GRAPH_API_URL}/{IG_USER_ID}/media"
    container_payload = {
        "image_url": image_url,
        "caption": caption,
        "access_token": IG_ACCESS_TOKEN
    }

    try:
        response = requests.post(container_url, data=container_payload, timeout=30)
        res_json = response.json()

        if "id" not in res_json:
            print(f"❌ Error creating media container: {res_json}")
            return {"status": "error", "error": res_json}

        creation_id = res_json["id"]
        print(f"📦 Container created successfully: {creation_id}")

        # Step 2: Publish Container
        publish_url = f"{GRAPH_API_URL}/{IG_USER_ID}/media_publish"
        publish_payload = {
            "creation_id": creation_id,
            "access_token": IG_ACCESS_TOKEN
        }

        pub_response = requests.post(publish_url, data=publish_payload, timeout=30)
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
