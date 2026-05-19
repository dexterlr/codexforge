import type {
  CodexForgeBrainEdge,
  CodexForgeBrainEdgeKind,
  CodexForgeBrainGraph,
  CodexForgeBrainImportance,
  CodexForgeBrainNode,
  CodexForgeBrainNodeId,
  CodexForgeBrainNodeKind,
  CodexForgeBrainStatus,
} from "@/lib/codexforge/brain/graph/types";

export const BRAIN_SNAPSHOT_CANONICAL_SCHEMA_PATH =
  "src/lib/codexforge/brain/graph/types.ts";

export type BrainSnapshotSource =
  | "live-readonly"
  | "runtime-replay"
  | "runtime-journal"
  | "governance-review"
  | "operator-selected"
  | "empty";

export type BrainSnapshotRiskLevel = "low" | "medium" | "high" | "critical";
export type BrainSnapshotReadiness = "ready" | "review-required" | "blocked";

export type BrainSnapshotCountMap<T extends string = string> = Partial<Record<T, number>>;

export type BrainSnapshotModel = {
  id: string;
  label: string;
  source: BrainSnapshotSource;
  graphVersion: string;
  canonicalSchemaPath: typeof BRAIN_SNAPSHOT_CANONICAL_SCHEMA_PATH;
  nodeCount: number;
  edgeCount: number;
  nodeKindCounts: BrainSnapshotCountMap<CodexForgeBrainNodeKind | "unknown">;
  edgeKindCounts: BrainSnapshotCountMap<CodexForgeBrainEdgeKind | "unknown">;
  importanceCounts: BrainSnapshotCountMap<CodexForgeBrainImportance | "unknown">;
  statusCounts: BrainSnapshotCountMap<CodexForgeBrainStatus | "unknown">;
  focusNodeIds: CodexForgeBrainNodeId[];
  memoryNodeCount: number;
  taskNodeCount: number;
  conceptNodeCount: number;
  executionNodeCount: number;
  createdAtLabel?: string;
  updatedAtLabel?: string;
  integrityNotes: string[];
  noMutationGuarantee: string;
  nodeIds: string[];
  edgeIds: string[];
  isolatedNodeIds: string[];
  staleNodeIds: string[];
  highImportanceNodeIds: string[];
  blockedOrErrorNodeIds: string[];
};

export type BrainSnapshotBuildInput = {
  id?: string;
  label?: string;
  source?: BrainSnapshotSource;
  graph?: CodexForgeBrainGraph | null;
  focusNodeIds?: string[];
  createdAtLabel?: string;
  updatedAtLabel?: string;
  staleBefore?: number;
  warningThresholds?: BrainSnapshotWarningThresholds;
};

export type BrainSnapshotMetric = {
  id: string;
  label: string;
  value: number | string;
  detail: string;
  riskLevel: BrainSnapshotRiskLevel;
};

export type BrainSnapshotSummary = {
  snapshotId: string;
  metrics: BrainSnapshotMetric[];
  summary: string[];
};

export type BrainSnapshotComparisonCategory =
  | "node-count-change"
  | "edge-count-change"
  | "node-kind-change"
  | "memory-change"
  | "task-change"
  | "concept-change"
  | "execution-change"
  | "importance-change"
  | "status-change"
  | "isolated-node-change"
  | "unknown-change";

export type BrainSnapshotComparisonItem = {
  id: string;
  category: BrainSnapshotComparisonCategory;
  label: string;
  beforeValue: number | string;
  afterValue: number | string;
  delta: number;
  riskLevel: BrainSnapshotRiskLevel;
};

export type BrainSnapshotComparison = {
  beforeSnapshotId: string;
  afterSnapshotId: string;
  deltaMetrics: BrainSnapshotComparisonItem[];
  addedNodeIds: string[];
  removedNodeIds: string[];
  changedNodeIds: string[];
  riskLevel: BrainSnapshotRiskLevel;
  reviewRequired: boolean;
  replayRecommended: boolean;
  summary: string[];
};

export type BrainSnapshotDiffKind =
  | "node-added"
  | "node-removed"
  | "node-changed"
  | "edge-added"
  | "edge-removed"
  | "edge-changed"
  | "metadata-changed"
  | "schema-version-changed"
  | "unknown";

export type BrainSnapshotDiffItem = {
  id: string;
  kind: BrainSnapshotDiffKind;
  entityId: string;
  label: string;
  summary: string;
  riskLevel: BrainSnapshotRiskLevel;
};

export type BrainSnapshotDiff = {
  beforeSnapshotId: string;
  afterSnapshotId: string;
  items: BrainSnapshotDiffItem[];
  summary: string[];
};

export type BrainSnapshotIntegrityStatus =
  | "pass"
  | "warning"
  | "risk"
  | "blocker"
  | "unknown";

export type BrainSnapshotWarningThresholds = {
  maxNodes?: number;
  maxEdges?: number;
};

export type BrainSnapshotIntegrityCheck = {
  id: string;
  label: string;
  status: BrainSnapshotIntegrityStatus;
  detail: string;
};

export type BrainSnapshotIntegrityReport = {
  snapshotId: string;
  status: BrainSnapshotIntegrityStatus;
  checks: BrainSnapshotIntegrityCheck[];
  summary: string[];
};

export type BrainSnapshotReplayMode =
  | "impact-preview"
  | "memory-promotion-review"
  | "rollback-planning"
  | "operator-review";

export type BrainSnapshotReplaySelectorInput = {
  snapshots: BrainSnapshotModel[];
  mode: BrainSnapshotReplayMode;
  eventTypes?: string[];
  integrityReports?: BrainSnapshotIntegrityReport[];
  operatorSelectedSnapshotId?: string;
  sourceFreshnessLabel?: string;
};

export type BrainSnapshotReplaySelector = {
  selectedSnapshotId: string | null;
  whySelected: string[];
  readiness: BrainSnapshotReadiness;
  warnings: string[];
  blockedReasons: string[];
  runtimeReplayHandoff: string;
  summary: string[];
};

export type BrainSnapshotRollbackOptionKind =
  | "inspect-first"
  | "reject-pending-runtime-event"
  | "create-corrective-runtime-event-after-approval"
  | "future-guarded-snapshot-executor"
  | "stop-and-stabilize";

export type BrainSnapshotRollbackOption = {
  id: string;
  kind: BrainSnapshotRollbackOptionKind;
  label: string;
  detail: string;
  allowedInPhase50: boolean;
  riskLevel: BrainSnapshotRiskLevel;
};

export type BrainSnapshotRollbackPlan = {
  currentSnapshotId: string;
  targetSnapshotId: string;
  options: BrainSnapshotRollbackOption[];
  reviewSteps: string[];
  summary: string[];
};

export type BrainSnapshotGovernanceItem = {
  id: string;
  label: string;
  detail: string;
  status: "blocked" | "required" | "recommended" | "visible";
};

export type BrainSnapshotGovernanceReport = {
  snapshotId: string;
  items: BrainSnapshotGovernanceItem[];
  summary: string[];
};

export type BrainSnapshotComparableEntity = CodexForgeBrainNode | CodexForgeBrainEdge;
