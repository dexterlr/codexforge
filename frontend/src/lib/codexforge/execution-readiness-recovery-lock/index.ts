import {
  buildControlledExecutionReadinessGateRouteModel,
  buildControlledExecutionReadinessGateStableKey,
  summarizeControlledExecutionReadinessGateRouteModel,
  type ControlledExecutionReadinessGateRouteModel,
} from "../controlled-execution-readiness-gate";

export const EXECUTION_READINESS_RECOVERY_LOCK_LANGUAGE =
  "Execution readiness recovery lock | Execution readiness recovery lock does not execute recovery | Execution readiness recovery lock requires explicit operator approval | Recovery lock confirms rollback retry stop restore explain-failure and manual-review options before execution readiness can pass | Denied execution readiness recovery paths remain blocked | Execution readiness recovery lock checklist | Go to Execution Readiness Recovery Lock";

export { buildControlledExecutionReadinessGateStableKey as buildExecutionReadinessRecoveryLockStableKey };

export function buildExecutionReadinessRecoveryLockModel(): ControlledExecutionReadinessGateRouteModel {
  return buildControlledExecutionReadinessGateRouteModel("execution-readiness-recovery-lock");
}

export function summarizeExecutionReadinessRecoveryLock(model = buildExecutionReadinessRecoveryLockModel()): string {
  return summarizeControlledExecutionReadinessGateRouteModel(model);
}
