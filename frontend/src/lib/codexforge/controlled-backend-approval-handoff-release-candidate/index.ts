import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const CONTROLLED_BACKEND_APPROVAL_HANDOFF_RELEASE_CANDIDATE_LANGUAGE =
  "Controlled backend approval handoff release candidate | Controlled backend approval handoff release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery | Controlled backend approval handoff release requires explicit operator approval | Release candidate prepares CodexForge for future backend-owned approval and execution without executing it | Denied controlled backend approval handoff paths remain blocked | Controlled backend approval handoff release checklist | Go to Controlled Backend Approval Handoff Release Candidate";

export { buildBackendApprovalHandoffStableKey as buildControlledBackendApprovalHandoffReleaseCandidateStableKey };

export function buildControlledBackendApprovalHandoffReleaseCandidateModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("controlled-backend-approval-handoff-release-candidate");
}

export function summarizeControlledBackendApprovalHandoffReleaseCandidate(
  model = buildControlledBackendApprovalHandoffReleaseCandidateModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
