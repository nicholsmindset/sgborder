export type CrossingGuide = {
  slug: string;
  group: "rules" | "routes";
  title: string;
  description: string;
  answer: string;
  sections: { heading: string; paragraphs?: string[]; points?: string[] }[];
  sources: { label: string; url: string }[];
  related: { label: string; href: string }[];
};

export const CROSSING_GUIDES: CrossingGuide[] = [
  {
    slug: "three-quarter-tank",
    group: "rules",
    title: "Singapore's three-quarter tank rule before driving to JB",
    description: "Which vehicles and fuel tanks must be at least three-quarters full before leaving Singapore by land, according to Singapore Customs.",
    answer: "A Singapore-registered vehicle leaving Singapore by land must have at least three-quarters of its fuel tank filled. The rule covers petrol, diesel and CNG vehicles, including relevant hybrid tanks. Check your gauge before joining the checkpoint queue.",
    sections: [
      { heading: "Who must comply?", paragraphs: ["Singapore Customs applies the rule to all Singapore-registered vehicles departing via the land checkpoints. It includes petrol, diesel and compressed natural gas (CNG). A hybrid vehicle with separate petrol and CNG tanks must meet the requirement for both tanks. The rule concerns fuel already in the vehicle when you leave Singapore; it is not a recommendation about where to refuel later."] },
      { heading: "A practical pre-departure check", points: ["Look at the fuel level before setting off, allowing for the drive to Woodlands or Tuas and any time spent in the queue.", "If your gauge is close to the three-quarter mark, top up in Singapore before reaching the checkpoint.", "Keep documents for the vehicle and driver ready; checkpoint officers may inspect vehicles."] },
      { heading: "What if the tank is below the mark?", paragraphs: ["Customs says offenders may be required to turn back to top up and may face a composition sum of up to S$500 or prosecution. Its official page has the current details. Do not treat a camera image or an estimated queue as a substitute for the fuel check."] },
    ],
    sources: [{ label: "Singapore Customs — Three-Quarter Tank Rule", url: "https://www.customs.gov.sg/at-customs/departing-singapore/three-quarter-tank-rule/" }],
    related: [{ label: "Malaysia Road Charge", href: "/rules/malaysia-road-charge" }, { label: "Woodlands or Tuas?", href: "/routes/woodlands-vs-tuas" }, { label: "SG → JB cost calculator", href: "/calculator" }],
  },
  {
    slug: "malaysia-road-charge",
    group: "rules",
    title: "Malaysia Road Charge for Singapore cars",
    description: "The RM20 Malaysia Road Charge, who pays it and how it differs from VEP registration and highway tolls.",
    answer: "Malaysia's Road Charge is RM20 per entry for a foreign-registered private vehicle. It is separate from Malaysia VEP registration and from highway tolls. JPJ says motorcycles and commercial vehicles are exempt from the Road Charge.",
    sections: [
      { heading: "Road Charge, VEP and tolls are different", paragraphs: ["The Road Charge is an entry charge collected by Malaysia. VEP is the vehicle registration system for foreign vehicles entering Malaysia. A toll is charged for using a particular road or crossing. Budget for each applicable item rather than assuming the RM20 pays for the full drive to JB."] },
      { heading: "How to prepare to pay", paragraphs: ["JPJ's FAQ says the charge can be paid using a Touch 'n Go card or a Touch 'n Go eWallet linked to the VEP RFID tag. Check the balance and the vehicle's VEP status before travel. If a payment method or enforcement procedure changes, JPJ's official FAQ and VEP portal should take precedence over this guide."] },
      { heading: "Example for a return trip", paragraphs: ["A Singapore-registered private car entering Malaysia once on Friday and returning to Singapore on Sunday has one Malaysia entry for Road Charge purposes. If it leaves Malaysia and enters again later, that is another entry. Actual tolls and other costs depend on the route and vehicle."] },
    ],
    sources: [{ label: "JPJ — Road Charge and VEP FAQ", url: "https://www.jpj.gov.my/en/rc-vep-faq/" }, { label: "JPJ — official VEP portal", url: "https://vep.jpj.gov.my/index.html" }],
    related: [{ label: "Malaysia VEP guide", href: "/guides/vep-malaysia-guide" }, { label: "SG → JB cost calculator", href: "/calculator" }, { label: "Three-quarter tank rule", href: "/rules/three-quarter-tank" }],
  },
  {
    slug: "customs-returning-from-jb",
    group: "rules",
    title: "Singapore Customs rules when returning from JB",
    description: "A quick check of alcohol, tobacco and GST relief when you enter Singapore from Malaysia by land.",
    answer: "Travellers arriving in Singapore from Malaysia do not get a duty-free alcohol concession. Tobacco has no duty-free concession or GST relief. Eligible newly acquired goods may qualify for GST relief of up to S$100 after less than 48 hours abroad, or up to S$500 after 48 hours or more, subject to the traveller and goods exclusions.",
    sections: [
      { heading: "Alcohol and tobacco", paragraphs: ["The ordinary traveller alcohol concession does not apply when arriving from Malaysia, even if you cleared Malaysian immigration before reaching Singapore. This does not mean every bottle is prohibited: applicable duty and GST must be declared and paid. All cigarettes and tobacco products are subject to duty and GST when brought into Singapore, including products previously bought in Singapore."] },
      { heading: "New purchases and GST relief", paragraphs: ["For eligible personal purchases, Singapore Customs lists relief of up to S$100 if you were outside Singapore for less than 48 hours and up to S$500 if you were away for at least 48 hours. The relief does not cover intoxicating liquor, tobacco or commercial goods. Certain pass holders and crew members are ineligible. A newly bought item remains a new purchase even if you start using it during the trip."] },
      { heading: "Before reaching the checkpoint", points: ["Keep receipts for purchases so their value can be assessed.", "Declare goods that exceed your relief and pay applicable duty or GST using Customs' stated channels.", "Check Singapore Customs' current rules for any item with special restrictions before bringing it across."] },
    ],
    sources: [{ label: "Singapore Customs — Duty-Free Concession and GST Import Relief", url: "https://www.customs.gov.sg/at-customs/arriving-in-singapore/duty-free-concession-gst-relief/" }],
    related: [{ label: "JB → SG traffic", href: "/jb-to-sg" }, { label: "Singapore VEP 2027 calculator", href: "/calculator/singapore-vep-2027" }, { label: "Crossing rules", href: "/rules" }],
  },
  {
    slug: "singapore-to-jb-sentral",
    group: "routes",
    title: "Singapore to JB Sentral: bus, train or car?",
    description: "Compare practical ways to reach JB Sentral from Singapore and choose the checkpoint that fits the trip.",
    answer: "For JB Sentral without a car, use a cross-border bus via Woodlands or the KTM Shuttle Tebrau from Woodlands Train Checkpoint. Causeway Link lists CW1 from Kranji, CW2 from Queen Street and CW5 from Newton; SBS Transit 170X links Kranji and JB Sentral. Verify the current service and fare with the operator before leaving.",
    sections: [
      { heading: "Bus from Singapore", paragraphs: ["Choose your Singapore departure point first. CW1 uses Kranji, CW2 uses Queen Street and CW5 uses Newton. SBS Transit 170X is another Kranji option. At border control, follow the operator's instructions for getting off, clearing immigration and boarding the onward service. A listed route is not a guarantee of a particular departure time or seat."] },
      { heading: "KTM Shuttle Tebrau", paragraphs: ["The Shuttle Tebrau runs between Woodlands Train Checkpoint and JB Sentral. It requires a separate train booking and the relevant immigration process. Check KTM's booking site for the date, fare and available seats; a bus arrival estimate cannot tell you whether a train has seats."] },
      { heading: "Driving instead", paragraphs: ["JB Sentral is in central Johor Bahru, so Woodlands is usually the more direct checkpoint choice for this destination. Compare the latest Woodlands camera images before committing to the drive. Factor in parking, Malaysia VEP status, Road Charge and tolls separately from the checkpoint queue."] },
    ],
    sources: [{ label: "Causeway Link — bus services", url: "https://www.causewaylink.com.my/php-functions/web/bus-routes/bus-services.php" }, { label: "SBS Transit — 170X", url: "https://www.sbstransit.com.sg/Service/BusService?Dir=2&ServiceNo=170x&ServiceType=Basic" }, { label: "KTM — Shuttle booking", url: "https://shuttleonline.ktmb.com.my/Home/Shuttle" }],
    related: [{ label: "Cross-border buses", href: "/bus" }, { label: "Woodlands cameras", href: "/cameras/woodlands" }, { label: "Woodlands checkpoint", href: "/woodlands" }],
  },
  {
    slug: "singapore-to-legoland-malaysia",
    group: "routes",
    title: "Singapore to LEGOLAND Malaysia: which checkpoint?",
    description: "Plan a trip to LEGOLAND Malaysia via Tuas or Woodlands using the destination's official directions.",
    answer: "For a direct drive from western Singapore to LEGOLAND Malaysia in Iskandar Puteri, Tuas and the Second Link are usually the natural route. LEGOLAND's directions also describe a route from Woodlands through Danga Bay and the coastal highway. Compare the two checkpoint approaches on your travel day.",
    sections: [
      { heading: "Driving via Tuas", paragraphs: ["LEGOLAND's directions send drivers through the Tuas Second Link, then toward EXIT 312 in Malaysia. This often suits travellers starting in west Singapore. The checkpoint can still be busy, so check current Tuas images and any ICA advisory before departure."] },
      { heading: "Driving via Woodlands", paragraphs: ["Woodlands is also a possible route. LEGOLAND describes continuing through Johor Bahru toward Danga Bay and the coastal highway. It can suit an itinerary that includes central JB, but the city approach adds a different road segment. Compare the whole journey, not only the queue at the checkpoint."] },
      { heading: "Without a car", paragraphs: ["LEGOLAND's official directions list coach providers from Singapore. Check their current boarding points, departure times and ticket conditions directly; these can change by date. A cross-border bus to JB Sentral is a different journey and needs an onward transfer to reach the park."] },
    ],
    sources: [{ label: "LEGOLAND Malaysia — Directions", url: "https://www.legoland.com.my/plan-your-day/before-you-visit/directions/" }, { label: "ICA — Checkpoints", url: "https://www.ica.gov.sg/about-us/our-checkpoints" }],
    related: [{ label: "Tuas cameras", href: "/cameras/tuas" }, { label: "Woodlands or Tuas?", href: "/routes/woodlands-vs-tuas" }, { label: "Malaysia Road Charge", href: "/rules/malaysia-road-charge" }],
  },
  {
    slug: "woodlands-vs-tuas",
    group: "routes",
    title: "Woodlands or Tuas: which checkpoint should you use?",
    description: "A destination-led choice between the Causeway at Woodlands and the Second Link at Tuas.",
    answer: "Start with your destination. Woodlands usually fits central JB and JB Sentral; Tuas usually fits western Johor destinations such as Iskandar Puteri and LEGOLAND. Both Singapore land checkpoints operate 24 hours. Then compare current cameras, advisories and the full driving route.",
    sections: [
      { heading: "Choose by destination first", paragraphs: ["JB Sentral sits near the Causeway in central Johor Bahru, so a Woodlands route is generally more direct. LEGOLAND Malaysia's own directions describe the Tuas Second Link route toward Iskandar Puteri, as well as a longer approach through JB from Woodlands. Your starting point within Singapore can change the balance."] },
      { heading: "Compare the journey, not just one camera", paragraphs: ["Camera images show visible road conditions at their capture time. They do not measure how long immigration clearance will take, and a short camera queue at one location does not prove a faster door-to-door journey. Look at the approach roads, destination-side travel and official ICA advisories too."] },
      { heading: "A simple decision sequence", points: ["Map both routes to your final destination and compare the full drive.", "Check Woodlands and Tuas camera images, their timestamps and any ICA land checkpoint advisory.", "If the routes remain close, choose the one that better suits your starting point and planned stops; recheck before leaving."] },
    ],
    sources: [{ label: "ICA — Checkpoints and opening hours", url: "https://www.ica.gov.sg/about-us/our-checkpoints" }, { label: "LEGOLAND Malaysia — Directions", url: "https://www.legoland.com.my/plan-your-day/before-you-visit/directions/" }],
    related: [{ label: "Woodlands cameras", href: "/cameras/woodlands" }, { label: "Tuas cameras", href: "/cameras/tuas" }, { label: "SG → JB driving costs", href: "/calculator" }],
  },
];

export function findCrossingGuide(group: CrossingGuide["group"], slug: string) {
  return CROSSING_GUIDES.find((guide) => guide.group === group && guide.slug === slug);
}
