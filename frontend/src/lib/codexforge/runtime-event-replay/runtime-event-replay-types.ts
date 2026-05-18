import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainEdgeKind,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNodeKind,
} from "@/lib/codexforge/brain/graph/types";
import {
  CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES,
  type CodexForgeBrainRuntimeEvent,
  type CodexForgeBrainRuntimeEventType,
} from "@/lib/codexforge/brain/runtime/runtime-types";

export const RUNTIME_EVENT_REPLAY_CANONICAL_GRAPH_SCHEMA_PATH =
  "src/lib/codexforge/brain/graph/types.ts" as const;

export const RUNTIME_EVENT_REPLAY_MODES = [
  "dry-run",
  "reducer-preview",
  "integrity-check",
  "rollback-planning",
] as const;

export const RUNTIME_EVENT_REPLAY_SCOPES = [
  "single-event",
  "selected-events",
  "memory-promotion-only",
  "full-journal-preview",
] as const;

export const RUNTIME_EVENT_REPLAY_STATUSES = [
  "simulation-complete",
  "partial",
  "blocked",
  "invalid-input",
  "reducer-warning",
  "no-events",
  "no-snapshot",
] as const;

export const RUNTIME_REPLAY_IMPACT_CATEGORIES = [
  "node-created",
  "node-updated",
  "node-unchanged",
  "edge-created",
  "edge-updated",
  "edge-unchanged",
  "memory-promoted",
  "concept-synthesized",
  "task-updated",
  "execution-linked",
  "unknown-impact",
] as const;

export const RUNTIME_REPLAY_RISK_IDS = [
  "unknown-event-type",
  "reducer-missing",
  "replay-order-risk",
  "duplicate-memory-risk",
  "contradiction-risk",
  "stale-snapshot-risk",
  "schema-version-risk",
  "legacy-schema-risk",
  "unexpected-node-delta",
  "unexpected-edge-delta",
  "memory-authority-risk",
  "direct-mutation-risk",
  "latest-message-authority-risk",
] as const;

export const RUNTIME_REPLAY_ROLLBACK_OPTION_KINDS = [
  "do-not-apply-event",
  "review-runtime-event-journal",
  "reject-memory-promotion",
  "restore-graph-snapshot-before-promotion",
  "create-corrective-event-after-approval",
  "inspect-reducer-preview",
  "stop-and-stabilize",
] as const;

export type RuntimeEventReplayMode = (typeof RUNTIME_EVENT_REPLAY_MODES)[number];
export type RuntimeEventReplayScope = (typeof RUNTIME_EVENT_REPLAY_SCOPES)[number];
export type RuntimeEventReplayStatus = (typeof RUNTIME_EVENT_REPLAY_STATUSES)[number];
export type RuntimeReplayImpactCategory = (typeof RUNTIME_REPLAY_IMPACT_CATEGORIES)[number];
export type RuntimeReplayRiskId = (typeof RUNTIME_REPLAY_RISK_IDS)[number];
export type RuntimeReplayRollbackOptionKind = (typeof RUNTIME_REPLAY_ROLLBACK_OPTION_KINDS)[number];

export type RuntimeReplayRiskLevel = "info" | "warning" | "risk" | "blocker";
export type RuntimeReplayValidationState = "valid" | "warning" | "blocked" | "invalid";
export type RuntimeReplayStepStatus = "simulated" | "blocked" | "skipped" | "error";
export type RuntimeReplaySnapshotSource =
  | "selected-graph-snapshot"
  | "supplied-graph"
  | "empty-preview"
  | "unknown";

export type RuntimeEventReplayInput = {
  id: string;
  sourceJournalIds: string[];
  sourceRequestIds: string[];
  eventTypes: string[];
  selectedEventIds: string[];
  selectedGraphSnapshotId: string;
  graphSnapshotSummary: string[];
  replayMode: RuntimeEventReplayMode;
  replayScope: RuntimeEventReplayScope;
  operatorNote?: string;
  noMutationGuarantee: true;
  summary: string[];
};

export type RuntimeEventReplayInputDraft = {
  id?: string;
  sourceJournalIds?: readonly string[];
  sourceRequestIds?: readonly string[];
  eventTypes?: readonly string[];
  selectedEventIds?: readonly string[];
  selectedGraphSnapshotId?: string;
  graphSnapshotSummary?: readonly string[];
  replayMode?: RuntimeEventReplayMode | string;
  replayScope?: RuntimeEventReplayScope | string;
  operatorNote?: string | null;
  noMutationGuarantee?: boolean | null;
};

export type RuntimeEventReplayInputValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type RuntimeReplayGraphSummary = {
  nodeCount: number;
  edgeCount: number;
  nodeKindCounts: Record<string, number>;
  edgeKindCounts: Record<string, number>;
};

export type RuntimeReplaySnapshot = RuntimeReplayGraphSummary & {
  id: string;
  graphVersion: number;
  canonicalSchemaPath: typeof RUNTIME_EVENT_REPLAY_CANONICAL_GRAPH_SCHEMA_PATH;
  updatedAtLabel?: string;
  source: RuntimeReplaySnapshotSource;
  integrityNotes: string[];
  graph: CodexForgeBrainGraph;
  summary: string[];
};

export type RuntimeReplaySnapshotInput = {
  snapshotId?: string;
  graph?: CodexForgeBrainGraph | null;
  source?: RuntimeReplaySnapshotSource | string;
  updatedAtLabel?: string | null;
  integrityNotes?: readonly string[] | null;
};

export type RuntimeReplayEventLike = {
  id: string;
  type: string;
  ts?: number;
  actor?: string;
  source?: { type: string; id: string; label?: string };
  correlationId?: string;
  causationId?: string;
  payload?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

export type RuntimeReplayEventSequenceItem = {
  sequenceId: string;
  eventId: string;
  eventType: string;
  sourceJournalEntryId?: string;
  sourceRequestId?: string;
  payloadSummary: string[];
  replayOrder: number;
  allowedByPolicy: boolean;
  validationState: RuntimeReplayValidationState;
  expectedReducerArea: string;
  warnings: string[];
  event?: RuntimeReplayEventLike;
};

export type RuntimeReplayEventSequenceItemInput = {
  event: RuntimeReplayEventLike | CodexForgeBrainRuntimeEvent;
  replayOrder?: number | null;
  sourceJournalEntryId?: string | null;
  sourceRequestId?: string | null;
  allowedByPolicy?: boolean | null;
};

export type RuntimeReplayEventSequence = {
  id: string;
  items: RuntimeReplayEventSequenceItem[];
  eventCount: number;
  allowedCount: number;
  blockedCount: number;
  warningCount: number;
  summary: string[];
};

export type RuntimeReplayEventSequenceInput = {
  events?: readonly (RuntimeReplayEventLike | CodexForgeBrainRuntimeEvent)[] | null;
  selectedEventIds?: readonly string[] | null;
  sourceJournalIds?: readonly string[] | null;
  sourceRequestIds?: readonly string[] | null;
  suppliedOrder?: readonly string[] | null;
  scope?: RuntimeEventReplayScope | string | null;
};

export type RuntimeReplaySimulationStep = {
  id: string;
  sequenceId: string;
  eventId: string;
  eventType: string;
  status: RuntimeReplayStepStatus;
  replayOrder: number;
  expectedReducerArea: string;
  before: RuntimeReplayGraphSummary;
  after: RuntimeReplayGraphSummary;
  nodeDelta: number;
  edgeDelta: number;
  warnings: string[];
  errors: string[];
};

export type RuntimeReplaySimulation = {
  id: string;
  status: RuntimeEventReplayStatus;
  replayInputId: string;
  snapshotId: string;
  before: RuntimeReplayGraphSummary;
  after: RuntimeReplayGraphSummary;
  steps: RuntimeReplaySimulationStep[];
  blockedEventIds: string[];
  skippedEventIds: string[];
  warnings: string[];
  errors: string[];
  simulatedGraph: CodexForgeBrainGraph | null;
  summary: string[];
};

export type RuntimeReplayImpactItem = {
  id: string;
  category: RuntimeReplayImpactCategory;
  eventId: string;
  eventType: string;
  graphArea: string;
  beforeSummary: string;
  afterSummary: string;
  delta: number;
  riskLevel: RuntimeReplayRiskLevel;
  reviewRequired: boolean;
};

export type RuntimeReplayImpactAnalysis = {
  id: "runtime-replay-impact-analysis";
  items: RuntimeReplayImpactItem[];
  nodeDelta: number;
  edgeDelta: number;
  memoryPromotionCount: number;
  reviewRequiredCount: number;
  summary: string[];
};

export type RuntimeReplayRiskItem = {
  id: RuntimeReplayRiskId;
  title: string;
  detail: string;
  riskLevel: RuntimeReplayRiskLevel;
  eventId?: string;
  blocker: boolean;
  reviewRequired: boolean;
  mitigation: string;
};

export type RuntimeReplayRiskReport = {
  id: "runtime-replay-risk-report";
  items: RuntimeReplayRiskItem[];
  blockerCount: number;
  riskCount: number;
  warningCount: number;
  reviewRequiredCount: number;
  topRisk: RuntimeReplayRiskItem | null;
  summary: string[];
};

export type RuntimeReplayRollbackOption = {
  id: string;
  kind: RuntimeReplayRollbackOptionKind;
  label: string;
  detail: string;
  priority: "primary" | "secondary";
  readOnly: true;
};

export type RuntimeReplayRollbackAdvice = {
  id: "runtime-replay-rollback-advice";
  options: RuntimeReplayRollbackOption[];
  selected: RuntimeReplayRollbackOption;
  summary: string[];
};

export type RuntimeEventReplaySummary = {
  id: "runtime-event-replay-summary";
  replayStatus: RuntimeEventReplayStatus;
  eventCount: number;
  simulatedEventCount: number;
  blockedEventCount: number;
  warningCount: number;
  riskCount: number;
  nodeDelta: number;
  edgeDelta: number;
  memoryPromotionCount: number;
  topRisk: string;
  nextSafeAction: string;
  summary: string[];
};

export type RuntimeEventReplaySession = {
  input: RuntimeEventReplayInput;
  inputValidation: RuntimeEventReplayInputValidation;
  snapshot: RuntimeReplaySnapshot;
  sequence: RuntimeReplayEventSequence;
  simulation: RuntimeReplaySimulation;
  impact: RuntimeReplayImpactAnalysis;
  riskReport: RuntimeReplayRiskReport;
  rollbackAdvice: RuntimeReplayRollbackAdvice;
  summary: RuntimeEventReplaySummary;
};

export const RUNTIME_EVENT_REPLAY_EMPTY_GRAPH: CodexForgeBrainGraph = {
  version: CODEXFORGE_BRAIN_GRAPH_VERSION,
  nodes: [],
  edges: [],
  meta: {
    createdAt: 1,
    updatedAt: 1,
    workspaceId: "runtime-event-replay-preview",
  },
};

export function isRuntimeEventReplayMode(value?: string | null): value is RuntimeEventReplayMode {
  return RUNTIME_EVENT_REPLAY_MODES.includes(value as RuntimeEventReplayMode);
}

export function isRuntimeEventReplayScope(value?: string | null): value is RuntimeEventReplayScope {
  return RUNTIME_EVENT_REPLAY_SCOPES.includes(value as RuntimeEventReplayScope);
}

export function isRuntimeEventReplayKnownEventType(value?: string | null): value is CodexForgeBrainRuntimeEventType {
  return CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES.includes(value as CodexForgeBrainRuntimeEventType);
}

export function buildRuntimeEventReplayStableKey(
  ...parts: Array<string | number | boolean | null | undefined | readonly string[]>
): string {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/[/-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function uniqueRuntimeEventReplayStrings(values?: readonly (string | null | undefined)[] | null): string[] {
  return Array.from(new Set((values ?? []).map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function stableRuntimeEventReplayDigest(value: unknown): string {
  const text = stableRuntimeEventReplayStringify(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

export function stableRuntimeEventReplayStringify(value: unknown): string {
  if (value === null || value === undefined) return String(value);
  if (typeof value !== "object") return String(value);
  if (Array.isArray(value)) {
    return `[${value.map(stableRuntimeEventReplayStringify).join(",")}]`;
  }
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${key}:${stableRuntimeEventReplayStringify(record[key])}`)
    .join(",")}}`;
}

export function countRuntimeReplayNodeKinds(graph: CodexForgeBrainGraph): Record<CodexForgeBrainNodeKind | string, number> {
  const counts: Record<string, number> = {};
  for (const node of graph.nodes) counts[node.kind] = (counts[node.kind] ?? 0) + 1;
  return counts;
}

export function countRuntimeReplayEdgeKinds(graph: CodexForgeBrainGraph): Record<CodexForgeBrainEdgeKind | string, number> {
  const counts: Record<string, number> = {};
  for (const edge of graph.edges) counts[edge.kind] = (counts[edge.kind] ?? 0) + 1;
  return counts;
}

export function summarizeRuntimeReplayGraph(graph: CodexForgeBrainGraph): RuntimeReplayGraphSummary {
  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    nodeKindCounts: countRuntimeReplayNodeKinds(graph),
    edgeKindCounts: countRuntimeReplayEdgeKinds(graph),
  };
}
