# SG Border Live vs CausewayTraffic.sg: opportunity review

**Reviewed:** 5 October 2026. **Scope:** live desktop and mobile pages, SG Border Live repository, Ahrefs Site Explorer and Keywords Explorer for Singapore, HTTP checks, and Google Search guidance. Ahrefs traffic and positions are third-party estimates, not measured clicks. Google Search Console for `sgborder.live` is absent from the connected account, so indexing, actual clicks, CTR, and manual actions remain unverified.

## Implementation prepared on 5 October

The October release branch now renders timestamped LTA frames in initial HTML for home, live, checkpoint, BKE/AYE and camera pages. Mobile direction selection, distinct SG→JB and JB→SG planning pages, the `/Cameras` redirect, source-checked MDAC/SGAC/KTM guides, a working social preview and a supported Next.js version are implemented. Retired expressway camera pages redirect to the current camera hub. Unsupported wait and heatmap claims have been removed from active pages. See `data-collection-runbook-2026-10.md` for the road-data gate and the Supabase access needed to complete it. The observations below describe the pre-release competitor comparison unless otherwise stated.

## What the competitor has achieved

Ahrefs estimated **5,710 monthly Singapore organic visits**, **640 ranking keywords**, and **87 top-three keywords** for `causewaytraffic.sg` on 4 October. The corresponding estimates for `sgborder.live` were **18 visits**, **18 keywords**, and **3 top-three keywords**. In Malaysia, the competitor had an estimated **189 visits and 34 keywords**, versus **3 visits and 2 keywords** for SG Border Live. Singapore supplies about 97% of the competitor's combined SG/MY estimate, so the immediate search opportunity is still Singapore-led. The competitor grew from an Ahrefs estimate of 921 Singapore visits in March to 7,775 in July, then declined to roughly 5,500–5,700 by early October. This is a strong comparator, but its current trend is below its July peak.

The competitor's homepage receives an estimated 2,581 of its 5,710 Singapore visits (about 45%). Five URLs account for about 72% of the estimate. It has a low Ahrefs Domain Rating of 1.9 and 15 referring domains in the returned sample. The ranking gap should therefore be investigated primarily through query intent, working live data, page quality, and age; this is an inference, not proof that links do not matter.

| Singapore query, Ahrefs organic keyword data | Monthly volume | Competitor rank | SG Border Live rank | First action |
|---|---:|---:|---:|---|
| woodlands checkpoint traffic today live camera | 4,200 | 4 | 22 | Improve `/cameras/woodlands` as the complete, timestamped camera answer. |
| causeway camera | 7,000 | 5 | 19 | Improve `/cameras` and its links to Woodlands/Tuas feeds. |
| woodlands camera | 1,200 | 4 | 13 | Strengthen camera labels, source, location and text context. |
| jb custom queue live today | 1,200 | 2 | 18 | Clarify exactly which queues are measured; add direction-specific answer when supported. |
| tuas checkpoint camera | 1,600 | 3 | outside top 100 in returned data | Improve `/cameras/tuas` and `/tuas`. |
| sg to jb traffic | 1,400 | 2 | outside top 100 in returned data | Publish a distinct outbound route page with current signals. |
| jb jam | 2,000 | 3 | outside top 100 in returned data | Earn this only with reliable direction-specific coverage. |

Ahrefs' keyword volumes are estimates and can differ between its Site Explorer and Keywords Explorer reports. Search result positions can change daily. Some Ahrefs ranking URLs are stale: `causewaytraffic.sg/Route` and our `/Cameras` both returned HTTP 404 during this review, although Ahrefs still attributed estimated visits to them. Treat page estimates as directional rather than a reconciled click report.

## Product and mobile comparison

On mobile, the competitor's first screen shows SG→JB / JB→SG, separate Woodlands and Tuas readings, the age of the measurement, a route suggestion, and the beginning of a camera feed. The tested SG→JB view showed Woodlands at 1h 4m and Tuas at 38m, both measured 15 minutes earlier. The competitor also provides a four-hour trend and an arrive-by departure planner. Its [methodology](https://causewaytraffic.sg/methodology/) describes route estimates, historical patterns, visual context, and missing-data states. These are its published claims; this audit did not independently validate the estimate accuracy.

SG Border Live's first mobile screen shows a large hero, the message “Current road data is unavailable,” and the start of a live camera image. The camera and public bus feeds did resolve. The historical section said data was still being collected. The hero label “Road feed checked every 5 min” can imply current measurements even while the card says they are unavailable. The “Both / Woodlands / Tuas” control filters checkpoints, whereas the competitor offers an explicit crossing-direction choice. The current collector only writes `sg_to_jb` records from Singapore road speed bands; it cannot substantiate a JB→SG queue reading.

The competitor's page is not flawless. Its camera view showed “No frame time” during this review, its homepage still featured an August 8–9 “This Weekend” guide in October, and a large display ad covered part of the desktop camera/trend area. SG Border Live can win trust through visible frame timestamps, current editorial dates, a cleaner mobile view, and precise wording about what each feed measures.

## Ordered build plan

### P0: restore the core utility

1. Trace the Supabase collector deployment, schedule, LTA key, insert errors, and `traffic_snapshots` freshness. The frontend deliberately rejects rows older than 15 minutes. Run a monitored collection job and record failures. Do not show sample queue minutes when data is missing.
2. Distinguish **Singapore road-approach speed** from **end-to-end checkpoint/immigration wait**. The current `lta-proxy` derives only Singapore approach conditions and writes only SG→JB rows. To offer JB→SG or queue-minute recommendations, obtain a valid direction-specific source and validate it against observed trips.
3. Shrink the mobile hero. Put direction (when supported), two checkpoint cards, source age, and a clear camera action ahead of secondary copy. In the unavailable state, make the cameras the primary module and use one compact status line. Change “checked every 5 min” to a label based on actual successful observation time.

### P1: capture searches already near reach

4. Make `/cameras/woodlands` and `/cameras/tuas` useful in the initial HTML: camera positions, what each view can show, latest available frame timestamp or a clear loading state, source credit, and direct links to the relevant checkpoint page. Do not claim the images show immigration queue minutes.
5. Give `/woodlands` and `/tuas` distinct planning jobs from the camera pages: direction and mode choice, road approach, buses, toll/road-charge context, official advisories, and concise FAQ answers. If the pages cannot provide distinct value, consolidate them instead of adding overlapping copies.
6. Add permanent redirects for proven legacy paths, starting with `/Cameras` → `/cameras`; it currently returns 404 while Ahrefs still detects a ranking. Review actual old-URL logs/GSC before adding other redirects.
7. Publish an outbound SG→JB route page and a return JB→SG page only when each can show direction-appropriate evidence. Until then, route pages can offer camera and official-advisory context without fabricated waits.

### P2: build the defensible history and adjacent content

8. Log source timestamp, ingestion timestamp, checkpoint, direction, road/camera ID, raw observation, quality flag, and outage periods. Once there are at least 6–8 continuous weeks of sufficiently covered samples, publish day/hour distributions with sample counts and a coverage note. Validate any predicted end-to-end wait against real trips before showing a leave-now verdict.
9. Add a reviewed Malaysia MDAC guide and KTM Shuttle Tebrau guide with official sources and explicit update dates. Ahrefs Keywords Explorer estimated about 14,000 Singapore searches/month for “mdac malaysia” and 2,600 for “ktm shuttle tebrau”; broad informational demand is real, but these should be accurate, crossing-specific tools or guides rather than generic rewrites.
10. Treat the competitor's arrive-by planner as proof of commuter demand for decision tools. A useful SG Border Live version would compare car, public bus and KTM for a chosen arrival time with timestamped source data and uncertainty. Do this after the collector and route coverage work.
11. For Malaysia expansion, target return-trip and camera intent before generic JB travel topics. Ahrefs shows the competitor ranking for “checkpoint camera” and “jb sg traffic” in Malaysia. If Malay or Chinese pages are added, give them their own crawlable URLs, translated substantive content and correct language annotations; a client-side language toggle alone is not a separate search landing page.

## SEO, AI answers and measurement

- Keep the sitemap and canonical URLs; both were present in the live source. Verify actual indexing and query/page CTR in the correct Google Search Console property, which is not connected here. Segment mobile versus desktop and Singapore versus Malaysia.
- Watch `/cameras/woodlands` (currently rank 22), `/cameras`/homepage for “causeway camera” (rank 19), and “woodlands camera” (rank 13) as the first 30-day query set. Record impressions, clicks, CTR, average position and engaged visits before and after each change. Ahrefs is useful for competitor discovery, not outcome measurement.
- Put short, sourced answers in crawlable text beside the live module: what is being measured, observation age, direction, coverage and limitations. Google says AI Overviews/AI Mode use ordinary Search eligibility and have no special schema requirement. Structured data should match visible content. FAQPage and HowTo markup are not a shortcut to rich results for this site. See [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) and [FAQ/HowTo changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes).
- Avoid scaling to hundreds of near-identical amount, destination or holiday pages before the underlying tools and data are useful. Prioritize a small group of strong pages that answer distinct crossing decisions.

## First release sequence

**Week 1:** collector diagnostics and fresh-data monitor; `/Cameras` redirect; mobile hero/empty-state wording. **Weeks 2–3:** Woodlands and Tuas camera page upgrades, distinct checkpoint page structure, GSC connection and baseline. **Weeks 4–8:** route-direction pages where evidence supports them, historical coverage dashboard, MDAC and KTM guides. Launch prediction or alerts only after observed accuracy and freshness have been measured.
