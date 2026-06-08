import type {
  GmailConnectorBoundaryReview,
  GmailConnectorBoundaryReviewBoundary,
  GmailConnectorBoundaryReviewModel,
} from "./gmail-connector-boundary-review-types";
import { buildGmailConnectorBoundaryReviewStableKey } from "./gmail-connector-boundary-review-types";

export const GMAIL_CONNECTOR_BOUNDARY_REVIEW_LANGUAGE = [
  "Gmail connector boundary review",
  "Gmail access requires explicit approval",
  "No email is read drafted or sent from this page",
  "Gmail tokens and message contents are not displayed",
  "Requested Gmail scope summary",
  "Draft send approval requirement",
] as const;

export function buildGmailConnectorBoundaryReview(
  input: Omit<GmailConnectorBoundaryReview, "id"> & { idHint: string }
): GmailConnectorBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildGmailConnectorBoundaryReviewStableKey("gmail-connector-boundary-review", idHint, input.status),
    ...review,
  };
}

export function buildGmailConnectorBoundaryReviews(): GmailConnectorBoundaryReview[] {
  return [
    buildGmailConnectorBoundaryReview({
      idHint: "review-only-gmail-scope",
      status: "review required",
      boundaryIdentity: "Boundary identity: gmail-connector-boundary-review-narrow-approved-scope.",
      sourceConnectorWorkspace:
        "Source connector workspace: /connector-workspace defines connector planning before any Gmail data is requested.",
      requestedGmailScopeSummary:
        "Requested Gmail scope summary: future reviewed Gmail work may ask for narrow search metadata or named message excerpts only after explicit approval.",
      allowedGmailActions: [
        "Allowed Gmail action: describe the future request purpose in plain English.",
        "Allowed Gmail action: review proposed search/read scope before access.",
        "Allowed Gmail action: prepare a non-secret evidence note route for later human review.",
      ],
      deniedGmailActions: [
        "Denied Gmail action: no email is read drafted or sent from this page.",
        "Denied Gmail action: no draft is created, updated, sent, scheduled, or deleted.",
        "Denied Gmail action: no mailbox search, label read, attachment read, or thread read runs automatically.",
      ],
      privacyRedactionPolicy: [
        "Privacy/redaction policy: hide Gmail tokens, refresh tokens, message contents, recipients, attachments, labels, thread IDs, and private signatures.",
        "Privacy/redaction policy: redact personal data before any connector evidence can be reviewed.",
        "Privacy/redaction policy: connector evidence is reviewed before use and is not promoted to memory automatically.",
      ],
      draftSendApprovalRequirement:
        "Draft send approval requirement: any future draft or send action requires a separate explicit approval step outside this page.",
      evidenceCaptureRoute:
        "Evidence capture route: /research-evidence-inbox can review a future non-secret Gmail evidence note before use.",
      blockedReasons: [
        "Gmail access requires explicit approval",
        "No email is read drafted or sent from this page",
        "Gmail tokens and message contents are not displayed",
      ],
      advancedGmailDetails:
        "Advanced Gmail details: this Gmail connector boundary review does not request OAuth, request Gmail authorization, call Gmail APIs, call Google APIs, read emails, search mailboxes, read attachments, create drafts, send emails, store tokens, display Gmail tokens, display message contents, sync connector data, send connector data to providers, ingest connector evidence, promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildGmailConnectorBoundaryReview({
      idHint: "blocked-broad-mailbox-access",
      status: "blocked",
      boundaryIdentity: "Boundary identity: gmail-connector-boundary-review-blocked-broad-mailbox-access.",
      sourceConnectorWorkspace:
        "Source connector workspace: blocked until /connector-workspace has a narrow connector goal and approval checklist.",
      requestedGmailScopeSummary:
        "Requested Gmail scope summary: blocked when the request asks for broad mailbox access, automatic reading, draft creation, or sending.",
      allowedGmailActions: [
        "Allowed Gmail action: refine the scope into a reviewable request.",
        "Allowed Gmail action: move back to /connector-workspace for connector planning.",
      ],
      deniedGmailActions: [
        "Denied Gmail action: no broad mailbox read.",
        "Denied Gmail action: no automatic email read.",
        "Denied Gmail action: no draft or send behavior.",
      ],
      privacyRedactionPolicy: [
        "Privacy/redaction policy: blocked until token handling and message redaction are explicit.",
        "Privacy/redaction policy: blocked until private message contents stay out of the page.",
      ],
      draftSendApprovalRequirement:
        "Draft send approval requirement: blocked until draft and send intent is separated from read/search intent and explicitly approved.",
      evidenceCaptureRoute:
        "Evidence capture route: blocked Gmail evidence cannot be captured, ingested, or promoted automatically.",
      blockedReasons: [
        "Broad Gmail scope requested",
        "Draft or send approval missing",
        "Message redaction policy missing",
      ],
      advancedGmailDetails:
        "Advanced Gmail details: blocked Gmail requests cannot imply OAuth, authorization, Gmail API calls, Google API calls, email reads, mailbox search, draft creation, email sending, token storage, message display, connector sync, provider send, memory ingestion, memory promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, command execution, file mutation, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildGmailConnectorBoundaryReviewBoundary(): GmailConnectorBoundaryReviewBoundary {
  return {
    gmailBoundaryReviewOnly: true,
    gmailAccessRequiresExplicitApproval: true,
    emailReadDraftSendFromPageAllowed: false,
    gmailApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    gmailAuthorizationAllowedFromUi: false,
    gmailTokenStorageAllowedFromUi: false,
    messageContentsDisplayedAllowed: false,
    gmailTokensDisplayedAllowed: false,
    automaticEmailReadsAllowed: false,
    emailDraftCreationAllowedFromUi: false,
    emailSendAllowedFromUi: false,
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

export function summarizeGmailConnectorBoundaryReview(
  model: Pick<GmailConnectorBoundaryReviewModel, "reviews">
): string {
  return `Gmail connector boundary review prepares ${model.reviews.length} Gmail boundary posture(s). Gmail access requires explicit approval, no email is read drafted or sent from this page, and Gmail tokens and message contents are not displayed.`;
}

export function buildGmailConnectorBoundaryReviewModel(): GmailConnectorBoundaryReviewModel {
  const reviews = buildGmailConnectorBoundaryReviews();
  const model: GmailConnectorBoundaryReviewModel = {
    title: "Gmail connector boundary review",
    summary: "",
    reviews,
    boundary: buildGmailConnectorBoundaryReviewBoundary(),
    boundaryLanguage: [...GMAIL_CONNECTOR_BOUNDARY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Gmail connector boundary review",
      "Gmail access requires explicit approval",
      "No email is read drafted or sent from this page",
      "Gmail tokens and message contents are not displayed",
      "Requested Gmail scope summary",
      "Draft send approval requirement",
      "Connector evidence is reviewed before use",
      "Boundary identity",
      "Source connector workspace",
      "Allowed Gmail actions",
      "Denied Gmail actions",
      "Privacy/redaction policy",
      "Evidence capture route",
      "Blocked reasons",
      "Advanced Gmail details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeGmailConnectorBoundaryReview(model) };
}
