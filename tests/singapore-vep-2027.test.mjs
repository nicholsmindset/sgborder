import assert from "node:assert/strict";
import test from "node:test";
import { estimateSingaporeVep2027 } from "../src/lib/singapore-vep-2027.ts";

function trip(overrides = {}) {
  return estimateSingaporeVep2027({
    entryDate: "2027-01-04",
    exitDate: "2027-01-04",
    vehicle: "car",
    hasObu: false,
    erpDrivingDays: 0,
    ...overrides,
  });
}

test("charges entry and exit dates, but waives VEP on a weekend", () => {
  const result = trip({ entryDate: "2027-01-02", exitDate: "2027-01-04" });
  assert.deepEqual(result.chargeableDates, ["2027-01-04"]);
  assert.deepEqual(result.freeDates, ["2027-01-02", "2027-01-03"]);
  assert.equal(result.vepFee, 50);
});

test("observed 8 February public holiday is free and Saturday can still be an ERP day", () => {
  const result = trip({ entryDate: "2027-02-06", exitDate: "2027-02-09", erpDrivingDays: 1 });
  assert.deepEqual(result.chargeableDates, ["2027-02-09"]);
  assert.deepEqual(result.erpEligibleDates, ["2027-02-09"]);
  assert.equal(result.knownSubtotal, 60);
  const saturday = trip({ entryDate: "2027-01-02", exitDate: "2027-01-02", erpDrivingDays: 1 });
  assert.equal(saturday.vepFee, 0);
  assert.equal(saturday.flatErpFee, 10);
});

test("motorcycle uses its own VEP and flat ERP rates", () => {
  const result = trip({ vehicle: "motorcycle", erpDrivingDays: 1 });
  assert.equal(result.vepFee, 7);
  assert.equal(result.flatErpFee, 3);
  assert.equal(result.knownSubtotal, 10);
});

test("OBU excludes unknown route-based ERP and validates dates", () => {
  const result = trip({ hasObu: true, erpDrivingDays: 3 });
  assert.equal(result.flatErpFee, null);
  assert.equal(result.knownSubtotal, 50);
  assert.throws(() => trip({ entryDate: "2027-01-05", exitDate: "2027-01-04" }), /Exit date/);
  assert.throws(() => trip({ entryDate: "2027-02-30" }), /valid date/);
  assert.throws(() => trip({ erpDrivingDays: 2 }), /ERP driving days/);
});
