import { validateExecutionReadinessInput } from "./execution-readiness-input";
import {
  type ExecutionReadinessInput,
  type ExecutionReadinessPolicy,
  type ExecutionReadinessPolicyRule,
  type ExecutionReadinessPolicyRuleState,
} from "./execution-readiness-types";

function buildRule(
  id: string,
  label: string,
  state: ExecutionReadinessPolicyRuleState,
  detail: string
): ExecutionReadinessPolicyRule {
  return { id, label, state, detail };
}

function inputRequestsBlockedCapability(input: ExecutionReadinessInput | null): boolean {
  if (!input) return false;
  const text = [
    input.taskGoal,
    input.executionIntent,
    input.commandIntent,
    input.mutationIntent,
    ...input.steps.flatMap((step) => [step.label, step.text, step.gate]),
    ...input.riskNotes,
    ...input.approvalGates,
  ]
    .join(" ")
    .toLowerCase();

  return (
    text.includes("broker-execution") ||
    text.includes("live trade") ||
    text.includes("camera execution") ||
    text.includes("desktop control")
  );
}

export function buildExecutionReadinessPolicy(
  input: ExecutionReadinessInput | null = null
): ExecutionReadinessPolicy {
  const validation = input ? validateExecutionReadinessInput(input) : null;
  const mutationIntent = input?.mutationIntent ?? "none";
  const commandIntent = input?.commandIntent ?? "none";
  const requestsBlockedCapability = inputRequestsBlockedCapability(input);
  const blockedReasons = [
    input ? "" : "Execution readiness input is required.",
    validation && !validation.valid ? validation.reasons.join(" ") : "",
    requestsBlockedCapability
      ? "Broker/PC/camera execution is blocked unless a future explicit capability unlock exists."
      : "",
  ].filter(Boolean);
  const readinessAllowed = blockedReasons.length === 0;
  const rules: ExecutionReadinessPolicyRule[] = [
    buildRule(
      "execution-blocked-until-approval",
      "Execution blocked until approval",
      "requires-approval",
      "Execution is blocked by default. Explicit execution approval is required before any future run."
    ),
    buildRule(
      "mutation-requires-safe-patch-preview",
      "Mutation tasks require Safe Patch Preview",
      mutationIntent === "none" ? "passed" : "requires-approval",
      "Mutation tasks require Safe Patch Preview before file writes, apply-diff, or patch application."
    ),
    buildRule(
      "file-writes-require-future-write-approval",
      "File writes require future write approval",
      "requires-approval",
      "write-file and file mutation require a future explicit write approval gate."
    ),
    buildRule(
      "command-execution-requires-run-command-approval",
      "Command execution requires approval",
      commandIntent === "none" ? "passed" : "requires-approval",
      "run-command, run-tests, and build-web-app require future explicit command approval."
    ),
    buildRule(
      "graph-mutations-require-brain-merge-review",
      "Graph mutations require Brain Merge Review",
      mutationIntent === "graph-mutation" ? "requires-approval" : "passed",
      "Brain graph mutations require Brain Merge Review before any future graph write."
    ),
    buildRule(
      "memory-mutations-require-memory-review",
      "Memory mutations require Memory Review",
      mutationIntent === "memory-mutation" ? "requires-approval" : "passed",
      "Memory mutations require Memory Review before persistence or promotion."
    ),
    buildRule(
      "creative-execution-preview-only",
      "Creative execution remains preview-only",
      input?.executionIntent === "creative-preview" ? "preview-only" : "passed",
      "Creative execution remains preview-only unless a future capability gate explicitly allows it."
    ),
    buildRule(
      "broker-pc-camera-execution-blocked",
      "Broker/PC/camera execution blocked",
      requestsBlockedCapability ? "blocked" : "passed",
      "broker-execution, desktop control, and camera execution are blocked unless future explicit capability unlock exists."
    ),
  ];

  const draft: ExecutionReadinessPolicy = {
    id: "execution-readiness-policy",
    inputId: input?.id ?? "no-input",
    readinessAllowed,
    executionAllowed: false,
    executionBlockedUntilApproval: true,
    explicitExecutionApprovalRequired: true,
    mutationTasksRequireSafePatchPreview: true,
    fileWritesRequireFutureWriteApproval: true,
    commandExecutionRequiresFutureRunCommandApproval: true,
    graphMutationsRequireBrainMergeReview: true,
    memoryMutationsRequireMemoryReview: true,
    creativeExecutionPreviewOnly: true,
    brokerExecutionBlocked: true,
    rules,
    blockedReasons,
    requiredApprovals: [
      "Explicit execution approval required.",
      "Safe Patch Preview required before file mutation.",
      "Future write approval required before write-file.",
      "Future run-command approval required before command execution.",
      "Brain Merge Review required before graph mutation.",
      "Memory Review required before memory mutation.",
    ],
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeExecutionReadinessPolicy(draft),
  };
}

export function isExecutionReadinessAllowed(policy: ExecutionReadinessPolicy): boolean {
  return policy.readinessAllowed;
}

export function summarizeExecutionReadinessPolicy(
  policy: ExecutionReadinessPolicy
): string[] {
  return [
    policy.readinessAllowed
      ? "Readiness analysis can pass while execution remains blocked."
      : "Readiness analysis is blocked by policy.",
    "Execution blocked until approval; explicit execution approval is required before any future run.",
    "Safe Patch Preview, write approval, run-command approval, Memory Review, and Brain Merge Review remain separate gates.",
    "broker-execution is blocked by policy; creative execution is preview-only unless a future capability gate allows it.",
  ];
}
