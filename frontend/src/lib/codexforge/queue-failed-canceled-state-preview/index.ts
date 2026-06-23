import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_FAILED_CANCELED_STATE_PREVIEW_LANGUAGE =
  "Queue failed canceled state preview | Queue failed canceled state preview does not execute recovery from the UI | Queue failed canceled state preview requires explicit operator approval | Queue failed canceled state previews failed apply failed command failed evidence failed result failed audit canceled by operator timeout and manual-stop states | Denied queue failed canceled paths remain blocked | Queue failed canceled checklist | Go to Queue Failed Canceled State Preview";

export function buildQueueFailedCanceledStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-failed-canceled-state-preview");
}

export function summarizeQueueFailedCanceledStatePreview(
  model = buildQueueFailedCanceledStatePreviewModel()
): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
