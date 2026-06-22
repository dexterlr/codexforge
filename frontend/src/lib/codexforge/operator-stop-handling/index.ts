import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const OPERATOR_STOP_HANDLING_LANGUAGE =
  "Operator stop handling | Operator stop handling does not kill processes from the UI | Operator stop handling requires explicit operator approval | Operator stop handling previews stop request acknowledgement backend halt boundary evidence capture result capture audit capture and manual review path | Operator stop recovery remains blocked | Operator stop checklist | Go to Operator Stop Handling";

export { buildRealTrialHardeningStableKey as buildOperatorStopHandlingStableKey };

export function buildOperatorStopHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("operator-stop-handling");
}

export function summarizeOperatorStopHandling(
  model = buildOperatorStopHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
