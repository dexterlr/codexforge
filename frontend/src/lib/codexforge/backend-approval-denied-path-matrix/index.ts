import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  summarizeBackendApprovalHandoffRouteModel,
  type BackendApprovalHandoffRouteModel,
} from "../backend-approval-handoff";

export const BACKEND_APPROVAL_DENIED_PATH_MATRIX_LANGUAGE =
  "Backend approval denied path matrix | Backend approval denied path matrix does not mutate workflow state | Backend approval denied path matrix requires explicit operator approval | Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion | Denied backend approval matrix paths remain blocked | Backend approval denied path matrix checklist | Go to Backend Approval Denied Path Matrix";

export { buildBackendApprovalHandoffStableKey as buildBackendApprovalDeniedPathMatrixStableKey };

export function buildBackendApprovalDeniedPathMatrixModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("backend-approval-denied-path-matrix");
}

export function summarizeBackendApprovalDeniedPathMatrix(
  model = buildBackendApprovalDeniedPathMatrixModel()
): string {
  return summarizeBackendApprovalHandoffRouteModel(model);
}
