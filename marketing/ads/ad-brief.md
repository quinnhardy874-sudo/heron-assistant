# Heron Holiday Lighting: local call ad (rebuilt 2026-10-08)

- **Campaign:** `Heron Holiday Lighting` (`120254179328010712`), Leads objective. Budget lowered from $10/day to **$5/day**. PAUSED.
- **Old ad set:** `Heron Holiday Bookings` (`120254179327990712`), now PAUSED.
  - It targeted the **entire US**, which is the wrong audience for a local install service.
  - Results: spent $47.78, 1,740 impressions, 3.28% CTR, 41 link clicks, no tracked leads.
  - Its copy used invented scarcity ("first 10 people", "spots fill fast"). Don't reuse it.
- **New ad set:** `Heron - Towson 15mi - Calls` (`120254934504440712`)
  - Optimizes for calls.
  - Targets people who live within 15 miles of Towson (39.4015, -76.6019). Age 25+ is a suggestion, not a hard limit.
  - Status: PAUSED.
- **New ad:** `Heron - Skip the ladder - Towson` (`120254934516040712`)
  - Has a Call Now button to 410-830-0843.
  - The image is the AI dusk-house scene, labeled "Example design". Replace it with a real Heron job as soon as there is one.
  - Status: PAUSED.

# Roofline Kit: Meta Ads Build

Built 2026-09-27. Everything below is **paused or unpublished**. Nothing is spending.

## What exists in the ad account (1285885543002142)

**Campaign:** `Roofline Kit - Sales - Purchases - Oct 2026` (id `120254742528720712`)
- Objective: Sales. Budget: $5/day at the campaign level (lowered from $30 on 2026-10-08), lowest-cost bidding. Status: PAUSED.
- **Ad set:** `RK - US Broad - Advantage+ - Purchase` (id `120254742769230712`). It optimizes for Purchase on pixel `1025353737193227`, which is owned by the heron.landscaping business and shared with this ad account. Targeting: US, Advantage+ audience (age 25+ is a suggestion, not a hard limit), Advantage+ placements. Status: PAUSED.
- **Ads (all PAUSED):** D `120254742799640712`, E `120254742800310712`, F `120254742801830712`, G `120254742802420712`, H "Christmas card look" `120254742819330712`, I "No cutting, no 300 bulbs" `120254742819510712`, J2 "We check your measurements" `120254758335930712` (replaced J, which had a measuring claim that did not match the product page).
- Seven ads at $30/day is a lot for one ad set. Meta will push spend to 2–3 of them and starve the rest, which is fine. After about 5 days, turn off any ad with a lot of impressions but no add-to-carts.
- To launch, turn on the campaign, then the ad set, then the ads, in Ads Manager.

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

## Pixel status
The pixel was installed through the Shopify Facebook & Instagram app on 2026-09-27 and is now shared with the ad account. It had not recorded any events yet at build time, because the Shopify sync was still running. Before launch, place a test order and refund it. Then confirm that Purchase shows up in Events Manager.

If you get fewer than about 10 purchases in the first week, Meta doesn't have enough data to optimize for purchases. In that case, duplicate the ad set and optimize for **Add to Cart** until purchases pick up, then switch back.

## Kill and scale rules
- **Breakeven CPA** = average order value − (lights + clips + labor + shipping + Shopify fees) per order. Work this out before launch.
- **Kill an ad** that has spent 2× breakeven with no purchase.
- **Scale up** by adding at most 20% to the budget every 3 days, and only while cost per purchase stays under breakeven. Your weekly build capacity caps this. Never sell more kits than you can build.
- **Don't touch anything for the first 3 days.** Every edit resets Meta's learning phase.

## Next creative to make (free, and the best one)
A 20–30 second phone video: your hands pull a labelled run out of the box, clip it onto a real gutter, then cut to the same house lit at night. Shoot it vertical (9:16). Real footage beats all four AI images.
