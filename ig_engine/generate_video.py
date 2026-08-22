"""
Carnival Planner - Automated 9:16 Short Video Generator
Uses Pillow, gTTS, and MoviePy to auto-generate viral 9:16 short videos for TikTok, Reels, & Shorts.
"""

import os
import sys
import tempfile
from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Color Palette (Dark vibrant Caribbean aesthetic)
COLOR_BG_DARK = (15, 12, 28)        # Deep night violet
COLOR_PURPLE = (124, 58, 237)      # Vibrant Purple
COLOR_PINK = (236, 72, 153)        # Hot Pink / Magenta
COLOR_CYAN = (6, 182, 212)         # Electric Cyan
COLOR_GOLD = (245, 158, 11)        # Gold / Amber
COLOR_CARD_BG = (26, 22, 48)       # Card container
COLOR_TEXT_MAIN = (255, 255, 255)   # White
COLOR_TEXT_MUTED = (196, 181, 253) # Light lavender

def get_font(size, bold=False):
    """Attempt to load system TrueType fonts, fallback to default if unavailable."""
    font_names = [
        "arialbd.ttf" if bold else "arial.ttf",
        "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf",
        "segoeui.ttf" if not bold else "segoeuib.ttf",
    ]
    for font_name in font_names:
        try:
            return ImageFont.truetype(font_name, size)
        except OSError:
            continue
    return ImageFont.load_default()

def create_slide_image(title, body, badge="TRINIDAD CARNIVAL 2026", step_num=None, width=1080, height=1920):
    """Generates a 1080x1920 vertical frame with glassmorphism UI."""
    img = Image.new("RGB", (width, height), COLOR_BG_DARK)
    draw = ImageDraw.Draw(img)

    # Ambient Orbs
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)
    ol_draw.ellipse((-150, -150, width // 2 + 200, height // 3), fill=COLOR_PINK + (140,))
    ol_draw.ellipse((width // 3, height // 2, width + 200, height + 200), fill=COLOR_PURPLE + (120,))
    ol_draw.ellipse((100, height // 3, width - 100, height * 2 // 3), fill=COLOR_CYAN + (80,))
    
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Header Badge
    badge_font = get_font(34, bold=True)
    draw.rectangle([80, 160, 600, 230], fill=COLOR_PURPLE, outline=COLOR_PINK, width=3)
    draw.text((100, 175), f"🔥 {badge}", font=badge_font, fill=COLOR_TEXT_MAIN)

    # Main Card
    draw.rounded_rectangle([70, 320, width - 70, height - 250], radius=40, fill=COLOR_CARD_BG, outline=COLOR_PURPLE, width=4)

    # Step Number if applicable
    if step_num:
        num_font = get_font(120, bold=True)
        draw.text((120, 370), f"#{step_num}", font=num_font, fill=COLOR_GOLD)

    # Title Text
    title_font = get_font(58, bold=True)
    title_y = 540 if step_num else 420
    draw.text((120, title_y), title, font=title_font, fill=COLOR_TEXT_MAIN)

    # Divider Line
    draw.line([(120, title_y + 120), (width - 120, title_y + 120)], fill=COLOR_PINK, width=6)

    # Body Text
    body_font = get_font(42, bold=False)
    lines = body.split("\n")
    cur_y = title_y + 160
    for line in lines:
        draw.text((120, cur_y), line, font=body_font, fill=COLOR_TEXT_MUTED)
        cur_y += 75

    # Call to action footer
    footer_font = get_font(38, bold=True)
    draw.rounded_rectangle([100, height - 380, width - 100, height - 280], radius=25, fill=COLOR_PINK)
    draw.text((140, height - 345), "📲 Get Carnival Planner App Free", font=footer_font, fill=COLOR_TEXT_MAIN)

    return img

def generate_carnival_short_video(output_filename="notting_hill_nyc_short_2026.mp4"):
    """Creates a complete 9:16 vertical short video with voiceover and background audio."""
    try:
        from moviepy import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips
    except ImportError:
        from moviepy.editor import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips

    print("=" * 60)
    print("🎬 GENERATING 9:16 SHORT VIDEO FOR SOCIALS")
    print("=" * 60)

    slides_data = [
        {
            "title": "Notting Hill & NYC\nCarnival 2026 Guide 🚀",
            "body": "August & September Carnival Season!\nNotting Hill (Aug 31) & NYC (Sept 7)\nare right around the corner!",
            "badge": "UPCOMING CARNIVALS 2026",
            "speech": "Notting Hill and New York Labor Day Carnival 2026 Survival Guide! London and New York are right around the corner!"
        },
        {
            "step": "1",
            "title": "Lock In Band & Costume Pickup",
            "body": "Collect your costumes early!\nLadbroke Grove & Brooklyn band houses\nopen their distribution centers next week.",
            "badge": "TIP #1 COSTUME PICKUP",
            "speech": "Tip number 1. Lock in your costume pickup early. Ladbroke Grove and Brooklyn band distribution centers open next week."
        },
        {
            "step": "2",
            "title": "Coordinate Squad Invite Links",
            "body": "Never fete alone!\nCreate a Squad in Carnival Planner &\nshare your 6-digit invite link with friends.",
            "badge": "TIP #2 SQUAD MODE",
            "speech": "Tip number 2. Coordinate your squad! Share your squad link on Carnival Planner so everyone stays on the same schedule and budget."
        },
        {
            "step": "3",
            "title": "Check Sound System & Fete Maps",
            "body": "Plan your road route & fete schedule!\nTrack sound systems, shuttle points,\nand live squad member locations.",
            "badge": "TIP #3 ROAD MAPS",
            "speech": "Tip number 3. Check road maps and fete schedules. Track sound systems, shuttle points, and live squad pins on the road."
        },
        {
            "title": "Ready to Jump in De Band? 🥳",
            "body": "Download Carnival Planner free\nand build your ultimate itinerary!\n\nLink in bio / description! 👇",
            "badge": "CARNIVAL PLANNER APP",
            "speech": "Ready to jump in the band? Download Carnival Planner free today and build your ultimate carnival trip!"
        }
    ]

    video_clips = []
    temp_files = []

    try:
        for idx, slide in enumerate(slides_data):
            print(f"🎨 Rendering frame {idx+1}/{len(slides_data)}...")
            
            # Create PIL frame
            img = create_slide_image(
                title=slide["title"],
                body=slide["body"],
                badge=slide.get("badge", "CARNIVAL 2026"),
                step_num=slide.get("step")
            )
            
            frame_path = os.path.join(OUTPUT_DIR, f"temp_frame_{idx}.png")
            img.save(frame_path)
            temp_files.append(frame_path)

            # Create Voiceover TTS audio
            audio_path = os.path.join(OUTPUT_DIR, f"temp_audio_{idx}.mp3")
            tts = gTTS(text=slide["speech"], lang="en", tld="com")
            tts.save(audio_path)
            temp_files.append(audio_path)

            # Load into MoviePy
            audio_clip = AudioFileClip(audio_path)
            duration = max(audio_clip.duration + 0.6, 3.5) # ensure readable duration
            
            # Compatible clip assignment for both MoviePy v1 and v2
            if hasattr(ImageClip, 'with_duration'):
                clip = ImageClip(frame_path).with_duration(duration).with_audio(audio_clip)
            else:
                clip = ImageClip(frame_path).set_duration(duration).set_audio(audio_clip)

            video_clips.append(clip)

        # Concatenate video slides
        print("⚡ Concatenating video clips & adding background soca beat...")
        final_video = concatenate_videoclips(video_clips, method="compose")

        # Mix background soca audio if available
        bg_audio_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "soca_drum_beat.mp3")
        if os.path.exists(bg_audio_path):
            bg_audio = AudioFileClip(bg_audio_path)
            if hasattr(bg_audio, 'subclipped'):
                bg_sub = bg_audio.subclipped(0, final_video.duration)
            elif hasattr(bg_audio, 'subclip'):
                bg_sub = bg_audio.subclip(0, final_video.duration)
            else:
                bg_sub = bg_audio.with_duration(final_video.duration)

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

        # Output file path
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        
        print(f"🎬 Rendering final 9:16 MP4 video to: {output_path}...")
        final_video.write_videofile(
            output_path,
            fps=24,
            codec="libx264",
            audio_codec="aac",
            preset="fast"
        )

        print("\n" + "=" * 60)
        print("🎉 SHORT VIDEO GENERATED SUCCESSFULLY!")
        print(f"📁 Video Location: {output_path}")
        print("=" * 60 + "\n")

        return output_path

    finally:
        # Clean up temporary frames/audio
        for tmp in temp_files:
            if os.path.exists(tmp):
                try:
                    os.remove(tmp)
                except Exception:
                    pass

if __name__ == "__main__":
    out_file = generate_carnival_short_video("carnival_short_2026.mp4")
    print(f"Done! Created video: {out_file}")
