import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const BACKEND_EXECUTION_QUEUE_BOUNDARY_LANGUAGE =
  "Backend execution queue boundary | Backend execution queue boundary does not create queue jobs from the UI | Backend execution queue requires explicit operator approval before execution | Backend execution queue prepares durable backend-owned work item state without broad execution | Denied backend execution queue paths remain blocked | Backend execution queue checklist | Go to Backend Execution Queue Boundary";

export function buildBackendExecutionQueueBoundaryModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("backend-execution-queue-boundary");
}

export function summarizeBackendExecutionQueueBoundary(
  model = buildBackendExecutionQueueBoundaryModel()
): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}
