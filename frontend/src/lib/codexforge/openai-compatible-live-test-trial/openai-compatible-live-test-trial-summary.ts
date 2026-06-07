import type {
  OpenAiCompatibleLiveTestTrial,
  OpenAiCompatibleLiveTestTrialBoundary,
  OpenAiCompatibleLiveTestTrialModel,
} from "./openai-compatible-live-test-trial-types";
import { buildOpenAiCompatibleLiveTestTrialStableKey } from "./openai-compatible-live-test-trial-types";

export const OPENAI_COMPATIBLE_LIVE_TEST_TRIAL_LANGUAGE = [
  "OpenAI compatible live test trial",
  "OpenAI compatible tests require explicit approval",
  "No API request is sent from this page",
  "API keys and secrets are never displayed",
  "Estimated cost token guardrail",
  "Expected response shape",
] as const;

export function buildOpenAiCompatibleLiveTestTrial(
  input: Omit<OpenAiCompatibleLiveTestTrial, "id"> & { idHint: string }
): OpenAiCompatibleLiveTestTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildOpenAiCompatibleLiveTestTrialStableKey(
      "openai-compatible-live-test-trial",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildOpenAiCompatibleLiveTestTrials(): OpenAiCompatibleLiveTestTrial[] {
  return [
    buildOpenAiCompatibleLiveTestTrial({
      idHint: "reviewed-openai-compatible-trial",
      status: "approval-required",
      testTrialIdentity:
        "Test trial identity: openai-compatible-live-test-trial-reviewed, a prepared review packet for a future approved OpenAI-compatible provider test.",
      providerProfile:
        "Provider profile: reviewed OpenAI-compatible provider or local compatible runtime metadata; provider registry is not mutated silently.",
      baseUrlEndpointSummary:
        "Base URL / endpoint summary: reviewed endpoint class and request shape are summarized without printing env values, API keys, tokens, or secrets.",
      modelSummary:
        "Model summary: reviewed model label, request intent, and expected small response; no live availability is claimed from this page.",
      payloadPrivacyClassification:
        "Payload privacy classification: tiny test prompt only, no files, no private code, no hidden findings, and no sensitive memory.",
      estimatedCostTokenGuardrail:
        "Estimated cost token guardrail: tiny token and spend cap, no auto-spend tokens, no retries without approval, and no automatic provider routing.",
      approvalStatus:
        "Approval status: OpenAI compatible tests require explicit approval naming provider, endpoint, model, payload summary, and budget before any request.",
      expectedResponseShape:
        "Expected response shape: status, provider profile, model label, short text response, token/cost note, redaction status, and blocked or error reason.",
      resultCaptureRoute:
        "Result capture route: /provider-test-results receives a reviewed result only after an approved boundary returns evidence.",
      blockedReasons: [
        "OpenAI compatible tests require explicit approval",
        "No API request is sent from this page",
        "API keys and secrets are never displayed",
      ],
      advancedTrialDetails:
        "Advanced trial details: this page does not call OpenAI-compatible APIs, send prompts or files, print env values, store tokens or API keys in localStorage, auto-spend tokens, mutate provider registry, execute commands, browse files, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildOpenAiCompatibleLiveTestTrial({
      idHint: "blocked-openai-compatible-trial",
      status: "blocked",
      testTrialIdentity:
        "Test trial identity: openai-compatible-live-test-trial-blocked.",
      providerProfile:
        "Provider profile: blocked because no reviewed provider or local compatible runtime profile is selected.",
      baseUrlEndpointSummary:
        "Base URL / endpoint summary: unavailable while endpoint class is unreviewed; no API request is sent from this page.",
      modelSummary:
        "Model summary: unavailable while provider profile and endpoint are blocked.",
      payloadPrivacyClassification:
        "Payload privacy classification: blocked and treated as sensitive by default; prompts and files are not sent.",
      estimatedCostTokenGuardrail:
        "Estimated cost token guardrail: blocked because no tiny token/spend cap has been approved.",
      approvalStatus:
        "Approval status: blocked until explicit approval can name provider, endpoint, model, payload summary, and budget.",
      expectedResponseShape:
        "Expected response shape: unavailable until an approved trial boundary exists.",
      resultCaptureRoute:
        "Result capture route: /provider-test-results remains blocked until an approved test returns evidence.",
      blockedReasons: [
        "Provider profile missing",
        "Approval status missing",
        "Estimated cost token guardrail missing",
      ],
      advancedTrialDetails:
        "Advanced trial details: blocked OpenAI-compatible trials cannot call APIs, send prompts or files, read local files, store secrets, or auto-route provider traffic.",
    }),
  ];
}

export function buildOpenAiCompatibleLiveTestTrialBoundary(): OpenAiCompatibleLiveTestTrialBoundary {
  return {
    explicitApprovalRequired: true,
    apiRequestSentFromPageAllowed: false,
    openAiCompatibleApiCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    promptOrFileAutoSendAllowed: false,
    automaticProviderSendAllowed: false,
    autoSpendTokensAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    providerRegistryMutationAllowed: false,
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

export function summarizeOpenAiCompatibleLiveTestTrial(
  model: Pick<OpenAiCompatibleLiveTestTrialModel, "trials">
): string {
  return `OpenAI compatible live test trial prepares ${model.trials.length} reviewed trial shape(s). OpenAI compatible tests require explicit approval, no API request is sent from this page, and API keys and secrets are never displayed.`;
}

export function buildOpenAiCompatibleLiveTestTrialModel(): OpenAiCompatibleLiveTestTrialModel {
  const trials = buildOpenAiCompatibleLiveTestTrials();
  const model: OpenAiCompatibleLiveTestTrialModel = {
    title: "OpenAI compatible live test trial",
    summary: "",
    trials,
    boundary: buildOpenAiCompatibleLiveTestTrialBoundary(),
    trialLanguage: [...OPENAI_COMPATIBLE_LIVE_TEST_TRIAL_LANGUAGE],
    advancedDetails: [
      "OpenAI compatible live test trial",
      "OpenAI-compatible live test trial",
      "OpenAI compatible tests require explicit approval",
      "No API request is sent from this page",
      "API keys and secrets are never displayed",
      "Test trial identity",
      "Provider profile",
      "Base URL / endpoint summary",
      "Model summary",
      "Payload privacy classification",
      "Estimated cost token guardrail",
      "Approval status",
      "Expected response shape",
      "Result capture route",
      "Blocked reasons",
      "Advanced trial details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeOpenAiCompatibleLiveTestTrial(model) };
}
