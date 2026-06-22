import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const DENIED_COMMAND_FAILURE_HANDLING_LANGUAGE =
  "Denied command failure handling | Denied command failure handling does not run commands | Denied command failure handling requires explicit operator approval | Denied command failure handling blocks non-allowlisted commands unsafe arguments unsafe working directories hidden environment access and shell escalation | Denied command recovery remains blocked | Denied command failure checklist | Go to Denied Command Failure Handling";

export { buildRealTrialHardeningStableKey as buildDeniedCommandFailureHandlingStableKey };

export function buildDeniedCommandFailureHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("denied-command-failure-handling");
}

export function summarizeDeniedCommandFailureHandling(
  model = buildDeniedCommandFailureHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
