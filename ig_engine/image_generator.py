"""
Carnival Planner - Headless Instagram Image Generator
Generates 1080x1080 (Feed) and 1080x1920 (Story) alert graphics using Pillow.
"""

import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")

# Color Palette (Dark vibrant Caribbean aesthetic)
COLOR_BG_DARK = (15, 12, 28)        # Deep night violet
COLOR_PURPLE = (124, 58, 237)      # Vibrant Purple
COLOR_PINK = (236, 72, 153)        # Hot Pink / Magenta
COLOR_CYAN = (6, 182, 212)         # Electric Cyan
COLOR_GOLD = (245, 158, 11)        # Gold / Amber
COLOR_CARD_BG = (26, 22, 48)       # Card container
COLOR_TEXT_MAIN = (255, 255, 255)   # White
COLOR_TEXT_MUTED = (196, 181, 253) # Light lavender
COLOR_GREEN = (16, 185, 129)       # Price drop green

def get_font(size, bold=False):
    """Attempt to load system TrueType fonts, fallback to default if unavailable."""
    font_names = [
        "arialbd.ttf" if bold else "arial.ttf",
        "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf",
        "segoeui.ttf" if not bold else "segoeuib.ttf",
        "Helvetica.ttf"
    ]
    for font_name in font_names:
        try:
            return ImageFont.truetype(font_name, size)
        except OSError:
            continue
    return ImageFont.load_default()

def draw_gradient_background(width, height, alert_type="FETE_DROP"):
    """Draws a high-energy vibrant gradient background."""
    img = Image.new("RGB", (width, height), COLOR_BG_DARK)
    draw = ImageDraw.Draw(img)

    # Draw gradient background arcs/orbs for glassmorphism ambient effect
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)

    if alert_type == "FLIGHT_ALERT":
        c1 = COLOR_CYAN + (140,)
        c2 = COLOR_PURPLE + (120,)
        c3 = COLOR_GREEN + (100,)
    else: # FETE_DROP
        c1 = COLOR_PINK + (150,)
        c2 = COLOR_PURPLE + (130,)
        c3 = COLOR_GOLD + (110,)

    # Glowing background ambient orbs
    ol_draw.ellipse((-100, -100, width // 2 + 100, height // 3), fill=c1)
    ol_draw.ellipse((width // 3, height // 2, width + 150, height + 100), fill=c2)
    ol_draw.ellipse((0, height - 300, width // 2 + 100, height + 100), fill=c3)

    # Soft blur filter for smooth ambient lighting
    overlay = overlay.filter(ImageFilter.GaussianBlur(80))
    img.paste(overlay, (0, 0), overlay)
    
    return img

def create_alert_graphic(alert_data, is_story=False):
    """
    Creates a social image for the given alert.
    :param alert_data: dict containing title, subtitle, price, carnival, etc.
    :param is_story: bool, True for 1080x1920, False for 1080x1080
    """
    width = 1080
    height = 1920 if is_story else 1080
    alert_type = alert_data.get("type", "FETE_DROP")

    img = draw_gradient_background(width, height, alert_type)
    draw = ImageDraw.Draw(img)

    # Fonts
    font_header = get_font(26, bold=True)
    font_badge = get_font(24, bold=True)
    font_title = get_font(52 if not is_story else 58, bold=True)
    font_subtitle = get_font(32, bold=False)
    font_price = get_font(72, bold=True)
    font_meta = get_font(28, bold=False)
    font_cta = get_font(28, bold=True)

    # 1. Header Branding Bar
    margin_x = 70
    current_y = 90 if is_story else 70

    draw.text((margin_x, current_y), "🏝️ CARIBBEAN CARNIVAL PLANNER", fill=COLOR_CYAN, font=font_header)
    current_y += 60

    # 2. Alert Category Badge
    if alert_type == "FLIGHT_ALERT":
        badge_text = " ✈️ FLIGHT PRICE DROP ALERT "
        badge_bg = (6, 182, 212) # Cyan
    else:
        badge_text = " 🔥 FETE TICKET DROP ALERT "
        badge_bg = (236, 72, 153) # Pink

    badge_w = 460
    badge_h = 50
    draw.rounded_rectangle(
        [margin_x, current_y, margin_x + badge_w, current_y + badge_h],
        radius=12,
        fill=badge_bg
    )
    draw.text((margin_x + 15, current_y + 10), badge_text, fill=(255, 255, 255), font=font_badge)
    current_y += badge_h + 40

    # 3. Content Card Container (Glassmorphism look)
    card_margin_y = current_y
    card_h = 620 if is_story else 560
    card_rect = [margin_x, card_margin_y, width - margin_x, card_margin_y + card_h]
    
    # Draw dark translucent card
    draw.rounded_rectangle(card_rect, radius=24, fill=(20, 16, 38), outline=COLOR_PURPLE, width=2)

    inner_y = card_margin_y + 40
    inner_x = margin_x + 40

    # Destination / Carnival tag
    carnival_name = alert_data.get("carnival", "Caribbean Carnival").upper()
    draw.text((inner_x, inner_y), f"📍 {carnival_name}", fill=COLOR_GOLD, font=font_meta)
    inner_y += 45

    # Main Title
    title = alert_data.get("title", "Event Alert")
    draw.text((inner_x, inner_y), title, fill=COLOR_TEXT_MAIN, font=font_title)
    inner_y += 75

    # Subtitle / Details
    subtitle = alert_data.get("subtitle", "")
    if subtitle:
        draw.text((inner_x, inner_y), subtitle, fill=COLOR_TEXT_MUTED, font=font_subtitle)
        inner_y += 50

    inner_y += 20
    # Price Highlight Box
    price_box_rect = [inner_x, inner_y, width - margin_x - 40, inner_y + 140]
    draw.rounded_rectangle(price_box_rect, radius=16, fill=(35, 28, 65), outline=COLOR_GREEN, width=2)

    price = alert_data.get("price", "TBA")
    draw.text((inner_x + 30, inner_y + 30), price, fill=COLOR_GREEN, font=font_price)

    # Optional details inside price box (e.g., original price or tier)
    extra_tag = alert_data.get("savings") or alert_data.get("tier") or alert_data.get("event_date") or ""
    if extra_tag:
        draw.text((inner_x + 30, inner_y + 98), f"✨ {extra_tag}", fill=COLOR_GOLD, font=font_meta)

    inner_y += 170

    # Additional metadata lines
    if alert_type == "FLIGHT_ALERT":
        dates = alert_data.get("travel_dates")
        airline = alert_data.get("airline")
        if dates:
            draw.text((inner_x, inner_y), f"📅 Dates: {dates}", fill=COLOR_TEXT_MAIN, font=font_meta)
            inner_y += 35
        if airline:
            draw.text((inner_x, inner_y), f"✈️ Airline: {airline}", fill=COLOR_TEXT_MUTED, font=font_meta)
    else: # FETE_DROP
        e_date = alert_data.get("event_date")
        if e_date:
            draw.text((inner_x, inner_y), f"📅 Date: {e_date}", fill=COLOR_TEXT_MAIN, font=font_meta)
            inner_y += 35
        tier = alert_data.get("tier")
        if tier:
            draw.text((inner_x, inner_y), f"🎟️ Tier: {tier}", fill=COLOR_TEXT_MUTED, font=font_meta)

    # 4. CTA Footer Section
    footer_y = height - 160 if is_story else height - 140
    
    # CTA Box
    cta_rect = [margin_x, footer_y, width - margin_x, footer_y + 80]
    draw.rounded_rectangle(cta_rect, radius=20, fill=COLOR_PURPLE)
    
    cta_text = "📲 GET INSTANT DROPS: CARNIVALPLANNER.APP"
    draw.text((margin_x + 40, footer_y + 24), cta_text, fill=COLOR_TEXT_MAIN, font=font_cta)

    # Save directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    format_type = "story" if is_story else "feed"
    output_filename = f"{alert_data.get('id', 'alert')}_{format_type}.png"
    output_path = os.path.join(OUTPUT_DIR, output_filename)
    img.save(output_path, "PNG")

    print(f"✅ Generated {format_type.upper()} image: {output_path}")
    return output_path

if __name__ == "__main__":
    # Test generation with dummy data
    sample_fete = {
        "id": "sample_fete",
        "type": "FETE_DROP",
        "title": "AMBush Trinidad 2027",
        "subtitle": "J'Ouvert Morning Experience",
        "carnival": "Trinidad Carnival 2027",
        "event_date": "Feb 06, 2027 • 3:00 AM",
        "price": "$125 USD",
        "tier": "Tier 1 Early Bird",
    }
    create_alert_graphic(sample_fete, is_story=False)
    create_alert_graphic(sample_fete, is_story=True)
