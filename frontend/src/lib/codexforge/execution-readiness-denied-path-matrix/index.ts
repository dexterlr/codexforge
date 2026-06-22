import {
  buildControlledExecutionReadinessGateRouteModel,
  buildControlledExecutionReadinessGateStableKey,
  summarizeControlledExecutionReadinessGateRouteModel,
  type ControlledExecutionReadinessGateRouteModel,
} from "../controlled-execution-readiness-gate";

export const EXECUTION_READINESS_DENIED_PATH_MATRIX_LANGUAGE =
  "Execution readiness denied path matrix | Execution readiness denied path matrix does not mutate workflow state | Execution readiness denied path matrix requires explicit operator approval | Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion | Denied execution readiness matrix paths remain blocked | Execution readiness denied path matrix checklist | Go to Execution Readiness Denied Path Matrix";

export { buildControlledExecutionReadinessGateStableKey as buildExecutionReadinessDeniedPathMatrixStableKey };

export function buildExecutionReadinessDeniedPathMatrixModel(): ControlledExecutionReadinessGateRouteModel {
  return buildControlledExecutionReadinessGateRouteModel("execution-readiness-denied-path-matrix");
}

export function summarizeExecutionReadinessDeniedPathMatrix(model = buildExecutionReadinessDeniedPathMatrixModel()): string {
  return summarizeControlledExecutionReadinessGateRouteModel(model);
}
