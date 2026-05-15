import { buildExecutionReadinessPolicy } from "./execution-readiness-policy";
import { buildExecutionTestReadiness } from "./execution-test-readiness";
import { buildExecutionToolReadiness } from "./execution-tool-readiness";
import {
  buildExecutionReadinessStableKey,
  type ExecutionApprovalGate,
  type ExecutionApprovalReadiness,
  type ExecutionApprovalState,
  type ExecutionReadinessInput,
  type ExecutionReadinessPolicy,
  type ExecutionTestReadiness,
  type ExecutionToolReadiness,
} from "./execution-readiness-types";

function buildGate(
  inputId: string,
  state: ExecutionApprovalState,
  active: boolean,
  label: string,
  detail: string
): ExecutionApprovalGate {
  return {
    id: buildExecutionReadinessStableKey("execution-approval-gate", inputId, state),
    state,
    active,
    label,
    detail,
  };
}

function chooseCurrentState(gates: ExecutionApprovalGate[]): ExecutionApprovalState {
  const order: ExecutionApprovalState[] = [
    "blocked-by-policy",
    "needs-patch-preview",
    "needs-tool-approval",
    "needs-test-plan",
    "needs-plan-review",
    "preview-only",
    "ready-for-future-execution-approval",
  ];

  return order.find((state) => gates.some((gate) => gate.state === state && gate.active)) ?? "preview-only";
}

export function buildExecutionApprovalReadiness(args: {
  input: ExecutionReadinessInput;
  policy?: ExecutionReadinessPolicy | null;
  toolReadiness?: ExecutionToolReadiness | null;
  testReadiness?: ExecutionTestReadiness | null;
}): ExecutionApprovalReadiness {
  const policy = args.policy ?? buildExecutionReadinessPolicy(args.input);
  const toolReadiness = args.toolReadiness ?? buildExecutionToolReadiness(args.input);
  const testReadiness = args.testReadiness ?? buildExecutionTestReadiness(args.input);
  const blockedByPolicy = !policy.readinessAllowed;
  const needsPatchPreview =
    args.input.mutationIntent === "file-mutation" ||
    args.input.mutationIntent === "apply-diff";
  const needsToolApproval =
    toolReadiness.approvalRequiredTools.length > 0 ||
    toolReadiness.previewOnlyTools.length > 0;
  const needsTestPlan = testReadiness.tests.length === 0;
  const readyForFutureApproval = !blockedByPolicy && !needsTestPlan;
  const gates = [
    buildGate(
      args.input.id,
      "preview-only",
      true,
      "Preview-only",
      "Execution readiness is a cockpit only; it does not execute."
    ),
    buildGate(
      args.input.id,
      "needs-plan-review",
      true,
      "Needs plan review",
      "Activated task steps must be reviewed before future execution approval."
    ),
    buildGate(
      args.input.id,
      "needs-patch-preview",
      needsPatchPreview,
      "Needs patch preview",
      "Safe Patch Preview is required before file mutation or apply-diff."
    ),
    buildGate(
      args.input.id,
      "needs-tool-approval",
      needsToolApproval,
      "Needs tool approval",
      "write-file, apply-diff, run-command, run-tests, build-web-app, and creative render tools require approval."
    ),
    buildGate(
      args.input.id,
      "needs-test-plan",
      needsTestPlan,
      "Needs test plan",
      "A suggested test/readiness checklist must exist before future execution approval."
    ),
    buildGate(
      args.input.id,
      "blocked-by-policy",
      blockedByPolicy,
      "Blocked by policy",
      "Policy blocks readiness because input is invalid or requests a blocked capability."
    ),
    buildGate(
      args.input.id,
      "ready-for-future-execution-approval",
      readyForFutureApproval,
      "Ready for future execution approval",
      "Readiness review can proceed to a future explicit execution approval gate; execution is still blocked."
    ),
  ];
  const activeStates = gates
    .filter((gate) => gate.active)
    .map((gate) => gate.state);
  const draft: ExecutionApprovalReadiness = {
    id: "execution-approval-readiness",
    inputId: args.input.id,
    currentState: chooseCurrentState(gates),
    activeStates,
    gates,
    executionApproved: false,
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeExecutionApprovalReadiness(draft),
  };
}

export function summarizeExecutionApprovalReadiness(
  readiness: ExecutionApprovalReadiness
): string[] {
  return [
    `Approval readiness state is ${readiness.currentState}.`,
    readiness.activeStates.includes("ready-for-future-execution-approval")
      ? "ready-for-future-execution-approval is available, but execution remains blocked until explicit approval."
      : "Future execution approval is not ready yet.",
    "No plan, diff, tool, or test approval is auto-granted.",
  ];
}
