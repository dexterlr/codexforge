import { buildManualProductTrialItem, type ManualProductTrialItem } from "./manual-product-trial-types";
export function buildProductTrialValidation(): ManualProductTrialItem {
  return buildManualProductTrialItem("validation", "Manual validation", "Paste validation output separately. No auto-run and no combined apply plus validate action.");
}
