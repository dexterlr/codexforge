import type { MemoryInboxPriorityClass, MemoryInboxPriorityResult, OperatorMemoryInboxCard } from "./operator-memory-inbox-types";

const RISK_SCORE = { low: 8, medium: 18, high: 30, critical: 42 } as const;
const PRIORITY_RANK: Record<MemoryInboxPriorityClass, number> = { urgent: 5, high: 4, normal: 3, low: 2, blocked: 1 };

export function scoreMemoryInboxPriority(card: OperatorMemoryInboxCard): MemoryInboxPriorityResult {
  let score = Math.round(card.confidence * 24 + card.importance * 34 + RISK_SCORE[card.risk]);
  const reasons: string[] = ["confidence", "importance", "risk"];
  const evidence = `${card.title} ${card.proposedMemoryText} ${card.evidenceSnippets.join(" ")}`.toLowerCase();
  if (/\b(failed|fail|blocker|error)\b/.test(evidence)) {
    score += 18;
    reasons.push("verification fail or blocker");
  }
  if (/\b(pass|passed|success)\b/.test(evidence)) {
    score += 6;
    reasons.push("verification pass");
  }
  if (card.sourceIds.length > 1) {
    score += Math.min(12, card.sourceIds.length * 3);
    reasons.push("repeated source signals");
  }
  if (card.operatorNote) {
    score += 9;
    reasons.push("operator note present");
  }
  if (card.reviewState === "promotion-ready") score += 8;
  if (card.reviewState === "blocked") score -= 36;
  if (card.duplicateRisk >= 0.6) score -= 12;
  if (card.contradictionRisk >= 0.6) score -= 16;
  score += Math.min(8, card.relatedFiles.length * 2);
  return { cardId: card.id, score, priorityClass: classifyMemoryInboxPriority(score, card.reviewState === "blocked"), reasons };
}

export function classifyMemoryInboxPriority(score: number, blocked = false): MemoryInboxPriorityClass {
  if (blocked) return "blocked";
  if (score >= 86) return "urgent";
  if (score >= 68) return "high";
  if (score >= 42) return "normal";
  return "low";
}

export function rankMemoryInboxCards(cards: readonly OperatorMemoryInboxCard[]): OperatorMemoryInboxCard[] {
  return [...cards].sort((a, b) => {
    if (a.priorityClass !== b.priorityClass) return PRIORITY_RANK[b.priorityClass] - PRIORITY_RANK[a.priorityClass];
    if (a.priorityScore !== b.priorityScore) return b.priorityScore - a.priorityScore;
    if (a.confidence !== b.confidence) return b.confidence - a.confidence;
    return a.id.localeCompare(b.id);
  });
}
