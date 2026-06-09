import type {
  ConnectorPrivacyRedactionReview,
  ConnectorPrivacyRedactionReviewBoundary,
  ConnectorPrivacyRedactionReviewModel,
} from "./connector-privacy-redaction-review-types";
import { buildConnectorPrivacyRedactionReviewStableKey } from "./connector-privacy-redaction-review-types";

export const CONNECTOR_PRIVACY_REDACTION_REVIEW_LANGUAGE = [
  "Connector privacy redaction review",
  "Redaction happens before connector evidence leaves review",
  "Private connector values are not displayed",
  "Secrets and tokens are excluded",
  "Allowed evidence fields",
  "Excluded evidence fields",
] as const;

export function buildConnectorPrivacyRedactionReview(
  input: Omit<ConnectorPrivacyRedactionReview, "id"> & { idHint: string }
): ConnectorPrivacyRedactionReview {
  const { idHint, ...review } = input;
  return {
    id: buildConnectorPrivacyRedactionReviewStableKey(
      "connector-privacy-redaction-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildConnectorPrivacyRedactionReviews(): ConnectorPrivacyRedactionReview[] {
  return [
    buildConnectorPrivacyRedactionReview({
      idHint: "minimized-evidence-handoff",
      status: "ready for handoff",
      redactionReviewIdentity:
        "Redaction review identity: connector-privacy-redaction-review-minimized-evidence-handoff.",
      sourceConnectorEvidenceCapture:
        "Source connector evidence capture: /connector-evidence-capture-review provides the review-only packet before redaction.",
      detectedPrivateFields: [
        "Detected private field: email body or snippet class without value.",
        "Detected private field: calendar attendee or location class without value.",
        "Detected private field: contact address or phone class without value.",
      ],
      redactionPolicy: [
        "Redaction policy: replace private connector values with field class labels before evidence leaves review.",
        "Redaction policy: secrets and tokens are excluded.",
        "Redaction policy: private connector values are not displayed.",
      ],
      minimizationPolicy: [
        "Minimization policy: keep connector name, approved purpose, evidence type, and reviewer note only when needed.",
        "Minimization policy: exclude raw values that are not necessary for the review handoff.",
        "Minimization policy: keep memory promotion separate and never automatic.",
      ],
      allowedEvidenceFields: [
        "Allowed evidence fields: connector name.",
        "Allowed evidence fields: approved boundary reference.",
        "Allowed evidence fields: reviewer-written non-secret summary.",
        "Allowed evidence fields: redaction status.",
      ],
      excludedEvidenceFields: [
        "Excluded evidence fields: raw email text, private event text, and private contact values.",
        "Excluded evidence fields: OAuth token, refresh token, session token, API key, password, and secret.",
        "Excluded evidence fields: raw connector identifiers that can reveal private accounts or relationships.",
      ],
      reviewHandoffRoute:
        "Review handoff route: /connector-release-candidate audits readiness after privacy redaction review.",
      blockedReasons: [
        "Redaction happens before connector evidence leaves review",
        "Private connector values are not displayed",
        "Secrets and tokens are excluded",
      ],
      advancedRedactionDetails:
        "Advanced redaction details: this connector privacy redaction review does not display private connector values, store tokens, include secrets, call connector APIs, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, request OAuth, request connector authorization, mutate evidence automatically, read emails, read calendar events, read contacts, sync connector data, send connector data to providers, ingest memory, promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, send notifications, create reminders, schedule tasks, create automations, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorPrivacyRedactionReview({
      idHint: "blocked-unminimized-values",
      status: "blocked",
      redactionReviewIdentity:
        "Redaction review identity: connector-privacy-redaction-review-blocked-unminimized-values.",
      sourceConnectorEvidenceCapture:
        "Source connector evidence capture: blocked until /connector-evidence-capture-review provides a non-secret packet summary.",
      detectedPrivateFields: [
        "Detected private field: unresolved raw message class.",
        "Detected private field: unresolved private event class.",
        "Detected private field: unresolved private contact class.",
      ],
      redactionPolicy: [
        "Redaction policy: blocked until private field classes are replaced with safe labels.",
        "Redaction policy: blocked until secrets and tokens are excluded.",
      ],
      minimizationPolicy: [
        "Minimization policy: blocked until unnecessary connector fields are removed.",
        "Minimization policy: blocked until review handoff contains only the minimum safe context.",
      ],
      allowedEvidenceFields: [
        "Allowed evidence fields: safe route reference.",
        "Allowed evidence fields: blocked reason summary.",
      ],
      excludedEvidenceFields: [
        "Excluded evidence fields: unresolved private connector value.",
        "Excluded evidence fields: token, secret, password, or raw account identifier.",
      ],
      reviewHandoffRoute:
        "Review handoff route: /connector-release-candidate remains blocked until redaction and minimization are complete.",
      blockedReasons: [
        "Unredacted private connector field",
        "Minimization policy missing",
        "Review handoff not safe",
      ],
      advancedRedactionDetails:
        "Advanced redaction details: blocked redaction review cannot imply private value display, token storage, secret display, connector API calls, Google API calls, evidence mutation, provider send, notification send, reminder creation, task scheduling, automation creation, memory ingestion, memory promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, command execution, file mutation, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildConnectorPrivacyRedactionReviewBoundary(): ConnectorPrivacyRedactionReviewBoundary {
  return {
    connectorPrivacyRedactionReviewOnly: true,
    redactionBeforeConnectorEvidenceLeavesReview: true,
    privateConnectorValuesDisplayedAllowed: false,
    secretsAndTokensIncludedAllowed: false,
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
    tokensDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    connectorDataReadFromPageAllowed: false,
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

export function summarizeConnectorPrivacyRedactionReview(
  model: Pick<ConnectorPrivacyRedactionReviewModel, "reviews">
): string {
  return `Connector privacy redaction review prepares ${model.reviews.length} redaction posture(s). Redaction happens before connector evidence leaves review, private connector values are not displayed, and secrets and tokens are excluded.`;
}

export function buildConnectorPrivacyRedactionReviewModel(): ConnectorPrivacyRedactionReviewModel {
  const reviews = buildConnectorPrivacyRedactionReviews();
  const model: ConnectorPrivacyRedactionReviewModel = {
    title: "Connector privacy redaction review",
    summary: "",
    reviews,
    boundary: buildConnectorPrivacyRedactionReviewBoundary(),
    redactionLanguage: [...CONNECTOR_PRIVACY_REDACTION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Connector privacy redaction review",
      "Redaction happens before connector evidence leaves review",
      "Private connector values are not displayed",
      "Secrets and tokens are excluded",
      "Allowed evidence fields",
      "Excluded evidence fields",
      "Redaction review identity",
      "Source connector evidence capture",
      "Detected private fields",
      "Redaction policy",
      "Minimization policy",
      "Review handoff route",
      "Blocked reasons",
      "Advanced redaction details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorPrivacyRedactionReview(model) };
}
