# SG Border Live content expansion — 6 October 2026

## What went live in this batch

Ten distinct, indexable URLs: a Singapore VEP 2027 calculator, a 2027 Singapore holiday calendar, three rules guides, three route guides, and the rules/routes hubs. Each has its own search intent, direct answer, canonical metadata, internal links, review date and official sources. An old three-quarter-tank stub redirects to the reviewed guide.

## Demand and current performance

- GSC, 1 July–3 October 2026: 487 clicks, 21,447 impressions, 2.27% CTR, average position 16.0. The site is still small; these are measured Search Console values, not Ahrefs estimates.
- GSC, 1 September–3 October: `/cameras/woodlands` had 535 impressions and 3 clicks; `/calculator` had 591 impressions and 4 clicks. Improving those existing pages may outperform adding adjacent pages.
- Ahrefs matching terms for Singapore, checked 6 October: “woodlands checkpoint” ~35,000 searches/month (KD 7); “woodlands checkpoint camera” ~6,700 (KD 27); “woodlands checkpoint traffic” ~4,900 (KD 1). These are variants of one intent. Strengthen the existing Woodlands and camera pages instead of publishing separate pages for each phrase.
- Ahrefs: “jb sentral bus terminal” ~600 (KD 11); “jb sentral bus” ~200 (KD 2); “singapore to legoland malaysia” ~250 (KD 1). These support a distinct terminal/route cluster.
- Earlier Ahrefs check: “singapore vep changes 2027” ~400 searches/month. Search volumes and KD are estimates, not a traffic forecast.

## Next editorial queue

Priority is based on clear traveller intent, available official/operator sources, and whether the page can provide an answer the current site does not already give. Recheck operator schedules, prices, and rules at publication.

| Priority | Page or tool | Original utility required | Primary verification |
| --- | --- | --- | --- |
| 1 | JB Sentral bus terminal guide | Arrival/departure orientation, where cross-border services connect, transfer decision tree | Terminal/operator and local authority pages |
| 1 | Woodlands MRT to checkpoint | Exact public bus/walking options, boarding points and accessibility | LTA/SBS/SMRT routes and maps |
| 1 | Kranji MRT to JB Sentral | CW1 vs 170X comparison, immigration transfer steps | Causeway Link and SBS Transit |
| 1 | Singapore to JB by bus comparison | Departure-point selector using maintained route records, not copied route cards | Operators' current schedules |
| 1 | Malaysia VEP registration troubleshooting | Real error states, status checks and official escalation paths | JPJ VEP portal and FAQ |
| 1 | Singapore Autopass and VEP entry checklist | Separate requirements for MY-registered cars and motorcycles | LTA OneMotoring |
| 2 | Returning from JB declaration checklist | Interactive purchase categories and eligibility checks, with clear limitations | Singapore Customs |
| 2 | Woodlands to JB Sentral by train | Where to board, ticket/immigration sequence, official booking link | KTM and ICA |
| 2 | Singapore to KSL City | Best checkpoint plus bus/transfer choices | Current operators and destination |
| 2 | Singapore to Mid Valley Southkey | Best checkpoint plus bus/transfer choices | Current operators and destination |
| 2 | Singapore to Desaru | Car and public transport options, with whole-trip tradeoffs | Current operators and destination |
| 2 | JB to Singapore by bus | Boarding locations, route selection and last-service caveat | Current bus operators |
| 2 | Tuas Second Link bus options | Active routes, boarding points and transfer steps | Causeway Link/operator |
| 2 | Malaysia VEP vs Singapore VEP | Direction and vehicle-registration decision tool | JPJ and LTA |
| 2 | Malaysia tolls and Touch 'n Go | Real toll inputs and payment methods, no stale fixed total | Malaysian highway/Touch 'n Go sources |
| 3 | Currency converter | Live, timestamped rate with provider spread and explicit fees | Licensed rate feed and money changers |
| 3 | Fuel-cost calculator | Updated MY RON97 and SG pump prices with price timestamps | Official energy/pump sources |
| 3 | RTS vs KTM vs bus vs car | Cost/time comparison with source freshness for each option | LTA/RTS, KTM, bus operators |

## The data moat: hold until collection is restored

Historical queue and “best time” pages need original logged data. `traffic_snapshots` stopped on 31 July 2026 and the current Supabase connection does not expose this project's database. See `data-collection-runbook-2026-10.md`. Until collection and a validation window are restored, do not claim measured wait times, day-of-week patterns or holiday forecasts. The older weekday traffic guide URLs remain under review/noindex rather than showing fabricated predictions.

Once logging is reliable, publish a transparent methodology, sample counts and coverage for each checkpoint/direction. Then build **one** Woodlands history page and **one** Tuas history page with direction and day controls, followed by holiday comparison pages only where there are enough observed trips. Publishing hundreds of date or currency-amount variants before they provide different decisions would create thin pages and dilute the useful ones.

## Measurement after release

Inspect GSC page and query rows after recrawl: indexing, impressions, CTR and average position for the ten new URLs and their parent hubs. Compare the Woodlands and calculator pages with the 1 September–3 October baseline. Use that evidence to pick the next five pages and to rewrite titles/introductions where the query intent differs. Record source review dates when rules or schedules change.
