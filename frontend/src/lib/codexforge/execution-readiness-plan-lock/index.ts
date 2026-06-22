import {
  buildControlledExecutionReadinessGateRouteModel,
  buildControlledExecutionReadinessGateStableKey,
  summarizeControlledExecutionReadinessGateRouteModel,
  type ControlledExecutionReadinessGateRouteModel,
} from "../controlled-execution-readiness-gate";

export const EXECUTION_READINESS_PLAN_LOCK_LANGUAGE =
  "Execution readiness plan lock | Execution readiness plan lock does not execute plans | Execution readiness plan lock requires explicit operator approval | Plan lock confirms planned file and command actions are reviewed before execution readiness can pass | Denied execution readiness plan paths remain blocked | Execution readiness plan lock checklist | Go to Execution Readiness Plan Lock";

export { buildControlledExecutionReadinessGateStableKey as buildExecutionReadinessPlanLockStableKey };

export function buildExecutionReadinessPlanLockModel(): ControlledExecutionReadinessGateRouteModel {
  return buildControlledExecutionReadinessGateRouteModel("execution-readiness-plan-lock");
}

export function summarizeExecutionReadinessPlanLock(model = buildExecutionReadinessPlanLockModel()): string {
  return summarizeControlledExecutionReadinessGateRouteModel(model);
}
