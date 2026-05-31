import { buildProductTrialScenario, buildDefaultProductTrialScenario } from "./product-trial-scenario";
import { buildProductTrialStep, buildDefaultProductTrialSteps } from "./product-trial-step";
import { buildProductTrialRouteCheck } from "./product-trial-route-check";
import { buildProductTrialFriction } from "./product-trial-friction";
import { buildProductTrialObservation } from "./product-trial-observation";
import { buildProductTrialValidation } from "./product-trial-validation";
import { buildProductTrialResult } from "./product-trial-result";
import { buildProductTrialHandoff } from "./product-trial-handoff";
import type { ManualProductTrialSummary } from "./manual-product-trial-types";
export function buildManualProductTrialSummary(): ManualProductTrialSummary {
  return { title: "Manual product trial", status: "trial-ready", primaryAction: "Start product trial", nextRoute: "/runbook", items: [buildProductTrialScenario(), buildDefaultProductTrialScenario(), buildProductTrialStep(), buildDefaultProductTrialSteps(), buildProductTrialRouteCheck(), buildProductTrialFriction(), buildProductTrialObservation(), buildProductTrialValidation(), buildProductTrialResult(), buildProductTrialHandoff()] };
}
