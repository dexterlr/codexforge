import {
  buildControlledExecutionReadinessGateRouteModel,
  buildControlledExecutionReadinessGateStableKey,
  summarizeControlledExecutionReadinessGateRouteModel,
  type ControlledExecutionReadinessGateRouteModel,
} from "../controlled-execution-readiness-gate";

export const EXECUTION_READINESS_DIFF_LOCK_LANGUAGE =
  "Execution readiness diff lock | Execution readiness diff lock does not write files or apply diffs | Execution readiness diff lock requires explicit operator approval | Diff lock confirms path guard before after diff rollback and denied mutation review before execution readiness can pass | Denied execution readiness diff paths remain blocked | Execution readiness diff lock checklist | Go to Execution Readiness Diff Lock";

export { buildControlledExecutionReadinessGateStableKey as buildExecutionReadinessDiffLockStableKey };

export function buildExecutionReadinessDiffLockModel(): ControlledExecutionReadinessGateRouteModel {
  return buildControlledExecutionReadinessGateRouteModel("execution-readiness-diff-lock");
}

export function summarizeExecutionReadinessDiffLock(model = buildExecutionReadinessDiffLockModel()): string {
  return summarizeControlledExecutionReadinessGateRouteModel(model);
}
