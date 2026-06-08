import type {
  ProviderFailureRetryTrial,
  ProviderFailureRetryTrialBoundary,
  ProviderFailureRetryTrialModel,
} from "./provider-failure-retry-trial-types";
import { buildProviderFailureRetryTrialStableKey } from "./provider-failure-retry-trial-types";

export const PROVIDER_FAILURE_RETRY_TRIAL_LANGUAGE = [
  "Provider failure retry trial",
  "Retry is never automatic",
  "No provider request is sent from this page",
  "Retry may spend tokens only after explicit approval",
  "Blocked retry reasons",
  "Required approval copy",
] as const;

export function buildProviderFailureRetryTrial(
  input: Omit<ProviderFailureRetryTrial, "id"> & { idHint: string }
): ProviderFailureRetryTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildProviderFailureRetryTrialStableKey("provider-failure-retry-trial", idHint, input.status),
    ...trial,
  };
}

export function buildProviderFailureRetryTrials(): ProviderFailureRetryTrial[] {
  return [
    buildProviderFailureRetryTrial({
      idHint: "timeout-one-capped-retry",
      status: "approval-required",
      retryTrialIdentity:
        "Retry trial identity: provider-failure-retry-trial-timeout-review, a review packet for one possible capped retry after a timed-out provider test.",
      sourceProviderTestResult:
        "Source provider test result: /provider-test-result-persistence reviewed a timed-out or failed result with redaction and cost latency notes.",
      failureCategory:
        "Failure category: timeout or endpoint unavailable, not a reason to retry automatically.",
      providerModelSummary:
        "Provider/model summary: reviewed provider profile, endpoint class, model label, and result status without credentials.",
      retryEligibility:
        "Retry eligibility: eligible only if privacy class, budget guardrail, provider/model labels, and one capped request are approved.",
      blockedRetryReasons: [
        "Retry is never automatic",
        "No provider request is sent from this page",
        "Retry may spend tokens only after explicit approval",
      ],
      adjustedPayloadPrivacyNote:
        "Adjusted payload/privacy note: reduce to a tiny reviewed prompt summary, no files, no private code, no secrets, and no hidden memory payload.",
      costGuardrail:
        "Cost guardrail: retry may spend tokens only after explicit approval for model, token cap, spend cap, and expected response size.",
      requiredApprovalCopy:
        "Required approval copy: approve exactly one retry with provider, model, prompt summary, privacy class, token limit, spend limit, and result capture route.",
      nextRecommendedRoute:
        "Next recommended route: /provider-live-test-runner-boundary after approval, or /router-recommendation-apply-review for a different provider review.",
      advancedRetryDetails:
        "Advanced retry details: this trial does not call provider APIs, retry provider requests, send prompts or files, auto-spend tokens, auto-route live provider traffic, mutate provider registry silently, export secrets, execute commands, read local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildProviderFailureRetryTrial({
      idHint: "blocked-privacy-budget",
      status: "blocked",
      retryTrialIdentity:
        "Retry trial identity: provider-failure-retry-trial-blocked.",
      sourceProviderTestResult:
        "Source provider test result: blocked because the reviewed result is missing privacy, budget, or failure evidence.",
      failureCategory:
        "Failure category: blocked or needs review until the failure category is confirmed from persisted result evidence.",
      providerModelSummary:
        "Provider/model summary: blocked until provider profile, endpoint class, and model label are reviewed without credentials.",
      retryEligibility:
        "Retry eligibility: blocked because retry approval, privacy note, and cost guardrail are missing.",
      blockedRetryReasons: [
        "Reviewed source provider test result missing",
        "Adjusted payload/privacy note missing",
        "Required approval copy missing",
      ],
      adjustedPayloadPrivacyNote:
        "Adjusted payload/privacy note: blocked; prompts and files are not sent while privacy scope is unclear.",
      costGuardrail:
        "Cost guardrail: blocked; no token spend can happen from this page to fill missing information.",
      requiredApprovalCopy:
        "Required approval copy: blocked until a human can approve one scoped retry or choose no retry.",
      nextRecommendedRoute:
        "Next recommended route: /provider-failure-recovery for blocked reason review before any retry trial.",
      advancedRetryDetails:
        "Advanced retry details: blocked retry trials stay review-only and cannot send provider requests, mutate routing, or spend tokens.",
    }),
  ];
}

export function buildProviderFailureRetryTrialBoundary(): ProviderFailureRetryTrialBoundary {
  return {
    retryAutomaticAllowed: false,
    providerRetryAllowedFromUi: false,
    retryRequestSentFromPageAllowed: false,
    providerRequestSentFromPageAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRegistryMutationAllowed: false,
    silentProviderRegistryMutationAllowed: false,
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

export function summarizeProviderFailureRetryTrial(
  model: Pick<ProviderFailureRetryTrialModel, "trials">
): string {
  return `Provider failure retry trial prepares ${model.trials.length} reviewed retry trial packet(s). Retry is never automatic, no provider request is sent from this page, and retry may spend tokens only after explicit approval.`;
}

export function buildProviderFailureRetryTrialModel(): ProviderFailureRetryTrialModel {
  const trials = buildProviderFailureRetryTrials();
  const model: ProviderFailureRetryTrialModel = {
    title: "Provider failure retry trial",
    summary: "",
    trials,
    boundary: buildProviderFailureRetryTrialBoundary(),
    retryLanguage: [...PROVIDER_FAILURE_RETRY_TRIAL_LANGUAGE],
    advancedDetails: [
      "Provider failure retry trial",
      "Retry is never automatic",
      "No provider request is sent from this page",
      "Retry may spend tokens only after explicit approval",
      "Retry trial identity",
      "Source provider test result",
      "Failure category",
      "Provider/model summary",
      "Retry eligibility",
      "Blocked retry reasons",
      "Adjusted payload/privacy note",
      "Cost guardrail",
      "Required approval copy",
      "Next recommended route",
      "Advanced retry details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderFailureRetryTrial(model) };
}
