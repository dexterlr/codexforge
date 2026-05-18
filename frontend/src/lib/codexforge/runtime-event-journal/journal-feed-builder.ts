import { buildRuntimeEventJournalEntry, normalizeRuntimeEventJournalEntry } from "./journal-entry-model";
import { rankRuntimeEventJournalEntries, scoreRuntimeEventJournalEntryPriority } from "./journal-priority";
import {
  buildJournalEntriesFromActivityFeed,
  buildJournalEntriesFromBrainRuntime,
  buildJournalEntriesFromMemoryPromotionGate,
  buildJournalEntriesFromOperatorMemoryInbox,
  buildJournalEntriesFromRuntimeExecutor,
} from "./journal-source-adapters";
import type {
  RuntimeEventJournalEntry,
  RuntimeEventJournalFeed,
  RuntimeEventJournalFeedInput,
} from "./runtime-event-journal-types";

export function mergeRuntimeEventJournalEntries(...groups: readonly RuntimeEventJournalEntry[][]): RuntimeEventJournalEntry[] {
  return dedupeRuntimeEventJournalEntries(groups.flat());
}

export function dedupeRuntimeEventJournalEntries(entries: readonly RuntimeEventJournalEntry[]): RuntimeEventJournalEntry[] {
  const byId = new Map<string, RuntimeEventJournalEntry>();
  for (const entry of entries.map(normalizeRuntimeEventJournalEntry)) {
    const existing = byId.get(entry.id);
    if (!existing || scoreRuntimeEventJournalEntryPriority(entry) > scoreRuntimeEventJournalEntryPriority(existing)) {
      byId.set(entry.id, entry);
    }
  }
  return rankRuntimeEventJournalEntries([...byId.values()]);
}

export function buildRuntimeEventJournalFeed(input: RuntimeEventJournalFeedInput = {}): RuntimeEventJournalFeed {
  const entries = mergeRuntimeEventJournalEntries(
    (input.entries ?? []).map(buildRuntimeEventJournalEntry),
    buildJournalEntriesFromRuntimeExecutor(input.runtimeExecutor ?? {}),
    buildJournalEntriesFromMemoryPromotionGate(input.memoryPromotionGate ?? {}),
    buildJournalEntriesFromOperatorMemoryInbox(input.operatorMemoryInbox ?? {}),
    buildJournalEntriesFromActivityFeed(input.activityFeed ?? {}),
    buildJournalEntriesFromBrainRuntime(input.brainRuntime ?? {})
  );
  const sources = new Set(entries.map((entry) => String(entry.source)));
  const blockedCount = entries.filter((entry) => entry.type === "execution.blocked" || entry.severity === "blocker" || entry.severity === "risk").length;
  const readyCount = entries.filter((entry) => entry.type === "execution.ready" || entry.resultStatus === "request-ready").length;
  const executedCount = entries.filter((entry) => entry.type === "event.appended" || entry.resultStatus === "executed").length;
  const reviewRequiredCount = entries.filter((entry) => entry.reviewRequired).length;
  const highestPriorityEntry = entries[0];
  const nextSafeAction = blockedCount > 0
    ? "Review runtime journal blockers before any executor handoff."
    : reviewRequiredCount > 0
      ? "Review required lifecycle entries and compare policy, approval, validation, and reducer preview."
      : "Use the journal as append-only audit context; no runtime event execution occurs here.";

  return {
    id: "runtime-event-journal-feed",
    entries,
    entryCount: entries.length,
    sourceCount: sources.size,
    blockedCount,
    readyCount,
    executedCount,
    reviewRequiredCount,
    highestPriorityEntry,
    nextSafeAction,
    summary: summarizeRuntimeEventJournalFeed({ entries, blockedCount, readyCount, executedCount, reviewRequiredCount, sourceCount: sources.size, nextSafeAction }),
  };
}

export function summarizeRuntimeEventJournalFeed(feedOrParts: RuntimeEventJournalFeed | {
  entries: readonly RuntimeEventJournalEntry[];
  sourceCount: number;
  blockedCount: number;
  readyCount: number;
  executedCount: number;
  reviewRequiredCount: number;
  nextSafeAction: string;
}): string[] {
  const entryCount = "entryCount" in feedOrParts ? feedOrParts.entryCount : feedOrParts.entries.length;
  return [
    `${entryCount} runtime event journal entries from ${feedOrParts.sourceCount} source(s).`,
    `${feedOrParts.blockedCount} blocked, ${feedOrParts.readyCount} ready, ${feedOrParts.executedCount} executed, ${feedOrParts.reviewRequiredCount} review-required.`,
    `Next safe action: ${feedOrParts.nextSafeAction}`,
  ];
}
