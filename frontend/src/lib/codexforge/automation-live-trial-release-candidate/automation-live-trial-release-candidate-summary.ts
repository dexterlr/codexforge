import type {
  AutomationLiveTrialReleaseCandidate,
  AutomationLiveTrialReleaseCandidateBoundary,
  AutomationLiveTrialReleaseCandidateModel,
} from "./automation-live-trial-release-candidate-types";
import { buildAutomationLiveTrialReleaseCandidateStableKey } from "./automation-live-trial-release-candidate-types";

export const AUTOMATION_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE = [
  "Automation live trial release candidate",
  "Automation live trial release candidate does not execute automations",
  "Automation live trial release requires explicit approval",
  "Unresolved automation blockers stay blocked",
  "Execution guard status",
  "Schedule safety status",
] as const;

export function buildAutomationLiveTrialReleaseCandidate(
  input: Omit<AutomationLiveTrialReleaseCandidate, "id"> & { idHint: string }
): AutomationLiveTrialReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildAutomationLiveTrialReleaseCandidateStableKey(
      "automation-live-trial-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildAutomationLiveTrialReleaseCandidates(): AutomationLiveTrialReleaseCandidate[] {
  return [
    buildAutomationLiveTrialReleaseCandidate({
      idHint: "review-only-automation-live-rc",
      status: "ready-for-review",
      automationLiveTrialCandidateIdentity:
        "Automation live trial candidate identity: automation-live-trial-release-candidate-review-only-automation-live-rc.",
      executionGuardStatus: [
        "Execution guard status: automation live execution guard review is present, review-only, and blocks live automation until explicit approval.",
      ],
      dryRunReplayStatus: [
        "Dry-run replay status: first automation live dry-run replay reviews expected and actual automation comparison groups without executing automations.",
      ],
      approvalTrialStatus: [
        "Approval trial status: first automation live approval trial reviews operator decisions without approving or executing automations.",
      ],
      scheduleSafetyStatus: [
        "Schedule safety status: schedule creation, scheduled tasks, reminders, watches, polling loops, background jobs, and notifications remain blocked from this page.",
      ],
      deniedAutomationLivePaths: [
        "Denied automation live paths: execute automations, create automations, persist automation rules, approve actions, persist approval decisions, create schedules, schedule tasks, create reminders, create watches, start polling loops, create background jobs, or send notifications.",
        "Denied automation live paths: call connectors, call providers, call local models, call local bridge endpoints, mutate files, mutate memory, execute tools, execute agents, or create MCP runtimes.",
      ],
      unresolvedAutomationBlockers: [
        "Unresolved automation blockers: missing explicit approval, unresolved dry-run replay, unresolved approval trial, unsafe schedule safety, notification boundary risk, connector/provider/local bridge risk, and file or memory mutation risk.",
        "Unresolved automation blockers: unresolved automation blockers stay blocked.",
      ],
      unifiedWorkflowTrialTwoRoute:
        "Unified workflow trial 2 route: /first-controlled-live-workflow-replay remains review-only and does not rerun live actions.",
      dailyBetaWorkflowRoute:
        "Daily beta workflow route: /daily-operator-home keeps beta workflow readiness visible without running automations.",
      nextRecommendedAction:
        "Next recommended action: keep automation live trial release review-only and require explicit approval before any future live automation proposal.",
      advancedCandidateDetails:
        "Advanced candidate details: automation live trial release candidate is review-only. Automation live trial release candidate does not execute automations, automation live trial release requires explicit approval, and unresolved automation blockers stay blocked. It does not run automations, create automations, persist automation rules, approve actions, persist approval decisions, create schedules, schedule tasks, create reminders, create watches, create background jobs, start polling loops, send notifications, call connectors, fetch connector data, call providers, send prompts, store outputs, call local models, call local bridge endpoints, execute workflows, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildAutomationLiveTrialReleaseCandidate({
      idHint: "blocked-live-automation-release",
      status: "blocked",
      automationLiveTrialCandidateIdentity:
        "Automation live trial candidate identity: automation-live-trial-release-candidate-blocked-live-automation-release.",
      executionGuardStatus: [
        "Execution guard status: blocked because live automation execution cannot run from this page.",
      ],
      dryRunReplayStatus: [
        "Dry-run replay status: blocked until replay remains review-only and reviewed.",
      ],
      approvalTrialStatus: [
        "Approval trial status: blocked until approvals remain explicit operator review only.",
      ],
      scheduleSafetyStatus: [
        "Schedule safety status: blocked until unsafe schedule shortcuts stay blocked.",
      ],
      deniedAutomationLivePaths: [
        "Denied automation live paths: automation execution, automation rule persistence, schedule creation, approval persistence, notification sending, connector calls, provider calls, file mutation, and memory mutation remain blocked.",
      ],
      unresolvedAutomationBlockers: [
        "Unresolved automation blockers: unresolved automation blockers stay blocked.",
      ],
      unifiedWorkflowTrialTwoRoute:
        "Unified workflow trial 2 route: /first-controlled-live-workflow-replay remains review-only.",
      dailyBetaWorkflowRoute:
        "Daily beta workflow route: /daily-operator-home remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep automation live trial release blocked until explicit approval exists outside this page.",
      advancedCandidateDetails:
        "Advanced candidate details: blocked automation release cannot recover by executing automations, persisting automation rules, creating schedules, sending notifications, or approving actions automatically.",
    }),
  ];
}

export function buildAutomationLiveTrialReleaseCandidateBoundary(): AutomationLiveTrialReleaseCandidateBoundary {
  return {
    automationLiveTrialReleaseCandidateReviewOnly: true,
    automationLiveTrialReleaseCandidateDoesNotExecuteAutomations: true,
    automationLiveTrialReleaseRequiresExplicitApproval: true,
    unresolvedAutomationBlockersStayBlocked: true,
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

export function summarizeAutomationLiveTrialReleaseCandidate(
  model: Pick<AutomationLiveTrialReleaseCandidateModel, "candidates">
): string {
  return `Automation live trial release candidate summarizes ${model.candidates.length} automation live trial candidate posture(s). Automation live trial release candidate does not execute automations, automation live trial release requires explicit approval, and unresolved automation blockers stay blocked.`;
}

export function buildAutomationLiveTrialReleaseCandidateModel(): AutomationLiveTrialReleaseCandidateModel {
  const candidates = buildAutomationLiveTrialReleaseCandidates();
  const model: AutomationLiveTrialReleaseCandidateModel = {
    title: "Automation live trial release candidate",
    summary: "",
    candidates,
    boundary: buildAutomationLiveTrialReleaseCandidateBoundary(),
    candidateLanguage: [...AUTOMATION_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Automation live trial release candidate",
      "automation live trial candidate identity",
      "Execution guard status",
      "dry-run replay status",
      "approval trial status",
      "Schedule safety status",
      "denied automation live paths",
      "unresolved automation blockers",
      "unified workflow trial 2 route",
      "daily beta workflow route",
      "next recommended action",
      "Automation live trial release candidate does not execute automations",
      "Automation live trial release requires explicit approval",
      "Unresolved automation blockers stay blocked",
      "advanced candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAutomationLiveTrialReleaseCandidate(model) };
}
