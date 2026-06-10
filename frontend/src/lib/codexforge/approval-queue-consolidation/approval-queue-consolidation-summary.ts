import type {
  ApprovalQueueConsolidation,
  ApprovalQueueConsolidationBoundary,
  ApprovalQueueConsolidationModel,
} from "./approval-queue-consolidation-types";
import { buildApprovalQueueConsolidationStableKey } from "./approval-queue-consolidation-types";

export const APPROVAL_QUEUE_CONSOLIDATION_LANGUAGE = [
  "Approval queue consolidation",
  "Approval queue requires explicit operator approval",
  "No approval is granted from this page",
  "Blocked approvals stay blocked until resolved",
  "Pending approval groups",
  "Required validation evidence",
] as const;

export function buildApprovalQueueConsolidation(
  input: Omit<ApprovalQueueConsolidation, "id"> & { idHint: string }
): ApprovalQueueConsolidation {
  const { idHint, ...approval } = input;
  return {
    id: buildApprovalQueueConsolidationStableKey("approval-queue-consolidation", idHint, input.status),
    ...approval,
  };
}

export function buildApprovalQueueConsolidations(): ApprovalQueueConsolidation[] {
  return [
    buildApprovalQueueConsolidation({
      idHint: "manual-cross-loop-approval-review",
      status: "ready-for-review",
      approvalQueueIdentity:
        "Approval queue identity: approval-queue-consolidation-manual-cross-loop-approval-review.",
      pendingApprovalGroups: [
        "Pending approval groups: patch apply, provider live test, connector access, local bridge job, automation activation, file write/export, memory promotion, and release handoff.",
        "Pending approval groups: approval-ready items come from /global-review-inbox after review evidence is complete.",
      ],
      approvalTypes: [
        "Approval types: execution approval.",
        "Approval types: data access approval.",
        "Approval types: file mutation approval.",
        "Approval types: memory promotion approval.",
        "Approval types: automation activation approval.",
      ],
      safetyGateSummary: [
        "Safety gate summary: approval queue requires explicit operator approval.",
        "Safety gate summary: no approval is granted from this page.",
        "Safety gate summary: blocked approvals stay blocked until resolved.",
      ],
      deniedBlockedApprovals: [
        "Denied/blocked approvals: missing validation evidence.",
        "Denied/blocked approvals: unclear owner or risk level.",
        "Denied/blocked approvals: any request to approve and execute from this page.",
      ],
      requiredValidationEvidence: [
        "Required validation evidence: reviewed intent, reviewed scope, reviewed risk, rollback or recovery note, redaction status, and result history check.",
        "Required validation evidence: operator acceptance must happen in the future explicit approval gate, not here.",
      ],
      resultHistoryRoute:
        "Result history route: /result-history verifies prior outcomes before manual approval review.",
      dailyHomeRoute:
        "Daily home route: /daily-operator-home returns to the review-only operator cockpit.",
      nextRecommendedAction:
        "Next recommended action: inspect required validation evidence, then leave the item pending until the operator grants explicit approval in the proper approval gate.",
      advancedApprovalDetails:
        "Advanced approval details: approval queue consolidation is review-only and does not grant approvals, approve actions automatically, execute actions, execute workflows, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, send prompt/file/project/connector data without approval, scan arbitrary local projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildApprovalQueueConsolidation({
      idHint: "blocked-approval-without-evidence",
      status: "blocked",
      approvalQueueIdentity:
        "Approval queue identity: approval-queue-consolidation-blocked-approval-without-evidence.",
      pendingApprovalGroups: [
        "Pending approval groups: blocked approval missing validation evidence.",
      ],
      approvalTypes: [
        "Approval types: blocked execution approval.",
      ],
      safetyGateSummary: [
        "Safety gate summary: blocked approvals stay blocked until resolved.",
      ],
      deniedBlockedApprovals: [
        "Denied/blocked approvals: missing validation evidence and unsafe request scope.",
      ],
      requiredValidationEvidence: [
        "Required validation evidence: the operator needs reviewed evidence before approval can be considered.",
      ],
      resultHistoryRoute:
        "Result history route: /result-history can review past outcomes but cannot approve this item.",
      dailyHomeRoute:
        "Daily home route: /daily-operator-home shows the blocked work summary.",
      nextRecommendedAction:
        "Next recommended action: keep the approval blocked until evidence and explicit approval scope are reviewed.",
      advancedApprovalDetails:
        "Advanced approval details: blocked approvals cannot recover by granting approval, executing workflows, calling APIs, writing files, or mutating memory from this page.",
    }),
  ];
}

export function buildApprovalQueueConsolidationBoundary(): ApprovalQueueConsolidationBoundary {
  return {
    approvalQueueReviewOnly: true,
    approvalQueueRequiresExplicitOperatorApproval: true,
    noApprovalGrantedFromThisPage: true,
    blockedApprovalsStayBlockedUntilResolved: true,
    actionsApprovedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    automaticApprovalAllowedFromUi: false,
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

export function summarizeApprovalQueueConsolidation(
  model: Pick<ApprovalQueueConsolidationModel, "approvals">
): string {
  return `Approval queue consolidation prepares ${model.approvals.length} approval queue posture(s). Approval queue requires explicit operator approval, no approval is granted from this page, and blocked approvals stay blocked until resolved.`;
}

export function buildApprovalQueueConsolidationModel(): ApprovalQueueConsolidationModel {
  const approvals = buildApprovalQueueConsolidations();
  const model: ApprovalQueueConsolidationModel = {
    title: "Approval queue consolidation",
    summary: "",
    approvals,
    boundary: buildApprovalQueueConsolidationBoundary(),
    approvalLanguage: [...APPROVAL_QUEUE_CONSOLIDATION_LANGUAGE],
    advancedDetails: [
      "Approval queue consolidation",
      "Approval queue identity",
      "Pending approval groups",
      "Approval types",
      "Safety gate summary",
      "Denied/blocked approvals",
      "Required validation evidence",
      "Result history route",
      "Daily home route",
      "Next recommended action",
      "Approval queue requires explicit operator approval",
      "No approval is granted from this page",
      "Blocked approvals stay blocked until resolved",
      "advanced approval details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeApprovalQueueConsolidation(model) };
}

