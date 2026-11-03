# Status — 2026-10-11 (from the 4-agent audit)

## What's live
- **Ads:** 6 test ads, $2/day each (H1–H3 Heron calls, R1–R3 Roofline Kit traffic). $34.07 spent Oct 8–11. Details: `ads/round2/README.md`. Recap Oct 13.
- **Facebook posts:** daily at 10:55 AM ET. Odd days Roofline Kit (Christmas lights), even days Heron (landscaping/home services only). Bank: `social/post-bank.md`, log: `social/post-log.md`.
- **Store:** rooflinekit.com is already the primary domain (bought). Kit live, $2.99/ft, shipping $14.95 / free over $399.

## Results so far
- Heron: 2 calls for $17.10 (~$8.55/call). H2 0 calls.
- Roofline Kit: 61 landing page views at ~$0.27 each, **0 add-to-carts from ad traffic**.

## Broken / needs Quinn
1. **Pixel not receiving store events.** Dataset 1025353737193227 last fired Sep 27. Shopify > Facebook & Instagram app > Data sharing: point it at that dataset (or share the pixel it uses with ad account 1285885543002142), set to Maximum, then do a test visit.
2. **Product page has no trust/info above the kit builder** (no title, price, shipping, warranty, who you are). Biggest reason ad visitors don't add to cart.
3. **Claims to confirm or remove:** "we check by satellite imagery" (product description, FAQ, builder placeholder) — contradicts Terms; "5% buffer included" is actually billed ("5% extra length built in" is accurate); RK-07 capacity, RK-08 specs.
4. **Photocell timer ($24.99) is pre-ticked** in the builder — default off or label "optional".
5. **Privacy policy + store address show 722 Dulaney Valley Rd, Towson** and quinnhardy874@gmail.com. If that's home, switch to a PO box / virtual address and a branded email.
6. **Vendor says "Heron Lighting", SKUs "HL-"** — set vendor to Roofline Kit.
7. **Roofline campaign has no Nov 15 stop date** set yet. Set at the recap.
8. **Heron can't be found locally:** no Google Business Profile, Nextdoor, Yelp. Create GBP (service-area, hide address) + Nextdoor Business Page.
9. **No Instagram/Pinterest** for Roofline Kit.
10. **Real photos** of a kit and of Heron jobs.
11. **Job-assistant web app (Vercel) can't work as built:** `public/index.html` calls the Claude API from the browser with no key; Google OAuth tokens are exposed to the browser (`api/auth-callback.js`, `api/add-event.js`). Needs a server-side rewrite before anyone uses it.

## Fixed 2026-10-11 (second pass)
- **Product description (live):** satellite claim → "We review your measurements before we cut"; "5% length buffer included" → "5% extra length built in (included in your footage total)". Vendor "Heron Lighting" → "Roofline Kit".
- **New unpublished theme "Roofline Kit (Oct 11 fixes)"** (copy of live theme) with: price/shipping/order-by line at the top of the kit builder; FAQ "What if I measure wrong?" without the satellite claim; timer unticked and labeled "Optional"; address placeholder no longer mentions satellite. **Quinn: preview, then Online Store → Themes → Publish.** (Live-theme edits and publishing are blocked for the assistant.)
- **Roofline Kit campaign:** Nov 15 11:59 PM ET stop date set. Meta auto-paused it on edit; re-activated within a minute.
- **Job assistant app:** Claude calls moved server-side, Google tokens in encrypted httpOnly cookie, output escaped. Needs env vars — see `docs/app-setup.md`.

## Still Quinn-only
- Pixel: Shopify → Facebook & Instagram app → Data sharing → dataset 1025353737193227, Maximum.
- Privacy policy contact line still shows 722 Dulaney Valley Rd (assistant lacks permission to edit legal pages). Settings → Policies → Privacy policy → Contact paragraph. Also Settings → Store details address if that's home.
- Google Business Profile, Nextdoor Business Page, Instagram, real photos, Vercel env vars.
