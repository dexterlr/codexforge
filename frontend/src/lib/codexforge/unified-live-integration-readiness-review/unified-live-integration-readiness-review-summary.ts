import type {
  UnifiedLiveIntegrationReadinessReview,
  UnifiedLiveIntegrationReadinessReviewBoundary,
  UnifiedLiveIntegrationReadinessReviewModel,
} from "./unified-live-integration-readiness-review-types";
import { buildUnifiedLiveIntegrationReadinessReviewStableKey } from "./unified-live-integration-readiness-review-types";

export const UNIFIED_LIVE_INTEGRATION_READINESS_REVIEW_LANGUAGE = [
  "Unified live integration readiness review",
  "Unified live integration readiness does not run live workflows",
  "Live integration requires explicit operator approval",
  "Unresolved readiness risks stay blocked",
  "Provider readiness status",
  "Automation readiness status",
] as const;

export function buildUnifiedLiveIntegrationReadinessReview(
  input: Omit<UnifiedLiveIntegrationReadinessReview, "id"> & { idHint: string }
): UnifiedLiveIntegrationReadinessReview {
  const { idHint, ...review } = input;
  return {
    id: buildUnifiedLiveIntegrationReadinessReviewStableKey(
      "unified-live-integration-readiness-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildUnifiedLiveIntegrationReadinessReviews(): UnifiedLiveIntegrationReadinessReview[] {
  return [
    buildUnifiedLiveIntegrationReadinessReview({
      idHint: "review-only-unified-readiness",
      status: "ready-for-review",
      unifiedLiveIntegrationIdentity:
        "Unified live integration identity: unified-live-integration-readiness-review-review-only-release-path.",
      providerReadinessStatus:
        "Provider readiness status: provider integration hardening is reviewed without provider calls, prompt sending, output storage, connection tests, or traffic routing.",
      localModelReadinessStatus:
        "Local model readiness status: local integration is reviewed without local model calls, local bridge endpoint calls, runtime switching, endpoint storage, or credential storage.",
      connectorReadinessStatus:
        "Connector readiness status: connector integration is reviewed without connector API calls, account connection, connector data fetch, connector data storage, or automatic evidence ingestion.",
      automationReadinessStatus:
        "Automation readiness status: automation dry-run, approval queue, schedule safety, and automation integration reviews do not create automations, run workflows, schedule tasks, or send notifications.",
      approvalGateChecklist: [
        "Approval gate checklist: live provider, local model, connector, automation, file, memory, and release paths all require explicit operator approval before live use.",
        "Approval gate checklist: denied or unresolved items remain blocked and cannot be cleared from this readiness page.",
      ],
      deniedLiveIntegrationActions: [
        "Denied live integration actions: run live workflows, route live provider/local/connector/automation traffic, call providers, call local models, call connectors, create automations, approve actions, persist decisions, store outputs, mutate files, or mutate memory.",
      ],
      unresolvedReadinessRisks: [
        "Unresolved readiness risks: missing approval, unclear handoff, unreviewed simulated output, unsafe automation cadence, connector privacy risk, local endpoint risk, provider credential risk, file mutation risk, memory promotion risk, or launch-blocker risk.",
      ],
      firstEndToEndDryRunRoute:
        "First end-to-end dry run route: /first-end-to-end-dry-run-review previews the complete workflow without executing it.",
      approvalFlowRoute:
        "Approval flow route: /end-to-end-approval-flow-review previews approval gates without approving actions automatically.",
      nextRecommendedAction:
        "Next recommended action: review readiness risks, move to the first end-to-end dry run, then review the approval flow before any live integration release candidate.",
      advancedReadinessDetails:
        "Advanced readiness details: unified live integration readiness review is review-only. Unified live integration readiness does not run live workflows, live integration requires explicit operator approval, and unresolved readiness risks stay blocked. It does not run workflows, launch live workflows, go live, route live traffic, call providers, test provider connections, route provider traffic, send prompts to providers, store provider outputs, call local models, call local bridge endpoints, launch local tools, call connector APIs, connect connector accounts, fetch connector data, store connector data, create automations, run automations, persist automation rules, persist approval decisions, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, generate creative assets, run research, execute coding workflows, apply patches, browse web or search APIs, call GitHub APIs, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildUnifiedLiveIntegrationReadinessReview({
      idHint: "blocked-unresolved-risk",
      status: "blocked",
      unifiedLiveIntegrationIdentity:
        "Unified live integration identity: unified-live-integration-readiness-review-blocked-unresolved-risk.",
      providerReadinessStatus:
        "Provider readiness status: blocked until provider risks are reviewed without provider calls.",
      localModelReadinessStatus:
        "Local model readiness status: blocked until local model routing and endpoint risks are reviewed without local calls.",
      connectorReadinessStatus:
        "Connector readiness status: blocked until connector data and permission risks are reviewed without connector calls.",
      automationReadinessStatus:
        "Automation readiness status: blocked until automation dry-run, approval, and schedule risks are reviewed without automation creation.",
      approvalGateChecklist: [
        "Approval gate checklist: blocked items require an operator decision outside this review-only page.",
      ],
      deniedLiveIntegrationActions: [
        "Denied live integration actions: live workflow execution, live traffic routing, automatic approval, provider calls, local model calls, connector calls, automation creation, file mutation, and memory mutation remain blocked.",
      ],
      unresolvedReadinessRisks: [
        "Unresolved readiness risks: blocked until every provider/local/connector/automation risk has a reviewed owner and manual approval path.",
      ],
      firstEndToEndDryRunRoute:
        "First end-to-end dry run route: /first-end-to-end-dry-run-review stays review-only.",
      approvalFlowRoute:
        "Approval flow route: /end-to-end-approval-flow-review stays manual and does not approve actions automatically.",
      nextRecommendedAction:
        "Next recommended action: keep unresolved readiness risks blocked and return to provider, local model, connector, automation, dry-run, and approval flow reviews.",
      advancedReadinessDetails:
        "Advanced readiness details: blocked readiness cannot recover by running a workflow, approving an action, calling a provider, calling a local model, calling a connector, creating automation, storing output, mutating files, or mutating memory.",
    }),
  ];
}

export function buildUnifiedLiveIntegrationReadinessReviewBoundary(): UnifiedLiveIntegrationReadinessReviewBoundary {
  return {
    unifiedLiveIntegrationReadinessReviewOnly: true,
    unifiedLiveIntegrationReadinessDoesNotRunLiveWorkflows: true,
    liveIntegrationRequiresExplicitOperatorApproval: true,
    unresolvedReadinessRisksStayBlocked: true,
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

export function summarizeUnifiedLiveIntegrationReadinessReview(
  model: Pick<UnifiedLiveIntegrationReadinessReviewModel, "readinessReviews">
): string {
  return `Unified live integration readiness review summarizes ${model.readinessReviews.length} readiness path(s). Unified live integration readiness does not run live workflows, live integration requires explicit operator approval, and unresolved readiness risks stay blocked.`;
}

export function buildUnifiedLiveIntegrationReadinessReviewModel(): UnifiedLiveIntegrationReadinessReviewModel {
  const readinessReviews = buildUnifiedLiveIntegrationReadinessReviews();
  const model: UnifiedLiveIntegrationReadinessReviewModel = {
    title: "Unified live integration readiness review",
    summary: "",
    readinessReviews,
    boundary: buildUnifiedLiveIntegrationReadinessReviewBoundary(),
    readinessLanguage: [...UNIFIED_LIVE_INTEGRATION_READINESS_REVIEW_LANGUAGE],
    advancedDetails: [
      "Unified live integration readiness review",
      "unified live integration identity",
      "Provider readiness status",
      "local model readiness status",
      "connector readiness status",
      "Automation readiness status",
      "approval gate checklist",
      "denied live integration actions",
      "unresolved readiness risks",
      "first end-to-end dry run route",
      "approval flow route",
      "next recommended action",
      "Unified live integration readiness does not run live workflows",
      "Live integration requires explicit operator approval",
      "Unresolved readiness risks stay blocked",
      "advanced readiness details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedLiveIntegrationReadinessReview(model) };
}
