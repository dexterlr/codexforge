import { buildGuardedApplyCandidateStableId, type GuardedApplyExecutionPlan, type GuardedApplyExecutionStep } from "./guarded-apply-candidate-types";

export function buildGuardedApplyExecutionStep(id: string, label: string, detail: string): GuardedApplyExecutionStep {
  return { id, label, detail, phase83DesignOnly: true };
}

export function buildGuardedApplyExecutionPlan(): GuardedApplyExecutionPlan {
  const steps = [
    buildGuardedApplyExecutionStep("receive-exact-approved-request", "Receive exact approved request", "Request must identify one file, one preview diff, one approval packet, and latest message/request id."),
    buildGuardedApplyExecutionStep("verify-policy", "Verify policy", "Re-check preview, one-file scope, approval, rollback, validation, result, and high-risk blockers."),
    buildGuardedApplyExecutionStep("verify-one-file-scope", "Verify one-file scope", "Reject multi-file, binary, delete/rename, package/lock/config/tool-policy/brain-runtime edits."),
    buildGuardedApplyExecutionStep("verify-approval-contract", "Verify approval contract", "Approval must be tied to exact diff hash/label and newest request."),
    buildGuardedApplyExecutionStep("verify-rollback-contract", "Verify rollback contract", "Rollback guidance must be explicit before any apply."),
    buildGuardedApplyExecutionStep("verify-validation-contract", "Verify validation contract", "Validation is a separate checklist and is not auto-run."),
    buildGuardedApplyExecutionStep("use-existing-guarded-boundary", "Use existing guarded apply boundary only if present", "Future implementation must use existing approved guarded boundary or add a dedicated API/tool boundary with policy checks."),
    buildGuardedApplyExecutionStep("capture-apply-evidence", "Capture apply evidence", "Apply evidence must be captured for result handoff and rollback decisions."),
    buildGuardedApplyExecutionStep("stop-before-validation", "Stop before validation", "No combined apply and run validation button."),
    buildGuardedApplyExecutionStep("route-to-validation-checklist", "Route to validation checklist", "Operator runs or approves validation separately."),
  ];
  const plan: GuardedApplyExecutionPlan = {
    id: buildGuardedApplyCandidateStableId("execution-plan", steps.map((step) => step.id).join("|")),
    steps,
    executionAllowed: false,
    designOnlyPhase83: true,
    usesExistingGuardedApplyBoundaryOnlyIfPresent: true,
    noDirectWriteFileApplyDiffOrRunCommand: true,
    noCombinedApplyAndRunValidationStep: true,
    summary: [],
  };
  return { ...plan, summary: summarizeGuardedApplyExecutionPlan(plan) };
}

export function summarizeGuardedApplyExecutionPlan(plan: GuardedApplyExecutionPlan): string[] {
  return [
    `Execution plan has ${plan.steps.length} design-only step(s).`,
    "Execution plan says design-only in Phase 83.",
    "Execution plan says use existing guarded apply boundary only if present.",
    "No direct write-file/apply-diff calls from UI, no direct run-command calls, and no combined apply+run step.",
  ];
}
