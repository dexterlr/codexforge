import type {
  ProviderCostLatencyResultCalibrationBoundary,
  ProviderCostLatencyResultCalibrationModel,
  ProviderCostLatencyResultCalibrationRecord,
} from "./provider-cost-latency-result-calibration-types";
import { buildProviderCostLatencyResultCalibrationStableKey } from "./provider-cost-latency-result-calibration-types";

export const PROVIDER_COST_LATENCY_RESULT_CALIBRATION_LANGUAGE = [
  "Provider cost latency result calibration",
  "Calibration does not auto-update routing",
  "No tokens are spent from this page",
  "Provider policy changes require explicit review",
  "Budget guardrail status",
  "Router recommendation route",
] as const;

export function buildProviderCostLatencyResultCalibrationRecord(
  input: Omit<ProviderCostLatencyResultCalibrationRecord, "id"> & { idHint: string }
): ProviderCostLatencyResultCalibrationRecord {
  const { idHint, ...record } = input;
  return {
    id: buildProviderCostLatencyResultCalibrationStableKey(
      "provider-cost-latency-result-calibration",
      idHint,
      input.status
    ),
    ...record,
  };
}

export function buildProviderCostLatencyResultCalibrationRecords(): ProviderCostLatencyResultCalibrationRecord[] {
  return [
    buildProviderCostLatencyResultCalibrationRecord({
      idHint: "reviewed-provider-metrics",
      status: "review-required",
      calibrationIdentity:
        "Calibration identity: provider-cost-latency-result-calibration-reviewed, a reviewed metric summary before router or policy changes.",
      sourceProviderTestResults:
        "Source provider test results: /provider-test-result-persistence reviewed records with redaction, status, cost, and latency notes.",
      providerModelSummary:
        "Provider/model summary: provider profile, endpoint family, model label, and result status are summarized without credentials.",
      tokenCostEstimateSummary:
        "Token/cost estimate summary: reviewed estimate only, not billing truth, and no tokens are spent from this page.",
      latencySummary:
        "Latency summary: reviewed elapsed range and timeout note from persisted result evidence; no probe runs here.",
      reliabilitySignal:
        "Reliability signal: passed, failed, blocked, timed out, retry-needed, or needs review count from persisted records.",
      budgetGuardrailStatus:
        "Budget guardrail status: within cap, needs budget review, or blocked before any router recommendation is considered.",
      routerRecommendationRoute:
        "Router recommendation route: /router-recommendation-review receives calibration notes for human review only.",
      policyImpactNote:
        "Policy impact note: provider policy changes require explicit review and calibration does not auto-update routing.",
      blockedReasons: [
        "Calibration does not auto-update routing",
        "No tokens are spent from this page",
        "Provider policy changes require explicit review",
      ],
      advancedMetricDetails:
        "Advanced metric details: this page does not call provider APIs, auto-route live traffic, mutate provider registry silently, auto-spend tokens, execute commands, read local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildProviderCostLatencyResultCalibrationRecord({
      idHint: "blocked-provider-metrics",
      status: "blocked",
      calibrationIdentity:
        "Calibration identity: provider-cost-latency-result-calibration-blocked.",
      sourceProviderTestResults:
        "Source provider test results: blocked because reviewed persisted provider test metrics are missing.",
      providerModelSummary:
        "Provider/model summary: blocked until provider, model, and endpoint metadata are reviewed.",
      tokenCostEstimateSummary:
        "Token/cost estimate summary: blocked; no tokens are spent from this page to fill missing data.",
      latencySummary:
        "Latency summary: blocked until reviewed elapsed evidence exists.",
      reliabilitySignal:
        "Reliability signal: blocked until result status and timeout notes are reviewed.",
      budgetGuardrailStatus:
        "Budget guardrail status: blocked until cost estimate and budget cap are reviewed.",
      routerRecommendationRoute:
        "Router recommendation route: /router-recommendation-review remains a review route, not an automatic router update.",
      policyImpactNote:
        "Policy impact note: blocked calibration cannot change provider policy, route live traffic, or mutate provider registry.",
      blockedReasons: [
        "Persisted provider test metrics missing",
        "Budget guardrail status missing",
        "Reliability signal missing",
      ],
      advancedMetricDetails:
        "Advanced metric details: blocked calibration remains review-only and cannot call providers, spend tokens, mutate policy, or change routing.",
    }),
  ];
}

export function buildProviderCostLatencyResultCalibrationBoundary(): ProviderCostLatencyResultCalibrationBoundary {
  return {
    autoUpdateRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    providerPolicyAutoChangeAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    autoSpendTokensAllowed: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRegistryMutationAllowed: false,
    silentProviderRegistryMutationAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
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

export function summarizeProviderCostLatencyResultCalibration(
  model: Pick<ProviderCostLatencyResultCalibrationModel, "records">
): string {
  return `Provider cost latency result calibration prepares ${model.records.length} reviewed calibration record(s). Calibration does not auto-update routing, no tokens are spent from this page, and provider policy changes require explicit review.`;
}

export function buildProviderCostLatencyResultCalibrationModel(): ProviderCostLatencyResultCalibrationModel {
  const records = buildProviderCostLatencyResultCalibrationRecords();
  const model: ProviderCostLatencyResultCalibrationModel = {
    title: "Provider cost latency result calibration",
    summary: "",
    records,
    boundary: buildProviderCostLatencyResultCalibrationBoundary(),
    calibrationLanguage: [...PROVIDER_COST_LATENCY_RESULT_CALIBRATION_LANGUAGE],
    advancedDetails: [
      "Provider cost latency result calibration",
      "Calibration does not auto-update routing",
      "No tokens are spent from this page",
      "Provider policy changes require explicit review",
      "Calibration identity",
      "Source provider test results",
      "Provider/model summary",
      "Token/cost estimate summary",
      "Latency summary",
      "Reliability signal",
      "Budget guardrail status",
      "Router recommendation route",
      "Policy impact note",
      "Blocked reasons",
      "Advanced metric details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderCostLatencyResultCalibration(model) };
}
