import type {
  RuntimeEventJournalEntry,
  RuntimeEventJournalFeed,
  RuntimeEventJournalIntegrityReport,
  RuntimeEventJournalSummary,
} from "./runtime-event-journal-types";

function topEventType(entries: readonly RuntimeEventJournalEntry[]): string {
  const counts = new Map<string, number>();
  for (const entry of entries) counts.set(entry.runtimeEventType, (counts.get(entry.runtimeEventType) ?? 0) + 1);
  return [...counts.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))[0]?.[0] ?? "none";
}

export function buildRuntimeEventJournalSummary(
  feed: RuntimeEventJournalFeed,
  integrity?: RuntimeEventJournalIntegrityReport | null
): RuntimeEventJournalSummary {
  const memoryPromotionCount = feed.entries.filter((entry) => entry.type.startsWith("memoryPromotion") || entry.runtimeEventType === "memory.promoted").length;
  const integrityRiskCount = (integrity?.riskCount ?? 0) + (integrity?.blockerCount ?? 0);
  const summary: RuntimeEventJournalSummary = {
    id: "runtime-event-journal-summary",
    entryCount: feed.entryCount,
    blockedCount: feed.blockedCount,
    readyCount: feed.readyCount,
    executedCount: feed.executedCount,
    reviewRequiredCount: feed.reviewRequiredCount,
    memoryPromotionCount,
    integrityRiskCount,
    topEventType: topEventType(feed.entries),
    nextSafeAction: integrityRiskCount > 0 ? "Review journal integrity risks before any runtime handoff." : feed.nextSafeAction,
    summary: [],
  };
  return { ...summary, summary: summarizeRuntimeEventJournalSession(summary) };
}

export function summarizeRuntimeEventJournalSession(summary: RuntimeEventJournalSummary): string[] {
  return [
    `${summary.entryCount} journal entries; ${summary.memoryPromotionCount} memory promotion lifecycle entries.`,
    `${summary.blockedCount} blocked, ${summary.readyCount} ready, ${summary.executedCount} executed, ${summary.reviewRequiredCount} review-required.`,
    `Top event type: ${summary.topEventType}. Next safe action: ${summary.nextSafeAction}`,
  ];
}
