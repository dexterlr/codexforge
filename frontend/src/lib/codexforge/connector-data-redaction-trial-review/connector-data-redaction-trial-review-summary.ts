import type {
  ConnectorDataRedactionTrialReview,
  ConnectorDataRedactionTrialReviewBoundary,
  ConnectorDataRedactionTrialReviewModel,
} from "./connector-data-redaction-trial-review-types";
import { buildConnectorDataRedactionTrialReviewStableKey } from "./connector-data-redaction-trial-review-types";

export const CONNECTOR_DATA_REDACTION_TRIAL_REVIEW_LANGUAGE = [
  "Connector data redaction trial review",
  "Connector data redaction trial does not fetch connector data",
  "Private connector details stay redacted",
  "Redaction rules require operator review",
  "Redaction groups",
  "Redaction checklist",
] as const;

export function buildConnectorDataRedactionTrialReview(
  input: Omit<ConnectorDataRedactionTrialReview, "id"> & { idHint: string }
): ConnectorDataRedactionTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildConnectorDataRedactionTrialReviewStableKey(
      "connector-data-redaction-trial-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildConnectorDataRedactionTrialReviews(): ConnectorDataRedactionTrialReview[] {
  return [
    buildConnectorDataRedactionTrialReview({
      idHint: "placeholder-only-redaction-preview",
      status: "ready-for-review",
      connectorDataRedactionIdentity:
        "Connector data redaction identity: connector-data-redaction-trial-review-placeholder-only-redaction-preview.",
      redactionGroups: [
        "Redaction groups: account identity labels, message field classes, calendar field classes, contact field classes, repository metadata classes, attachment labels, and evidence summary labels.",
        "Redaction groups: groups are previewed with fake placeholder data only; connector data redaction trial does not fetch connector data.",
      ],
      privateFieldExamples: [
        "Private field example: <email-subject-placeholder> becomes [redacted email subject].",
        "Private field example: <calendar-location-placeholder> becomes [redacted calendar location].",
        "Private field example: <contact-phone-placeholder> becomes [redacted contact phone].",
        "Private field example: <repository-issue-placeholder> becomes [redacted private repository note].",
      ],
      redactionChecklist: [
        "Redaction checklist: replace private connector details with field classes, remove tokens, remove account identifiers, keep source labels generic, and keep reviewer notes non-secret.",
        "Redaction checklist: redaction rules require operator review before any evidence handoff.",
      ],
      deniedRedactionShortcuts: [
        "Denied redaction shortcuts: fetch connector data, paste raw private values, store connector data, skip operator review, send evidence to providers, and ingest evidence automatically.",
        "Denied redaction shortcuts: auto-approve redaction, create automation, run research, browse web/search, apply code, mutate files, or mutate memory.",
      ],
      dataHandlingBoundaryNotes: [
        "Data handling boundary notes: private connector details stay redacted and fake placeholders are the only examples shown.",
        "Data handling boundary notes: credentials, tokens, endpoints, raw connector IDs, raw messages, raw events, raw contacts, raw files, and raw repository values are excluded.",
      ],
      blockedRedactionRisks: [
        "Blocked redaction risks: any real private connector value, connector API call, connector data fetch, connector data storage, missing operator review, or provider send blocks the trial.",
        "Blocked redaction risks: redaction is not complete until evidence handoff remains review-only and private fields stay redacted.",
      ],
      evidenceHandoffRoute:
        "Evidence handoff route: /connector-evidence-handoff-review previews review-before-use evidence handoff without automatic ingestion.",
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-integration-release-candidate summarizes readiness without live connector calls.",
      nextRecommendedAction:
        "Next recommended action: review evidence handoff, then check the connector integration release candidate before any manual approval packet.",
      advancedRedactionDetails:
        "Advanced redaction details: connector data redaction trial review is review-only. Connector data redaction trial does not fetch connector data, private connector details stay redacted, and redaction rules require operator review. It does not connect accounts, call connector APIs, fetch connector data, store connector data, persist permission grants, display real private connector data, send connector data to providers, call providers, send prompts, store provider outputs, call local models, call local bridge endpoints, launch local tools, generate creative assets, run research, browse web or search APIs, call GitHub APIs, execute coding workflows, apply patches, scan arbitrary projects, browse local files, read files, write files, export files, delete files, run git commands, run shell commands, run tests, run builds, run smoke checks, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorDataRedactionTrialReview({
      idHint: "blocked-raw-private-value",
      status: "blocked",
      connectorDataRedactionIdentity:
        "Connector data redaction identity: connector-data-redaction-trial-review-blocked-raw-private-value.",
      redactionGroups: [
        "Redaction groups: blocked because a real private value is implied instead of a fake placeholder.",
      ],
      privateFieldExamples: [
        "Private field example: <blocked-private-value-placeholder> must be replaced with a redacted field class.",
      ],
      redactionChecklist: [
        "Redaction checklist: block the handoff until real private connector details are removed.",
      ],
      deniedRedactionShortcuts: [
        "Denied redaction shortcuts: raw connector values, connector data fetch, connector data storage, and provider send remain blocked.",
      ],
      dataHandlingBoundaryNotes: [
        "Data handling boundary notes: private connector details stay redacted.",
      ],
      blockedRedactionRisks: [
        "Blocked redaction risks: real private data, missing redaction rule, or missing operator review keeps the redaction trial blocked.",
      ],
      evidenceHandoffRoute:
        "Evidence handoff route: /connector-evidence-handoff-review remains blocked until redaction is review-ready.",
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-integration-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: replace private values with placeholders and review the redaction checklist manually.",
      advancedRedactionDetails:
        "Advanced redaction details: blocked connector redaction cannot recover by fetching connector data, storing connector data, displaying real private data, sending evidence to providers, ingesting evidence, or approving redaction automatically.",
    }),
  ];
}

export function buildConnectorDataRedactionTrialReviewBoundary(): ConnectorDataRedactionTrialReviewBoundary {
  return {
    connectorDataRedactionTrialReviewOnly: true,
    connectorDataRedactionTrialDoesNotFetchConnectorData: true,
    privateConnectorDetailsStayRedacted: true,
    redactionRulesRequireOperatorReview: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
    privateConnectorDetailsDisplayedAllowed: false,
    evidenceAutoIngestionAllowedFromUi: false,
    evidenceSentToProvidersAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
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
    credentialStorageAllowed: false,
    endpointStorageAllowed: false,
    tokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeConnectorDataRedactionTrialReview(
  model: Pick<ConnectorDataRedactionTrialReviewModel, "reviews">
): string {
  return `Connector data redaction trial review prepares ${model.reviews.length} redaction trial posture(s). Connector data redaction trial does not fetch connector data, private connector details stay redacted, and redaction rules require operator review.`;
}

export function buildConnectorDataRedactionTrialReviewModel(): ConnectorDataRedactionTrialReviewModel {
  const reviews = buildConnectorDataRedactionTrialReviews();
  const model: ConnectorDataRedactionTrialReviewModel = {
    title: "Connector data redaction trial review",
    summary: "",
    reviews,
    boundary: buildConnectorDataRedactionTrialReviewBoundary(),
    redactionLanguage: [...CONNECTOR_DATA_REDACTION_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Connector data redaction trial review",
      "connector data redaction identity",
      "Redaction groups",
      "private field examples",
      "Redaction checklist",
      "denied redaction shortcuts",
      "data handling boundary notes",
      "blocked redaction risks",
      "evidence handoff route",
      "connector release candidate route",
      "next recommended action",
      "Connector data redaction trial does not fetch connector data",
      "Private connector details stay redacted",
      "Redaction rules require operator review",
      "advanced redaction details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorDataRedactionTrialReview(model) };
}
