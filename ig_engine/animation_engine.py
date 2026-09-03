"""
Carnival Planner - Motion Animation Video Ad Studio
Generates full continuous motion-animated 9:16 vertical video reels with:
1. Procedural Motion Graphics: Rotating GPS Radar Scanners, Pulsing Audio EQ Waveforms, Particle Waves, Floating Holographic Pins
2. Authentic Caribbean Soca Music: Multi-track audio mixing with auto-ducking
3. Studio Neural Voiceover: Edge-TTS broadcast-quality speech
4. Kinetic Typography: Dynamic animated banners, glowing glassmorphic badges, and drop timers
5. Zero Duplicate Tracking: Logs to posted_history.json
6. Live Multi-Platform Publishing: Instagram Reels, YouTube Shorts, Facebook, TikTok
"""

import os
import sys
import json
import time
import math
import random
import asyncio
import argparse
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
HISTORY_FILE = os.path.join(os.path.dirname(__file__), "posted_history.json")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# -------------------------------------------------------------
# 🎨 COLOR PALETTE (Neon Holographic Caribbean Aesthetic)
# -------------------------------------------------------------
COLOR_BG = (8, 6, 18)               # Deep Night Obsidian
COLOR_PURPLE = (139, 92, 246)       # Neon Violet (#8B5CF6)
COLOR_PINK = (236, 72, 153)         # Hot Magenta (#EC4899)
COLOR_CYAN = (6, 182, 212)          # Electric Cyan (#06B6D4)
COLOR_GOLD = (245, 158, 11)         # Bright Gold (#F59E0B)
COLOR_EMERALD = (16, 185, 129)      # Vivid Emerald (#10B981)
COLOR_WHITE = (255, 255, 255)
COLOR_MUTED = (203, 213, 225)

def get_font(size, bold=False):
    font_names = [
        "arialbd.ttf" if bold else "arial.ttf",
        "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf",
        "segoeuib.ttf" if bold else "segoeui.ttf"
    ]
    for fn in font_names:
        try:
            return ImageFont.truetype(fn, size)
        except OSError:
            continue
    return ImageFont.load_default()

# -------------------------------------------------------------
# 🌟 PROCEDURAL MOTION ANIMATION RENDERERS (Per-Frame Generators)
# -------------------------------------------------------------
def render_radar_animation_frame(t, duration, width=1080, height=1920):
    """
    Renders a dynamic rotating holographic radar with pulsing squad GPS pins.
    """
    img = Image.new("RGB", (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)

    # Ambient Glow
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)
    ol_draw.ellipse((-100, 200, width + 100, height // 2 + 300), fill=COLOR_PURPLE + (70,))
    ol_draw.ellipse((100, height // 2, width + 200, height + 100), fill=COLOR_CYAN + (60,))

    # Radar Center
    center_x, center_y = width // 2, 780
    max_radius = 420

    # Concentric Radar Rings
    for r in [140, 280, 420]:
        ol_draw.ellipse(
            (center_x - r, center_y - r, center_x + r, center_y + r),
            outline=COLOR_CYAN + (160,),
            width=3
        )

    # Crosshair Grid Lines
    ol_draw.line([(center_x - max_radius - 20, center_y), (center_x + max_radius + 20, center_y)], fill=COLOR_CYAN + (100,), width=2)
    ol_draw.line([(center_x, center_y - max_radius - 20), (center_x, center_y + max_radius + 20)], fill=COLOR_CYAN + (100,), width=2)

    # Rotating Radar Sweep Line
    angle = (t / duration) * (2 * math.pi * 3) # 3 full rotations
    sweep_len = max_radius
    end_x = center_x + sweep_len * math.cos(angle)
    end_y = center_y + sweep_len * math.sin(angle)
    ol_draw.line([(center_x, center_y), (end_x, end_y)], fill=COLOR_PINK + (255,), width=6)

    # Radar Sector Cone (Glow trail)
    for delta in range(1, 30):
        trail_angle = angle - (delta * 0.03)
        tx = center_x + sweep_len * math.cos(trail_angle)
        ty = center_y + sweep_len * math.sin(trail_angle)
        alpha = int(140 * (1 - delta / 30))
        ol_draw.line([(center_x, center_y), (tx, ty)], fill=COLOR_PINK + (alpha,), width=4)

    # Pulsing Squad Member Location Pins
    pins = [
        (center_x - 180, center_y - 120, "📍 Maya (Section A)", COLOR_GOLD),
        (center_x + 160, center_y + 140, "📍 Dwayne (Truck #4)", COLOR_EMERALD),
        (center_x - 60, center_y + 220, "📍 Kes (Sound Stage)", COLOR_PINK),
        (center_x + 210, center_y - 180, "📍 Nadia (VIP Deck)", COLOR_CYAN)
    ]

    pulse = (math.sin(t * 8) + 1) / 2 # 0.0 to 1.0
    pin_font = get_font(28, bold=True)

    for px, py, label, pcolor in pins:
        # Expanding pulse ring
        prange = int(18 + pulse * 24)
        ol_draw.ellipse((px - prange, py - prange, px + prange, py + prange), outline=pcolor + (int(180 * (1 - pulse)),), width=3)
        # Solid center dot
        ol_draw.ellipse((px - 10, py - 10, px + 10, py + 10), fill=pcolor + (255,))
        # Label badge
        ol_draw.rounded_rectangle([px + 18, py - 20, px + 320, py + 22], radius=10, fill=(20, 16, 38, 220), outline=pcolor + (200,), width=2)
        ol_draw.text((px + 28, py - 14), label, font=pin_font, fill=COLOR_WHITE)

    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Top Header Badge
    badge_font = get_font(38, bold=True)
    draw.rounded_rectangle([80, 120, 720, 205], radius=20, fill=COLOR_PINK, outline=COLOR_WHITE, width=2)
    draw.text((105, 138), "🚨 LIVE SQUAD GPS RADAR", font=badge_font, fill=COLOR_WHITE)

    # Floating Info Card at Bottom
    draw.rounded_rectangle([60, height - 520, width - 60, height - 190], radius=35, fill=(18, 14, 38), outline=COLOR_CYAN, width=4)
    
    title_font = get_font(56, bold=True)
    draw.text((100, height - 480), "NEVER LOSE YOUR CREW", font=title_font, fill=COLOR_WHITE)
    draw.line([(100, height - 410), (width - 100, height - 410)], fill=COLOR_PINK, width=5)

    sub_font = get_font(38, bold=False)
    draw.text((100, height - 380), "Live GPS radar tracks your squad in 50k crowds.", font=sub_font, fill=COLOR_MUTED)
    draw.text((100, height - 325), "Works even when cell network towers drop.", font=sub_font, fill=COLOR_GOLD)

    # Bottom CTA Banner
    draw.rounded_rectangle([80, height - 160, width - 80, height - 60], radius=25, fill=COLOR_EMERALD, outline=COLOR_WHITE, width=2)
    cta_font = get_font(36, bold=True)
    draw.text((120, height - 125), "📲 Get Carnival Planner App Free", font=cta_font, fill=COLOR_WHITE)

    return img

def render_equalizer_animation_frame(t, duration, width=1080, height=1920):
    """
    Renders dynamic bouncing Soca music frequency equalizer waveforms.
    """
    img = Image.new("RGB", (width, height), COLOR_BG)
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)

    # Dynamic Bouncing Equalizer Bars
    num_bars = 18
    bar_width = 38
    gap = 16
    start_x = (width - (num_bars * (bar_width + gap))) // 2
    base_y = 920

    for i in range(num_bars):
        # Sine wave frequency simulation
        freq = math.sin(t * 12 + i * 0.7) * 0.5 + math.cos(t * 18 - i * 0.4) * 0.5
        height_val = int(80 + (freq + 1) * 160)
        
        bx = start_x + i * (bar_width + gap)
        top_y = base_y - height_val
        bottom_y = base_y + height_val // 3

        # Color gradient per bar
        bar_color = COLOR_PINK if i % 3 == 0 else (COLOR_CYAN if i % 3 == 1 else COLOR_PURPLE)
        ol_draw.rounded_rectangle([bx, top_y, bx + bar_width, bottom_y], radius=12, fill=bar_color + (230,))

        # Floating Peak Glow Dot
        ol_draw.ellipse((bx + 2, top_y - 25, bx + bar_width - 2, top_y - 5), fill=COLOR_GOLD + (255,))

    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Top Header Badge
    badge_font = get_font(38, bold=True)
    draw.rounded_rectangle([80, 120, 740, 205], radius=20, fill=COLOR_PURPLE, outline=COLOR_WHITE, width=2)
    draw.text((105, 138), "🌴 FETE SOUNDTRACK & ALERTS", font=badge_font, fill=COLOR_WHITE)

    # Central Card
    draw.rounded_rectangle([60, height - 640, width - 60, height - 190], radius=35, fill=(18, 14, 38), outline=COLOR_PINK, width=4)
    
    title_font = get_font(56, bold=True)
    draw.text((100, height - 590), "LOCK IN SOLD-OUT FETES", font=title_font, fill=COLOR_WHITE)
    draw.line([(100, height - 520), (width - 100, height - 520)], fill=COLOR_CYAN, width=5)

    sub_font = get_font(38, bold=False)
    draw.text((100, height - 480), "Instant drop alerts for Soca Brainwash & AMBUSH.", font=sub_font, fill=COLOR_MUTED)
    draw.text((100, height - 420), "Track sound systems, shuttle points & fete maps.", font=sub_font, fill=COLOR_MUTED)
    draw.text((100, height - 360), "⚡ Never miss a tier 1 release again.", font=sub_font, fill=COLOR_GOLD)

    # Bottom CTA Banner
    draw.rounded_rectangle([80, height - 160, width - 80, height - 60], radius=25, fill=COLOR_EMERALD, outline=COLOR_WHITE, width=2)
    cta_font = get_font(36, bold=True)
    draw.text((120, height - 125), "📲 Get Carnival Planner App Free", font=cta_font, fill=COLOR_WHITE)

    return img

def render_countdown_animation_frame(t, duration, width=1080, height=1920):
    """
    Renders an animated glowing carnival countdown & marketplace badge.
    """
    img = Image.new("RGB", (width, height), COLOR_BG)
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)

    # Glowing Circular Progress Ring
    center_x, center_y = width // 2, 700
    ring_radius = 240
    
    # Background ring
    ol_draw.ellipse(
        (center_x - ring_radius, center_y - ring_radius, center_x + ring_radius, center_y + ring_radius),
        outline=COLOR_PURPLE + (80,),
        width=16
    )

    # Animated Progress Arc
    progress_angle = int((t / duration) * 360)
    for a in range(0, progress_angle, 4):
        rad = math.radians(a - 90)
        ax = center_x + ring_radius * math.cos(rad)
        ay = center_y + ring_radius * math.sin(rad)
        ol_draw.ellipse((ax - 10, ay - 10, ax + 10, ay + 10), fill=COLOR_GOLD + (255,))

    # Center Countdown Text
    cnt_font = get_font(84, bold=True)
    sub_cnt_font = get_font(36, bold=True)
    ol_draw.text((center_x - 160, center_y - 65), "2026/27", font=cnt_font, fill=COLOR_WHITE)
    ol_draw.text((center_x - 175, center_y + 35), "CARNIVAL SEASON", font=sub_cnt_font, fill=COLOR_PINK)

    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Top Badge
    badge_font = get_font(38, bold=True)
    draw.rounded_rectangle([80, 120, 720, 205], radius=20, fill=COLOR_EMERALD, outline=COLOR_WHITE, width=2)
    draw.text((105, 138), "🚀 READY FOR DE ROAD?", font=badge_font, fill=COLOR_WHITE)

    # Bottom Glass Card
    draw.rounded_rectangle([60, height - 640, width - 60, height - 190], radius=35, fill=(18, 14, 38), outline=COLOR_GOLD, width=4)
    
    title_font = get_font(56, bold=True)
    draw.text((100, height - 590), "BUILD YOUR SQUAD TRIP", font=title_font, fill=COLOR_WHITE)
    draw.line([(100, height - 520), (width - 100, height - 520)], fill=COLOR_EMERALD, width=5)

    sub_font = get_font(38, bold=False)
    draw.text((100, height - 480), "• Discover 25+ Caribbean Carnivals worldwide.", font=sub_font, fill=COLOR_MUTED)
    draw.text((100, height - 420), "• Track budgets, costume pickups & sound trucks.", font=sub_font, fill=COLOR_MUTED)
    draw.text((100, height - 360), "• Link in bio / carnival-planner.com 👇", font=sub_font, fill=COLOR_GOLD)

    # Bottom CTA Banner
    draw.rounded_rectangle([80, height - 160, width - 80, height - 60], radius=25, fill=COLOR_PINK, outline=COLOR_WHITE, width=2)
    cta_font = get_font(36, bold=True)
    draw.text((120, height - 125), "👉 Get Started Free at Carnival-Planner.com", font=cta_font, fill=COLOR_WHITE)

    return img

# -------------------------------------------------------------
# 🎙️ NEURAL AUDIO SYNTHESIZER (Edge-TTS)
# -------------------------------------------------------------
async def synthesize_neural_speech(text, output_mp3, voice=None):
    """Synthesizes studio-grade neural voiceover audio using Edge-TTS with fallback to gTTS."""
    if voice is None:
        voice = os.getenv("VOICE_NAME", "en-NG-EzinneNeural")
    try:
        import edge_tts
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(output_mp3)
        return True
    except Exception as e:
        print(f"  ⚠️ Edge-TTS error ({e}), falling back to gTTS...")
        try:
            from gtts import gTTS
            tts = gTTS(text=text, lang="en", tld="com")
            tts.save(output_mp3)
            return True
        except Exception as e2:
            print(f"  ❌ TTS failed: {e2}")
            return False

# -------------------------------------------------------------
# 🎬 FULL ANIMATION VIDEO BUILDER (MoviePy + Procedural Frames)
# -------------------------------------------------------------
def build_animated_video(output_mp4_path):
    """
    Renders continuous procedural motion animation scenes with Soca music and voiceover.
    """
    try:
        from moviepy import VideoClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips
    except ImportError:
        from moviepy.editor import VideoClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips
    import numpy as np

    print("=" * 60)
    print("🎬 RENDERING PROCEDURAL MOTION ANIMATION REEL (9:16)")
    print("=" * 60)

    scenes_data = [
        {
            "id": "scene_radar",
            "renderer": render_radar_animation_frame,
            "voice": "Never lose your friends on Carnival Day! When fifty thousand masqueraders hit the road and cell networks jam, Carnival Planner's live GPS radar tracks your entire crew every thirty seconds."
        },
        {
            "id": "scene_equalizer",
            "renderer": render_equalizer_animation_frame,
            "voice": "Lock in sold out fetes like Soca Brainwash and Ambush before tickets disappear in ninety seconds. Track sound systems, shuttle points, and live fete schedules in one app."
        },
        {
            "id": "scene_countdown",
            "renderer": render_countdown_animation_frame,
            "voice": "Ready to jump in the band? Download Carnival Planner free today on iOS and Android and build your ultimate carnival trip!"
        }
    ]

    temp_audio_files = []
    video_clips = []

    try:
        for idx, sc in enumerate(scenes_data):
            print(f"🎙️ Synthesizing voiceover for Scene {idx+1}/{len(scenes_data)}...")
            audio_path = os.path.join(OUTPUT_DIR, f"tmp_anim_audio_{idx}.mp3")
            asyncio.run(synthesize_neural_speech(sc["voice"], audio_path))
            temp_audio_files.append(audio_path)

            audio_clip = AudioFileClip(audio_path)
            duration = max(audio_clip.duration + 0.6, 3.5)

            renderer_fn = sc["renderer"]

            # MoviePy VideoClip with dynamic per-frame rendering function
            def make_frame_fn(r_fn, dur):
                def frame_gen(t):
                    pil_frame = r_fn(t, dur)
                    return np.array(pil_frame)
                return frame_gen

            print(f"✨ Generating motion animation frames for Scene {idx+1} ({duration:.1f}s at 24fps)...")
            
            if hasattr(VideoClip, 'with_duration'):
                clip = VideoClip(make_frame_fn(renderer_fn, duration), duration=duration).with_audio(audio_clip)
            else:
                clip = VideoClip(make_frame_fn(renderer_fn, duration), duration=duration).set_audio(audio_clip)

            video_clips.append(clip)

        print("⚡ Concatenating animated scenes & mixing authentic Soca music...")
        final_video = concatenate_videoclips(video_clips, method="compose")

        # Layer background Soca beat
        bg_audio_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "soca_drum_beat.mp3")
        if os.path.exists(bg_audio_path):
            bg_audio = AudioFileClip(bg_audio_path)
            if hasattr(bg_audio, 'subclipped'):
                bg_sub = bg_audio.subclipped(0, final_video.duration)
            elif hasattr(bg_audio, 'subclip'):
                bg_sub = bg_audio.subclip(0, final_video.duration)
            else:
                bg_sub = bg_audio.with_duration(final_video.duration)

            # Auto-ducking
            if hasattr(bg_sub, 'with_volume_scaled'):
                bg_music = bg_sub.with_volume_scaled(0.18)
            elif hasattr(bg_sub, 'volumex'):
                bg_music = bg_sub.volumex(0.18)
            else:
                bg_music = bg_sub

            final_audio = CompositeAudioClip([final_video.audio, bg_music])
            if hasattr(final_video, 'with_audio'):
                final_video = final_video.with_audio(final_audio)
            else:
                final_video = final_video.set_audio(final_audio)

        print(f"🎥 Exporting final 1080x1920 Animated MP4 to: {output_mp4_path}...")
        final_video.write_videofile(
            output_mp4_path,
            fps=24,
            codec="libx264",
            audio_codec="aac",
            preset="fast"
        )

        print("\n" + "=" * 60)
        print("🎉 MOTION ANIMATED VIDEO AD GENERATED SUCCESSFULLY!")
        print(f"📁 File: {output_mp4_path}")
        print("=" * 60 + "\n")
        return output_mp4_path

    finally:
        for tmp in temp_audio_files:
            if os.path.exists(tmp):
                try:
                    os.remove(tmp)
                except Exception:
                    pass

# -------------------------------------------------------------
# 🚀 MAIN DISPATCHER & LIVE PUBLISHER
# -------------------------------------------------------------
def run_animation_ad_pipeline(publish=True):
    """Generates the motion-animated video ad and publishes it live to Instagram."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_video_name = f"motion_ad_{timestamp}.mp4"
    out_video_path = os.path.join(OUTPUT_DIR, out_video_name)

    build_animated_video(out_video_path)

    title = "🚨 HOW TO TRACK YOUR SQUAD ON CARNIVAL DAY"
    caption = (
        f"{title}\n\n"
        f"Stop losing your crew in 50k masqueraders! When cell towers jam on Carnival Monday, Carnival Planner's live GPS radar tracks your squad's coordinates every 30 seconds.\n\n"
        f"🌴 Lock in fetes, coordinate costume pickup & build your squad itinerary free!\n"
        f"👉 Download free / Link in bio: https://carnival-planner.com\n\n"
        f"#carnivalplanner #motiongraphics #soca2026 #trinidadcarnival #nottinghillcarnival #miamicarnival #reels #shorts #fyp #viral #caribbeancarnival #masquerader"
    )

    if publish:
        from hybrid_publisher import publish_to_all_socials
        print("\n🚀 DISPATCHING ANIMATED VIDEO AD LIVE TO SOCIAL NETWORKS...")
        results = publish_to_all_socials(
            media_url_or_path=out_video_path,
            title=title,
            caption=caption,
            tags=["#carnivalplanner", "#soca2026", "#reels", "#shorts", "#fyp"],
            media_type="video",
            dry_run=False
        )

        # Record in history
        from cinematic_engine import record_published_post
        record_published_post({
            "id": f"motion_anim_{timestamp}",
            "title": title,
            "hook_line": "Stop losing your crew in 50k masqueraders!",
            "carnival": "Global 25+ Carnivals"
        }, results)

        return results
    else:
        print("\nℹ️ Dry-run mode completed. Run with `--publish` to post live.")
        return {"status": "rendered", "video": out_video_path}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Carnival Planner Motion Animation Video Studio")
    parser.add_argument("--publish", action="store_true", default=True, help="Publish live to social platforms")
    args = parser.parse_args()

    run_animation_ad_pipeline(publish=args.publish)
