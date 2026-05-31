import { buildManualProductTrialItem, type ManualProductTrialItem } from "./manual-product-trial-types";
export function buildProductTrialResult(): ManualProductTrialItem {
  return buildManualProductTrialItem("result", "Trial result", "Record pass, pass with notes, blocked, or failed after validation and result review.");
}
