import { buildApplyTrialHardeningItem, type ApplyTrialHardeningItem } from "./first-guarded-apply-trial-types";
export function buildApplyTrialApprovalCheck(): ApplyTrialHardeningItem {
  return buildApplyTrialHardeningItem("approval", "Approval check", "Approval must be tied to the exact file, diff, and request. Latest-message authority is preserved.");
}
