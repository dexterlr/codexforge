import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_EVIDENCE_CAPTURE_STATE_PREVIEW_LANGUAGE =
  "Queue evidence capture state preview | Queue evidence capture state preview does not persist evidence from the UI | Queue evidence capture state preview requires backend-owned evidence capture | Queue evidence capture state previews pending capturing captured missing redacted failed blocked and manual-review evidence states | Denied queue evidence paths remain blocked | Queue evidence capture checklist | Go to Queue Evidence Capture State Preview";

export function buildQueueEvidenceCaptureStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-evidence-capture-state-preview");
}

export function summarizeQueueEvidenceCaptureStatePreview(
  model = buildQueueEvidenceCaptureStatePreviewModel()
): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
