import { buildRuntimeEventJournalFeed } from "./journal-feed-builder";
import type {
  RuntimeEventJournalEntry,
  RuntimeEventJournalFeed,
  RuntimeEventJournalFilter,
  RuntimeEventJournalFilterId,
} from "./runtime-event-journal-types";

const FILTER_LABELS: Record<RuntimeEventJournalFilterId, string> = {
  all: "All",
  requests: "Requests",
  approvals: "Approvals",
  policy: "Policy",
  validation: "Validation",
  "dry runs": "Dry runs",
  "reducer previews": "Reducer previews",
  blocked: "Blocked",
  ready: "Ready",
  executed: "Executed",
  "memory promotion": "Memory promotion",
  "review required": "Review required",
};

function tokens(search: string): string[] {
  return search
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function matchesKind(entry: RuntimeEventJournalEntry, id: RuntimeEventJournalFilterId): boolean {
  if (id === "all") return true;
  if (id === "requests") return entry.type === "request.created";
  if (id === "approvals") return entry.type === "approval.reviewed" || entry.type === "memoryPromotion.approved";
  if (id === "policy") return entry.type === "policy.checked";
  if (id === "validation") return entry.type === "validation.checked";
  if (id === "dry runs") return entry.type === "dryRun.completed";
  if (id === "reducer previews") return entry.type === "reducerPreview.built";
  if (id === "blocked") return entry.type === "execution.blocked" || entry.severity === "blocker" || entry.severity === "risk";
  if (id === "ready") return entry.type === "execution.ready" || entry.resultStatus === "request-ready";
  if (id === "executed") return entry.type === "event.appended" || entry.resultStatus === "executed";
  if (id === "memory promotion") return entry.type.startsWith("memoryPromotion") || entry.runtimeEventType === "memory.promoted";
  if (id === "review required") return entry.reviewRequired;
  return true;
}

function searchText(entry: RuntimeEventJournalEntry): string {
  return [
    entry.title,
    entry.detail,
    entry.source,
    entry.sourceId,
    entry.runtimeEventType,
    entry.runtimeEventId,
    entry.requestId,
    entry.approvalId,
    entry.resultStatus,
    entry.relatedRoutes.join(" "),
    entry.relatedFiles.join(" "),
    entry.evidenceRefs.join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function buildRuntimeEventJournalFilter(
  id: RuntimeEventJournalFilterId = "all",
  search = ""
): RuntimeEventJournalFilter {
  return {
    id,
    label: FILTER_LABELS[id],
    search,
    tokens: tokens(search),
  };
}

export function filterRuntimeEventJournalFeed(
  feed: RuntimeEventJournalFeed,
  filter: RuntimeEventJournalFilter = buildRuntimeEventJournalFilter()
): RuntimeEventJournalFeed {
  const entries = feed.entries.filter((entry) => {
    if (!matchesKind(entry, filter.id)) return false;
    if (filter.tokens.length === 0) return true;
    const text = searchText(entry);
    return filter.tokens.every((token) => text.includes(token));
  });
  return buildRuntimeEventJournalFeed({ entries });
}

export function summarizeRuntimeEventJournalFilter(filter: RuntimeEventJournalFilter): string[] {
  return [
    `Runtime journal filter: ${filter.label}.`,
    filter.tokens.length > 0 ? `Search tokens: ${filter.tokens.join(", ")}.` : "No search tokens.",
  ];
}
