import {
  buildMemoryPromotionGateStableKey,
  buildMemoryPromotionTextDigest,
  clampMemoryPromotionScore,
  type MemoryPromotionGateInput,
  type MemoryPromotionGateInputSource,
  type MemoryPromotionGateInputValidation,
} from "./memory-promotion-gate-types";

export function buildMemoryPromotionGateInput(source: MemoryPromotionGateInputSource): MemoryPromotionGateInput {
  const inboxCardId = source.inboxCardId ?? source.id ?? "memory-inbox-card:missing";
  const proposedMemoryText = (source.proposedMemoryText ?? source.proposedMemoryText ?? "").trim() || "Missing proposed memory text";
  const memoryKind = source.memoryKind ?? "unknown";
  const id = buildMemoryPromotionGateStableKey(
    "memory-promotion-gate",
    inboxCardId,
    memoryKind,
    buildMemoryPromotionTextDigest(proposedMemoryText)
  );
  const input: MemoryPromotionGateInput = {
    id,
    inboxCardId,
    sourceMemoryReviewId: source.sourceMemoryReviewId ?? buildMemoryPromotionGateStableKey("memory-review", inboxCardId),
    proposedMemoryText,
    memoryKind,
    confidence: clampMemoryPromotionScore(source.confidence, 0),
    importance: clampMemoryPromotionScore(source.importance, 0),
    risk: source.risk ?? "medium",
    duplicateRisk: clampMemoryPromotionScore(source.duplicateRisk, 0),
    contradictionRisk: clampMemoryPromotionScore(source.contradictionRisk, 0),
    evidenceSnippets: Array.from(new Set(source.evidenceSnippets ?? [])),
    sourceIds: Array.from(new Set(source.sourceIds ?? [])),
    relatedRoutes: Array.from(new Set(source.relatedRoutes ?? ["/memory-inbox"])),
    relatedFiles: Array.from(new Set(source.relatedFiles ?? [])),
    suggestedTags: Array.from(new Set(source.suggestedTags ?? [])),
    promotionReadiness: source.promotionReadiness ?? "preview-only",
    reviewState: source.reviewState ?? "pending-review",
    noAutoPromotionGuarantee: true,
    summary: [],
  };
  return { ...input, summary: summarizeMemoryPromotionGateInput(input) };
}

export function validateMemoryPromotionGateInput(input: MemoryPromotionGateInput): MemoryPromotionGateInputValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (!input.inboxCardId.trim()) blockedReasons.push("inbox card required");
  if (!input.proposedMemoryText.trim()) blockedReasons.push("proposed memory text required");
  if (input.memoryKind === "unknown") blockedReasons.push("unknown memory kind blocks promotion");
  if (input.evidenceSnippets.length === 0) blockedReasons.push("evidence snippets required");
  if (input.noAutoPromotionGuarantee !== true) blockedReasons.push("no-auto-promotion guarantee required");
  if (input.reviewState !== "promotion-ready" && input.reviewState !== "approved-for-promotion" && input.reviewState !== "reviewed") {
    warnings.push("reviewed state required before request readiness");
  }
  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      blockedReasons.length === 0 ? "Promotion gate input is structurally valid." : `Promotion gate input blocked: ${blockedReasons.join(", ")}.`,
      "Validation uses supplied data only; no file reads, graph writes, network calls, clock-based ids, random ids, or hidden mutation.",
    ],
  };
}

export function summarizeMemoryPromotionGateInput(input: MemoryPromotionGateInput): string[] {
  return [
    `Promotion gate ${input.id} is derived from inbox card ${input.inboxCardId}.`,
    `${input.memoryKind} memory has confidence ${(input.confidence * 100).toFixed(0)}, duplicate risk ${(input.duplicateRisk * 100).toFixed(0)}, contradiction risk ${(input.contradictionRisk * 100).toFixed(0)}.`,
    "No auto-promotion guarantee is true; evidence is context, not authority.",
  ];
}
