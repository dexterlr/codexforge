import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_BLOCKED_DENIED_STATE_PREVIEW_LANGUAGE =
  "Queue blocked denied state preview | Queue blocked denied state preview does not mutate workflow state | Queue blocked denied state preview requires explicit operator approval | Queue blocked denied state previews blocked path blocked command blocked approval blocked model blocked provider blocked connector blocked memory blocked recovery and denied execution states | Denied queue blocked paths remain blocked | Queue blocked denied checklist | Go to Queue Blocked Denied State Preview";

export function buildQueueBlockedDeniedStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-blocked-denied-state-preview");
}

export function summarizeQueueBlockedDeniedStatePreview(
  model = buildQueueBlockedDeniedStatePreviewModel()
): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
