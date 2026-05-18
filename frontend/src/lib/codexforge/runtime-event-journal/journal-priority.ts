import type {
  RuntimeEventJournalEntry,
  RuntimeEventJournalPriorityClass,
  RuntimeEventJournalSeverity,
} from "./runtime-event-journal-types";

const SEVERITY_SCORE: Record<RuntimeEventJournalSeverity, number> = {
  blocker: 500,
  risk: 420,
  warning: 300,
  info: 120,
  success: 90,
  unknown: 20,
};

export function scoreRuntimeEventJournalEntryPriority(entry: RuntimeEventJournalEntry): number {
  let score = SEVERITY_SCORE[entry.severity] ?? 0;
  if (entry.type === "execution.blocked") score += 700;
  if (entry.resultStatus === "policy-blocked" || entry.resultStatus === "validation-failed") score += 560;
  if (entry.type === "policy.checked" || entry.type === "validation.checked") score += entry.severity === "risk" ? 500 : 180;
  if (entry.reviewRequired) score += 160;
  if (entry.type === "memoryPromotion.blocked") score += 360;
  if (entry.type === "memoryPromotion.previewed" && entry.reviewRequired) score += 190;
  if (entry.type === "execution.ready") score += 140;
  if (entry.type === "event.appended" || entry.resultStatus === "executed") score -= 80;
  if (entry.type === "unknown") score -= 40;
  return Math.max(0, score);
}

export function classifyRuntimeEventJournalPriority(entry: RuntimeEventJournalEntry): RuntimeEventJournalPriorityClass {
  if (entry.type === "execution.blocked" || entry.severity === "blocker" || entry.severity === "risk") return "blocked-first";
  if (entry.reviewRequired) return "review-required";
  if (entry.type === "execution.ready") return "ready";
  if (entry.type === "event.appended" || entry.resultStatus === "executed") return "executed";
  if (entry.type === "unknown") return "unknown";
  return "informational";
}

export function rankRuntimeEventJournalEntries(entries: readonly RuntimeEventJournalEntry[]): RuntimeEventJournalEntry[] {
  return [...entries].sort((left, right) => {
    const priorityDelta = scoreRuntimeEventJournalEntryPriority(right) - scoreRuntimeEventJournalEntryPriority(left);
    if (priorityDelta !== 0) return priorityDelta;
    const sortDelta = (left.sortKey ?? "").localeCompare(right.sortKey ?? "");
    if (sortDelta !== 0) return sortDelta;
    return left.id.localeCompare(right.id);
  });
}
