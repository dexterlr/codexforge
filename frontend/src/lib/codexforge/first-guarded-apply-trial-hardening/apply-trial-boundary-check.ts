import { buildApplyTrialHardeningItem, type ApplyTrialHardeningItem } from "./first-guarded-apply-trial-types";
export function buildApplyTrialBoundaryCheck(): ApplyTrialHardeningItem {
  return buildApplyTrialHardeningItem("boundary", "Boundary check", "Command, write, and apply remain separate. UI does not call execution tools directly.");
}
