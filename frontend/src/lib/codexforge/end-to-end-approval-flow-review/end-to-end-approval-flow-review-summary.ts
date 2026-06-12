import type {
  EndToEndApprovalFlowReview,
  EndToEndApprovalFlowReviewBoundary,
  EndToEndApprovalFlowReviewModel,
} from "./end-to-end-approval-flow-review-types";
import { buildEndToEndApprovalFlowReviewStableKey } from "./end-to-end-approval-flow-review-types";

export const END_TO_END_APPROVAL_FLOW_REVIEW_LANGUAGE = [
  "End-to-end approval flow review",
  "End-to-end approval flow does not approve actions automatically",
  "Every live action requires explicit operator approval",
  "Denied actions remain blocked",
  "Approval gate groups",
  "Audit and rollback checklist",
] as const;

export function buildEndToEndApprovalFlowReview(
  input: Omit<EndToEndApprovalFlowReview, "id"> & { idHint: string }
): EndToEndApprovalFlowReview {
  const { idHint, ...approvalFlow } = input;
  return {
    id: buildEndToEndApprovalFlowReviewStableKey("end-to-end-approval-flow-review", idHint, input.status),
    ...approvalFlow,
  };
}

export function buildEndToEndApprovalFlowReviews(): EndToEndApprovalFlowReview[] {
  return [
    buildEndToEndApprovalFlowReview({
      idHint: "manual-live-action-gates",
      status: "ready-for-review",
      endToEndApprovalFlowIdentity:
        "End-to-end approval flow identity: end-to-end-approval-flow-review-manual-live-action-gates.",
      approvalGateGroups: [
        "Approval gate groups: provider gates cover prompt send, provider call, connection test, output handling, and traffic routing decisions.",
        "Approval gate groups: local model gates cover model call, local bridge endpoint call, local tool launch, endpoint handling, and output handling decisions.",
        "Approval gate groups: connector gates cover account connection, connector API call, connector data fetch, connector data storage, and evidence handoff decisions.",
        "Approval gate groups: automation gates cover workflow execution, automation creation, schedule creation, reminder creation, watch creation, polling loop, background job, and notification decisions.",
        "Approval gate groups: file, memory, release, plugin, tool, agent, extension runtime, and MCP gates stay blocked unless explicitly approved outside this page.",
      ],
      requiredOperatorDecisions: [
        "Required operator decisions: approve or deny live provider, local model, connector, automation, file, memory, and release actions manually before live use.",
        "Required operator decisions: record audit owner, rollback plan, safety escalation owner, and unresolved-risk status before any live integration release candidate.",
      ],
      deniedAutoApprovalShortcuts: [
        "Denied auto-approval shortcuts: auto-approve, approve all, persist approval decisions, infer approval from dry-run success, approve live traffic, clear denied actions, or launch live workflows automatically.",
      ],
      auditRollbackChecklist: [
        "Audit and rollback checklist: every proposed live action needs a visible owner, approval reason, rollback note, output handling note, and blocked-path reminder before live use.",
        "Audit and rollback checklist: this page previews audit and rollback expectations without persisting approval decisions or writing audit data.",
      ],
      safetyEscalationChecklist: [
        "Safety escalation checklist: unresolved provider, local model, connector, automation, file, memory, credential, endpoint, output, privacy, or launch risk stays blocked and escalates to manual review.",
      ],
      blockedApprovalFlowRisks: [
        "Blocked approval flow risks: automatic approval request, persistent approval request, live workflow launch request, provider call request, local model call request, connector fetch request, automation creation request, file mutation request, memory promotion request, or go-live request.",
      ],
      liveIntegrationReleaseCandidateRoute:
        "Live integration release candidate route: /codexforge-live-integration-release-candidate summarizes readiness without going live.",
      dryRunRoute:
        "Dry-run route: /first-end-to-end-dry-run-review previews workflow stages without executing workflows.",
      nextRecommendedAction:
        "Next recommended action: confirm every approval gate remains manual, keep denied actions blocked, and review the live integration release candidate only after dry-run results are reviewed.",
      advancedApprovalDetails:
        "Advanced approval details: end-to-end approval flow review is review-only. End-to-end approval flow does not approve actions automatically, every live action requires explicit operator approval, and denied actions remain blocked. It does not approve actions, persist approval decisions, run workflows, launch live workflows, go live, route live traffic, call providers, test provider connections, route provider traffic, send prompts to providers, store provider outputs, call local models, call local bridge endpoints, launch local tools, call connector APIs, connect connector accounts, fetch connector data, store connector data, create automations, run automations, persist automation rules, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, generate creative assets, run research, execute coding workflows, apply patches, browse web or search APIs, call GitHub APIs, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store connector data, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildEndToEndApprovalFlowReview({
      idHint: "blocked-auto-approval-shortcut",
      status: "blocked",
      endToEndApprovalFlowIdentity:
        "End-to-end approval flow identity: end-to-end-approval-flow-review-blocked-auto-approval-shortcut.",
      approvalGateGroups: [
        "Approval gate groups: blocked because an automatic approval, persistent approval, or live launch shortcut is implied.",
      ],
      requiredOperatorDecisions: [
        "Required operator decisions: blocked until every live action has a manual approve or deny decision path outside this page.",
      ],
      deniedAutoApprovalShortcuts: [
        "Denied auto-approval shortcuts: automatic approval, approve all, approval persistence, denied-action clearing, and live launch remain blocked.",
      ],
      auditRollbackChecklist: [
        "Audit and rollback checklist: blocked until audit owner and rollback plan are reviewed without writing audit data.",
      ],
      safetyEscalationChecklist: [
        "Safety escalation checklist: blocked until unresolved risks escalate to manual review.",
      ],
      blockedApprovalFlowRisks: [
        "Blocked approval flow risks: auto-approval request, approval persistence request, denied shortcut, live workflow launch, provider/local/connector/automation request, or mutation request.",
      ],
      liveIntegrationReleaseCandidateRoute:
        "Live integration release candidate route: /codexforge-live-integration-release-candidate remains blocked until denied actions stay blocked.",
      dryRunRoute:
        "Dry-run route: /first-end-to-end-dry-run-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: remove automatic approval expectations and return to dry-run review and manual approval flow review.",
      advancedApprovalDetails:
        "Advanced approval details: blocked approval flow cannot recover by approving actions, persisting decisions, executing workflows, calling providers, calling local models, calling connectors, creating automations, mutating files, or mutating memory.",
    }),
  ];
}

export function buildEndToEndApprovalFlowReviewBoundary(): EndToEndApprovalFlowReviewBoundary {
  return {
    endToEndApprovalFlowReviewOnly: true,
    endToEndApprovalFlowDoesNotApproveActionsAutomatically: true,
    everyLiveActionRequiresExplicitOperatorApproval: true,
    deniedActionsRemainBlocked: true,
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

export function summarizeEndToEndApprovalFlowReview(
  model: Pick<EndToEndApprovalFlowReviewModel, "approvalFlows">
): string {
  return `End-to-end approval flow review previews ${model.approvalFlows.length} manual approval flow(s). End-to-end approval flow does not approve actions automatically, every live action requires explicit operator approval, and denied actions remain blocked.`;
}

export function buildEndToEndApprovalFlowReviewModel(): EndToEndApprovalFlowReviewModel {
  const approvalFlows = buildEndToEndApprovalFlowReviews();
  const model: EndToEndApprovalFlowReviewModel = {
    title: "End-to-end approval flow review",
    summary: "",
    approvalFlows,
    boundary: buildEndToEndApprovalFlowReviewBoundary(),
    approvalLanguage: [...END_TO_END_APPROVAL_FLOW_REVIEW_LANGUAGE],
    advancedDetails: [
      "End-to-end approval flow review",
      "end-to-end approval flow identity",
      "Approval gate groups",
      "required operator decisions",
      "denied auto-approval shortcuts",
      "Audit and rollback checklist",
      "safety escalation checklist",
      "blocked approval flow risks",
      "live integration release candidate route",
      "dry-run route",
      "next recommended action",
      "End-to-end approval flow does not approve actions automatically",
      "Every live action requires explicit operator approval",
      "Denied actions remain blocked",
      "advanced approval details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndApprovalFlowReview(model) };
}
