import { buildApplyTrialHardeningItem, type ApplyTrialHardeningItem } from "./first-guarded-apply-trial-types";
export function buildApplyTrialReadiness(): ApplyTrialHardeningItem {
  return buildApplyTrialHardeningItem("readiness", "Request readiness", "One file only, one diff only, preview exists, explicit approval required, no fake apply success.");
}
