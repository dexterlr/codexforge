import type {
  CrossLoopResultHandoffBoundary,
  CrossLoopResultHandoffReview,
  CrossLoopResultHandoffReviewModel,
} from "./cross-loop-result-handoff-review-types";
import { buildCrossLoopResultHandoffReviewStableKey } from "./cross-loop-result-handoff-review-types";

export const CROSS_LOOP_RESULT_HANDOFF_REVIEW_LANGUAGE = [
  "Cross-loop result handoff review",
  "Cross-loop handoffs are reviewed before use",
  "Handoffs do not execute actions",
  "Private details stay redacted until approved",
  "Handoff artifact summary",
  "Safety audit route",
] as const;

export function buildCrossLoopResultHandoffReview(
  input: Omit<CrossLoopResultHandoffReview, "id"> & { idHint: string }
): CrossLoopResultHandoffReview {
  const { idHint, ...review } = input;
  return {
    id: buildCrossLoopResultHandoffReviewStableKey(
      "cross-loop-result-handoff-review",
      idHint,
      input.approvalState
    ),
    ...review,
  };
}

export function buildCrossLoopResultHandoffReviews(): CrossLoopResultHandoffReview[] {
  return [
    buildCrossLoopResultHandoffReview({
      idHint: "knowledge-to-dashboard-release",
      approvalState: "ready-for-review",
      handoffReviewIdentity:
        "Handoff review identity: cross-loop-result-handoff-review-knowledge-to-dashboard-release.",
      sourceLoopSummary:
        "Source loop summary: project knowledge release candidate, automation release candidate, connector release candidate, and research workspace release candidate have review-only summaries ready for operator review.",
      destinationLoopSummary:
        "Destination loop summary: operator dashboard release candidate can use the reviewed summaries as visible cards only after this handoff and safety audit are accepted.",
      handoffArtifactSummary:
        "Handoff artifact summary: loop name, release posture, known gaps, approval requirement, redaction status, and next route are summarized in plain English without raw JSON above the fold.",
      redactionPrivacyState:
        "Redaction/privacy state: private details stay redacted until approved and no source, connector, provider, local file, or project data is sent automatically.",
      blockedHandoffReasons: [
        "Blocked handoff reason: missing explicit approval for private details.",
        "Blocked handoff reason: unresolved source loop safety item.",
        "Blocked handoff reason: any request that would execute an action, call an API, mutate files, or promote memory.",
      ],
      safetyAuditRoute:
        "Safety audit route: /cross-loop-safety-audit-inbox reviews approval, privacy, execution, automation, provider, connector, local file, and memory boundaries before release.",
      dashboardRoute:
        "Dashboard route: /operator-dashboard-release-candidate receives only reviewed handoff summaries and does not run workflows automatically.",
      advancedHandoffDetails:
        "Advanced handoff details: cross-loop result handoff review does not execute actions, run workflows, run commands, run shell commands, run git commands, run tests, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, export files, apply patches, delete files, call provider APIs, call connector APIs, call web/search APIs, send prompt/file/project/connector data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCrossLoopResultHandoffReview({
      idHint: "blocked-unreviewed-private-handoff",
      approvalState: "blocked",
      handoffReviewIdentity:
        "Handoff review identity: cross-loop-result-handoff-review-blocked-unreviewed-private-handoff.",
      sourceLoopSummary:
        "Source loop summary: blocked when a source loop includes private connector, provider, project, or memory details that have not passed review.",
      destinationLoopSummary:
        "Destination loop summary: blocked dashboard or guided trial use stays unavailable until the redaction, approval, and safety audit routes are clear.",
      handoffArtifactSummary:
        "Handoff artifact summary: blocked handoff keeps only a plain-language reason, next route, and approval reminder visible.",
      redactionPrivacyState:
        "Redaction/privacy state: private details stay redacted until approved, and redacted placeholders are safer than exposing sensitive evidence.",
      blockedHandoffReasons: [
        "Blocked handoff reason: private details not approved.",
        "Blocked handoff reason: safety audit not complete.",
        "Blocked handoff reason: destination route would imply execution before approval.",
      ],
      safetyAuditRoute:
        "Safety audit route: /cross-loop-safety-audit-inbox remains the next review step for blocked cross-loop handoffs.",
      dashboardRoute:
        "Dashboard route: /operator-dashboard-release-candidate stays review-only and receives no private details until approval.",
      advancedHandoffDetails:
        "Advanced handoff details: blocked handoff cannot be cleared by executing workflows, calling providers, calling connectors, browsing files, writing files, storing tokens, promoting memory, mutating Brain graph data, creating automations, or starting background work.",
    }),
  ];
}

export function buildCrossLoopResultHandoffBoundary(): CrossLoopResultHandoffBoundary {
  return {
    crossLoopHandoffsReviewedBeforeUse: true,
    handoffsDoNotExecuteActions: true,
    privateDetailsStayRedactedUntilApproved: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
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

export function summarizeCrossLoopResultHandoffReview(
  model: Pick<CrossLoopResultHandoffReviewModel, "reviews">
): string {
  return `Cross-loop result handoff review prepares ${model.reviews.length} handoff posture(s). Cross-loop handoffs are reviewed before use, handoffs do not execute actions, and private details stay redacted until approved.`;
}

export function buildCrossLoopResultHandoffReviewModel(): CrossLoopResultHandoffReviewModel {
  const reviews = buildCrossLoopResultHandoffReviews();
  const model: CrossLoopResultHandoffReviewModel = {
    title: "Cross-loop result handoff review",
    summary: "",
    reviews,
    boundary: buildCrossLoopResultHandoffBoundary(),
    handoffLanguage: [...CROSS_LOOP_RESULT_HANDOFF_REVIEW_LANGUAGE],
    advancedDetails: [
      "Cross-loop result handoff review",
      "Cross-loop handoffs are reviewed before use",
      "Handoffs do not execute actions",
      "Private details stay redacted until approved",
      "Handoff review identity",
      "Source loop summary",
      "Destination loop summary",
      "Handoff artifact summary",
      "Approval state",
      "Redaction/privacy state",
      "Blocked handoff reasons",
      "Safety audit route",
      "Dashboard route",
      "advanced handoff details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCrossLoopResultHandoffReview(model) };
}
