import { buildApplyTrialHardeningItem, type ApplyTrialHardeningItem } from "./first-guarded-apply-trial-types";
export function buildApplyTrialValidationHandoff(): ApplyTrialHardeningItem {
  return buildApplyTrialHardeningItem("validation", "Validation handoff", "Validation remains separate and manual; paste output on validation results.");
}
