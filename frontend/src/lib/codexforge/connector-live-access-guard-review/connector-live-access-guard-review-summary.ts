import type {
  ConnectorLiveAccessGuardReview,
  ConnectorLiveAccessGuardReviewBoundary,
  ConnectorLiveAccessGuardReviewModel,
} from "./connector-live-access-guard-review-types";
import { buildConnectorLiveAccessGuardReviewStableKey } from "./connector-live-access-guard-review-types";

export const CONNECTOR_LIVE_ACCESS_GUARD_REVIEW_LANGUAGE = [
  "Connector live access guard review",
  "Connector live access guard review does not connect accounts",
  "Connector live access requires explicit operator approval",
  "Private connector data stays private",
  "Connector access guard groups",
  "Permission boundary checklist",
] as const;

export function buildConnectorLiveAccessGuardReview(
  input: Omit<ConnectorLiveAccessGuardReview, "id"> & { idHint: string }
): ConnectorLiveAccessGuardReview {
  const { idHint, ...review } = input;
  return {
    id: buildConnectorLiveAccessGuardReviewStableKey(
      "connector-live-access-guard-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildConnectorLiveAccessGuardReviews(): ConnectorLiveAccessGuardReview[] {
  return [
    buildConnectorLiveAccessGuardReview({
      idHint: "review-only-live-access-guard",
      status: "ready-for-review",
      connectorLiveAccessGuardIdentity:
        "Connector live access guard identity: connector-live-access-guard-review-review-only-live-access-guard.",
      connectorAccessGuardGroups: [
        "Connector access guard groups: connector owner, minimum scope, private data class, redaction owner, approval owner, denied action owner, and evidence reviewer.",
        "Connector access guard groups: every group is static review text only; connector live access guard review does not connect accounts.",
      ],
      permissionBoundaryChecklist: [
        "Permission boundary checklist: confirm connector family, requested scope, purpose, approval owner, rollback note, denied permissions, and no permission persistence.",
        "Permission boundary checklist: connector live access requires explicit operator approval before any future live connector access.",
      ],
      privateDataBoundaryChecklist: [
        "Private data boundary checklist: private connector data stays private, raw account values stay hidden, and connector data is never fetched from this page.",
        "Private data boundary checklist: credentials, tokens, endpoints, raw messages, raw calendar events, raw contacts, private repository values, and private file names are not displayed.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: require operator identity, scope note, redaction note, evidence review note, stop condition, and no auto-approval.",
        "Approval gate checklist: unapproved connector live access remains blocked.",
      ],
      deniedConnectorLiveAccessActions: [
        "Denied connector live-access actions: connect accounts, start authorization, call connector APIs, fetch connector data, store connector data, persist permissions, sync accounts, or send connector data to providers.",
        "Denied connector live-access actions: run workflows, execute tools, create automations, approve actions, mutate files, mutate memory, or create an MCP runtime.",
      ],
      blockedLiveAccessRisks: [
        "Blocked live-access risks: broad scope, missing operator approval, implied account connection, connector API call request, connector data fetch request, permission persistence request, or provider send request.",
        "Blocked live-access risks: any unresolved connector privacy or approval risk keeps live access blocked.",
      ],
      firstConnectorLiveAccessTrialRoute:
        "First connector live access trial route: /first-connector-live-access-trial-review previews a connector access trial without fetching connector data.",
      connectorEvidenceCaptureRoute:
        "Connector evidence capture route: /connector-live-evidence-capture-review previews evidence handling without ingesting connector evidence.",
      nextRecommendedAction:
        "Next recommended action: keep connector live access blocked, review the first connector live access trial, then review connector evidence capture.",
      advancedGuardDetails:
        "Advanced guard details: connector live access guard review is review-only. Connector live access guard review does not connect accounts, connector live access requires explicit operator approval, private connector data stays private, and unapproved connector access remains blocked. It does not call connectors, connect accounts, fetch connector data, store connector data, persist permissions, store credentials, store tokens, store endpoints, ingest evidence, send connector data to providers, call providers, send prompts, store outputs, call local models, call local bridge endpoints, execute workflows, create automations, run automations, create schedules, create reminders, create watches, create background jobs, start polling loops, send notifications, approve actions, persist approval decisions, mutate files, write files, export files, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorLiveAccessGuardReview({
      idHint: "blocked-account-connection-request",
      status: "blocked",
      connectorLiveAccessGuardIdentity:
        "Connector live access guard identity: connector-live-access-guard-review-blocked-account-connection-request.",
      connectorAccessGuardGroups: [
        "Connector access guard groups: blocked because the request implies account connection instead of review.",
      ],
      permissionBoundaryChecklist: [
        "Permission boundary checklist: no connector permission is granted or persisted from this page.",
      ],
      privateDataBoundaryChecklist: [
        "Private data boundary checklist: private connector data stays private.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: require explicit operator approval outside this page before any future connector access.",
      ],
      deniedConnectorLiveAccessActions: [
        "Denied connector live-access actions: account connection, connector API calls, connector data fetch, connector data storage, and permission persistence remain blocked.",
      ],
      blockedLiveAccessRisks: [
        "Blocked live-access risks: missing approval or implied live access keeps connector live access blocked.",
      ],
      firstConnectorLiveAccessTrialRoute:
        "First connector live access trial route: /first-connector-live-access-trial-review remains review-only.",
      connectorEvidenceCaptureRoute:
        "Connector evidence capture route: /connector-live-evidence-capture-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep live connector access blocked and write a manual approval packet outside this page.",
      advancedGuardDetails:
        "Advanced guard details: blocked connector live access cannot recover by connecting accounts, calling connector APIs, fetching connector data, storing connector data, persisting permissions, or sending connector data to providers.",
    }),
  ];
}

export function buildConnectorLiveAccessGuardReviewBoundary(): ConnectorLiveAccessGuardReviewBoundary {
  return {
    connectorLiveAccessGuardReviewOnly: true,
    connectorLiveAccessGuardReviewDoesNotConnectAccounts: true,
    connectorLiveAccessRequiresExplicitOperatorApproval: true,
    privateConnectorDataStaysPrivate: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    connectorPermissionPersistenceAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
    privateConnectorDetailsDisplayedAllowed: false,
    connectorEvidenceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowedFromUi: false,
    evidenceSentToProvidersAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationRulePersistenceAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    watchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    creativeAssetGenerationAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    webSearchApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    tokenStorageAllowed: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    outputStorageAllowed: false,
    connectorDataStorageAllowed: false,
    automationDataStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeConnectorLiveAccessGuardReview(
  model: Pick<ConnectorLiveAccessGuardReviewModel, "reviews">
): string {
  return `Connector live access guard review prepares ${model.reviews.length} live access guard posture(s). Connector live access guard review does not connect accounts, connector live access requires explicit operator approval, and private connector data stays private.`;
}

export function buildConnectorLiveAccessGuardReviewModel(): ConnectorLiveAccessGuardReviewModel {
  const reviews = buildConnectorLiveAccessGuardReviews();
  const model: ConnectorLiveAccessGuardReviewModel = {
    title: "Connector live access guard review",
    summary: "",
    reviews,
    boundary: buildConnectorLiveAccessGuardReviewBoundary(),
    guardLanguage: [...CONNECTOR_LIVE_ACCESS_GUARD_REVIEW_LANGUAGE],
    advancedDetails: [
      "Connector live access guard review",
      "connector live access guard identity",
      "Connector access guard groups",
      "Permission boundary checklist",
      "private data boundary checklist",
      "approval gate checklist",
      "denied connector live-access actions",
      "blocked live-access risks",
      "first connector live access trial route",
      "connector evidence capture route",
      "next recommended action",
      "Connector live access guard review does not connect accounts",
      "Connector live access requires explicit operator approval",
      "Private connector data stays private",
      "advanced guard details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorLiveAccessGuardReview(model) };
}
