import { buildApplyTrialHardeningItem, type ApplyTrialHardeningItem } from "./first-guarded-apply-trial-types";
export function buildApplyTrialRollbackCheck(): ApplyTrialHardeningItem {
  return buildApplyTrialHardeningItem("rollback", "Rollback plan", "Copy rollback guidance before continuing. Stop when apply result is unknown.");
}
