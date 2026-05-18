import {
  buildRuntimeEventJournalStableKey,
  isRuntimeEventJournalKnownRuntimeEventType,
  toRuntimeEventJournalEntryType,
  uniqueRuntimeEventJournalStrings,
  type RuntimeEventJournalEntry,
  type RuntimeEventJournalEntryInput,
  type RuntimeEventJournalEntryType,
  type RuntimeEventJournalResultStatus,
  type RuntimeEventJournalSeverity,
} from "./runtime-event-journal-types";

function severityFor(type: RuntimeEventJournalEntryType, status?: string): RuntimeEventJournalSeverity {
  if (type === "execution.blocked" || status === "blocked" || status === "failed") return "blocker";
  if (status === "policy-blocked" || status === "validation-failed") return "risk";
  if (type === "memoryPromotion.blocked") return "risk";
  if (type === "execution.ready" || type === "event.appended") return "success";
  if (type === "unknown") return "unknown";
  if (type === "approval.reviewed" || type === "policy.checked" || type === "validation.checked") return "warning";
  return "info";
}

function titleFor(type: RuntimeEventJournalEntryType, runtimeEventType: string): string {
  switch (type) {
    case "request.created":
      return "Runtime event request created";
    case "policy.checked":
      return "Runtime event policy checked";
    case "validation.checked":
      return "Runtime event validation checked";
    case "approval.reviewed":
      return "Runtime event approval reviewed";
    case "dryRun.completed":
      return "Dry-run completed";
    case "reducerPreview.built":
      return "Reducer preview built";
    case "execution.blocked":
      return "Execution blocked";
    case "execution.ready":
      return "Execution ready for guarded boundary";
    case "event.appended":
      return `${runtimeEventType} event appended`;
    case "result.captured":
      return "Runtime event result captured";
    case "memoryPromotion.previewed":
      return "Memory promotion previewed";
    case "memoryPromotion.approved":
      return "Memory promotion approved for handoff";
    case "memoryPromotion.blocked":
      return "Memory promotion blocked";
    default:
      return "Unknown runtime journal entry";
  }
}

function detailFor(type: RuntimeEventJournalEntryType): string {
  if (type === "event.appended") return "Existing append-only runtime event is visible as journal context only.";
  if (type === "execution.ready") return "Request appears ready, but this journal does not execute or append runtime events.";
  if (type === "execution.blocked") return "Blocked result remains review-only and requires operator remediation elsewhere.";
  if (type.startsWith("memoryPromotion")) return "Memory promotion lifecycle is visible without auto-promotion or graph mutation.";
  return "Runtime event lifecycle state is visible in a read-only journal entry.";
}

export function buildRuntimeEventJournalEntry(input: RuntimeEventJournalEntryInput = {}): RuntimeEventJournalEntry {
  const type = toRuntimeEventJournalEntryType(input.type);
  const runtimeEventType = input.runtimeEventType?.trim() || "unknown";
  const source = input.source ?? "runtime-event-journal";
  const sourceId = input.sourceId?.trim() || input.requestId || input.runtimeEventId || "runtime-journal-source";
  const resultStatus = input.resultStatus?.trim() as RuntimeEventJournalResultStatus | string | undefined;
  const entry: RuntimeEventJournalEntry = {
    id:
      input.id ??
      buildRuntimeEventJournalStableKey(
        "runtime-event-journal-entry",
        source,
        type,
        sourceId,
        input.requestId,
        input.runtimeEventId,
        input.approvalId,
        resultStatus
      ),
    type,
    title: input.title?.trim() || titleFor(type, runtimeEventType),
    detail: input.detail?.trim() || detailFor(type),
    source,
    sourceId,
    runtimeEventType,
    runtimeEventId: input.runtimeEventId?.trim() || undefined,
    requestId: input.requestId?.trim() || undefined,
    approvalId: input.approvalId?.trim() || undefined,
    resultStatus,
    severity: input.severity ?? severityFor(type, resultStatus),
    reviewRequired: input.reviewRequired ?? type !== "event.appended",
    relatedRoutes: uniqueRuntimeEventJournalStrings(input.relatedRoutes),
    relatedFiles: uniqueRuntimeEventJournalStrings(input.relatedFiles),
    evidenceRefs: uniqueRuntimeEventJournalStrings(input.evidenceRefs),
    reducerTraceRefs: uniqueRuntimeEventJournalStrings(input.reducerTraceRefs),
    auditRefs: uniqueRuntimeEventJournalStrings(input.auditRefs),
    timestampLabel: input.timestampLabel?.trim() || undefined,
    sortKey: input.sortKey?.trim() || undefined,
    summary: [],
  };
  return normalizeRuntimeEventJournalEntry(entry);
}

export function normalizeRuntimeEventJournalEntry(entry: RuntimeEventJournalEntry): RuntimeEventJournalEntry {
  const type = toRuntimeEventJournalEntryType(entry.type);
  const runtimeEventType = entry.runtimeEventType.trim() || "unknown";
  const normalized: RuntimeEventJournalEntry = {
    ...entry,
    type,
    title: entry.title.trim() || titleFor(type, runtimeEventType),
    detail: entry.detail.trim() || detailFor(type),
    sourceId: entry.sourceId.trim() || "runtime-journal-source",
    runtimeEventType,
    requestId: entry.requestId?.trim() || undefined,
    approvalId: entry.approvalId?.trim() || undefined,
    runtimeEventId: entry.runtimeEventId?.trim() || undefined,
    relatedRoutes: uniqueRuntimeEventJournalStrings(entry.relatedRoutes),
    relatedFiles: uniqueRuntimeEventJournalStrings(entry.relatedFiles),
    evidenceRefs: uniqueRuntimeEventJournalStrings(entry.evidenceRefs),
    reducerTraceRefs: uniqueRuntimeEventJournalStrings(entry.reducerTraceRefs),
    auditRefs: uniqueRuntimeEventJournalStrings(entry.auditRefs),
    severity: entry.severity ?? severityFor(type, entry.resultStatus),
  };
  return { ...normalized, summary: summarizeRuntimeEventJournalEntry(normalized) };
}

export function summarizeRuntimeEventJournalEntry(entry: RuntimeEventJournalEntry): string[] {
  const knownEvent = isRuntimeEventJournalKnownRuntimeEventType(entry.runtimeEventType)
    ? "known runtime event type"
    : "unknown or future runtime event type";
  return [
    `${entry.type} from ${entry.source} for ${entry.runtimeEventType}.`,
    `${entry.severity} severity; review required: ${entry.reviewRequired ? "yes" : "no"}; ${knownEvent}.`,
    `Routes: ${entry.relatedRoutes.length}; files: ${entry.relatedFiles.length}; evidence refs: ${entry.evidenceRefs.length}.`,
  ];
}
