import type {
  FirstAutomationLiveDryRunReplay,
  FirstAutomationLiveDryRunReplayBoundary,
  FirstAutomationLiveDryRunReplayModel,
} from "./first-automation-live-dry-run-replay-types";
import { buildFirstAutomationLiveDryRunReplayStableKey } from "./first-automation-live-dry-run-replay-types";

export const FIRST_AUTOMATION_LIVE_DRY_RUN_REPLAY_LANGUAGE = [
  "First automation live dry-run replay",
  "First automation live dry-run replay does not execute automations",
  "Automation replay requires operator review before live use",
  "Unsafe replay shortcuts remain blocked",
  "Replay stages",
  "Expected actual automation comparison groups",
] as const;

export function buildFirstAutomationLiveDryRunReplay(
  input: Omit<FirstAutomationLiveDryRunReplay, "id"> & { idHint: string }
): FirstAutomationLiveDryRunReplay {
  const { idHint, ...replay } = input;
  return {
    id: buildFirstAutomationLiveDryRunReplayStableKey(
      "first-automation-live-dry-run-replay",
      idHint,
      input.status
    ),
    ...replay,
  };
}

export function buildFirstAutomationLiveDryRunReplays(): FirstAutomationLiveDryRunReplay[] {
  return [
    buildFirstAutomationLiveDryRunReplay({
      idHint: "review-only-live-replay",
      status: "ready-for-review",
      automationLiveDryRunReplayIdentity:
        "Automation live dry-run replay identity: first-automation-live-dry-run-replay-review-only-live-replay.",
      replayStages: [
        "Replay stages: load static plan summary, compare expected action classes, compare actual dry-run notes, check approval readiness, confirm denied replay actions, and stop before live use.",
        "Replay stages: first automation live dry-run replay does not execute automations.",
      ],
      expectedActualAutomationComparisonGroups: [
        "Expected actual automation comparison groups: expected trigger class, expected action class, expected data boundary, actual dry-run note, denied live shortcut, operator review status, and release candidate route.",
      ],
      approvalReadinessChecklist: [
        "Approval readiness checklist: automation replay requires operator review before live use, explicit scope, stop condition, rollback note, and no auto-approval.",
      ],
      deniedReplayActions: [
        "Denied replay actions: execute automations, create automation rules, persist automation rules, create schedules, create reminders, create watches, start polling loops, create background jobs, send notifications, approve actions, or persist approval decisions.",
        "Denied replay actions: call connectors, call providers, call local models, call local bridge endpoints, mutate files, mutate memory, execute tools, execute agents, or create MCP runtimes.",
      ],
      blockedReplayRisks: [
        "Blocked replay risks: unsafe replay shortcuts remain blocked, including implied live execution, hidden polling, background jobs, automatic approval, connector fetch, provider send, file mutation, or memory promotion.",
      ],
      automationApprovalTrialRoute:
        "Automation approval trial route: /first-automation-live-approval-trial reviews automation approvals without approving or executing anything.",
      automationReleaseCandidateRoute:
        "Automation release candidate route: /automation-live-trial-release-candidate summarizes automation live-readiness without executing automations.",
      nextRecommendedAction:
        "Next recommended action: review the first automation live approval trial, then review the automation live trial release candidate.",
      advancedReplayDetails:
        "Advanced replay details: first automation live dry-run replay is review-only. First automation live dry-run replay does not execute automations, automation replay requires operator review before live use, and unsafe replay shortcuts remain blocked. It does not run automations, create automations, persist automation rules, create schedules, schedule tasks, create reminders, create watches, create background jobs, start polling loops, send notifications, approve actions, persist approval decisions, call connectors, fetch connector data, call providers, send prompts, store outputs, call local models, call local bridge endpoints, execute workflows, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFirstAutomationLiveDryRunReplay({
      idHint: "blocked-live-replay-shortcut",
      status: "blocked",
      automationLiveDryRunReplayIdentity:
        "Automation live dry-run replay identity: first-automation-live-dry-run-replay-blocked-live-replay-shortcut.",
      replayStages: [
        "Replay stages: blocked because the request implies live automation execution or hidden replay shortcuts.",
      ],
      expectedActualAutomationComparisonGroups: [
        "Expected actual automation comparison groups: blocked until comparison remains review-only.",
      ],
      approvalReadinessChecklist: [
        "Approval readiness checklist: operator review remains required before live use.",
      ],
      deniedReplayActions: [
        "Denied replay actions: automation execution, automation creation, automation rule persistence, polling loops, background jobs, notifications, and auto-approval remain blocked.",
      ],
      blockedReplayRisks: [
        "Blocked replay risks: unsafe replay shortcuts remain blocked.",
      ],
      automationApprovalTrialRoute:
        "Automation approval trial route: /first-automation-live-approval-trial remains review-only.",
      automationReleaseCandidateRoute:
        "Automation release candidate route: /automation-live-trial-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep replay blocked and return to automation live execution guard review.",
      advancedReplayDetails:
        "Advanced replay details: blocked replay cannot recover by executing automations, creating rules, starting polling loops, creating background jobs, or approving actions automatically.",
    }),
  ];
}

export function buildFirstAutomationLiveDryRunReplayBoundary(): FirstAutomationLiveDryRunReplayBoundary {
  return {
    firstAutomationLiveDryRunReplayReviewOnly: true,
    firstAutomationLiveDryRunReplayDoesNotExecuteAutomations: true,
    automationReplayRequiresOperatorReviewBeforeLiveUse: true,
    unsafeReplayShortcutsRemainBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationRulePersistenceAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    watchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    evidenceAutoIngestionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    creativeAssetGenerationAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    webSearchApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    tokenStorageAllowed: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    outputStorageAllowed: false,
    connectorDataStorageAllowed: false,
    automationDataStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeFirstAutomationLiveDryRunReplay(
  model: Pick<FirstAutomationLiveDryRunReplayModel, "replays">
): string {
  return `First automation live dry-run replay prepares ${model.replays.length} automation replay posture(s). First automation live dry-run replay does not execute automations, automation replay requires operator review before live use, and unsafe replay shortcuts remain blocked.`;
}

export function buildFirstAutomationLiveDryRunReplayModel(): FirstAutomationLiveDryRunReplayModel {
  const replays = buildFirstAutomationLiveDryRunReplays();
  const model: FirstAutomationLiveDryRunReplayModel = {
    title: "First automation live dry-run replay",
    summary: "",
    replays,
    boundary: buildFirstAutomationLiveDryRunReplayBoundary(),
    replayLanguage: [...FIRST_AUTOMATION_LIVE_DRY_RUN_REPLAY_LANGUAGE],
    advancedDetails: [
      "First automation live dry-run replay",
      "automation live dry-run replay identity",
      "Replay stages",
      "Expected actual automation comparison groups",
      "approval readiness checklist",
      "denied replay actions",
      "blocked replay risks",
      "automation approval trial route",
      "automation release candidate route",
      "next recommended action",
      "First automation live dry-run replay does not execute automations",
      "Automation replay requires operator review before live use",
      "Unsafe replay shortcuts remain blocked",
      "advanced replay details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstAutomationLiveDryRunReplay(model) };
}
