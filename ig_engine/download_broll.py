import os
import sys
import requests

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "assets", "video_broll")
os.makedirs(ASSETS_DIR, exist_ok=True)

# Curated direct high-energy festival, carnival, concert, powder, and party video clips
STOCK_VIDEOS = {
    "festival_crowd": "https://assets.mixkit.co/videos/preview/mixkit-crowd-cheering-in-a-party-with-lights-40082-large.mp4",
    "confetti_dancers": "https://assets.mixkit.co/videos/preview/mixkit-party-with-confetti-and-dancing-people-40081-large.mp4",
    "color_powder_jouvert": "https://assets.mixkit.co/videos/preview/mixkit-colored-powder-at-a-festival-41484-large.mp4",
    "party_celebration": "https://assets.mixkit.co/videos/preview/mixkit-people-celebrating-with-confetti-at-a-party-40083-large.mp4",
    "stage_lights_fete": "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-at-a-rave-party-40080-large.mp4",
    "beach_party": "https://assets.mixkit.co/videos/preview/mixkit-friends-dancing-with-sparklers-at-sunset-40086-large.mp4"
}

# High-resolution carnival photo textures & masquerader visuals for ultra-crisp motion zooming
CARNIVAL_PHOTOS = {
    "trinidad_feathers": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1080&h=1920&q=85",
    "masquerade_costume": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1080&h=1920&q=85",
    "festival_lights": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1080&h=1920&q=85",
    "tropical_caribbean": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1080&h=1920&q=85",
    "soca_crowd": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1080&h=1920&q=85"
}

def download_broll_assets():
    headers = {"User-Agent": "Mozilla/5.0"}
    downloaded = {}

    print("📥 Downloading & caching real cinematic Carnival & Festival B-roll footage...")
    for name, url in STOCK_VIDEOS.items():
        dest = os.path.join(ASSETS_DIR, f"{name}.mp4")
        if os.path.exists(dest) and os.path.getsize(dest) > 100000:
            print(f"  ✅ Cached video: {name}.mp4 ({os.path.getsize(dest)//1024} KB)")
            downloaded[name] = dest
            continue
        try:
            print(f"  ⏳ Downloading {name}.mp4...")
            r = requests.get(url, headers=headers, timeout=30)
            if r.status_code == 200 and len(r.content) > 50000:
                with open(dest, "wb") as f:
                    f.write(r.content)
                print(f"  🎉 Saved video: {name}.mp4 ({len(r.content)//1024} KB)")
                downloaded[name] = dest
        except Exception as e:
            print(f"  ⚠️ Could not download {name}: {e}")

    for name, url in CARNIVAL_PHOTOS.items():
        dest = os.path.join(ASSETS_DIR, f"{name}.jpg")
        if os.path.exists(dest) and os.path.getsize(dest) > 20000:
            downloaded[name] = dest
            continue
        try:
            r = requests.get(url, headers=headers, timeout=20)
            if r.status_code == 200:
                with open(dest, "wb") as f:
                    f.write(r.content)
                downloaded[name] = dest
        except Exception as e:
            print(f"  ⚠️ Photo download failed {name}: {e}")

    return downloaded

if __name__ == "__main__":
    res = download_broll_assets()
    print(f"Ready! Downloaded {len(res)} B-roll assets under {ASSETS_DIR}")
