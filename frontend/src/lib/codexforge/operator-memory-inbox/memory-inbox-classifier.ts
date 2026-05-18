import type { OperatorMemoryInboxCard, OperatorMemoryKind } from "./operator-memory-inbox-types";

const KIND_ORDER: OperatorMemoryKind[] = [
  "verification-result",
  "regression-lesson",
  "rollback-note",
  "safety-boundary",
  "fix-pattern",
  "implementation-detail",
  "workflow-preference",
  "creative-production-note",
  "architecture-note",
  "follow-up",
  "unknown",
];

function haystack(card: Pick<OperatorMemoryInboxCard, "title" | "proposedMemoryText" | "evidenceSnippets" | "operatorNote" | "relatedRoutes" | "relatedFiles">): string {
  return [
    card.title,
    card.proposedMemoryText,
    card.operatorNote ?? "",
    ...card.evidenceSnippets,
    ...card.relatedRoutes,
    ...card.relatedFiles,
  ].join(" ").toLowerCase();
}

export function classifyMemoryInboxCard(card: Pick<OperatorMemoryInboxCard, "title" | "proposedMemoryText" | "evidenceSnippets" | "operatorNote" | "relatedRoutes" | "relatedFiles">): OperatorMemoryKind {
  const text = haystack(card);
  if (/\b(pass|passed|build succeeded|smoke passed|verification passed|verification failed|npm run build)\b/.test(text)) return "verification-result";
  if (/\b(duplicate key|layout shift|browser warning|regression|failed smoke|hydration|overflow)\b/.test(text)) return "regression-lesson";
  if (/\b(rollback|revert plan|restore checkpoint|undo command)\b/.test(text)) return "rollback-note";
  if (/\b(apply gate|dry-run|dry run|apply-diff|write-file|run-command|no graph mutation|no auto-promotion|approval required|blocked-policy)\b/.test(text)) return "safety-boundary";
  if (/\b(fix pattern|patched|resolved by|queue fix|safe patch preview|preview diff)\b/.test(text)) return "fix-pattern";
  if (/\b(route|workspace|page-client|component|module|src\/|src\\|app\/|lib\/)\b/.test(text)) return "implementation-detail";
  if (/\b(operator preference|prefer|always|never|latest-message authority|review-first)\b/.test(text)) return "workflow-preference";
  if (/\b(storyboard|render|comfyui|unreal|blender|shot list|creative brief)\b/.test(text)) return "creative-production-note";
  if (/\b(architecture|boundary|adapter|runtime|domain model)\b/.test(text)) return "architecture-note";
  return "follow-up";
}

export function classifyMemoryInboxCards(cards: readonly OperatorMemoryInboxCard[]): OperatorMemoryInboxCard[] {
  return cards.map((card) => ({ ...card, memoryKind: card.memoryKind === "unknown" ? classifyMemoryInboxCard(card) : card.memoryKind }));
}

export function summarizeMemoryInboxClassification(cards: readonly OperatorMemoryInboxCard[]) {
  const counts = Object.fromEntries(KIND_ORDER.map((kind) => [kind, 0])) as Record<OperatorMemoryKind, number>;
  for (const card of cards) counts[card.memoryKind] += 1;
  return {
    counts,
    summary: KIND_ORDER.filter((kind) => counts[kind] > 0).map((kind) => `${counts[kind]} ${kind} card(s).`),
  };
}
