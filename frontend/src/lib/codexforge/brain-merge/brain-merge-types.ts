import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
  CodexForgeBrainSourceRef,
} from "@/lib/codexforge/brain/graph/types";

export const BRAIN_MERGE_SUPPORTED_EVENT_TYPE = "memory.promoted" as const;
export const BRAIN_MERGE_APPROVAL_BOUNDARY =
  "explicit merge approval required" as const;
export const BRAIN_MERGE_PREVIEW_NOTICE =
  "Preview only. No Brain graph mutation." as const;

export type BrainMergePersistedEventInput = {
  id?: string;
  eventId?: string;
  candidateId?: string;
  reviewId?: string;
  type?: string;
  approved?: boolean;
  reviewState?: string;
  content?: string;
  sourceRefs?: Array<{ type?: string; id?: string; label?: string }>;
  confidence?: number;
  importance?: string | number;
  contradictionRisk?: number;
  targetRelativePath?: string;
  workspaceRoot?: string;
  payload?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

export type BrainMergeEventState = "eligible" | "blocked";
export type BrainMergeRiskLevel = "low" | "medium" | "high";
export type BrainMergeNextAction =
  | "review-event-queue"
  | "resolve-blockers"
  | "review-graph-diff"
  | "acknowledge-contradiction-risk"
  | "approve-future-merge";

export type NormalizedBrainMergeEvent = {
  id: string;
  eventId: string;
  candidateId: string;
  reviewId: string;
  type: typeof BRAIN_MERGE_SUPPORTED_EVENT_TYPE | "unknown";
  state: BrainMergeEventState;
  approved: boolean;
  content: string;
  sourceRefs: CodexForgeBrainSourceRef[];
  confidence: number;
  importance: "low" | "medium" | "high" | "critical";
  contradictionRisk: number;
  targetRelativePath: string;
  blockedReasons: string[];
  summary: string[];
};

export type BrainEventQueue = {
  id: "brain-event-queue";
  events: NormalizedBrainMergeEvent[];
  eventCount: number;
  validEventCount: number;
  blockedEventCount: number;
  unknownEventCount: number;
  summary: string[];
};

export type BrainMergePlanStep = {
  id: string;
  label: string;
  state: "ready" | "blocked" | "review";
  detail: string;
};

export type BrainMergePlan = {
  id: "brain-merge-plan";
  eventCount: number;
  validEventCount: number;
  blockedEventCount: number;
  targetGraphVersion: number | null;
  expectedNodeChanges: number;
  expectedEdgeChanges: number;
  riskLevel: BrainMergeRiskLevel;
  approvalBoundary: typeof BRAIN_MERGE_APPROVAL_BOUNDARY;
  nextAction: BrainMergeNextAction;
  steps: BrainMergePlanStep[];
  summary: string[];
};

export type BrainGraphNodeDiff = {
  id: string;
  state: "add" | "update" | "blocked";
  node: CodexForgeBrainNode;
  sourceRefs: CodexForgeBrainSourceRef[];
  duplicateRisk: boolean;
  staleEventRisk: boolean;
  conflictWarnings: string[];
};

export type BrainGraphEdgeDiff = {
  id: string;
  state: "add" | "blocked";
  edge: CodexForgeBrainEdge;
  sourceRefs: CodexForgeBrainSourceRef[];
  conflictWarnings: string[];
};

export type BrainGraphDiffPreview = {
  id: "brain-graph-diff-preview";
  targetGraphVersion: number | null;
  nodesToAdd: BrainGraphNodeDiff[];
  nodesToUpdate: BrainGraphNodeDiff[];
  edgesToAdd: BrainGraphEdgeDiff[];
  blockedNodes: BrainGraphNodeDiff[];
  duplicateRisks: string[];
  staleEventRisks: string[];
  conflictWarnings: string[];
  sourceRefsLinked: CodexForgeBrainSourceRef[];
  summary: string[];
};

export type BrainMergePolicy = {
  id: "brain-merge-policy";
  explicitMergeApprovalRequired: true;
  approvedPersistedMemoryEventsRequired: true;
  unknownEventTypesBlocked: boolean;
  highContradictionRiskAcknowledged: boolean;
  graphSchemaMatches: boolean;
  duplicateNodeConflictsResolved: boolean;
  allowed: boolean;
  reasons: string[];
  summary: string[];
};

export type BrainMergeValidationIssue =
  | "empty-event-queue"
  | "no-approved-events"
  | "unknown-event-type"
  | "missing-source-refs"
  | "duplicate-graph-node-target"
  | "missing-graph-version"
  | "legacy-graph-import-risk"
  | "unsafe-direct-graph-mutation-wording";

export type BrainMergeValidation = {
  id: "brain-merge-validation";
  state: "valid" | "blocked" | "review";
  issues: BrainMergeValidationIssue[];
  warnings: string[];
  summary: string[];
};

export type BrainMergeLedgerState =
  | "queued"
  | "previewed"
  | "blocked"
  | "approved-for-future-merge"
  | "rejected"
  | "future-merged";

export type BrainMergeLedgerItem = {
  id: string;
  eventId: string;
  state: BrainMergeLedgerState;
  note: string;
};

export type BrainMergeLedger = {
  id: "brain-merge-ledger";
  items: BrainMergeLedgerItem[];
  summary: string[];
};

export type BrainMergeReviewModel = {
  queue: BrainEventQueue;
  plan: BrainMergePlan;
  diff: BrainGraphDiffPreview;
  policy: BrainMergePolicy;
  validation: BrainMergeValidation;
  ledger: BrainMergeLedger;
  sourceGraph: CodexForgeBrainGraph;
};

export function buildBrainMergeStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
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
