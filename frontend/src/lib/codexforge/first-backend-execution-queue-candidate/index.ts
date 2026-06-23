import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const FIRST_BACKEND_EXECUTION_QUEUE_CANDIDATE_LANGUAGE =
  "First backend execution queue candidate | First backend execution queue candidate does not create real queue jobs from the UI | First backend execution queue candidate requires explicit operator approval | Candidate combines queue item approval preflight apply run evidence result audit blocked denied failed canceled manual review recovery and allowed transitions | Denied first backend execution queue paths remain blocked | First backend execution queue checklist | Go to First Backend Execution Queue Candidate";

export function buildFirstBackendExecutionQueueCandidateModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("first-backend-execution-queue-candidate");
}

export function summarizeFirstBackendExecutionQueueCandidate(
  model = buildFirstBackendExecutionQueueCandidateModel()
): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
