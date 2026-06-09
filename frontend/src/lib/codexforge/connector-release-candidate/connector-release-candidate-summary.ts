import type {
  ConnectorReleaseCandidate,
  ConnectorReleaseCandidateBoundary,
  ConnectorReleaseCandidateModel,
} from "./connector-release-candidate-types";
import { buildConnectorReleaseCandidateStableKey } from "./connector-release-candidate-types";

export const CONNECTOR_RELEASE_CANDIDATE_LANGUAGE = [
  "Connector release candidate",
  "Connector release candidate remains review-only",
  "Connectors remain approval-gated",
  "No connector API request is sent from this page",
  "Privacy redaction readiness",
  "Release decision",
] as const;

export function buildConnectorReleaseCandidate(
  input: Omit<ConnectorReleaseCandidate, "id"> & { idHint: string }
): ConnectorReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildConnectorReleaseCandidateStableKey(
      "connector-release-candidate",
      idHint,
      input.releaseDecision
    ),
    ...candidate,
  };
}

export function buildConnectorReleaseCandidates(): ConnectorReleaseCandidate[] {
  return [
    buildConnectorReleaseCandidate({
      idHint: "review-only-connector-mvp",
      releaseDecision: "ready with fixes",
      releaseCandidateIdentity:
        "Release candidate identity: connector-release-candidate-review-only-connector-mvp.",
      coveredConnectorSurfaces: [
        "Covered connector surface: /connector-workspace planning shell.",
        "Covered connector surface: /gmail-connector-boundary review.",
        "Covered connector surface: /calendar-connector-boundary review.",
        "Covered connector surface: /contacts-connector-boundary review.",
        "Covered connector surface: /connector-evidence-capture-review evidence capture review.",
        "Covered connector surface: /connector-privacy-redaction-review privacy redaction review.",
      ],
      gmailBoundaryReadiness:
        "Gmail boundary readiness: review-only and approval-gated; no email is read, drafted, sent, searched, or synced.",
      calendarBoundaryReadiness:
        "Calendar boundary readiness: review-only and approval-gated; no calendar event is read, created, updated, deleted, or synced.",
      contactsBoundaryReadiness:
        "Contacts boundary readiness: review-only and approval-gated; no contact is read, created, updated, deleted, or synced.",
      evidenceCaptureReadiness:
        "Evidence capture readiness: connector evidence is reviewed before use and no connector data is captured from the evidence page.",
      privacyRedactionReadiness:
        "Privacy redaction readiness: redaction happens before connector evidence leaves review and private connector values are not displayed.",
      knownGaps: [
        "Known gap: no live connector authorization path exists yet.",
        "Known gap: no connector data capture runtime exists yet.",
        "Known gap: no notification delivery, reminders, scheduling, or automations exist yet.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /operator-notification-center introduces notification review categories without sending notifications.",
      blockedReasons: [
        "Connectors remain approval-gated",
        "No connector API request is sent from this page",
        "Release candidate remains review-only until final gaps are accepted",
      ],
      advancedReleaseDetails:
        "Advanced release details: this connector release candidate remains review-only and does not request OAuth, request connector authorization, call connector APIs, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, read emails, read calendar events, read contacts, sync connector data, store tokens, display secrets, display private connector values, send connector data to providers, ingest connector evidence, promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, send notifications, create reminders, schedule tasks, create automations, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorReleaseCandidate({
      idHint: "blocked-unapproved-live-access",
      releaseDecision: "blocked",
      releaseCandidateIdentity:
        "Release candidate identity: connector-release-candidate-blocked-unapproved-live-access.",
      coveredConnectorSurfaces: [
        "Covered connector surface: blocked connector workspace scope.",
        "Covered connector surface: blocked evidence capture or redaction path.",
      ],
      gmailBoundaryReadiness:
        "Gmail boundary readiness: blocked if broad mailbox access, draft creation, or send behavior is implied.",
      calendarBoundaryReadiness:
        "Calendar boundary readiness: blocked if event reads or mutations are implied without explicit approval.",
      contactsBoundaryReadiness:
        "Contacts boundary readiness: blocked if contact reads or mutations are implied without explicit approval.",
      evidenceCaptureReadiness:
        "Evidence capture readiness: blocked if connector evidence can leave review without human approval.",
      privacyRedactionReadiness:
        "Privacy redaction readiness: blocked if private connector values, tokens, or secrets can appear in a handoff.",
      knownGaps: [
        "Known gap: live access request is not approved.",
        "Known gap: redaction handoff is incomplete.",
        "Known gap: connector data use is not review-ready.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /connector-privacy-redaction-review resolves redaction gaps before release review continues.",
      blockedReasons: [
        "Explicit connector approval missing",
        "Redaction before use missing",
        "Unreviewed connector evidence implied",
      ],
      advancedReleaseDetails:
        "Advanced release details: blocked connector release cannot imply OAuth, connector authorization, connector API calls, Google API calls, automatic email reads, automatic calendar reads, automatic contact reads, email draft or send behavior, calendar event mutation, contact mutation, token storage, secret display, provider send, notification send, reminder creation, task scheduling, automation creation, memory ingestion, memory promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, command execution, file mutation, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildConnectorReleaseCandidateBoundary(): ConnectorReleaseCandidateBoundary {
  return {
    connectorReleaseCandidateReviewOnly: true,
    connectorsRemainApprovalGated: true,
    connectorApiRequestSentFromPageAllowed: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    connectorTokenStorageAllowedFromUi: false,
    browserTokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    tokensDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    privateConnectorValuesDisplayedAllowed: false,
    connectorDataReadFromPageAllowed: false,
    connectorSyncAllowedFromUi: false,
    automaticConnectorReadsAllowed: false,
    automaticEmailReadsAllowed: false,
    automaticCalendarReadsAllowed: false,
    automaticContactReadsAllowed: false,
    emailDraftSendAllowedFromUi: false,
    calendarEventMutationAllowedFromUi: false,
    contactMutationAllowedFromUi: false,
    connectorEvidenceAutoIngestionAllowed: false,
    connectorEvidenceAutoPromotionAllowed: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    automaticProviderCallsAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptFileSourceConnectorAutoSendAllowed: false,
    notificationSendAllowedFromUi: false,
    notificationDeliveryAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeConnectorReleaseCandidate(
  model: Pick<ConnectorReleaseCandidateModel, "candidates">
): string {
  return `Connector release candidate audits ${model.candidates.length} release posture(s). Connector release candidate remains review-only, connectors remain approval-gated, and no connector API request is sent from this page.`;
}

export function buildConnectorReleaseCandidateModel(): ConnectorReleaseCandidateModel {
  const candidates = buildConnectorReleaseCandidates();
  const model: ConnectorReleaseCandidateModel = {
    title: "Connector release candidate",
    summary: "",
    candidates,
    boundary: buildConnectorReleaseCandidateBoundary(),
    releaseLanguage: [...CONNECTOR_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Connector release candidate",
      "Connector release candidate remains review-only",
      "Connectors remain approval-gated",
      "No connector API request is sent from this page",
      "Privacy redaction readiness",
      "Release decision",
      "Release candidate identity",
      "Covered connector surfaces",
      "Gmail boundary readiness",
      "Calendar boundary readiness",
      "Contacts boundary readiness",
      "Evidence capture readiness",
      "Known gaps",
      "Next recommended route",
      "Blocked reasons",
      "Advanced release details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorReleaseCandidate(model) };
}
