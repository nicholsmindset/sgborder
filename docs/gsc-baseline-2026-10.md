# Google Search Console baseline for SG Border Live

**Captured:** 6 October 2026 from `sc-domain:sgborder.live` using the OnnGroup Search Console connection. Search type: Web. These periods end **before** the 5–6 October site releases, so they cannot measure the release impact. Search Console query rows may omit anonymized searches; use the property total for aggregate clicks.

## Measured performance

| Period | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| 1 July–3 October 2026 | 487 | 21,447 | 2.27% | 16.0 |
| 1 September–3 October 2026 | 154 | 8,508 | 1.81% | 15.5 |

Over 1 July–3 October, mobile accounted for 415 clicks and 15,439 impressions; desktop for 66 clicks and 5,902 impressions. Singapore accounted for 375 clicks and Malaysia for 97. The remaining clicks were from other countries. These measured results are more useful for site decisions than Ahrefs' estimated traffic, which uses a different method and geography.

## Recent pages and search intent

For 1 September–3 October, the homepage had 113 clicks / 4,431 impressions; `/guides/woodlands-checkpoint-guide` had 14 / 1,230; `/woodlands` had 13 / 951; `/guides/tuas-checkpoint-guide` had 5 / 547; `/calculator` had 4 / 591; and `/cameras/woodlands` had 3 / 535. The former checkpoint guide URLs became under-review stubs in the October release. They now redirect permanently to the live, source-backed checkpoint pages, which include the operating hours and addresses published by [ICA](https://www.ica.gov.sg/about-us/our-checkpoints). Monitor whether Google transfers impressions and clicks to `/woodlands` and `/tuas` after recrawling.

Queries with recent clicks include “jb custom queue live today” (5 clicks, 329 impressions, average position 9.9), “causeway traffic” (2, 268, position 13.3), and “jb to sg cctv” (1, 68, position 8.8). These are intent clues, not evidence that the site measures a Malaysia-side queue. The direction pages must keep their camera coverage limits clear.

## Indexing and sitemap

The homepage, `/cameras/woodlands`, the former Woodlands guide and `/calculator` each returned “Submitted and indexed” in URL Inspection on 6 October. Their last crawl dates were before the new releases. The homepage and camera page Google canonicals matched their preferred `www` URLs. The old submitted sitemaps were stale or malformed, including `/sitemap.xml.` with a trailing dot. The live `/sitemap.xml` returned HTTP 200, is listed in `robots.txt`, and was submitted to the domain property on 6 October with zero immediate errors. Search Console processing and future indexing still need monitoring; an old sitemap showing zero indexed in its own report does not mean the site's pages are absent from Google.

## Follow-up measurement

Check Search Console after recrawl for the homepage, `/cameras/woodlands`, `/cameras/tuas`, `/woodlands`, `/tuas`, `/sg-to-jb`, and `/jb-to-sg`. Compare a full 28-day period after release with a matching 28-day period before release, by page and country. Track CTR and position with impressions and query intent; do not declare a ranking gain from a few days of delayed Search Console data.
