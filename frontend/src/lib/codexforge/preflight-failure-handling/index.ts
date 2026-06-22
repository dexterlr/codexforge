import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const PREFLIGHT_FAILURE_HANDLING_LANGUAGE =
  "Preflight failure handling | Preflight failure handling does not execute apply or run | Preflight failure handling requires explicit operator approval | Preflight failure handling checks goal plan diff command approval path guard command guard evidence result audit recovery and queue readiness | Preflight recovery remains blocked | Preflight failure checklist | Go to Preflight Failure Handling";

export { buildRealTrialHardeningStableKey as buildPreflightFailureHandlingStableKey };

export function buildPreflightFailureHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("preflight-failure-handling");
}

export function summarizePreflightFailureHandling(
  model = buildPreflightFailureHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
