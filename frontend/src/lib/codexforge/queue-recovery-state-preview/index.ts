import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_RECOVERY_STATE_PREVIEW_LANGUAGE =
  "Queue recovery state preview | Queue recovery state preview does not execute rollback retry or recovery from the UI | Queue recovery state preview requires explicit operator approval | Queue recovery state previews rollback-ready retry-ready restore-ready stop-ready explain-failure manual-review safety-stop and partial-recovery states | Denied queue recovery paths remain blocked | Queue recovery state checklist | Go to Queue Recovery State Preview";

export function buildQueueRecoveryStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-recovery-state-preview");
}

export function summarizeQueueRecoveryStatePreview(model = buildQueueRecoveryStatePreviewModel()): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
