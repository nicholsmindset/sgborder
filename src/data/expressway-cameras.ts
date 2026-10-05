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
    title: "BKE to Woodlands Camera — LTA Checkpoint Approach Images",
    description: "Timestamped LTA camera images from the BKE approach to Woodlands Checkpoint and the Singapore side of the Causeway.",
    relevance: "The retained LTA cameras show selected BKE and Causeway road sections near Woodlands Checkpoint. They do not show the full immigration queue.",
    cameraIds: ["2701", "2702", "2704"],
    relatedCheckpoint: "woodlands",
    faqs: [
      {
        question: "Does BKE lead to the Woodlands Checkpoint?",
        answer: "Yes. BKE (Bukit Timah Expressway) connects directly to Woodlands Checkpoint, the main Singapore-JB border crossing. Check BKE cameras to see traffic conditions before heading to the causeway.",
      },
      {
        question: "How often are BKE cameras updated?",
        answer: "We check for LTA still images on a five-minute cycle. Each available frame shows its own source timestamp; a new image is not guaranteed every five minutes.",
      },
    ],
  },
  aye: {
    slug: "aye",
    name: "Ayer Rajah Expressway",
    shortName: "AYE",
    title: "AYE to Tuas Camera — LTA Second Link Approach Images",
    description: "Timestamped LTA camera images from the AYE approach, Tuas Checkpoint and Singapore side of the Second Link.",
    relevance: "The retained LTA cameras show selected AYE, Tuas Checkpoint and Second Link road sections. They do not show the full immigration queue.",
    cameraIds: ["4703", "4707", "4708"],
    relatedCheckpoint: "tuas",
    faqs: [
      {
        question: "Does AYE lead to Tuas Checkpoint?",
        answer: "Yes. AYE (Ayer Rajah Expressway) connects to Tuas Checkpoint via the Tuas West Extension. It's the route to the Second Link crossing to JB.",
      },
      {
        question: "Is AYE faster than BKE to reach JB?",
        answer: "AYE leads to Tuas and BKE leads to Woodlands. Compare current camera frames and your total driving distance; neither crossing is consistently faster.",
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
    cameraIds: ["5794", "5795", "5797", "5798", "5799", "6701", "6703", "6704", "6705", "6706", "6708", "6710", "6711", "6712", "6713", "6714", "6715", "6716"],
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
    cameraIds: ["1001", "1002", "1003", "1004", "1005", "1006", "1111", "1112", "1113", "1501", "1502", "1503", "1504", "1505"],
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
  kpe: {
    slug: "kpe",
    name: "Kallang–Paya Lebar Expressway",
    shortName: "KPE",
    title: "KPE Traffic — Kallang Paya Lebar Expressway Live Status (2026)",
    description: "KPE (Kallang–Paya Lebar Expressway) traffic status and conditions. Check KPE before heading to SLE or TPE towards Woodlands Checkpoint.",
    relevance: "KPE connects PIE to SLE and TPE in northeastern Singapore. KPE is a common route from the east to reach the SLE–BKE corridor to Woodlands.",
    cameraIds: [], // LTA does not publish CCTV cameras for KPE tunnels on data.gov.sg
    faqs: [
      {
        question: "Why are there no KPE cameras?",
        answer: "LTA (Land Transport Authority) does not publish live CCTV camera images for KPE (Kallang–Paya Lebar Expressway) on the public data.gov.sg platform. KPE runs largely underground through tunnels where public camera feeds are not available.",
      },
      {
        question: "Where does KPE go?",
        answer: "KPE (Kallang–Paya Lebar Expressway) runs from the PIE near Eunos northward to SLE near Tampines. It provides a fast north-south link for motorists in the east, connecting to SLE for access to BKE and Woodlands Checkpoint.",
      },
      {
        question: "How do I get from KPE to Woodlands Checkpoint?",
        answer: "From KPE, take the SLE westbound, then join BKE heading north to Woodlands Checkpoint. This is the standard route for drivers coming from the Tampines, Pasir Ris, or Changi areas.",
      },
      {
        question: "Is KPE or CTE faster to Woodlands?",
        answer: "Both routes lead to BKE for Woodlands. KPE → SLE → BKE is typically better from the northeast, while CTE → SLE → BKE suits city-centre traffic. Check the live BKE cameras to see which approach is clearer.",
      },
    ],
  },
};

export const EXPRESSWAY_LIST = Object.values(EXPRESSWAYS);
