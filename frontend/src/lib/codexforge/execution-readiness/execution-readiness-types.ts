import type {
  ActivatedTaskPlan,
  ActivatedTaskStep,
  TaskActivationDomain,
} from "@/lib/codexforge/task-activation";

export type ExecutionReadinessDomain = TaskActivationDomain;

export type ExecutionIntent =
  | "inspect-only"
  | "review-readiness"
  | "future-execution"
  | "creative-preview";

export type ExecutionMutationIntent =
  | "none"
  | "file-mutation"
  | "apply-diff"
  | "memory-mutation"
  | "graph-mutation"
  | "artifact-export";

export type ExecutionCommandIntent =
  | "none"
  | "run-tests"
  | "run-command"
  | "build-web-app";

export type ExecutionReadinessReference = {
  id: string;
  label: string;
  summary: string;
};

export type ExecutionReadinessStep = {
  id: string;
  sourceStepId: string | null;
  label: string;
  text: string;
  gate: string;
};

export type ExecutionReadinessStepInput =
  | string
  | {
      id?: string | null;
      sourceStepId?: string | null;
      label?: string | null;
      text?: string | null;
      detail?: string | null;
      gate?: string | null;
    }
  | ActivatedTaskStep;

export type ExecutionReadinessInputDraft = {
  plan?: ActivatedTaskPlan | null;
  activatedTaskId?: string | null;
  taskGoal?: string | null;
  taskDomain?: ExecutionReadinessDomain | null;
  steps?: ExecutionReadinessStepInput[] | null;
  impactedFiles?: string[] | null;
  relatedMemories?: Array<string | ExecutionReadinessReference> | null;
  relatedArtifacts?: Array<string | ExecutionReadinessReference> | null;
  relatedRuns?: Array<string | ExecutionReadinessReference> | null;
  riskNotes?: string[] | null;
  approvalGates?: string[] | null;
  suggestedTests?: string[] | null;
  executionIntent?: ExecutionIntent | null;
  mutationIntent?: ExecutionMutationIntent | null;
  commandIntent?: ExecutionCommandIntent | null;
};

export type ExecutionReadinessInput = {
  id: string;
  activatedTaskId: string;
  taskGoal: string;
  taskDomain: ExecutionReadinessDomain;
  steps: ExecutionReadinessStep[];
  impactedFiles: string[];
  relatedMemories: ExecutionReadinessReference[];
  relatedArtifacts: ExecutionReadinessReference[];
  relatedRuns: ExecutionReadinessReference[];
  riskNotes: string[];
  approvalGates: string[];
  suggestedTests: string[];
  executionIntent: ExecutionIntent;
  mutationIntent: ExecutionMutationIntent;
  commandIntent: ExecutionCommandIntent;
  summary: string[];
};

export type ExecutionReadinessInputValidation = {
  id: string;
  inputId: string;
  valid: boolean;
  state: "valid" | "blocked";
  reasons: string[];
  summary: string[];
};

export type ExecutionReadinessPolicyRuleState =
  | "passed"
  | "requires-approval"
  | "preview-only"
  | "blocked";

export type ExecutionReadinessPolicyRule = {
  id: string;
  label: string;
  state: ExecutionReadinessPolicyRuleState;
  detail: string;
};

export type ExecutionReadinessPolicy = {
  id: "execution-readiness-policy";
  inputId: string;
  readinessAllowed: boolean;
  executionAllowed: false;
  executionBlockedUntilApproval: true;
  explicitExecutionApprovalRequired: true;
  mutationTasksRequireSafePatchPreview: true;
  fileWritesRequireFutureWriteApproval: true;
  commandExecutionRequiresFutureRunCommandApproval: true;
  graphMutationsRequireBrainMergeReview: true;
  memoryMutationsRequireMemoryReview: true;
  creativeExecutionPreviewOnly: true;
  brokerExecutionBlocked: true;
  rules: ExecutionReadinessPolicyRule[];
  blockedReasons: string[];
  requiredApprovals: string[];
  summary: string[];
};

export type ExecutionStepReadinessStatus =
  | "ready-for-review"
  | "needs-context"
  | "needs-preview"
  | "needs-approval"
  | "blocked"
  | "not-executable";

export type ExecutionStepPreflightItem = {
  id: string;
  stepId: string;
  label: string;
  readinessStatus: ExecutionStepReadinessStatus;
  requiredContext: string[];
  requiredApprovals: string[];
  suggestedChecks: string[];
  blockedReason: string | null;
  safeNextAction: string;
};

export type ExecutionStepPreflight = {
  id: "execution-step-preflight";
  inputId: string;
  items: ExecutionStepPreflightItem[];
  readyCount: number;
  blockedCount: number;
  summary: string[];
};

export type ExecutionToolPosture =
  | "read-only"
  | "approval-required"
  | "preview-only"
  | "blocked";

export type ExecutionToolNeed = {
  id: string;
  toolName: string;
  posture: ExecutionToolPosture;
  approvalRequired: boolean;
  executionAllowed: boolean;
  reason: string;
};

export type ExecutionToolReadiness = {
  id: "execution-tool-readiness";
  inputId: string;
  tools: ExecutionToolNeed[];
  readOnlyTools: string[];
  approvalRequiredTools: string[];
  previewOnlyTools: string[];
  blockedTools: string[];
  summary: string[];
};

export type ExecutionRiskStatus = "low" | "medium" | "high" | "critical";

export type ExecutionRiskFactorId =
  | "safety-critical-file"
  | "route-api-file"
  | "graph-runtime-file"
  | "memory-merge-file"
  | "tool-policy-file"
  | "smoke-script-touched"
  | "missing-test-plan"
  | "stale-memory-context"
  | "unresolved-contradiction"
  | "broad-impact"
  | "regression-triage-signal"
  | "rollback-sensitive-change"
  | "self-improvement-surface";

export type ExecutionRiskFactor = {
  id: ExecutionRiskFactorId;
  label: string;
  status: ExecutionRiskStatus;
  detail: string;
};

export type ExecutionRiskReadiness = {
  id: "execution-risk-readiness";
  inputId: string;
  status: ExecutionRiskStatus;
  factors: ExecutionRiskFactor[];
  summary: string[];
};

export type ExecutionReadinessTest = {
  id: string;
  label: string;
  command: string;
  reason: string;
  approvalRequired: boolean;
};

export type ExecutionTestReadiness = {
  id: "execution-test-readiness";
  inputId: string;
  tests: ExecutionReadinessTest[];
  summary: string[];
};

export type ExecutionApprovalState =
  | "preview-only"
  | "needs-plan-review"
  | "needs-patch-preview"
  | "needs-tool-approval"
  | "needs-test-plan"
  | "blocked-by-policy"
  | "ready-for-future-execution-approval";

export type ExecutionApprovalGate = {
  id: string;
  state: ExecutionApprovalState;
  active: boolean;
  label: string;
  detail: string;
};

export type ExecutionApprovalReadiness = {
  id: "execution-approval-readiness";
  inputId: string;
  currentState: ExecutionApprovalState;
  activeStates: ExecutionApprovalState[];
  gates: ExecutionApprovalGate[];
  executionApproved: false;
  summary: string[];
};

export type ExecutionReadinessSummary = {
  id: "execution-readiness-summary";
  input: ExecutionReadinessInput;
  policy: ExecutionReadinessPolicy;
  stepPreflight: ExecutionStepPreflight;
  toolReadiness: ExecutionToolReadiness;
  riskReadiness: ExecutionRiskReadiness;
  testReadiness: ExecutionTestReadiness;
  approvalReadiness: ExecutionApprovalReadiness;
  readinessAllowed: boolean;
  executionAllowed: false;
  summary: string[];
};

export function buildExecutionReadinessStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function uniqueExecutionReadinessStrings(values: string[] = []): string[] {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean))
  ).sort();
}
