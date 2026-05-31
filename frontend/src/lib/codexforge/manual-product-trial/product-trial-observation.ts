import { buildManualProductTrialItem, type ManualProductTrialItem } from "./manual-product-trial-types";
export function buildProductTrialObservation(): ManualProductTrialItem {
  return buildManualProductTrialItem("observation", "Operator observations", "Record what worked, what felt confusing, and whether any page claimed success before the operator supplied evidence.");
}
