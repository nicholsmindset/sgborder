export interface PublicHoliday {
  name: string;
  date: string;
  day: string;
  type: "gazetted" | "replacement" | "observed";
  causewayImpact: "none" | "low" | "moderate" | "heavy" | "extreme";
  causewaySeveritySlug?: string; // link to our /holidays/:slug prediction page
  notes?: string;
}

export interface SchoolHolidayPeriod {
  name: string;
  date_start: string;
  date_end: string;
  causewayImpact: "low" | "moderate" | "heavy";
  notes?: string;
}

// ── Singapore Public Holidays 2026 ──────────────────────────────────
export const SG_PUBLIC_HOLIDAYS_2026: PublicHoliday[] = [
  {
    name: "New Year's Day",
    date: "2026-01-01",
    day: "Thursday",
    type: "gazetted",
    causewayImpact: "heavy",
    causewaySeveritySlug: "new-years-day-2026",
    notes: "Heavy return traffic from JB celebrations.",
  },
  {
    name: "Chinese New Year (Day 1)",
    date: "2026-02-17",
    day: "Tuesday",
    type: "gazetted",
    causewayImpact: "extreme",
    causewaySeveritySlug: "chinese-new-year-2026",
    notes: "Worst causeway traffic of the year. 3-5 hour waits common.",
  },
  {
    name: "Chinese New Year (Day 2)",
    date: "2026-02-18",
    day: "Wednesday",
    type: "gazetted",
    causewayImpact: "extreme",
    causewaySeveritySlug: "chinese-new-year-2026",
  },
  {
    name: "Hari Raya Puasa",
    date: "2026-03-20",
    day: "Friday",
    type: "gazetted",
    causewayImpact: "extreme",
    causewaySeveritySlug: "hari-raya-aidilfitri-2026",
    notes: "Massive balik kampung movement. Rivals CNY for congestion.",
  },
  {
    name: "Good Friday",
    date: "2026-04-03",
    day: "Friday",
    type: "gazetted",
    causewayImpact: "heavy",
    causewaySeveritySlug: "good-friday-2026",
    notes: "SG-only holiday. Long weekend JB trips cause heavy outbound traffic.",
  },
  {
    name: "Labour Day",
    date: "2026-05-01",
    day: "Friday",
    type: "gazetted",
    causewayImpact: "moderate",
    causewaySeveritySlug: "labour-day-2026",
    notes: "Both SG & MY holiday. Moderate traffic — single-day event.",
  },
  {
    name: "Vesak Day",
    date: "2026-05-12",
    day: "Tuesday",
    type: "gazetted",
    causewayImpact: "low",
    causewaySeveritySlug: "vesak-day-2026",
    notes: "SG holiday only. Minor impact on causeway traffic.",
  },
  {
    name: "Hari Raya Haji",
    date: "2026-06-07",
    day: "Sunday",
    type: "gazetted",
    causewayImpact: "heavy",
    causewaySeveritySlug: "hari-raya-haji-2026",
    notes: "Both SG & MY holiday. Heavy cross-border movement.",
  },
  {
    name: "Hari Raya Haji (observed)",
    date: "2026-06-08",
    day: "Monday",
    type: "observed",
    causewayImpact: "heavy",
    causewaySeveritySlug: "hari-raya-haji-2026",
    notes: "Replacement day — creates long weekend.",
  },
  {
    name: "National Day",
    date: "2026-08-09",
    day: "Sunday",
    type: "gazetted",
    causewayImpact: "heavy",
    causewaySeveritySlug: "national-day-2026",
    notes: "SG holiday. Many head to JB for the long weekend.",
  },
  {
    name: "National Day (observed)",
    date: "2026-08-10",
    day: "Monday",
    type: "observed",
    causewayImpact: "heavy",
    causewaySeveritySlug: "national-day-2026",
    notes: "Replacement day creates 3-day weekend.",
  },
  {
    name: "Deepavali",
    date: "2026-10-20",
    day: "Tuesday",
    type: "gazetted",
    causewayImpact: "low",
    causewaySeveritySlug: "deepavali-2026",
    notes: "SG holiday. Minor causeway impact.",
  },
  {
    name: "Christmas Day",
    date: "2026-12-25",
    day: "Friday",
    type: "gazetted",
    causewayImpact: "heavy",
    causewaySeveritySlug: "christmas-2026",
    notes: "Heavy traffic combined with year-end school holidays.",
  },
];

// ── Malaysia Public Holidays 2026 ───────────────────────────────────
export const MY_PUBLIC_HOLIDAYS_2026: PublicHoliday[] = [
  {
    name: "New Year's Day",
    date: "2026-01-01",
    day: "Thursday",
    type: "gazetted",
    causewayImpact: "heavy",
    causewaySeveritySlug: "new-years-day-2026",
  },
  {
    name: "Thaipusam",
    date: "2026-01-26",
    day: "Monday",
    type: "gazetted",
    causewayImpact: "moderate",
    notes: "Long weekend for MY workers — some return to JB.",
  },
  {
    name: "Nuzul Al-Quran",
    date: "2026-02-08",
    day: "Sunday",
    type: "gazetted",
    causewayImpact: "low",
    notes: "Falls during Ramadan month.",
  },
  {
    name: "Chinese New Year (Day 1)",
    date: "2026-02-17",
    day: "Tuesday",
    type: "gazetted",
    causewayImpact: "extreme",
    causewaySeveritySlug: "chinese-new-year-2026",
  },
  {
    name: "Chinese New Year (Day 2)",
    date: "2026-02-18",
    day: "Wednesday",
    type: "gazetted",
    causewayImpact: "extreme",
    causewaySeveritySlug: "chinese-new-year-2026",
  },
  {
    name: "Israk and Mikraj",
    date: "2026-02-26",
    day: "Thursday",
    type: "gazetted",
    causewayImpact: "low",
  },
  {
    name: "Hari Raya Aidilfitri (Day 1)",
    date: "2026-03-20",
    day: "Friday",
    type: "gazetted",
    causewayImpact: "extreme",
    causewaySeveritySlug: "hari-raya-aidilfitri-2026",
    notes: "Massive balik kampung — 3-5 hour waits at both checkpoints.",
  },
  {
    name: "Hari Raya Aidilfitri (Day 2)",
    date: "2026-03-21",
    day: "Saturday",
    type: "gazetted",
    causewayImpact: "extreme",
    causewaySeveritySlug: "hari-raya-aidilfitri-2026",
  },
  {
    name: "Labour Day",
    date: "2026-05-01",
    day: "Friday",
    type: "gazetted",
    causewayImpact: "moderate",
    causewaySeveritySlug: "labour-day-2026",
  },
  {
    name: "Vesak Day",
    date: "2026-05-12",
    day: "Tuesday",
    type: "gazetted",
    causewayImpact: "low",
  },
  {
    name: "Yang di-Pertuan Agong Birthday",
    date: "2026-06-01",
    day: "Monday",
    type: "gazetted",
    causewayImpact: "moderate",
    notes: "Creates long weekend — moderate JB-bound traffic.",
  },
  {
    name: "Hari Raya Haji",
    date: "2026-06-07",
    day: "Sunday",
    type: "gazetted",
    causewayImpact: "heavy",
    causewaySeveritySlug: "hari-raya-haji-2026",
  },
  {
    name: "Hari Raya Haji (Day 2)",
    date: "2026-06-08",
    day: "Monday",
    type: "gazetted",
    causewayImpact: "heavy",
    causewaySeveritySlug: "hari-raya-haji-2026",
  },
  {
    name: "Awal Muharram (Islamic New Year)",
    date: "2026-06-27",
    day: "Saturday",
    type: "gazetted",
    causewayImpact: "low",
  },
  {
    name: "Malaysia Day",
    date: "2026-09-16",
    day: "Wednesday",
    type: "gazetted",
    causewayImpact: "moderate",
    causewaySeveritySlug: "malaysia-day-2026",
    notes: "MY holiday. Some MY workers in SG head back.",
  },
  {
    name: "Maulidur Rasul (Prophet Muhammad's Birthday)",
    date: "2026-09-05",
    day: "Saturday",
    type: "gazetted",
    causewayImpact: "low",
  },
  {
    name: "Deepavali",
    date: "2026-10-20",
    day: "Tuesday",
    type: "gazetted",
    causewayImpact: "low",
    causewaySeveritySlug: "deepavali-2026",
  },
  {
    name: "Christmas Day",
    date: "2026-12-25",
    day: "Friday",
    type: "gazetted",
    causewayImpact: "heavy",
    causewaySeveritySlug: "christmas-2026",
  },
];

// ── Malaysia School Holidays 2026 ───────────────────────────────────
export const MY_SCHOOL_HOLIDAYS_2026: SchoolHolidayPeriod[] = [
  {
    name: "Term 1 Mid-Semester Break",
    date_start: "2026-03-14",
    date_end: "2026-03-22",
    causewayImpact: "heavy",
    notes: "Overlaps with Hari Raya Aidilfitri — expect extreme congestion.",
  },
  {
    name: "Term 1 End / Mid-Year Break",
    date_start: "2026-05-23",
    date_end: "2026-06-14",
    causewayImpact: "heavy",
    notes: "3+ weeks off. Sustained heavy cross-border traffic, especially weekends. Overlaps Hari Raya Haji.",
  },
  {
    name: "Term 2 Mid-Semester Break",
    date_start: "2026-08-15",
    date_end: "2026-08-23",
    causewayImpact: "moderate",
    notes: "Near SG National Day — combined effect with SG holiday traffic.",
  },
  {
    name: "Year-End School Holidays",
    date_start: "2026-11-21",
    date_end: "2027-01-04",
    causewayImpact: "heavy",
    notes: "Longest break. Sustained heavy traffic throughout. Christmas & New Year peak within this period.",
  },
];

// Calendar page config
export interface CalendarPageConfig {
  slug: string;
  country: "sg" | "my";
  type: "public" | "school";
  title: string;
  description: string;
  h1: string;
  introText: string;
  holidays: PublicHoliday[];
  schoolHolidays?: SchoolHolidayPeriod[];
  faqs: { question: string; answer: string }[];
}

export const CALENDAR_PAGES: Record<string, CalendarPageConfig> = {
  "singapore-public-holidays-2026": {
    slug: "singapore-public-holidays-2026",
    country: "sg",
    type: "public",
    title: "Singapore Public Holidays 2026 — Full Calendar & Causeway Traffic Impact",
    description: "Complete list of Singapore public holidays 2026 with dates, days & causeway traffic impact. Plan your JB trips around holiday congestion with our traffic predictions.",
    h1: "Singapore Public Holidays 2026",
    introText: "Singapore has 11 gazetted public holidays in 2026. When a holiday falls on Sunday, the following Monday is a replacement holiday. Below is the full calendar with the expected causeway traffic impact for each holiday — helping you plan stress-free JB trips.",
    holidays: SG_PUBLIC_HOLIDAYS_2026,
    faqs: [
      {
        question: "How many public holidays does Singapore have in 2026?",
        answer: "Singapore has 11 gazetted public holidays in 2026. When a holiday falls on a Sunday, the next Monday is an observed replacement holiday, so you may get up to 13 days off.",
      },
      {
        question: "Which Singapore public holidays cause the worst causeway traffic?",
        answer: "Chinese New Year (Feb 17-18) and Hari Raya Puasa (Mar 20) cause extreme causeway congestion with 3-5 hour waits. Good Friday, National Day, and Christmas create heavy traffic. Labour Day and Vesak Day have moderate-to-low impact.",
      },
      {
        question: "When is Chinese New Year 2026 in Singapore?",
        answer: "Chinese New Year 2026 falls on Tuesday 17 February and Wednesday 18 February. Expect extreme causeway traffic from 14-20 Feb. Cross before 5 AM or after 11 PM to avoid the worst queues.",
      },
      {
        question: "Is there a long weekend for National Day 2026?",
        answer: "Yes. National Day 2026 falls on Sunday 9 August, with Monday 10 August as the observed replacement holiday, giving a 3-day weekend. Expect heavy causeway traffic.",
      },
    ],
  },
  "malaysia-public-holidays-2026": {
    slug: "malaysia-public-holidays-2026",
    country: "my",
    type: "public",
    title: "Malaysia Public Holidays 2026 (Cuti Umum) — Full List & Causeway Traffic",
    description: "Complete list of Malaysia public holidays 2026 (cuti umum) with dates & causeway traffic impact. Plan your border crossing around Malaysian holiday congestion.",
    h1: "Malaysia Public Holidays 2026 (Cuti Umum)",
    introText: "Malaysia has 18+ gazetted public holidays (cuti umum) in 2026, many of which are Islamic holidays with dates subject to moon sighting confirmation. Below is the full calendar with expected causeway traffic impact — crucial for planning your JB trips and border crossings.",
    holidays: MY_PUBLIC_HOLIDAYS_2026,
    faqs: [
      {
        question: "How many public holidays does Malaysia have in 2026?",
        answer: "Malaysia has 18 national public holidays (cuti umum) in 2026, plus additional state-specific holidays in Johor. Islamic holiday dates are approximate and subject to moon sighting.",
      },
      {
        question: "Which Malaysia holidays cause the worst JB traffic?",
        answer: "Hari Raya Aidilfitri (Mar 20-21) causes extreme causeway congestion due to massive balik kampung movement. Chinese New Year and Hari Raya Haji also create extreme-to-heavy traffic. School holidays amplify the effect.",
      },
      {
        question: "When is Hari Raya 2026 in Malaysia?",
        answer: "Hari Raya Aidilfitri 2026 is expected on Friday 20 March and Saturday 21 March (subject to moon sighting). Expect extreme causeway traffic 3-5 days before and after.",
      },
      {
        question: "What is cuti umum in Malaysia?",
        answer: "Cuti umum means 'public holiday' in Malay. Malaysia observes both fixed-date holidays (New Year's, Labour Day) and Islamic holidays that follow the lunar calendar.",
      },
    ],
  },
  "malaysia-school-holidays-2026": {
    slug: "malaysia-school-holidays-2026",
    country: "my",
    type: "school",
    title: "Malaysia School Holidays 2026 — Dates & Causeway Traffic Predictions",
    description: "Malaysia school holiday dates 2026 with causeway traffic predictions. Plan your border crossing during school breaks — know which weeks have heavy JB traffic.",
    h1: "Malaysia School Holidays 2026",
    introText: "Malaysia school holidays create sustained heavy causeway traffic, especially during the mid-year and year-end breaks. Unlike single-day public holidays, school breaks cause weeks of elevated congestion as families travel between Singapore and Johor Bahru.",
    holidays: MY_PUBLIC_HOLIDAYS_2026,
    schoolHolidays: MY_SCHOOL_HOLIDAYS_2026,
    faqs: [
      {
        question: "When are Malaysia school holidays 2026?",
        answer: "Malaysia school holidays 2026: Term 1 break (Mar 14-22), mid-year break (May 23 - Jun 14), Term 2 break (Aug 15-23), and year-end holidays (Nov 21 - Jan 4, 2027). Dates may vary slightly by state.",
      },
      {
        question: "How do Malaysia school holidays affect causeway traffic?",
        answer: "School holidays cause sustained heavy causeway traffic for the entire break period, unlike single-day public holidays. The worst is the year-end break (Nov-Jan) which overlaps Christmas and New Year. Weekends during school holidays see 50-100% more traffic than normal.",
      },
      {
        question: "Which school holiday period has the worst JB traffic?",
        answer: "The year-end holidays (Nov 21 - Jan 4) are worst because they overlap Christmas, New Year, and last 6+ weeks. The mid-year break (May-Jun) is second worst, especially when it overlaps Hari Raya Haji.",
      },
      {
        question: "Is it better to cross on weekdays during school holidays?",
        answer: "Yes. Weekdays during school holidays have 30-50% less traffic than weekends. Aim for Tuesday-Thursday mornings before 8 AM for the lightest queues.",
      },
    ],
  },
};
