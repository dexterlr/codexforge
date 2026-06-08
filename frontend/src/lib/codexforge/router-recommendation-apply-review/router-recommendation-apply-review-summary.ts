import type {
  RouterRecommendationApplyReviewBoundary,
  RouterRecommendationApplyReviewItem,
  RouterRecommendationApplyReviewModel,
} from "./router-recommendation-apply-review-types";
import { buildRouterRecommendationApplyReviewStableKey } from "./router-recommendation-apply-review-types";

export const ROUTER_RECOMMENDATION_APPLY_REVIEW_LANGUAGE = [
  "Router recommendation apply review",
  "Router recommendations are not applied automatically",
  "Provider registry changes require explicit review",
  "No live traffic is routed from this page",
  "Cost latency evidence summary",
  "Rollback note",
] as const;

export function buildRouterRecommendationApplyReviewItem(
  input: Omit<RouterRecommendationApplyReviewItem, "id"> & { idHint: string }
): RouterRecommendationApplyReviewItem {
  const { idHint, ...recommendation } = input;
  return {
    id: buildRouterRecommendationApplyReviewStableKey(
      "router-recommendation-apply-review",
      idHint,
      input.status
    ),
    ...recommendation,
  };
}

export function buildRouterRecommendationApplyReviewItems(): RouterRecommendationApplyReviewItem[] {
  return [
    buildRouterRecommendationApplyReviewItem({
      idHint: "reviewed-local-first-route",
      status: "approval-required",
      reviewIdentity:
        "Review identity: router-recommendation-apply-review-local-first, a human review packet for a local-first provider/model recommendation.",
      sourceCalibrationDependency:
        "Source calibration dependency: /provider-cost-latency-calibration reviewed provider test persistence and cost latency calibration before this recommendation was prepared.",
      providerModelRecommendationSummary:
        "Provider/model recommendation summary: prefer the reviewed local compatible runtime for private short analysis and keep cloud fallback as manual review only.",
      routingReason:
        "Routing reason: privacy fit, low cost estimate, and adequate local capability make local-first the safer reviewed recommendation.",
      costLatencyEvidenceSummary:
        "Cost latency evidence summary: persisted result notes show zero cloud spend from this page, short local turnaround, and advisory estimates only.",
      reliabilitySignal:
        "Reliability signal: reviewed result persistence shows local-compatible path ready for review while cloud evidence remains approval-gated.",
      privacyPolicyImpact:
        "Privacy/policy impact: prompt and file context stay local unless a separate provider-send approval packet is reviewed.",
      approvalRequirement:
        "Approval requirement: router recommendations are not applied automatically, provider registry changes require explicit review, and no live traffic is routed from this page.",
      rollbackNote:
        "Rollback note: keep the current router preference unchanged until an approved apply packet records before/after routing labels.",
      blockedReasons: [
        "Router recommendations are not applied automatically",
        "Provider registry changes require explicit review",
        "No live traffic is routed from this page",
      ],
      advancedRecommendationDetails:
        "Advanced recommendation details: this review does not call provider APIs, retry provider requests, send prompts or files, auto-spend tokens, auto-route live provider traffic, mutate provider registry silently, export secrets, execute commands, read local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildRouterRecommendationApplyReviewItem({
      idHint: "blocked-cloud-route",
      status: "blocked",
      reviewIdentity:
        "Review identity: router-recommendation-apply-review-cloud-blocked.",
      sourceCalibrationDependency:
        "Source calibration dependency: blocked because reviewed cost, latency, reliability, privacy, or budget evidence is incomplete.",
      providerModelRecommendationSummary:
        "Provider/model recommendation summary: cloud premium route remains a label only until reviewed provider test evidence exists.",
      routingReason:
        "Routing reason: blocked because the router should not infer live provider changes from missing or unreviewed results.",
      costLatencyEvidenceSummary:
        "Cost latency evidence summary: blocked until persisted cost and latency estimates are reviewed as advisory evidence.",
      reliabilitySignal:
        "Reliability signal: blocked until failed, timed out, passed, or needs-review provider result status is confirmed.",
      privacyPolicyImpact:
        "Privacy/policy impact: blocked until privacy classifier and provider policy bundle review approve the route scope.",
      approvalRequirement:
        "Approval requirement: a human must review provider, model, privacy, budget, reliability, rollback, and registry impact before any future apply.",
      rollbackNote:
        "Rollback note: no rollback action is needed because no router or provider registry setting changes on this page.",
      blockedReasons: [
        "Reviewed calibration evidence missing",
        "Privacy/policy impact missing",
        "Rollback note missing",
      ],
      advancedRecommendationDetails:
        "Advanced recommendation details: blocked recommendations remain review-only and cannot update routing, provider settings, provider registry entries, policy bundles, or live traffic.",
    }),
  ];
}

export function buildRouterRecommendationApplyReviewBoundary(): RouterRecommendationApplyReviewBoundary {
  return {
    routerRecommendationsAutoAppliedAllowed: false,
    routerConfigMutationAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    silentProviderRegistryMutationAllowed: false,
    providerRegistryChangeWithoutReviewAllowed: false,
    liveTrafficRoutedFromPageAllowed: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    providerRetryAllowedFromUi: false,
    apiKeyExportAllowed: false,
    secretExportAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    rawFetchAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeRouterRecommendationApplyReview(
  model: Pick<RouterRecommendationApplyReviewModel, "recommendations">
): string {
  return `Router recommendation apply review prepares ${model.recommendations.length} reviewed recommendation packet(s). Router recommendations are not applied automatically, provider registry changes require explicit review, and no live traffic is routed from this page.`;
}

export function buildRouterRecommendationApplyReviewModel(): RouterRecommendationApplyReviewModel {
  const recommendations = buildRouterRecommendationApplyReviewItems();
  const model: RouterRecommendationApplyReviewModel = {
    title: "Router recommendation apply review",
    summary: "",
    recommendations,
    boundary: buildRouterRecommendationApplyReviewBoundary(),
    reviewLanguage: [...ROUTER_RECOMMENDATION_APPLY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Router recommendation apply review",
      "Router recommendations are not applied automatically",
      "Provider registry changes require explicit review",
      "No live traffic is routed from this page",
      "Review identity",
      "Source calibration dependency",
      "Provider/model recommendation summary",
      "Routing reason",
      "Cost latency evidence summary",
      "Reliability signal",
      "Privacy/policy impact",
      "Approval requirement",
      "Rollback note",
      "Blocked reasons",
      "Advanced recommendation details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRouterRecommendationApplyReview(model) };
}
