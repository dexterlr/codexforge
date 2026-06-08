import type {
  AnthropicLiveTestTrial,
  AnthropicLiveTestTrialBoundary,
  AnthropicLiveTestTrialModel,
} from "./anthropic-live-test-trial-types";
import { buildAnthropicLiveTestTrialStableKey } from "./anthropic-live-test-trial-types";

export const ANTHROPIC_LIVE_TEST_TRIAL_LANGUAGE = [
  "Anthropic live test trial",
  "Anthropic tests require explicit approval",
  "No API request is sent from this page",
  "API keys and secrets are never displayed",
  "Estimated cost token guardrail",
  "Expected response shape",
] as const;

export function buildAnthropicLiveTestTrial(
  input: Omit<AnthropicLiveTestTrial, "id"> & { idHint: string }
): AnthropicLiveTestTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildAnthropicLiveTestTrialStableKey("anthropic-live-test-trial", idHint, input.status),
    ...trial,
  };
}

export function buildAnthropicLiveTestTrials(): AnthropicLiveTestTrial[] {
  return [
    buildAnthropicLiveTestTrial({
      idHint: "reviewed-anthropic-trial",
      status: "approval-required",
      testTrialIdentity:
        "Test trial identity: anthropic-live-test-trial-reviewed, a prepared review packet for a future approved Anthropic provider test.",
      providerProfile:
        "Provider profile: reviewed Anthropic API profile metadata only; no API key, token, account secret, or env value is displayed.",
      modelSummary:
        "Model summary: reviewed Claude model family, small text response expectation, and no live availability claim from this page.",
      endpointApiFamilySummary:
        "Endpoint/API family summary: Anthropic messages-style API family is described for operator review without building or sending a request.",
      payloadPrivacyClassification:
        "Payload privacy classification: tiny approved text prompt only, no files, no private code, no hidden findings, and no sensitive memory.",
      estimatedCostTokenGuardrail:
        "Estimated cost token guardrail: tiny request cap, no automatic retries, no tokens are spent automatically, and no provider traffic is routed automatically.",
      approvalStatus:
        "Approval status: Anthropic tests require explicit approval naming provider profile, model, endpoint family, payload summary, and budget before any request.",
      expectedResponseShape:
        "Expected response shape: status, provider profile, model label, short text response, token/cost note, redaction status, and blocked or error reason.",
      resultCaptureRoute:
        "Result capture route: /provider-test-results receives reviewed evidence only after an approved boundary returns a result.",
      blockedReasons: [
        "Anthropic tests require explicit approval",
        "No API request is sent from this page",
        "API keys and secrets are never displayed",
      ],
      advancedTrialDetails:
        "Advanced trial details: this page does not call Anthropic APIs, call provider APIs, send prompts or files, print env values, store tokens or API keys in localStorage, auto-spend tokens, auto-route live provider traffic, mutate provider registry, execute commands, browse files, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildAnthropicLiveTestTrial({
      idHint: "blocked-anthropic-trial",
      status: "blocked",
      testTrialIdentity:
        "Test trial identity: anthropic-live-test-trial-blocked.",
      providerProfile:
        "Provider profile: blocked until an operator selects a reviewed Anthropic profile without exposing credentials.",
      modelSummary:
        "Model summary: blocked until model family, response shape, and privacy posture are reviewed.",
      endpointApiFamilySummary:
        "Endpoint/API family summary: blocked while the Anthropic endpoint family is unreviewed; no API request is sent from this page.",
      payloadPrivacyClassification:
        "Payload privacy classification: blocked and treated as sensitive by default; prompts and files are not sent.",
      estimatedCostTokenGuardrail:
        "Estimated cost token guardrail: blocked because no tiny token/spend cap has been approved.",
      approvalStatus:
        "Approval status: blocked until explicit approval can name provider profile, model, endpoint family, payload summary, and budget.",
      expectedResponseShape:
        "Expected response shape: unavailable until an approved Anthropic live test boundary exists.",
      resultCaptureRoute:
        "Result capture route: /provider-test-results remains blocked until approved test evidence is reviewed.",
      blockedReasons: [
        "Provider profile missing",
        "Approval status missing",
        "Estimated cost token guardrail missing",
      ],
      advancedTrialDetails:
        "Advanced trial details: blocked Anthropic trials cannot call APIs, send prompts or files, read local files, store secrets, or auto-route provider traffic.",
    }),
  ];
}

export function buildAnthropicLiveTestTrialBoundary(): AnthropicLiveTestTrialBoundary {
  return {
    explicitApprovalRequired: true,
    apiRequestSentFromPageAllowed: false,
    anthropicApiCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAiCompatibleApiCallsAllowedFromUi: false,
    promptOrFileAutoSendAllowed: false,
    automaticProviderSendAllowed: false,
    autoSpendTokensAllowed: false,
    autoRouteLiveProviderTrafficAllowed: false,
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

export function summarizeAnthropicLiveTestTrial(
  model: Pick<AnthropicLiveTestTrialModel, "trials">
): string {
  return `Anthropic live test trial prepares ${model.trials.length} reviewed trial shape(s). Anthropic tests require explicit approval, no API request is sent from this page, and API keys and secrets are never displayed.`;
}

export function buildAnthropicLiveTestTrialModel(): AnthropicLiveTestTrialModel {
  const trials = buildAnthropicLiveTestTrials();
  const model: AnthropicLiveTestTrialModel = {
    title: "Anthropic live test trial",
    summary: "",
    trials,
    boundary: buildAnthropicLiveTestTrialBoundary(),
    trialLanguage: [...ANTHROPIC_LIVE_TEST_TRIAL_LANGUAGE],
    advancedDetails: [
      "Anthropic live test trial",
      "Anthropic tests require explicit approval",
      "No API request is sent from this page",
      "API keys and secrets are never displayed",
      "Test trial identity",
      "Provider profile",
      "Model summary",
      "Endpoint/API family summary",
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
  return { ...model, summary: summarizeAnthropicLiveTestTrial(model) };
}
