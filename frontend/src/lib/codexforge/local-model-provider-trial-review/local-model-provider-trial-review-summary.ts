import type {
  LocalModelProviderTrialReview,
  LocalModelProviderTrialReviewBoundary,
  LocalModelProviderTrialReviewModel,
} from "./local-model-provider-trial-review-types";
import { buildLocalModelProviderTrialReviewStableKey } from "./local-model-provider-trial-review-types";

export const LOCAL_MODEL_PROVIDER_TRIAL_REVIEW_LANGUAGE = [
  "Local model provider trial review",
  "Local model trial review does not call local models",
  "Local model traffic requires explicit operator approval",
  "Local credentials and endpoints stay private",
  "Local model families",
  "Local bridge dependency summary",
] as const;

export function buildLocalModelProviderTrialReview(
  input: Omit<LocalModelProviderTrialReview, "id"> & { idHint: string }
): LocalModelProviderTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildLocalModelProviderTrialReviewStableKey("local-model-provider-trial-review", idHint, input.status),
    ...review,
  };
}

export function buildLocalModelProviderTrialReviews(): LocalModelProviderTrialReview[] {
  return [
    buildLocalModelProviderTrialReview({
      idHint: "review-only-local-trial",
      status: "ready-for-review",
      localModelProviderTrialIdentity:
        "Local model provider trial identity: local-model-provider-trial-review-review-only-local-trial.",
      localModelFamilies: [
        "Local model families: Ollama-style local chat servers, LM Studio-style local chat servers, local OpenAI-compatible servers, local creative model services, local embedding candidates, and manual fallback.",
        "Local model families: every family is reviewed as a static trial lane only; local model trial review does not call local models.",
      ],
      localBridgeDependencySummary: [
        "Local bridge dependency summary: local bridge readiness, endpoint allowlist, local-only host policy, consent, credential privacy, and manual health evidence must be reviewed before any future local model traffic.",
        "Local bridge dependency summary: this page does not call local bridge endpoints, run local probes, launch local tools, or inspect local services.",
      ],
      deniedLocalModelActions: [
        "Denied local model actions: local model calls, local bridge calls, provider API calls, OpenAI-compatible provider calls, live traffic routing, prompt sends, file sends, project sends, endpoint storage, token storage, local tool launch, and automatic validation.",
        "Denied local model actions: denied local actions remain blocked until explicit operator approval exists outside this page.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: operator reviews intended local model family, private endpoint handling, credential boundary, local bridge dependency, prompt privacy, manual test owner, rollback plan, and blocked risk before any future trial.",
        "Manual validation checklist: this review does not run checks, build, smoke, test, or call local models from the UI.",
      ],
      safetyCredentialBoundaries: [
        "Safety/credential boundaries: local credentials and endpoints stay private.",
        "Safety/credential boundaries: localStorage, sessionStorage, endpoint storage, token storage, process.env display, secret display, raw endpoint display, and raw credential echoing stay blocked.",
      ],
      blockedLocalModelTrialRisks: [
        "Blocked local model trial risks: unapproved local traffic, unreviewed local bridge dependency, exposed local endpoint, exposed token, prompt/file/project data send, arbitrary project scan, local tool launch, provider fallback, automation creation, or missing operator approval.",
        "Blocked local model trial risks: local model traffic requires explicit operator approval and cannot start here.",
      ],
      providerIntegrationRoute:
        "Provider integration route: /controlled-provider-integration-plan reviews provider integration planning without connecting providers.",
      betaHardeningRoute:
        "Beta hardening route: /beta-hardening-final-pass reviews beta hardening without release or publish behavior.",
      nextRecommendedAction:
        "Next recommended action: review local bridge dependency and provider integration plan before any future local model trial approval packet.",
      advancedLocalModelDetails:
        "Advanced local model details: local model provider trial review is review-only. Local model trial review does not call local models, local model traffic requires explicit operator approval, and local credentials and endpoints stay private. It does not call local models, call local bridge endpoints, call local services, launch local tools, run local probes, route local model traffic, call provider APIs, call OpenAI-compatible providers, test provider connections, route live provider traffic, call connectors, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model data without approval, store endpoints, store tokens, store local credentials, display local credentials, display local endpoints, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run workflows, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalModelProviderTrialReview({
      idHint: "blocked-local-traffic-request",
      status: "blocked",
      localModelProviderTrialIdentity:
        "Local model provider trial identity: local-model-provider-trial-review-blocked-local-traffic-request.",
      localModelFamilies: [
        "Local model families: blocked when a request asks this page to call a local model or bridge endpoint.",
      ],
      localBridgeDependencySummary: [
        "Local bridge dependency summary: blocked because the dependency must be reviewed manually and cannot be exercised here.",
      ],
      deniedLocalModelActions: [
        "Denied local model actions: local model calls, local bridge endpoint calls, local probes, local tool launches, and endpoint/token storage remain blocked.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: return to explicit operator approval before any future local model trial.",
      ],
      safetyCredentialBoundaries: [
        "Safety/credential boundaries: local credentials and endpoints stay private and unstored.",
      ],
      blockedLocalModelTrialRisks: [
        "Blocked local model trial risks: unapproved local model traffic and exposed local endpoint handling.",
      ],
      providerIntegrationRoute:
        "Provider integration route: /controlled-provider-integration-plan remains review-only.",
      betaHardeningRoute:
        "Beta hardening route: /beta-hardening-final-pass remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep local model traffic blocked until an approved trial route exists.",
      advancedLocalModelDetails:
        "Advanced local model details: blocked local model trial cannot recover by calling local models, calling local bridge endpoints, storing endpoints, storing tokens, writing files, or approving traffic automatically.",
    }),
  ];
}

export function buildLocalModelProviderTrialReviewBoundary(): LocalModelProviderTrialReviewBoundary {
  return {
    localModelProviderTrialReviewOnly: true,
    localModelTrialReviewDoesNotCallLocalModels: true,
    localModelTrafficRequiresExplicitOperatorApproval: true,
    localCredentialsAndEndpointsStayPrivate: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localModelTrafficAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localServiceCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    localProbeExecutionAllowedFromUi: false,
    endpointStorageAllowed: false,
    tokenStorageAllowed: false,
    localCredentialStorageAllowed: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeLocalModelProviderTrialReview(
  model: Pick<LocalModelProviderTrialReviewModel, "reviews">
): string {
  return `Local model provider trial review reviews ${model.reviews.length} local model trial posture(s). Local model trial review does not call local models, local model traffic requires explicit operator approval, and local credentials and endpoints stay private.`;
}

export function buildLocalModelProviderTrialReviewModel(): LocalModelProviderTrialReviewModel {
  const reviews = buildLocalModelProviderTrialReviews();
  const model: LocalModelProviderTrialReviewModel = {
    title: "Local model provider trial review",
    summary: "",
    reviews,
    boundary: buildLocalModelProviderTrialReviewBoundary(),
    localModelTrialLanguage: [...LOCAL_MODEL_PROVIDER_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local model provider trial review",
      "local model provider trial identity",
      "Local model families",
      "Local bridge dependency summary",
      "denied local model actions",
      "manual validation checklist",
      "safety/credential boundaries",
      "blocked local model trial risks",
      "provider integration route",
      "beta hardening route",
      "next recommended action",
      "Local model trial review does not call local models",
      "Local model traffic requires explicit operator approval",
      "Local credentials and endpoints stay private",
      "advanced local model details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalModelProviderTrialReview(model) };
}
