import type {
  BetaIssueTriageReview,
  BetaIssueTriageReviewBoundary,
  BetaIssueTriageReviewModel,
} from "./beta-issue-triage-review-types";
import { buildBetaIssueTriageReviewStableKey } from "./beta-issue-triage-review-types";

export const BETA_ISSUE_TRIAGE_REVIEW_LANGUAGE = [
  "Beta issue triage review",
  "Issue triage does not create tickets automatically",
  "Issue candidates require operator approval",
  "Private feedback details stay redacted until approved",
  "Issue candidate groups",
  "Fix priority route",
] as const;

export function buildBetaIssueTriageReview(
  input: Omit<BetaIssueTriageReview, "id"> & { idHint: string }
): BetaIssueTriageReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaIssueTriageReviewStableKey("beta-issue-triage-review", idHint, input.status),
    ...review,
  };
}

export function buildBetaIssueTriageReviews(): BetaIssueTriageReview[] {
  return [
    buildBetaIssueTriageReview({
      idHint: "feedback-derived-candidates",
      status: "ready-for-review",
      issueTriageIdentity: "Beta issue triage identity: beta-issue-triage-review-feedback-derived-candidates.",
      sourceFeedbackInbox:
        "Source feedback inbox: /beta-feedback-inbox supplies reviewed feedback categories only, not raw private reports.",
      issueCandidateGroups: [
        "Issue candidate groups: onboarding confusion, approval wording friction, smoke confidence questions, redaction clarity, navigation gaps, and blocked beta report handling.",
        "Issue candidate groups: candidates remain grouped summaries until an operator approves ticket creation elsewhere.",
      ],
      severityConfidenceSummary: [
        "Severity/confidence summary: likely high severity for blocked onboarding or privacy issues, medium for unclear workflow handoffs, low for polish-only wording.",
        "Severity/confidence summary: confidence stays qualitative until evidence is reviewed and private details are approved.",
      ],
      privacyRedactionStatus: [
        "Privacy/redaction status: private feedback details stay redacted until approved.",
        "Privacy/redaction status: participant names, project paths, secrets, connector details, prompts, logs, and screenshots remain summarized or hidden.",
      ],
      duplicateRelatedIssueNotes: [
        "Duplicate/related issue notes: repeated navigation and approval wording reports should be grouped before any ticket is requested.",
        "Duplicate/related issue notes: related smoke stability reports must link back to the reviewed smoke evidence, not raw logs.",
      ],
      blockedIssueCandidates: [
        "Blocked issue candidates: unredacted feedback, unclear source scope, duplicate reports without evidence, and any request to create tickets automatically.",
        "Blocked issue candidates: any candidate that needs GitHub, connector, provider, web, local bridge, local file, shell, or git access from this page stays blocked.",
      ],
      fixPriorityRoute:
        "Fix priority route: /beta-fix-priority-matrix reviews fix order after issue candidates receive operator approval.",
      nextRecommendedAction:
        "Next recommended action: review candidate groups, keep private details redacted, mark duplicates, and request operator approval before creating tickets outside this page.",
      advancedTriageDetails:
        "Advanced triage details: beta issue triage review is review-only. Issue triage does not create tickets automatically, issue candidates require operator approval, private feedback details stay redacted until approved, and this page does not create issues, create tickets, call GitHub APIs, fetch external feedback, ingest feedback, apply fixes, replay regressions, publish release notes, export files, call providers, call connectors, call web/search APIs, call local bridge endpoints, launch local tools, send prompt/file/project/connector/feedback data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, execute workflows, approve actions automatically, create commits, mutate files, write files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaIssueTriageReview({
      idHint: "blocked-private-ticket-request",
      status: "blocked",
      issueTriageIdentity: "Beta issue triage identity: beta-issue-triage-review-blocked-private-ticket-request.",
      sourceFeedbackInbox:
        "Source feedback inbox: /beta-feedback-inbox shows a blocked private feedback summary that cannot become a ticket from this page.",
      issueCandidateGroups: [
        "Issue candidate groups: blocked private report, unclear duplicate status, and missing approval evidence.",
      ],
      severityConfidenceSummary: [
        "Severity/confidence summary: severity and confidence remain blocked while private details are unapproved.",
      ],
      privacyRedactionStatus: [
        "Privacy/redaction status: private feedback details stay redacted until approved.",
      ],
      duplicateRelatedIssueNotes: [
        "Duplicate/related issue notes: duplicate status cannot be confirmed by fetching external tickets from this page.",
      ],
      blockedIssueCandidates: [
        "Blocked issue candidates: ticket creation request without operator approval.",
        "Blocked issue candidates: unredacted private detail request remains blocked.",
      ],
      fixPriorityRoute:
        "Fix priority route: /beta-fix-priority-matrix remains a review-only handoff and does not apply fixes.",
      nextRecommendedAction:
        "Next recommended action: keep the candidate blocked until redaction, source scope, duplicate review, and operator approval are complete.",
      advancedTriageDetails:
        "Advanced triage details: blocked issue candidates cannot recover by calling GitHub, creating tickets, reading local files, fetching connector data, applying fixes, or promoting memory from this page.",
    }),
  ];
}

export function buildBetaIssueTriageReviewBoundary(): BetaIssueTriageReviewBoundary {
  return {
    betaIssueTriageReviewOnly: true,
    issueTriageDoesNotCreateTicketsAutomatically: true,
    issueCandidatesRequireOperatorApproval: true,
    privateFeedbackDetailsStayRedactedUntilApproved: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
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
    issueCreationAllowedFromUi: false,
    ticketCreationAllowedFromUi: false,
    externalFeedbackFetchAllowedFromUi: false,
    feedbackIngestionAllowedFromUi: false,
    fixApplicationAllowedFromUi: false,
    commitCreationAllowedFromUi: false,
    regressionReplayExecutionAllowedFromUi: false,
    releaseNotesPublishAllowedFromUi: false,
    releaseNotesExportAllowedFromUi: false,
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

export function summarizeBetaIssueTriageReview(
  model: Pick<BetaIssueTriageReviewModel, "reviews">
): string {
  return `Beta issue triage review prepares ${model.reviews.length} feedback-derived issue candidate group(s). Issue triage does not create tickets automatically, issue candidates require operator approval, and private feedback details stay redacted until approved.`;
}

export function buildBetaIssueTriageReviewModel(): BetaIssueTriageReviewModel {
  const reviews = buildBetaIssueTriageReviews();
  const model: BetaIssueTriageReviewModel = {
    title: "Beta issue triage review",
    summary: "",
    reviews,
    boundary: buildBetaIssueTriageReviewBoundary(),
    triageLanguage: [...BETA_ISSUE_TRIAGE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Beta issue triage review",
      "Beta issue triage identity",
      "Source feedback inbox",
      "Issue candidate groups",
      "Severity/confidence summary",
      "Privacy/redaction status",
      "Duplicate/related issue notes",
      "Blocked issue candidates",
      "Fix priority route",
      "Next recommended action",
      "Issue triage does not create tickets automatically",
      "Issue candidates require operator approval",
      "Private feedback details stay redacted until approved",
      "advanced triage details collapsed/secondary",
      "no prompt/file/project data sending without approval",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaIssueTriageReview(model) };
}
