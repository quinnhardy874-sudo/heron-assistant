# Roofline Kit: Facebook Page Kit

Prepared 2026-09-27 for Quinn. Page ID `1247814308425163`. Plan on about 20 minutes to paste everything in, plus time to take photos.

> **Read this first.** None of the available tools can edit a Facebook Page (name, bio, cover, buttons, posts). Nothing below has been applied. Every change is one you make yourself in Meta Business Suite, using the click paths in Section 7.

---

## 0. What I could actually see

| Check | Result |
|---|---|
| Page exists and you can advertise with it | Yes. "Roofline Kit" (1247814308425163) is returned for your user and is linked to ad account **1285885543002142 ("Quinn Hardy")**. Heron Landscaping (1075457215640818) is linked to the same account. |
| Business portfolio | **None.** The ad account has no owning business (`business_id` is empty), so both Pages sit on a personal ad account. |
| Instagram linked | **No.** The ad account returns 0 Instagram accounts. |
| Lead-ads terms | Not accepted on either Page. This only matters if you run lead-form ads later. |
| Public Page content (bio, cover, posts, reviews, follower count) | **Could not view.** facebook.com and graph.facebook.com are blocked from this environment. Use the checklist in 1b. |
| Shopify store | "Roofline Kit" on the Basic plan. There is one product, `custom-roofline-light-kit`, which is ACTIVE with 4 variants at $2.99. |
| Shopify inventory | **All 4 variants show 0 inventory.** If "Track quantity" is on and "Continue selling when out of stock" is off, the product shows **Sold out** and ad clicks can't convert. Check this before anything else. [CONFIRM] |
| Store URL | You're still on `nkaczq-yy.myshopify.com`. A random myshopify subdomain is a big red flag for a cold visitor. |

## 1. Audit (blunt)

### 1a. Problems I can confirm
1. **The vendor name is split: "Heron Lighting" vs "Roofline Kit".** The product lists vendor "Heron Lighting", the Page is "Roofline Kit", and your pro business is "Heron Landscaping". A cold visitor sees three names. Choose one story and tell it everywhere: *"Roofline Kit is made by the Heron Lighting crew, the Towson, MD installers who hang pro roofline displays."* This is your strongest trust asset, so use it on purpose instead of leaving it as an accident.
2. **The store runs on a myshopify.com URL.** Buy a domain (e.g. `rooflinekit.com` [CONFIRM availability]) and connect it in Shopify. It costs about $15/yr and helps the ad click-through more than anything else here.
3. **The product may show "Sold out"** (0 inventory, see above). Since kits are made to order, set every variant to *not track quantity* or turn on *continue selling*.
4. **No Instagram is linked.** Meta ads will also run on Instagram. Without a linked IG account, those placements show only the Page name with no profile, and people who tap through find nothing.
5. **There's no business portfolio.** You need one for Commerce Manager (Facebook Shop/catalog), a clean pixel/dataset setup, and a verified domain. You're also mixing two companies on one personal ad account.

### 1b. What a brand-new Page usually lacks. Verify each on the live Page (tick as you go)
- [ ] Profile picture is a real logo, not blank or a personal photo. Use `profile.png`.
- [ ] Cover photo is set and readable on mobile. Use `cover.png`.
- [ ] Name is exactly "Roofline Kit" and the username is claimed (@rooflinekit).
- [ ] Bio/Intro explains what it is in one line, with price and location.
- [ ] Category isn't something generic like "Brand" or "Product/service".
- [ ] Website points to the product URL (not the myshopify root, and nothing is broken).
- [ ] Action button is **Shop now** (not "Send message", "Follow" or unset).
- [ ] **At least 6 to 9 posts exist**, with the newest under 7 days old. A Page with 0 to 2 posts reads as a scam to ad traffic.
- [ ] A pinned post explains how it works.
- [ ] Reviews/Recommendations are turned on.
- [ ] Messenger instant reply and FAQs are set. You're aiming for the "Very responsive to messages" badge.
- [ ] Contact info is filled in: email, and service area or city ("Towson, MD"). Don't list a street address unless you want pickups.
- [ ] The Page isn't following or liking random things, and Heron Landscaping is cross-linked. Mention it in About.
- [ ] Instagram is linked (Settings → Linked accounts).
- [ ] The Shop tab or Featured product exists after the catalog is connected.

### 1c. What strong lighting and DTC Pages do, and you don't yet
From looking at JellyFish Lighting (122k followers, video-heavy) and Govee (240k likes):
- The **hero is always video**: a house going from dark to lit in one cut. JellyFish's top posts are before/after installs.
- **Customer homes over product shots.** Their feed is roughly 70% "real house" content.
- **Proof is attached to a place and a person**: "Lit up this colonial in [town]", installer crews on the job, reviews in the comments.
- **Shop and CTA sit one tap away.** Govee sends every post to a product link. JellyFish drives to a quote form.
- **Replies are fast.** Both answer comment questions publicly, and that acts as an FAQ for later visitors.

---

## 2. Identity fields (paste-ready)

**Page name:** `Roofline Kit`
Leave out "Lights" and "LLC". It already matches the Shopify store name.

**Username / handle:** `@rooflinekit`
Fallbacks: `@rooflinekitlights`, `@getrooflinekit`. Claim the same handle on Instagram. [CONFIRM availability]

**Category (up to 3):** type into the box and pick the closest match that exists:
1. `Christmas Store` (if it's offered) or `Lighting Store` if that is
2. `Home Decor`
3. `E-commerce Website` / `Shopping & Retail`

**Bio.** In the current Pages experience the Bio field is capped at **101 characters**:
```
Pro C9 roofline lights, custom-cut to your house. You measure, we build, you clip up. From $2.99/ft.
```
(100 chars)

**Intro / short description (255 chars)**, for anywhere that allows 255 (Business Suite "Description", Shop description):
```
Commercial-grade C9 LED roofline lights, custom-cut to your house. Measure from the ground in ~10 min, we cut every run to length, pre-install bulbs + clips and label it. You clip it up and plug in. Reuse every year. Built in Towson, MD. $2.99/ft.
```
(247 chars.)

**About / full description** (Details → About, or the "Additional info" field):
```
Roofline Kit gives you the crisp, straight roofline you see on professionally lit houses, without paying an installer every year.

HOW IT WORKS
1) Measure: follow our ground-level guide (no ladder, about 10 minutes) and enter each run in our calculator.
2) We build it: we cut commercial-grade C9 LED stringer to your exact lengths, pre-install the bulbs, attach the clips, and label every run ("Front gable - left", etc.).
3) You hang it: clip it to your gutter or shingles, plug in, done. Take it down in January, coil it up, and it fits next year perfectly.

WHAT YOU GET
• Commercial-grade C9 LED (the same style pro installers use)
• Warm White, Cool White, Multicolor, or Red & Green: $2.99/ft
• Extension lead to reach your outlet: $0.60/ft
• Optional photocell timer, on at dusk: $24.99
• Every run labeled so setup is the same every year

WHO WE ARE
Roofline Kit is made by the Heron Lighting crew in Towson, MD. We install professional holiday lighting through Heron Landscaping, and we built Roofline Kit for people who want that look but would rather hang it themselves.

Order by November 15 to hang it Thanksgiving weekend.
Questions? Message us. A real person answers.
```

**Website:** `https://nkaczq-yy.myshopify.com/products/custom-roofline-light-kit`
Swap it for `https://rooflinekit.com/products/custom-roofline-light-kit` once the domain is connected. Add UTM tags if you want Page-sourced traffic separated in Shopify: `?utm_source=facebook&utm_medium=page&utm_campaign=page_button`.

**Action button:** **Shop now** → Website → the product URL above.
Don't use "Send message" as the main button. Cold traffic wants to see price and configure.

**Contact:** email `[CONFIRM: use a brand address like hello@rooflinekit.com, not a personal Gmail]`. City: Towson, MD. Mark it as service area or hide the street address. Leave hours blank, or set "Always open" if the only channel is online.

---

## 3. Messenger automations

### Instant reply (sent to everyone who messages first)
```
Hey! Thanks for reaching out to Roofline Kit 🎄 A real person (usually Quinn) will reply shortly, typically within a few hours. While you wait: most people start with our 10-minute measuring guide and price calculator here → [PRODUCT URL]. Reminder: order by Nov 15 to hang it Thanksgiving weekend.
```

### Away message (outside hours you set)
```
Thanks for messaging Roofline Kit! We're offline right now but will reply first thing tomorrow. Pricing + calculator: [PRODUCT URL]
```

### FAQ auto-responses
Messenger "Frequently asked questions" shows **up to 4** tap-to-ask questions. Put Q1 to Q4 there, and make Q5 a **Custom keyword** automation (keywords: `return`, `refund`, `warranty`, `broken`).

**Q1. How do I measure my roofline?**
```
Easy, no ladder needed. Stand in the yard and measure along the ground under each roof edge you want lit (use a tape measure or a measuring wheel), then add the rise for each sloped gable edge. Our guide walks you through it with pictures, and the calculator turns your numbers into a price: [PRODUCT URL]. Most houses take about 10 minutes. Stuck? Send us a photo of the front of your house and we'll help.
```
[CONFIRM the gable/slope method matches your on-site guide and calculator.]

**Q2. How long does shipping take?**
```
Every kit is cut and built to your measurements, then shipped. Build time is [CONFIRM: X business days] plus [CONFIRM: 3–5 days] shipping. Order by November 15 and you'll have it to hang Thanksgiving weekend.
```

**Q3. What if my measurement is off?**
```
Normal, and it's covered. We build each run with [CONFIRM: a small amount of extra length / an adjustable end], so being off by a few inches doesn't matter. If you're off by a lot, message us before we ship and we'll re-cut it. If it arrives and a run doesn't fit, send a photo and we'll make it right [CONFIRM: remake policy + who pays shipping].
```

**Q4. Can I reuse it every year? How do I store it?**
```
Yes, that's the whole point. Every run is labeled with where it goes. In January, unclip, coil each run loosely (bulbs stay on), and store them in the box or a bin. Next year you just match the labels and clip it back up, usually faster than the first year. Commercial-grade C9 LEDs are rated for [CONFIRM: hours/years]; replacement bulbs are [CONFIRM: available / included].
```

**Q5 (keyword: return / refund / warranty / broken). Warranty & returns**
```
Sorry about the trouble! Because kits are custom-cut, we can't take back a correctly built kit for a refund, but we do stand behind them: [CONFIRM: X-year/season warranty on bulbs and wiring; dead bulbs replaced free; DOA runs remade]. Send a photo of the issue and your order number and we'll sort it out quickly.
```
[CONFIRM that this matches the refund policy page in Shopify, Settings → Policies. It must say the same thing, or Meta ad review and customers will flag it.]

---

## 4. Pinned post

**Visual:** 15 to 30 s vertical video (4:5 or 9:16). 0 to 2 s: the house dark at dusk. Cut to the lights snapping on. Then quick shots: measuring from the lawn, the labeled box, clipping onto the gutter. End card: "Measure. We build it. You clip it up." If you don't have video, use a 4-image carousel: lit house / measuring / labeled runs / clip on gutter.

**Copy:**
```
Pro roofline lights. Hung by you. 🏠✨

Here's how Roofline Kit works:
1️⃣ Measure your roofline from the ground (about 10 min, no ladder)
2️⃣ We cut commercial-grade C9 LEDs to your exact lengths, bulbs and clips already on, every run labeled
3️⃣ You clip it up and plug in. Next year, match the labels and do it again.

💡 $2.99/ft (Warm White, Cool White, Multicolor, Red & Green)
🔌 Extension lead $0.60/ft · Dusk-on timer $24.99
📏 Example: a 60 ft front roofline in lights = $179.40

Made by the Heron Lighting crew in Towson, MD. We install pro holiday lighting for a living; this is the same look, DIY.

🗓️ Order by Nov 15 to hang it Thanksgiving weekend.
👉 Price your house: [PRODUCT URL]
```

---

## 5. Launch content plan: 9 posts, Mon 9/29 to Fri 10/17

Post 3 times a week (Mon/Wed/Fri, 6:30 to 8 pm ET when homeowners scroll). **Get Posts 1 to 4 live before any ad spend.** Rule: every photo is a *real* house or *real* product. No stock images and no AI "customer" photos. Don't invent reviews; FTC rules and Meta ad review both punish it.

| # | Date | Theme | Visual direction | Copy |
|---|---|---|---|---|
| 1 | Mon 9/29 | **Before/after hero** | Your own house (or a family member's), shot twice from the same tripod spot: dusk unlit, then lit. Post as a 2-image carousel or a 6 s video with a hard cut. Shoot it about 20 min after sunset (blue hour). | "Same house. Same night. One is 20 minutes of clipping. 🏠➡️✨ Custom-cut C9 roofline lights, built to your measurements. $2.99/ft → [URL]" |
| 2 | Wed 10/1 | **Meet the maker (trust)** | Quinn on a ladder at a Heron pro install, or in the shop cutting runs. Real face and real work. Vertical video, 20 to 40 s, talking to camera. | "I'm Quinn. My crew at Heron installs pro holiday lighting around Towson. Every year people ask 'can I just do this myself?' Now you can: we build it exactly like our pro installs, you hang it. Ask me anything below 👇" |
| 3 | Fri 10/3 | **How to measure (10 min)** | Screen-recorded walk-through of the calculator plus B-roll of the measuring wheel on the lawn. Text overlay steps. 30 to 45 s Reel. | "No ladder. No guessing. Here's how to measure your whole roofline from the yard in about 10 minutes 📏 Save this for later. Calculator → [URL]" |
| 4 | Mon 10/6 | **Pro portfolio (social proof)** | 5 to 8 photo carousel of *past Heron pro installs* (get the homeowners' OK). Caption each with the town. | "A few rooflines our crew has lit around Baltimore County 🎄 Roofline Kit uses the same commercial C9 style, cut the same way, so you get this look without the install bill." |
| 5 | Wed 10/8 | **Unboxing / what's in the box** | Top-down shot of the labeled runs coiled in the box, the clips, the timer. Close-up on a label ("FRONT GABLE – LEFT – 14 FT"). Photo carousel or 15 s video. | "What shows up at your door: every run cut to length, bulbs already in, clips already on, and a label telling you exactly where it goes. No spools. No tangles. No cutting." |
| 6 | Fri 10/10 | **Spool vs kit (comparison)** | Split image: a tangle of big-box spool lights and a sagging roofline on the left; your clean kit and a straight line on the right. Your own photos only. | "Skip the spool. Skip the installer. 🙅‍♂️ Big-box spools sag, gap and die by year two. Commercial C9 on a cut-to-fit stringer stays straight and comes back every year." |
| 7 | Mon 10/13 | **Install time-lapse** | Time-lapse of a real person (friend, neighbor, beta customer) hanging a kit, with a clock overlay. End on the lit result. | "Start to finish: [X] minutes on a ladder, [Y] feet of roofline. This is [name]'s first time hanging lights. 🙌" (use real numbers only) |
| 8 | Wed 10/15 | **Colors + timer** | 4-tile grid of the same house (or a model house) in Warm White / Cool White / Multicolor / Red & Green, plus a photo of the photocell timer. | "Which team are you? 1️⃣ Warm White 2️⃣ Cool White 3️⃣ Multicolor 4️⃣ Red & Green. Comment your number 👇 (Add the $24.99 dusk timer and never think about it again.)" |
| 9 | Fri 10/17 | **First customer / beta review + deadline** | A real customer photo of their house lit, with their permission. A screenshot of their text or review is fine if it's genuine. If there's no customer yet, use a neighbor beta tester and disclose it ("we gave our neighbor an early kit"). | "First kit in the wild! 🎉 [Name] in [town] measured on Saturday and hung it this week. '[genuine quote].' Reminder: order by Nov 15 to hang Thanksgiving weekend → [URL]" |

**How to get real social proof this week:**
- Give 3 to 5 friends, family or neighbors a kit at cost in exchange for honest photos and a Page recommendation. Say "received a discounted kit" in their post or recommendation.
- Ask 5 past Heron Landscaping lighting clients whether you can post photos of their install (Post 4).
- Reply to every comment within an hour during the first two weeks of ads. Public answers work as FAQs for later visitors.

---

## 6. Trust checklist (before ads go live)

- [ ] **Reviews / Recommendations turned ON**, with at least 3 genuine recommendations (beta users). Never swap reviews or write them yourself.
- [ ] **Shopify → Meta catalog connected.** Install the **Facebook & Instagram** sales channel (by Meta) in Shopify. Connect the Roofline Kit Page, a **new business portfolio**, the ad account and the pixel/dataset. This creates the catalog and Shop tab. A made-to-order product needs inventory set so it doesn't show sold out.
- [ ] **Instagram linked.** Create @rooflinekit (Professional/Business account), use the same profile.png and a matching bio, and link it to the Page.
- [ ] **Branding matches the Shopify site.** The same logo (profile.png) goes in the Shopify header and favicon, and the same hero shot and headline ("Pro roofline lights. Hung by you."). Change the Shopify vendor to "Roofline Kit" or keep "Heron Lighting" but say "by Heron Lighting" in both places.
- [ ] **Custom domain** connected in Shopify and **verified in Meta** (Business settings → Brand safety → Domains).
- [ ] **Policies pages exist** in Shopify: Refund, Shipping, Contact, Privacy. They should match the Messenger answers.
- [ ] **Response-time badge.** Answer 90%+ of messages within 15 min over 7 days (Meta's threshold [CONFIRM current threshold]). Instant reply is on, and the Business Suite mobile app has notifications turned on.
- [ ] **Cross-link Heron Landscaping.** Mention it in the About text, and have Heron share Post 2 or Post 4.
- [ ] **Page recently active.** The newest post is under 7 days old whenever ads are running.
- [ ] **Ad comments moderated.** Hide spam and answer questions publicly. Ad comments show on the Page's ad posts too.

---

## 7. Click-by-click: applying each change

Meta renames menus often. If a path doesn't match, use the **search box at the top of Page Settings** and search the setting's name. These paths are for the current ("new Pages experience") layout as of fall 2026.

**First, switch into the Page:** facebook.com → your profile photo (top right) → **See all profiles** → **Roofline Kit**. Or go to business.facebook.com (Meta Business Suite) and pick Roofline Kit in the top-left account switcher.

### 7.1 Profile picture and cover
1. On the Page, click the **camera icon** on the profile picture → **Upload photo** → `profile.png` → drag to center → **Save**.
2. Click **Edit cover photo** (bottom right of the cover) → **Upload photo** → `cover.png` → keep it centered (don't drag) → **Save changes**.
3. Check on your phone: the wordmark, the tagline and the whole orange pill should all be visible.

### 7.2 Name, username, category, bio, contact
1. On the Page → **Edit** (under the cover) or **Settings & privacy → Settings → Page setup / Page info**.
2. **Name:** this goes through Settings → *Page setup* → **Name** → Edit → "Roofline Kit" → Review → Request change. Skip it if it's already exact.
3. **Username:** Settings → *Page setup* → **Username** → `rooflinekit` → Save.
4. **Bio:** Edit details → **Intro/Bio** → paste the 101-char bio → Save.
5. **Categories:** Edit details → **Categories** → type and add up to 3 (Section 2) → Save.
6. **Contact:** Edit details → **Contact info** → Website (product URL), Email → Save. **Location** → City: Towson, MD. Turn off "Show address" / use service area.
7. **About / description:** Meta Business Suite → **Settings → Business assets → Pages → Roofline Kit**, or the Page's **About → Edit → Details → Additional info / Description**. Paste the full About text.

### 7.3 Action button → Shop now
1. On the Page, click the current action button, or **"+ Add action button"** (below the cover, next to Message).
2. Choose **Shop now** (under "Shop with you") → **Website** → paste the product URL (with UTMs if you want) → **Save**.
3. Test it: log out, or use a friend's phone, and tap the button.

### 7.4 Messenger instant reply, away message, FAQs, keyword
1. business.facebook.com → **Inbox** (left rail) → **Automations** (lightning-bolt icon, top right of the Inbox).
2. **Instant reply** → toggle on → Messenger → paste the text → Save.
3. **Away message** → toggle on → set a schedule (e.g. 10 pm to 7 am) → paste → Save.
4. **Frequently asked questions** → toggle on → Messenger → **+ Add question** ×4 (Q1 to Q4) with their answers → Save.
5. **+ Create automation → Custom keywords** → keywords `return, refund, warranty, broken, damaged` → paste the Q5 answer → Save.
6. Test it: message the Page from a personal account.

### 7.5 Pin the explainer post
1. Create the post (Section 4) from the Page (**Create post** → attach video/carousel → add a link in the text) → Publish.
2. On the published post → **⋯** → **Pin post** (older layouts call it "Feature" or "Pin to top of Page").

### 7.6 Schedule the 9 launch posts
Meta Business Suite → **Planner** (or **Content → + Create post**) → select the Facebook Page (and Instagram once linked) → add media and copy → **Schedule** → pick the date and time from the table → Schedule. Repeat for each post.

### 7.7 Turn on reviews / recommendations
Page → **Settings & privacy → Settings → Privacy → Page and tagging** → "Allow others to view and leave reviews on your Page?" → **On**. If it isn't there, search "reviews" in the Settings search box. Afterwards, share your Page link with beta customers and ask them to tap **Reviews → "Do you recommend Roofline Kit? Yes"**.

### 7.8 Link Instagram
1. Create @rooflinekit in the Instagram app → Settings → **Account type and tools → Switch to professional account → Business**.
2. On Facebook, switched into the Page → **Settings & privacy → Settings → Linked accounts → Instagram → Connect account** → log in → Confirm.
3. In Meta Business Suite → Settings → **Instagram accounts**, confirm it shows and is assigned to ad account 1285885543002142.

### 7.9 Business portfolio + Shopify catalog / Shop tab
1. business.facebook.com → **Create a business portfolio** → name it "Roofline Kit" (or "Heron Lighting" to hold both brands) → your name and a business email.
2. Portfolio **Settings → Accounts → Pages → Add → Add a Page** → Roofline Kit (and Heron Landscaping). **Ad accounts → Add → Add an ad account** → 1285885543002142.
3. Shopify admin → **Settings → Apps and sales channels → Shopify App Store** → install **Facebook & Instagram** (by Meta) → **Start setup** → connect the Facebook account, the portfolio, the Roofline Kit Page, the ad account, the pixel/dataset (data sharing at "Maximum") and the Instagram account → accept terms → **Finish setup**.
4. Wait for catalog sync (Shopify → Facebook & Instagram → Overview). Then Meta **Commerce Manager** → your shop → check that the product is approved.
5. On the Page, the **Shop** tab appears automatically once the shop is approved. If it doesn't, check Commerce Manager → Settings → Business assets.
6. **Domain verification:** Portfolio **Settings → Brand safety and suitability → Domains → Add** → your custom domain → verify with the meta-tag method (Shopify: Online Store → Themes → Edit code → `theme.liquid` → paste the tag in `<head>`), or use the DNS TXT method at your registrar.

### 7.10 Shopify fixes (not Facebook, but they block conversions)
1. Products → Custom Roofline Light Kit → each variant → **Inventory** → uncheck *Track quantity* (or check *Continue selling when out of stock*) → Save.
2. Settings → **Domains → Connect existing / Buy new domain** → set it as primary.
3. Settings → **Policies** → fill in Refund, Shipping and Contact to match Section 3.

---

## 8. Visual assets

| File | Size | Notes |
|---|---|---|
| `/home/user/heron-assistant/marketing/page/cover.png` | 1640×856 (Meta's recommended upload) | Dusk colonial with a warm-white C9 roofline. "ROOFLINE KIT" wordmark, "Pro roofline lights. Hung by you.", and an amber pill: "CUSTOM-CUT C9 LED KITS • $2.99/FT • ORDER BY NOV 15 FOR THANKSGIVING WEEKEND". All key content sits in the central 1640×624 desktop band (y≈116–740) and the central ~1220 px width for mobile. The bottom-left, where the profile picture overlaps on desktop, is left empty. |
| `/home/user/heron-assistant/marketing/page/profile.png` | 720×720 | "RK" in cream on navy (#0F1B2D), under a roof-peak line with 5 glowing C9 bulbs. Tested cropped to a circle at 80 px and still readable. Reuse it as the Instagram avatar and the Shopify favicon. |

Both were rendered locally (vector-style illustration) so they're full resolution and the text is crisp.

**Photoreal alternates (Canva AI):** these were generated in your Canva account but couldn't be downloaded here, because Canva's download hosts are blocked from this environment:
- Dusk colonial with warm-white C9 roofline (2:1, no text): https://www.canva.com/M/MAHWXCE9ve0. Canva media ID `MAHWXCE9ve0`.
- "RK" roof-and-bulbs logo concept (1:1): https://www.canva.com/M/MAHWXLGd4fQ. Canva media ID `MAHWXLGd4fQ`.

To use the photoreal cover: open the link → **Use in a design** → Facebook Cover → add the same three text lines as `cover.png` → **Share → Download → PNG**. Once you've shot your own real dusk before/after (Post 1), use that as the cover instead. A real house beats any render for trust. Avoid presenting either AI image as a customer's home.

---

## Sources (competitor scan)
- [JellyFish Lighting on Facebook](https://www.facebook.com/JellyFishLighting/)
- [JellyFish Lighting site](https://www.jellyfishlighting.com/)
- [GOVEE on Facebook](https://www.facebook.com/GoveeOfficial/)
