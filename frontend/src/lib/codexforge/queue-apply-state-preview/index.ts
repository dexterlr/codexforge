import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_APPLY_STATE_PREVIEW_LANGUAGE =
  "Queue apply state preview | Queue apply state preview does not write files or apply diffs from the UI | Queue apply state preview requires explicit operator approval | Queue apply state previews waiting applying applied blocked denied failed rolled-back and manual-review apply states | Denied queue apply paths remain blocked | Queue apply state checklist | Go to Queue Apply State Preview";

export function buildQueueApplyStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-apply-state-preview");
}

export function summarizeQueueApplyStatePreview(model = buildQueueApplyStatePreviewModel()): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
