from pathlib import Path
from io import BytesIO
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.colors import HexColor, Color, white
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth

ROOT = Path(r'E:\Down\organic_farming')
SCREENS = ROOT / 'tmp' / 'pdfs' / 'screens'
OUT = ROOT / 'output' / 'pdf' / 'Mitti_and_Monsoon_Submission.pdf'
PAGE_W, PAGE_H = landscape(letter)
BG = HexColor('#F8F6F0')
OLIVE = HexColor('#38432B')
SAGE = HexColor('#465B38')
TERRA = HexColor('#C87A54')
SAND = HexColor('#EAE4D7')
INK = HexColor('#222421')
MUTED = HexColor('#62655E')
LINE = HexColor('#DDD5C6')

c = canvas.Canvas(str(OUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
c.setTitle('Mitti & Monsoon - Website Design Assignment')
c.setAuthor('Chandni')
page_num = 0

def footer():
    c.setStrokeColor(LINE)
    c.setLineWidth(.5)
    c.line(26, 27, PAGE_W - 26, 27)
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 7.5)
    c.drawString(26, 15, 'Mitti & Monsoon | Candidate Chandni')
    c.drawRightString(PAGE_W - 26, 15, f'{page_num:02d}')

def header(title, subtitle='WEBSITE DESIGN ASSIGNMENT'):
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(OLIVE)
    c.setFont('Helvetica-Bold', 8)
    c.drawString(26, PAGE_H - 23, subtitle.upper())
    c.setFillColor(INK)
    c.setFont('Times-Roman', 18)
    c.drawRightString(PAGE_W - 26, PAGE_H - 27, title)
    c.setStrokeColor(LINE)
    c.line(26, PAGE_H - 37, PAGE_W - 26, PAGE_H - 37)

def next_page():
    global page_num
    footer()
    c.showPage()
    page_num += 1

def rounded(x, y, w, h, fill, stroke=LINE, radius=12):
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.roundRect(x, y, w, h, radius, fill=1, stroke=1)

def fit_image(img, x, y, w, h):
    if isinstance(img, (str, Path)):
        img = ImageReader(str(img))
    c.drawImage(img, x, y, width=w, height=h, preserveAspectRatio=True, anchor='c', mask='auto')

def text_lines(text, x, y, width, font='Helvetica', size=9, leading=13, color=INK):
    c.setFillColor(color)
    c.setFont(font, size)
    words = text.split()
    line = ''
    for word in words:
        candidate = word if not line else line + ' ' + word
        if stringWidth(candidate, font, size) <= width:
            line = candidate
        else:
            c.drawString(x, y, line)
            y -= leading
            line = word
    if line:
        c.drawString(x, y, line)
        y -= leading
    return y

# Cover
page_num += 1
c.setFillColor(BG)
c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
c.setFillColor(OLIVE)
c.rect(0, 0, 250, PAGE_H, fill=1, stroke=0)
c.setFillColor(HexColor('#D8D3C8'))
c.setFont('Helvetica-Bold', 8)
c.drawString(36, PAGE_H - 42, 'ORGANIC FOOD COMPANY')
c.setFillColor(HexColor('#F8F6F0'))
c.setFont('Times-Roman', 34)
c.drawString(36, PAGE_H - 100, 'Mitti &')
c.drawString(36, PAGE_H - 140, 'Monsoon')
c.setFillColor(HexColor('#D9C8A7'))
c.setFont('Times-Italic', 14)
c.drawString(36, PAGE_H - 174, 'Everyday pieces, rooted')
c.drawString(36, PAGE_H - 193, 'in earth & rain')
c.setStrokeColor(HexColor('#697456'))
c.line(36, PAGE_H - 220, 210, PAGE_H - 220)
c.setFillColor(HexColor('#E7E1D5'))
c.setFont('Helvetica', 9)
c.drawString(36, PAGE_H - 244, 'WEBSITE DESIGN')
c.drawString(36, PAGE_H - 258, 'ASSESSMENT')
c.setFillColor(HexColor('#D9C8A7'))
c.setFont('Helvetica', 8)
c.drawString(36, 52, 'CANDIDATE')
c.setFillColor(white)
c.setFont('Helvetica-Bold', 12)
c.drawString(36, 34, 'Chandni')

c.setFillColor(OLIVE)
c.setFont('Helvetica-Bold', 8)
c.drawString(282, PAGE_H - 48, 'A DIGITAL JOURNEY FROM FARM TO TABLE')
c.setFillColor(INK)
c.setFont('Times-Roman', 25)
c.drawString(282, PAGE_H - 86, 'A quieter kind of grocery experience')
y = PAGE_H - 115
intro = 'A warm, editorial storefront for Indian families, home cooks, and gifting buyers who want to know how food is grown and who made it.'
y = text_lines(intro, 282, y, 465, size=11, leading=16, color=MUTED)
# deliverable map
rounded(282, 122, 465, 229, white, LINE, 14)
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold', 9)
c.drawString(304, 327, 'IN THIS SUBMISSION')
items = [
    ('01', 'Desktop website', 'Home, Shop, Product Detail, Our Story, and Gifting & Bulk'),
    ('02', 'Mobile views', 'Home and a product detail layout preview'),
    ('03', 'Brand mini-kit', 'Wordmark idea, palette, typography, and two package concepts'),
    ('04', 'Design note', 'Audience, visual choices, and the central brand idea'),
]
for i,(num,label,desc) in enumerate(items):
    yy = 291 - i*42
    c.setFillColor(TERRA); c.setFont('Helvetica-Bold', 9); c.drawString(304, yy, num)
    c.setFillColor(INK); c.setFont('Helvetica-Bold', 9); c.drawString(333, yy, label)
    text_lines(desc, 333, yy-14, 380, size=8, leading=10, color=MUTED)
rounded(282, 53, 465, 48, HexColor('#F1E8D8'), HexColor('#E2D4BB'), 10)
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold', 8)
c.drawString(298, 81, 'HAND-IN NOTE')
text_lines('Share the prototype using a deployed public URL. Localhost is only reachable on the development computer.', 298, 66, 425, size=8, leading=10, color=INK)
footer(); c.showPage(); page_num += 1

# Site screenshots, segmented so the full page remains legible.
def screenshot_pages(key, title, per_page=1000):
    global page_num
    p = SCREENS / f'{key}.png'
    im = Image.open(p).convert('RGB')
    w, h = im.size
    bounds = list(range(0, h, per_page))
    if len(bounds) > 1 and h - bounds[-1] < 500:
        bounds.pop()
    total = len(bounds)
    for idx, top in enumerate(bounds):
        bottom = min(h, top + per_page) if idx < total - 1 else h
        crop = im.crop((0, top, w, bottom))
        bio = BytesIO(); crop.save(bio, format='PNG'); bio.seek(0)
        header(title, 'DESKTOP WEBSITE')
        c.setFillColor(MUTED); c.setFont('Helvetica', 8)
        c.drawString(26, PAGE_H - 52, f'{title.upper()}  |  FULL-PAGE CAPTURE  |  SECTION {idx+1} OF {total}')
        maxw, maxh = PAGE_W - 52, PAGE_H - 106
        iw, ih = crop.size
        scale = min(maxw / iw, maxh / ih)
        dw, dh = iw * scale, ih * scale
        x, y = (PAGE_W - dw) / 2, 42 + (maxh - dh) / 2
        c.setFillColor(white); c.roundRect(x-3, y-3, dw+6, dh+6, 5, fill=1, stroke=0)
        c.drawImage(ImageReader(bio), x, y, width=dw, height=dh, mask='auto')
        next_page()

screenshot_pages('home', 'Home')
screenshot_pages('shop', 'Shop / Product Listing')
# PDP modal is one desktop screen rather than a full-page route.
header('Product Detail', 'DESKTOP WEBSITE')
fit_image(SCREENS / 'product-detail.png', 26, 42, PAGE_W-52, PAGE_H-106)
next_page()
screenshot_pages('story', 'Our Story / Farmers')
screenshot_pages('bulk', 'Contact / Gifting & Bulk')

# Mobile previews, reconstructed from the responsive components and clearly labeled.
def phone_page(title, kind):
    global page_num
    PW, PH = letter
    c.setPageSize((PW, PH))
    c.setFillColor(BG); c.rect(0,0,PW,PH,fill=1,stroke=0)
    c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',8); c.drawString(28, PH-26, 'RESPONSIVE LAYOUT PREVIEW')
    c.setFillColor(INK); c.setFont('Times-Roman',19); c.drawRightString(PW-28, PH-30, title)
    c.setStrokeColor(LINE); c.line(28,PH-40,PW-28,PH-40)
    # framed phone screen
    fx, fy, fw, fh = (PW-284)/2, 86, 284, 620
    c.setFillColor(HexColor('#242622')); c.roundRect(fx-7,fy-8,fw+14,fh+16,28,fill=1,stroke=0)
    c.setFillColor(BG); c.roundRect(fx,fy,fw,fh,22,fill=1,stroke=0)
    c.setFillColor(OLIVE); c.rect(fx,fy+fh-25,fw,25,fill=1,stroke=0)
    c.setFillColor(white); c.setFont('Helvetica',6.3); c.drawCentredString(fx+fw/2,fy+fh-16,'FIRST MONSOON HARVEST  -  ROOTED IN INDIA')
    nav_y=fy+fh-66
    c.setFillColor(BG); c.rect(fx,nav_y,fw,41,fill=1,stroke=0)
    c.setFillColor(INK); c.setFont('Times-Roman',13); c.drawString(fx+13,nav_y+15,'Mitti & Monsoon')
    c.setFillColor(OLIVE); c.setFont('Helvetica',7); c.drawRightString(fx+fw-12,nav_y+16,'SEARCH   BAG')
    if kind == 'home':
        c.setFillColor(MUTED); c.setFont('Helvetica-Bold',6.5); c.drawString(fx+14,nav_y-25,'HANDCRAFTED  -  EARTHY  -  TIMELESS')
        c.setFillColor(INK); c.setFont('Times-Roman',21); c.drawString(fx+14,nav_y-57,'Everyday pieces,')
        c.drawString(fx+14,nav_y-81,'rooted in earth')
        c.setFillColor(SAGE); c.setFont('Times-Italic',21); c.drawString(fx+14,nav_y-105,'& rain')
        text_lines('Handcrafted ceramics, home decor and lifestyle pieces inspired by nature, soil and the monsoon.',fx+14,nav_y-126,fw-28,size=7.2,leading=10,color=MUTED)
        c.setFillColor(OLIVE); c.roundRect(fx+14,nav_y-186,128,27,14,fill=1,stroke=0)
        c.setFillColor(white); c.setFont('Helvetica-Bold',7); c.drawCentredString(fx+78,nav_y-176,'Shop the Collection')
        c.setFillColor(BG); c.setStrokeColor(SAGE); c.roundRect(fx+151,nav_y-186,94,27,14,fill=1,stroke=1)
        c.setFillColor(OLIVE); c.drawCentredString(fx+198,nav_y-176,'Our Story')
        hero=ROOT/'src'/'assets'/'images'/'hero_ceramics_still_life_1793651013505.jpg'
        fit_image(hero,fx+13,fy+220,fw-26,177)
        c.setFillColor(HexColor('#F1ECE2')); c.rect(fx,fy+145,fw,62,fill=1,stroke=0)
        c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',6.2); c.drawCentredString(fx+fw/2,fy+187,'OUR SACRED CONVICTION')
        c.setFillColor(INK); c.setFont('Times-Roman',12); c.drawCentredString(fx+fw/2,fy+165,'Honoring soil, rainfall & the hands')
        c.drawCentredString(fx+fw/2,fy+150,'that harvest')
    else:
        oil=ROOT/'src'/'assets'/'images'/'oil_cold_pressed_1793650249541.jpg'
        fit_image(oil,fx+12,fy+356,fw-24,194)
        c.setFillColor(MUTED); c.setFont('Helvetica',6.5); c.drawString(fx+14,fy+337,'ALWAR, RAJASTHAN  -  WOOD-PRESSED OILS')
        c.setFillColor(INK); c.setFont('Times-Roman',16); c.drawString(fx+14,fy+312,'Wood-Pressed Mustard Oil')
        c.setFillColor(MUTED); c.setFont('Helvetica',7); c.drawString(fx+14,fy+296,'Mara Chekku extracted yellow mustard seed')
        c.setFillColor(TERRA); c.setFont('Helvetica-Bold',9); c.drawString(fx+14,fy+272,'★★★★★')
        c.setFillColor(INK); c.drawString(fx+58,fy+272,'4.9  (142 reviews)')
        rounded(fx+12,fy+214,fw-24,45,white,LINE,8)
        c.setFillColor(INK); c.setFont('Times-Roman',17); c.drawString(fx+23,fy+234,'Rs 380')
        c.setFillColor(SAGE); c.setFont('Helvetica-Bold',7); c.drawRightString(fx+fw-22,fy+234,'IN STOCK')
        c.setFillColor(MUTED); c.setFont('Helvetica',6.5); c.drawString(fx+23,fy+220,'Taxes included  -  Net content: 500 ml')
        c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',7); c.drawString(fx+15,fy+190,'HEALTH & BENEFITS')
        c.setStrokeColor(LINE); c.line(fx+14,fy+180,fx+fw-14,fy+180)
        text_lines('Cold-pressed in slow-moving wooden kolhus below 38 C to preserve its natural aroma and character.',fx+14,fy+163,fw-28,size=7.1,leading=10,color=MUTED)
        text_lines('Traditional extraction  |  Single-origin harvest  |  No chemical preservatives',fx+14,fy+126,fw-28,size=6.8,leading=10,color=INK)
        c.setFillColor(OLIVE); c.roundRect(fx+14,fy+45,fw-28,36,18,fill=1,stroke=0)
        c.setFillColor(white); c.setFont('Helvetica-Bold',8); c.drawCentredString(fx+fw/2,fy+59,'Add to Bag  -  Rs 380')
    c.setFillColor(MUTED); c.setFont('Helvetica',8)
    note='Preview follows the current app content and responsive component layout.'
    c.drawCentredString(PW/2,56,note)
    footer(); c.showPage(); c.setPageSize((PAGE_W,PAGE_H)); page_num += 1

phone_page('Home - Mobile', 'home')
phone_page('Product Detail - Mobile', 'product')

# Brand mini-kit, one page
header('Brand Mini-Kit', '01  /  BRAND IDENTITY')
# Wordmark panel
rounded(26, 385, 200, 153, white, LINE, 12)
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',7); c.drawString(42, 518, 'WORDMARK CONCEPT')
c.setFillColor(INK); c.setFont('Times-Roman',21); c.drawString(42, 481, 'Mitti &')
c.drawString(42, 457, 'Monsoon')
c.setFillColor(SAGE); c.setFont('Times-Italic',10); c.drawString(42, 433, 'Everyday pieces, rooted')
c.drawString(42, 419, 'in earth & rain')
c.setStrokeColor(TERRA); c.setLineWidth(1.3); c.line(42, 406, 95, 406)
c.setFillColor(MUTED); c.setFont('Helvetica',6.6); c.drawString(42, 393, 'Soil, season, and the home ritual.')
# Palette grid
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',7.5); c.drawString(246, 518, 'COLOUR PALETTE')
swatches=[('Limestone Canvas','#F8F6F0'),('Deep Forest Olive','#38432B'),('Warm Terracotta','#C87A54'),('Monsoon Sage','#465B38'),('Raw Linen Sand','#EAE4D7'),('Charcoal Earth','#222421')]
for i,(name,hx) in enumerate(swatches):
    x=246+i*86
    c.setFillColor(HexColor(hx)); c.setStrokeColor(LINE); c.roundRect(x,454,76,50,5,fill=1,stroke=1)
    c.setFillColor(INK); c.setFont('Helvetica-Bold',6.3); c.drawString(x,441,name[:15])
    c.setFont('Helvetica',6.3); c.setFillColor(MUTED); c.drawString(x,430,hx)
# Type cards
rounded(246, 385, 249, 34, HexColor('#F0EDE5'), LINE, 7)
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',7); c.drawString(258, 404, 'DISPLAY')
c.setFillColor(INK); c.setFont('Times-Roman',13); c.drawString(316, 400, 'Cormorant Garamond')
rounded(507, 385, 259, 34, HexColor('#F0EDE5'), LINE, 7)
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',7); c.drawString(519, 404, 'INTERFACE')
c.setFillColor(INK); c.setFont('Helvetica-Bold',11); c.drawString(574, 400, 'Plus Jakarta Sans')
# Packaging cards
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',7.5); c.drawString(26, 360, 'TWO PACKAGING DIRECTIONS')
for x in (26, 401):
    rounded(x, 55, 365, 288, white, LINE, 12)
# pouch illustration
c.setFillColor(HexColor('#B68D60')); c.setStrokeColor(HexColor('#8D6E49')); c.roundRect(53, 111, 116, 190, 12, fill=1, stroke=1)
c.setFillColor(HexColor('#9C754C')); c.rect(61, 282, 100, 13, fill=1, stroke=0)
c.setFillColor(HexColor('#F6F0E4')); c.roundRect(65, 169, 92, 87, 4, fill=1, stroke=0)
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',5.8); c.drawCentredString(111, 239, 'MITTI & MONSOON')
c.setFillColor(INK); c.setFont('Times-Roman',10); c.drawCentredString(111, 220, 'Heirloom')
c.drawCentredString(111, 207, 'Millets')
c.setStrokeColor(SAGE); c.line(85, 198, 137, 198)
c.setFillColor(MUTED); c.setFont('Helvetica',5.3); c.drawCentredString(111, 187, 'SINGLE ORIGIN  |  500 g')
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',7.2); c.drawString(184, 311, '01  /  KRAFT GRAIN POUCH')
y=text_lines('Unbleached kraft pouch with a compostable inner barrier, a seed-paper tag, and a clear origin panel for the farmer cooperative.',184,292,190,size=7.5,leading=10,color=MUTED)
c.setFillColor(SAGE); c.setFont('Helvetica-Bold',6.5); c.drawString(184,y-1,'Millets, grains, and stone-ground spices')
# bottle illustration
c.setFillColor(HexColor('#6D4A27')); c.setStrokeColor(HexColor('#53371E')); c.roundRect(437, 119, 83, 175, 22, fill=1, stroke=1)
c.setFillColor(HexColor('#6D4A27')); c.roundRect(456, 283, 44, 35, 5, fill=1, stroke=1)
c.setFillColor(HexColor('#B58B54')); c.roundRect(458, 311, 40, 13, 3, fill=1, stroke=1)
c.setFillColor(HexColor('#F3E8D2')); c.roundRect(447, 175, 63, 81, 4, fill=1, stroke=0)
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',5.2); c.drawCentredString(478, 239, 'MITTI & MONSOON')
c.setFillColor(INK); c.setFont('Times-Roman',8); c.drawCentredString(478, 220, 'Wood-Pressed')
c.drawCentredString(478, 208, 'Mustard Oil')
c.setStrokeColor(TERRA); c.line(462, 198, 494, 198)
c.setFillColor(MUTED); c.setFont('Helvetica',5); c.drawCentredString(478, 187, '500 ml  |  RAJASTHAN')
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',7.2); c.drawString(539, 311, '02  /  REFILLABLE AMBER GLASS')
y=text_lines('Reusable UV-shielding glass with a natural cork closure, cotton-paper label, batch stamp, and bottle-return credit.',539,292,203,size=7.5,leading=10,color=MUTED)
c.setFillColor(SAGE); c.setFont('Helvetica-Bold',6.5); c.drawString(539,y-1,'Cold-pressed oils and raw honey')
c.setFillColor(MUTED); c.setFont('Helvetica',6.1)
c.drawString(26, 40, 'Palette and type pairing reflect the current project. Packaging visuals are original vector concepts for this submission.')
next_page()

# Design note, one page
header('Design Note', '02  /  CREATIVE RATIONALE')
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',8); c.drawString(26, PAGE_H-54, 'CANDIDATE: CHANDNI  |  WEBSITE DESIGNER / CREATIVE')
# three cards
cards=[(26, 'WHO IT IS FOR', 'The site serves health-conscious Indian families who want dependable everyday staples; urban professionals and home cooks who care about provenance and visual quality; and gifting buyers looking for thoughtful, useful products. Each audience needs a simple path from product discovery to clear origin and purchase details.'),
(283, 'WHY THIS LOOK', 'A limestone background, forest olive accents, warm terracotta details, and generous spacing create a calm, tactile atmosphere. Cormorant Garamond gives headlines an editorial, crafted voice, while Plus Jakarta Sans keeps product facts, filters, and forms easy to scan. Photography and farmer stories bring the harvest close.'),
(540, 'THE BIG IDEA', 'Mitti & Monsoon pairs organic harvests with the vessels and rituals of an Indian home. Food and the objects that hold or serve it share the same soil, craft, and seasonal care. The seed-to-shelf story, batch details, farmer profiles, and tableware make the shop feel like a connected way of living rather than a generic grocery catalogue.')]
for x,title,body in cards:
    rounded(x, 231, 226, 265, white, LINE, 12)
    c.setFillColor(TERRA); c.setFont('Helvetica-Bold',7.5); c.drawString(x+16, 474, title)
    c.setFillColor(INK); c.setFont('Times-Roman',14); c.drawString(x+16, 451, {'WHO IT IS FOR':'Thoughtful everyday buyers','WHY THIS LOOK':'Quiet warmth, clear choices','THE BIG IDEA':'Harvest meets vessel'}[title])
    text_lines(body,x+16,425,194,size=8.2,leading=12,color=MUTED)
# credits panel
rounded(26, 66, 740, 137, HexColor('#F0EDE5'), LINE, 12)
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',8); c.drawString(44, 180, 'TOOLS & RESOURCE CREDITS')
c.setFillColor(INK); c.setFont('Helvetica-Bold',8); c.drawString(44, 158, 'Build tools')
c.setFillColor(MUTED); c.setFont('Helvetica',8); c.drawString(115, 158, 'React, TypeScript, Vite')
c.setFillColor(INK); c.setFont('Helvetica-Bold',8); c.drawString(44, 140, 'Fonts')
c.setFillColor(MUTED); c.drawString(115, 140, 'Cormorant Garamond and Plus Jakarta Sans via Google Fonts')
c.setFillColor(INK); c.setFont('Helvetica-Bold',8); c.drawString(44, 122, 'Photography')
text_lines('Images are bundled with the project. Their original creator/source and AI status are not recorded in the provided files; confirm and add the correct attribution before submitting.',115,122,622,size=7.7,leading=10,color=MUTED)
c.setFillColor(OLIVE); c.setFont('Helvetica-Bold',7.3); c.drawString(44, 87, 'Prototype interactions: product filtering, product detail, cart, search, seed-to-shelf story, newsletter, and bulk enquiry.')
next_page()

c.save()
print(OUT)
print('PDF pages:', page_num)
