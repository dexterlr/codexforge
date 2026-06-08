import type {
  CalendarConnectorBoundaryReview,
  CalendarConnectorBoundaryReviewBoundary,
  CalendarConnectorBoundaryReviewModel,
} from "./calendar-connector-boundary-review-types";
import { buildCalendarConnectorBoundaryReviewStableKey } from "./calendar-connector-boundary-review-types";

export const CALENDAR_CONNECTOR_BOUNDARY_REVIEW_LANGUAGE = [
  "Calendar connector boundary review",
  "Calendar access requires explicit approval",
  "No calendar event is read created updated or deleted from this page",
  "Calendar tokens and private event details are not displayed",
  "Requested calendar scope summary",
  "Event mutation approval requirement",
] as const;

export function buildCalendarConnectorBoundaryReview(
  input: Omit<CalendarConnectorBoundaryReview, "id"> & { idHint: string }
): CalendarConnectorBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildCalendarConnectorBoundaryReviewStableKey(
      "calendar-connector-boundary-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildCalendarConnectorBoundaryReviews(): CalendarConnectorBoundaryReview[] {
  return [
    buildCalendarConnectorBoundaryReview({
      idHint: "review-only-calendar-scope",
      status: "review required",
      boundaryIdentity: "Boundary identity: calendar-connector-boundary-review-narrow-approved-scope.",
      sourceConnectorWorkspace:
        "Source connector workspace: /connector-workspace defines connector planning before any Calendar data is requested.",
      requestedCalendarScopeSummary:
        "Requested calendar scope summary: future reviewed Calendar work may ask for narrow availability or named event details only after explicit approval.",
      allowedCalendarActions: [
        "Allowed Calendar action: describe the future calendar purpose in plain English.",
        "Allowed Calendar action: review proposed availability or event scope before access.",
        "Allowed Calendar action: prepare a non-secret evidence note route for later human review.",
      ],
      deniedCalendarActions: [
        "Denied Calendar action: no calendar event is read created updated or deleted from this page.",
        "Denied Calendar action: no attendee list, conference link, location, note, or private event detail is displayed.",
        "Denied Calendar action: no calendar event is created, updated, deleted, accepted, declined, or moved.",
      ],
      attendeePrivacyPolicy: [
        "Attendee/privacy policy: hide Calendar tokens, attendee names, attendee emails, private event notes, locations, conference links, and calendar IDs.",
        "Attendee/privacy policy: redact personal scheduling context before any connector evidence can be reviewed.",
        "Attendee/privacy policy: connector evidence is reviewed before use and is not promoted to memory automatically.",
      ],
      eventMutationApprovalRequirement:
        "Event mutation approval requirement: any future event create, update, delete, RSVP, or move action requires a separate explicit approval step outside this page.",
      evidenceCaptureRoute:
        "Evidence capture route: /research-evidence-inbox can review a future non-secret Calendar evidence note before use.",
      blockedReasons: [
        "Calendar access requires explicit approval",
        "No calendar event is read created updated or deleted from this page",
        "Calendar tokens and private event details are not displayed",
      ],
      advancedCalendarDetails:
        "Advanced Calendar details: this Calendar connector boundary review does not request OAuth, request Calendar authorization, call Calendar APIs, call Google APIs, read calendar events, create events, update events, delete events, store tokens, display Calendar tokens, display private event details, sync connector data, send connector data to providers, ingest connector evidence, promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildCalendarConnectorBoundaryReview({
      idHint: "blocked-broad-calendar-access",
      status: "blocked",
      boundaryIdentity: "Boundary identity: calendar-connector-boundary-review-blocked-broad-calendar-access.",
      sourceConnectorWorkspace:
        "Source connector workspace: blocked until /connector-workspace has a narrow connector goal and approval checklist.",
      requestedCalendarScopeSummary:
        "Requested calendar scope summary: blocked when the request asks for broad calendar access, automatic event reading, event creation, event updates, or event deletion.",
      allowedCalendarActions: [
        "Allowed Calendar action: refine the scope into a reviewable request.",
        "Allowed Calendar action: move back to /connector-workspace for connector planning.",
      ],
      deniedCalendarActions: [
        "Denied Calendar action: no broad calendar read.",
        "Denied Calendar action: no automatic event read.",
        "Denied Calendar action: no event mutation behavior.",
      ],
      attendeePrivacyPolicy: [
        "Attendee/privacy policy: blocked until token handling and attendee redaction are explicit.",
        "Attendee/privacy policy: blocked until private event details stay out of the page.",
      ],
      eventMutationApprovalRequirement:
        "Event mutation approval requirement: blocked until create, update, delete, RSVP, or move intent is separated from read intent and explicitly approved.",
      evidenceCaptureRoute:
        "Evidence capture route: blocked Calendar evidence cannot be captured, ingested, or promoted automatically.",
      blockedReasons: [
        "Broad Calendar scope requested",
        "Event mutation approval missing",
        "Attendee privacy policy missing",
      ],
      advancedCalendarDetails:
        "Advanced Calendar details: blocked Calendar requests cannot imply OAuth, authorization, Calendar API calls, Google API calls, event reads, event creation, event updates, event deletion, token storage, private event display, connector sync, provider send, memory ingestion, memory promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, command execution, file mutation, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildCalendarConnectorBoundaryReviewBoundary(): CalendarConnectorBoundaryReviewBoundary {
  return {
    calendarBoundaryReviewOnly: true,
    calendarAccessRequiresExplicitApproval: true,
    calendarEventReadCreateUpdateDeleteFromPageAllowed: false,
    calendarApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    calendarAuthorizationAllowedFromUi: false,
    calendarTokenStorageAllowedFromUi: false,
    privateEventDetailsDisplayedAllowed: false,
    calendarTokensDisplayedAllowed: false,
    automaticCalendarReadsAllowed: false,
    calendarEventCreateAllowedFromUi: false,
    calendarEventUpdateAllowedFromUi: false,
    calendarEventDeleteAllowedFromUi: false,
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

export function summarizeCalendarConnectorBoundaryReview(
  model: Pick<CalendarConnectorBoundaryReviewModel, "reviews">
): string {
  return `Calendar connector boundary review prepares ${model.reviews.length} Calendar boundary posture(s). Calendar access requires explicit approval, no calendar event is read created updated or deleted from this page, and Calendar tokens and private event details are not displayed.`;
}

export function buildCalendarConnectorBoundaryReviewModel(): CalendarConnectorBoundaryReviewModel {
  const reviews = buildCalendarConnectorBoundaryReviews();
  const model: CalendarConnectorBoundaryReviewModel = {
    title: "Calendar connector boundary review",
    summary: "",
    reviews,
    boundary: buildCalendarConnectorBoundaryReviewBoundary(),
    boundaryLanguage: [...CALENDAR_CONNECTOR_BOUNDARY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Calendar connector boundary review",
      "Calendar access requires explicit approval",
      "No calendar event is read created updated or deleted from this page",
      "Calendar tokens and private event details are not displayed",
      "Requested calendar scope summary",
      "Event mutation approval requirement",
      "Connector evidence is reviewed before use",
      "Boundary identity",
      "Source connector workspace",
      "Allowed Calendar actions",
      "Denied Calendar actions",
      "Attendee/privacy policy",
      "Evidence capture route",
      "Blocked reasons",
      "Advanced Calendar details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCalendarConnectorBoundaryReview(model) };
}
