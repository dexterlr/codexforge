import { classifyMemoryInboxCard } from "./memory-inbox-classifier";
import { scoreMemoryInboxPriority } from "./memory-inbox-priority";
import type { OperatorMemoryInboxCard, OperatorMemoryInboxCardInput } from "./operator-memory-inbox-types";
import { buildMemoryInboxStableKey, clampMemoryInboxScore } from "./operator-memory-inbox-types";

function defaultSurface(source: OperatorMemoryInboxCardInput["source"]) {
  if (source === "activity") return "Global Activity Feed";
  if (source === "verification") return "Verification Ingestion";
  if (source === "regression") return "Regression Triage";
  if (source === "patch-workflow") return "Patch Workflow";
  if (source === "stabilization") return "Stabilization Command Center";
  if (source === "creative") return "Creative Production Studio";
  if (source === "manual") return "Manual Operator Note";
  return "Unknown";
}

export function buildOperatorMemoryInboxCard(input: OperatorMemoryInboxCardInput): OperatorMemoryInboxCard {
  const title = input.title?.trim() || "Memory candidate needs review";
  const proposedMemoryText = input.memoryText?.trim() || input.detail?.trim() || title;
  const sourceIds = Array.from(new Set([...(input.sourceIds ?? []), input.id ?? title].filter(Boolean)));
  const base = {
    id: input.id ?? buildMemoryInboxStableKey("memory-inbox-card", input.source, sourceIds, title),
    title,
    proposedMemoryText,
    source: input.source,
    sourceIds,
    sourceSurface: input.sourceSurface ?? defaultSurface(input.source),
    memoryKind: input.memoryKind ?? "unknown",
    confidence: clampMemoryInboxScore(input.confidence, 0.62),
    importance: clampMemoryInboxScore(input.importance, input.severity === "blocker" ? 0.9 : input.severity === "warning" ? 0.72 : 0.52),
    risk: input.risk ?? (input.severity === "blocker" ? "high" : input.severity === "warning" ? "medium" : "low"),
    reviewState: input.reviewState ?? "pending-review",
    duplicateRisk: clampMemoryInboxScore(input.duplicateRisk, 0.08),
    contradictionRisk: clampMemoryInboxScore(input.contradictionRisk, 0.12),
    promotionReadiness: input.promotionReadiness ?? "preview-only",
    suggestedTags: Array.from(new Set([...(input.suggestedTags ?? []), input.source, "operator-memory-inbox"])),
    relatedRoutes: Array.from(new Set(input.relatedRoutes ?? ["/memory-inbox"])),
    relatedFiles: Array.from(new Set(input.relatedFiles ?? [])),
    evidenceSnippets: Array.from(new Set(input.evidenceSnippets ?? [proposedMemoryText])),
    operatorNote: input.operatorNote,
    noAutoPromotionGuarantee: true as const,
    priorityScore: 0,
    priorityClass: "normal" as const,
    summary: [],
  };
  const classified = { ...base, memoryKind: base.memoryKind === "unknown" ? classifyMemoryInboxCard(base) : base.memoryKind };
  const priority = scoreMemoryInboxPriority(classified);
  const card: OperatorMemoryInboxCard = { ...classified, priorityScore: priority.score, priorityClass: priority.priorityClass };
  return { ...card, summary: summarizeOperatorMemoryInboxCard(card) };
}

export function buildOperatorMemoryInboxCards(inputs: readonly OperatorMemoryInboxCardInput[]): OperatorMemoryInboxCard[] {
  return inputs.map(buildOperatorMemoryInboxCard);
}

export function summarizeOperatorMemoryInboxCard(card: OperatorMemoryInboxCard): string[] {
  return [
    `${card.title} proposes ${card.memoryKind} from ${card.sourceSurface}.`,
    `Confidence ${(card.confidence * 100).toFixed(0)}, importance ${(card.importance * 100).toFixed(0)}, risk ${card.risk}.`,
    "No auto-promotion guarantee: true; review required before promotion.",
  ];
}
