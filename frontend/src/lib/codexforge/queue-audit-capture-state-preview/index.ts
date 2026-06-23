import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_AUDIT_CAPTURE_STATE_PREVIEW_LANGUAGE =
  "Queue audit capture state preview | Queue audit capture state preview does not persist audit logs from the UI | Queue audit capture state preview requires backend-owned audit capture | Queue audit capture state previews goal context plan diff command approval evidence result recovery operator memory and denied-path audit records | Denied queue audit paths remain blocked | Queue audit capture checklist | Go to Queue Audit Capture State Preview";

export function buildQueueAuditCaptureStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-audit-capture-state-preview");
}

export function summarizeQueueAuditCaptureStatePreview(model = buildQueueAuditCaptureStatePreviewModel()): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
