import type {
  ResultHistoryConsolidation,
  ResultHistoryConsolidationBoundary,
  ResultHistoryConsolidationModel,
} from "./result-history-consolidation-types";
import { buildResultHistoryConsolidationStableKey } from "./result-history-consolidation-types";

export const RESULT_HISTORY_CONSOLIDATION_LANGUAGE = [
  "Result history consolidation",
  "Result history is read-only from this page",
  "Historical results are not replayed automatically",
  "Memory promotion requires explicit review",
  "Result groups by loop",
  "Failure recovery notes",
] as const;

export function buildResultHistoryConsolidation(
  input: Omit<ResultHistoryConsolidation, "id"> & { idHint: string }
): ResultHistoryConsolidation {
  const { idHint, ...history } = input;
  return {
    id: buildResultHistoryConsolidationStableKey("result-history-consolidation", idHint, input.status),
    ...history,
  };
}

export function buildResultHistoryConsolidations(): ResultHistoryConsolidation[] {
  return [
    buildResultHistoryConsolidation({
      idHint: "read-only-cross-loop-outcomes",
      status: "ready-for-review",
      resultHistoryIdentity:
        "Result history identity: result-history-consolidation-read-only-cross-loop-outcomes.",
      resultGroupsByLoop: [
        "Result groups by loop: coding validation, provider trial, connector review, automation review, creative artifact, research evidence, project knowledge, and cross-loop handoff.",
        "Result groups by loop: each group is historical context only and cannot replay actions from this page.",
      ],
      validationOutcomes: [
        "Validation outcomes: passed, warning, failed, blocked, and needs evidence outcomes are summarized without running tests or checks.",
        "Validation outcomes: missing evidence sends the operator back to review rather than execution.",
      ],
      failureRecoveryNotes: [
        "Failure recovery notes: failed outcomes link to recovery review and do not retry automatically.",
        "Failure recovery notes: blocked outcomes stay blocked when approval, privacy, local file, provider, connector, automation, or memory gates are unresolved.",
      ],
      safetyAuditSummary: [
        "Safety audit summary: result history is read-only from this page.",
        "Safety audit summary: historical results are not replayed automatically.",
        "Safety audit summary: memory promotion requires explicit review.",
      ],
      linkedReviewItems: [
        "Linked review items: /global-review-inbox consolidates unresolved review items without approving them.",
        "Linked review items: /approval-queue reviews manual approvals without granting approval.",
      ],
      dailyHomeRoute:
        "Daily home route: /daily-operator-home summarizes what to review next.",
      globalInboxRoute:
        "Global inbox route: /global-review-inbox triages unresolved review items.",
      nextRecommendedAction:
        "Next recommended action: review failed or blocked historical outcomes before considering any new approval path.",
      advancedHistoryDetails:
        "Advanced history details: result history consolidation is read-only and does not replay actions, execute workflows, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, send prompt/file/project/connector data without approval, scan arbitrary local projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildResultHistoryConsolidation({
      idHint: "blocked-replay-request",
      status: "blocked",
      resultHistoryIdentity:
        "Result history identity: result-history-consolidation-blocked-replay-request.",
      resultGroupsByLoop: [
        "Result groups by loop: blocked replay request.",
      ],
      validationOutcomes: [
        "Validation outcomes: blocked because the page was asked to rerun or replay historical results.",
      ],
      failureRecoveryNotes: [
        "Failure recovery notes: historical results are not replayed automatically.",
      ],
      safetyAuditSummary: [
        "Safety audit summary: result history remains read-only from this page.",
      ],
      linkedReviewItems: [
        "Linked review items: send the item to /global-review-inbox for review-only triage.",
      ],
      dailyHomeRoute:
        "Daily home route: /daily-operator-home shows the blocked work summary.",
      globalInboxRoute:
        "Global inbox route: /global-review-inbox keeps replay requests in review.",
      nextRecommendedAction:
        "Next recommended action: keep the replay request blocked and request explicit review evidence instead.",
      advancedHistoryDetails:
        "Advanced history details: blocked result history items cannot recover by replaying actions, running workflows, calling APIs, writing files, or promoting memory from this page.",
    }),
  ];
}

export function buildResultHistoryConsolidationBoundary(): ResultHistoryConsolidationBoundary {
  return {
    resultHistoryReviewOnly: true,
    resultHistoryIsReadOnlyFromThisPage: true,
    historicalResultsAreNotReplayedAutomatically: true,
    memoryPromotionRequiresExplicitReview: true,
    actionsReplayedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowReplayAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeResultHistoryConsolidation(
  model: Pick<ResultHistoryConsolidationModel, "histories">
): string {
  return `Result history consolidation prepares ${model.histories.length} result history posture(s). Result history is read-only from this page, historical results are not replayed automatically, and memory promotion requires explicit review.`;
}

export function buildResultHistoryConsolidationModel(): ResultHistoryConsolidationModel {
  const histories = buildResultHistoryConsolidations();
  const model: ResultHistoryConsolidationModel = {
    title: "Result history consolidation",
    summary: "",
    histories,
    boundary: buildResultHistoryConsolidationBoundary(),
    historyLanguage: [...RESULT_HISTORY_CONSOLIDATION_LANGUAGE],
    advancedDetails: [
      "Result history consolidation",
      "Result history identity",
      "Result groups by loop",
      "Validation outcomes",
      "Failure recovery notes",
      "Safety audit summary",
      "Linked review items",
      "Daily home route",
      "Global inbox route",
      "Next recommended action",
      "Result history is read-only from this page",
      "Historical results are not replayed automatically",
      "Memory promotion requires explicit review",
      "advanced history details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResultHistoryConsolidation(model) };
}

