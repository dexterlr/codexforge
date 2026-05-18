import { summarizeMemoryInboxClassification } from "./memory-inbox-classifier";
import { dedupeMemoryInboxCards } from "./memory-inbox-dedupe";
import { rankMemoryInboxCards } from "./memory-inbox-priority";
import { summarizeMemoryInboxSources } from "./memory-inbox-source-adapters";
import type { OperatorMemoryInboxCard, OperatorMemoryInboxSession, OperatorMemoryInboxSummary } from "./operator-memory-inbox-types";

export function buildOperatorMemoryInboxSummary(cards: readonly OperatorMemoryInboxCard[]): OperatorMemoryInboxSummary {
  const ranked = rankMemoryInboxCards(cards);
  const duplicateGroups = dedupeMemoryInboxCards(cards).duplicateGroups;
  const pendingReviewCount = cards.filter((card) => card.reviewState === "pending-review" || card.reviewState === "needs-dedupe-review" || card.reviewState === "needs-operator-decision").length;
  const promotionReadyCount = cards.filter((card) => card.reviewState === "promotion-ready").length;
  const blockedCount = cards.filter((card) => card.reviewState === "blocked" || card.priorityClass === "blocked").length;
  const contradictionRiskCount = cards.filter((card) => card.contradictionRisk >= 0.6).length;
  const nextSafeAction = blockedCount > 0
    ? "Resolve blocked memory candidates before promotion preview."
    : pendingReviewCount > 0
      ? "Review memory inbox candidates before promotion preview."
      : "Copy promotion preview for an explicitly reviewed card.";
  return {
    id: "operator-memory-inbox-summary",
    cardCount: cards.length,
    pendingReviewCount,
    promotionReadyCount,
    blockedCount,
    duplicateGroupCount: duplicateGroups.length,
    contradictionRiskCount,
    topPriorityCard: ranked[0],
    nextSafeAction,
    summary: [
      `${cards.length} operator memory inbox card(s).`,
      `${pendingReviewCount} pending review, ${promotionReadyCount} promotion ready, ${blockedCount} blocked.`,
      `${duplicateGroups.length} duplicate group(s), ${contradictionRiskCount} contradiction risk card(s).`,
      nextSafeAction,
    ],
  };
}

export function summarizeOperatorMemoryInboxSession(cards: readonly OperatorMemoryInboxCard[]): OperatorMemoryInboxSession {
  const dedupe = dedupeMemoryInboxCards(cards);
  const ranked = rankMemoryInboxCards(dedupe.cards);
  return {
    id: "operator-memory-inbox-session",
    cards: ranked,
    sourceSummary: summarizeMemoryInboxSources(ranked),
    classificationSummary: summarizeMemoryInboxClassification(ranked),
    duplicateGroups: dedupe.duplicateGroups,
    summary: buildOperatorMemoryInboxSummary(ranked),
  };
}
