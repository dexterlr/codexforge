import type {
  BetaFixPriorityMatrixBoundary,
  BetaFixPriorityMatrixModel,
  BetaFixPriorityMatrixReview,
} from "./beta-fix-priority-matrix-types";
import { buildBetaFixPriorityMatrixStableKey } from "./beta-fix-priority-matrix-types";

export const BETA_FIX_PRIORITY_MATRIX_LANGUAGE = [
  "Beta fix priority matrix",
  "Fix priority matrix does not apply fixes",
  "Fixes require explicit operator approval",
  "Validation evidence is required before merge release",
  "Fix buckets",
  "Regression replay route",
] as const;

export function buildBetaFixPriorityMatrixReview(
  input: Omit<BetaFixPriorityMatrixReview, "id"> & { idHint: string }
): BetaFixPriorityMatrixReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaFixPriorityMatrixStableKey("beta-fix-priority-matrix", idHint, input.status),
    ...review,
  };
}

export function buildBetaFixPriorityMatrixReviews(): BetaFixPriorityMatrixReview[] {
  return [
    buildBetaFixPriorityMatrixReview({
      idHint: "approved-candidate-priority",
      status: "ready-for-review",
      fixPriorityIdentity: "Fix priority identity: beta-fix-priority-matrix-approved-candidate-priority.",
      sourceIssueTriageReview:
        "Source issue triage review: /beta-issue-triage-review supplies operator-approved issue candidate summaries only.",
      fixBuckets: [
        "Fix buckets: privacy or redaction blockers first, onboarding clarity second, smoke evidence clarity third, navigation polish fourth.",
        "Fix buckets: low-risk copy polish waits behind safety, privacy, regression, and validation blockers.",
      ],
      userImpactSummary: [
        "User impact summary: beta operators need clear approval language and safe next actions before broader trial use.",
        "User impact summary: unclear issue routing can hide privacy blockers or duplicate reports.",
      ],
      safetyRegressionRisk: [
        "Safety/regression risk: high when a proposed fix touches approval language, privacy wording, smoke status, route coverage, or validation expectations.",
        "Safety/regression risk: low-risk copy changes still need evidence before merge release decisions.",
      ],
      validationRequired: [
        "Validation required: validation evidence is required before merge release decisions.",
        "Validation required: evidence should include reviewed smoke output, build status, manual notes, and operator sign-off where applicable.",
      ],
      blockedFixes: [
        "Blocked fixes: unapproved issue candidates, unclear privacy impact, missing validation evidence, or any request to apply fixes from this page.",
        "Blocked fixes: any fix needing file mutation, patch application, git, shell, workflow, provider, connector, web, GitHub, or local bridge access from this page stays blocked.",
      ],
      regressionReplayRoute:
        "Regression replay route: /beta-regression-replay-review reviews replay plans after fix priority receives operator approval.",
      nextRecommendedAction:
        "Next recommended action: review fix buckets, confirm validation requirements, and request explicit operator approval before any implementation happens outside this page.",
      advancedPriorityDetails:
        "Advanced priority details: beta fix priority matrix is review-only. Fix priority matrix does not apply fixes, fixes require explicit operator approval, validation evidence is required before merge release, and this page does not apply patches, mutate files, create commits, run tests, run builds, run smoke checks, execute workflows, replay regressions, create issues, create tickets, call GitHub APIs, call providers, call connectors, call web/search APIs, call local bridge endpoints, fetch external feedback, ingest feedback, launch local tools, send prompt/file/project/connector/feedback data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, approve actions automatically, publish release notes, export files, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaFixPriorityMatrixReview({
      idHint: "blocked-validation-gap",
      status: "blocked",
      fixPriorityIdentity: "Fix priority identity: beta-fix-priority-matrix-blocked-validation-gap.",
      sourceIssueTriageReview:
        "Source issue triage review: /beta-issue-triage-review marks the candidate as blocked until validation expectations are known.",
      fixBuckets: [
        "Fix buckets: blocked validation evidence gap and unclear regression risk.",
      ],
      userImpactSummary: [
        "User impact summary: impact cannot be trusted until the candidate scope and validation evidence are approved.",
      ],
      safetyRegressionRisk: [
        "Safety/regression risk: unknown risk remains blocked rather than auto-prioritized.",
      ],
      validationRequired: [
        "Validation required: validation evidence is required before merge release decisions.",
      ],
      blockedFixes: [
        "Blocked fixes: missing validation evidence, missing operator approval, and requests to apply fixes from this page.",
      ],
      regressionReplayRoute:
        "Regression replay route: /beta-regression-replay-review remains review-only and does not run tests or workflows.",
      nextRecommendedAction:
        "Next recommended action: keep the fix blocked until evidence requirements and approval are clear.",
      advancedPriorityDetails:
        "Advanced priority details: blocked fixes cannot recover by applying patches, writing files, creating commits, running tests, or calling external services from this page.",
    }),
  ];
}

export function buildBetaFixPriorityMatrixBoundary(): BetaFixPriorityMatrixBoundary {
  return {
    betaFixPriorityMatrixReviewOnly: true,
    fixPriorityMatrixDoesNotApplyFixes: true,
    fixesRequireExplicitOperatorApproval: true,
    validationEvidenceIsRequiredBeforeMergeRelease: true,
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

export function summarizeBetaFixPriorityMatrix(
  model: Pick<BetaFixPriorityMatrixModel, "reviews">
): string {
  return `Beta fix priority matrix prepares ${model.reviews.length} fix priority review posture(s). Fix priority matrix does not apply fixes, fixes require explicit operator approval, and validation evidence is required before merge release decisions.`;
}

export function buildBetaFixPriorityMatrixModel(): BetaFixPriorityMatrixModel {
  const reviews = buildBetaFixPriorityMatrixReviews();
  const model: BetaFixPriorityMatrixModel = {
    title: "Beta fix priority matrix",
    summary: "",
    reviews,
    boundary: buildBetaFixPriorityMatrixBoundary(),
    priorityLanguage: [...BETA_FIX_PRIORITY_MATRIX_LANGUAGE],
    advancedDetails: [
      "Beta fix priority matrix",
      "Fix priority identity",
      "Source issue triage review",
      "Fix buckets",
      "User impact summary",
      "Safety/regression risk",
      "Validation required",
      "Blocked fixes",
      "Regression replay route",
      "Next recommended action",
      "Fix priority matrix does not apply fixes",
      "Fixes require explicit operator approval",
      "Validation evidence is required before merge release",
      "advanced priority details collapsed/secondary",
      "no prompt/file/project data sending without approval",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaFixPriorityMatrix(model) };
}
