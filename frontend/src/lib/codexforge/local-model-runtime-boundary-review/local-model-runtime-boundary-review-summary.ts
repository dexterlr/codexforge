import type {
  LocalModelRuntimeBoundaryReview,
  LocalModelRuntimeBoundaryReviewBoundary,
  LocalModelRuntimeBoundaryReviewModel,
} from "./local-model-runtime-boundary-review-types";
import { buildLocalModelRuntimeBoundaryReviewStableKey } from "./local-model-runtime-boundary-review-types";

export const LOCAL_MODEL_RUNTIME_BOUNDARY_REVIEW_LANGUAGE = [
  "Local model runtime boundary review",
  "Local model runtime boundary does not call local models",
  "Runtime checks require explicit operator approval",
  "Local endpoints stay private",
  "Runtime families",
  "Local bridge dependency notes",
] as const;

export function buildLocalModelRuntimeBoundaryReview(
  input: Omit<LocalModelRuntimeBoundaryReview, "id"> & { idHint: string }
): LocalModelRuntimeBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildLocalModelRuntimeBoundaryReviewStableKey("local-model-runtime-boundary-review", idHint, input.status),
    ...review,
  };
}

export function buildLocalModelRuntimeBoundaryReviews(): LocalModelRuntimeBoundaryReview[] {
  return [
    buildLocalModelRuntimeBoundaryReview({
      idHint: "review-only-runtime-boundary",
      status: "ready-for-review",
      localModelRuntimeBoundaryIdentity:
        "Local model runtime boundary identity: local-model-runtime-boundary-review-review-only-runtime-boundary.",
      runtimeFamilies: [
        "Runtime families: local chat runtime, local OpenAI-compatible runtime, local embedding runtime, local creative runtime, local batch helper, and manual fallback.",
        "Runtime families: family names are reviewed as labels only; local model runtime boundary does not call local models.",
      ],
      localBridgeDependencyNotes: [
        "Local bridge dependency notes: bridge readiness, explicit consent, private endpoint handling, local-only allowlist, and operator-owned evidence must be reviewed before any runtime check.",
        "Local bridge dependency notes: this review does not call local bridge endpoints, probe local endpoints, launch local tools, or test live local connections.",
      ],
      deniedRuntimeActions: [
        "Denied runtime actions: calling local models, calling local bridge endpoints, probing local endpoints, launching tools, switching runtimes, retrying model calls, sending prompts, routing traffic, and storing endpoints.",
        "Denied runtime actions: file mutation, Brain graph mutation, memory ingestion, connector calls, web/search calls, GitHub calls, shell commands, git commands, and workflow execution remain blocked.",
      ],
      endpointPrivacyRules: [
        "Endpoint privacy rules: local endpoints stay private and are never stored, displayed as raw values, copied to browser storage, or sent to providers.",
        "Endpoint privacy rules: credentials, keys, tokens, private prompt details, and local host details stay redacted.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: operator confirms runtime family, boundary owner, local bridge dependency, private endpoint handling, prompt privacy, denied runtime actions, rollback path, and evidence route.",
        "Manual validation checklist: runtime checks require explicit operator approval and cannot start from this page.",
      ],
      blockedRuntimeRisks: [
        "Blocked runtime risks: unapproved local model call, local bridge call, local endpoint probe, endpoint exposure, token exposure, prompt send, model output persistence, runtime switch, retry loop, file mutation, or memory mutation.",
        "Blocked runtime risks: unresolved runtime checks stay blocked until approval exists outside this review.",
      ],
      localModelOutputInboxRoute:
        "Local model output inbox route: /local-model-output-review-inbox reviews output handling without storing model outputs.",
      localModelFailoverRoute:
        "Local model failover route: /local-model-failover-review reviews fallback behavior without switching runtimes.",
      nextRecommendedAction:
        "Next recommended action: review output handling and failover boundaries before any local runtime approval packet.",
      advancedRuntimeBoundaryDetails:
        "Advanced runtime boundary details: local model runtime boundary review is review-only. Local model runtime boundary does not call local models, runtime checks require explicit operator approval, and local endpoints stay private. It does not call local models, call local bridge endpoints, probe local endpoints, launch local tools, switch runtimes, retry model calls, route local model traffic, send prompts to models, store model outputs, ingest model outputs, call provider APIs, call OpenAI-compatible providers, test provider connections, route provider traffic, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/endpoint/output data without approval, store endpoints, store tokens, store credentials, display secrets, print process.env, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalModelRuntimeBoundaryReview({
      idHint: "blocked-runtime-check-request",
      status: "blocked",
      localModelRuntimeBoundaryIdentity:
        "Local model runtime boundary identity: local-model-runtime-boundary-review-blocked-runtime-check-request.",
      runtimeFamilies: [
        "Runtime families: blocked when a request asks this page to call a runtime, probe an endpoint, or test a local model connection.",
      ],
      localBridgeDependencyNotes: [
        "Local bridge dependency notes: blocked because local bridge checks require explicit operator approval outside this page.",
      ],
      deniedRuntimeActions: [
        "Denied runtime actions: local model calls, local bridge calls, local endpoint probes, runtime switches, and model retries remain blocked.",
      ],
      endpointPrivacyRules: [
        "Endpoint privacy rules: local endpoints stay private, unstored, and redacted.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: return to manual approval before any runtime check is considered.",
      ],
      blockedRuntimeRisks: [
        "Blocked runtime risks: unapproved local runtime activity and private endpoint exposure remain blocked.",
      ],
      localModelOutputInboxRoute:
        "Local model output inbox route: /local-model-output-review-inbox remains review-only.",
      localModelFailoverRoute:
        "Local model failover route: /local-model-failover-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep runtime checks blocked until an operator approves a future validation path.",
      advancedRuntimeBoundaryDetails:
        "Advanced runtime boundary details: blocked runtime review cannot recover by calling local models, probing local endpoints, switching runtimes, retrying model calls, storing endpoints, writing files, or mutating memory.",
    }),
  ];
}

export function buildLocalModelRuntimeBoundaryReviewBoundary(): LocalModelRuntimeBoundaryReviewBoundary {
  return {
    localModelRuntimeBoundaryReviewOnly: true,
    localModelRuntimeBoundaryDoesNotCallLocalModels: true,
    runtimeChecksRequireExplicitOperatorApproval: true,
    localEndpointsStayPrivate: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localModelTrafficAllowedFromUi: false,
    localModelTrafficRoutingAllowedFromUi: false,
    localModelLiveConnectionTestsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localEndpointProbeExecutionAllowedFromUi: false,
    localServiceCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    runtimeSwitchingAllowedFromUi: false,
    modelRetryCallsAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    modelOutputStorageAllowedFromUi: false,
    modelOutputIngestionAllowedFromUi: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    tokenStorageAllowed: false,
    localCredentialStorageAllowed: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelEndpointOutputDataAutoSendAllowed: false,
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

export function summarizeLocalModelRuntimeBoundaryReview(
  model: Pick<LocalModelRuntimeBoundaryReviewModel, "reviews">
): string {
  return `Local model runtime boundary review prepares ${model.reviews.length} runtime boundary posture(s). Local model runtime boundary does not call local models, runtime checks require explicit operator approval, and local endpoints stay private.`;
}

export function buildLocalModelRuntimeBoundaryReviewModel(): LocalModelRuntimeBoundaryReviewModel {
  const reviews = buildLocalModelRuntimeBoundaryReviews();
  const model: LocalModelRuntimeBoundaryReviewModel = {
    title: "Local model runtime boundary review",
    summary: "",
    reviews,
    boundary: buildLocalModelRuntimeBoundaryReviewBoundary(),
    runtimeBoundaryLanguage: [...LOCAL_MODEL_RUNTIME_BOUNDARY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local model runtime boundary review",
      "local model runtime boundary identity",
      "Runtime families",
      "Local bridge dependency notes",
      "Denied runtime actions",
      "Endpoint privacy rules",
      "Manual validation checklist",
      "Blocked runtime risks",
      "Local model output inbox route",
      "Local model failover route",
      "Next recommended action",
      "Local model runtime boundary does not call local models",
      "Runtime checks require explicit operator approval",
      "Local endpoints stay private",
      "advanced runtime boundary details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalModelRuntimeBoundaryReview(model) };
}
