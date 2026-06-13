import type {
  ConnectorLiveEvidenceCaptureReview,
  ConnectorLiveEvidenceCaptureReviewBoundary,
  ConnectorLiveEvidenceCaptureReviewModel,
} from "./connector-live-evidence-capture-review-types";
import { buildConnectorLiveEvidenceCaptureReviewStableKey } from "./connector-live-evidence-capture-review-types";

export const CONNECTOR_LIVE_EVIDENCE_CAPTURE_REVIEW_LANGUAGE = [
  "Connector live evidence capture review",
  "Connector live evidence capture review does not ingest connector evidence automatically",
  "Connector evidence requires operator review before use",
  "Private connector evidence stays redacted",
  "Evidence capture groups",
  "Source citation checklist",
] as const;

export function buildConnectorLiveEvidenceCaptureReview(
  input: Omit<ConnectorLiveEvidenceCaptureReview, "id"> & { idHint: string }
): ConnectorLiveEvidenceCaptureReview {
  const { idHint, ...review } = input;
  return {
    id: buildConnectorLiveEvidenceCaptureReviewStableKey(
      "connector-live-evidence-capture-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildConnectorLiveEvidenceCaptureReviews(): ConnectorLiveEvidenceCaptureReview[] {
  return [
    buildConnectorLiveEvidenceCaptureReview({
      idHint: "review-only-evidence-capture",
      status: "ready-for-review",
      connectorLiveEvidenceCaptureIdentity:
        "Connector live evidence capture identity: connector-live-evidence-capture-review-review-only-evidence-capture.",
      evidenceCaptureGroups: [
        "Evidence capture groups: connector family, approved purpose, redaction status, source/citation class, reviewer note, denied evidence action list, and release candidate route.",
        "Evidence capture groups: connector live evidence capture review does not ingest connector evidence automatically.",
      ],
      sourceCitationChecklist: [
        "Source citation checklist: keep connector family label, purpose, source class, redaction status, reviewer-written summary, and no raw private values.",
        "Source citation checklist: exclude raw messages, raw events, raw contacts, raw files, private account identifiers, credentials, tokens, and endpoints.",
      ],
      redactionChecklist: [
        "Redaction checklist: private connector evidence stays redacted and any private field must remain a class label or placeholder.",
      ],
      reviewBeforeUseChecklist: [
        "Review-before-use checklist: connector evidence requires operator review before use and cannot flow into providers, memory, RAG, files, or automations from this page.",
      ],
      deniedEvidenceActions: [
        "Denied evidence actions: ingest evidence automatically, store connector data, call connectors, fetch connector data, send evidence to providers, mutate memory, mutate files, or approve evidence automatically.",
        "Denied evidence actions: run research, browse web/search, execute workflows, create automations, or create MCP runtimes.",
      ],
      blockedEvidenceRisks: [
        "Blocked evidence risks: raw private connector evidence, missing redaction, missing source citation checklist, automatic ingestion request, provider send request, or memory promotion request.",
      ],
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-live-trial-release-candidate summarizes connector live-readiness without calling connector APIs.",
      automationLiveGuardRoute:
        "Automation live guard route: /automation-live-execution-guard-review prepares automation execution guardrails without running automations.",
      nextRecommendedAction:
        "Next recommended action: keep evidence review-before-use, then review the connector live trial release candidate and automation live execution guard.",
      advancedEvidenceDetails:
        "Advanced evidence details: connector live evidence capture review is review-only. Connector live evidence capture review does not ingest connector evidence automatically, connector evidence requires operator review before use, and private connector evidence stays redacted. It does not ingest evidence, store connector data, call connectors, connect accounts, fetch connector data, persist permissions, mutate memory, mutate files, call providers, send prompts, store outputs, call local models, call local bridge endpoints, run workflows, create automations, run automations, create schedules, create reminders, create watches, create background jobs, start polling loops, send notifications, approve actions, persist approval decisions, write files, export files, delete files, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorLiveEvidenceCaptureReview({
      idHint: "blocked-auto-ingestion-request",
      status: "blocked",
      connectorLiveEvidenceCaptureIdentity:
        "Connector live evidence capture identity: connector-live-evidence-capture-review-blocked-auto-ingestion-request.",
      evidenceCaptureGroups: [
        "Evidence capture groups: blocked because the request implies automatic evidence ingestion.",
      ],
      sourceCitationChecklist: [
        "Source citation checklist: blocked until a redacted source/citation summary is written by an operator.",
      ],
      redactionChecklist: [
        "Redaction checklist: private connector evidence stays redacted.",
      ],
      reviewBeforeUseChecklist: [
        "Review-before-use checklist: evidence cannot be used before operator review.",
      ],
      deniedEvidenceActions: [
        "Denied evidence actions: evidence ingestion, connector data storage, connector API calls, provider send, file mutation, and memory mutation remain blocked.",
      ],
      blockedEvidenceRisks: [
        "Blocked evidence risks: automatic ingestion or raw evidence keeps evidence capture blocked.",
      ],
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-live-trial-release-candidate remains review-only.",
      automationLiveGuardRoute:
        "Automation live guard route: /automation-live-execution-guard-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep connector evidence blocked until an operator reviews redaction and source citation status.",
      advancedEvidenceDetails:
        "Advanced evidence details: blocked connector evidence cannot recover by ingesting evidence automatically, storing connector data, calling connectors, mutating memory, or mutating files.",
    }),
  ];
}

export function buildConnectorLiveEvidenceCaptureReviewBoundary(): ConnectorLiveEvidenceCaptureReviewBoundary {
  return {
    connectorLiveEvidenceCaptureReviewOnly: true,
    connectorLiveEvidenceCaptureReviewDoesNotIngestConnectorEvidenceAutomatically: true,
    connectorEvidenceRequiresOperatorReviewBeforeUse: true,
    privateConnectorEvidenceStaysRedacted: true,
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
    connectorEvidenceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
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

export function summarizeConnectorLiveEvidenceCaptureReview(
  model: Pick<ConnectorLiveEvidenceCaptureReviewModel, "reviews">
): string {
  return `Connector live evidence capture review prepares ${model.reviews.length} evidence capture posture(s). Connector live evidence capture review does not ingest connector evidence automatically, connector evidence requires operator review before use, and private connector evidence stays redacted.`;
}

export function buildConnectorLiveEvidenceCaptureReviewModel(): ConnectorLiveEvidenceCaptureReviewModel {
  const reviews = buildConnectorLiveEvidenceCaptureReviews();
  const model: ConnectorLiveEvidenceCaptureReviewModel = {
    title: "Connector live evidence capture review",
    summary: "",
    reviews,
    boundary: buildConnectorLiveEvidenceCaptureReviewBoundary(),
    evidenceLanguage: [...CONNECTOR_LIVE_EVIDENCE_CAPTURE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Connector live evidence capture review",
      "connector live evidence capture identity",
      "Evidence capture groups",
      "Source citation checklist",
      "redaction checklist",
      "review-before-use checklist",
      "denied evidence actions",
      "blocked evidence risks",
      "connector release candidate route",
      "automation live guard route",
      "next recommended action",
      "Connector live evidence capture review does not ingest connector evidence automatically",
      "Connector evidence requires operator review before use",
      "Private connector evidence stays redacted",
      "advanced evidence details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorLiveEvidenceCaptureReview(model) };
}
