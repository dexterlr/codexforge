import type {
  BetaReleaseNotesDraftReview,
  BetaReleaseNotesDraftReviewBoundary,
  BetaReleaseNotesDraftReviewModel,
} from "./beta-release-notes-draft-review-types";
import { buildBetaReleaseNotesDraftReviewStableKey } from "./beta-release-notes-draft-review-types";

export const BETA_RELEASE_NOTES_DRAFT_REVIEW_LANGUAGE = [
  "Beta release notes draft review",
  "Release notes draft is not published from this page",
  "Release notes require operator approval before use",
  "Private details stay redacted",
  "Summary sections",
  "Known issues",
] as const;

export function buildBetaReleaseNotesDraftReview(
  input: Omit<BetaReleaseNotesDraftReview, "id"> & { idHint: string }
): BetaReleaseNotesDraftReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaReleaseNotesDraftReviewStableKey("beta-release-notes-draft-review", idHint, input.status),
    ...review,
  };
}

export function buildBetaReleaseNotesDraftReviews(): BetaReleaseNotesDraftReview[] {
  return [
    buildBetaReleaseNotesDraftReview({
      idHint: "reviewed-beta-draft",
      status: "ready-for-review",
      releaseNotesDraftIdentity:
        "Release notes draft identity: beta-release-notes-draft-review-reviewed-beta-draft.",
      sourceRegressionReplayReview:
        "Source regression replay review: /beta-regression-replay-review supplies reviewed replay evidence expectations only.",
      summarySections: [
        "Summary sections: beta readiness, review-only issue triage, fix priority posture, regression replay evidence, validation notes, and privacy reminders.",
        "Summary sections: release-note text remains a draft until an operator approves it outside this page.",
      ],
      knownIssues: [
        "Known issues: unresolved regressions stay blocked and should be listed without private details.",
        "Known issues: missing validation evidence, unapproved issue candidates, and redaction gaps must remain visible as blocked.",
      ],
      safetyNotes: [
        "Safety notes: release notes draft is not published from this page.",
        "Safety notes: private details stay redacted and release notes require operator approval before use.",
      ],
      validationNotes: [
        "Validation notes: reviewed smoke, build, manual route checks, and operator evidence should be summarized without raw private logs.",
        "Validation notes: missing validation evidence keeps the relevant release-note section blocked.",
      ],
      blockedReleaseNotes: [
        "Blocked release notes: private details without approval, unresolved regressions, missing validation evidence, and any request to publish or export from this page.",
        "Blocked release notes: any draft requiring provider, connector, web, GitHub, local bridge, local file, shell, git, workflow, or memory access from this page stays blocked.",
      ],
      dailyOnboardingRoute:
        "Daily onboarding route: /daily-operator-home is the plain-English follow-up route for operator review.",
      nextRecommendedAction:
        "Next recommended action: review draft sections, keep private details redacted, and request operator approval before using release-note text outside this page.",
      advancedReleaseNotesDetails:
        "Advanced release notes details: beta release notes draft review is review-only. Release notes draft is not published from this page, release notes require operator approval before use, private details stay redacted, and this page does not publish release notes, export files, write files, mutate files, create commits, apply patches, apply fixes, run tests, run builds, run smoke checks, execute workflows, replay regressions, create issues, create tickets, call GitHub APIs, call providers, call connectors, call web/search APIs, call local bridge endpoints, fetch external feedback, ingest feedback, launch local tools, send prompt/file/project/connector/feedback data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, approve actions automatically, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaReleaseNotesDraftReview({
      idHint: "blocked-private-known-issue",
      status: "blocked",
      releaseNotesDraftIdentity:
        "Release notes draft identity: beta-release-notes-draft-review-blocked-private-known-issue.",
      sourceRegressionReplayReview:
        "Source regression replay review: /beta-regression-replay-review marks the regression as unresolved.",
      summarySections: [
        "Summary sections: blocked private known issue cannot move into usable release notes yet.",
      ],
      knownIssues: [
        "Known issues: private detail remains redacted and unresolved regression stays blocked.",
      ],
      safetyNotes: [
        "Safety notes: release notes draft is not published from this page.",
        "Safety notes: private details stay redacted.",
      ],
      validationNotes: [
        "Validation notes: missing operator evidence keeps the draft blocked.",
      ],
      blockedReleaseNotes: [
        "Blocked release notes: private known issue, missing validation evidence, and missing operator approval.",
      ],
      dailyOnboardingRoute:
        "Daily onboarding route: /daily-operator-home remains available for review guidance only.",
      nextRecommendedAction:
        "Next recommended action: keep release-note text blocked until redaction and validation evidence are approved.",
      advancedReleaseNotesDetails:
        "Advanced release notes details: blocked release notes cannot recover by publishing, exporting, writing files, reading files, calling external services, running workflows, or promoting memory from this page.",
    }),
  ];
}

export function buildBetaReleaseNotesDraftReviewBoundary(): BetaReleaseNotesDraftReviewBoundary {
  return {
    betaReleaseNotesDraftReviewOnly: true,
    releaseNotesDraftIsNotPublishedFromThisPage: true,
    releaseNotesRequireOperatorApprovalBeforeUse: true,
    privateDetailsStayRedacted: true,
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

export function summarizeBetaReleaseNotesDraftReview(
  model: Pick<BetaReleaseNotesDraftReviewModel, "reviews">
): string {
  return `Beta release notes draft review prepares ${model.reviews.length} draft release-note review posture(s). Release notes draft is not published from this page, release notes require operator approval before use, and private details stay redacted.`;
}

export function buildBetaReleaseNotesDraftReviewModel(): BetaReleaseNotesDraftReviewModel {
  const reviews = buildBetaReleaseNotesDraftReviews();
  const model: BetaReleaseNotesDraftReviewModel = {
    title: "Beta release notes draft review",
    summary: "",
    reviews,
    boundary: buildBetaReleaseNotesDraftReviewBoundary(),
    releaseNotesLanguage: [...BETA_RELEASE_NOTES_DRAFT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Beta release notes draft review",
      "Release notes draft identity",
      "Source regression replay review",
      "Summary sections",
      "Known issues",
      "Safety notes",
      "Validation notes",
      "Blocked release notes",
      "Daily onboarding route",
      "Next recommended action",
      "Release notes draft is not published from this page",
      "Release notes require operator approval before use",
      "Private details stay redacted",
      "advanced release notes details collapsed/secondary",
      "no prompt/file/project data sending without approval",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaReleaseNotesDraftReview(model) };
}
