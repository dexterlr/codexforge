import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_DENIED_PATH_REVIEW_LANGUAGE =
  "Backend guarded denied path review | Backend guarded denied path review does not mutate workflow state | Backend guarded denied path review requires explicit operator approval | Denied path review lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and backend execution | Denied backend guarded paths remain blocked | Backend guarded denied path checklist | Go to Backend Guarded Denied Path Review";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedDeniedPathReviewStableKey };

export function buildBackendGuardedDeniedPathReviewModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-denied-path-review");
}

export function summarizeBackendGuardedDeniedPathReview(
  model = buildBackendGuardedDeniedPathReviewModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
