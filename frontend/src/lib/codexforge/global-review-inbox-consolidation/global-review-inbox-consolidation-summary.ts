import type {
  GlobalReviewInboxConsolidation,
  GlobalReviewInboxConsolidationBoundary,
  GlobalReviewInboxConsolidationModel,
} from "./global-review-inbox-consolidation-types";
import { buildGlobalReviewInboxConsolidationStableKey } from "./global-review-inbox-consolidation-types";

export const GLOBAL_REVIEW_INBOX_CONSOLIDATION_LANGUAGE = [
  "Global review inbox consolidation",
  "Global inbox consolidates reviews without approving them",
  "Review items require explicit operator action",
  "No review item is executed from this page",
  "Review item groups",
  "Unresolved blockers",
] as const;

export function buildGlobalReviewInboxConsolidation(
  input: Omit<GlobalReviewInboxConsolidation, "id"> & { idHint: string }
): GlobalReviewInboxConsolidation {
  const { idHint, ...inbox } = input;
  return {
    id: buildGlobalReviewInboxConsolidationStableKey(
      "global-review-inbox-consolidation",
      idHint,
      input.status
    ),
    ...inbox,
  };
}

export function buildGlobalReviewInboxConsolidations(): GlobalReviewInboxConsolidation[] {
  return [
    buildGlobalReviewInboxConsolidation({
      idHint: "cross-loop-review-groups",
      status: "ready-for-review",
      globalInboxIdentity:
        "Global inbox identity: global-review-inbox-consolidation-cross-loop-review-groups.",
      reviewItemGroups: [
        "Review item groups: coding validation, provider policy, creative artifact, research evidence, connector privacy, automation proposal, project knowledge, and cross-loop safety.",
        "Review item groups: approval-needed items are summarized here and routed to /approval-queue without approval being granted.",
      ],
      sourceLoopSummary: [
        "Source loop summary: review items can originate from coding, provider, creative, extension, research, connector, automation, project knowledge, and result handoff loops.",
        "Source loop summary: source loop records stay summarized and do not trigger reads, syncs, workflow runs, or memory promotion.",
      ],
      riskSeveritySummary: [
        "Risk/severity summary: critical items involve execution, private data, local files, provider traffic, connector traffic, automation creation, or memory mutation.",
        "Risk/severity summary: lower-risk items still require explicit operator action before leaving the inbox.",
      ],
      privacyRedactionStatus: [
        "Privacy/redaction status: secrets, tokens, local paths, raw prompts, connector values, and private files stay redacted until review.",
        "Privacy/redaction status: private details are never expanded by this page automatically.",
      ],
      approvalQueueRoute:
        "Approval queue route: /approval-queue handles manual approval review after the operator chooses an item.",
      resultHistoryRoute:
        "Result history route: /result-history checks prior outcomes before repeating a review.",
      unresolvedBlockers: [
        "Unresolved blockers: missing validation evidence.",
        "Unresolved blockers: unclear approval owner.",
        "Unresolved blockers: any request to execute, approve, call APIs, write files, or mutate memory from this page.",
      ],
      nextRecommendedAction:
        "Next recommended action: triage the highest-risk review item, then move only approval-ready items to the approval queue for explicit operator approval.",
      advancedInboxDetails:
        "Advanced inbox details: global review inbox consolidation is review-only and does not approve actions, execute actions, execute workflows, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, send prompt/file/project/connector data without approval, scan arbitrary local projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildGlobalReviewInboxConsolidation({
      idHint: "blocked-executable-review-request",
      status: "blocked",
      globalInboxIdentity:
        "Global inbox identity: global-review-inbox-consolidation-blocked-executable-review-request.",
      reviewItemGroups: [
        "Review item groups: blocked executable review request.",
      ],
      sourceLoopSummary: [
        "Source loop summary: blocked when the source asks the inbox to execute, approve, sync, browse, write, or promote memory.",
      ],
      riskSeveritySummary: [
        "Risk/severity summary: blocked because execution or approval was implied from a review page.",
      ],
      privacyRedactionStatus: [
        "Privacy/redaction status: private details stay redacted while blocked.",
      ],
      approvalQueueRoute:
        "Approval queue route: /approval-queue is available only after the item has enough evidence for manual review.",
      resultHistoryRoute:
        "Result history route: /result-history remains read-only from this page.",
      unresolvedBlockers: [
        "Unresolved blockers: review item requires execution or automatic approval.",
      ],
      nextRecommendedAction:
        "Next recommended action: rewrite the item as review-only before it can be triaged.",
      advancedInboxDetails:
        "Advanced inbox details: blocked review items cannot recover by approving actions, running workflows, calling APIs, mutating files, or mutating memory.",
    }),
  ];
}

export function buildGlobalReviewInboxConsolidationBoundary(): GlobalReviewInboxConsolidationBoundary {
  return {
    globalReviewInboxReviewOnly: true,
    globalInboxConsolidatesReviewsWithoutApprovingThem: true,
    reviewItemsRequireExplicitOperatorAction: true,
    noReviewItemExecutedFromThisPage: true,
    actionsApprovedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
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

export function summarizeGlobalReviewInboxConsolidation(
  model: Pick<GlobalReviewInboxConsolidationModel, "inboxes">
): string {
  return `Global review inbox consolidation prepares ${model.inboxes.length} review inbox posture(s). Global inbox consolidates reviews without approving them, review items require explicit operator action, and no review item is executed from this page.`;
}

export function buildGlobalReviewInboxConsolidationModel(): GlobalReviewInboxConsolidationModel {
  const inboxes = buildGlobalReviewInboxConsolidations();
  const model: GlobalReviewInboxConsolidationModel = {
    title: "Global review inbox consolidation",
    summary: "",
    inboxes,
    boundary: buildGlobalReviewInboxConsolidationBoundary(),
    inboxLanguage: [...GLOBAL_REVIEW_INBOX_CONSOLIDATION_LANGUAGE],
    advancedDetails: [
      "Global review inbox consolidation",
      "Global inbox identity",
      "Review item groups",
      "Source loop summary",
      "Risk/severity summary",
      "Privacy/redaction status",
      "Approval queue route",
      "Result history route",
      "Unresolved blockers",
      "Next recommended action",
      "Global inbox consolidates reviews without approving them",
      "Review items require explicit operator action",
      "No review item is executed from this page",
      "advanced inbox details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeGlobalReviewInboxConsolidation(model) };
}

