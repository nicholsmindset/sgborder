# SG Border Live measurement plan

Reviewed 10 October 2026. GA4 stream: G-CVM2KVL177. Analytics remains opt-in and is restricted to sgborder.live and www.sgborder.live; localhost and preview deployments cannot load GA through the consent component. Google Signals and advertising personalisation signals are disabled for this analytics tag. The AdSense integration is separate and unchanged.

## Decisions and existing measurements

| Decision | Measurement | Verification needed |
| --- | --- | --- |
| Which entry pages deserve maintenance? | GA4 landing pages and engaged sessions, segmented by source/medium | Inspect the real property, retention and internal-traffic filters |
| Do guides help visitors reach official sources? | GA4 enhanced-measurement `click` with outbound=true, if enabled | Verify stream setting and real click payload; do not infer configuration from source code |
| Do visitors use tools after reading guides? | Page paths/session journeys through /calculator and /calculator/singapore-vep-2027 | Verify SPA history pageviews are enabled and not duplicated |
| Which organic queries need better answers? | Search Console page/query clicks, impressions and CTR | Compare equivalent date ranges and device/country segments |
| Are AI sources sending engaged visits? | Referral source/medium from identifiable AI domains | Referral traffic is not total citations or a citation-share metric |

No custom events, key events, conversion values or synthetic production traffic were introduced. No GA4 admin configuration was inspected or changed. Do not add manual SPA pageviews until enhanced-measurement history settings are inspected; manual and automatic collection together can duplicate views. Restrict any future event parameters to a documented allowlist; never send passport details, registration numbers, email addresses or freeform enquiry text.

## Validation and reporting

- Local browser checks confirm an accepted analytics preference does not load GA on localhost. Consent changes in another tab disable Analytics and reload to the persisted preference.
- Before expanding measurement, inspect GA4 DebugView with a designated test stream or explicit developer-traffic exclusion; do not manufacture business conversions in production.
- Inspect full page_location/referrer payloads and configure GA data redaction as needed before adding any user-input URL parameters. The application currently has no account or enquiry form collecting those values.
- Current Google documentation identifies Search Console's Generative AI performance report and inclusion setting. Check availability and inclusion in the actual property; no report or account setting was inspected here.
- To establish cross-platform AI visibility, record a fixed prompt list, engine/date/location and repeated-run sample sizes. Baseline citation rates are unknown; no rank, traffic or citation uplift is claimed.

Official references: https://developers.google.com/analytics/devguides/collection/ga4/views ; https://developers.google.com/analytics/devguides/collection/ga4/reference/config ; https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
