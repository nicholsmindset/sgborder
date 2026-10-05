/** Singapore public holidays in 2027, including the 8 February observed holiday.
 * Source: https://www.mom.gov.sg/newsroom/press-releases/2026/0618-public-holidays-for-2027
 */
export const SINGAPORE_PUBLIC_HOLIDAYS_2027 = new Set([
  "2027-01-01",
  "2027-02-06",
  "2027-02-07",
  "2027-02-08",
  "2027-03-10",
  "2027-03-26",
  "2027-05-01",
  "2027-05-17",
  "2027-05-20",
  "2027-08-09",
  "2027-10-28",
  "2027-12-25",
]);

export type SingaporeVepVehicle = "car" | "motorcycle";

export type SingaporeVepEstimate = {
  chargeableDates: string[];
  freeDates: string[];
  erpEligibleDates: string[];
  vepFee: number;
  flatErpFee: number | null;
  knownSubtotal: number;
};

const DAY_MS = 86_400_000;
const VEP_RATE = { car: 50, motorcycle: 7 } as const;
const FLAT_ERP_RATE = { car: 10, motorcycle: 3 } as const;

function parse2027Date(value: string): number {
  if (!/^2027-\d{2}-\d{2}$/.test(value)) throw new RangeError("Choose dates in 2027.");
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value) {
    throw new RangeError("Enter a valid date.");
  }
  return timestamp;
}

/** Indicative VEP + optional flat ERP only. Tolls, RRC and OBU gantry fees are excluded. */
export function estimateSingaporeVep2027(input: {
  entryDate: string;
  exitDate: string;
  vehicle: SingaporeVepVehicle;
  hasObu: boolean;
  erpDrivingDays: number;
}): SingaporeVepEstimate {
  const entry = parse2027Date(input.entryDate);
  const exit = parse2027Date(input.exitDate);
  if (exit < entry) throw new RangeError("Exit date must be on or after entry date.");
  if (input.vehicle !== "car" && input.vehicle !== "motorcycle") throw new RangeError("Choose a vehicle type.");

  const chargeableDates: string[] = [];
  const freeDates: string[] = [];
  const erpEligibleDates: string[] = [];

  // The vehicle is present on both its entry and exit calendar dates.
  for (let day = entry; day <= exit; day += DAY_MS) {
    const date = new Date(day);
    const key = date.toISOString().slice(0, 10);
    const weekday = date.getUTCDay();
    const publicHoliday = SINGAPORE_PUBLIC_HOLIDAYS_2027.has(key);
    if (weekday === 0 || weekday === 6 || publicHoliday) freeDates.push(key);
    else chargeableDates.push(key);

    // LTA says ERP generally operates Monday–Saturday, excluding public holidays.
    if (weekday !== 0 && !publicHoliday) erpEligibleDates.push(key);
  }

  if (!input.hasObu && (!Number.isInteger(input.erpDrivingDays) || input.erpDrivingDays < 0 || input.erpDrivingDays > erpEligibleDates.length)) {
    throw new RangeError(`ERP driving days must be between 0 and ${erpEligibleDates.length}.`);
  }

  const vepFee = chargeableDates.length * VEP_RATE[input.vehicle];
  const flatErpFee = input.hasObu ? null : input.erpDrivingDays * FLAT_ERP_RATE[input.vehicle];
  return {
    chargeableDates,
    freeDates,
    erpEligibleDates,
    vepFee,
    flatErpFee,
    knownSubtotal: vepFee + (flatErpFee ?? 0),
  };
}
