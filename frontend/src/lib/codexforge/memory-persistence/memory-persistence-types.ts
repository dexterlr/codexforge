import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeEvent } from "@/lib/codexforge/brain/runtime";
import type {
  MemoryReviewItem,
  MemoryReviewSourceRef,
  MemoryReviewState,
} from "@/lib/codexforge/memory-review";

export const MEMORY_PERSISTENCE_EVENT_TYPE = "memory.promoted" as const;

export type MemoryEventLedgerState =
  | "requested"
  | "blocked"
  | "approved"
  | "persisted"
  | "failed"
  | "graph-preview-ready"
  | "future-merged";

export type MemoryEventPersistencePolicy = {
  id: "memory-event-persistence-policy";
  explicitApprovalRequired: true;
  reviewedCandidatesOnly: true;
  sourceTraceabilityRequired: true;
  highContradictionRequiresAcknowledgement: true;
  automaticGraphMutationAllowed: false;
  workspaceRoot: ".codexforge/memory-events";
  rules: Array<{
    id: string;
    label: string;
    state: "allow" | "review" | "block";
    detail: string;
  }>;
  summary: string[];
};

export type MemoryEventPersistenceRequest = {
  id: string;
  eventId: string;
  candidateId: string;
  reviewId: string;
  approved: boolean;
  approvalNote: string;
  safetyNote: string;
  type: typeof MEMORY_PERSISTENCE_EVENT_TYPE;
  content: string;
  sourceRefs: MemoryReviewSourceRef[];
  confidence: number;
  importance: MemoryReviewItem["importance"];
  contradictionRisk: number;
  contradictionAcknowledged: boolean;
  reviewState: MemoryReviewState;
  targetRelativePath: string;
  overwrite: boolean;
};

export type MemoryEventPathValidation = {
  inputPath: string;
  normalizedPath: string | null;
  traversal: boolean;
  absolutePath: boolean;
  extensionAllowed: boolean;
  sourceMutationAttempt: boolean;
  safe: boolean;
  summary: string[];
};

export type MemoryEventValidationIssue =
  | "missing-approval"
  | "missing-source-refs"
  | "empty-content"
  | "unsupported-event-type"
  | "path-traversal"
  | "absolute-path"
  | "source-mutation-attempt"
  | "high-contradiction-risk"
  | "missing-review-state"
  | "missing-safety-note";

export type MemoryEventValidation = {
  id: string;
  state: "valid" | "blocked" | "review";
  issues: MemoryEventValidationIssue[];
  pathValidation: MemoryEventPathValidation;
  summary: string[];
};

export type MemoryEventLedgerItem = {
  id: string;
  eventId: string;
  candidateId: string;
  reviewId: string;
  state: MemoryEventLedgerState;
  targetRelativePath: string;
  note: string;
};

export type MemoryEventLedger = {
  id: "memory-event-ledger";
  items: MemoryEventLedgerItem[];
  summary: string[];
};

export type MemoryGraphReductionPreview = {
  id: string;
  eventId: string;
  ready: boolean;
  inputNodeCount: number;
  inputEdgeCount: number;
  outputNodeCount: number;
  outputEdgeCount: number;
  addedNodeCount: number;
  updatedNodeCount: number;
  linkedSourceRefs: MemoryReviewSourceRef[];
  warnings: string[];
  nextAction:
    | "approve-event"
    | "persist-event"
    | "review-validation"
    | "future-graph-merge";
  event: CodexForgeBrainRuntimeEvent | null;
  summary: string[];
};

export type MemoryGraphReductionPreviewInput = {
  graph: CodexForgeBrainGraph;
  request: MemoryEventPersistenceRequest;
  validation?: MemoryEventValidation;
};

export type PersistedMemoryEventMetadata = {
  eventId: string;
  candidateId: string;
  reviewId: string;
  targetRelativePath: string;
  workspaceRoot: ".codexforge/memory-events";
  contentBytes: number;
  overwrite: boolean;
  safetyNote: string;
};

export function buildMemoryEventStableKey(
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
