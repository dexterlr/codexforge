import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import type {
  BrainGraphDiffPreview,
  BrainMergeValidation,
  NormalizedBrainMergeEvent,
} from "@/lib/codexforge/brain-merge";

export const APPROVED_BRAIN_MERGE_APPROVAL_NOTICE =
  "explicit merge approval required" as const;
export const APPROVED_BRAIN_MERGE_NO_AUTO_MERGE_NOTICE =
  "no auto-merge" as const;
export const APPROVED_BRAIN_MERGE_CANONICAL_SCHEMA_NOTICE =
  "canonical graph schema" as const;

export type ApprovedBrainMergeValidationIssue =
  | "missing-approval"
  | "missing-graph-diff"
  | "missing-event-ids"
  | "unknown-event-types"
  | "schema-version-mismatch"
  | "duplicate-node-conflict"
  | "duplicate-edge-conflict"
  | "missing-source-refs"
  | "empty-merge"
  | "unresolved-blocker-validation-finding"
  | "high-contradiction-risk-unacknowledged"
  | "direct-graph-mutation-bypass-language"
  | "legacy-graph-import-risk";

export type ApprovedBrainMergeValidationFinding = {
  id: string;
  severity: "blocker" | "warning" | "info";
  issue: ApprovedBrainMergeValidationIssue;
  message: string;
};

export type ApprovedBrainMergePolicy = {
  id: "approved-brain-merge-policy";
  explicitMergeApprovalRequired: true;
  graphDiffPreviewRequired: true;
  validPromotedMemoryEventsOnly: boolean;
  unknownEventTypesBlocked: boolean;
  unresolvedBlockersBlocked: boolean;
  schemaMatches: boolean;
  highContradictionRiskAcknowledged: boolean;
  duplicateNodeConflictsResolved: boolean;
  duplicateEdgeConflictsResolved: boolean;
  sourceRefsExist: boolean;
  canonicalGraphTypesRequired: true;
  allowed: boolean;
  reasons: string[];
  summary: string[];
};

export type ApprovedBrainGraphSummary = {
  graphVersion: number | null;
  nodeCount: number;
  edgeCount: number;
  updatedAt: number | null;
  nodeIds: string[];
  edgeIds: string[];
};

export type ApprovedBrainMergeRequest = {
  id: string;
  approved: boolean;
  approvalNote: string;
  graphVersion: number | null;
  eventIds: string[];
  nodeDiffs: BrainGraphDiffPreview["nodesToAdd"];
  nodeUpdateDiffs: BrainGraphDiffPreview["nodesToUpdate"];
  edgeDiffs: BrainGraphDiffPreview["edgesToAdd"];
  validationFindings: ApprovedBrainMergeValidationFinding[];
  conflictAcknowledgements: string[];
  beforeSummary: ApprovedBrainGraphSummary;
  expectedAfterSummary: ApprovedBrainGraphSummary;
  rollbackNote: string;
};

export type ApprovedBrainMergeValidation = {
  id: "approved-brain-merge-validation";
  state: "valid" | "blocked" | "review";
  findings: ApprovedBrainMergeValidationFinding[];
  summary: string[];
};

export type ApprovedBrainMergeResult = {
  id: string;
  state: "applied" | "blocked" | "failed";
  addedNodeIds: string[];
  updatedNodeIds: string[];
  dedupedNodeIds: string[];
  addedEdgeIds: string[];
  dedupedEdgeIds: string[];
  beforeSummary: ApprovedBrainGraphSummary;
  afterSummary: ApprovedBrainGraphSummary;
  summary: string[];
};

export type ApprovedMergeRollbackPlan = {
  id: string;
  beforeSummary: ApprovedBrainGraphSummary;
  afterSummary: ApprovedBrainGraphSummary;
  changedNodeIds: string[];
  changedEdgeIds: string[];
  recommendedManualRestoreStep: string;
  approvalWarning: string;
  summary: string[];
};

export type ApprovedMergeLedgerState =
  | "requested"
  | "blocked"
  | "approved"
  | "applied"
  | "failed"
  | "rollback-available"
  | "reviewed";

export type ApprovedMergeLedgerItem = {
  id: string;
  requestId: string;
  state: ApprovedMergeLedgerState;
  note: string;
};

export type ApprovedMergeLedger = {
  id: "approved-brain-merge-ledger";
  items: ApprovedMergeLedgerItem[];
  summary: string[];
};

export type ApprovedBrainMergeBuildArgs = {
  graph: CodexForgeBrainGraph;
  diff: BrainGraphDiffPreview;
  events: NormalizedBrainMergeEvent[];
  mergeValidation?: BrainMergeValidation;
  approved: boolean;
  approvalNote: string;
  conflictAcknowledgements?: string[];
};

export type ApprovedBrainGraphMergeApplyArgs = {
  graph: CodexForgeBrainGraph;
  request: ApprovedBrainMergeRequest;
};

export type ApprovedBrainMergePanelModel = {
  policy: ApprovedBrainMergePolicy;
  request: ApprovedBrainMergeRequest;
  validation: ApprovedBrainMergeValidation;
  result: ApprovedBrainMergeResult | null;
  rollbackPlan: ApprovedMergeRollbackPlan | null;
  ledger: ApprovedMergeLedger;
};

export type ApprovedBrainMergeNode = CodexForgeBrainNode;
export type ApprovedBrainMergeEdge = CodexForgeBrainEdge;

export function buildApprovedBrainMergeStableKey(
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
