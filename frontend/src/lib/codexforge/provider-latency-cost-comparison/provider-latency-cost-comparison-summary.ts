import type {
  ProviderLatencyCostComparisonBoundary,
  ProviderLatencyCostComparisonModel,
  ProviderLatencyCostComparisonRow,
} from "./provider-latency-cost-comparison-types";
import { buildProviderLatencyCostComparisonStableKey } from "./provider-latency-cost-comparison-types";

export const PROVIDER_LATENCY_COST_COMPARISON_LANGUAGE = [
  "Provider latency cost comparison",
  "Cost estimates are review aids, not billing truth",
  "No live traffic is routed automatically",
  "Do not auto-spend tokens",
  "Local-vs-cloud classification",
  "Confidence level",
  "No provider APIs are called",
] as const;

export function buildProviderLatencyCostComparisonRow(
  input: Omit<ProviderLatencyCostComparisonRow, "id"> & { idHint: string }
): ProviderLatencyCostComparisonRow {
  const { idHint, ...row } = input;
  return {
    id: buildProviderLatencyCostComparisonStableKey(
      "provider-latency-cost-comparison",
      idHint,
      input.localVsCloudClassification,
      input.confidenceLevel
    ),
    ...row,
  };
}

export function buildProviderLatencyCostComparisonRows(): ProviderLatencyCostComparisonRow[] {
  return [
    buildProviderLatencyCostComparisonRow({
      idHint: "local-compatible-runtime",
      providerComparisonRow:
        "Provider comparison row: local compatible runtime reviewed from captured result metadata, not probed live.",
      latencySummary:
        "Latency summary: low local round-trip when the model is already loaded; cold start is reviewed separately.",
      tokenEstimate:
        "Token estimate: small health prompt and short response, reviewed as an approximate context size.",
      costEstimate:
        "Cost estimate: local compute only; cost estimates are review aids, not billing truth.",
      qualityNote:
        "Quality note: strong for private drafts and simple checks, may need cloud review for premium reasoning.",
      localVsCloudClassification: "local-runtime",
      privacyNote:
        "Privacy note: best fit when the prompt must stay local and no cloud fallback is approved.",
      confidenceLevel: "medium",
      nextRecommendedRoute: "/router-recommendation-review",
      advancedComparisonDetails:
        "Advanced comparison details: local results depend on model load state, hardware, context size, and operator-reviewed runtime status.",
    }),
    buildProviderLatencyCostComparisonRow({
      idHint: "cloud-provider-reviewed-result",
      providerComparisonRow:
        "Provider comparison row: reviewed cloud provider result summary with no API key, raw credential, or hidden prompt.",
      latencySummary:
        "Latency summary: network and provider queue time must come from reviewed result evidence.",
      tokenEstimate:
        "Token estimate: prompt and response sizes are approximate and should be checked against the provider result.",
      costEstimate:
        "Cost estimate: rough provider-model estimate only; cost estimates are review aids, not billing truth.",
      qualityNote:
        "Quality note: good candidate for premium reasoning only after privacy, spend, and approval review.",
      localVsCloudClassification: "cloud-provider",
      privacyNote:
        "Privacy note: cloud use requires explicit approval for prompt scope and any sensitive context.",
      confidenceLevel: "low",
      nextRecommendedRoute: "/router-recommendation-review",
      advancedComparisonDetails:
        "Advanced comparison details: price sheets, rate limits, and observed latency can change, so this page never treats estimates as billing truth.",
    }),
    buildProviderLatencyCostComparisonRow({
      idHint: "blocked-aggregator",
      providerComparisonRow:
        "Provider comparison row: aggregator profile is blocked until provider identity, model, privacy, and spend limits are reviewed.",
      latencySummary:
        "Latency summary: unavailable because no reviewed live-test result exists.",
      tokenEstimate:
        "Token estimate: unavailable until reviewed prompt scope is supplied.",
      costEstimate:
        "Cost estimate: unavailable; do not auto-spend tokens to fill the gap.",
      qualityNote:
        "Quality note: aggregator quality varies by selected upstream model and current availability.",
      localVsCloudClassification: "blocked-until-reviewed",
      privacyNote:
        "Privacy note: blocked rows must not route prompts or files to a cloud fallback automatically.",
      confidenceLevel: "low",
      nextRecommendedRoute: "/provider-failure-recovery",
      advancedComparisonDetails:
        "Advanced comparison details: blocked rows stay review-only and never trigger provider calls, retries, or registry changes.",
    }),
  ];
}

export function buildProviderLatencyCostComparisonBoundary(): ProviderLatencyCostComparisonBoundary {
  return {
    providerApiCallsAllowedFromUi: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    costEstimateBillingTruthAllowed: false,
  };
}

export function summarizeProviderLatencyCostComparison(
  model: Pick<ProviderLatencyCostComparisonModel, "rows">
): string {
  return `Provider latency cost comparison reviews ${model.rows.length} provider row(s). Cost estimates are review aids, not billing truth. No live traffic is routed automatically and tokens are not spent from this UI.`;
}

export function buildProviderLatencyCostComparisonModel(): ProviderLatencyCostComparisonModel {
  const rows = buildProviderLatencyCostComparisonRows();
  const model: ProviderLatencyCostComparisonModel = {
    title: "Provider latency cost comparison",
    summary: "",
    rows,
    boundary: buildProviderLatencyCostComparisonBoundary(),
    comparisonLanguage: [...PROVIDER_LATENCY_COST_COMPARISON_LANGUAGE],
    advancedDetails: [
      "Provider latency cost comparison",
      "Cost estimates are review aids, not billing truth",
      "No live traffic is routed automatically",
      "Do not auto-spend tokens",
      "Local-vs-cloud classification",
      "Confidence level",
      "No provider APIs are called",
      "No automatic provider send",
      "No provider registry mutation",
      "Advanced comparison details stay secondary",
    ],
  };
  return { ...model, summary: summarizeProviderLatencyCostComparison(model) };
}
