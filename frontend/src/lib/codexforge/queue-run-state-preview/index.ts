import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_RUN_STATE_PREVIEW_LANGUAGE =
  "Queue run state preview | Queue run state preview does not run commands from the UI | Queue run state preview requires explicit operator approval | Queue run state previews waiting running completed failed timeout canceled blocked denied and manual-review command states | Denied queue run paths remain blocked | Queue run state checklist | Go to Queue Run State Preview";

export function buildQueueRunStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-run-state-preview");
}

export function summarizeQueueRunStatePreview(model = buildQueueRunStatePreviewModel()): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
