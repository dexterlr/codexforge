import { buildManualProductTrialItem, type ManualProductTrialItem } from "./manual-product-trial-types";
export function buildProductTrialHandoff(): ManualProductTrialItem {
  return buildManualProductTrialItem("handoff", "Runbook handoff", "Use the runbook for recovery steps before retrying or demoing.");
}
