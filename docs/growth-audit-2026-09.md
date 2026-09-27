# SG Border Live: product, SEO and data audit

**Reviewed:** 27 September 2026. **Scope:** live site, GitHub repository, Vercel deployment/configuration, public Supabase reads, Ahrefs estimates, and official transport/holiday sources. Ahrefs traffic and position figures are third-party estimates, not Google Search Console measurements.

## Executive diagnosis

The main issue is deployment. GitHub contains a Next.js application with route-specific metadata, but the public site still serves the older Vite shell. Vercel was set to “Other” with output directory `dist`; the two latest Next.js deployments built pages and then failed because `dist` did not exist. The public HTML returns one generic title/canonical for different URLs and a 200 status for a made-up route. The repository fix sets the Next.js framework and removes the Vite catch-all rewrite. A successful preview now returns route-specific metadata and proper 404s.

The second issue is data trust. The newest `traffic_snapshots` record readable via the site's Supabase public client was **31 July 2026**; `historical_averages` had **zero rows** on review. Previous frontend code filled missing road status and hourly history with demo records. Its JB→SG value was a multiplier of Singapore-bound road data, and the backend used 60 km/h when source speed bands were absent. These are not measurements of border waits. The revised UI shows recent Singapore road-approach status only, marks unavailable data, foregrounds camera images, and links to a [methodology page](/methodology). Restoring scheduled ingestion requires access to the Supabase project `tqtyvvmcvpbaemacuyjw`.

The third issue is content reliability. Many weekday, holiday and RTS articles asserted exact waits, peak hours, fares or opening days without observed history or current official confirmation. In this branch, the best-time, Malaysia VEP and MyICA guides are reviewed and indexable; unsupported guide/holiday forecasts remain reachable for old links but are `noindex` and display an under-review notice. Holiday calendar pages list verified dates. This is deliberate until evidence supports forecasts.

## Search baseline and opportunity

Ahrefs Singapore estimates on 27 September 2026: `sgborder.live` had **17 organic keywords, ~28 monthly organic visits, and no top-three rankings**. `causewaytraffic.sg` had **684 keywords, ~5,760 estimated monthly visits, and 73 top-three rankings**. The site had ~5 estimated monthly organic visits and 3 keywords in Malaysia. These are directional estimates; obtain GSC clicks, impressions, CTR and indexing reports before judging actual lift.

| Query (Singapore) | Ahrefs monthly volume | Site position | Action |
|---|---:|---:|---|
| woodlands checkpoint traffic today live camera | 4,200 | 22 | Make `/cameras/woodlands` the clearest camera-first answer, with visible timestamps, labels and image-source credit. |
| woodlands checkpoint traffic | 3,800 | 17 | Strengthen `/woodlands` with camera and road status, concise checkpoint instructions, and internal links. |
| jb custom queue live today | 1,200 | 18 | Explain the Malaysia-side visibility limit; add official advisories and user-verified data only when available. |
| traffic causeway | 500 | 11 | Correct production title/canonical and improve visible above-fold answer. |
| causeway camera | 7,000 | 19 | Improve camera hub navigation and image context. |
| causeway traffic | 9,300 | 27 | Win specific camera/checkpoint terms first; broad head term is more competitive. |

Additional Ahrefs volumes: `VEP Malaysia` ~9,200 (KD 0), `MDAC Malaysia` ~14,000 (KD 0), `KTM Shuttle Tebrau` ~2,600 (KD 1), `Malaysia petrol price` ~3,400 (KD 2). `SGD to MYR` ~310,000 (KD 12) is broad and dominated by dedicated finance tools; a crossing-specific converter needs a genuinely useful money-changer or trip-planning angle.

Ahrefs AI citation estimates: the site was cited seven times across six pages, with none in its ChatGPT or Google AI Overview sample; the comparator had 143 citations across 25 pages. This is a discovery proxy, not an AI ranking score or guaranteed traffic source.

## What this branch changes

- **Technical SEO:** Next.js Vercel configuration, unique server-rendered titles/descriptions/canonicals, missing-route 404s, one visible H1 per tested page, honest sitemap dates, and removal of duplicated hidden keyword blocks. Keep only schema that reflects visible, supported content. FAQPage and HowTo markup should not be sold as a rich-result shortcut; [Google substantially restricted those rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes).
- **Mobile crossing dashboard:** camera access is visible immediately; missing data has a plain explanation and next action. Road status cards distinguish Singapore approach speed from border waits and show sample age. The heatmap no longer fabricates minutes or rows when the history table is empty.
- **Bus UX:** fixed mislabelled stop codes (the old “Kranji” query used Bukit Panjang) using [SBS 170X](https://www.sbstransit.com.sg/Service/BusService?ServiceNo=170x&ServiceType=Basic), [SBS 160](https://www.sbstransit.com.sg/Service/BusService?ServiceNo=160&ServiceType=Basic) and [SMRT/SimplyGo 950](https://svc.simplygo.com.sg/eservice/eguide/service_route.php?service=950) route information. The live widget filters to public cross-border services and discloses that Causeway Link is not in the public-arrivals feed. Bus route pages no longer invent fares, journey times or irrelevant live stops.
- **Decision tools:** a responsive Singapore vehicle trip-cost planner distinguishes [LTA exit/reentry tolls](https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/entering_and_exiting_singapore/vehicles-registered-in-singapore.html) from [Malaysia's RM20 private-car Road Charge](https://www.jpj.gov.my/en/rc-vep-faq/). The [Malaysia VEP guide](https://www.jpj.gov.my/en/rc-vep-faq/) now separates JPJ RFID registration from Singapore's VEP fee on Malaysia-registered cars. The [MyICA guide](https://www.ica.gov.sg/enter-transit-depart/at-our-checkpoints/use-of-qr-code-for-immigration-clearance-at-woodlands-and-tuas-checkpoints) says travellers still need a physical passport.
- **Time-sensitive content:** the RTS page uses the [Singapore transport ministry's December 2026 passenger-service target](https://www.mot.gov.sg/news-resources/newsroom/singapore-and-malaysia-commemorate-the-unveiling-of-the--first-johor-bahru---singapore-rts-link-train/) and marks fare, exact opening day and timetable as unannounced. The old nonfunctional Telegram join button is replaced by a development-status page. Singapore and Johor holiday dates now follow the [MOM](https://www.mom.gov.sg/employment-practices/public-holidays) and [Johor state calendar](https://www.johor.gov.my/rakyat/cuti-umum-2).

## Recommended product moat

**Build a measured crossing history, with provenance.** Save each source reading with checkpoint, road/camera ID, source timestamp, ingestion timestamp, direction, raw value, source version and quality flag. Never derive JB→SG status from a SG→JB speed band. Track data gaps explicitly. Archive camera metadata and hashes where source terms allow; do not assume camera images alone produce queue minutes.

**Publish patterns only after coverage and validation.** Aim for at least 6–8 continuous weeks with coverage by checkpoint, direction and hour, plus several holiday samples. Compute distributions and sample counts, then show “typical road approach conditions” with confidence and date range. To publish end-to-end wait estimates, acquire observed clearance/travel times with consent or an authoritative source, validate against real trips, and report error by direction, checkpoint, day type and peak period. If the error is high, present ranges or camera-first advice rather than a verdict.

**Make the dashboard useful on a 30-second visit.** Above the fold: SG→JB / JB→SG selector with source-appropriate content, Woodlands/Tuas cards, recent camera images, feed age, incident/advisory link, and “last checked.” Each state needs an empty/unavailable display. Save a favourite direction/checkpoint locally. Add alerts only after ingestion and quality monitoring are reliable. Avoid promising WhatsApp/Telegram channels before they are functional.

**Own a small crossing-focused content graph.** Start with Woodlands camera, Tuas camera, best time methodology, VEP, MyICA/MDAC, SG Arrival Card, and public bus routes. Then add KTM Shuttle Tebrau and a verified toll/road-charge guide. Each page should answer a distinct trip decision, cite the agency/operator, show review date, and link to the live tool. A currency converter or petrol calculator should include rate/price timestamps and realistic route cost assumptions. Avoid 300–800 interchangeable currency amount or destination pages; [Google treats scaled low-value pages as spam](https://developers.google.com/search/docs/essentials/spam-policies).

## 30 / 60 / 90 day sequence

| Window | Ship | Gate/measure |
|---|---|---|
| Days 1–30 | Promote the validated Next build; restore collection; verify DataMall credentials and scheduled runs; connect GSC; submit sitemap; inspect top camera pages and Core Web Vitals on mobile. | Production HTML returns unique title/canonical/H1, correct 404, fresh real samples, no fake fallback. GSC baseline for pages/queries. |
| Days 31–60 | Publish measured road-pattern page once coverage qualifies; refresh VEP/MyICA and create KTM guide with operator-source links; add incident/advisory module; improve camera speed and alt/context. | Coverage and sample counts visible; GSC impressions/CTR and ranking movement for camera/VEP terms; camera load time. |
| Days 61–90 | Pilot a validated leave-now recommendation and one alert channel; publish crossing cost/fuel utility only with timestamped data; pitch a sourced dataset story. | Holdout trip accuracy by checkpoint/direction, repeat visitor rate, opt-in retention, and GSC clicks. |

Do not assume the earlier projected 60–150K pageviews or RPM as a forecast. Build a GSC and analytics baseline, then model scenarios from observed click-through and repeat use.

## AIO and authority

AI answer surfaces need extractable facts with attribution: short answer, definition of the measured signal, timestamp, coverage, source link and limitations beside each chart. Publish methodology, update logs, and original aggregated data only after collection resumes. Use clear page titles and crawlable HTML; [Google's JavaScript SEO guide](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) supports server-rendered discoverability. Entity/Article/Breadcrumb structured data is useful when it accurately matches the visible page. FAQPage/HowTo markup alone is not a distribution strategy. Track actual referred traffic and cited pages, not just third-party citation counts.

## Backlinks: correct the pasted audit's recommendation

Ahrefs' top referring-domain sample was dominated by obvious link-farm domains (70 of the top 100 were flagged, with no estimated organic traffic). Stop any paid/automated placements if active. **Do not immediately disavow the whole set solely because they look spammy.** [Google recommends disavow only when there is a considerable number of spammy/artificial links *and* a manual action or a likely manual action](https://support.google.com/webmasters/answer/2648487). Check GSC Manual Actions and link history first. Do not attribute the current ranking gap “almost entirely” to the title bug or backlinks; deployment, content accuracy, crawling, competition and demand all need measurement.

## Access and release checklist

- Vercel project is connected to `nicholsmindset/sgborder`. The branch-level `vercel.json` framework fix produced a working protected preview. Production still serves the old Vite deployment until a reviewed Next deployment is promoted.
- Required Next public Supabase environment names have been mapped in Vercel. They contain the existing publishable values; no service role key belongs in a browser build. Verify after the next deployment.
- The Supabase project used by this site is not visible in the current connected account. Grant access to `tqtyvvmcvpbaemacuyjw` to inspect scheduler/logs, deploy the corrected Edge Function, and backfill the history table. The client correctly shows unavailable data until then.
- Obtain access to the site's Google Search Console property to inspect coverage, manual actions, actual queries, canonical choices and sitemap submission. Ahrefs cannot answer those questions.
