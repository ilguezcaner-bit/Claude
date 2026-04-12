from PIL import Image, ImageDraw, ImageFont
import math

W, H = 794, 1123
img = Image.new("RGB", (W, H), color=(13, 13, 13))
draw = ImageDraw.Draw(img)

# --- Background gradient (manual) ---
for y in range(H):
    t = y / H
    r = int(26 + (13 - 26) * t)
    g = int(26 + (13 - 26) * t)
    b = int(26 + (13 - 26) * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# --- Glow top-right ---
for i in range(120, 0, -1):
    alpha = int(30 * (i / 120))
    r2, g2, b2 = 255, 107 + i, 0
    draw.ellipse([
        W - 200 - i, -100 - i,
        W + 200 + i, 300 + i
    ], fill=(min(255, 26 + alpha), min(255, 26 + alpha // 3), 13))

# --- Top stripe ---
for y in range(6):
    for x in range(W):
        t = x / W
        r = int(255)
        g = int(107 + (204 - 107) * math.sin(math.pi * t))
        b = 0
        draw.point((x, y), fill=(r, g, b))

# --- Fonts (system fallback) ---
def load_font(size, bold=False):
    paths = [
        f"/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSansBold.otf" if bold else "/usr/share/fonts/truetype/freefont/FreeSans.otf",
    ]
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except:
            pass
    return ImageFont.load_default()

font_huge   = load_font(130, bold=True)
font_big    = load_font(80, bold=True)
font_medium = load_font(38, bold=True)
font_normal = load_font(26)
font_small  = load_font(20)
font_tiny   = load_font(16)

def center_text(text, y, font, color):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, y), text, font=font, fill=color)

def draw_rounded_rect(x1, y1, x2, y2, radius, fill, outline=None, outline_width=1):
    draw.rounded_rectangle([x1, y1, x2, y2], radius=radius, fill=fill, outline=outline, width=outline_width)

# --- Brand tag ---
tag_text = "EXKLUSIVES BUNDLE"
tag_font = font_tiny
bbox = draw.textbbox((0, 0), tag_text, font=tag_font)
tw = bbox[2] - bbox[0]
tx = (W - tw) // 2
ty = 55
pad = 12
draw_rounded_rect(tx - pad - 10, ty - pad, tx + tw + pad + 10, ty + (bbox[3] - bbox[1]) + pad,
                  radius=20, fill=(40, 20, 0), outline=(150, 70, 0), outline_width=1)
draw.text((tx, ty), tag_text, font=tag_font, fill=(255, 153, 51))

# --- Main title: 3 FÜR ---
center_text("3 FÜR", 100, font_huge, (255, 255, 255))

# --- 5€ in orange ---
price_text = "5"
euro_text = "€"
bbox5 = draw.textbbox((0, 0), price_text + euro_text, font=font_huge)
tw_total = bbox5[2] - bbox5[0]
bboxP = draw.textbbox((0, 0), price_text, font=font_huge)
tw_price = bboxP[2] - bboxP[0]
start_x = (W - tw_total) // 2
draw.text((start_x, 230), price_text, font=font_huge, fill=(255, 107, 0))
draw.text((start_x + tw_price, 230), euro_text, font=font_huge, fill=(255, 107, 0))

# --- Subtitle ---
center_text("DEAL OF THE DAY", 370, font_tiny, (120, 120, 120))

# --- Divider ---
div_y = 405
div_len = 80
draw.line([(W//2 - div_len, div_y), (W//2 + div_len, div_y)], fill=(255, 107, 0), width=3)

# --- Product cards ---
card_y = 430
card_h = 200
card1_x1, card1_x2 = 60, 340
card2_x1, card2_x2 = 454, 734

for cx1, cx2 in [(card1_x1, card1_x2), (card2_x1, card2_x2)]:
    draw_rounded_rect(cx1, card_y, cx2, card_y + card_h, radius=20,
                      fill=(22, 22, 22), outline=(50, 50, 50), outline_width=1)
    # top accent line
    for x in range(cx1 + 20, cx2 - 20):
        t = (x - (cx1 + 20)) / ((cx2 - 20) - (cx1 + 20))
        alpha = int(255 * math.sin(math.pi * t))
        draw.point((x, card_y), fill=(alpha, int(alpha * 0.42), 0))

# Product 1
icon1 = "PAPES"
sub1  = "AKTIVKOHLEFILTER"
desc1 = "Premium Qualitat"
bbox_i = draw.textbbox((0,0), icon1, font=font_medium)
tw_i = bbox_i[2] - bbox_i[0]
c1_cx = (card1_x1 + card1_x2) // 2
draw.text((c1_cx - tw_i // 2, card_y + 25), icon1, font=font_medium, fill=(255, 153, 51))
bbox_s = draw.textbbox((0,0), sub1, font=font_tiny)
tw_s = bbox_s[2] - bbox_s[0]
draw.text((c1_cx - tw_s // 2, card_y + 80), sub1, font=font_tiny, fill=(255, 255, 255))
bbox_d = draw.textbbox((0,0), desc1, font=font_tiny)
tw_d = bbox_d[2] - bbox_d[0]
draw.text((c1_cx - tw_d // 2, card_y + 115), desc1, font=font_tiny, fill=(100, 100, 100))

# Filter graphic
for i in range(5):
    fy = card_y + 145 + i * 7
    draw.rounded_rectangle([c1_cx - 30, fy, c1_cx + 30, fy + 5],
                            radius=3, fill=(60, 30, 0))

# Product 2
c2_cx = (card2_x1 + card2_x2) // 2
icon2 = "FEUERZEUG"
sub2  = "STURMFEUERZEUG"
desc2 = "Zuverlaessig & stark"
bbox_i2 = draw.textbbox((0,0), icon2, font=font_medium)
tw_i2 = bbox_i2[2] - bbox_i2[0]
draw.text((c2_cx - tw_i2 // 2, card_y + 25), icon2, font=font_medium, fill=(255, 153, 51))
bbox_s2 = draw.textbbox((0,0), sub2, font=font_tiny)
tw_s2 = bbox_s2[2] - bbox_s2[0]
draw.text((c2_cx - tw_s2 // 2, card_y + 80), sub2, font=font_tiny, fill=(255, 255, 255))
bbox_d2 = draw.textbbox((0,0), desc2, font=font_tiny)
tw_d2 = bbox_d2[2] - bbox_d2[0]
draw.text((c2_cx - tw_d2 // 2, card_y + 115), desc2, font=font_tiny, fill=(100, 100, 100))

# Flame graphic
flame_pts = [
    (c2_cx, card_y + 140),
    (c2_cx - 15, card_y + 165),
    (c2_cx - 8, card_y + 162),
    (c2_cx - 10, card_y + 175),
    (c2_cx + 10, card_y + 175),
    (c2_cx + 8, card_y + 162),
    (c2_cx + 15, card_y + 165),
]
draw.polygon(flame_pts, fill=(255, 107, 0))
draw.polygon([
    (c2_cx, card_y + 148),
    (c2_cx - 5, card_y + 163),
    (c2_cx + 5, card_y + 163),
], fill=(255, 200, 50))

# --- PLUS between cards ---
plus_cx = (card1_x2 + card2_x1) // 2
plus_cy = card_y + card_h // 2
bbox_pl = draw.textbbox((0,0), "+", font=font_big)
tw_pl = bbox_pl[2] - bbox_pl[0]
th_pl = bbox_pl[3] - bbox_pl[1]
draw.text((plus_cx - tw_pl // 2, plus_cy - th_pl // 2), "+", font=font_big, fill=(80, 40, 0))

# --- Price section ---
price_y = 660
center_text("NUR", price_y, font_tiny, (90, 90, 90))

# Big 5€
p_text = "5EUR"
display = "5€"
bbox_p = draw.textbbox((0,0), display, font=font_big)
tw_p = bbox_p[2] - bbox_p[0]
px = (W - tw_p) // 2

# Glow behind price
for i in range(80, 0, -5):
    alpha = int(15 * (i / 80))
    draw.ellipse([
        px + tw_p//2 - i*2, price_y + 40 - i,
        px + tw_p//2 + i*2, price_y + 140 + i
    ], fill=(min(13+alpha, 255), max(0, 13-alpha//2), 0))

draw.text((px, price_y + 30), display, font=font_big, fill=(255, 107, 0))
center_text("fur 3 Stuck  *  Solange Vorrat reicht", price_y + 130, font_tiny, (80, 80, 80))

# --- Highlight bar ---
bar_y = 830
draw_rounded_rect(0, bar_y, W, bar_y + 70, radius=0, fill=(200, 80, 0))
# Gradient overlay
for x in range(W):
    t = x / W
    g_val = int(80 + (153 - 80) * math.sin(math.pi * t))
    draw.line([(x, bar_y), (x, bar_y + 70)], fill=(255, g_val, 0))

bar_text = "JETZT ZUSCHLAGEN & SPAREN!"
bbox_b = draw.textbbox((0,0), bar_text, font=font_normal)
tw_b = bbox_b[2] - bbox_b[0]
th_b = bbox_b[3] - bbox_b[1]
draw.text(((W - tw_b) // 2, bar_y + (70 - th_b) // 2 - 3), bar_text, font=font_normal, fill=(255, 255, 255))

# Left/right bolts
bolt = "**"
draw.text((30, bar_y + 22), bolt, font=font_medium, fill=(255, 220, 100))
draw.text((W - 80, bar_y + 22), bolt, font=font_medium, fill=(255, 220, 100))

# --- Footer ---
footer_y = 940
draw.line([(60, footer_y), (W - 60, footer_y)], fill=(40, 40, 40), width=1)

left_text = "LIMITIERTES ANGEBOT"
draw.text((60, footer_y + 20), left_text, font=font_tiny, fill=(70, 70, 70))

badge_text = "TOP DEAL"
bbox_badge = draw.textbbox((0,0), badge_text, font=font_tiny)
tw_badge = bbox_badge[2] - bbox_badge[0]
bx = W - 60 - tw_badge - 30
by = footer_y + 15
draw_rounded_rect(bx, by, bx + tw_badge + 30, by + 35, radius=15,
                  fill=(40, 20, 0), outline=(150, 70, 0))
draw.text((bx + 15, by + 8), badge_text, font=font_tiny, fill=(255, 107, 0))

# --- Bottom stripe ---
for y in range(H - 6, H):
    for x in range(W):
        t = x / W
        r = 255
        g = int(107 + (204 - 107) * math.sin(math.pi * t))
        b = 0
        draw.point((x, y), fill=(r, g, b))

# --- Save ---
img.save("/home/user/Claude/flyer-bundle.png", "PNG", quality=95)
print("Flyer gespeichert: flyer-bundle.png")
