import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_RESULT_CAPTURE_STATE_PREVIEW_LANGUAGE =
  "Queue result capture state preview | Queue result capture state preview does not persist results from the UI | Queue result capture state preview requires backend-owned result capture | Queue result capture state previews pending success blocked denied failed timeout canceled retryable recovered and operator-accepted result states | Denied queue result paths remain blocked | Queue result capture checklist | Go to Queue Result Capture State Preview";

export function buildQueueResultCaptureStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-result-capture-state-preview");
}

export function summarizeQueueResultCaptureStatePreview(
  model = buildQueueResultCaptureStatePreviewModel()
): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
