import { buildManualProductTrialItem, type ManualProductTrialItem } from "./manual-product-trial-types";
export function buildProductTrialStep(): ManualProductTrialItem {
  return buildManualProductTrialItem("step", "Real MVP path", "/ -> /start -> /code-flow/live-run -> /files -> /guarded-apply-mvp -> /apply-evidence -> /validation-results -> /workflow-results -> /run-history -> /demo");
}
export function buildDefaultProductTrialSteps(): ManualProductTrialItem {
  return buildManualProductTrialItem("default-steps", "Default trial steps", "Start with home, follow the live run, select a safe file, review apply, capture evidence, validate separately, record result, review history, then demo.");
}
