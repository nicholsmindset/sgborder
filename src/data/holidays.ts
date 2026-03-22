export interface Holiday {
  slug: string;
  name: string;
  date_start: string;
  date_end: string;
  severity: "normal" | "busy" | "heavy" | "extreme";
  country: "sg" | "my" | "both";
  description: string;
  peak_hours_woodlands: string;
  peak_hours_tuas: string;
  best_alternative_times: string[];
  avoidance_tips: string[];
  faqs: { question: string; answer: string }[];
}

export const SEVERITY_CONFIG: Record<
  Holiday["severity"],
  { label: string; bg: string; text: string; border: string }
> = {
  normal: {
    label: "Normal",
    bg: "bg-status-smooth-tint",
    text: "text-status-smooth",
    border: "border-status-smooth",
  },
  busy: {
    label: "Busy",
    bg: "bg-status-moderate-tint",
    text: "text-status-moderate",
    border: "border-status-moderate",
  },
  heavy: {
    label: "Heavy",
    bg: "bg-status-heavy-tint",
    text: "text-status-heavy",
    border: "border-status-heavy",
  },
  extreme: {
    label: "Extreme",
    bg: "bg-status-jammed-tint",
    text: "text-status-jammed",
    border: "border-status-jammed",
  },
};

export const HOLIDAYS_2026: Holiday[] = [
  {
    slug: "new-years-day-2026",
    name: "New Year's Day",
    date_start: "2026-01-01",
    date_end: "2026-01-01",
    severity: "heavy",
    country: "both",
    description:
      "New Year's Day causes heavy traffic at both checkpoints as Singaporeans return from JB celebrations and Malaysians head back after working in SG over the holiday period. Expect the worst congestion on New Year's Eve (31 Dec) and the evening of 1 Jan.",
    peak_hours_woodlands: "Eve: 2 PM – 11 PM into JB. 1 Jan: 4 PM – 11 PM returning to SG.",
    peak_hours_tuas: "Eve: 3 PM – 9 PM into JB. 1 Jan: 5 PM – 10 PM returning.",
    best_alternative_times: [
      "Cross into JB before 8 AM on 31 Dec",
      "Return to SG before 10 AM on 1 Jan",
      "Use Tuas if heading to western JB",
    ],
    avoidance_tips: [
      "Book accommodation in JB if celebrating NYE to avoid late-night queues",
      "Consider crossing on 2 Jan when traffic normalizes",
      "Check live cameras before departing — queues can change rapidly",
    ],
    faqs: [
      {
        question: "How long is the wait at Woodlands on New Year's Eve?",
        answer: "Expect 1.5–3 hours during peak (2 PM – 11 PM). The worst is typically 5 PM – 8 PM.",
      },
      {
        question: "Is Tuas faster than Woodlands on New Year's?",
        answer: "Usually yes, but only if your destination is in western JB. The detour adds 30+ min otherwise.",
      },
    ],
  },
  {
    slug: "chinese-new-year-2026",
    name: "Chinese New Year",
    date_start: "2026-02-17",
    date_end: "2026-02-18",
    severity: "extreme",
    country: "both",
    description:
      "Chinese New Year is THE most congested period at the causeway. Massive volumes of Malaysians working in Singapore return home, while Singaporeans head to JB for shopping and family visits. Both checkpoints experience extreme delays for 3–5 days around the holiday.",
    peak_hours_woodlands: "Eve (16 Feb): All day from 8 AM. CNY1-2: Heavy from 10 AM – 10 PM.",
    peak_hours_tuas: "Eve: 10 AM – 8 PM. CNY1-2: 11 AM – 9 PM.",
    best_alternative_times: [
      "Cross before 5 AM on any CNY day",
      "Wait until CNY Day 3 (19 Feb) when traffic eases",
      "Return to SG very early morning (before 6 AM) on CNY2",
    ],
    avoidance_tips: [
      "Avoid the causeway entirely on CNY Eve if possible — 3-5 hour waits are common",
      "Take the train (KTM Shuttle) if available — bypasses road queues",
      "Fill up fuel in SG before crossing — JB stations near checkpoint have long queues too",
      "Bring water and snacks for the car — you may be stuck for hours",
    ],
    faqs: [
      {
        question: "How bad is CNY traffic at the causeway?",
        answer: "Extreme. Wait times of 3–5 hours are common on CNY Eve and Day 1. Both Woodlands and Tuas are affected. It's the worst traffic event of the year.",
      },
      {
        question: "What's the best time to cross during CNY?",
        answer: "Before 5 AM or after 11 PM. Alternatively, wait until Day 3 when most people have already crossed.",
      },
    ],
  },
  {
    slug: "hari-raya-aidilfitri-2026",
    name: "Hari Raya Aidilfitri",
    date_start: "2026-03-20",
    date_end: "2026-03-21",
    severity: "extreme",
    country: "both",
    description:
      "Hari Raya Aidilfitri marks the end of Ramadan and triggers massive cross-border movement. Malaysian workers return home for balik kampung, creating extreme congestion at both checkpoints for 2–4 days before and after the holiday.",
    peak_hours_woodlands: "Eve: All day. Hari Raya Day 1-2: 8 AM – 10 PM continuous heavy flow.",
    peak_hours_tuas: "Eve: 10 AM onwards. Day 1-2: 9 AM – 9 PM.",
    best_alternative_times: [
      "Cross 3+ days before Hari Raya when the rush hasn't started",
      "Travel before 4 AM on any day during the period",
      "Return to SG 2 days after Hari Raya when traffic normalizes",
    ],
    avoidance_tips: [
      "This rivals CNY for worst traffic — plan ahead or avoid entirely",
      "Consider flying to KL instead of driving if going beyond JB",
      "Motorcycle riders have shorter waits — consider riding if possible",
      "Keep your passport and customs forms ready to speed up processing",
    ],
    faqs: [
      {
        question: "Is Hari Raya traffic worse than CNY?",
        answer: "They're comparable. Hari Raya affects more Malaysian workers returning home, while CNY sees more Singaporean leisure traffic. Both create 3-5 hour delays.",
      },
    ],
  },
  {
    slug: "good-friday-2026",
    name: "Good Friday",
    date_start: "2026-04-03",
    date_end: "2026-04-03",
    severity: "heavy",
    country: "sg",
    description:
      "Good Friday is a Singapore public holiday (not Malaysia). Many Singaporeans take the long weekend to visit JB, creating heavy outbound traffic on Thursday evening and Friday morning, with heavy return traffic on Sunday evening.",
    peak_hours_woodlands: "Thu eve: 5 PM – 10 PM. Fri: 8 AM – 2 PM. Sun return: 4 PM – 10 PM.",
    peak_hours_tuas: "Thu eve: 6 PM – 9 PM. Fri: 9 AM – 1 PM. Sun return: 5 PM – 9 PM.",
    best_alternative_times: [
      "Cross Friday before 7 AM",
      "Return Sunday before 2 PM or after 10 PM",
      "Travel Saturday when traffic is more moderate",
    ],
    avoidance_tips: [
      "Thursday evening outbound is the worst — leave before 4 PM or after 10 PM",
      "Sunday evening return is predictably heavy — budget 1.5-2 hours",
      "Tuas is usually faster during SG-only holidays",
    ],
    faqs: [],
  },
  {
    slug: "labour-day-2026",
    name: "Labour Day",
    date_start: "2026-05-01",
    date_end: "2026-05-01",
    severity: "busy",
    country: "both",
    description:
      "Labour Day is a public holiday in both Singapore and Malaysia. Traffic is busy but not extreme since it's a single-day holiday. Expect moderate delays, mainly in the morning outbound and evening return.",
    peak_hours_woodlands: "Morning: 7 AM – 11 AM outbound. Evening: 5 PM – 9 PM return.",
    peak_hours_tuas: "Morning: 8 AM – 11 AM. Evening: 5 PM – 8 PM.",
    best_alternative_times: [
      "Cross before 7 AM",
      "Return before 4 PM",
      "Midday (12 PM – 3 PM) is usually manageable",
    ],
    avoidance_tips: [
      "Single-day holiday — traffic is busy but manageable with planning",
      "If it falls on a Friday/Monday creating a long weekend, expect heavier traffic",
      "Check live dashboard before departing",
    ],
    faqs: [],
  },
  {
    slug: "vesak-day-2026",
    name: "Vesak Day",
    date_start: "2026-05-12",
    date_end: "2026-05-12",
    severity: "busy",
    country: "sg",
    description:
      "Vesak Day is a Singapore public holiday. Traffic is moderately busy as some Singaporeans head to JB for the day. Less impactful than major holidays.",
    peak_hours_woodlands: "Morning: 8 AM – 11 AM. Evening: 5 PM – 8 PM.",
    peak_hours_tuas: "Morning: 9 AM – 11 AM. Evening: 5 PM – 7 PM.",
    best_alternative_times: [
      "Early morning before 8 AM",
      "Return by 4 PM to avoid the evening rush",
    ],
    avoidance_tips: [
      "Moderate impact holiday — normal planning is sufficient",
      "Tuas is typically unaffected for this holiday",
    ],
    faqs: [],
  },
  {
    slug: "hari-raya-haji-2026",
    name: "Hari Raya Haji",
    date_start: "2026-06-07",
    date_end: "2026-06-07",
    severity: "heavy",
    country: "both",
    description:
      "Hari Raya Haji is observed in both Singapore and Malaysia. It triggers significant cross-border movement, particularly among Muslim commuters. Congestion is heavy but typically one level below Hari Raya Aidilfitri.",
    peak_hours_woodlands: "Eve: 3 PM – 9 PM. Day: 8 AM – 8 PM.",
    peak_hours_tuas: "Eve: 4 PM – 8 PM. Day: 9 AM – 7 PM.",
    best_alternative_times: [
      "Cross before 6 AM on the holiday",
      "Return after 9 PM",
      "Travel the day after when traffic normalizes quickly",
    ],
    avoidance_tips: [
      "Less extreme than Hari Raya Aidilfitri but still plan 1-2 hour buffer",
      "Evening before is the worst — avoid 5 PM – 8 PM outbound",
    ],
    faqs: [],
  },
  {
    slug: "national-day-2026",
    name: "National Day",
    date_start: "2026-08-09",
    date_end: "2026-08-09",
    severity: "heavy",
    country: "sg",
    description:
      "Singapore National Day sees heavy outbound traffic as many Singaporeans head to JB during the long weekend. If it falls near a weekend, expect extended congestion. The NDP rehearsals in preceding weeks also cause minor disruptions.",
    peak_hours_woodlands: "Eve: 4 PM – 10 PM. Day: 8 AM – 2 PM outbound. Evening: 6 PM – 10 PM return.",
    peak_hours_tuas: "Eve: 5 PM – 9 PM. Day: 9 AM – 1 PM.",
    best_alternative_times: [
      "Cross before 7 AM on National Day",
      "Use Tuas for less congestion",
      "Return Monday morning if it's a long weekend",
    ],
    avoidance_tips: [
      "NDP itself keeps many Singaporeans at home — traffic is often lighter than expected on 9 Aug itself",
      "The days around it (if long weekend) are worse than the actual day",
    ],
    faqs: [],
  },
  {
    slug: "malaysia-day-2026",
    name: "Malaysia Day",
    date_start: "2026-09-16",
    date_end: "2026-09-16",
    severity: "busy",
    country: "my",
    description:
      "Malaysia Day is a Malaysian public holiday. Some Malaysian workers in SG may take leave to enjoy a long weekend. Impact on causeway traffic is moderate.",
    peak_hours_woodlands: "Eve: 5 PM – 8 PM. Day: Light traffic.",
    peak_hours_tuas: "Eve: 5 PM – 7 PM. Day: Light traffic.",
    best_alternative_times: [
      "Traffic is usually manageable — normal precautions apply",
    ],
    avoidance_tips: [
      "Primarily affects Friday evening if it creates a long weekend",
      "JB may be busier than usual with local celebrations",
    ],
    faqs: [],
  },
  {
    slug: "deepavali-2026",
    name: "Deepavali",
    date_start: "2026-10-20",
    date_end: "2026-10-20",
    severity: "busy",
    country: "sg",
    description:
      "Deepavali is a Singapore public holiday. Traffic impact is moderate — similar to Vesak Day. Some Singaporeans head to JB for shopping during the day off.",
    peak_hours_woodlands: "Morning: 8 AM – 11 AM. Evening: 5 PM – 8 PM.",
    peak_hours_tuas: "Morning: 9 AM – 11 AM. Evening: 5 PM – 7 PM.",
    best_alternative_times: [
      "Cross before 8 AM or during lunch hours",
      "Return before 4 PM",
    ],
    avoidance_tips: [
      "Low-to-moderate impact — basic planning is sufficient",
      "Little Indi celebrations in SG may affect traffic near Serangoon but not causeway",
    ],
    faqs: [],
  },
  {
    slug: "christmas-2026",
    name: "Christmas",
    date_start: "2026-12-25",
    date_end: "2026-12-25",
    severity: "heavy",
    country: "both",
    description:
      "Christmas creates heavy traffic as Singaporeans head to JB for year-end shopping and celebrations. Combined with school holidays, the period from mid-Dec to early Jan sees sustained higher-than-normal traffic.",
    peak_hours_woodlands: "Eve (24 Dec): 10 AM – 9 PM. Day: 9 AM – 6 PM. 26 Dec: 10 AM – 8 PM.",
    peak_hours_tuas: "Eve: 11 AM – 7 PM. Day: 10 AM – 5 PM.",
    best_alternative_times: [
      "Cross before 8 AM on any day",
      "Avoid Christmas Eve afternoon — it's the worst",
      "26 Dec (Boxing Day) JB malls are extremely crowded",
    ],
    avoidance_tips: [
      "School holiday season means sustained traffic — not just the day itself",
      "JB malls run major sales — shopping crowds add to checkpoint congestion",
      "Consider weekday crossing during school holiday period",
    ],
    faqs: [
      {
        question: "Is traffic bad during the entire December school holidays?",
        answer: "Yes, traffic is elevated throughout mid-Dec to early Jan, with peaks around Christmas, New Year, and weekends. Weekdays are noticeably lighter.",
      },
    ],
  },
];
