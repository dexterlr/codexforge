import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_HANDOFF_SECURITY_REVIEW_LANGUAGE =
  "Backend handoff security review | Backend handoff security review does not execute backend actions | Backend handoff security review requires explicit operator approval | Security review checks secret redaction path guard command allowlist environment-name-only display provider block connector block and memory-promotion block | Denied backend handoff security paths remain blocked | Backend handoff security review checklist | Go to Backend Handoff Security Review";

export { buildBackendApprovalHandoffStableKey as buildBackendHandoffSecurityReviewStableKey };

export function buildBackendHandoffSecurityReviewModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-handoff-security-review");
}

export function summarizeBackendHandoffSecurityReview(
  model = buildBackendHandoffSecurityReviewModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
