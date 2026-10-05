# Road-data restoration and historical moat

**Status: gated on access to the SG Border Live Supabase project and LTA collector credentials.** The public camera experience does not depend on this work.

## Evidence checked on 5 October 2026

- The production Supabase REST API's newest publicly readable `traffic_snapshots` rows were recorded on **31 July 2026**. The `historical_averages` table returned no rows. The frontend's 15-minute freshness rule therefore correctly hid the old road cards.
- Public `camera_feeds` rows were current during the check, but that table is an upsert of the latest frame, not an observation history. Timestamped cameras also load directly from data.gov.sg.
- The repository's `supabase/functions/lta-proxy/index.ts` is not a trustworthy deployed-source inventory. Its `traffic` handler groups all roads named BKE, Woodlands, AYE or Tuas without mapping travel direction, derives an assumed travel time, and inserts only `sg_to_jb`. The production table also contains old `jb_to_sg` rows, so the deployed writer differs from this repository or another writer exists.
- The available Supabase connector and CLI do not list this site's Supabase project. Vercel has public Supabase URL/key variables but no visible LTA key or service-role variable. Do not infer that changing Vercel alone restores the collector.

## Restore in the actual Supabase project

1. Inspect deployed Edge Functions, schedules, database triggers and logs in the project referenced by the site's public Supabase URL. Identify every writer of `traffic_snapshots`, `historical_averages` and `camera_feeds`. Confirm the LTA key is active without revealing it.
2. Check the last successful scheduled invocation and the first failed one around 31 July. Record the exact HTTP and insert failures, table constraints, RLS rules and project quota state. Do not invoke the old traffic action against production until the scoring method is repaired; it may publish unsupported status values.
3. Replace the old write path with raw, auditable observations. At each collection interval store source name, source timestamp when supplied, ingestion timestamp, HTTP result, road `LinkID`, road name, segment coordinates, `MinimumSpeed`, `MaximumSpeed`, camera ID and camera frame timestamp. Keep road and camera observations separate, deduplicate source frames, and record outages. Do not store publicly served camera image bytes without reviewing source terms.
4. Choose the actual BKE/AYE approach links from their coordinates and direction, then verify that selection on a map and against several known traffic events. Label derived output **Singapore road approach**, never border or immigration wait. The LTA speed-band API describes Singapore road speeds, and LTA says most other public expressway cameras were discontinued on 30 June 2026.
5. Monitor source freshness, successful inserts, duplicate rates and the share of expected five-minute intervals covered. Alert on a missed collection window and keep an outage record. Run a backfill only from archived real observations; do not fabricate historical rows.

## Publish criteria

- **Road status:** segment and direction mapping reviewed; writer succeeds reliably; latest accepted source sample is under 15 minutes old; unsupported directions remain unavailable. Only then set `NEXT_PUBLIC_ROAD_STATUS_VERIFIED=true` in Vercel and redeploy.
- **Hour-by-weekday chart:** at least six continuous weeks of real observations, with documented coverage and sample counts per hour and checkpoint. Show a road-speed distribution or road-status frequency, not a crossing-time heatmap. Omit hours with insufficient samples.
- **End-to-end wait or “leave now” verdict:** obtain an independent direction-specific measure that includes both border clearances, compare predictions with observed trips across weekdays and holidays, and publish error and coverage beside each estimate. LTA cameras or road bands alone are insufficient.

## Search measurement

The `sc-domain:sgborder.live` property is available through the OnnGroup Search Console connection. Its pre-release baseline and sitemap status are recorded in `gsc-baseline-2026-10.md`. Compare later page/query impressions, clicks, CTR, positions and indexing for the home, camera, checkpoint and direction pages. Ahrefs figures in `competitor-opportunity-2026-10.md` are competitor estimates and are not a release success metric.
