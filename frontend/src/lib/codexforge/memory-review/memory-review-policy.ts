import type { MemoryPromotionPolicy, MemoryReviewItem } from "./memory-review-types";

export function buildMemoryPromotionPolicy(): MemoryPromotionPolicy {
  const policy: MemoryPromotionPolicy = {
    id: "memory-promotion-policy",
    autoPromotionAllowed: false,
    explicitApprovalRequired: true,
    uiDirectGraphMutationAllowed: false,
    producesRuntimeEventPreviewFirst: true,
    rules: [
      {
        id: "no-auto-promotion",
        label: "No auto-promotion",
        state: "block",
        detail: "Candidates never promote without an explicit review state.",
      },
      {
        id: "contradiction-risk-review",
        label: "Contradiction risk review",
        state: "review",
        detail: "Contradiction risk requires review before approval.",
      },
      {
        id: "low-confidence-review",
        label: "Low confidence review",
        state: "review",
        detail: "Low confidence requires review or more context.",
      },
      {
        id: "source-traceability-required",
        label: "Source traceability required",
        state: "block",
        detail: "Missing source traceability blocks promotion.",
      },
      {
        id: "explicit-approval-required",
        label: "Explicit approval required",
        state: "review",
        detail: "Promotion event preview requires approved-for-promotion review state.",
      },
      {
        id: "ui-no-direct-graph-mutation",
        label: "No direct graph mutation",
        state: "block",
        detail: "UI cannot directly mutate graph memory.",
      },
      {
        id: "runtime-event-preview-first",
        label: "Runtime event preview first",
        state: "review",
        detail: "Promotion produces runtime event preview first.",
      },
    ],
    summary: [],
  };

  return { ...policy, summary: summarizeMemoryPromotionPolicy(policy) };
}

export function isMemoryPromotionAllowed(
  item: MemoryReviewItem,
  policy: MemoryPromotionPolicy = buildMemoryPromotionPolicy()
): boolean {
  if (policy.autoPromotionAllowed) return false;
  if (!policy.explicitApprovalRequired) return false;
  if (policy.uiDirectGraphMutationAllowed) return false;
  if (!policy.producesRuntimeEventPreviewFirst) return false;
  if (item.reviewState !== "approved-for-promotion") return false;
  if (item.sourceRefs.length === 0) return false;
  if (item.contradictionRisk >= 0.62) return false;
  if (item.confidence < 0.6) return false;
  if (item.promotionReadiness === "blocked") return false;
  return true;
}

export function summarizeMemoryPromotionPolicy(policy: MemoryPromotionPolicy): string[] {
  return [
    policy.autoPromotionAllowed
      ? "Auto-promotion is unexpectedly enabled."
      : "No auto-promotion is allowed.",
    policy.explicitApprovalRequired
      ? "Policy requires explicit approval before promotion event preview."
      : "Policy is missing explicit approval.",
    policy.uiDirectGraphMutationAllowed
      ? "UI direct graph mutation is unexpectedly allowed."
      : "No direct graph mutation is allowed from UI.",
    policy.producesRuntimeEventPreviewFirst
      ? "Promotion produces a runtime event preview first."
      : "Promotion preview boundary is missing.",
  ];
}
