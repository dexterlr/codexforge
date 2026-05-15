import { buildExecutionReadinessPolicy } from "./execution-readiness-policy";
import {
  buildExecutionReadinessStableKey,
  type ExecutionReadinessInput,
  type ExecutionReadinessPolicy,
  type ExecutionReadinessStep,
  type ExecutionStepPreflight,
  type ExecutionStepPreflightItem,
  type ExecutionStepReadinessStatus,
} from "./execution-readiness-types";

function textForStep(step: ExecutionReadinessStep): string {
  return `${step.label} ${step.text} ${step.gate}`.toLowerCase();
}

function statusForStep(args: {
  step: ExecutionReadinessStep;
  input: ExecutionReadinessInput;
  policy: ExecutionReadinessPolicy;
}): ExecutionStepReadinessStatus {
  const text = textForStep(args.step);

  if (!args.step.text.trim()) return "not-executable";
  if (
    text.includes("broker-execution") ||
    text.includes("live trade") ||
    text.includes("desktop control") ||
    text.includes("camera execution")
  ) {
    return "blocked";
  }
  if (
    args.input.mutationIntent !== "none" &&
    (text.includes("patch") ||
      text.includes("diff") ||
      text.includes("write") ||
      text.includes("file") ||
      text.includes("mutation"))
  ) {
    return "needs-preview";
  }
  if (text.includes("memory") && args.input.relatedMemories.length === 0) {
    return "needs-context";
  }
  if (
    text.includes("execute") ||
    text.includes("run") ||
    text.includes("approval") ||
    args.input.commandIntent !== "none"
  ) {
    return "needs-approval";
  }
  if (!args.policy.readinessAllowed) return "blocked";

  return "ready-for-review";
}

function requiredApprovalsForStatus(
  status: ExecutionStepReadinessStatus,
  input: ExecutionReadinessInput,
  policy: ExecutionReadinessPolicy
): string[] {
  if (status === "blocked" || status === "not-executable") return policy.requiredApprovals;
  if (status === "needs-preview") return ["Safe Patch Preview required before file mutation."];
  if (status === "needs-approval") {
    return [
      "Explicit execution approval required.",
      input.commandIntent === "none"
        ? ""
        : "Future run-command approval required before command execution.",
    ].filter(Boolean);
  }
  return [];
}

function safeNextActionForStatus(status: ExecutionStepReadinessStatus): string {
  if (status === "ready-for-review") return "Review the step and keep execution blocked.";
  if (status === "needs-context") return "Add missing context before future execution review.";
  if (status === "needs-preview") return "Open Safe Patch Preview before any file mutation.";
  if (status === "needs-approval") return "Collect explicit approval before any future execution.";
  if (status === "not-executable") return "Rewrite the step into a concrete reviewed action.";
  return "Stop here; this capability is blocked by policy.";
}

export function buildExecutionStepPreflightItem(args: {
  input: ExecutionReadinessInput;
  policy?: ExecutionReadinessPolicy | null;
  step: ExecutionReadinessStep;
  index: number;
}): ExecutionStepPreflightItem {
  const policy = args.policy ?? buildExecutionReadinessPolicy(args.input);
  const readinessStatus = statusForStep({
    step: args.step,
    input: args.input,
    policy,
  });
  const requiredApprovals = requiredApprovalsForStatus(
    readinessStatus,
    args.input,
    policy
  );

  return {
    id: buildExecutionReadinessStableKey(
      "execution-step-preflight-item",
      args.input.id,
      args.index,
      args.step.id
    ),
    stepId: args.step.id,
    label: args.step.label,
    readinessStatus,
    requiredContext: [
      "Activated task goal",
      "Current file state",
      args.input.relatedMemories.length > 0 ? "Related memory context" : "",
      args.input.impactedFiles.length > 0 ? "Impacted file list" : "",
    ].filter(Boolean),
    requiredApprovals,
    suggestedChecks: [
      "Inspect current files before implementation.",
      args.input.mutationIntent === "none"
        ? ""
        : "Confirm Safe Patch Preview before mutation.",
      args.input.commandIntent === "none"
        ? ""
        : "Review command/test approval requirements.",
    ].filter(Boolean),
    blockedReason:
      readinessStatus === "blocked"
        ? "Step requests a blocked capability or policy-disallowed execution path."
        : readinessStatus === "not-executable"
          ? "Step is missing executable detail."
          : null,
    safeNextAction: safeNextActionForStatus(readinessStatus),
  };
}

export function buildExecutionStepPreflight(args: {
  input: ExecutionReadinessInput;
  policy?: ExecutionReadinessPolicy | null;
}): ExecutionStepPreflight {
  const policy = args.policy ?? buildExecutionReadinessPolicy(args.input);
  const items = args.input.steps.map((step, index) =>
    buildExecutionStepPreflightItem({
      input: args.input,
      policy,
      step,
      index,
    })
  );
  const readyCount = items.filter(
    (item) => item.readinessStatus === "ready-for-review"
  ).length;
  const blockedCount = items.filter(
    (item) =>
      item.readinessStatus === "blocked" ||
      item.readinessStatus === "not-executable"
  ).length;
  const draft: ExecutionStepPreflight = {
    id: "execution-step-preflight",
    inputId: args.input.id,
    items,
    readyCount,
    blockedCount,
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeExecutionStepPreflight(draft),
  };
}

export function summarizeExecutionStepPreflight(
  preflight: ExecutionStepPreflight
): string[] {
  return [
    `${preflight.items.length} activated task steps have deterministic preflight records.`,
    `${preflight.readyCount} steps are ready-for-review and ${preflight.blockedCount} steps are blocked or not-executable.`,
    "Each step carries required context, approvals, suggested checks, blocked reason, and safe next action.",
  ];
}
