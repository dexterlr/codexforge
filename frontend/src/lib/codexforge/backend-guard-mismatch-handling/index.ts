import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const BACKEND_GUARD_MISMATCH_HANDLING_LANGUAGE =
  "Backend guard mismatch handling | Backend guard mismatch handling does not release execution | Backend guard mismatch handling requires explicit operator approval | Backend guard mismatch handling blocks route mismatch packet mismatch approval mismatch path guard mismatch command guard mismatch and evidence contract mismatch | Backend guard mismatch recovery remains blocked | Backend guard mismatch checklist | Go to Backend Guard Mismatch Handling";

export { buildRealTrialHardeningStableKey as buildBackendGuardMismatchHandlingStableKey };

export function buildBackendGuardMismatchHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("backend-guard-mismatch-handling");
}

export function summarizeBackendGuardMismatchHandling(
  model = buildBackendGuardMismatchHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
