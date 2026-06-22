import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const DENIED_PATH_FAILURE_HANDLING_LANGUAGE =
  "Denied path failure handling | Denied path failure handling does not mutate files | Denied path failure handling requires explicit operator approval | Denied path failure handling blocks traversal arbitrary files binary writes generated-file violations and workspace escape | Denied path failure recovery remains blocked | Denied path failure checklist | Go to Denied Path Failure Handling";

export { buildRealTrialHardeningStableKey as buildDeniedPathFailureHandlingStableKey };

export function buildDeniedPathFailureHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("denied-path-failure-handling");
}

export function summarizeDeniedPathFailureHandling(
  model = buildDeniedPathFailureHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
