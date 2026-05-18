import type {
  MemoryPromotionApprovalPacket,
  MemoryPromotionGateInput,
  MemoryPromotionPolicy,
  MemoryPromotionPolicyRule,
} from "./memory-promotion-gate-types";

function rule(id: string, label: string, state: MemoryPromotionPolicyRule["state"], detail: string): MemoryPromotionPolicyRule {
  return { id, label, state, detail };
}

export function buildMemoryPromotionPolicy(
  input: MemoryPromotionGateInput,
  approval?: MemoryPromotionApprovalPacket | null
): MemoryPromotionPolicy {
  const rules: MemoryPromotionPolicyRule[] = [
    rule("inbox-card-required", "Inbox card required", input.inboxCardId ? "allow" : "block", "Promotion starts from a reviewed inbox card."),
    rule("reviewed-state-required", "Reviewed state required", input.reviewState === "promotion-ready" || input.reviewState === "approved-for-promotion" || input.reviewState === "reviewed" ? "allow" : "block", "Unreviewed inbox cards cannot become request-ready."),
    rule("explicit-approval-required", "Explicit approval packet required", approval?.approved ? "allow" : "block", "Default approved is false and missing approval blocks promotion readiness."),
    rule("evidence-required", "Evidence snippets required", input.evidenceSnippets.length > 0 ? "allow" : "block", "Evidence is context, not authority, but at least one snippet is required."),
    rule("low-confidence-ack", "Low confidence extra acknowledgement", input.confidence >= 0.55 || approval?.acknowledgedLowConfidence ? "allow" : "block", "low confidence blocks promotion unless extra acknowledgement is supplied."),
    rule("duplicate-risk-reviewed", "Duplicate risk dedupe reviewed", input.duplicateRisk < 0.5 || approval?.dedupeReviewed ? "allow" : "block", "duplicate risk blocks promotion unless reviewed; Duplicate risk blocks promotion unless dedupe was reviewed."),
    rule("contradiction-risk-decision", "Contradiction risk operator decision", input.contradictionRisk < 0.5 || approval?.contradictionDecisionSupplied ? "allow" : "block", "contradiction risk blocks promotion unless operator decision supplied; Contradiction risk blocks promotion unless an explicit operator decision is supplied."),
    rule("known-memory-kind", "Known memory kind required", input.memoryKind === "unknown" ? "block" : "allow", "Unknown memory kind blocks promotion."),
    rule("event-type-memory-promoted", "Promotion event must be memory.promoted", "allow", "The preview event type is memory.promoted."),
    rule("append-event-ui-blocked", "appendEvent is not called from UI", "allow", "UI must not append runtime events automatically."),
    rule("graph-mutation-blocked", "Graph mutation blocked in Phase 45", "block", "Graph mutation is blocked until a guarded runtime event executor exists."),
  ];
  const blockedReasons = rules.filter((item) => item.state === "block").map((item) => item.label);
  const policy: MemoryPromotionPolicy = {
    id: `${input.id}:policy`,
    promotionGateId: input.id,
    allowed: blockedReasons.length === 0,
    eventType: "memory.promoted",
    appendEventCalledFromUi: false,
    uiGraphMutationAllowed: false,
    graphMutationBlockedInPhase45: true,
    evidenceIsContextNotAuthority: true,
    latestMessageAuthorityPreserved: true,
    blockedReasons,
    rules,
    summary: [],
  };
  return { ...policy, summary: summarizeMemoryPromotionPolicy(policy) };
}

export function isMemoryPromotionAllowed(policy: MemoryPromotionPolicy): boolean {
  return policy.allowed;
}

export function summarizeMemoryPromotionPolicy(policy: MemoryPromotionPolicy): string[] {
  return [
    policy.allowed ? "Policy is request-ready." : `Policy blocks request readiness: ${policy.blockedReasons.join(", ")}.`,
    "appendEvent is not called from UI; no graph mutation; no auto-promotion.",
    "Evidence is context, not authority, and latest-message authority is preserved.",
  ];
}
