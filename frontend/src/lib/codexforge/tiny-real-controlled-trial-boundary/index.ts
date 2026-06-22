import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  summarizeTinyRealControlledTrialRouteModel,
  type TinyRealControlledTrialRouteModel,
} from "../tiny-real-controlled-trial";

export const TINY_REAL_CONTROLLED_TRIAL_BOUNDARY_LANGUAGE =
  "Tiny real controlled trial boundary | Tiny real controlled trial boundary does not allow broad execution | Tiny real controlled trial requires explicit operator approval | Tiny real controlled trial separates cockpit preview from backend-owned guarded execution | Denied tiny real controlled trial paths remain blocked | Tiny real controlled trial checklist | Go to Tiny Real Controlled Trial Boundary";

export { buildTinyRealControlledTrialStableKey as buildTinyRealControlledTrialBoundaryStableKey };

export function buildTinyRealControlledTrialBoundaryModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("tiny-real-controlled-trial-boundary");
}

export function summarizeTinyRealControlledTrialBoundary(
  model = buildTinyRealControlledTrialBoundaryModel()
): string {
  return summarizeTinyRealControlledTrialRouteModel(model);
}
