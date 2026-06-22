import {
  buildFirstLocalChangeTrialRouteModel,
  buildFirstLocalChangeTrialStableKey,
  summarizeFirstLocalChangeTrialRouteModel,
  type FirstLocalChangeTrialRouteModel,
} from "../first-local-change-trial";

export const FIRST_LOCAL_CHANGE_TRIAL_BOUNDARY_LANGUAGE =
  "First local change trial boundary | First local change trial boundary does not write files or run commands | First local change trial requires explicit operator approval | Local change trial unifies goal plan diff command approval evidence result and recovery | Denied first local change trial paths remain blocked | First local change trial checklist | Go to First Local Change Trial Boundary";

export { buildFirstLocalChangeTrialStableKey as buildFirstLocalChangeTrialBoundaryStableKey };

export function buildFirstLocalChangeTrialBoundaryModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("first-local-change-trial-boundary");
}

export function summarizeFirstLocalChangeTrialBoundary(
  model = buildFirstLocalChangeTrialBoundaryModel()
): string {
  return summarizeFirstLocalChangeTrialRouteModel(model);
}
