import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  summarizeBackendGuardedApplyRunRouteModel,
  type BackendGuardedApplyRunRouteModel,
} from "../backend-guarded-apply-run";

export const BACKEND_GUARDED_GO_NO_GO_REVIEW_LANGUAGE =
  "Backend guarded go no-go review | Backend guarded go no-go review does not release execution | Backend guarded go no-go review requires explicit operator approval | Go no-go review reports preview-only status blocked apply run and required future backend guards | Denied backend guarded go no-go paths remain blocked | Backend guarded go no-go checklist | Go to Backend Guarded Go No Go Review";

export { buildBackendGuardedApplyRunStableKey as buildBackendGuardedGoNoGoReviewStableKey };

export function buildBackendGuardedGoNoGoReviewModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("backend-guarded-go-no-go-review");
}

export function summarizeBackendGuardedGoNoGoReview(
  model = buildBackendGuardedGoNoGoReviewModel()
): string {
  return summarizeBackendGuardedApplyRunRouteModel(model);
}
