import type {
  DailyOperatorHomePolish,
  DailyOperatorHomePolishBoundary,
  DailyOperatorHomePolishModel,
} from "./daily-operator-home-polish-types";
import { buildDailyOperatorHomePolishStableKey } from "./daily-operator-home-polish-types";

export const DAILY_OPERATOR_HOME_POLISH_LANGUAGE = [
  "Daily operator home polish",
  "Daily home does not run workflows automatically",
  "All actions remain behind explicit approval gates",
  "Private details stay redacted until review",
  "Today review priorities",
  "Safety reminders",
] as const;

export function buildDailyOperatorHomePolish(
  input: Omit<DailyOperatorHomePolish, "id"> & { idHint: string }
): DailyOperatorHomePolish {
  const { idHint, ...home } = input;
  return {
    id: buildDailyOperatorHomePolishStableKey("daily-operator-home-polish", idHint, input.status),
    ...home,
  };
}

export function buildDailyOperatorHomePolishes(): DailyOperatorHomePolish[] {
  return [
    buildDailyOperatorHomePolish({
      idHint: "review-next-cockpit",
      status: "ready-for-review",
      dailyHomeIdentity:
        "Daily home identity: daily-operator-home-polish-review-next-cockpit.",
      todayReviewPriorities: [
        "Today review priorities: open the global review inbox first when unresolved cross-loop review items are present.",
        "Today review priorities: open the approval queue when a proposed action needs explicit operator approval.",
        "Today review priorities: check result history before repeating any workflow outcome review.",
      ],
      loopReadinessSummary: [
        "Loop readiness summary: coding, provider, creative, extension, research, connector, automation, and project knowledge loops remain review-only from this home.",
        "Loop readiness summary: blocked loops keep their approval, privacy, local file, provider, connector, automation, and memory boundaries visible.",
      ],
      blockedWorkSummary: [
        "Blocked work summary: any work that requests execution, file mutation, provider traffic, connector traffic, local bridge calls, or memory promotion stays blocked.",
        "Blocked work summary: private details stay redacted until review accepts the specific item.",
      ],
      approvalQueueRoute:
        "Approval queue route: /approval-queue reviews pending approval groups without granting approval.",
      globalReviewInboxRoute:
        "Global review inbox route: /global-review-inbox consolidates reviews without approving them.",
      resultHistoryRoute:
        "Result history route: /result-history reviews past outcomes without replaying them.",
      safetyReminders: [
        "Safety reminders: daily home does not run workflows automatically.",
        "Safety reminders: all actions remain behind explicit approval gates.",
        "Safety reminders: private details stay redacted until review.",
      ],
      nextRecommendedAction:
        "Next recommended action: review the global inbox, then visit the approval queue only for items that still require explicit operator approval.",
      advancedDailyHomeDetails:
        "Advanced daily home details: daily operator home polish is review-only and does not execute actions, run workflows, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, launch local tools, send prompt/file/project/connector data without approval, scan arbitrary local projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildDailyOperatorHomePolish({
      idHint: "blocked-unsafe-next-step",
      status: "blocked",
      dailyHomeIdentity:
        "Daily home identity: daily-operator-home-polish-blocked-unsafe-next-step.",
      todayReviewPriorities: [
        "Today review priorities: blocked until unsafe next-step requests are converted to review-only handoffs.",
      ],
      loopReadinessSummary: [
        "Loop readiness summary: blocked loops are not ready for daily use when approval, privacy, or execution boundaries are unclear.",
      ],
      blockedWorkSummary: [
        "Blocked work summary: blocked items stay blocked when the request implies automatic approval or action execution.",
      ],
      approvalQueueRoute:
        "Approval queue route: /approval-queue remains manual and cannot grant approval from this home.",
      globalReviewInboxRoute:
        "Global review inbox route: /global-review-inbox remains review-only and cannot execute items.",
      resultHistoryRoute:
        "Result history route: /result-history remains read-only from this page.",
      safetyReminders: [
        "Safety reminders: daily home does not run workflows automatically.",
        "Safety reminders: all actions remain behind explicit approval gates.",
      ],
      nextRecommendedAction:
        "Next recommended action: resolve the blocker in the global review inbox before opening any approval path.",
      advancedDailyHomeDetails:
        "Advanced daily home details: blocked daily home items cannot recover by executing workflows, granting approvals, calling APIs, writing files, promoting memory, creating automations, or starting background jobs.",
    }),
  ];
}

export function buildDailyOperatorHomePolishBoundary(): DailyOperatorHomePolishBoundary {
  return {
    dailyOperatorHomeReviewOnly: true,
    dailyHomeDoesNotRunWorkflowsAutomatically: true,
    allActionsRemainBehindExplicitApprovalGates: true,
    privateDetailsStayRedactedUntilReview: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    approvalAutomationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchAllowedFromUi: false,
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

export function summarizeDailyOperatorHomePolish(
  model: Pick<DailyOperatorHomePolishModel, "dailyHomes">
): string {
  return `Daily operator home polish prepares ${model.dailyHomes.length} daily operator cockpit posture(s). Daily home does not run workflows automatically, all actions remain behind explicit approval gates, and private details stay redacted until review.`;
}

export function buildDailyOperatorHomePolishModel(): DailyOperatorHomePolishModel {
  const dailyHomes = buildDailyOperatorHomePolishes();
  const model: DailyOperatorHomePolishModel = {
    title: "Daily operator home polish",
    summary: "",
    dailyHomes,
    boundary: buildDailyOperatorHomePolishBoundary(),
    dailyHomeLanguage: [...DAILY_OPERATOR_HOME_POLISH_LANGUAGE],
    advancedDetails: [
      "Daily operator home polish",
      "Daily home identity",
      "Today review priorities",
      "Loop readiness summary",
      "Blocked work summary",
      "Approval queue route",
      "Global review inbox route",
      "Result history route",
      "Safety reminders",
      "Next recommended action",
      "Daily home does not run workflows automatically",
      "All actions remain behind explicit approval gates",
      "Private details stay redacted until review",
      "advanced daily home details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyOperatorHomePolish(model) };
}
