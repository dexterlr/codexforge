import type {
  FirstAutomationLiveApprovalTrial,
  FirstAutomationLiveApprovalTrialBoundary,
  FirstAutomationLiveApprovalTrialModel,
} from "./first-automation-live-approval-trial-types";
import { buildFirstAutomationLiveApprovalTrialStableKey } from "./first-automation-live-approval-trial-types";

export const FIRST_AUTOMATION_LIVE_APPROVAL_TRIAL_LANGUAGE = [
  "First automation live approval trial",
  "First automation live approval trial does not approve or execute automations",
  "Automation approvals require explicit operator review",
  "Denied automation approvals remain blocked",
  "Approval trial groups",
  "Audit and rollback checklist",
] as const;

export function buildFirstAutomationLiveApprovalTrial(
  input: Omit<FirstAutomationLiveApprovalTrial, "id"> & { idHint: string }
): FirstAutomationLiveApprovalTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildFirstAutomationLiveApprovalTrialStableKey(
      "first-automation-live-approval-trial",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildFirstAutomationLiveApprovalTrials(): FirstAutomationLiveApprovalTrial[] {
  return [
    buildFirstAutomationLiveApprovalTrial({
      idHint: "review-only-live-approval-trial",
      status: "ready-for-review",
      firstAutomationLiveApprovalTrialIdentity:
        "First automation live approval trial identity: first-automation-live-approval-trial-review-only-live-approval-trial.",
      approvalTrialGroups: [
        "Approval trial groups: operator decision, scope summary, dry-run replay reference, denied shortcut list, audit note, rollback note, stop condition, and release candidate route.",
        "Approval trial groups: first automation live approval trial does not approve or execute automations.",
      ],
      operatorDecisionChecklist: [
        "Operator decision checklist: automation approvals require explicit operator review, named operator choice, scope, stop condition, rollback note, and no auto-approval.",
      ],
      deniedAutoApprovalShortcuts: [
        "Denied auto-approval shortcuts: approve actions automatically, approve all, persist approval decisions, execute approved automation, create automation rules, create schedules, or send notifications.",
      ],
      auditAndRollbackChecklist: [
        "Audit and rollback checklist: capture review note, dry-run replay reference, operator decision owner, rollback owner, stop condition, and denied automation approvals remain blocked.",
      ],
      blockedApprovalRisks: [
        "Blocked approval risks: automatic approval request, missing operator decision, missing rollback note, hidden live execution, connector fetch request, provider send request, schedule creation request, or notification send request.",
      ],
      automationReleaseCandidateRoute:
        "Automation release candidate route: /automation-live-trial-release-candidate summarizes automation live-readiness without executing automations.",
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-live-trial-release-candidate summarizes connector live-readiness without calling connector APIs.",
      nextRecommendedAction:
        "Next recommended action: keep approvals manual, then review the automation live trial release candidate.",
      advancedApprovalDetails:
        "Advanced approval details: first automation live approval trial is review-only. First automation live approval trial does not approve or execute automations, automation approvals require explicit operator review, and denied automation approvals remain blocked. It does not approve actions, execute automations, run automations, create automations, persist approval decisions, persist automation rules, create schedules, schedule tasks, create reminders, create watches, create background jobs, start polling loops, send notifications, call connectors, fetch connector data, call providers, send prompts, store outputs, call local models, call local bridge endpoints, execute workflows, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFirstAutomationLiveApprovalTrial({
      idHint: "blocked-auto-approval-request",
      status: "blocked",
      firstAutomationLiveApprovalTrialIdentity:
        "First automation live approval trial identity: first-automation-live-approval-trial-blocked-auto-approval-request.",
      approvalTrialGroups: [
        "Approval trial groups: blocked because the request implies auto-approval or approval persistence.",
      ],
      operatorDecisionChecklist: [
        "Operator decision checklist: explicit operator review remains required.",
      ],
      deniedAutoApprovalShortcuts: [
        "Denied auto-approval shortcuts: automatic approval, approval decision persistence, automation execution, and schedule creation remain blocked.",
      ],
      auditAndRollbackChecklist: [
        "Audit and rollback checklist: blocked until audit and rollback notes are reviewed manually.",
      ],
      blockedApprovalRisks: [
        "Blocked approval risks: denied automation approvals remain blocked.",
      ],
      automationReleaseCandidateRoute:
        "Automation release candidate route: /automation-live-trial-release-candidate remains review-only.",
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-live-trial-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep auto-approval blocked and return to dry-run replay review.",
      advancedApprovalDetails:
        "Advanced approval details: blocked automation approval cannot recover by approving actions, executing automations, persisting approval decisions, creating schedules, or sending notifications.",
    }),
  ];
}

export function buildFirstAutomationLiveApprovalTrialBoundary(): FirstAutomationLiveApprovalTrialBoundary {
  return {
    firstAutomationLiveApprovalTrialReviewOnly: true,
    firstAutomationLiveApprovalTrialDoesNotApproveOrExecuteAutomations: true,
    automationApprovalsRequireExplicitOperatorReview: true,
    deniedAutomationApprovalsRemainBlocked: true,
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

export function summarizeFirstAutomationLiveApprovalTrial(
  model: Pick<FirstAutomationLiveApprovalTrialModel, "trials">
): string {
  return `First automation live approval trial prepares ${model.trials.length} automation approval posture(s). First automation live approval trial does not approve or execute automations, automation approvals require explicit operator review, and denied automation approvals remain blocked.`;
}

export function buildFirstAutomationLiveApprovalTrialModel(): FirstAutomationLiveApprovalTrialModel {
  const trials = buildFirstAutomationLiveApprovalTrials();
  const model: FirstAutomationLiveApprovalTrialModel = {
    title: "First automation live approval trial",
    summary: "",
    trials,
    boundary: buildFirstAutomationLiveApprovalTrialBoundary(),
    approvalLanguage: [...FIRST_AUTOMATION_LIVE_APPROVAL_TRIAL_LANGUAGE],
    advancedDetails: [
      "First automation live approval trial",
      "first automation live approval trial identity",
      "Approval trial groups",
      "operator decision checklist",
      "denied auto-approval shortcuts",
      "Audit and rollback checklist",
      "blocked approval risks",
      "automation release candidate route",
      "connector release candidate route",
      "next recommended action",
      "First automation live approval trial does not approve or execute automations",
      "Automation approvals require explicit operator review",
      "Denied automation approvals remain blocked",
      "advanced approval details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstAutomationLiveApprovalTrial(model) };
}
