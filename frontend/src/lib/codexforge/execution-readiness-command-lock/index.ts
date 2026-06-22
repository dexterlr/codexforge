import {
  buildControlledExecutionReadinessGateRouteModel,
  buildControlledExecutionReadinessGateStableKey,
  summarizeControlledExecutionReadinessGateRouteModel,
  type ControlledExecutionReadinessGateRouteModel,
} from "../controlled-execution-readiness-gate";

export const EXECUTION_READINESS_COMMAND_LOCK_LANGUAGE =
  "Execution readiness command lock | Execution readiness command lock does not run commands | Execution readiness command lock requires explicit operator approval | Command lock confirms allowlist arguments working directory environment evidence result and recovery review before execution readiness can pass | Denied execution readiness command paths remain blocked | Execution readiness command lock checklist | Go to Execution Readiness Command Lock";

export { buildControlledExecutionReadinessGateStableKey as buildExecutionReadinessCommandLockStableKey };

export function buildExecutionReadinessCommandLockModel(): ControlledExecutionReadinessGateRouteModel {
  return buildControlledExecutionReadinessGateRouteModel("execution-readiness-command-lock");
}

export function summarizeExecutionReadinessCommandLock(model = buildExecutionReadinessCommandLockModel()): string {
  return summarizeControlledExecutionReadinessGateRouteModel(model);
}
