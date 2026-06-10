import type {
  ConnectorLoopRealWorldTrialReview,
  ConnectorLoopRealWorldTrialReviewBoundary,
  ConnectorLoopRealWorldTrialReviewModel,
} from "./connector-loop-real-world-trial-review-types";
import { buildConnectorLoopRealWorldTrialReviewStableKey } from "./connector-loop-real-world-trial-review-types";

export const CONNECTOR_LOOP_REAL_WORLD_TRIAL_REVIEW_LANGUAGE = [
  "Connector loop real-world trial review",
  "Connector trial review does not read connector data",
  "Gmail Calendar and Contacts access require explicit approval",
  "Tokens and private values are never displayed",
  "Connector access plan",
  "Privacy redaction checklist",
] as const;

export function buildConnectorLoopRealWorldTrialReview(
  input: Omit<ConnectorLoopRealWorldTrialReview, "id"> & { idHint: string }
): ConnectorLoopRealWorldTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildConnectorLoopRealWorldTrialReviewStableKey(
      "connector-loop-real-world-trial-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildConnectorLoopRealWorldTrialReviews(): ConnectorLoopRealWorldTrialReview[] {
  return [
    buildConnectorLoopRealWorldTrialReview({
      idHint: "operator-access-plan-review",
      status: "ready-for-review",
      connectorTrialIdentity:
        "Connector trial identity: connector-loop-real-world-trial-review-operator-access-plan-review.",
      sourceConnectorReleaseCandidate:
        "Source connector release candidate: /connector-release-candidate supplies connector workspace readiness, Gmail Calendar Contacts boundaries, evidence capture readiness, privacy redaction readiness, and blocked reasons.",
      operatorConnectorScenario:
        "Operator connector scenario: a real operator reviews which connector data would be needed, what access remains blocked, how evidence would be captured, and what must be redacted without reading connector data.",
      connectorAccessPlan: [
        "Connector access plan: list the intended Gmail Calendar and Contacts scopes in plain English without requesting OAuth.",
        "Connector access plan: keep access approval separate from review and do not read emails, calendar events, or contacts from this page.",
        "Connector access plan: real evidence is reviewed before use and memory promotion remains blocked until approved.",
      ],
      gmailCalendarContactsBoundaries: [
        "Gmail Calendar and Contacts boundaries: Gmail Calendar and Contacts access require explicit approval.",
        "Gmail Calendar and Contacts boundaries: no Gmail API calls, Calendar API calls, Contacts API calls, Google API calls, automatic email reads, automatic calendar reads, automatic contact reads, drafts, sends, event mutations, or contact mutations.",
        "Gmail Calendar and Contacts boundaries: tokens and private values are never displayed.",
      ],
      privacyRedactionChecklist: [
        "Privacy redaction checklist: exclude tokens, API keys, private connector values, secret-like values, private message bodies, event details, contact details, and hidden memory.",
        "Privacy redaction checklist: show only reviewed evidence summaries after explicit approval.",
        "Privacy redaction checklist: do not store tokens in localStorage or sessionStorage.",
      ],
      evidenceCaptureReview:
        "Evidence capture review: connector evidence is reviewed before use, redacted before handoff, and never ingested or promoted into memory automatically.",
      blockedRealActions: [
        "Blocked real actions: connector API calls, Gmail API calls, Calendar API calls, Contacts API calls, Google API calls, OAuth request flow, connector authorization, connector data reads, connector sync, automatic email reads, automatic calendar reads, automatic contact reads, email draft/send behavior, calendar event mutation, contact mutation, token storage, and private value display.",
        "Blocked real actions: provider calls, web/search calls, source fetching/browsing, commands, shell commands, git commands, tests, builds, smoke checks, patch apply behavior, commits, file mutation, reminders, schedules, automations, background jobs, notifications, polling loops, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, and MCP tool calls.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: ready when access intent, redaction, evidence capture, and approval gates are clear.",
        "Trial outcome notes: blocked if private values, tokens, or connector data would be shown before approval.",
      ],
      nextLoopRoute:
        "Next loop route: /automation-loop-real-world-trial-review reviews automation readiness without creating automations.",
      advancedConnectorTrialDetails:
        "Advanced connector trial details: connector loop real-world trial review is review-only and does not read connector data, call connector APIs, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, request OAuth, authorize connectors, sync connector data, read emails, read calendar events, read contacts, draft emails, send emails, mutate calendar events, mutate contacts, store tokens, store API keys, display private values, call providers, call web/search APIs, fetch sources, browse sources, run commands, run tests, run builds, run smoke checks, apply patches, create commits, mutate files, export files, delete files, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorLoopRealWorldTrialReview({
      idHint: "blocked-private-value-exposure",
      status: "blocked",
      connectorTrialIdentity:
        "Connector trial identity: connector-loop-real-world-trial-review-blocked-private-value-exposure.",
      sourceConnectorReleaseCandidate:
        "Source connector release candidate: blocked until /connector-release-candidate confirms connector boundaries and privacy redaction readiness.",
      operatorConnectorScenario:
        "Operator connector scenario: blocked when the review would request OAuth, authorize a connector, read emails, read calendar events, read contacts, show tokens, show private values, or store secrets.",
      connectorAccessPlan: [
        "Connector access plan: blocked until access scope and approval gates are explicit.",
      ],
      gmailCalendarContactsBoundaries: [
        "Gmail Calendar and Contacts boundaries: blocked because access would require explicit approval.",
      ],
      privacyRedactionChecklist: [
        "Privacy redaction checklist: blocked because private values could be exposed.",
      ],
      evidenceCaptureReview:
        "Evidence capture review: blocked because connector evidence cannot be captured or reviewed safely yet.",
      blockedRealActions: [
        "Blocked real actions: every connector, provider, local file, command, automation, memory, plugin, tool, agent, and MCP action remains blocked.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: blocked until tokens, private values, approval gates, and redaction rules are reviewed.",
      ],
      nextLoopRoute:
        "Next loop route: /automation-loop-real-world-trial-review remains the next review-only loop after connector review.",
      advancedConnectorTrialDetails:
        "Advanced connector trial details: blocked connector reviews cannot recover by reading connector data, requesting OAuth, storing tokens, showing private values, calling APIs, sending notifications, creating automations, promoting memory, mutating Brain graph data, or creating an MCP runtime.",
    }),
  ];
}

export function buildConnectorLoopRealWorldTrialReviewBoundary(): ConnectorLoopRealWorldTrialReviewBoundary {
  return {
    connectorTrialReviewOnly: true,
    connectorTrialReviewDoesNotReadConnectorData: true,
    gmailCalendarContactsAccessRequireExplicitApproval: true,
    tokensAndPrivateValuesNeverDisplayed: true,
    realEvidenceReviewedBeforeUse: true,
    memoryPromotionBlockedUntilApproved: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    codingTaskExecutionAllowedFromUi: false,
    taskExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commitCreationAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    sourceAutoFetchAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorDataReadFromPageAllowed: false,
    connectorSyncAllowedFromUi: false,
    automaticConnectorReadsAllowed: false,
    automaticEmailReadsAllowed: false,
    automaticCalendarReadsAllowed: false,
    automaticContactReadsAllowed: false,
    emailDraftSendAllowedFromUi: false,
    calendarEventMutationAllowedFromUi: false,
    contactMutationAllowedFromUi: false,
    tokenStorageAllowed: false,
    connectorTokenStorageAllowedFromUi: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    tokensDisplayedAllowed: false,
    privateConnectorValuesDisplayedAllowed: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeConnectorLoopRealWorldTrialReview(
  model: Pick<ConnectorLoopRealWorldTrialReviewModel, "reviews">
): string {
  return `Connector loop real-world trial review prepares ${model.reviews.length} connector trial posture(s). Connector trial review does not read connector data, Gmail Calendar and Contacts access require explicit approval, and tokens and private values are never displayed.`;
}

export function buildConnectorLoopRealWorldTrialReviewModel(): ConnectorLoopRealWorldTrialReviewModel {
  const reviews = buildConnectorLoopRealWorldTrialReviews();
  const model: ConnectorLoopRealWorldTrialReviewModel = {
    title: "Connector loop real-world trial review",
    summary: "",
    reviews,
    boundary: buildConnectorLoopRealWorldTrialReviewBoundary(),
    trialReviewLanguage: [...CONNECTOR_LOOP_REAL_WORLD_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Connector loop real-world trial review",
      "Connector trial review does not read connector data",
      "Gmail Calendar and Contacts access require explicit approval",
      "Tokens and private values are never displayed",
      "Real evidence is reviewed before use",
      "Memory promotion remains blocked until approved",
      "Connector trial identity",
      "Source connector release candidate",
      "Operator connector scenario",
      "Connector access plan",
      "Gmail/Calendar/Contacts boundaries",
      "Privacy redaction checklist",
      "Evidence capture review",
      "Blocked real actions",
      "Trial outcome notes",
      "Next loop route",
      "advanced connector trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorLoopRealWorldTrialReview(model) };
}
