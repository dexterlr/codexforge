import type {
  AutomationDryRunTrialReview,
  AutomationDryRunTrialReviewBoundary,
  AutomationDryRunTrialReviewModel,
} from "./automation-dry-run-trial-review-types";
import { buildAutomationDryRunTrialReviewStableKey } from "./automation-dry-run-trial-review-types";

export const AUTOMATION_DRY_RUN_TRIAL_REVIEW_LANGUAGE = [
  "Automation dry-run trial review",
  "Automation dry-run trial does not create automations",
  "Automation execution requires explicit operator approval",
  "Dry-run output is reviewed before use",
  "Dry-run scenario groups",
  "Simulated action summary",
] as const;

export function buildAutomationDryRunTrialReview(
  input: Omit<AutomationDryRunTrialReview, "id"> & { idHint: string }
): AutomationDryRunTrialReview {
  const { idHint, ...trial } = input;
  return {
    id: buildAutomationDryRunTrialReviewStableKey("automation-dry-run-trial-review", idHint, input.status),
    ...trial,
  };
}

export function buildAutomationDryRunTrialReviews(): AutomationDryRunTrialReview[] {
  return [
    buildAutomationDryRunTrialReview({
      idHint: "review-only-morning-summary",
      status: "ready-for-review",
      automationDryRunIdentity:
        "Automation dry-run identity: automation-dry-run-trial-review-review-only-morning-summary.",
      dryRunScenarioGroups: [
        "Dry-run scenario groups: operator morning summary, stale review follow-up, and blocked approval reminder preview.",
        "Dry-run scenario groups: connector and provider references use placeholders only; no connector or provider is called.",
      ],
      simulatedActionSummary:
        "Simulated action summary: the trial describes what an automation would ask the operator to review, without creating a rule, schedule, reminder, watch, background job, notification, or approval.",
      approvalGateChecklist: [
        "Approval gate checklist: operator identity, trigger reason, data scope, timing, denied actions, and rollback owner are visible.",
        "Approval gate checklist: automation execution requires explicit operator approval before any future live path exists.",
        "Approval gate checklist: dry-run output is reviewed before use and cannot be promoted automatically.",
      ],
      deniedAutomationActions: [
        "Denied automation actions: create automations, persist automation rules, schedule tasks, create reminders, create watches, run workflows, call connectors, call providers, send notifications, or mutate memory/files.",
      ],
      connectorProviderBoundaryNotes: [
        "Connector/provider boundary notes: connector data is not fetched, connector accounts are not connected, prompts are not sent to providers, and provider outputs are not stored.",
        "Connector/provider boundary notes: local models, local bridge endpoints, search APIs, and GitHub APIs stay outside this review-only surface.",
      ],
      blockedDryRunRisks: [
        "Blocked dry-run risks: missing operator approval, implied background polling, implied schedule creation, connector data request, provider send request, output persistence, file mutation, or memory promotion.",
      ],
      approvalQueueRoute:
        "Approval queue route: /automation-approval-queue-review reviews pending automation approvals without approving anything.",
      scheduleSafetyRoute:
        "Schedule safety route: /automation-schedule-safety-review reviews cadence and timing without scheduling tasks.",
      nextRecommendedAction:
        "Next recommended action: keep the dry-run in review, send unresolved items to the automation approval queue review, and check schedule safety before any live automation proposal.",
      advancedDryRunDetails:
        "Advanced dry-run details: automation dry-run trial review is review-only. Automation dry-run trial does not create automations, automation execution requires explicit operator approval, and dry-run output is reviewed before use. It does not persist automation rules, persist approval decisions, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, call connector APIs, connect connector accounts, fetch connector data, store connector data, call providers, test provider connections, route provider traffic, send prompts to providers, store provider outputs, call local models, call local bridge endpoints, launch local tools, generate creative assets, run research, execute coding workflows, apply patches, browse web or search APIs, call GitHub APIs, scan arbitrary projects, browse local files, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildAutomationDryRunTrialReview({
      idHint: "blocked-live-execution-request",
      status: "blocked",
      automationDryRunIdentity:
        "Automation dry-run identity: automation-dry-run-trial-review-blocked-live-execution-request.",
      dryRunScenarioGroups: [
        "Dry-run scenario groups: blocked because the proposed path implies live workflow execution or automatic approval.",
      ],
      simulatedActionSummary:
        "Simulated action summary: blocked live execution remains a written preview only and cannot create automation state.",
      approvalGateChecklist: [
        "Approval gate checklist: blocked until the operator explicitly reviews the action, schedule, data scope, and denied shortcuts.",
      ],
      deniedAutomationActions: [
        "Denied automation actions: automatic approval, workflow execution, automation creation, schedule creation, reminder creation, watch creation, connector calls, provider calls, file mutation, and memory mutation remain blocked.",
      ],
      connectorProviderBoundaryNotes: [
        "Connector/provider boundary notes: blocked dry-run cannot recover by fetching connector data or sending prompts to providers.",
      ],
      blockedDryRunRisks: [
        "Blocked dry-run risks: live action request, missing approval packet, unsafe timing, provider send request, connector fetch request, or persistent rule request.",
      ],
      approvalQueueRoute:
        "Approval queue route: /automation-approval-queue-review keeps approval decisions manual.",
      scheduleSafetyRoute:
        "Schedule safety route: /automation-schedule-safety-review keeps unsafe schedule shortcuts blocked.",
      nextRecommendedAction:
        "Next recommended action: keep this dry-run blocked and prepare a manual approval packet outside the page.",
      advancedDryRunDetails:
        "Advanced dry-run details: blocked dry-runs do not execute workflows, approve actions, persist rules, schedule tasks, create reminders, create watches, call connectors, call providers, mutate files, or mutate memory.",
    }),
  ];
}

export function buildAutomationDryRunTrialReviewBoundary(): AutomationDryRunTrialReviewBoundary {
  return {
    automationDryRunTrialReviewOnly: true,
    automationDryRunTrialDoesNotCreateAutomations: true,
    automationExecutionRequiresExplicitOperatorApproval: true,
    dryRunOutputReviewedBeforeUse: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    actionsApprovedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
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
    providerApiCallsAllowedFromUi: false,
    providerLiveConnectionTestsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
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
    evidenceAutoIngestionAllowedFromUi: false,
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
    automationDataStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeAutomationDryRunTrialReview(
  model: Pick<AutomationDryRunTrialReviewModel, "trials">
): string {
  return `Automation dry-run trial review previews ${model.trials.length} automation dry-run trial(s). Automation dry-run trial does not create automations, automation execution requires explicit operator approval, and dry-run output is reviewed before use.`;
}

export function buildAutomationDryRunTrialReviewModel(): AutomationDryRunTrialReviewModel {
  const trials = buildAutomationDryRunTrialReviews();
  const model: AutomationDryRunTrialReviewModel = {
    title: "Automation dry-run trial review",
    summary: "",
    trials,
    boundary: buildAutomationDryRunTrialReviewBoundary(),
    dryRunLanguage: [...AUTOMATION_DRY_RUN_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Automation dry-run trial review",
      "automation dry-run identity",
      "Dry-run scenario groups",
      "Simulated action summary",
      "approval gate checklist",
      "denied automation actions",
      "connector/provider boundary notes",
      "blocked dry-run risks",
      "approval queue route",
      "schedule safety route",
      "next recommended action",
      "Automation dry-run trial does not create automations",
      "Automation execution requires explicit operator approval",
      "Dry-run output is reviewed before use",
      "advanced dry-run details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAutomationDryRunTrialReview(model) };
}
