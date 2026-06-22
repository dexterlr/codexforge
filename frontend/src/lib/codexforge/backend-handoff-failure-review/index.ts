import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_HANDOFF_FAILURE_REVIEW_LANGUAGE =
  "Backend handoff failure review | Backend handoff failure review does not retry or recover actions | Backend handoff failure review requires explicit operator approval | Failure review defines denied invalid expired canceled failed timeout partial recovery-required and manual-review handoff states | Denied backend handoff failure paths remain blocked | Backend handoff failure review checklist | Go to Backend Handoff Failure Review";

export { buildBackendApprovalHandoffStableKey as buildBackendHandoffFailureReviewStableKey };

export function buildBackendHandoffFailureReviewModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-handoff-failure-review");
}

export function summarizeBackendHandoffFailureReview(
  model = buildBackendHandoffFailureReviewModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
