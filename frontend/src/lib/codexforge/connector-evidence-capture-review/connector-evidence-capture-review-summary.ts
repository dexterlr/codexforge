import type {
  ConnectorEvidenceCaptureReview,
  ConnectorEvidenceCaptureReviewBoundary,
  ConnectorEvidenceCaptureReviewModel,
} from "./connector-evidence-capture-review-types";
import { buildConnectorEvidenceCaptureReviewStableKey } from "./connector-evidence-capture-review-types";

export const CONNECTOR_EVIDENCE_CAPTURE_REVIEW_LANGUAGE = [
  "Connector evidence capture review",
  "Connector evidence is reviewed before use",
  "No connector data is captured from this page",
  "Connector data is not auto-promoted to memory",
  "Evidence packet summary",
  "Redaction route",
] as const;

export function buildConnectorEvidenceCaptureReview(
  input: Omit<ConnectorEvidenceCaptureReview, "id"> & { idHint: string }
): ConnectorEvidenceCaptureReview {
  const { idHint, ...review } = input;
  return {
    id: buildConnectorEvidenceCaptureReviewStableKey(
      "connector-evidence-capture-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildConnectorEvidenceCaptureReviews(): ConnectorEvidenceCaptureReview[] {
  return [
    buildConnectorEvidenceCaptureReview({
      idHint: "reviewable-connector-evidence-packet",
      status: "ready for redaction",
      evidenceCaptureIdentity:
        "Evidence capture identity: connector-evidence-capture-review-reviewable-packet.",
      sourceConnectorWorkspace:
        "Source connector workspace: /connector-workspace defines the connector purpose before any evidence packet can be reviewed.",
      approvedConnectorBoundaryDependency:
        "Approved connector boundary dependency: Gmail, Calendar, or Contacts boundary review must be complete before any future connector evidence packet is considered.",
      captureSourceSummary:
        "Capture source summary: future approved connector output is represented as a short non-secret summary for human review only.",
      evidencePacketSummary:
        "Evidence packet summary: reviewer-visible notes may include connector name, approval scope, non-secret source label, evidence type, and redaction status.",
      allowedEvidenceTypes: [
        "Allowed evidence type: connector name and approved purpose.",
        "Allowed evidence type: non-secret timestamp label supplied by a reviewer.",
        "Allowed evidence type: reviewer-written summary that avoids private connector values.",
      ],
      deniedEvidenceTypes: [
        "Denied evidence type: raw email body, full calendar event detail, or private contact value.",
        "Denied evidence type: OAuth token, refresh token, session token, API key, password, or secret.",
        "Denied evidence type: automatically captured connector data, synced mailbox data, synced calendar data, or synced contact data.",
      ],
      redactionRoute:
        "Redaction route: /connector-privacy-redaction-review reviews private fields before connector evidence leaves review.",
      releaseCandidateRoute:
        "Release candidate route: /connector-release-candidate audits the review-only connector loop after redaction review.",
      blockedReasons: [
        "Connector evidence is reviewed before use",
        "No connector data is captured from this page",
        "Connector data is not auto-promoted to memory",
      ],
      advancedEvidenceDetails:
        "Advanced evidence details: this connector evidence capture review does not request OAuth, request connector authorization, call connector APIs, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, read emails, read calendar events, read contacts, sync connector data, capture connector data, mutate evidence, display private connector values, store tokens, display secrets, send connector data to providers, ingest memory, promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, send notifications, create reminders, schedule tasks, create automations, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorEvidenceCaptureReview({
      idHint: "blocked-unredacted-raw-data",
      status: "blocked",
      evidenceCaptureIdentity:
        "Evidence capture identity: connector-evidence-capture-review-blocked-unredacted-raw-data.",
      sourceConnectorWorkspace:
        "Source connector workspace: blocked until /connector-workspace confirms the connector purpose, scope, and approval checkpoint.",
      approvedConnectorBoundaryDependency:
        "Approved connector boundary dependency: blocked until the matching connector boundary explicitly denies raw private values and automatic reads.",
      captureSourceSummary:
        "Capture source summary: blocked when a packet depends on raw connector content, automatic reading, or unsanitized private fields.",
      evidencePacketSummary:
        "Evidence packet summary: blocked packets stay out of review use until they are minimized and routed through redaction.",
      allowedEvidenceTypes: [
        "Allowed evidence type: blocked-scope note with no private connector value.",
        "Allowed evidence type: review handoff route.",
      ],
      deniedEvidenceTypes: [
        "Denied evidence type: raw mailbox, event, or contact content.",
        "Denied evidence type: token, secret, or private connector identifier.",
        "Denied evidence type: automatically ingested memory candidate.",
      ],
      redactionRoute:
        "Redaction route: blocked packet must go to /connector-privacy-redaction-review before any evidence leaves review.",
      releaseCandidateRoute:
        "Release candidate route: /connector-release-candidate stays blocked until evidence capture and redaction are review-ready.",
      blockedReasons: [
        "Raw connector value requested",
        "Redaction review missing",
        "Automatic capture or memory promotion implied",
      ],
      advancedEvidenceDetails:
        "Advanced evidence details: blocked connector evidence cannot imply OAuth, connector authorization, connector API calls, Google API calls, automatic email reads, automatic calendar reads, automatic contact reads, evidence mutation, token storage, secret display, provider send, notification send, reminder creation, task scheduling, automation creation, memory ingestion, memory promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, command execution, file mutation, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildConnectorEvidenceCaptureReviewBoundary(): ConnectorEvidenceCaptureReviewBoundary {
  return {
    connectorEvidenceCaptureReviewOnly: true,
    connectorEvidenceReviewedBeforeUse: true,
    connectorDataCapturedFromPageAllowed: false,
    connectorDataReadFromPageAllowed: false,
    connectorApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorTokenStorageAllowedFromUi: false,
    browserTokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    privateConnectorValuesDisplayedAllowed: false,
    tokensDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    connectorSyncAllowedFromUi: false,
    automaticConnectorReadsAllowed: false,
    automaticEmailReadsAllowed: false,
    automaticCalendarReadsAllowed: false,
    automaticContactReadsAllowed: false,
    emailDraftSendAllowedFromUi: false,
    calendarEventMutationAllowedFromUi: false,
    contactMutationAllowedFromUi: false,
    connectorEvidenceMutationAllowedFromUi: false,
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

export function summarizeConnectorEvidenceCaptureReview(
  model: Pick<ConnectorEvidenceCaptureReviewModel, "reviews">
): string {
  return `Connector evidence capture review prepares ${model.reviews.length} evidence capture posture(s). Connector evidence is reviewed before use, no connector data is captured from this page, and connector data is not auto-promoted to memory.`;
}

export function buildConnectorEvidenceCaptureReviewModel(): ConnectorEvidenceCaptureReviewModel {
  const reviews = buildConnectorEvidenceCaptureReviews();
  const model: ConnectorEvidenceCaptureReviewModel = {
    title: "Connector evidence capture review",
    summary: "",
    reviews,
    boundary: buildConnectorEvidenceCaptureReviewBoundary(),
    captureLanguage: [...CONNECTOR_EVIDENCE_CAPTURE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Connector evidence capture review",
      "Connector evidence is reviewed before use",
      "No connector data is captured from this page",
      "Connector data is not auto-promoted to memory",
      "Evidence packet summary",
      "Redaction route",
      "Evidence capture identity",
      "Source connector workspace",
      "Approved connector boundary dependency",
      "Capture source summary",
      "Allowed evidence types",
      "Denied evidence types",
      "Release candidate route",
      "Blocked reasons",
      "Advanced evidence details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorEvidenceCaptureReview(model) };
}
