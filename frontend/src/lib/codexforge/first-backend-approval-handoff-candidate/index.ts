import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const FIRST_BACKEND_APPROVAL_HANDOFF_CANDIDATE_LANGUAGE =
  "First backend approval handoff candidate | First backend approval handoff candidate does not execute backend actions | First backend approval handoff candidate requires explicit operator approval | Candidate combines approval ticket file write command evidence result recovery audit queue denied path signoff go no-go security and failure reviews | Denied first backend approval handoff paths remain blocked | First backend approval handoff checklist | Go to First Backend Approval Handoff Candidate";

export { buildBackendApprovalHandoffStableKey as buildFirstBackendApprovalHandoffCandidateStableKey };

export function buildFirstBackendApprovalHandoffCandidateModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("first-backend-approval-handoff-candidate");
}

export function summarizeFirstBackendApprovalHandoffCandidate(
  model = buildFirstBackendApprovalHandoffCandidateModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
