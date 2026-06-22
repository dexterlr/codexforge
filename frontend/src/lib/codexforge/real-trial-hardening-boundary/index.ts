import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const REAL_TRIAL_HARDENING_BOUNDARY_LANGUAGE =
  "Real trial hardening boundary | Real trial hardening boundary does not broaden execution | Real trial hardening requires explicit operator approval | Hardening boundary keeps tiny real trial behind backend-owned guarded execution | Denied real trial hardening paths remain blocked | Real trial hardening checklist | Go to Real Trial Hardening Boundary";

export { buildRealTrialHardeningStableKey as buildRealTrialHardeningBoundaryStableKey };

export function buildRealTrialHardeningBoundaryModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("real-trial-hardening-boundary");
}

export function summarizeRealTrialHardeningBoundary(
  model = buildRealTrialHardeningBoundaryModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
