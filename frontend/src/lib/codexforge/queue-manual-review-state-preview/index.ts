import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const QUEUE_MANUAL_REVIEW_STATE_PREVIEW_LANGUAGE =
  "Queue manual review state preview | Queue manual review state preview does not execute review actions automatically | Queue manual review state preview requires explicit operator approval | Queue manual review state previews evidence gaps result gaps audit gaps recovery choices denied paths and next operator decisions | Denied queue manual review paths remain blocked | Queue manual review checklist | Go to Queue Manual Review State Preview";

export function buildQueueManualReviewStatePreviewModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("queue-manual-review-state-preview");
}

export function summarizeQueueManualReviewStatePreview(
  model = buildQueueManualReviewStatePreviewModel()
): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
