import type {
  ProviderLiveTestRunnerBoundary,
  ProviderLiveTestRunnerBoundaryModel,
  ProviderLiveTestRunnerBoundaryReview,
} from "./provider-live-test-runner-boundary-types";
import { buildProviderLiveTestRunnerBoundaryStableKey } from "./provider-live-test-runner-boundary-types";

export const PROVIDER_LIVE_TEST_RUNNER_BOUNDARY_LANGUAGE = [
  "Provider live test runner boundary",
  "Provider live tests are not run automatically",
  "API keys are never displayed",
  "Test prompts and files are not sent without explicit approval",
  "Budget cost guardrail",
  "Result capture route",
] as const;

export function buildProviderLiveTestRunnerBoundaryReview(
  input: Omit<ProviderLiveTestRunnerBoundaryReview, "id"> & { idHint: string }
): ProviderLiveTestRunnerBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildProviderLiveTestRunnerBoundaryStableKey(
      "provider-live-test-runner-boundary",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildProviderLiveTestRunnerBoundaryReviews(): ProviderLiveTestRunnerBoundaryReview[] {
  return [
    buildProviderLiveTestRunnerBoundaryReview({
      idHint: "reviewed-provider-runner-boundary",
      status: "approval-required",
      runnerBoundaryIdentity:
        "Runner boundary identity: provider-live-test-runner-boundary-reviewed, an approval checkpoint before any future provider API test runner can receive a request.",
      providerAccountDependency:
        "Provider account dependency: a named provider profile and credential reference must be reviewed; API keys are never displayed and are not stored in browser storage.",
      providerPolicyDependency:
        "Provider policy dependency: provider live-test gate, provider policy bundle, privacy classification, spend cap, and result capture route must be reviewed first.",
      promptPrivacyClassification:
        "Prompt/privacy classification: a tiny test prompt with no files, no private code, no sensitive memory, and no hidden project context.",
      budgetCostGuardrail:
        "Budget cost guardrail: tiny token and spend cap, no unlimited retries, no auto-spend tokens, and no automatic fallback routing.",
      modelEndpointSummary:
        "Model/endpoint summary: reviewed provider name, endpoint class, compatible request shape, and model label are summarized without exposing secrets.",
      testPayloadSummary:
        "Test payload summary: reviewed prompt summary only; test prompts and files are not sent without explicit approval.",
      approvalRequirement:
        "Approval requirement: provider live tests are not run automatically and require explicit operator approval for provider, endpoint, model, payload summary, and budget.",
      resultCaptureRoute:
        "Result capture route: /provider-test-results captures approved provider test results without displaying API keys or secrets.",
      blockedReasons: [
        "Provider live tests are not run automatically",
        "API keys are never displayed",
        "Test prompts and files are not sent without explicit approval",
      ],
      advancedProviderDetails:
        "Advanced provider details: this boundary does not call provider APIs, send prompts or files, store API keys in localStorage, auto-spend tokens, mutate provider registry, execute commands, browse files, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildProviderLiveTestRunnerBoundaryReview({
      idHint: "blocked-provider-runner-boundary",
      status: "blocked",
      runnerBoundaryIdentity:
        "Runner boundary identity: provider-live-test-runner-boundary-blocked.",
      providerAccountDependency:
        "Provider account dependency: blocked because no reviewed provider profile or credential reference is available.",
      providerPolicyDependency:
        "Provider policy dependency: blocked until provider policy, privacy, and budget requirements are reviewed.",
      promptPrivacyClassification:
        "Prompt/privacy classification: blocked and treated as sensitive by default; no prompt or file is sent.",
      budgetCostGuardrail:
        "Budget cost guardrail: blocked because no explicit tiny spend/token limit has been approved.",
      modelEndpointSummary:
        "Model/endpoint summary: unavailable while the provider, endpoint, and model are unreviewed.",
      testPayloadSummary:
        "Test payload summary: unavailable; this page does not build or send provider payloads automatically.",
      approvalRequirement:
        "Approval requirement: blocked until explicit approval can name provider, endpoint, model, payload summary, and budget.",
      resultCaptureRoute:
        "Result capture route: /provider-test-results remains blocked until an approved runner boundary can return a reviewed result.",
      blockedReasons: [
        "Provider account dependency missing",
        "Provider policy dependency missing",
        "Approval requirement missing",
      ],
      advancedProviderDetails:
        "Advanced provider details: blocked provider boundaries cannot call provider APIs, send prompts or files, store tokens, auto-spend, mutate settings, execute commands, or read local files.",
    }),
  ];
}

export function buildProviderLiveTestRunnerBoundary(): ProviderLiveTestRunnerBoundary {
  return {
    explicitApprovalRequired: true,
    providerLiveTestsRunAutomaticallyAllowed: false,
    providerApiCallsAllowedFromUi: false,
    openAiCompatibleApiCallsAllowedFromUi: false,
    promptOrFileAutoSendAllowed: false,
    automaticProviderSendAllowed: false,
    autoSpendTokensAllowed: false,
    apiKeysDisplayedAllowed: false,
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

export function summarizeProviderLiveTestRunnerBoundary(
  model: Pick<ProviderLiveTestRunnerBoundaryModel, "reviews">
): string {
  return `Provider live test runner boundary prepares ${model.reviews.length} approval boundary shape(s). Provider live tests are not run automatically, API keys are never displayed, and test prompts and files are not sent without explicit approval.`;
}

export function buildProviderLiveTestRunnerBoundaryModel(): ProviderLiveTestRunnerBoundaryModel {
  const reviews = buildProviderLiveTestRunnerBoundaryReviews();
  const model: ProviderLiveTestRunnerBoundaryModel = {
    title: "Provider live test runner boundary",
    summary: "",
    reviews,
    boundary: buildProviderLiveTestRunnerBoundary(),
    boundaryLanguage: [...PROVIDER_LIVE_TEST_RUNNER_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Provider live test runner boundary",
      "Provider live tests are not run automatically",
      "API keys are never displayed",
      "Test prompts and files are not sent without explicit approval",
      "Runner boundary identity",
      "Provider account dependency",
      "Provider policy dependency",
      "Prompt/privacy classification",
      "Budget cost guardrail",
      "Model/endpoint summary",
      "Test payload summary",
      "Approval requirement",
      "Result capture route",
      "Blocked reasons",
      "Advanced provider details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderLiveTestRunnerBoundary(model) };
}
