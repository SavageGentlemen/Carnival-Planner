import os
import sys
import subprocess
import json

# ==========================================
# BOOTSTRAP DEPS
# ==========================================
def install_and_import(package, import_name=None):
    if import_name is None:
        import_name = package
    try:
        __import__(import_name)
    except ImportError:
        print(f"[*] Bootstrapping missing library: {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

install_and_import("gTTS", "gtts")
install_and_import("pillow", "PIL")
install_and_import("numpy")
install_and_import("requests")
install_and_import("moviepy")

from gtts import gTTS
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import requests

try:
    from moviepy.editor import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips
except ImportError:
    from moviepy import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips

def set_clip_duration(clip, duration):
    if hasattr(clip, "with_duration"):
        return clip.with_duration(duration)
    return clip.set_duration(duration)

def set_clip_audio(clip, audio):
    if hasattr(clip, "with_audio"):
        return clip.with_audio(audio)
    return clip.set_audio(audio)

def set_audio_volume(audio_clip, volume_factor):
    if hasattr(audio_clip, "with_volume_scaled"):
        return audio_clip.with_volume_scaled(volume_factor)
    if hasattr(audio_clip, "multiply_volume"):
        return audio_clip.multiply_volume(volume_factor)
    if hasattr(audio_clip, "volumex"):
        return audio_clip.volumex(volume_factor)
    return audio_clip

def get_subclip(audio_clip, t_start, t_end):
    if hasattr(audio_clip, "subclipped"):
        return audio_clip.subclipped(t_start, t_end)
    if hasattr(audio_clip, "subclip"):
        return audio_clip.subclip(t_start, t_end)
    return audio_clip

# ==========================================
# CONFIGURATION & UTILITIES
# ==========================================
FONT_TITLE = "impact.ttf"
FONT_BODY = "arialbd.ttf"
WIDTH = 720
HEIGHT = 1280
CENTER_X = 360

def get_font(font_name, size):
    try:
        windows_font_path = os.path.join(os.environ.get("WINDIR", "C:\\Windows"), "Fonts", font_name)
        if os.path.exists(windows_font_path):
            return ImageFont.truetype(windows_font_path, size)
    except Exception as e:
        print(f"Font loading error: {e}")
    return ImageFont.load_default()

def draw_neon_background(width, height):
    img = Image.new("RGBA", (width, height), (7, 5, 18, 255))
    draw = ImageDraw.Draw(img)
    
    draw.ellipse([(-100, -100), (width + 100, 300)], fill=(74, 14, 78, 40))
    draw.ellipse([(-100, height - 300), (width + 100, height + 100)], fill=(14, 78, 92, 40))
    draw.rectangle([(15, 15), (width - 15, height - 15)], outline=(188, 52, 250, 40), width=3)
    return img

def download_audio_track(url, dest_path):
    if os.path.exists(dest_path):
        return True
    try:
        print(f"Downloading background audio track: {url}...")
        r = requests.get(url, timeout=15)
        if r.status_code == 200:
            with open(dest_path, "wb") as f:
                f.write(r.content)
            return True
    except Exception as e:
        print(f"Failed to download background music: {e}")
    return False

def publish_to_n8n(video_path, location_filter, webhook_url):
    if not webhook_url:
        print("[*] No N8N_WEBHOOK_URL specified. Skipping n8n auto-upload.")
        return False
        
    print(f"[*] Posting compiled Short to n8n Webhook: {webhook_url}...")
    try:
        title = f"Top Fetes This Weekend in {location_filter.upper()}! 🌴 #Shorts #Carnival #CaribPulse"
        description = f"Discover upcoming fetes and book travel on CaribPulse AI at https://carnival-planner.web.app! Island: {location_filter.title()}"
        tags = f"carnival,fetes,{location_filter},caribbean,socamusic,party"
        
        with open(video_path, "rb") as f:
            files = {"video": (os.path.basename(video_path), f, "video/mp4")}
            data = {
                "title": title,
                "description": description,
                "tags": tags,
                "location": location_filter,
                "platform": "youtube_shorts"
            }
            res = requests.post(webhook_url, files=files, data=data, timeout=120)
            
        if res.status_code in [200, 201, 202]:
            print(f"[SUCCESS] Uploaded to n8n Webhook successfully! Response: {res.text}")
            return True
        else:
            print(f"[!] n8n Webhook returned status {res.status_code}: {res.text}")
    except Exception as e:
        print(f"[!] Failed to post to n8n Webhook: {e}")
    return False

# ==========================================
# COMPILER PIPELINE
# ==========================================
def compile_fete_video(location_filter="barbados"):
    print("=" * 60)
    print(f"CaribPulse AI — Video Compiler ({location_filter.upper()})")
    print("=" * 60)

    # 1. Load events
    json_path = os.path.join(os.path.dirname(__file__), "../../events.json")
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found. Please run the exporter first.")
        sys.exit(1)
        
    with open(json_path, "r", encoding="utf-8") as f:
        events = json.load(f)

    # Filter events for location
    filtered = []
    for evt in events:
        loc = evt.get("location", "").lower()
        title = evt.get("title", "").lower()
        venue = evt.get("venue", "").lower()
        
        if (location_filter.lower() in loc or 
            location_filter.lower() in title or 
            location_filter.lower() in venue):
            filtered.append(evt)

    if not filtered:
        print(f"No events found matching: {location_filter}. Using top 5 events as fallback.")
        filtered = events[:5]
    else:
        filtered = filtered[:5]

    print(f"Selected {len(filtered)} events for video compile.")

    clips = []
    temp_files = []
    
    font_large = get_font(FONT_TITLE, 60)
    font_medium = get_font(FONT_TITLE, 42)
    font_body_bold = get_font(FONT_BODY, 28)
    font_small = get_font(FONT_BODY, 22)

    # --- SLIDE 1: INTRO ---
    intro_img = draw_neon_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(intro_img)
    draw.text((CENTER_X, 300), "🌴", font=get_font(FONT_TITLE, 90), fill=(255, 255, 255), anchor="mm")
    draw.text((CENTER_X, 460), "CARIBPULSE AI", font=font_large, fill=(236, 72, 153), anchor="mm")
    draw.text((CENTER_X, 560), "WEEKEND FETE GUIDE", font=font_medium, fill=(0, 240, 255), anchor="mm")
    draw.text((CENTER_X, 700), f"{location_filter.upper()} EDITION", font=font_body_bold, fill=(245, 158, 11), anchor="mm")
    draw.text((CENTER_X, 1080), "SWIPE FOR DETAILS", font=font_small, fill=(156, 163, 175), anchor="mm")

    intro_file = "intro_speech.mp3"
    tts_intro = gTTS(text=f"Here is what is hot this weekend in {location_filter}!", lang="en")
    tts_intro.save(intro_file)
    temp_files.append(intro_file)
    
    intro_audio = AudioFileClip(intro_file)
    intro_duration = intro_audio.duration
    
    intro_clip = set_clip_duration(ImageClip(np.array(intro_img)), intro_duration)
    intro_clip = set_clip_audio(intro_clip, intro_audio)
    clips.append(intro_clip)

    # --- SLIDES 2-6: EVENTS ---
    for idx, evt in enumerate(filtered):
        event_img = draw_neon_background(WIDTH, HEIGHT)
        draw = ImageDraw.Draw(event_img)
        
        draw.text((CENTER_X, 200), f"0{idx + 1}", font=get_font(FONT_TITLE, 150), fill=(188, 52, 250, 80), anchor="mm")
        
        title_text = evt.get("title", "Fete Party")
        if len(title_text) > 24:
            lines = [title_text[:24], title_text[24:]]
            draw.text((CENTER_X, 430), lines[0], font=font_medium, fill=(255, 255, 255), anchor="mm")
            draw.text((CENTER_X, 500), lines[1], font=font_medium, fill=(255, 255, 255), anchor="mm")
        else:
            draw.text((CENTER_X, 460), title_text, font=font_medium, fill=(255, 255, 255), anchor="mm")
            
        draw.text((CENTER_X, 650), f"DATE: {evt.get('date', 'TBD')}", font=font_body_bold, fill=(0, 240, 255), anchor="mm")
        draw.text((CENTER_X, 730), f"VENUE: {evt.get('venue', 'TBD')}", font=font_body_bold, fill=(245, 158, 11), anchor="mm")
        draw.text((CENTER_X, 810), f"TICKETS: {evt.get('price', 'TBD')}", font=font_body_bold, fill=(16, 185, 129), anchor="mm")
        draw.text((CENTER_X, 1080), f"Source: {evt.get('source', 'CCP')}", font=font_small, fill=(107, 114, 128), anchor="mm")

        clean_title = title_text.replace("&", "and")
        speech_text = f"Fete number {idx + 1}, {clean_title}, taking place at {evt.get('venue', 'TBD')} on {evt.get('date', 'TBD')}."
        evt_audio_file = f"evt_{idx}_speech.mp3"
        tts_evt = gTTS(text=speech_text, lang="en")
        tts_evt.save(evt_audio_file)
        temp_files.append(evt_audio_file)
        
        evt_audio = AudioFileClip(evt_audio_file)
        evt_duration = evt_audio.duration
        
        evt_clip = set_clip_duration(ImageClip(np.array(event_img)), evt_duration)
        evt_clip = set_clip_audio(evt_clip, evt_audio)
        clips.append(evt_clip)

    # --- SLIDE 7: OUTRO ---
    outro_img = draw_neon_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(outro_img)
    draw.text((CENTER_X, 320), "🔗", font=get_font(FONT_TITLE, 90), fill=(255, 255, 255), anchor="mm")
    draw.text((CENTER_X, 480), "BUY TICKETS NOW", font=font_large, fill=(0, 240, 255), anchor="mm")
    draw.text((CENTER_X, 580), "BOOK HOLIDAYS", font=font_medium, fill=(236, 72, 153), anchor="mm")
    draw.text((CENTER_X, 720), "CARIB-PLANNER.WEB.APP", font=font_body_bold, fill=(245, 158, 11), anchor="mm")
    draw.text((CENTER_X, 1080), "Chat with our AI Concierge", font=font_small, fill=(156, 163, 175), anchor="mm")

    outro_file = "outro_speech.mp3"
    tts_outro = gTTS(text="Find links to buy tickets and book hotels on our platform now. Let's pump!", lang="en")
    tts_outro.save(outro_file)
    temp_files.append(outro_file)
    
    outro_audio = AudioFileClip(outro_file)
    outro_duration = outro_audio.duration
    
    outro_clip = set_clip_duration(ImageClip(np.array(outro_img)), outro_duration)
    outro_clip = set_clip_audio(outro_clip, outro_audio)
    clips.append(outro_clip)

    # 3. Concatenate video segments
    print("[*] Concatenating slides...")
    final_video = concatenate_videoclips(clips, method="compose")

    # 4. Background Beat Mix
    music_file = "soca_drum_beat.mp3"
    bg_music_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    has_bg_music = download_audio_track(bg_music_url, music_file)

    if has_bg_music and os.path.exists(music_file):
        try:
            print("[*] Mixing background Soca instrumental...")
            bg_music = AudioFileClip(music_file)
            bg_music = get_subclip(bg_music, 0, final_video.duration)
            bg_music = set_audio_volume(bg_music, 0.08)
            
            combined_audio = CompositeAudioClip([final_video.audio, bg_music])
            final_video = set_clip_audio(final_video, combined_audio)
            temp_files.append(music_file)
        except Exception as e:
            print(f"Warning: Failed to mix background music: {e}")

    # 5. Output Video
    output_filename = f"fete_guide_{location_filter.lower()}.mp4"
    output_path = os.path.join(os.path.dirname(__file__), f"../../{output_filename}")
    
    print(f"[*] Rendering final 720p 9:16 vertical video Short to {output_filename}...")
    final_video.write_videofile(
        output_path,
        fps=15,
        codec="libx264",
        audio_codec="aac",
        preset="ultrafast",
        threads=4,
        temp_audiofile="temp-audio.m4a",
        remove_temp=True
    )

    # Clean up temp speech files
    print("[*] Cleaning up temporary files...")
    for f in temp_files:
        try:
            if os.path.exists(f) and f != music_file:
                os.remove(f)
        except:
            pass

    print("=" * 60)
    print(f"[SUCCESS] Hype Short compiled successfully: {output_path}")
    print("=" * 60)
    return output_path

if __name__ == "__main__":
    loc = sys.argv[1] if len(sys.argv) > 1 else "barbados"
    default_n8n_url = "https://sgx.app.n8n.cloud/webhook/36e6bf2c-0f5a-41ca-b639-eb8f9bcc81ae"
    webhook_url = os.environ.get("N8N_WEBHOOK_URL") or (sys.argv[2] if len(sys.argv) > 2 else default_n8n_url)
    
    mp4_path = compile_fete_video(loc)
    if webhook_url:
        publish_to_n8n(mp4_path, loc, webhook_url)
