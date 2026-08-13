import type {
  TaskReviewState,
  TaskRiskLevel,
  TaskSafeNextAction,
  TaskSuggestion,
  TaskSuggestionKind,
} from "@/lib/codexforge/task-autopilot";

export type TaskActivationReadiness =
  | "needs-review"
  | "accepted"
  | "blocked"
  | "preview-only"
  | "handoff-ready";

export type TaskActivationDomain =
  | "general"
  | "web"
  | "research"
  | "debug"
  | "game-server"
  | "movie"
  | "video"
  | "comfyui"
  | "unreal"
  | "automation";

export type TaskActivationRequest = {
  id: string;
  taskSuggestionId: string;
  suggestionReviewState: TaskReviewState;
  suggestionKind: TaskSuggestionKind;
  suggestionSafeNextAction: TaskSafeNextAction;
  approved: boolean;
  approvalNote: string;
  sourceSignalIds: string[];
  suggestedTaskTitle: string;
  goal: string;
  domain: TaskActivationDomain;
  tags: string[];
  steps: string[];
  risks: string[];
  riskLevel: TaskRiskLevel;
  impactedFiles: string[];
  relatedMemoryIds: string[];
  relatedArtifactIds: string[];
  relatedRunIds: string[];
  activationReadiness: TaskActivationReadiness;
  noRunGuarantee: string;
};

export type TaskActivationRequestInput = {
  suggestion: TaskSuggestion;
  approved?: boolean;
  approvalNote?: string;
  steps?: string[];
  domain?: TaskActivationDomain;
};

export type TaskActivationValidation = {
  id: string;
  requestId: string;
  valid: boolean;
  state: "valid" | "blocked";
  reasons: string[];
  summary: string[];
};

export type TaskActivationPolicyRoute =
  | "active-plan-preview"
  | "safe-patch-preview"
  | "memory-review"
  | "brain-merge-review"
  | "creative-preview"
  | "blocked";

export type TaskActivationPolicyRuleState = "passed" | "blocked" | "route-review";

export type TaskActivationPolicyRule = {
  id: string;
  label: string;
  state: TaskActivationPolicyRuleState;
  detail: string;
};

export type TaskActivationPolicy = {
  id: string;
  requestId: string;
  explicitReviewApprovalRequired: true;
  activationCreatesPlanOnly: true;
  autoRunAllowed: false;
  autoWriteAllowed: false;
  directGraphMutationAllowed: false;
  allowed: boolean;
  route: TaskActivationPolicyRoute;
  rules: TaskActivationPolicyRule[];
  blockedReasons: string[];
  requiredReviews: string[];
  summary: string[];
};

export type ActivatedTaskStepGate =
  | "inspect"
  | "memory-review"
  | "safe-patch-preview"
  | "brain-merge-review"
  | "operator-approval"
  | "handoff";

export type ActivatedTaskStep = {
  id: string;
  text: string;
  label: string;
  status: "pending";
  gate: ActivatedTaskStepGate;
  detail: string;
};

export type ActivatedTaskPlan = {
  id: string;
  goal: string;
  steps: ActivatedTaskStep[];
  currentStepIndex: number;
  domain: TaskActivationDomain;
  tags: string[];
  sourceSuggestionId: string;
  sourceMemoryIds: string[];
  impactedFiles: string[];
  riskNotes: string[];
  acceptanceChecks: string[];
  approvalGates: string[];
  recommendedFirstAction: string;
  noRunGuarantee: string;
  summary: string[];
};

export type TaskActivationStateName =
  | "idle"
  | "request-built"
  | "needs-review"
  | "approved"
  | "blocked"
  | "activated-preview"
  | "handoff-ready"
  | "future-active-task-set";

export type TaskActivationReducerAction =
  | {
      type: "build-request";
      request: TaskActivationRequest;
      policy?: TaskActivationPolicy;
    }
  | {
      type: "approve";
      approvalNote?: string;
      request?: TaskActivationRequest;
      policy?: TaskActivationPolicy;
    }
  | {
      type: "reject";
      reason?: string;
    }
  | {
      type: "block";
      reason: string;
      policy?: TaskActivationPolicy;
    }
  | {
      type: "preview-plan";
      plan: ActivatedTaskPlan;
      policy?: TaskActivationPolicy;
    }
  | {
      type: "prepare-handoff";
      handoff: TaskActivationHandoff;
      futureActiveTaskSet?: boolean;
    }
  | {
      type: "reset";
    };

export type TaskActivationState = {
  id: "task-activation-state";
  status: TaskActivationStateName;
  request: TaskActivationRequest | null;
  policy: TaskActivationPolicy | null;
  plan: ActivatedTaskPlan | null;
  handoff: TaskActivationHandoff | null;
  message: string;
  summary: string[];
};

export type TaskActivationLedgerState =
  | "suggested"
  | "reviewed"
  | "activation-requested"
  | "approved"
  | "blocked"
  | "previewed"
  | "handoff-ready"
  | "future-activated";

export type TaskActivationLedgerItem = {
  id: string;
  state: TaskActivationLedgerState;
  label: string;
  detail: string;
  requestId: string;
  suggestionId: string;
};

export type TaskActivationLedger = {
  id: "task-activation-ledger";
  items: TaskActivationLedgerItem[];
  summary: string[];
};

export type TaskActivationHandoff = {
  id: string;
  requestId: string;
  planId: string;
  suggestionId: string;
  targetHref: "/jarvis";
  prompt: string;
  safetyNotes: string[];
  summary: string[];
};

export type TaskActivationSummary = {
  id: "task-activation-summary";
  request: TaskActivationRequest | null;
  validation: TaskActivationValidation | null;
  policy: TaskActivationPolicy;
  plan: ActivatedTaskPlan | null;
  handoff: TaskActivationHandoff | null;
  ledger: TaskActivationLedger;
  state: TaskActivationState;
  summary: string[];
};

export function buildTaskActivationStableKey(
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

export function uniqueTaskActivationStrings(values: string[] = []): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}
