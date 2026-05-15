import { validateStepRunnerInput } from "./step-runner-input";
import {
  type StepRunnerInput,
  type StepRunnerPolicy,
  type StepRunnerPolicyRule,
  type StepRunnerPolicyRuleState,
} from "./step-runner-preview-types";

const READ_ONLY_PLANNING_TOOLS = ["read-file", "list-files", "search-project"];
const FUTURE_APPROVAL_REQUIRED_TOOLS = [
  "write-file",
  "apply-diff",
  "run-command",
  "run-tests",
  "build-web-app",
];
const BLOCKED_TOOLS = ["broker-execution"];
const PREVIEW_ONLY_TOOLS = [
  "creative-render",
  "render",
  "video-render",
  "blender-python",
  "image-generation",
];

function buildRule(
  id: string,
  label: string,
  state: StepRunnerPolicyRuleState,
  detail: string
): StepRunnerPolicyRule {
  return { id, label, state, detail };
}

function inputRequestsBrokerExecution(input: StepRunnerInput | null): boolean {
  if (!input) return false;
  const text = [
    input.taskGoal,
    input.stepLabel,
    input.selectedToolIntent,
    input.mutationIntent,
    input.commandIntent,
  ]
    .join(" ")
    .toLowerCase();

  return text.includes("broker-execution");
}

export function buildStepRunnerPolicy(
  input: StepRunnerInput | null = null
): StepRunnerPolicy {
  const validation = input ? validateStepRunnerInput(input) : null;
  const inputValid = validation?.valid === true;
  const requestsBrokerExecution = inputRequestsBrokerExecution(input);
  const missingReadiness =
    !input || input.readinessStatus === "missing" || input.readinessStatus === "blocked";
  const failedPolicyBlocksFutureRunPacket = !inputValid || requestsBrokerExecution;
  const futureRunBlockedReasons = [
    "Future run is blocked until explicit step-run approval is granted.",
    missingReadiness ? "Missing readiness blocks future run." : "",
    requestsBrokerExecution ? "broker-execution is always blocked." : "",
    failedPolicyBlocksFutureRunPacket ? "Failed policy blocks future run packet." : "",
  ].filter(Boolean);
  const requiredApprovals = [
    "Explicit step-run approval required.",
    "Safe Patch Preview required before file mutation.",
    "Future write approval required before write-file or apply-diff.",
    "Future run approval required before run-command, run-tests, or build-web-app.",
    "Brain Merge Review required before graph mutation.",
    "Memory Review required before memory mutation.",
  ];
  const rules: StepRunnerPolicyRule[] = [
    buildRule(
      "preview-allowed-when-input-valid",
      "Preview allowed when input is valid",
      inputValid ? "passed" : "blocked",
      "Preview is allowed when Step Runner Input validates; invalid input blocks packet preparation."
    ),
    buildRule(
      "execution-blocked-by-default",
      "Execution blocked by default",
      "approval-required",
      "No step execution in Phase 25. Future run requires approval."
    ),
    buildRule(
      "read-only-planning-tools",
      "Read-only planning tools",
      "passed",
      "read-file, list-files, and search-project are read-only planning tools."
    ),
    buildRule(
      "future-approval-required-tools",
      "Future approval required tools",
      "approval-required",
      "write-file, apply-diff, run-command, run-tests, and build-web-app require future explicit approval."
    ),
    buildRule(
      "broker-execution-blocked",
      "broker-execution blocked",
      requestsBrokerExecution ? "blocked" : "passed",
      "broker-execution is always blocked by Step Runner Policy."
    ),
    buildRule(
      "creative-tools-preview-only",
      "Creative tools preview-only",
      "preview-only",
      "Creative tools remain preview-only unless a future capability gate allows them."
    ),
    buildRule(
      "file-mutation-requires-safe-patch-preview",
      "File mutation requires Safe Patch Preview",
      input?.mutationIntent === "file-mutation" || input?.mutationIntent === "apply-diff"
        ? "approval-required"
        : "passed",
      "File mutation requires Safe Patch Preview before any future write path."
    ),
    buildRule(
      "graph-mutation-requires-brain-merge-review",
      "Graph mutation requires Brain Merge Review",
      input?.mutationIntent === "graph-mutation" ? "approval-required" : "passed",
      "Graph mutation requires Brain Merge Review before any future graph update."
    ),
    buildRule(
      "memory-mutation-requires-memory-review",
      "Memory mutation requires Memory Review",
      input?.mutationIntent === "memory-mutation" ? "approval-required" : "passed",
      "Memory mutation requires Memory Review before persistence or promotion."
    ),
    buildRule(
      "missing-readiness-blocks-future-run",
      "Missing readiness blocks future run",
      missingReadiness ? "blocked" : "passed",
      "Missing readiness blocks future run even when the preview packet can still explain the blocker."
    ),
  ];
  const draft: StepRunnerPolicy = {
    id: "step-runner-policy",
    inputId: input?.id ?? "no-input",
    previewAllowed: inputValid,
    executionAllowed: false,
    executionBlockedByDefault: true,
    explicitStepRunApprovalRequired: true,
    readOnlyPlanningTools: READ_ONLY_PLANNING_TOOLS,
    futureApprovalRequiredTools: FUTURE_APPROVAL_REQUIRED_TOOLS,
    blockedTools: BLOCKED_TOOLS,
    previewOnlyTools: PREVIEW_ONLY_TOOLS,
    fileMutationRequiresSafePatchPreview: true,
    graphMutationRequiresBrainMergeReview: true,
    memoryMutationRequiresMemoryReview: true,
    missingReadinessBlocksFutureRun: missingReadiness,
    failedPolicyBlocksFutureRunPacket,
    futureRunBlockedReasons,
    rules,
    requiredApprovals,
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeStepRunnerPolicy(draft),
  };
}

export function isStepRunnerPreviewAllowed(policy: StepRunnerPolicy): boolean {
  return policy.previewAllowed;
}

export function isStepRunBlocked(policy: StepRunnerPolicy): boolean {
  return (
    policy.executionBlockedByDefault ||
    policy.futureRunBlockedReasons.length > 0 ||
    policy.failedPolicyBlocksFutureRunPacket
  );
}

export function summarizeStepRunnerPolicy(policy: StepRunnerPolicy): string[] {
  return [
    policy.previewAllowed
      ? "Step Runner Preview is allowed for this input."
      : "Step Runner Preview is blocked until input is valid.",
    "No step execution in Phase 25; execution is blocked by default and Future run requires approval.",
    "write-file, apply-diff, run-command, run-tests, and build-web-app require future explicit approval; read-file, list-files, and search-project stay read-only.",
    "broker-execution is always blocked; file mutation requires Safe Patch Preview, graph mutation requires Brain Merge Review, and memory mutation requires Memory Review.",
  ];
}
