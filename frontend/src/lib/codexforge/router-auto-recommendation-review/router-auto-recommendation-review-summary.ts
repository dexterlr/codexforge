import type {
  RouterAutoRecommendationReviewBoundary,
  RouterAutoRecommendationReviewItem,
  RouterAutoRecommendationReviewModel,
} from "./router-auto-recommendation-review-types";
import { buildRouterAutoRecommendationReviewStableKey } from "./router-auto-recommendation-review-types";

export const ROUTER_AUTO_RECOMMENDATION_REVIEW_LANGUAGE = [
  "Router auto-recommendation review",
  "Recommendations are not auto-applied",
  "No live traffic is routed automatically",
  "Approval required before router changes",
  "Local-first preference",
  "Apply handoff",
  "Do not auto-spend tokens",
] as const;

export function buildRouterAutoRecommendationReviewItem(
  input: Omit<RouterAutoRecommendationReviewItem, "id"> & { idHint: string }
): RouterAutoRecommendationReviewItem {
  const { idHint, ...recommendation } = input;
  return {
    id: buildRouterAutoRecommendationReviewStableKey(
      "router-auto-recommendation-review",
      idHint,
      input.confidenceLevel
    ),
    ...recommendation,
  };
}

export function buildRouterAutoRecommendationReviewItems(): RouterAutoRecommendationReviewItem[] {
  return [
    buildRouterAutoRecommendationReviewItem({
      idHint: "private-draft-local-first",
      taskSummary:
        "Task summary: private draft analysis with small context and no need for premium cloud reasoning.",
      candidateProviderModel:
        "Candidate provider/model: local compatible runtime with operator-selected local model.",
      recommendationRationale:
        "Recommendation rationale: local route protects privacy and avoids cloud spend when the task fits a local model.",
      localFirstPreference:
        "Local-first preference: use local runtime first; cloud review remains a manual fallback only.",
      costLatencyQualityTradeoff:
        "Cost/latency/quality tradeoff: low cloud cost risk and fast local turnaround, with possible quality limits on deep reasoning.",
      privacyReview:
        "Privacy review: prompt stays local; no files or memory payloads are sent to a provider automatically.",
      blockedReasons: [
        "Local runtime status still needs operator confirmation",
        "Router change needs explicit approval",
      ],
      approvalRequirement:
        "Approval required before router changes, including provider/model, scope, privacy note, and token limit.",
      applyHandoff:
        "Apply handoff: copy the recommendation into the router review checklist; do not mutate router config silently.",
      fallbackRoute: "/provider-failure-recovery",
      confidenceLevel: "medium",
    }),
    buildRouterAutoRecommendationReviewItem({
      idHint: "premium-reasoning-cloud-review",
      taskSummary:
        "Task summary: complex reasoning task where a reviewed cloud model may be useful after approval.",
      candidateProviderModel:
        "Candidate provider/model: reviewed cloud provider and premium reasoning model label from captured results.",
      recommendationRationale:
        "Recommendation rationale: quality may justify cloud use only after result evidence, privacy, latency, and estimate review.",
      localFirstPreference:
        "Local-first preference: attempt local summarization or scoping before sending any prompt to cloud.",
      costLatencyQualityTradeoff:
        "Cost/latency/quality tradeoff: better reasoning quality may cost more and wait longer; estimates are review aids.",
      privacyReview:
        "Privacy review: redact secrets, files, private code, and unnecessary memory before any approved live traffic.",
      blockedReasons: [
        "No automatic cloud route is allowed",
        "Spend limit must be reviewed",
        "Prompt summary must be approved",
      ],
      approvalRequirement:
        "Approval required before router changes and before any live provider traffic.",
      applyHandoff:
        "Apply handoff: present provider, model, tradeoff, privacy review, blocked reasons, and fallback route for operator approval.",
      fallbackRoute: "/provider-cost-latency-comparison",
      confidenceLevel: "low",
    }),
  ];
}

export function buildRouterAutoRecommendationReviewBoundary(): RouterAutoRecommendationReviewBoundary {
  return {
    recommendationsAutoAppliedAllowed: false,
    liveTrafficAutoRoutedAllowed: false,
    routerConfigMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    tokenSpendAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
  };
}

export function summarizeRouterAutoRecommendationReview(
  model: Pick<RouterAutoRecommendationReviewModel, "recommendations">
): string {
  return `Router auto-recommendation review prepares ${model.recommendations.length} recommendation(s). Recommendations are not auto-applied, no live traffic is routed automatically, and approval is required before router changes.`;
}

export function buildRouterAutoRecommendationReviewModel(): RouterAutoRecommendationReviewModel {
  const recommendations = buildRouterAutoRecommendationReviewItems();
  const model: RouterAutoRecommendationReviewModel = {
    title: "Router auto-recommendation review",
    summary: "",
    recommendations,
    boundary: buildRouterAutoRecommendationReviewBoundary(),
    reviewLanguage: [...ROUTER_AUTO_RECOMMENDATION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Router auto-recommendation review",
      "Recommendations are not auto-applied",
      "No live traffic is routed automatically",
      "Approval required before router changes",
      "Local-first preference",
      "Apply handoff",
      "Do not auto-spend tokens",
      "No provider APIs are called",
      "No router config mutation from UI",
      "No provider registry mutation",
    ],
  };
  return { ...model, summary: summarizeRouterAutoRecommendationReview(model) };
}
