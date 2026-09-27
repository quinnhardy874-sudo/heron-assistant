# Roofline Kit: Meta Ads Build

Built 2026-09-27. Everything below is **paused or unpublished**. Nothing is spending.

## What exists in the ad account (1285885543002142)

**Campaign:** `Roofline Kit - Sales - Purchases - Oct 2026` (id `120254742528720712`)
- Objective: Sales. Budget: $30/day at the campaign level, lowest-cost bidding. Status: PAUSED.
- It has **no ad set yet.** A Sales ad set needs a Meta Pixel, and none is connected (see Blocker).

**Creatives**, all on the Roofline Kit Page with a Shop Now button to `/products/custom-roofline-light-kit`:

| ID | Name | Image | Angle (from competitor research) |
|---|---|---|---|
| `1090473900403938` | D – Real C9 not dots | Dusk colonial, 9:16 | Against Govee's permanent track lights: classic bulbs, nothing drilled in |
| `1794925334857609` | E – Pay once not every December | Spool vs kit, 1:1 | Against installers: $5–10/ft every year vs $2.99/ft once |
| `1135999502700670` | F – Every run labeled | Label close-up, 4:5 | The labelling claim no competitor makes |
| `2324693694947979` | G3 – Hand-built, limited batches | Dusk colonial, 9:16 | Urgency from real capacity limits, with no invented date |

All four images are **AI-generated.** Meta can show an "AI info" label in some regions (CA, NY, the EU). The disclosure setting is the advertiser's call, so it was left unset. Replace them with real photos of your own kits as soon as you have any.

## Don't reuse these old images
- **"RK - Ad A - Hung by you"** (hash `10fbdd15…`): the footer reads "Roofline Kitrooflinekit.com". The text overlaps, and it advertises a domain you don't own.
- **"RK - Ad B - How it works (story)"** (hash `2180e856…`): garbled text ("BEAUTREI WIHITE C9") and no lights on the house.
- Both sit inside the old paused Traffic campaign `120254709582440712`. Leave that campaign off, or delete it.

## Blocker: the Meta Pixel
`ads_get_datasets` returns nothing. To fix it, install the **Facebook & Instagram** app in Shopify (https://apps.shopify.com/facebook). Connect the Roofline Kit Page and the Quinn Hardy ad account, and set data sharing to **Maximum**. Then place a test order and refund it.

## Once the pixel exists (about 2 minutes of work)
1. Create an ad set under the campaign above:
   - Optimization: OFFSITE_CONVERSIONS
   - Promoted object: `{"pixel_id":"<id>","custom_event_type":"PURCHASE"}`
   - Targeting: US broad with Advantage+ audience, Advantage+ placements
2. Create 4 ads from creatives D, E, F and G3.
3. Turn on the campaign, the ad set and the ads. **You have to do this step yourself.** This session's safety settings block me from switching paid ads on.

If you get fewer than about 10 purchases in the first week, Meta doesn't have enough data to optimize for purchases. In that case, duplicate the ad set and optimize for **Add to Cart** until purchases pick up, then switch back.

## Kill and scale rules
- **Breakeven CPA** = average order value − (lights + clips + labor + shipping + Shopify fees) per order. Work this out before launch.
- **Kill an ad** that has spent 2× breakeven with no purchase.
- **Scale up** by adding at most 20% to the budget every 3 days, and only while cost per purchase stays under breakeven. Your weekly build capacity caps this. Never sell more kits than you can build.
- **Don't touch anything for the first 3 days.** Every edit resets Meta's learning phase.

## Next creative to make (free, and the best one)
A 20–30 second phone video: your hands pull a labelled run out of the box, clip it onto a real gutter, then cut to the same house lit at night. Shoot it vertical (9:16). Real footage beats all four AI images.
