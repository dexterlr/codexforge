import type { MemoryInboxReviewPolicy, OperatorMemoryInboxCard } from "./operator-memory-inbox-types";

export function buildMemoryInboxReviewPolicy(card?: OperatorMemoryInboxCard): MemoryInboxReviewPolicy {
  const blockedReasons: string[] = [];
  if (card) {
    if (card.duplicateRisk >= 0.6) blockedReasons.push("duplicate risk requires dedupe review");
    if (card.contradictionRisk >= 0.6) blockedReasons.push("contradiction risk requires operator decision");
    if (card.confidence < 0.55) blockedReasons.push("low confidence blocks promotion");
    if (card.memoryKind === "unknown") blockedReasons.push("unknown kind requires clarification");
    if (card.evidenceSnippets.length === 0) blockedReasons.push("evidence snippets required");
  }
  const policy: MemoryInboxReviewPolicy = {
    id: "operator-memory-inbox-review-policy",
    reviewRequiredBeforePromotion: true,
    promotionPreviewOnly: true,
    noBrainGraphMutation: true,
    noAutoMemoryPromotion: true,
    noAutoMerge: true,
    blockedReasons,
    rules: [
      { id: "review-required", label: "Review required before promotion", state: "review", detail: "Operator review gates every memory candidate." },
      { id: "dedupe-review", label: "Duplicate risk review", state: "review", detail: "Duplicate risk requires dedupe review." },
      { id: "contradiction-decision", label: "Contradiction decision", state: "review", detail: "Contradiction risk requires operator decision." },
      { id: "low-confidence-block", label: "Low confidence block", state: "block", detail: "Low confidence blocks promotion." },
      { id: "unknown-kind-clarification", label: "Unknown kind clarification", state: "block", detail: "Unknown kind requires clarification." },
      { id: "evidence-required", label: "Evidence required", state: "block", detail: "Evidence snippets required." },
      { id: "preview-only", label: "Promotion preview only", state: "block", detail: "This phase creates promotion preview only." },
      { id: "no-brain-graph-mutation", label: "No Brain graph mutation", state: "block", detail: "No Brain graph mutation, no auto-memory promotion, and no auto-merge." },
    ],
    summary: [],
  };
  return { ...policy, summary: summarizeMemoryInboxReviewPolicy(policy) };
}

export function isMemoryInboxPromotionAllowed(card: OperatorMemoryInboxCard, policy = buildMemoryInboxReviewPolicy(card)): boolean {
  if (!policy.reviewRequiredBeforePromotion || !policy.promotionPreviewOnly) return false;
  if (!policy.noBrainGraphMutation || !policy.noAutoMemoryPromotion || !policy.noAutoMerge) return false;
  if (card.reviewState !== "promotion-ready") return false;
  return policy.blockedReasons.length === 0;
}

export function summarizeMemoryInboxReviewPolicy(policy: MemoryInboxReviewPolicy): string[] {
  return [
    "Review required before promotion.",
    "Duplicate risk requires dedupe review; contradiction risk requires operator decision.",
    "Low confidence, unknown kind, or missing evidence blocks promotion.",
    "Promotion preview only in this phase; no Brain graph mutation, no auto-memory promotion, and no auto-merge.",
  ];
}
