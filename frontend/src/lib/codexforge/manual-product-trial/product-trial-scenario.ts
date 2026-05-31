import { buildManualProductTrialItem, type ManualProductTrialItem } from "./manual-product-trial-types";
export function buildProductTrialScenario(): ManualProductTrialItem {
  return buildManualProductTrialItem("scenario", "Harmless copy trial", "Change one empty-state wording string, preview one file, request guarded apply, capture evidence, validate manually, record the result, then demo.");
}
export function buildDefaultProductTrialScenario(): ManualProductTrialItem {
  return buildManualProductTrialItem("default-scenario", "Default product trial", "One harmless UI copy or empty-state wording change, one file, one preview, one guarded apply request, evidence capture, manual validation, result capture, run history, and demo check.");
}
