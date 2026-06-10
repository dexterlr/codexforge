import type {
  BetaRegressionReplayReview,
  BetaRegressionReplayReviewBoundary,
  BetaRegressionReplayReviewModel,
} from "./beta-regression-replay-review-types";
import { buildBetaRegressionReplayReviewStableKey } from "./beta-regression-replay-review-types";

export const BETA_REGRESSION_REPLAY_REVIEW_LANGUAGE = [
  "Beta regression replay review",
  "Regression replay review does not run tests or workflows",
  "Replay plans require operator approval",
  "Unresolved regressions stay blocked",
  "Replay plan groups",
  "Expected validation evidence",
] as const;

export function buildBetaRegressionReplayReview(
  input: Omit<BetaRegressionReplayReview, "id"> & { idHint: string }
): BetaRegressionReplayReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaRegressionReplayReviewStableKey("beta-regression-replay-review", idHint, input.status),
    ...review,
  };
}

export function buildBetaRegressionReplayReviews(): BetaRegressionReplayReview[] {
  return [
    buildBetaRegressionReplayReview({
      idHint: "approved-priority-replay-plan",
      status: "ready-for-review",
      regressionReplayIdentity:
        "Regression replay identity: beta-regression-replay-review-approved-priority-replay-plan.",
      sourceFixPriorityMatrix:
        "Source fix priority matrix: /beta-fix-priority-matrix supplies approved fix order and validation requirements only.",
      replayPlanGroups: [
        "Replay plan groups: approval wording, privacy redaction, smoke stability copy, beta route visibility, and duplicate issue grouping.",
        "Replay plan groups: plans describe what an operator should validate later; this page does not run the replay.",
      ],
      expectedValidationEvidence: [
        "Expected validation evidence: reviewed build status, reviewed smoke output, manual route check notes, and operator approval notes.",
        "Expected validation evidence: evidence stays descriptive until supplied by an operator outside this page.",
      ],
      blockedReplayCases: [
        "Blocked replay cases: unresolved regressions stay blocked.",
        "Blocked replay cases: missing approval, unclear expected evidence, privacy risk, or requests to run tests and workflows from this page.",
      ],
      smokeBuildManualValidationNotes: [
        "Smoke/build/manual validation notes: smoke, build, and manual checks are listed for review only.",
        "Smoke/build/manual validation notes: this page does not run tests, builds, smoke checks, shell commands, git commands, or workflows.",
      ],
      releaseNotesRoute:
        "Release notes route: /beta-release-notes-draft-review reviews draft notes after replay evidence is reviewed.",
      nextRecommendedAction:
        "Next recommended action: review replay plan groups, confirm expected evidence, and keep unresolved regressions blocked until an operator approves validation outside this page.",
      advancedReplayDetails:
        "Advanced regression replay details: beta regression replay review is review-only. Regression replay review does not run tests or workflows, replay plans require operator approval, unresolved regressions stay blocked, and this page does not execute workflows, run shell commands, run git commands, run tests, run builds, run smoke checks, replay regressions, apply fixes, apply patches, mutate files, write files, create commits, create issues, create tickets, call GitHub APIs, call providers, call connectors, call web/search APIs, call local bridge endpoints, fetch external feedback, ingest feedback, launch local tools, send prompt/file/project/connector/feedback data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, approve actions automatically, publish release notes, export files, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaRegressionReplayReview({
      idHint: "blocked-unresolved-regression",
      status: "blocked",
      regressionReplayIdentity:
        "Regression replay identity: beta-regression-replay-review-blocked-unresolved-regression.",
      sourceFixPriorityMatrix:
        "Source fix priority matrix: /beta-fix-priority-matrix marks the fix as blocked until regression risk is understood.",
      replayPlanGroups: [
        "Replay plan groups: blocked regression case and missing evidence expectations.",
      ],
      expectedValidationEvidence: [
        "Expected validation evidence: missing evidence keeps the replay plan blocked.",
      ],
      blockedReplayCases: [
        "Blocked replay cases: unresolved regressions stay blocked.",
        "Blocked replay cases: no replay plan may run from this page.",
      ],
      smokeBuildManualValidationNotes: [
        "Smoke/build/manual validation notes: operator-provided evidence is required before release-note drafting.",
      ],
      releaseNotesRoute:
        "Release notes route: /beta-release-notes-draft-review remains review-only and does not publish notes.",
      nextRecommendedAction:
        "Next recommended action: keep the regression blocked until evidence expectations and replay approval are clear.",
      advancedReplayDetails:
        "Advanced regression replay details: blocked replay cases cannot recover by running tests, workflows, shell commands, git commands, file writes, or memory promotion from this page.",
    }),
  ];
}

export function buildBetaRegressionReplayReviewBoundary(): BetaRegressionReplayReviewBoundary {
  return {
    betaRegressionReplayReviewOnly: true,
    regressionReplayReviewDoesNotRunTestsOrWorkflows: true,
    replayPlansRequireOperatorApproval: true,
    unresolvedRegressionsStayBlocked: true,
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

export function summarizeBetaRegressionReplayReview(
  model: Pick<BetaRegressionReplayReviewModel, "reviews">
): string {
  return `Beta regression replay review prepares ${model.reviews.length} replay plan review posture(s). Regression replay review does not run tests or workflows, replay plans require operator approval, and unresolved regressions stay blocked.`;
}

export function buildBetaRegressionReplayReviewModel(): BetaRegressionReplayReviewModel {
  const reviews = buildBetaRegressionReplayReviews();
  const model: BetaRegressionReplayReviewModel = {
    title: "Beta regression replay review",
    summary: "",
    reviews,
    boundary: buildBetaRegressionReplayReviewBoundary(),
    replayLanguage: [...BETA_REGRESSION_REPLAY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Beta regression replay review",
      "Regression replay identity",
      "Source fix priority matrix",
      "Replay plan groups",
      "Expected validation evidence",
      "Blocked replay cases",
      "Smoke/build/manual validation notes",
      "Release notes route",
      "Next recommended action",
      "Regression replay review does not run tests or workflows",
      "Replay plans require operator approval",
      "Unresolved regressions stay blocked",
      "advanced regression replay details collapsed/secondary",
      "no prompt/file/project data sending without approval",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaRegressionReplayReview(model) };
}
