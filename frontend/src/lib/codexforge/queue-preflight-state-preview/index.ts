import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_PREFLIGHT_STATE_PREVIEW_LANGUAGE =
  "Queue preflight state preview | Queue preflight state preview does not execute preflight checks from the UI | Queue preflight state preview requires explicit operator approval | Queue preflight state previews context readiness plan readiness diff readiness command readiness evidence readiness audit readiness and recovery readiness | Denied queue preflight paths remain blocked | Queue preflight checklist | Go to Queue Preflight State Preview";

export function buildQueuePreflightStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-preflight-state-preview");
}

export function summarizeQueuePreflightStatePreview(model = buildQueuePreflightStatePreviewModel()): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
