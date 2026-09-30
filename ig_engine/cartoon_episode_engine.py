"""
Carnival Planner - 24 FPS Cartoon Episode & Character Animation Studio
Generates full continuous cartoon episodes with:
1. Expressive Animated Masquerader Squad:
   - Maya (Frontline Masquerader): Chipping bounce, 4-layer flapping feather wings, gem headpiece, waving flag, lip-synced talking mouth
   - Tariq (Squad Leader): Chipping bounce, bucket hat, sunglasses, holding smartphone with pulsating holographic radar, lip-synced mouth
2. Living Cartoon Caribbean World:
   - Pumping Sound Truck with vibrating subwoofer speaker cones
   - Jumping crowd silhouettes with waving flags
   - Sweeping concert stage floodlights
   - Multi-colored floating confetti & glitter particle physics
3. 2-Voice Caribbean Dialogue:
   - Dual Edge-TTS neural voices (Female 'en-NG-EzinneNeural' + Male 'en-NG-AbeoNeural')
   - Comic-book style animated speech bubbles with bounce physics
4. High-Energy Soca Soundtrack with automated volume ducking
"""

import os
import sys
import math
import random
import asyncio
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import numpy as np

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from moviepy import VideoClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
TEMP_DIR = os.path.join(os.path.dirname(__file__), "temp_cartoon")
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

# Cartoon Color Palette
COLOR_SKY_TOP = (12, 7, 33)
COLOR_SKY_BOTTOM = (45, 18, 77)
COLOR_PURPLE = (139, 92, 246)
COLOR_PINK = (236, 72, 153)
COLOR_CYAN = (6, 182, 212)
COLOR_GOLD = (245, 158, 11)
COLOR_EMERALD = (16, 185, 129)
COLOR_SKIN_MAYA = (195, 120, 80)
COLOR_SKIN_TARIQ = (145, 85, 55)
COLOR_WHITE = (255, 255, 255)
COLOR_DARK = (18, 14, 32)

VOICE_FEMALE = "en-NG-EzinneNeural"
VOICE_MALE = "en-NG-AbeoNeural"

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
# 1. CARTOON FESTIVAL ENVIRONMENT (LIVING BACKGROUND)
# -------------------------------------------------------------
def draw_cartoon_environment(draw, overlay_draw, t, width=1080, height=1920):
    # Sky Gradient
    for y in range(height):
        ratio = y / height
        r = int(COLOR_SKY_TOP[0] * (1 - ratio) + COLOR_SKY_BOTTOM[0] * ratio)
        g = int(COLOR_SKY_TOP[1] * (1 - ratio) + COLOR_SKY_BOTTOM[1] * ratio)
        b = int(COLOR_SKY_TOP[2] * (1 - ratio) + COLOR_SKY_BOTTOM[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Sweeping Concert Stage Floodlights
    light_colors = [COLOR_CYAN, COLOR_PINK, COLOR_GOLD, COLOR_PURPLE]
    for idx, col in enumerate(light_colors):
        angle = math.sin(t * 2.5 + idx * 1.6) * 40
        light_x = int(width * (0.2 + idx * 0.2))
        beam_end_x = int(light_x + math.sin(math.radians(angle)) * 900)
        overlay_draw.polygon([
            (light_x - 30, height - 200),
            (light_x + 30, height - 200),
            (beam_end_x + 180, 0),
            (beam_end_x - 180, 0)
        ], fill=col + (35,))

    # Animated Sound Truck in Background
    truck_y = height - 620
    speaker_pulse = 1.0 + math.sin(t * 18) * 0.12 # Bass pump

    # Truck body silhouette
    draw.rectangle([width // 2 - 280, truck_y, width // 2 + 280, height - 380], fill=(22, 16, 42), outline=COLOR_PURPLE, width=4)
    # Sound System Speaker Cones (Pumping with Soca bass)
    for sp_x in [width // 2 - 190, width // 2 - 65, width // 2 + 65, width // 2 + 190]:
        for sp_y in [truck_y + 60, truck_y + 160]:
            r = int(38 * speaker_pulse)
            overlay_draw.ellipse((sp_x - r, sp_y - r, sp_x + r, sp_y + r), fill=COLOR_CYAN + (80,), outline=COLOR_GOLD, width=3)
            overlay_draw.ellipse((sp_x - r // 2, sp_y - r // 2, sp_x + r // 2, sp_y + r // 2), fill=(10, 8, 22), outline=COLOR_PINK, width=2)

    # Road Surface
    draw.rectangle([0, height - 420, width, height], fill=(16, 12, 30))
    draw.line([(0, height - 420), (width, height - 420)], fill=COLOR_PURPLE, width=6)

    # Jumping Crowd Silhouettes with Waving Flags in Far Background
    crowd_bounce = int(math.sin(t * 14) * 14)
    for cx in range(30, width + 50, 75):
        cy = height - 400 + crowd_bounce + (int(math.sin(cx + t * 5) * 8))
        draw.ellipse((cx - 24, cy - 50, cx + 24, cy - 2), fill=(30, 22, 54))
        draw.rectangle((cx - 18, cy, cx + 18, height - 380), fill=(25, 18, 46))
        # Mini flag waving
        if cx % 150 == 0:
            fw = int(math.sin(t * 12 + cx) * 12)
            draw.line([(cx, cy - 40), (cx + 10, cy - 100)], fill=(120, 100, 150), width=3)
            draw.polygon([(cx + 10, cy - 100), (cx + 45 + fw, cy - 85), (cx + 10, cy - 70)], fill=COLOR_PINK)

    # Floating Confetti & Glitter Particle Physics
    for i in range(25):
        phase = (t * 80 + i * 95) % height
        conf_x = int((i * 47 + math.sin(t * 2 + i) * 80) % width)
        conf_y = int(phase)
        c_col = light_colors[i % len(light_colors)]
        c_size = 5 + (i % 5)
        overlay_draw.ellipse((conf_x, conf_y, conf_x + c_size, conf_y + c_size * 2), fill=c_col + (200,))

# -------------------------------------------------------------
# 2. CARTOON MAYA (FRONTLINE MASQUERADER RIG)
# -------------------------------------------------------------
def draw_cartoon_maya(overlay_draw, cx, cy, t, is_speaking=False, mood="dance", scale=1.1):
    bounce = int(math.sin(t * 14) * 18 * scale)
    root_x = cx
    root_y = cy + bounce

    # 1. 4-Layer Flapping Feather Backpack Wings
    wing_flap = math.sin(t * 10) * 24
    wing_colors = [COLOR_PINK, COLOR_GOLD, COLOR_CYAN, COLOR_PURPLE]
    for layer, w_col in enumerate(wing_colors):
        rx = int((190 + layer * 35 + wing_flap) * scale)
        ry = int((260 + layer * 42) * scale)
        # Left Wing
        overlay_draw.ellipse((root_x - rx - 70, root_y - ry - 80, root_x - 30, root_y + 40), fill=w_col + (170,), outline=COLOR_GOLD + (220,), width=3)
        # Right Wing
        overlay_draw.ellipse((root_x + 30, root_y - ry - 80, root_x + rx + 70, root_y + 40), fill=w_col + (170,), outline=COLOR_GOLD + (220,), width=3)

    # 2. Torso & Frontline Corset
    torso_top = root_y - int(90 * scale)
    torso_bottom = root_y + int(75 * scale)
    overlay_draw.polygon([
        (root_x - int(45 * scale), torso_top),
        (root_x + int(45 * scale), torso_top),
        (root_x + int(32 * scale), torso_bottom),
        (root_x - int(32 * scale), torso_bottom)
    ], fill=COLOR_SKIN_MAYA)
    # Bra / Gems
    overlay_draw.rounded_rectangle([root_x - int(42 * scale), torso_top + int(10 * scale), root_x + int(42 * scale), torso_top + int(60 * scale)], radius=int(12 * scale), fill=COLOR_PINK, outline=COLOR_GOLD, width=3)

    # 3. Arms & Waving Flag
    arm_swing = math.sin(t * 12) * 22
    left_hand_x = root_x - int(90 * scale)
    left_hand_y = torso_top + int(60 * scale) + int(arm_swing * scale)
    overlay_draw.line([(root_x - int(40 * scale), torso_top + 15), (left_hand_x, left_hand_y)], fill=COLOR_SKIN_MAYA, width=int(16 * scale))

    # Right Arm waving Carnival Flag
    flag_hand_y = torso_top - int(60 * scale) + int(arm_swing * scale)
    right_hand_x = root_x + int(90 * scale)
    overlay_draw.line([(root_x + int(40 * scale), torso_top + 15), (right_hand_x, flag_hand_y)], fill=COLOR_SKIN_MAYA, width=int(16 * scale))
    # Flag
    fw = math.sin(t * 16) * 16
    overlay_draw.line([(right_hand_x, flag_hand_y + 60), (right_hand_x, flag_hand_y - 130)], fill=(210, 210, 220), width=4)
    overlay_draw.polygon([
        (right_hand_x, flag_hand_y - 130),
        (right_hand_x + 115 + fw, flag_hand_y - 100),
        (right_hand_x + 105 + fw, flag_hand_y - 35),
        (right_hand_x, flag_hand_y - 55)
    ], fill=COLOR_EMERALD, outline=COLOR_GOLD)
    overlay_draw.text((right_hand_x + 20, flag_hand_y - 92), "SQUAD", font=get_font(20, bold=True), fill=COLOR_WHITE)

    # 4. Head, Tiara & Facial Expressions
    head_y = torso_top - int(65 * scale)
    head_r = int(45 * scale)
    overlay_draw.ellipse((root_x - head_r, head_y - head_r, root_x + head_r, head_y + head_r), fill=COLOR_SKIN_MAYA)

    # Tiara
    crown_y = head_y - head_r - int(10 * scale)
    overlay_draw.polygon([
        (root_x - int(48 * scale), head_y - int(25 * scale)),
        (root_x - int(25 * scale), crown_y - int(30 * scale)),
        (root_x, crown_y - int(55 * scale)),
        (root_x + int(25 * scale), crown_y - int(30 * scale)),
        (root_x + int(48 * scale), head_y - int(25 * scale))
    ], fill=COLOR_GOLD, outline=COLOR_PINK, width=2)
    overlay_draw.ellipse((root_x - 8, crown_y - int(20 * scale), root_x + 8, crown_y - int(4 * scale)), fill=COLOR_CYAN)

    # Eyes & Sparkles
    eye_y = head_y - int(8 * scale)
    overlay_draw.ellipse((root_x - 18, eye_y - 5, root_x - 6, eye_y + 5), fill=(35, 20, 10))
    overlay_draw.ellipse((root_x + 6, eye_y - 5, root_x + 18, eye_y + 5), fill=(35, 20, 10))
    overlay_draw.ellipse((root_x - 14, eye_y - 4, root_x - 10, eye_y), fill=COLOR_WHITE)
    overlay_draw.ellipse((root_x + 10, eye_y - 4, root_x + 14, eye_y), fill=COLOR_WHITE)

    # Animated Talking Mouth (Lip flap when speaking)
    if is_speaking:
        mouth_open = int(abs(math.sin(t * 22)) * 14 * scale) + 4
        overlay_draw.ellipse((root_x - 14, eye_y + 12, root_x + 14, eye_y + 12 + mouth_open), fill=(160, 30, 40), outline=COLOR_WHITE, width=2)
    else:
        overlay_draw.arc((root_x - 14, eye_y + 8, root_x + 14, eye_y + 26), start=0, end=180, fill=COLOR_WHITE, width=4)

# -------------------------------------------------------------
# 3. CARTOON TARIQ (SQUAD LEADER / TECH MATE RIG)
# -------------------------------------------------------------
def draw_cartoon_tariq(overlay_draw, cx, cy, t, is_speaking=False, scale=1.1):
    bounce = int(math.sin(t * 14 + 0.6) * 16 * scale)
    root_x = cx
    root_y = cy + bounce

    # Torso (Festival Jersey)
    torso_top = root_y - int(85 * scale)
    torso_bottom = root_y + int(80 * scale)
    overlay_draw.polygon([
        (root_x - int(52 * scale), torso_top),
        (root_x + int(52 * scale), torso_top),
        (root_x + int(42 * scale), torso_bottom),
        (root_x - int(42 * scale), torso_bottom)
    ], fill=COLOR_CYAN, outline=COLOR_GOLD, width=3)
    overlay_draw.text((root_x - int(24 * scale), torso_top + int(25 * scale)), "CP26", font=get_font(24, bold=True), fill=COLOR_WHITE)

    # Left Arm (Rhythm pump)
    arm_swing = math.sin(t * 12 + 0.5) * 20
    lh_x = root_x - int(95 * scale)
    lh_y = torso_top + int(45 * scale) + int(arm_swing * scale)
    overlay_draw.line([(root_x - int(48 * scale), torso_top + 15), (lh_x, lh_y)], fill=COLOR_SKIN_TARIQ, width=int(18 * scale))

    # Right Hand: Holding Smartphone with Pulsating Holographic Radar
    phone_x = root_x + int(70 * scale)
    phone_y = torso_top + int(10 * scale)
    overlay_draw.line([(root_x + int(48 * scale), torso_top + 15), (phone_x, phone_y + 15)], fill=COLOR_SKIN_TARIQ, width=int(18 * scale))
    # Phone Body
    overlay_draw.rounded_rectangle([phone_x - 14, phone_y - 28, phone_x + 30, phone_y + 40], radius=8, fill=COLOR_DARK, outline=COLOR_CYAN, width=3)
    overlay_draw.rounded_rectangle([phone_x - 10, phone_y - 24, phone_x + 26, phone_y + 36], radius=4, fill=(8, 18, 38))
    # Pulsating Radar Hologram Rings
    pulse_r = int(18 + ((t * 90) % 45))
    overlay_draw.ellipse((phone_x + 8 - pulse_r, phone_y + 6 - pulse_r, phone_x + 8 + pulse_r, phone_y + 6 + pulse_r), outline=COLOR_EMERALD + (180,), width=3)
    overlay_draw.text((phone_x + 2, phone_y), "📍", font=get_font(18), fill=COLOR_GOLD)

    # Head & Bucket Hat
    head_y = torso_top - int(65 * scale)
    head_r = int(46 * scale)
    overlay_draw.ellipse((root_x - head_r, head_y - head_r, root_x + head_r, head_y + head_r), fill=COLOR_SKIN_TARIQ)

    # Bucket Hat
    hat_y = head_y - int(30 * scale)
    overlay_draw.polygon([
        (root_x - int(58 * scale), hat_y),
        (root_x - int(38 * scale), hat_y - int(40 * scale)),
        (root_x + int(38 * scale), hat_y - int(40 * scale)),
        (root_x + int(58 * scale), hat_y)
    ], fill=COLOR_GOLD, outline=COLOR_PURPLE, width=3)
    overlay_draw.ellipse((root_x - int(68 * scale), hat_y - 8, root_x + int(68 * scale), hat_y + 12), fill=COLOR_GOLD, outline=COLOR_PURPLE, width=2)

    # Sunglasses
    eye_y = head_y - int(5 * scale)
    overlay_draw.rounded_rectangle([root_x - 38, eye_y - 12, root_x - 6, eye_y + 12], radius=6, fill=(15, 15, 20), outline=COLOR_CYAN, width=2)
    overlay_draw.rounded_rectangle([root_x + 6, eye_y - 12, root_x + 38, eye_y + 12], radius=6, fill=(15, 15, 20), outline=COLOR_CYAN, width=2)
    overlay_draw.line([(root_x - 6, eye_y), (root_x + 6, eye_y)], fill=COLOR_CYAN, width=3)

    # Animated Mouth
    if is_speaking:
        mouth_open = int(abs(math.sin(t * 22)) * 14 * scale) + 4
        overlay_draw.ellipse((root_x - 14, eye_y + 24, root_x + 14, eye_y + 24 + mouth_open), fill=(140, 25, 30), outline=COLOR_WHITE, width=2)
    else:
        overlay_draw.arc((root_x - 14, eye_y + 18, root_x + 14, eye_y + 36), start=0, end=180, fill=COLOR_WHITE, width=4)

# -------------------------------------------------------------
# 4. COMIC / ANIME SPEECH BUBBLE
# -------------------------------------------------------------
def draw_speech_bubble(draw, overlay_draw, x, y, text, speaker="tariq", width=1080):
    lines = []
    words = text.split()
    curr = ""
    for w in words:
        if len(curr + " " + w) < 22:
            curr += (" " + w if curr else w)
        else:
            lines.append(curr)
            curr = w
    if curr:
        lines.append(curr)

    b_width = 720
    b_height = 80 + len(lines) * 48
    bx = x - b_width // 2
    by = y - b_height

    # Shadow
    overlay_draw.rounded_rectangle([bx + 8, by + 8, bx + b_width + 8, by + b_height + 8], radius=28, fill=(0, 0, 0, 140))
    # Main Comic Bubble
    border_col = COLOR_CYAN if speaker == "tariq" else COLOR_PINK
    overlay_draw.rounded_rectangle([bx, by, bx + b_width, by + b_height], radius=26, fill=COLOR_WHITE, outline=border_col, width=5)

    # Bubble Pointer Triangle pointing to character mouth
    pointer_x = bx + (180 if speaker == "tariq" else b_width - 180)
    overlay_draw.polygon([
        (pointer_x - 20, by + b_height),
        (pointer_x + 20, by + b_height),
        (pointer_x, by + b_height + 35)
    ], fill=COLOR_WHITE, outline=border_col)

    # Draw Speaker Tag
    tag_name = "TARIQ" if speaker == "tariq" else "MAYA"
    tag_col = COLOR_CYAN if speaker == "tariq" else COLOR_PINK
    draw.rounded_rectangle([bx + 30, by - 24, bx + 160, by + 18], radius=12, fill=tag_col, outline=COLOR_WHITE, width=2)
    draw.text((bx + 48, by - 20), tag_name, font=get_font(24, bold=True), fill=COLOR_WHITE)

    # Dialogue Text
    text_y = by + 28
    font = get_font(34, bold=True)
    for line in lines:
        draw.text((bx + 40, text_y), line, font=font, fill=COLOR_DARK)
        text_y += 46

# -------------------------------------------------------------
# 5. CARTOON EPISODE COMPILER
# -------------------------------------------------------------
async def synthesize_voice(text, voice, out_path):
    import edge_tts
    comm = edge_tts.Communicate(text, voice, rate="+25%")
    await comm.save(out_path)

def build_cartoon_episode(carnival_name="Miami Carnival 2026"):
    """
    Renders an animated cartoon episode featuring Maya & Tariq chipping on the road,
    dialogue back-and-forth, pulsating sound truck, crowd, and Soca beat!
    """
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_mp4 = os.path.join(OUTPUT_DIR, f"cartoon_episode_{timestamp}.mp4")

    print("=" * 80)
    print(f"🎬 RENDERING 24 FPS CARTOON EPISODE: '{carnival_name.upper()}'")
    print("=" * 80)

    # Episode Story Script (Back and Forth Dialogue)
    episode_dialogue = [
        {
            "speaker": "tariq",
            "voice": f"Yo Maya! There's 60,000 masqueraders out here and cell towers are dead! Where's our squad?!",
            "bubble_text": f"Yo! 60,000 masqueraders and cell towers are dead! Where's the squad?!",
            "char_speaking": "tariq",
            "header_badge": "🚨 EMERGENCY ON DE ROAD!"
        },
        {
            "speaker": "maya",
            "voice": f"Relax Tariq! Open Carnival Planner! Live Bluetooth mesh radar tracks the entire crew right by Sound Truck 3!",
            "bubble_text": f"Relax! Carnival Planner Radar tracks our whole crew live 200 feet by Sound Truck 3!",
            "char_speaking": "maya",
            "header_badge": "📍 SQUAD RADAR LOCKED!"
        },
        {
            "speaker": "tariq",
            "voice": f"Yooo! It really found them! Fete tickets locked in and sound trucks mapped! We are not missing a thing!",
            "bubble_text": f"Yooo! Found 'em! Fete tickets locked in and sound trucks mapped!",
            "char_speaking": "tariq",
            "header_badge": "⚡ FETES & MAPS READY!"
        },
        {
            "speaker": "maya",
            "voice": f"Never lose your crew on Carnival Day! Download Carnival Planner free today! Link in bio!",
            "bubble_text": f"Never lose your squad on de road! Download Carnival Planner free today! 👇",
            "char_speaking": "both",
            "header_badge": "👑 JUMP IN DE BAND!"
        }
    ]

    temp_files = []
    scene_clips = []

    try:
        for idx, act in enumerate(episode_dialogue):
            print(f"\n🎥 Act {idx + 1}/4: {act['speaker'].upper()} -> '{act['bubble_text'][:40]}...'")
            voice_actor = VOICE_MALE if act["speaker"] == "tariq" else VOICE_FEMALE
            audio_path = os.path.join(TEMP_DIR, f"act_{idx}_{timestamp}.mp3")
            temp_files.append(audio_path)
            asyncio.run(synthesize_voice(act["voice"], voice_actor, audio_path))

            audio_clip = AudioFileClip(audio_path)
            duration = max(audio_clip.duration + 0.3, 3.2)

            def make_act_frame(act_data, dur):
                def frame_gen(t):
                    img = Image.new("RGB", (1080, 1920), COLOR_SKY_TOP)
                    overlay = Image.new("RGBA", (1080, 1920), (0, 0, 0, 0))
                    draw = ImageDraw.Draw(img)
                    ol_draw = ImageDraw.Draw(overlay)

                    # 1. Environment
                    draw_cartoon_environment(draw, ol_draw, t)

                    # 2. Characters (Tariq on Left, Maya on Right)
                    tariq_speaking = (act_data["char_speaking"] in ["tariq", "both"])
                    maya_speaking = (act_data["char_speaking"] in ["maya", "both"])

                    draw_cartoon_tariq(ol_draw, cx=320, cy=1220, t=t, is_speaking=tariq_speaking, scale=1.15)
                    draw_cartoon_maya(ol_draw, cx=760, cy=1180, t=t, is_speaking=maya_speaking, scale=1.18)

                    # Merge Characters onto Scene
                    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
                    draw = ImageDraw.Draw(img)
                    ol_draw = ImageDraw.Draw(overlay)

                    # 3. Comic Header Badge
                    draw.rounded_rectangle([60, 90, 820, 180], radius=24, fill=COLOR_PURPLE, outline=COLOR_WHITE, width=3)
                    draw.text((85, 112), act_data["header_badge"], font=get_font(38, bold=True), fill=COLOR_WHITE)

                    # 4. Animated Comic Speech Bubble
                    speaker = act_data["speaker"]
                    bubble_x = 380 if speaker == "tariq" else 700
                    draw_speech_bubble(draw, ol_draw, bubble_x, 920, act_data["bubble_text"], speaker=speaker)

                    final_frame = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
                    return np.array(final_frame)
                return frame_gen

            clip = VideoClip(make_act_frame(act, duration), duration=duration)
            if hasattr(clip, 'with_audio'):
                clip = clip.with_audio(audio_clip)
            else:
                clip = clip.set_audio(audio_clip)

            scene_clips.append(clip)

        print("\n⚡ Concatenating cartoon scenes & layering Soca soundtrack...")
        final_video = concatenate_videoclips(scene_clips, method="compose")

        # Layer authentic Soca beat
        soca_music_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "soca_drum_beat.mp3")
        if os.path.exists(soca_music_path):
            bg_audio = AudioFileClip(soca_music_path)
            bg_sub = bg_audio.subclipped(0, final_video.duration) if hasattr(bg_audio, 'subclipped') else bg_audio.subclip(0, final_video.duration)
            bg_music = bg_sub.with_volume_scaled(0.18) if hasattr(bg_sub, 'with_volume_scaled') else bg_sub.volumex(0.18)
            final_audio = CompositeAudioClip([final_video.audio, bg_music])
            if hasattr(final_video, 'with_audio'):
                final_video = final_video.with_audio(final_audio)
            else:
                final_video = final_video.set_audio(final_audio)

        print(f"\n🎥 Exporting final 1080x1920 Cartoon Episode to: {out_mp4}...")
        final_video.write_videofile(
            out_mp4,
            fps=24,
            codec="libx264",
            audio_codec="aac",
            preset="fast"
        )

        print("=" * 80)
        print("🎉 CARTOON EPISODE GENERATED SUCCESSFULLY!")
        print(f"📁 Video Location: {out_mp4}")
        print("=" * 80)

        return out_mp4

    finally:
        for tf in temp_files:
            if os.path.exists(tf):
                try:
                    os.remove(tf)
                except Exception:
                    pass

if __name__ == "__main__":
    v = build_cartoon_episode("Miami Carnival 2026")
    print(f"Generated: {v}")
