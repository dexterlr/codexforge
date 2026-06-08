import type {
  MultiProviderLiveTestTrial,
  MultiProviderLiveTestTrialBoundary,
  MultiProviderLiveTestTrialModel,
} from "./multi-provider-live-test-trial-types";
import { buildMultiProviderLiveTestTrialStableKey } from "./multi-provider-live-test-trial-types";

export const MULTI_PROVIDER_LIVE_TEST_TRIAL_LANGUAGE = [
  "Multi-provider live test trial",
  "Multi-provider tests require explicit approval per provider",
  "No provider request is sent from this page",
  "No tokens are spent automatically",
  "Selected provider profiles",
  "Result persistence route",
] as const;

export function buildMultiProviderLiveTestTrial(
  input: Omit<MultiProviderLiveTestTrial, "id"> & { idHint: string }
): MultiProviderLiveTestTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildMultiProviderLiveTestTrialStableKey("multi-provider-live-test-trial", idHint, input.status),
    ...trial,
  };
}

export function buildMultiProviderLiveTestTrials(): MultiProviderLiveTestTrial[] {
  return [
    buildMultiProviderLiveTestTrial({
      idHint: "reviewed-cross-provider-trial",
      status: "approval-required",
      multiProviderTrialIdentity:
        "Multi-provider trial identity: multi-provider-live-test-trial-reviewed, a comparison packet for future approved provider tests.",
      selectedProviderProfiles: [
        "Selected provider profiles: Anthropic reviewed metadata only",
        "Selected provider profiles: OpenAI-compatible reviewed metadata only",
        "Selected provider profiles: local compatible runtime reviewed metadata only",
      ],
      modelEndpointSummary:
        "Model/endpoint summary: each provider keeps its reviewed model label, endpoint family, and response shape separate before approval.",
      payloadPrivacyClassification:
        "Payload privacy classification: tiny text-only prompt, no files, no private code, no hidden findings, and no sensitive memory.",
      budgetCostGuardrail:
        "Budget/cost guardrail: tiny per-provider cap, no automatic retries, no tokens are spent automatically, and no provider gets traffic by default.",
      routingComparisonIntent:
        "Routing/comparison intent: compare approved test plans side by side without auto-routing live provider traffic or changing router policy.",
      approvalStatusPerProvider: [
        "Approval status per provider: Anthropic requires explicit approval per provider",
        "Approval status per provider: OpenAI-compatible requires explicit approval per provider",
        "Approval status per provider: local compatible runtime requires explicit operator approval before any live bridge handoff",
      ],
      expectedResponseShape:
        "Expected response shape: provider, endpoint family, model label, short response summary, status, token/cost note, latency note, redaction status, and blocked or error reason.",
      resultPersistenceRoute:
        "Result persistence route: /provider-test-result-persistence receives only reviewed results after an approved boundary returns evidence.",
      blockedReasons: [
        "Multi-provider tests require explicit approval per provider",
        "No provider request is sent from this page",
        "No tokens are spent automatically",
      ],
      advancedComparisonDetails:
        "Advanced comparison details: this page does not call provider APIs, send prompts or files, auto-route live provider traffic, store API keys in localStorage, mutate provider registry, execute commands, read local files, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildMultiProviderLiveTestTrial({
      idHint: "blocked-cross-provider-trial",
      status: "blocked",
      multiProviderTrialIdentity:
        "Multi-provider trial identity: multi-provider-live-test-trial-blocked.",
      selectedProviderProfiles: [
        "Selected provider profiles: blocked until at least two reviewed provider profiles are selected",
      ],
      modelEndpointSummary:
        "Model/endpoint summary: blocked until each provider has reviewed model and endpoint details.",
      payloadPrivacyClassification:
        "Payload privacy classification: blocked and treated as sensitive by default; prompts and files are not sent.",
      budgetCostGuardrail:
        "Budget/cost guardrail: blocked until a per-provider token and spend cap is approved.",
      routingComparisonIntent:
        "Routing/comparison intent: blocked until the comparison purpose is reviewed and no silent fallback is possible.",
      approvalStatusPerProvider: [
        "Approval status per provider: missing reviewed approval packet",
      ],
      expectedResponseShape:
        "Expected response shape: unavailable until approved provider trial boundaries exist.",
      resultPersistenceRoute:
        "Result persistence route: /provider-test-result-persistence remains blocked until reviewed results exist.",
      blockedReasons: [
        "Selected provider profiles missing",
        "Approval status per provider missing",
        "Budget/cost guardrail missing",
      ],
      advancedComparisonDetails:
        "Advanced comparison details: blocked multi-provider trials cannot call APIs, send prompts or files, read local files, store secrets, auto-spend tokens, or auto-route provider traffic.",
    }),
  ];
}

export function buildMultiProviderLiveTestTrialBoundary(): MultiProviderLiveTestTrialBoundary {
  return {
    explicitApprovalPerProviderRequired: true,
    providerRequestSentFromPageAllowed: false,
    providerApiCallsAllowedFromUi: false,
    openAiCompatibleApiCallsAllowedFromUi: false,
    anthropicApiCallsAllowedFromUi: false,
    promptOrFileAutoSendAllowed: false,
    automaticProviderSendAllowed: false,
    autoSpendTokensAllowed: false,
    autoRouteLiveProviderTrafficAllowed: false,
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

export function summarizeMultiProviderLiveTestTrial(
  model: Pick<MultiProviderLiveTestTrialModel, "trials">
): string {
  return `Multi-provider live test trial prepares ${model.trials.length} comparison trial shape(s). Multi-provider tests require explicit approval per provider, no provider request is sent from this page, and no tokens are spent automatically.`;
}

export function buildMultiProviderLiveTestTrialModel(): MultiProviderLiveTestTrialModel {
  const trials = buildMultiProviderLiveTestTrials();
  const model: MultiProviderLiveTestTrialModel = {
    title: "Multi-provider live test trial",
    summary: "",
    trials,
    boundary: buildMultiProviderLiveTestTrialBoundary(),
    trialLanguage: [...MULTI_PROVIDER_LIVE_TEST_TRIAL_LANGUAGE],
    advancedDetails: [
      "Multi-provider live test trial",
      "Multi-provider tests require explicit approval per provider",
      "No provider request is sent from this page",
      "No tokens are spent automatically",
      "Multi-provider trial identity",
      "Selected provider profiles",
      "Model/endpoint summary",
      "Payload privacy classification",
      "Budget/cost guardrail",
      "Routing/comparison intent",
      "Approval status per provider",
      "Expected response shape",
      "Result persistence route",
      "Blocked reasons",
      "Advanced comparison details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeMultiProviderLiveTestTrial(model) };
}
