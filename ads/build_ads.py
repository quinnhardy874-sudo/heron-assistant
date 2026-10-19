"""Rebuild the Heron Holiday Lighting ads as sharp 1080x1350 (4:5) images.

Photos are AI-upscaled crops of the original panels; all text is redrawn
fresh so it stays crisp and readable on a phone.

Usage: python3 build_ads.py <upscaled_photo_dir> <logo_png> <font_dir> <out_dir>
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1080, 1350
BG = (14, 30, 22)
CREAM = (239, 234, 222)
GREEN = (22, 51, 38)
GOLD = (212, 178, 106)
WHITE = (247, 243, 234)
SOFT = (205, 200, 188)

PHONE = "410-830-0843"
SOCIAL = "@heron.landscaping   •   Heron Landscaping on Facebook"

ADS = {
    "01-brighter-nights": dict(caps=["BRIGHTER NIGHTS.", "A MORE BEAUTIFUL HOME."],
                               feats="INSTALLATION   /   TAKEDOWN"),
    "02-services-list-cream": dict(cream=True),
    "03-let-us-make-your-home-shine": dict(italic=["Let Us Make Your Home Shine", "This Holiday Season"],
                                           feats="INSTALLATION   /   TAKEDOWN"),
    "04-elevate-your-season": dict(caps=["ELEVATE YOUR", "HOLIDAY SEASON"],
                                   sub=["Premium lighting. Expert installation.", "A brighter, more beautiful home."],
                                   feats="INSTALLATION   /   TAKEDOWN"),
    "05-simple-elegant-done-right": dict(italic=["Simple. Elegant. Done Right."],
                                         feats="INSTALLATION   /   TAKEDOWN"),
    "06-make-the-season-stress-free": dict(caps=["MAKE THE SEASON", "STRESS-FREE"],
                                           sub=["You enjoy the holidays. We'll handle the lights."],
                                           feats="INSTALLATION   /   TAKEDOWN"),
    "07-quality-lighting": dict(caps=["QUALITY LIGHTING.", "LASTING IMPRESSIONS."],
                                feats="CLEAN INSTALL  /  RELIABLE SERVICE  /  TAKEDOWN INCLUDED"),
    "08-beautiful-homes": dict(caps=["BEAUTIFUL HOMES", "DESERVE BEAUTIFUL LIGHTS"],
                               feats="INSTALLATION   /   TAKEDOWN"),
    "09-heron-bird": dict(anchor=0.0, caps=["PREMIUM HOLIDAY LIGHTING", "FOR YOUR HOME"],
                          feats_italic="Local  /  Professional  /  Trusted"),
    "10-book-early": dict(caps=["BOOK EARLY"], sub=["to get your preferred date & time."],
                          feats="INSTALLATION  /  TAKEDOWN  /  STRESS-FREE HOLIDAYS"),
}


class Fonts:
    def __init__(self, d):
        self.d = d

    def __call__(self, name, size):
        return ImageFont.truetype(os.path.join(self.d, name), size)


def tracked(draw, cx, y, text, font, fill, track=0.0, max_w=None):
    """Draw centered text with letter-spacing (track = fraction of font size)."""
    size = font.size
    while True:
        gap = size * track
        widths = [draw.textlength(ch, font=font) for ch in text]
        total = sum(widths) + gap * (len(text) - 1)
        if max_w is None or total <= max_w or size <= 14:
            break
        size -= 1
        font = font.font_variant(size=size)
    x = cx - total / 2
    for ch, w in zip(text, widths):
        draw.text((x, y), ch, font=font, fill=fill)
        x += w + gap
    bbox = font.getbbox("HQgy")
    return y + bbox[3]


def paste_photo(canvas, photo, top, bottom, anchor=0.5):
    """Cover-fit photo into [top, bottom], fading both edges into the background."""
    h = bottom - top
    scale = max(W / photo.width, h / photo.height)
    ph = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
    ph = ph.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
    left = (ph.width - W) // 2
    oy = round((ph.height - h) * anchor)
    ph = ph.crop((left, oy, left + W, oy + h))
    mask = Image.new("L", (W, h), 255)
    md = ImageDraw.Draw(mask)
    fade = min(160, h // 3)
    for i in range(fade):
        v = round(255 * (i / fade) ** 1.4)
        md.line([(0, i), (W, i)], fill=v)
        md.line([(0, h - 1 - i), (W, h - 1 - i)], fill=v)
    canvas.paste(ph, (0, top), mask)


def header(img, f, logo, dark_text):
    d = ImageDraw.Draw(img)
    ink = GREEN if dark_text else WHITE
    lg = logo
    if dark_text:
        solid = Image.new("RGBA", lg.size, GREEN + (255,))
        solid.putalpha(lg.getchannel("A"))
        lg = solid
    lw = 140
    lg = lg.resize((lw, round(lg.height * lw / lg.width)), Image.LANCZOS)
    img.alpha_composite(lg, ((W - lw) // 2, 40))
    y = 40 + lg.height + 10
    y = tracked(d, W / 2, y, "HERON", f("Cinzel-normal-600.ttf", 84), ink, 0.16) + 10
    y = tracked(d, W / 2, y, "HOLIDAY LIGHTING", f("Cinzel-normal-500.ttf", 30), ink, 0.32) + 20
    d.line([(W / 2 - 70, y), (W / 2 + 70, y)], fill=GOLD, width=3)
    return y + 28


def headline(img, f, y, spec, ink=WHITE, sub_ink=SOFT):
    d = ImageDraw.Draw(img)
    for line in spec.get("caps", []):
        y = tracked(d, W / 2, y, line, f("Cinzel-normal-500.ttf", 50), ink, 0.10, max_w=980) + 14
    for line in spec.get("italic", []):
        y = tracked(d, W / 2, y, line, f("Cormorant_Garamond-italic-600.ttf", 68), ink, 0.01, max_w=980) + 6
    if spec.get("sub"):
        y += 8
        for line in spec["sub"]:
            y = tracked(d, W / 2, y, line, f("Cormorant_Garamond-italic-500.ttf", 40), sub_ink, 0.01, max_w=980) + 4
    return y


def footer(img, f, spec, top, filled_cta=False, ink=WHITE, soft=SOFT):
    d = ImageDraw.Draw(img)
    y = top
    if spec.get("feats"):
        y = tracked(d, W / 2, y, spec["feats"], f("Montserrat-normal-600.ttf", 26), GOLD, 0.14, max_w=980) + 26
    elif spec.get("feats_italic"):
        y = tracked(d, W / 2, y, spec["feats_italic"], f("Cormorant_Garamond-italic-600.ttf", 36), GOLD, 0.02) + 18
    bw, bh = 640, 88
    box = [(W - bw) / 2, y, (W + bw) / 2, y + bh]
    if filled_cta:
        d.rounded_rectangle(box, radius=10, fill=GREEN)
        cta_ink = CREAM
    else:
        d.rounded_rectangle(box, radius=10, outline=GOLD, width=3)
        cta_ink = WHITE
    cf = f("Cinzel-normal-600.ttf", 38)
    th = cf.getbbox("GET")[3] - cf.getbbox("GET")[1]
    tracked(d, W / 2, y + (bh - th) / 2 - cf.getbbox("GET")[1], "GET A FREE QUOTE", cf, cta_ink, 0.16)
    y += bh + 22
    y = tracked(d, W / 2, y, "CALL OR TEXT", f("Montserrat-normal-600.ttf", 22), soft, 0.3) + 4
    y = tracked(d, W / 2, y, PHONE, f("Cinzel-normal-600.ttf", 64), ink, 0.06) + 18
    tracked(d, W / 2, y, SOCIAL, f("Montserrat-normal-500.ttf", 24), soft, 0.02, max_w=980)


FOOTER_TOP = 1000  # features line starts here; footer block runs to ~1320


def build_dark(name, spec, photo, f, logo):
    img = Image.new("RGBA", (W, H), BG + (255,))
    # Draw the photo first so header/headline sit on clean dark space above it.
    probe = Image.new("RGBA", (W, H))
    y = header(probe, f, logo, False)
    y = headline(probe, f, y, spec)
    photo_top = y + 10
    photo_bottom = FOOTER_TOP + 40  # let the fade run under the features line
    paste_photo(img, photo, photo_top - 30, photo_bottom, spec.get("anchor", 0.5))
    # Re-darken the strip behind the footer for legibility.
    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    for i in range(140):
        a = round(235 * (i / 140))
        sd.line([(0, FOOTER_TOP - 140 + i), (W, FOOTER_TOP - 140 + i)], fill=BG + (a,))
    sd.rectangle([(0, FOOTER_TOP), (W, H)], fill=BG + (255,))
    img.alpha_composite(shade)
    y = header(img, f, logo, False)
    headline(img, f, y, spec)
    footer(img, f, spec, FOOTER_TOP)
    return img


def build_cream(f, logo):
    img = Image.new("RGBA", (W, H), CREAM + (255,))
    d = ImageDraw.Draw(img)
    y = header(img, f, logo, True)
    y = headline(img, f, y, dict(caps=["PROFESSIONAL HOLIDAY", "LIGHTING SERVICES"]), ink=GREEN) + 36
    items = [("INSTALLATION", "Custom lighting, tailored to your home."),
             ("TAKEDOWN", "We'll handle the hard work."),
             ("STRESS-FREE HOLIDAYS", "Professional, reliable, and on time.")]
    for title, body in items:
        cx = W / 2
        d.regular_polygon((cx, y + 6, 8), 4, fill=GOLD)
        y = tracked(d, cx, y + 22, title, f("Cinzel-normal-600.ttf", 36), GREEN, 0.14) + 4
        y = tracked(d, cx, y, body, f("Cormorant_Garamond-italic-500.ttf", 38), (70, 80, 72), 0.0) + 34
    footer(img, f, dict(feats="LOCAL   /   PROFESSIONAL   /   TRUSTED"), FOOTER_TOP,
           filled_cta=True, ink=GREEN, soft=(90, 98, 90))
    return img


def main():
    up_dir, logo_path, font_dir, out_dir = sys.argv[1:5]
    os.makedirs(out_dir, exist_ok=True)
    f = Fonts(font_dir)
    logo = Image.open(logo_path).convert("RGBA")
    for name, spec in ADS.items():
        if spec.get("cream"):
            img = build_cream(f, logo)
        else:
            photo = Image.open(os.path.join(up_dir, name[:2] + ".png")).convert("RGB")
            img = build_dark(name, spec, photo, f, logo)
        img.convert("RGB").save(os.path.join(out_dir, name + "-1080x1350.png"))
        print("built", name)


if __name__ == "__main__":
    main()
