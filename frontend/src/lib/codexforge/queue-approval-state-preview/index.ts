import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_APPROVAL_STATE_PREVIEW_LANGUAGE =
  "Queue approval state preview | Queue approval state preview does not persist approvals from the UI | Queue approval state preview requires explicit human approval | Queue approval state previews needs-approval approved expired stale denied blocked and replay-protected approval states | Denied queue approval paths remain blocked | Queue approval state checklist | Go to Queue Approval State Preview";

export function buildQueueApprovalStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-approval-state-preview");
}

export function summarizeQueueApprovalStatePreview(model = buildQueueApprovalStatePreviewModel()): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
