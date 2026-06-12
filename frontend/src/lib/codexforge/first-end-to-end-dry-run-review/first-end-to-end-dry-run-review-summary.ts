import type {
  FirstEndToEndDryRunReview,
  FirstEndToEndDryRunReviewBoundary,
  FirstEndToEndDryRunReviewModel,
} from "./first-end-to-end-dry-run-review-types";
import { buildFirstEndToEndDryRunReviewStableKey } from "./first-end-to-end-dry-run-review-types";

export const FIRST_END_TO_END_DRY_RUN_REVIEW_LANGUAGE = [
  "First end-to-end dry run review",
  "First end-to-end dry run does not execute workflows",
  "All workflow stages require explicit operator approval before live use",
  "Dry-run results are reviewed before use",
  "Dry-run workflow stages",
  "Simulated output review checklist",
] as const;

export function buildFirstEndToEndDryRunReview(
  input: Omit<FirstEndToEndDryRunReview, "id"> & { idHint: string }
): FirstEndToEndDryRunReview {
  const { idHint, ...dryRun } = input;
  return {
    id: buildFirstEndToEndDryRunReviewStableKey("first-end-to-end-dry-run-review", idHint, input.status),
    ...dryRun,
  };
}

export function buildFirstEndToEndDryRunReviews(): FirstEndToEndDryRunReview[] {
  return [
    buildFirstEndToEndDryRunReview({
      idHint: "review-only-complete-workflow-preview",
      status: "ready-for-review",
      endToEndDryRunIdentity:
        "End-to-end dry run identity: first-end-to-end-dry-run-review-review-only-complete-workflow-preview.",
      dryRunWorkflowStages: [
        "Dry-run workflow stages: intake review stays manual and does not send prompts to providers or models.",
        "Dry-run workflow stages: provider/local planning handoff is simulated and does not call providers, local models, or local bridge endpoints.",
        "Dry-run workflow stages: connector context handoff uses reviewed placeholder summaries and does not connect accounts, call connector APIs, or fetch connector data.",
        "Dry-run workflow stages: automation handoff previews approval and schedule expectations without creating automations, schedules, reminders, watches, polling loops, background jobs, or notifications.",
        "Dry-run workflow stages: result review stays simulated and does not store outputs, mutate files, ingest evidence, or promote memory.",
      ],
      providerLocalConnectorAutomationHandoffSummary: [
        "Provider/local/connector/automation handoff summary: each handoff is a reviewed preview with explicit operator approval required before live use.",
        "Provider/local/connector/automation handoff summary: denied live traffic, connector access, local endpoint, automation, file, and memory paths remain blocked.",
      ],
      simulatedOutputReviewChecklist: [
        "Simulated output review checklist: dry-run results are reviewed before use and are not stored as provider, model, connector, automation, audit, evidence, or live data.",
        "Simulated output review checklist: reviewers check safety, privacy, approval gates, rollback notes, and blocked live paths before any release candidate.",
      ],
      deniedExecutionActions: [
        "Denied execution actions: execute workflows, run end-to-end workflows, call providers, call local models, call connectors, create automations, approve actions, persist decisions, store outputs, mutate files, mutate memory, or go live.",
      ],
      safetyValidationChecklist: [
        "Safety validation checklist: provider, local model, connector, automation, approval, file, memory, credential, endpoint, output, and live traffic boundaries remain review-only.",
        "Safety validation checklist: no tests, builds, smoke checks, shell commands, git commands, web searches, research, coding workflows, tools, agents, plugins, or MCP runtimes run from UI.",
      ],
      blockedDryRunRisks: [
        "Blocked dry-run risks: unclear approval, unreviewed simulated output, live workflow request, provider send request, local model call request, connector fetch request, automation creation request, output storage request, file mutation request, or memory promotion request.",
      ],
      approvalFlowRoute:
        "Approval flow route: /end-to-end-approval-flow-review previews approval gates without approving anything.",
      liveIntegrationReleaseCandidateRoute:
        "Live integration release candidate route: /codexforge-live-integration-release-candidate summarizes readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: review simulated output, keep blocked dry-run risks blocked, and move to the end-to-end approval flow review before the live integration release candidate.",
      advancedDryRunDetails:
        "Advanced dry-run details: first end-to-end dry run review is review-only. First end-to-end dry run does not execute workflows, all workflow stages require explicit operator approval before live use, and dry-run results are reviewed before use. It does not run workflows, launch live workflows, go live, route live traffic, call providers, test provider connections, route provider traffic, send prompts to providers, store provider outputs, call local models, call local bridge endpoints, launch local tools, call connector APIs, connect connector accounts, fetch connector data, store connector data, create automations, run automations, persist automation rules, persist approval decisions, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, generate creative assets, run research, execute coding workflows, apply patches, browse web or search APIs, call GitHub APIs, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store connector data, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFirstEndToEndDryRunReview({
      idHint: "blocked-live-execution-request",
      status: "blocked",
      endToEndDryRunIdentity:
        "End-to-end dry run identity: first-end-to-end-dry-run-review-blocked-live-execution-request.",
      dryRunWorkflowStages: [
        "Dry-run workflow stages: blocked because live execution, provider calls, connector calls, local model calls, automation creation, output storage, file mutation, or memory mutation is implied.",
      ],
      providerLocalConnectorAutomationHandoffSummary: [
        "Provider/local/connector/automation handoff summary: blocked until every handoff is review-only and approval-gated.",
      ],
      simulatedOutputReviewChecklist: [
        "Simulated output review checklist: blocked until dry-run results are reviewed before use without output storage.",
      ],
      deniedExecutionActions: [
        "Denied execution actions: workflow execution, live workflow launch, go-live action, provider calls, local model calls, connector calls, automation creation, output storage, file mutation, and memory mutation remain blocked.",
      ],
      safetyValidationChecklist: [
        "Safety validation checklist: blocked until provider/local/connector/automation and approval boundaries are visible.",
      ],
      blockedDryRunRisks: [
        "Blocked dry-run risks: live execution request, auto-approval request, provider send request, connector fetch request, local endpoint request, output storage request, or mutation request.",
      ],
      approvalFlowRoute:
        "Approval flow route: /end-to-end-approval-flow-review remains preview-only.",
      liveIntegrationReleaseCandidateRoute:
        "Live integration release candidate route: /codexforge-live-integration-release-candidate remains blocked until dry-run risks are reviewed.",
      nextRecommendedAction:
        "Next recommended action: keep denied execution actions blocked and return to unified readiness and approval flow review.",
      advancedDryRunDetails:
        "Advanced dry-run details: blocked dry run cannot recover by executing workflows, calling providers, calling local models, calling connectors, creating automations, storing outputs, mutating files, or mutating memory.",
    }),
  ];
}

export function buildFirstEndToEndDryRunReviewBoundary(): FirstEndToEndDryRunReviewBoundary {
  return {
    firstEndToEndDryRunReviewOnly: true,
    firstEndToEndDryRunDoesNotExecuteWorkflows: true,
    allWorkflowStagesRequireExplicitOperatorApprovalBeforeLiveUse: true,
    dryRunResultsAreReviewedBeforeUse: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    liveWorkflowLaunchAllowedFromUi: false,
    liveTrafficRoutingAllowedFromUi: false,
    goLiveAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    autoApprovalAllowedFromUi: false,
    actionsApprovedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerLiveConnectionTestsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationRulePersistenceAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
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
    connectorDataStorageAllowed: false,
    automationDataStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeFirstEndToEndDryRunReview(
  model: Pick<FirstEndToEndDryRunReviewModel, "dryRuns">
): string {
  return `First end-to-end dry run review previews ${model.dryRuns.length} complete workflow path(s). First end-to-end dry run does not execute workflows, all workflow stages require explicit operator approval before live use, and dry-run results are reviewed before use.`;
}

export function buildFirstEndToEndDryRunReviewModel(): FirstEndToEndDryRunReviewModel {
  const dryRuns = buildFirstEndToEndDryRunReviews();
  const model: FirstEndToEndDryRunReviewModel = {
    title: "First end-to-end dry run review",
    summary: "",
    dryRuns,
    boundary: buildFirstEndToEndDryRunReviewBoundary(),
    dryRunLanguage: [...FIRST_END_TO_END_DRY_RUN_REVIEW_LANGUAGE],
    advancedDetails: [
      "First end-to-end dry run review",
      "end-to-end dry run identity",
      "Dry-run workflow stages",
      "provider/local/connector/automation handoff summary",
      "Simulated output review checklist",
      "denied execution actions",
      "safety validation checklist",
      "blocked dry-run risks",
      "approval flow route",
      "live integration release candidate route",
      "next recommended action",
      "First end-to-end dry run does not execute workflows",
      "All workflow stages require explicit operator approval before live use",
      "Dry-run results are reviewed before use",
      "advanced dry-run details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstEndToEndDryRunReview(model) };
}
