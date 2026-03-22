export interface ExpresswayConfig {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  relevance: string; // why it matters for causeway users
  cameraIds: string[];
  relatedCheckpoint?: "woodlands" | "tuas";
  faqs: { question: string; answer: string }[];
}

// LTA camera IDs from data.gov.sg traffic-images API
// Reference: https://data.gov.sg/datasets/d_1f4bd498b43c3bca55e63eac39e6a3a0/view
export const EXPRESSWAYS: Record<string, ExpresswayConfig> = {
  bke: {
    slug: "bke",
    name: "Bukit Timah Expressway",
    shortName: "BKE",
    title: "BKE Traffic Camera Live — Bukit Timah Expressway CCTV (2026)",
    description: "Live BKE traffic cameras from LTA. Bukit Timah Expressway CCTV feeds updated every 5 min. Check BKE before heading to Woodlands Checkpoint.",
    relevance: "BKE is the direct expressway route to Woodlands Checkpoint. Always check BKE cameras before crossing to JB.",
    cameraIds: ["2701", "2702", "2704", "9701", "9702", "9703", "9704"],
    relatedCheckpoint: "woodlands",
    faqs: [
      {
        question: "Does BKE lead to the Woodlands Checkpoint?",
        answer: "Yes. BKE (Bukit Timah Expressway) connects directly to Woodlands Checkpoint, the main Singapore-JB border crossing. Check BKE cameras to see traffic conditions before heading to the causeway.",
      },
      {
        question: "How often are BKE cameras updated?",
        answer: "BKE traffic cameras are refreshed every 5 minutes with live snapshots from LTA (Land Transport Authority of Singapore).",
      },
    ],
  },
  aye: {
    slug: "aye",
    name: "Ayer Rajah Expressway",
    shortName: "AYE",
    title: "AYE Traffic Camera Live — Ayer Rajah Expressway CCTV (2026)",
    description: "Live AYE traffic cameras from LTA. Ayer Rajah Expressway CCTV feeds updated every 5 min. Check AYE before heading to Tuas Checkpoint.",
    relevance: "AYE connects to Tuas Checkpoint (Second Link). Check AYE cameras before crossing to JB via Second Link.",
    cameraIds: ["4703", "4707", "4708", "4712", "4714", "1701", "1702", "1703", "1704", "1705", "1706", "1707", "1709", "1711"],
    relatedCheckpoint: "tuas",
    faqs: [
      {
        question: "Does AYE lead to Tuas Checkpoint?",
        answer: "Yes. AYE (Ayer Rajah Expressway) connects to Tuas Checkpoint via the Tuas West Extension. It's the route to the Second Link crossing to JB.",
      },
      {
        question: "Is AYE faster than BKE to reach JB?",
        answer: "AYE leads to Tuas (Second Link) while BKE leads to Woodlands (Causeway). Tuas is often less congested but the detour adds distance. Compare both on our live dashboard.",
      },
    ],
  },
  pie: {
    slug: "pie",
    name: "Pan Island Expressway",
    shortName: "PIE",
    title: "PIE Traffic Camera Live — Pan Island Expressway CCTV Now",
    description: "Live PIE traffic cameras from LTA. Pan Island Expressway CCTV feeds updated every 5 min. Singapore's busiest expressway — check before you drive.",
    relevance: "PIE intersects with BKE (to Woodlands) and connects to many parts of Singapore. Check PIE if you're coming from the east.",
    cameraIds: ["5798", "5799", "5800", "5801", "5802", "6701", "6703", "6704", "6705", "6706", "6708", "6710", "6711", "6712", "6713", "6714", "6715", "6716"],
    faqs: [
      {
        question: "Is PIE the busiest expressway in Singapore?",
        answer: "Yes. PIE (Pan Island Expressway) is Singapore's busiest and longest expressway, spanning the entire island from Tuas to Changi. It regularly experiences heavy traffic during peak hours.",
      },
      {
        question: "How do I get from PIE to the causeway?",
        answer: "From PIE, take the BKE exit towards Woodlands to reach the causeway. If heading to Tuas, continue on PIE westbound towards AYE/Tuas.",
      },
    ],
  },
  cte: {
    slug: "cte",
    name: "Central Expressway",
    shortName: "CTE",
    title: "CTE Traffic Camera Live — Central Expressway CCTV Now",
    description: "Live CTE traffic cameras from LTA. Central Expressway CCTV feeds updated every 5 min. Check CTE conditions before heading north to Woodlands.",
    relevance: "CTE runs north-south and connects to SLE, which links to BKE and Woodlands Checkpoint.",
    cameraIds: ["1001", "1002", "1003", "1004", "1005", "1006", "1501", "1502", "1503", "1504", "1505"],
    faqs: [
      {
        question: "Does CTE connect to Woodlands?",
        answer: "CTE connects to SLE (Seletar Expressway) which then connects to BKE towards Woodlands Checkpoint. It's a common route from the city centre to the causeway.",
      },
    ],
  },
  sle: {
    slug: "sle",
    name: "Seletar Expressway",
    shortName: "SLE",
    title: "SLE Traffic Camera Live — Seletar Expressway CCTV Now",
    description: "Live SLE traffic cameras from LTA. Seletar Expressway CCTV feeds updated every 5 min. Key route connecting CTE to BKE and Woodlands.",
    relevance: "SLE connects CTE to BKE — a key route from central/north Singapore to Woodlands Checkpoint.",
    cameraIds: ["8701", "8702", "8704", "8706"],
    relatedCheckpoint: "woodlands",
    faqs: [
      {
        question: "Where does SLE go?",
        answer: "SLE (Seletar Expressway) runs east-west in northern Singapore, connecting TPE to BKE. It's a crucial link for reaching Woodlands Checkpoint from the northeast.",
      },
    ],
  },
  tpe: {
    slug: "tpe",
    name: "Tampines Expressway",
    shortName: "TPE",
    title: "TPE Traffic Camera Live — Tampines Expressway CCTV Now",
    description: "Live TPE traffic cameras from LTA. Tampines Expressway CCTV feeds updated every 5 min. Check TPE traffic conditions now.",
    relevance: "TPE connects to SLE for access to Woodlands. If you're in the northeast (Tampines, Pasir Ris), this is your route to the causeway.",
    cameraIds: ["7791", "7793", "7794", "7795", "7796", "7797", "7798"],
    faqs: [
      {
        question: "How do I get from TPE to the causeway?",
        answer: "Take TPE westbound to SLE, then SLE to BKE towards Woodlands Checkpoint. This is the standard route from Tampines/Pasir Ris area to JB.",
      },
    ],
  },
  kpe: {
    slug: "kpe",
    name: "Kallang-Paya Lebar Expressway",
    shortName: "KPE",
    title: "KPE Traffic Camera Live — Kallang-Paya Lebar Expressway CCTV Now",
    description: "Live KPE traffic cameras from LTA. Kallang-Paya Lebar Expressway CCTV feeds updated every 5 min.",
    relevance: "KPE connects to ECP and TPE. If you're in the east, check KPE as part of your route planning to the causeway.",
    cameraIds: ["7101", "7102", "7103", "7104", "7105", "7106"],
    faqs: [
      {
        question: "Is KPE an underground expressway?",
        answer: "Partially. KPE has a 9km tunnel section, making it one of the longest road tunnels in Southeast Asia. Camera coverage is available at entry/exit points and above-ground sections.",
      },
    ],
  },
  ecp: {
    slug: "ecp",
    name: "East Coast Parkway",
    shortName: "ECP",
    title: "ECP Traffic Camera Live — East Coast Parkway CCTV Now",
    description: "Live ECP traffic cameras from LTA. East Coast Parkway CCTV feeds updated every 5 min. Check ECP conditions before driving.",
    relevance: "ECP runs along Singapore's east coast. If heading to JB from the east or Changi area, check ECP before merging to PIE or KPE.",
    cameraIds: ["3702", "3704", "3705", "3793", "3795", "3796", "3797", "3798"],
    faqs: [
      {
        question: "Where does ECP connect to?",
        answer: "ECP connects to KPE, AYE (via MCE), and PIE. From ECP you can reach either Woodlands (via PIE/BKE) or Tuas (via MCE/AYE) checkpoints.",
      },
    ],
  },
};

export const EXPRESSWAY_LIST = Object.values(EXPRESSWAYS);
