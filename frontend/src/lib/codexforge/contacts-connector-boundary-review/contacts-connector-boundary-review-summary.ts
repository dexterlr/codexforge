import type {
  ContactsConnectorBoundaryReview,
  ContactsConnectorBoundaryReviewBoundary,
  ContactsConnectorBoundaryReviewModel,
} from "./contacts-connector-boundary-review-types";
import { buildContactsConnectorBoundaryReviewStableKey } from "./contacts-connector-boundary-review-types";

export const CONTACTS_CONNECTOR_BOUNDARY_REVIEW_LANGUAGE = [
  "Contacts connector boundary review",
  "Contacts access requires explicit approval",
  "No contact is read created updated or deleted from this page",
  "Contact tokens and private contact details are not displayed",
  "Requested contacts scope summary",
  "Contact mutation approval requirement",
] as const;

export function buildContactsConnectorBoundaryReview(
  input: Omit<ContactsConnectorBoundaryReview, "id"> & { idHint: string }
): ContactsConnectorBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildContactsConnectorBoundaryReviewStableKey(
      "contacts-connector-boundary-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildContactsConnectorBoundaryReviews(): ContactsConnectorBoundaryReview[] {
  return [
    buildContactsConnectorBoundaryReview({
      idHint: "review-only-contacts-scope",
      status: "review required",
      boundaryIdentity: "Boundary identity: contacts-connector-boundary-review-narrow-approved-scope.",
      sourceConnectorWorkspace:
        "Source connector workspace: /connector-workspace defines connector planning before any Contacts data is requested.",
      requestedContactsScopeSummary:
        "Requested contacts scope summary: future reviewed Contacts work may ask for narrow lookup metadata or named contact details only after explicit approval.",
      allowedContactsActions: [
        "Allowed Contacts action: describe the future lookup purpose in plain English.",
        "Allowed Contacts action: review proposed contact lookup or read scope before access.",
        "Allowed Contacts action: prepare a non-secret evidence note route for later human review.",
      ],
      deniedContactsActions: [
        "Denied Contacts action: no contact is read created updated or deleted from this page.",
        "Denied Contacts action: no contact name, email, phone number, address, organization, relationship note, or private detail is displayed.",
        "Denied Contacts action: no contact is created, updated, merged, deleted, labeled, or exported.",
      ],
      contactPrivacyPolicy: [
        "Contact privacy policy: hide contact tokens, contact identifiers, private contact details, relationship notes, phone numbers, addresses, and contact groups.",
        "Contact privacy policy: redact personal contact context before any connector evidence can be reviewed.",
        "Contact privacy policy: connector evidence is reviewed before use and is not promoted to memory automatically.",
      ],
      contactMutationApprovalRequirement:
        "Contact mutation approval requirement: any future contact create, update, merge, delete, label, or export action requires a separate explicit approval step outside this page.",
      evidenceCaptureRoute:
        "Evidence capture route: /research-evidence-inbox can review a future non-secret Contacts evidence note before use.",
      blockedReasons: [
        "Contacts access requires explicit approval",
        "No contact is read created updated or deleted from this page",
        "Contact tokens and private contact details are not displayed",
      ],
      advancedContactsDetails:
        "Advanced Contacts details: this Contacts connector boundary review does not request OAuth, request Contacts authorization, call Contacts APIs, call Google APIs, read contacts, create contacts, update contacts, delete contacts, store tokens, display contact tokens, display private contact details, sync connector data, send connector data to providers, ingest connector evidence, promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildContactsConnectorBoundaryReview({
      idHint: "blocked-broad-contacts-access",
      status: "blocked",
      boundaryIdentity: "Boundary identity: contacts-connector-boundary-review-blocked-broad-contacts-access.",
      sourceConnectorWorkspace:
        "Source connector workspace: blocked until /connector-workspace has a narrow connector goal and approval checklist.",
      requestedContactsScopeSummary:
        "Requested contacts scope summary: blocked when the request asks for broad address book access, automatic contact reading, contact creation, contact updates, contact deletion, or export.",
      allowedContactsActions: [
        "Allowed Contacts action: refine the scope into a reviewable request.",
        "Allowed Contacts action: move back to /connector-workspace for connector planning.",
      ],
      deniedContactsActions: [
        "Denied Contacts action: no broad contact read.",
        "Denied Contacts action: no automatic contact lookup.",
        "Denied Contacts action: no contact mutation behavior.",
      ],
      contactPrivacyPolicy: [
        "Contact privacy policy: blocked until token handling and private contact redaction are explicit.",
        "Contact privacy policy: blocked until private contact details stay out of the page.",
      ],
      contactMutationApprovalRequirement:
        "Contact mutation approval requirement: blocked until create, update, merge, delete, label, or export intent is separated from lookup intent and explicitly approved.",
      evidenceCaptureRoute:
        "Evidence capture route: blocked Contacts evidence cannot be captured, ingested, or promoted automatically.",
      blockedReasons: [
        "Broad Contacts scope requested",
        "Contact mutation approval missing",
        "Contact privacy policy missing",
      ],
      advancedContactsDetails:
        "Advanced Contacts details: blocked Contacts requests cannot imply OAuth, authorization, Contacts API calls, Google API calls, contact reads, contact creation, contact updates, contact deletion, token storage, private contact display, connector sync, provider send, memory ingestion, memory promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, command execution, file mutation, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildContactsConnectorBoundaryReviewBoundary(): ContactsConnectorBoundaryReviewBoundary {
  return {
    contactsBoundaryReviewOnly: true,
    contactsAccessRequiresExplicitApproval: true,
    contactReadCreateUpdateDeleteFromPageAllowed: false,
    contactsApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    contactsAuthorizationAllowedFromUi: false,
    contactTokenStorageAllowedFromUi: false,
    privateContactDetailsDisplayedAllowed: false,
    contactTokensDisplayedAllowed: false,
    automaticContactReadsAllowed: false,
    contactCreateAllowedFromUi: false,
    contactUpdateAllowedFromUi: false,
    contactDeleteAllowedFromUi: false,
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

export function summarizeContactsConnectorBoundaryReview(
  model: Pick<ContactsConnectorBoundaryReviewModel, "reviews">
): string {
  return `Contacts connector boundary review prepares ${model.reviews.length} Contacts boundary posture(s). Contacts access requires explicit approval, no contact is read created updated or deleted from this page, and contact tokens and private contact details are not displayed.`;
}

export function buildContactsConnectorBoundaryReviewModel(): ContactsConnectorBoundaryReviewModel {
  const reviews = buildContactsConnectorBoundaryReviews();
  const model: ContactsConnectorBoundaryReviewModel = {
    title: "Contacts connector boundary review",
    summary: "",
    reviews,
    boundary: buildContactsConnectorBoundaryReviewBoundary(),
    boundaryLanguage: [...CONTACTS_CONNECTOR_BOUNDARY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Contacts connector boundary review",
      "Contacts access requires explicit approval",
      "No contact is read created updated or deleted from this page",
      "Contact tokens and private contact details are not displayed",
      "Requested contacts scope summary",
      "Contact mutation approval requirement",
      "Connector evidence is reviewed before use",
      "Boundary identity",
      "Source connector workspace",
      "Allowed Contacts actions",
      "Denied Contacts actions",
      "Contact privacy policy",
      "Evidence capture route",
      "Blocked reasons",
      "Advanced Contacts details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeContactsConnectorBoundaryReview(model) };
}
