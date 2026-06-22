import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_APPROVAL_HANDOFF_BOUNDARY_LANGUAGE =
  "Backend approval handoff boundary | Backend approval handoff boundary does not execute backend actions | Backend approval handoff requires explicit operator approval | Handoff boundary separates frontend preview from backend-owned approval and execution | Denied backend approval handoff paths remain blocked | Backend approval handoff checklist | Go to Backend Approval Handoff Boundary";

export { buildBackendApprovalHandoffStableKey as buildBackendApprovalHandoffBoundaryStableKey };

export function buildBackendApprovalHandoffBoundaryModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-approval-handoff-boundary");
}

export function summarizeBackendApprovalHandoffBoundary(
  model = buildBackendApprovalHandoffBoundaryModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
