import type { MemoryInboxDuplicateGroup, OperatorMemoryInboxCard } from "./operator-memory-inbox-types";
import { buildMemoryInboxStableKey } from "./operator-memory-inbox-types";

export function normalizeMemoryInboxText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s._/-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildMemoryInboxDuplicateGroup(cards: readonly OperatorMemoryInboxCard[]): MemoryInboxDuplicateGroup {
  const normalizedText = normalizeMemoryInboxText(cards[0]?.proposedMemoryText ?? "");
  return {
    id: buildMemoryInboxStableKey("memory-inbox-duplicate-group", normalizedText.slice(0, 64)),
    normalizedText,
    cardIds: cards.map((card) => card.id).sort(),
    duplicateRisk: cards.length > 1 ? Math.min(1, 0.52 + cards.length * 0.12) : 0,
    summary: [`${cards.length} card(s) share deterministic normalization.`],
  };
}

export function dedupeMemoryInboxCards(cards: readonly OperatorMemoryInboxCard[]): { cards: OperatorMemoryInboxCard[]; duplicateGroups: MemoryInboxDuplicateGroup[] } {
  const groups = new Map<string, OperatorMemoryInboxCard[]>();
  for (const card of cards) {
    const key = normalizeMemoryInboxText(card.proposedMemoryText);
    groups.set(key, [...(groups.get(key) ?? []), card]);
  }
  const duplicateGroups = [...groups.values()].filter((group) => group.length > 1).map(buildMemoryInboxDuplicateGroup);
  const duplicateIds = new Set(duplicateGroups.flatMap((group) => group.cardIds));
  return {
    cards: cards.map((card) => duplicateIds.has(card.id) ? { ...card, duplicateRisk: Math.max(card.duplicateRisk, 0.7), reviewState: "needs-dedupe-review" } : card),
    duplicateGroups,
  };
}

export function summarizeMemoryInboxDedupe(groups: readonly MemoryInboxDuplicateGroup[]): string[] {
  return [
    `${groups.length} duplicate group(s) found using deterministic normalization.`,
    "No embeddings, vector database, or AI calls are used.",
  ];
}
