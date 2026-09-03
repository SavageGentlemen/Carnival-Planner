"""
Carnival Planner - MoneyPrinterTurbo AI Video Sidecar Client
Connects to the local FastAPI MoneyPrinterTurbo microservice (port 8090) to generate
high-retention vertical 9:16 videos with Pexels stock B-roll, neural TTS voiceover,
and kinetic subtitles.
"""

import os
import sys
import time
import json
import requests
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

class MoneyPrinterClient:
    def __init__(self, api_url=None):
        self.api_url = (api_url or os.getenv("MONEYPRINTER_API_URL") or "http://127.0.0.1:8090").rstrip("/")
        self.output_dir = OUTPUT_DIR

    def check_health(self):
        """Checks if the MoneyPrinterTurbo container / API is reachable."""
        try:
            res = requests.get(f"{self.api_url}/docs", timeout=4)
            if res.status_code in [200, 307, 308]:
                return {
                    "online": True,
                    "api_url": self.api_url,
                    "message": "MoneyPrinterTurbo AI Video Engine is online and ready."
                }
            return {
                "online": False,
                "api_url": self.api_url,
                "message": f"Microservice returned status {res.status_code}"
            }
        except Exception as e:
            return {
                "online": False,
                "api_url": self.api_url,
                "message": f"Offline ({e}). Local fallback engine active."
            }

    def submit_task(self, video_subject, video_script="", video_terms=None, video_aspect="9:16",
                    voice_name=None, bgm_type="random", subtitles_enabled=True):
        """Submits a video compilation task to MoneyPrinterTurbo FastAPI server."""
        if voice_name is None:
            voice_name = os.getenv("VOICE_NAME", "en-NG-EzinneNeural")
        if video_terms is None:
            video_terms = ["carnival", "party", "caribbean", "dancing", "music"]

        payload = {
            "video_subject": video_subject,
            "video_script": video_script or "",
            "video_terms": video_terms,
            "video_aspect": video_aspect,
            "voice_name": voice_name,
            "voice_volume": 1.0,
            "bgm_type": bgm_type,
            "bgm_volume": 0.15,
            "subtitle_enabled": subtitles_enabled,
            "font_name": "STHeitiMedium.ttc",
            "text_fore_color": "#FFFFFF",
            "font_size": 60,
            "stroke_color": "#000000",
            "stroke_width": 1.5,
        }

        url = f"{self.api_url}/api/v1/videos"
        res = requests.post(url, json=payload, timeout=30)
        
        if res.status_code != 200:
            raise RuntimeError(f"MoneyPrinter API error ({res.status_code}): {res.text}")

        data = res.json()
        task_id = data.get("task_id") or data.get("data", {}).get("task_id") or data.get("id")

        if not task_id:
            raise RuntimeError(f"No task_id returned from MoneyPrinter: {data}")

        return task_id

    def poll_task(self, task_id, max_wait_seconds=600):
        """Polls task status until completion or failure."""
        start_time = time.time()
        print(f"⏳ Polling MoneyPrinterTurbo task {task_id} (Timeout: {max_wait_seconds}s)...")

        while time.time() - start_time < max_wait_seconds:
            try:
                res = requests.get(f"{self.api_url}/api/v1/tasks/{task_id}", timeout=10)
                if res.status_code == 200:
                    data = res.json()
                    task_data = data.get("data") or data
                    state = task_data.get("state")
                    progress = task_data.get("progress", 0)

                    if state in [1, "completed", "success"] or (progress == 100 and task_data.get("videos")):
                        videos = task_data.get("videos") or task_data.get("combined_videos") or []
                        raw_video_url = videos[0] if videos else (task_data.get("video_url") or task_data.get("file_url"))
                        print(f"✅ MoneyPrinter task {task_id} COMPLETED in {int(time.time() - start_time)}s!")
                        return {
                            "task_id": task_id,
                            "status": "completed",
                            "progress": 100,
                            "video_url": raw_video_url
                        }

                    if state in [-1, "failed", "error"] or task_data.get("failed_stage") or task_data.get("error"):
                        err_msg = task_data.get("error") or task_data.get("message") or "Video compilation failed"
                        print(f"❌ MoneyPrinter task {task_id} FAILED: {err_msg}")
                        return {
                            "task_id": task_id,
                            "status": "failed",
                            "error": err_msg
                        }

                    if int(time.time() - start_time) % 15 == 0:
                        print(f"   - Processing... ({int(time.time() - start_time)}s elapsed, progress: {progress}%)")

            except Exception as e:
                pass

            time.sleep(3)

        raise TimeoutError(f"MoneyPrinter task {task_id} timed out after {max_wait_seconds} seconds")

    def save_video_locally(self, remote_url, filename_prefix="carnival_reel"):
        """Downloads generated remote video to local ig_engine/output/ folder."""
        full_remote_url = remote_url if remote_url.startswith("http") else f"{self.api_url}{remote_url}"
        filename = f"{filename_prefix}_{int(time.time())}.mp4"
        local_path = os.path.join(self.output_dir, filename)

        print(f"⬇️ Downloading video from sidecar: {full_remote_url} -> {local_path}...")
        res = requests.get(full_remote_url, stream=True, timeout=90)
        if res.status_code != 200:
            raise RuntimeError(f"Failed downloading video ({res.status_code}): {res.text}")

        with open(local_path, "wb") as f:
            for chunk in res.iter_content(chunk_size=65536):
                if chunk:
                    f.write(chunk)

        print(f"💾 Video successfully saved locally: {local_path} ({os.path.getsize(local_path)} bytes)")
        return local_path

moneyprinter_client = MoneyPrinterClient()

if __name__ == "__main__":
    health = moneyprinter_client.check_health()
    print("=" * 60)
    print("🤖 MONEYPRINTER TURBO HEALTH CHECK:")
    print(f"Status:  {'🟢 ONLINE' if health['online'] else '🟡 OFFLINE'}")
    print(f"API URL: {health['api_url']}")
    print(f"Message: {health['message']}")
    print("=" * 60)
