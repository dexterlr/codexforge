import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_ITEM_MODEL_PREVIEW_LANGUAGE =
  "Queue item model preview | Queue item model preview does not persist queue state from the UI | Queue item model preview requires explicit operator approval before execution | Queue item model previews goal context plan diff commands approval evidence result audit recovery and memory references | Denied queue item paths remain blocked | Queue item model checklist | Go to Queue Item Model Preview";

export function buildQueueItemModelPreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-item-model-preview");
}

export function summarizeQueueItemModelPreview(model = buildQueueItemModelPreviewModel()): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
