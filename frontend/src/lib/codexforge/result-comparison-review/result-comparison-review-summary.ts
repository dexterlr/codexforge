import type {
  ResultComparisonReview,
  ResultComparisonReviewBoundary,
  ResultComparisonReviewModel,
} from "./result-comparison-review-types";
import { buildResultComparisonReviewStableKey } from "./result-comparison-review-types";

export const RESULT_COMPARISON_REVIEW_LANGUAGE = [
  "Result comparison review",
  "Result comparison does not rerun workflows",
  "Comparisons are reviewed before use",
  "Historical results remain read-only",
  "Compared result groups",
  "Validation evidence comparison",
] as const;

export function buildResultComparisonReview(
  input: Omit<ResultComparisonReview, "id"> & { idHint: string }
): ResultComparisonReview {
  const { idHint, ...comparison } = input;
  return {
    id: buildResultComparisonReviewStableKey("result-comparison-review", idHint, input.status),
    ...comparison,
  };
}

export function buildResultComparisonReviews(): ResultComparisonReview[] {
  return [
    buildResultComparisonReview({
      idHint: "read-only-cross-loop-results",
      status: "ready-for-review",
      resultComparisonIdentity:
        "Result comparison identity: result-comparison-review-read-only-cross-loop-results.",
      comparedResultGroups: [
        "Compared result groups: coding validation, provider trial result, connector review result, creative artifact review, project knowledge release candidate, and beta regression replay review.",
        "Compared result groups: summaries are already reviewed historical records; the page does not replay results or rerun workflows.",
      ],
      qualitySafetyComparison: [
        "Quality/safety comparison: safety blockers, failed validation, privacy risk, and unresolved approval items rank above convenience wins.",
        "Quality/safety comparison: a result with unclear approval evidence stays behind a review gate even if quality notes look positive.",
      ],
      validationEvidenceComparison: [
        "Validation evidence comparison: reviewed validation notes are compared as static summaries.",
        "Validation evidence comparison: missing validation evidence is treated as a blocked comparison, not a reason to run tests or rerun workflows.",
      ],
      regressionNotes: [
        "Regression notes: beta regression replay review remains a reviewed input and no replay happens from this page.",
        "Regression notes: a historical regression can link to recovery review, but recovery is not executed here.",
      ],
      blockedComparisons: [
        "Blocked comparisons: any request to rerun workflows, replay results, call providers, call connectors, scan files, write files, or promote memory remains blocked.",
        "Blocked comparisons: private, unreviewed, or redacted evidence cannot be used until the operator approves its summary elsewhere.",
      ],
      evidenceTimelineRoute:
        "Evidence timeline route: /cross-loop-evidence-timeline reviews chronology without fetching external data.",
      unifiedSearchCandidateRoute:
        "Unified search candidate route: /unified-workspace-search-release-candidate reviews search readiness without live search.",
      nextRecommendedAction:
        "Next recommended action: review blocked comparisons and open the evidence timeline before considering the unified search candidate.",
      advancedComparisonDetails:
        "Advanced comparison details: result comparison review is review-only. Result comparison does not rerun workflows, comparisons are reviewed before use, and historical results remain read-only. It does not execute actions, approve actions, automate approval, run workflows, rerun workflows, replay results, run live search, persist search queries, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/search/evidence data without approval, scan projects, browse local files, crawl paths, read or open arbitrary local files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildResultComparisonReview({
      idHint: "blocked-live-rerun-request",
      status: "blocked",
      resultComparisonIdentity:
        "Result comparison identity: result-comparison-review-blocked-live-rerun-request.",
      comparedResultGroups: [
        "Compared result groups: blocked request attempted to compare by rerunning workflows.",
      ],
      qualitySafetyComparison: [
        "Quality/safety comparison: blocked because result comparison does not rerun workflows.",
      ],
      validationEvidenceComparison: [
        "Validation evidence comparison: blocked until reviewed validation evidence exists as a static summary.",
      ],
      regressionNotes: [
        "Regression notes: replay and rerun requests remain blocked.",
      ],
      blockedComparisons: [
        "Blocked comparisons: live rerun, provider call, connector call, local bridge call, project scan, file read, and memory mutation are denied.",
      ],
      evidenceTimelineRoute:
        "Evidence timeline route: /cross-loop-evidence-timeline keeps chronology review separate from execution.",
      unifiedSearchCandidateRoute:
        "Unified search candidate route: /unified-workspace-search-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: collect reviewed result summaries instead of asking this page to rerun work.",
      advancedComparisonDetails:
        "Advanced comparison details: blocked comparisons cannot recover by running workflows, replaying results, scanning files, calling APIs, writing files, ingesting evidence, or promoting memory from this page.",
    }),
  ];
}

export function buildResultComparisonReviewBoundary(): ResultComparisonReviewBoundary {
  return {
    resultComparisonReviewOnly: true,
    resultComparisonDoesNotRerunWorkflows: true,
    comparisonsAreReviewedBeforeUse: true,
    historicalResultsRemainReadOnly: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowRerunAllowedFromUi: false,
    resultReplayAllowedFromUi: false,
    liveSearchExecutionAllowedFromUi: false,
    searchQueryPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorSearchEvidenceDataAutoSendAllowed: false,
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
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
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

export function summarizeResultComparisonReview(
  model: Pick<ResultComparisonReviewModel, "comparisons">
): string {
  return `Result comparison review prepares ${model.comparisons.length} comparison posture(s). Result comparison does not rerun workflows, comparisons are reviewed before use, and historical results remain read-only.`;
}

export function buildResultComparisonReviewModel(): ResultComparisonReviewModel {
  const comparisons = buildResultComparisonReviews();
  const model: ResultComparisonReviewModel = {
    title: "Result comparison review",
    summary: "",
    comparisons,
    boundary: buildResultComparisonReviewBoundary(),
    comparisonLanguage: [...RESULT_COMPARISON_REVIEW_LANGUAGE],
    advancedDetails: [
      "Result comparison review",
      "Result comparison identity",
      "Compared result groups",
      "Quality/safety comparison",
      "Validation evidence comparison",
      "Regression notes",
      "Blocked comparisons",
      "Evidence timeline route",
      "Unified search candidate route",
      "Next recommended action",
      "Result comparison does not rerun workflows",
      "Comparisons are reviewed before use",
      "Historical results remain read-only",
      "advanced comparison details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResultComparisonReview(model) };
}
