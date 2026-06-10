import type {
  BetaFeedbackInboxBoundary,
  BetaFeedbackInboxModel,
  BetaFeedbackInboxReview,
} from "./beta-feedback-inbox-types";
import { buildBetaFeedbackInboxStableKey } from "./beta-feedback-inbox-types";

export const BETA_FEEDBACK_INBOX_LANGUAGE = [
  "Beta feedback inbox",
  "Beta feedback inbox does not ingest external feedback automatically",
  "Feedback is reviewed before becoming issues",
  "Private feedback details stay redacted until approved",
  "Feedback groups",
  "Issue triage route",
] as const;

export function buildBetaFeedbackInboxReview(
  input: Omit<BetaFeedbackInboxReview, "id"> & { idHint: string }
): BetaFeedbackInboxReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaFeedbackInboxStableKey("beta-feedback-inbox", idHint, input.status),
    ...review,
  };
}

export function buildBetaFeedbackInboxReviews(): BetaFeedbackInboxReview[] {
  return [
    buildBetaFeedbackInboxReview({
      idHint: "reviewed-categories",
      status: "ready-for-review",
      feedbackInboxIdentity: "Feedback inbox identity: beta-feedback-inbox-reviewed-categories.",
      feedbackGroups: [
        "Feedback groups: onboarding clarity, smoke stability confidence, approval friction, privacy confidence, secrets handling, cockpit navigation, and beta blocker reporting.",
        "Feedback groups: supplied feedback remains summarized until an operator approves deeper details.",
      ],
      severityConfidenceSummary: [
        "Severity and confidence summary: severity is reviewed as low, medium, high, or blocked before routing.",
        "Severity and confidence summary: confidence remains qualitative until evidence is reviewed by an operator.",
      ],
      privacyRedactionStatus: [
        "Privacy/redaction status: private feedback details stay redacted until approved.",
        "Privacy/redaction status: participant names, project paths, secrets, connector details, prompt text, and private logs are not shown by default.",
      ],
      linkedBetaTrialScope: [
        "Linked beta trial scope: /beta-trial-intake-review defines the approved participant and scope rules.",
        "Linked beta trial scope: feedback is tied to a reviewed beta scope before it becomes any issue candidate.",
      ],
      issueTriageRoute:
        "Issue triage route: /review-inbox is the review handoff before feedback becomes issue work.",
      blockedFeedbackItems: [
        "Blocked feedback items: private details without approval, external feedback that has not been reviewed, duplicate reports without evidence, or requests to create issues automatically.",
        "Blocked feedback items: any request to fetch connector, web, provider, or local files for feedback stays blocked.",
      ],
      nextRecommendedAction:
        "Next recommended action: review feedback categories, redact private details, then route approved summaries to /review-inbox.",
      advancedFeedbackDetails:
        "Advanced feedback details: beta feedback inbox is review-only. Beta feedback inbox does not ingest external feedback automatically, feedback is reviewed before becoming issues, private feedback details stay redacted until approved, and this page does not fetch feedback, call connectors, call web/search APIs, call provider APIs, call local bridge endpoints, create issues, ingest feedback, collect participant data, send invites, publish releases, run tests, run builds, run smoke checks, run the full smoke suite, execute workflows, approve actions automatically, launch local tools, send prompt/file/project/connector/feedback data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaFeedbackInboxReview({
      idHint: "blocked-private-details",
      status: "blocked",
      feedbackInboxIdentity: "Feedback inbox identity: beta-feedback-inbox-blocked-private-details.",
      feedbackGroups: [
        "Feedback groups: blocked private details cannot move forward until redaction and approval are complete.",
      ],
      severityConfidenceSummary: [
        "Severity and confidence summary: severity remains unknown when evidence is private or unapproved.",
      ],
      privacyRedactionStatus: [
        "Privacy/redaction status: private feedback details stay redacted until approved.",
      ],
      linkedBetaTrialScope: [
        "Linked beta trial scope: scope is blocked if the feedback source is outside the approved trial intake.",
      ],
      issueTriageRoute:
        "Issue triage route: /review-inbox receives only approved summaries, not raw private feedback.",
      blockedFeedbackItems: [
        "Blocked feedback items: unredacted private feedback, raw external feedback, and issue creation requests stay blocked.",
      ],
      nextRecommendedAction:
        "Next recommended action: keep feedback blocked until an operator approves redaction and triage scope.",
      advancedFeedbackDetails:
        "Advanced feedback details: blocked feedback cannot recover by fetching external data, ingesting raw feedback, creating issues, reading files, calling connectors, calling providers, writing files, or promoting memory from this page.",
    }),
  ];
}

export function buildBetaFeedbackInboxBoundary(): BetaFeedbackInboxBoundary {
  return {
    betaFeedbackInboxReviewOnly: true,
    betaFeedbackInboxDoesNotIngestExternalFeedbackAutomatically: true,
    feedbackIsReviewedBeforeBecomingIssues: true,
    privateFeedbackDetailsStayRedactedUntilApproved: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    promptFileProjectConnectorFeedbackDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    fullSmokeSuiteExecutionFromUiAllowed: false,
    releasePublishAllowedFromUi: false,
    inviteSendingAllowedFromUi: false,
    participantDataCollectionAllowedFromUi: false,
    externalFeedbackFetchAllowedFromUi: false,
    feedbackIngestionAllowedFromUi: false,
    issueCreationAllowedFromUi: false,
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
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeBetaFeedbackInbox(model: Pick<BetaFeedbackInboxModel, "reviews">): string {
  return `Beta feedback inbox prepares ${model.reviews.length} feedback review posture(s). Beta feedback inbox does not ingest external feedback automatically, feedback is reviewed before becoming issues, and private feedback details stay redacted until approved.`;
}

export function buildBetaFeedbackInboxModel(): BetaFeedbackInboxModel {
  const reviews = buildBetaFeedbackInboxReviews();
  const model: BetaFeedbackInboxModel = {
    title: "Beta feedback inbox",
    summary: "",
    reviews,
    boundary: buildBetaFeedbackInboxBoundary(),
    feedbackLanguage: [...BETA_FEEDBACK_INBOX_LANGUAGE],
    advancedDetails: [
      "Beta feedback inbox",
      "Feedback inbox identity",
      "Feedback groups",
      "Severity and confidence summary",
      "Privacy/redaction status",
      "Linked beta trial scope",
      "Issue triage route",
      "Blocked feedback items",
      "Next recommended action",
      "Beta feedback inbox does not ingest external feedback automatically",
      "Feedback is reviewed before becoming issues",
      "Private feedback details stay redacted until approved",
      "advanced feedback details collapsed/secondary",
      "no prompt/file/project data sending without approval",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaFeedbackInbox(model) };
}
