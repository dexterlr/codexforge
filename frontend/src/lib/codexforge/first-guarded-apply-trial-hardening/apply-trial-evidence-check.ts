import { buildApplyTrialHardeningItem, type ApplyTrialHardeningItem } from "./first-guarded-apply-trial-types";
export function buildApplyTrialEvidenceCheck(): ApplyTrialHardeningItem {
  return buildApplyTrialHardeningItem("evidence", "Evidence check", "Evidence capture is the next step after guarded apply, not proof of success by itself.");
}
