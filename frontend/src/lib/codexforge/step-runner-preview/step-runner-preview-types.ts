import type {
  ActivatedTaskPlan,
  ActivatedTaskStep,
  TaskActivationDomain,
} from "@/lib/codexforge/task-activation";
import type { ExecutionReadinessInput } from "@/lib/codexforge/execution-readiness";

export type StepRunnerDomain = TaskActivationDomain;

export type StepRunnerReadinessStatus =
  | "ready"
  | "needs-review"
  | "missing"
  | "blocked";

export type StepRunnerMutationIntent =
  | "none"
  | "file-mutation"
  | "apply-diff"
  | "memory-mutation"
  | "graph-mutation"
  | "artifact-export";

export type StepRunnerCommandIntent =
  | "none"
  | "run-tests"
  | "run-command"
  | "build-web-app";

export type StepRunnerApprovalState =
  | "not-requested"
  | "pending"
  | "approved"
  | "rejected";

export type StepRunnerReference = {
  id: string;
  label: string;
  summary: string;
};

export type StepRunnerInputDraft = {
  plan?: ActivatedTaskPlan | null;
  readiness?: ExecutionReadinessInput | null;
  step?: ActivatedTaskStep | string | null;
  activeTaskId?: string | null;
  stepId?: string | null;
  stepLabel?: string | null;
  stepIndex?: number | null;
  taskGoal?: string | null;
  taskDomain?: StepRunnerDomain | null;
  impactedFiles?: string[] | null;
  relatedMemories?: Array<string | StepRunnerReference> | null;
  relatedArtifacts?: Array<string | StepRunnerReference> | null;
  relatedRuns?: Array<string | StepRunnerReference> | null;
  readinessStatus?: StepRunnerReadinessStatus | null;
  mutationIntent?: StepRunnerMutationIntent | null;
  commandIntent?: StepRunnerCommandIntent | null;
  selectedToolIntent?: string | null;
  approvalState?: StepRunnerApprovalState | null;
};

export type StepRunnerInput = {
  id: string;
  activeTaskId: string;
  stepId: string;
  stepLabel: string;
  stepIndex: number;
  taskGoal: string;
  taskDomain: StepRunnerDomain;
  impactedFiles: string[];
  relatedMemories: StepRunnerReference[];
  relatedArtifacts: StepRunnerReference[];
  relatedRuns: StepRunnerReference[];
  readinessStatus: StepRunnerReadinessStatus;
  mutationIntent: StepRunnerMutationIntent;
  commandIntent: StepRunnerCommandIntent;
  selectedToolIntent: string;
  approvalState: StepRunnerApprovalState;
  summary: string[];
};

export type StepRunnerInputValidation = {
  id: string;
  inputId: string;
  valid: boolean;
  state: "valid" | "blocked";
  reasons: string[];
  summary: string[];
};

export type StepRunnerPolicyRuleState =
  | "passed"
  | "approval-required"
  | "preview-only"
  | "blocked";

export type StepRunnerPolicyRule = {
  id: string;
  label: string;
  state: StepRunnerPolicyRuleState;
  detail: string;
};

export type StepRunnerPolicy = {
  id: "step-runner-policy";
  inputId: string;
  previewAllowed: boolean;
  executionAllowed: false;
  executionBlockedByDefault: true;
  explicitStepRunApprovalRequired: true;
  readOnlyPlanningTools: string[];
  futureApprovalRequiredTools: string[];
  blockedTools: string[];
  previewOnlyTools: string[];
  fileMutationRequiresSafePatchPreview: true;
  graphMutationRequiresBrainMergeReview: true;
  memoryMutationRequiresMemoryReview: true;
  missingReadinessBlocksFutureRun: boolean;
  failedPolicyBlocksFutureRunPacket: boolean;
  futureRunBlockedReasons: string[];
  rules: StepRunnerPolicyRule[];
  requiredApprovals: string[];
  summary: string[];
};

export type StepRunnerToolMode =
  | "read-only"
  | "preview-only"
  | "approval-required"
  | "blocked";

export type StepRunnerToolPlanItem = {
  id: string;
  toolName: string;
  mode: StepRunnerToolMode;
  reason: string;
  approvalRequired: boolean;
  blocked: boolean;
  sideEffectSummary: string;
  safeAlternative: string;
  requiredApprovalLabel: string | null;
};

export type StepRunnerToolPlan = {
  id: "step-runner-tool-plan";
  inputId: string;
  proposedTool: StepRunnerToolPlanItem;
  tools: StepRunnerToolPlanItem[];
  readOnlyTools: string[];
  previewOnlyTools: string[];
  approvalRequiredTools: string[];
  blockedTools: string[];
  summary: string[];
};

export type StepRunnerRiskLevel = "low" | "medium" | "high" | "critical";

export type StepRunnerApprovalChecklistItem = {
  id: string;
  label: string;
  checked: false;
  required: true;
};

export type StepRunnerApprovalPacket = {
  id: string;
  taskId: string;
  stepId: string;
  proposedAction: string;
  proposedToolPosture: StepRunnerToolMode;
  riskLevel: StepRunnerRiskLevel;
  requiredApprovals: string[];
  approvalChecklist: StepRunnerApprovalChecklistItem[];
  noRunGuarantee: string;
  noFileMutationGuarantee: string;
  futureRunBlockedUntilApproval: true;
  operatorNote: string;
  summary: string[];
};

export type StepRunnerApprovalPacketValidation = {
  id: string;
  packetId: string;
  valid: boolean;
  state: "valid" | "blocked";
  reasons: string[];
  summary: string[];
};

export type StepRunnerDryRunCheck = {
  id: string;
  label: string;
  detail: string;
  required: boolean;
};

export type StepRunnerDryRunPlan = {
  id: "step-runner-dry-run-plan";
  inputId: string;
  checksBeforeExecution: StepRunnerDryRunCheck[];
  filesToInspect: string[];
  memoriesToVerify: string[];
  policiesToVerify: string[];
  testsToRunAfterFutureExecution: string[];
  rollbackNote: string;
  stopConditions: string[];
  summary: string[];
};

export type StepRunnerResultPreview = {
  id: "step-runner-result-preview";
  inputId: string;
  expectedSuccessfulOutput: string;
  expectedFailureModes: string[];
  expectedArtifacts: string[];
  expectedGraphMemoryNotes: string[];
  expectedTestEvidence: string[];
  postExecutionDisplay: string[];
  previewOnlyNotice: string;
  summary: string[];
};

export type StepRunnerLedgerState =
  | "selected"
  | "previewed"
  | "policy-blocked"
  | "approval-required"
  | "dry-run-planned"
  | "future-run-ready"
  | "rejected"
  | "reset";

export type StepRunnerLedgerItem = {
  id: string;
  state: StepRunnerLedgerState;
  label: string;
  detail: string;
  inputId: string;
  stepId: string;
};

export type StepRunnerLedger = {
  id: "step-runner-ledger";
  inputId: string;
  items: StepRunnerLedgerItem[];
  summary: string[];
};

export type StepRunnerPreviewSummary = {
  id: "step-runner-preview-summary";
  input: StepRunnerInput;
  validation: StepRunnerInputValidation;
  policy: StepRunnerPolicy;
  toolPlan: StepRunnerToolPlan;
  approvalPacket: StepRunnerApprovalPacket;
  approvalPacketValidation: StepRunnerApprovalPacketValidation;
  dryRunPlan: StepRunnerDryRunPlan;
  resultPreview: StepRunnerResultPreview;
  ledger: StepRunnerLedger;
  previewAllowed: boolean;
  stepRunBlocked: true;
  summary: string[];
};

export function buildStepRunnerPreviewStableKey(
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

export function uniqueStepRunnerPreviewStrings(values: string[] = []): string[] {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean))
  ).sort();
}
