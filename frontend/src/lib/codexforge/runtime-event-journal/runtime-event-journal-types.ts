import {
  CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES,
  type CodexForgeBrainRuntimeEvent,
  type CodexForgeBrainRuntimeEventType,
} from "@/lib/codexforge/brain/runtime/runtime-types";

export const RUNTIME_EVENT_JOURNAL_ENTRY_TYPES = [
  "request.created",
  "policy.checked",
  "validation.checked",
  "approval.reviewed",
  "dryRun.completed",
  "reducerPreview.built",
  "execution.blocked",
  "execution.ready",
  "event.appended",
  "result.captured",
  "memoryPromotion.previewed",
  "memoryPromotion.approved",
  "memoryPromotion.blocked",
  "unknown",
] as const;

export type RuntimeEventJournalEntryType = (typeof RUNTIME_EVENT_JOURNAL_ENTRY_TYPES)[number];

export type RuntimeEventJournalSeverity =
  | "blocker"
  | "risk"
  | "warning"
  | "info"
  | "success"
  | "unknown";

export type RuntimeEventJournalResultStatus =
  | "not-requested"
  | "dry-run-complete"
  | "approval-required"
  | "policy-blocked"
  | "validation-failed"
  | "request-ready"
  | "executed"
  | "blocked"
  | "failed"
  | "preview-only"
  | "unknown";

export type RuntimeEventJournalSourceKey =
  | "runtime-event-executor"
  | "memory-promotion-gate"
  | "operator-memory-inbox"
  | "global-activity-feed"
  | "brain-runtime"
  | "runtime-event-journal"
  | "unknown";

export type RuntimeEventJournalEntry = {
  id: string;
  type: RuntimeEventJournalEntryType;
  title: string;
  detail: string;
  source: RuntimeEventJournalSourceKey | string;
  sourceId: string;
  runtimeEventType: CodexForgeBrainRuntimeEventType | string;
  runtimeEventId?: string;
  requestId?: string;
  approvalId?: string;
  resultStatus?: RuntimeEventJournalResultStatus | string;
  severity: RuntimeEventJournalSeverity;
  reviewRequired: boolean;
  relatedRoutes: string[];
  relatedFiles: string[];
  evidenceRefs: string[];
  reducerTraceRefs: string[];
  auditRefs: string[];
  timestampLabel?: string;
  sortKey?: string;
  summary: string[];
};

export type RuntimeEventJournalEntryInput = Partial<
  Omit<RuntimeEventJournalEntry, "id" | "summary" | "type" | "sourceId" | "source" | "title" | "detail">
> & {
  id?: string;
  type?: RuntimeEventJournalEntryType | string;
  title?: string;
  detail?: string;
  source?: RuntimeEventJournalEntry["source"];
  sourceId?: string;
};

export type RuntimeEventJournalPriorityClass =
  | "blocked-first"
  | "review-required"
  | "ready"
  | "executed"
  | "informational"
  | "unknown";

export type RuntimeEventJournalFeed = {
  id: "runtime-event-journal-feed";
  entries: RuntimeEventJournalEntry[];
  entryCount: number;
  sourceCount: number;
  blockedCount: number;
  readyCount: number;
  executedCount: number;
  reviewRequiredCount: number;
  highestPriorityEntry?: RuntimeEventJournalEntry;
  nextSafeAction: string;
  summary: string[];
};

export type RuntimeEventJournalFeedInput = {
  entries?: readonly RuntimeEventJournalEntryInput[];
  runtimeExecutor?: RuntimeEventJournalRuntimeExecutorSource | null;
  memoryPromotionGate?: RuntimeEventJournalMemoryPromotionGateSource | null;
  operatorMemoryInbox?: RuntimeEventJournalOperatorMemoryInboxSource | null;
  activityFeed?: RuntimeEventJournalActivityFeedSource | null;
  brainRuntime?: RuntimeEventJournalBrainRuntimeSource | null;
};

export type RuntimeEventJournalFilterId =
  | "all"
  | "requests"
  | "approvals"
  | "policy"
  | "validation"
  | "dry runs"
  | "reducer previews"
  | "blocked"
  | "ready"
  | "executed"
  | "memory promotion"
  | "review required";

export type RuntimeEventJournalFilter = {
  id: RuntimeEventJournalFilterId;
  label: string;
  search: string;
  tokens: string[];
};

export type RuntimeEventReducerTraceItem = {
  id: string;
  sourceEventOrRequest: string;
  runtimeEventType: string;
  reducerPreviewSummary: string[];
  expectedNodeCountDelta: number;
  expectedEdgeCountDelta: number;
  impactedGraphAreas: string[];
  warnings: string[];
  blockedReasons: string[];
  canonicalGraphSchemaPath: "src/lib/codexforge/brain/graph/types.ts";
  noMutationGuarantee: true;
  summary: string[];
};

export type RuntimeEventReducerTrace = {
  id: "runtime-event-reducer-trace";
  items: RuntimeEventReducerTraceItem[];
  warningCount: number;
  blockedCount: number;
  summary: string[];
};

export type RuntimeEventJournalIntegrityStatus =
  | "pass"
  | "warning"
  | "risk"
  | "blocker"
  | "unknown";

export type RuntimeEventJournalIntegrityCheck = {
  id: string;
  label: string;
  status: RuntimeEventJournalIntegrityStatus;
  detail: string;
  relatedEntryIds: string[];
};

export type RuntimeEventJournalIntegrityReport = {
  id: "runtime-event-journal-integrity-report";
  checks: RuntimeEventJournalIntegrityCheck[];
  passCount: number;
  warningCount: number;
  riskCount: number;
  blockerCount: number;
  unknownCount: number;
  summary: string[];
};

export type RuntimeEventJournalSummary = {
  id: "runtime-event-journal-summary";
  entryCount: number;
  blockedCount: number;
  readyCount: number;
  executedCount: number;
  reviewRequiredCount: number;
  memoryPromotionCount: number;
  integrityRiskCount: number;
  topEventType: string;
  nextSafeAction: string;
  summary: string[];
};

export type RuntimeEventJournalSourceSummary = {
  source: string;
  entryCount: number;
  blockedCount: number;
  reviewRequiredCount: number;
  topEntryTitle: string;
  summary: string[];
};

export type RuntimeEventJournalRuntimeExecutorSource = {
  request?: {
    id: string;
    sourceGateId: string;
    sourceSurface: string;
    requestedEventType: string;
    evidenceRefs: string[];
    relatedRoutes: string[];
    relatedFiles: string[];
    approvalPosture?: string;
    policyPosture?: string;
    summary?: string[];
  } | null;
  policy?: {
    id: string;
    requestId: string;
    allowed: boolean;
    blockedReasons: string[];
    warnings: string[];
    summary?: string[];
  } | null;
  validation?: {
    id: string;
    eventType: string;
    valid: boolean;
    blockedReasons: string[];
    warnings: string[];
    summary?: string[];
  } | null;
  approval?: {
    id: string;
    requestId: string;
    approved: boolean;
    summary?: string[];
  } | null;
  reducerPreview?: {
    id: string;
    requestId: string;
    ready: boolean;
    expectedNodeChanges: number;
    expectedEdgeChanges: number;
    impactedMemoryAreas: string[];
    impactedTaskAreas: string[];
    impactedConceptAreas: string[];
    warnings: string[];
    summary?: string[];
  } | null;
  result?: {
    id: string;
    requestId: string;
    ok: boolean;
    status: string;
    eventType: string;
    eventId?: string;
    warnings: string[];
    errors: string[];
    nextSafeAction: string;
    reviewRefs: string[];
    summary?: string[];
  } | null;
  auditLedger?: {
    id: string;
    requestId: string;
    items: Array<{ id: string; state: string; label: string; detail: string }>;
    summary?: string[];
  } | null;
  summary?: {
    id: string;
    executionStatus: string;
    blockedReasons: string[];
    nextSafeAction: string;
    summary?: string[];
  } | null;
};

export type RuntimeEventJournalMemoryPromotionGateSource = {
  gateInput?: {
    id: string;
    inboxCardId: string;
    sourceMemoryReviewId: string;
    proposedMemoryText: string;
    sourceIds: string[];
    relatedRoutes: string[];
    relatedFiles: string[];
    evidenceSnippets: string[];
    promotionReadiness: string;
    reviewState: string;
    summary?: string[];
  } | null;
  approvalPacket?: {
    id: string;
    promotionGateId: string;
    approved: boolean;
    readinessBlockedReasons: string[];
    summary?: string[];
  } | null;
  policy?: {
    id: string;
    promotionGateId: string;
    allowed: boolean;
    eventType: "memory.promoted";
    blockedReasons: string[];
    summary?: string[];
  } | null;
  eventPreview?: {
    id: string;
    type: "memory.promoted";
    eventId: string;
    memoryId: string;
    evidenceRefs: string[];
    blockedReasons: string[];
    futureReducerBoundary: string;
    summary?: string[];
  } | null;
  requestPacket?: {
    id: string;
    promotionGateId: string;
    state: "blocked" | "request-ready" | string;
    blockedReasons: string[];
    summary?: string[];
  } | null;
  bridge?: {
    id: string;
    requestId: string;
    state: string;
    blockedReasons: string[];
    summary?: string[];
  } | null;
  auditLedger?: {
    id: string;
    promotionGateId: string;
    items: Array<{ id: string; state: string; label: string; detail: string }>;
    summary?: string[];
  } | null;
  summary?: {
    id: string;
    promotionGateId: string;
    approvalReady: boolean;
    policyReady: boolean;
    requestReady: boolean;
    blockedReasons: string[];
    nextSafeAction: string;
    summary?: string[];
  } | null;
};

export type RuntimeEventJournalOperatorMemoryInboxSource = {
  cards?: readonly {
    id: string;
    title: string;
    proposedMemoryText: string;
    sourceSurface: string;
    sourceIds: string[];
    reviewState: string;
    promotionReadiness: string;
    relatedRoutes: string[];
    relatedFiles: string[];
    evidenceSnippets: string[];
    summary?: string[];
  }[];
  summary?: {
    id: string;
    cardCount: number;
    pendingReviewCount: number;
    promotionReadyCount: number;
    blockedCount: number;
    nextSafeAction: string;
    summary?: string[];
  } | null;
};

export type RuntimeEventJournalActivityFeedSource = {
  events?: readonly {
    id: string;
    type: string;
    title: string;
    detail: string;
    source: string;
    severity: string;
    status: string;
    relatedRoutes: string[];
    relatedFiles: string[];
    relatedIds: string[];
    reviewRequired: boolean;
    timestampLabel?: string;
    sortKey?: string;
  }[];
  summary?: {
    id: string;
    eventCount: number;
    blockerCount: number;
    reviewRequiredCount: number;
    nextSafeAction: string;
    summary?: string[];
  } | null;
};

export type RuntimeEventJournalBrainRuntimeSource = {
  events?: readonly CodexForgeBrainRuntimeEvent[];
  store?: { events: CodexForgeBrainRuntimeEvent[] } | null;
  sourceId?: string;
  relatedRoutes?: readonly string[];
};

export const RUNTIME_EVENT_JOURNAL_CANONICAL_GRAPH_SCHEMA_PATH =
  "src/lib/codexforge/brain/graph/types.ts" as const;

export function buildRuntimeEventJournalStableKey(
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

export function uniqueRuntimeEventJournalStrings(values?: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set((values ?? []).map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function toRuntimeEventJournalEntryType(value?: string): RuntimeEventJournalEntryType {
  const normalized = String(value ?? "unknown") as RuntimeEventJournalEntryType;
  return RUNTIME_EVENT_JOURNAL_ENTRY_TYPES.includes(normalized) ? normalized : "unknown";
}

export function isRuntimeEventJournalKnownRuntimeEventType(value?: string): value is CodexForgeBrainRuntimeEventType {
  return CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES.includes(value as CodexForgeBrainRuntimeEventType);
}
