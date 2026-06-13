import type {
  FirstConnectorLiveAccessTrialReview,
  FirstConnectorLiveAccessTrialReviewBoundary,
  FirstConnectorLiveAccessTrialReviewModel,
} from "./first-connector-live-access-trial-review-types";
import { buildFirstConnectorLiveAccessTrialReviewStableKey } from "./first-connector-live-access-trial-review-types";

export const FIRST_CONNECTOR_LIVE_ACCESS_TRIAL_REVIEW_LANGUAGE = [
  "First connector live access trial review",
  "First connector live access trial review does not fetch connector data",
  "Connector access trials require explicit operator approval",
  "Unapproved connector access remains blocked",
  "Trial stages",
  "Privacy and redaction checklist",
] as const;

export function buildFirstConnectorLiveAccessTrialReview(
  input: Omit<FirstConnectorLiveAccessTrialReview, "id"> & { idHint: string }
): FirstConnectorLiveAccessTrialReview {
  const { idHint, ...trial } = input;
  return {
    id: buildFirstConnectorLiveAccessTrialReviewStableKey(
      "first-connector-live-access-trial-review",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildFirstConnectorLiveAccessTrialReviews(): FirstConnectorLiveAccessTrialReview[] {
  return [
    buildFirstConnectorLiveAccessTrialReview({
      idHint: "review-only-first-live-access-trial",
      status: "ready-for-review",
      firstConnectorLiveAccessTrialIdentity:
        "First connector live access trial identity: first-connector-live-access-trial-review-review-only-first-live-access-trial.",
      trialStages: [
        "Trial stages: choose connector family, confirm minimum scope, review private data class, confirm redaction route, confirm evidence route, confirm approval owner, and stop before live access.",
        "Trial stages: first connector live access trial review does not fetch connector data.",
      ],
      permissionScopeReviewChecklist: [
        "Permission scope review checklist: connector family, read-only need, denied mutation, account owner, approval owner, rollback note, and no permission persistence.",
      ],
      privacyAndRedactionChecklist: [
        "Privacy and redaction checklist: private connector data stays redacted, connector data is not fetched, and evidence stays review-before-use.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: connector access trials require explicit operator approval and unapproved connector access remains blocked.",
      ],
      deniedConnectorTrialActions: [
        "Denied connector trial actions: connect accounts, call connector APIs, fetch connector data, store connector data, persist permissions, ingest evidence, send connector data to providers, or approve access automatically.",
        "Denied connector trial actions: run workflows, execute tools, create automations, mutate files, mutate memory, or create an MCP runtime.",
      ],
      blockedConnectorTrialRisks: [
        "Blocked connector trial risks: missing approval, broad scope, raw private data request, data fetch request, permission persistence request, or evidence auto-ingestion request.",
      ],
      connectorEvidenceCaptureRoute:
        "Connector evidence capture route: /connector-live-evidence-capture-review previews evidence handling without ingesting or storing connector evidence.",
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-live-trial-release-candidate summarizes connector live-readiness without calling connector APIs.",
      nextRecommendedAction:
        "Next recommended action: review evidence capture, then prepare the connector live trial release candidate while unapproved access stays blocked.",
      advancedTrialDetails:
        "Advanced trial details: first connector live access trial review is review-only. First connector live access trial review does not fetch connector data, connector access trials require explicit operator approval, and unapproved connector access remains blocked. It does not call connectors, connect accounts, fetch connector data, store connector data, persist permissions, ingest evidence, send connector data to providers, call providers, send prompts, store outputs, call local models, call local bridge endpoints, run workflows, create automations, run automations, create schedules, create reminders, create watches, create background jobs, start polling loops, send notifications, approve actions, persist approval decisions, mutate files, write files, export files, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFirstConnectorLiveAccessTrialReview({
      idHint: "blocked-data-fetch-request",
      status: "blocked",
      firstConnectorLiveAccessTrialIdentity:
        "First connector live access trial identity: first-connector-live-access-trial-review-blocked-data-fetch-request.",
      trialStages: [
        "Trial stages: blocked because the request implies connector data fetch instead of review.",
      ],
      permissionScopeReviewChecklist: [
        "Permission scope review checklist: no connector scope is granted or persisted.",
      ],
      privacyAndRedactionChecklist: [
        "Privacy and redaction checklist: private connector data stays redacted and unfetched.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: explicit operator approval is still required outside this page.",
      ],
      deniedConnectorTrialActions: [
        "Denied connector trial actions: connector API calls, connector data fetch, connector data storage, permission persistence, and automatic approval remain blocked.",
      ],
      blockedConnectorTrialRisks: [
        "Blocked connector trial risks: unapproved connector access remains blocked.",
      ],
      connectorEvidenceCaptureRoute:
        "Connector evidence capture route: /connector-live-evidence-capture-review remains review-only.",
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-live-trial-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: return to connector live access guard review and keep the trial blocked.",
      advancedTrialDetails:
        "Advanced trial details: blocked connector trial cannot recover by fetching connector data, storing connector data, calling connector APIs, persisting permissions, or approving access automatically.",
    }),
  ];
}

export function buildFirstConnectorLiveAccessTrialReviewBoundary(): FirstConnectorLiveAccessTrialReviewBoundary {
  return {
    firstConnectorLiveAccessTrialReviewOnly: true,
    firstConnectorLiveAccessTrialReviewDoesNotFetchConnectorData: true,
    connectorAccessTrialsRequireExplicitOperatorApproval: true,
    unapprovedConnectorAccessRemainsBlocked: true,
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

export function summarizeFirstConnectorLiveAccessTrialReview(
  model: Pick<FirstConnectorLiveAccessTrialReviewModel, "trials">
): string {
  return `First connector live access trial review prepares ${model.trials.length} connector access trial posture(s). First connector live access trial review does not fetch connector data, connector access trials require explicit operator approval, and unapproved connector access remains blocked.`;
}

export function buildFirstConnectorLiveAccessTrialReviewModel(): FirstConnectorLiveAccessTrialReviewModel {
  const trials = buildFirstConnectorLiveAccessTrialReviews();
  const model: FirstConnectorLiveAccessTrialReviewModel = {
    title: "First connector live access trial review",
    summary: "",
    trials,
    boundary: buildFirstConnectorLiveAccessTrialReviewBoundary(),
    trialLanguage: [...FIRST_CONNECTOR_LIVE_ACCESS_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "First connector live access trial review",
      "first connector live access trial identity",
      "Trial stages",
      "permission scope review checklist",
      "Privacy and redaction checklist",
      "approval gate checklist",
      "denied connector trial actions",
      "blocked connector trial risks",
      "connector evidence capture route",
      "connector release candidate route",
      "next recommended action",
      "First connector live access trial review does not fetch connector data",
      "Connector access trials require explicit operator approval",
      "Unapproved connector access remains blocked",
      "advanced trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstConnectorLiveAccessTrialReview(model) };
}
