import {
  RUNTIME_EVENT_JOURNAL_CANONICAL_GRAPH_SCHEMA_PATH,
  buildRuntimeEventJournalStableKey,
  uniqueRuntimeEventJournalStrings,
  type RuntimeEventJournalEntry,
  type RuntimeEventReducerTrace,
  type RuntimeEventReducerTraceItem,
} from "./runtime-event-journal-types";

export type RuntimeEventReducerTraceItemInput = {
  id?: string;
  entry?: RuntimeEventJournalEntry;
  sourceEventOrRequest?: string;
  runtimeEventType?: string;
  reducerPreviewSummary?: readonly string[];
  expectedNodeCountDelta?: number;
  expectedEdgeCountDelta?: number;
  impactedGraphAreas?: readonly string[];
  warnings?: readonly string[];
  blockedReasons?: readonly string[];
};

export function buildRuntimeEventReducerTraceItem(input: RuntimeEventReducerTraceItemInput = {}): RuntimeEventReducerTraceItem {
  const entry = input.entry;
  const sourceEventOrRequest = input.sourceEventOrRequest ?? entry?.requestId ?? entry?.runtimeEventId ?? entry?.sourceId ?? "runtime-journal";
  const runtimeEventType = input.runtimeEventType ?? entry?.runtimeEventType ?? "unknown";
  const expectedNodeCountDelta = input.expectedNodeCountDelta ?? (runtimeEventType === "memory.promoted" ? 1 : 0);
  const expectedEdgeCountDelta = input.expectedEdgeCountDelta ?? 0;
  const warnings = uniqueRuntimeEventJournalStrings(input.warnings ?? (entry?.type === "reducerPreview.built" ? [] : ["Reducer trace is advisory journal context only."]));
  const blockedReasons = uniqueRuntimeEventJournalStrings(input.blockedReasons ?? (entry?.type === "execution.blocked" ? [entry.detail] : []));
  const item: RuntimeEventReducerTraceItem = {
    id: input.id ?? buildRuntimeEventJournalStableKey("runtime-event-reducer-trace", sourceEventOrRequest, runtimeEventType),
    sourceEventOrRequest,
    runtimeEventType,
    reducerPreviewSummary: [...(input.reducerPreviewSummary ?? entry?.summary ?? ["Reducer trace is read-only and preview-only."])],
    expectedNodeCountDelta,
    expectedEdgeCountDelta,
    impactedGraphAreas: uniqueRuntimeEventJournalStrings(input.impactedGraphAreas ?? [runtimeEventType, ...(entry?.relatedFiles ?? [])]),
    warnings,
    blockedReasons,
    canonicalGraphSchemaPath: RUNTIME_EVENT_JOURNAL_CANONICAL_GRAPH_SCHEMA_PATH,
    noMutationGuarantee: true,
    summary: [],
  };
  return { ...item, summary: summarizeRuntimeEventReducerTraceItem(item) };
}

export function buildRuntimeEventReducerTrace(input: {
  entries?: readonly RuntimeEventJournalEntry[];
  items?: readonly RuntimeEventReducerTraceItem[];
} = {}): RuntimeEventReducerTrace {
  const suppliedItems = [...(input.items ?? [])];
  const entryItems = (input.entries ?? [])
    .filter((entry) => entry.type === "reducerPreview.built" || entry.reducerTraceRefs.length > 0 || entry.runtimeEventType !== "unknown")
    .map((entry) => buildRuntimeEventReducerTraceItem({ entry }));
  const items = suppliedItems.length > 0 ? suppliedItems : entryItems;
  const trace: RuntimeEventReducerTrace = {
    id: "runtime-event-reducer-trace",
    items,
    warningCount: items.reduce((total, item) => total + item.warnings.length, 0),
    blockedCount: items.filter((item) => item.blockedReasons.length > 0).length,
    summary: [],
  };
  return { ...trace, summary: summarizeRuntimeEventReducerTrace(trace) };
}

function summarizeRuntimeEventReducerTraceItem(item: RuntimeEventReducerTraceItem): string[] {
  return [
    `${item.runtimeEventType} trace expects node delta ${item.expectedNodeCountDelta} and edge delta ${item.expectedEdgeCountDelta}.`,
    `Canonical graph schema path: ${item.canonicalGraphSchemaPath}.`,
    "Trace has a no mutation guarantee.",
  ];
}

export function summarizeRuntimeEventReducerTrace(trace: RuntimeEventReducerTrace): string[] {
  return [
    `${trace.items.length} reducer trace item(s).`,
    `${trace.warningCount} warning(s), ${trace.blockedCount} blocked trace item(s).`,
    `Reducer trace references canonical graph schema path ${RUNTIME_EVENT_JOURNAL_CANONICAL_GRAPH_SCHEMA_PATH} and does not import brain-graph.`,
  ];
}
