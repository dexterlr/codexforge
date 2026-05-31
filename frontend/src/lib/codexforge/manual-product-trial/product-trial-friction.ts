import { buildManualProductTrialItem, type ManualProductTrialItem } from "./manual-product-trial-types";
export function buildProductTrialFriction(): ManualProductTrialItem {
  return buildManualProductTrialItem("friction", "Friction report", "Capture confusing wording, cramped navigation, unclear next step, blocked apply reason, validation uncertainty, result handoff gap, or demo doubt.");
}
