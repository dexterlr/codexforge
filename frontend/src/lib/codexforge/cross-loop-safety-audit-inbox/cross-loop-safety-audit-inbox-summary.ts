import type {
  CrossLoopSafetyAuditInboxBoundary,
  CrossLoopSafetyAuditInboxItem,
  CrossLoopSafetyAuditInboxModel,
} from "./cross-loop-safety-audit-inbox-types";
import { buildCrossLoopSafetyAuditInboxStableKey } from "./cross-loop-safety-audit-inbox-types";

export const CROSS_LOOP_SAFETY_AUDIT_INBOX_LANGUAGE = [
  "Cross-loop safety audit inbox",
  "Safety audit items are reviewed before release",
  "Unresolved audit items stay blocked",
  "No action is executed from this page",
  "Approval gate checks",
  "Memory boundary checks",
] as const;

export function buildCrossLoopSafetyAuditInboxItem(
  input: Omit<CrossLoopSafetyAuditInboxItem, "id"> & { idHint: string }
): CrossLoopSafetyAuditInboxItem {
  const { idHint, ...item } = input;
  return {
    id: buildCrossLoopSafetyAuditInboxStableKey("cross-loop-safety-audit-inbox", idHint, input.status),
    ...item,
  };
}

export function buildCrossLoopSafetyAuditInboxItems(): CrossLoopSafetyAuditInboxItem[] {
  return [
    buildCrossLoopSafetyAuditInboxItem({
      idHint: "handoff-to-dashboard-boundary-review",
      status: "ready-for-review",
      auditInboxIdentity:
        "Audit inbox identity: cross-loop-safety-audit-inbox-handoff-to-dashboard-boundary-review.",
      sourceHandoffReview:
        "Source handoff review: /cross-loop-result-handoff-review provides the reviewed source loop summary, destination loop summary, handoff artifact summary, approval state, redaction/privacy state, and blocked handoff reasons.",
      auditedLoopBoundaries: [
        "Audited loop boundaries: coding loop remains preview, approval, validation, and recovery gated.",
        "Audited loop boundaries: provider loop does not call providers or spend tokens from the audit inbox.",
        "Audited loop boundaries: creative loop does not run local jobs, workflows, queues, media generation, or bridge actions.",
        "Audited loop boundaries: extension loop does not execute plugins, tools, agents, extension runtime code, or MCP runtime behavior.",
        "Audited loop boundaries: research and connector loops do not call web/search APIs, source providers, connector APIs, OAuth, sync, email, calendar, or contact APIs.",
        "Audited loop boundaries: automation and project knowledge loops do not schedule work, create reminders, start background jobs, write files, export files, ingest memory, or promote memory.",
      ],
      approvalGateChecks: [
        "Approval gate checks: cross-loop handoffs are reviewed before use.",
        "Approval gate checks: execution remains behind explicit approval gates.",
        "Approval gate checks: unresolved audit items stay blocked.",
      ],
      privacyRedactionChecks: [
        "Privacy/redaction checks: private details stay redacted until approved.",
        "Privacy/redaction checks: no prompt/file/project/connector data is sent without approval.",
        "Privacy/redaction checks: API keys, tokens, secrets, and process.env values are not displayed or stored in browser storage.",
      ],
      executionBoundaryChecks: [
        "Execution boundary checks: no action is executed from this page.",
        "Execution boundary checks: no workflow execution, command execution, shell execution, git execution, test execution, provider calls, connector calls, web/search calls, tool execution, plugin execution, agent execution, or MCP tool calls occur from this page.",
      ],
      memoryBoundaryChecks: [
        "Memory boundary checks: no memory/RAG ingestion runs from the inbox.",
        "Memory boundary checks: no memory is auto-promoted.",
        "Memory boundary checks: no Brain graph mutation, appendEvent call, or saveBrainGraph call runs from UI.",
      ],
      unresolvedAuditItems: [
        "Unresolved audit item: dashboard release needs an operator go/no-go decision.",
        "Unresolved audit item: guided trial remains simulated until explicit approval.",
      ],
      dashboardRoute:
        "Dashboard route: /operator-dashboard-release-candidate reviews readiness after safety audit items are accepted.",
      blockedReasons: [
        "Blocked reason: unresolved audit item.",
        "Blocked reason: missing approval gate.",
        "Blocked reason: unredacted private detail.",
      ],
      advancedAuditDetails:
        "Advanced audit details: cross-loop safety audit inbox does not execute actions, run workflows, run commands, run shell commands, run git commands, run tests, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, export files, apply patches, delete files, call provider APIs, call connector APIs, call web/search APIs, send prompt/file/project/connector data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCrossLoopSafetyAuditInboxItem({
      idHint: "blocked-unresolved-execution-boundary",
      status: "blocked",
      auditInboxIdentity:
        "Audit inbox identity: cross-loop-safety-audit-inbox-blocked-unresolved-execution-boundary.",
      sourceHandoffReview:
        "Source handoff review: blocked because the handoff request implies execution or private detail release before approval.",
      auditedLoopBoundaries: [
        "Audited loop boundaries: blocked until execution, provider, connector, local file, automation, and memory boundaries are all review-clear.",
      ],
      approvalGateChecks: [
        "Approval gate checks: blocked because approval is missing.",
      ],
      privacyRedactionChecks: [
        "Privacy/redaction checks: blocked because private details must stay redacted until approved.",
      ],
      executionBoundaryChecks: [
        "Execution boundary checks: blocked because no action is executed from this page.",
      ],
      memoryBoundaryChecks: [
        "Memory boundary checks: blocked because memory promotion cannot happen automatically.",
      ],
      unresolvedAuditItems: [
        "Unresolved audit item: execution request must move to a separate explicit approval boundary.",
      ],
      dashboardRoute:
        "Dashboard route: /operator-dashboard-release-candidate remains blocked for this item until the audit is resolved.",
      blockedReasons: [
        "Blocked reason: execution implied from a review inbox.",
        "Blocked reason: unresolved audit items stay blocked.",
      ],
      advancedAuditDetails:
        "Advanced audit details: blocked safety audit cannot recover by running workflows, calling APIs, writing files, storing tokens, promoting memory, mutating Brain graph data, creating automations, sending notifications, or starting background work.",
    }),
  ];
}

export function buildCrossLoopSafetyAuditInboxBoundary(): CrossLoopSafetyAuditInboxBoundary {
  return {
    safetyAuditItemsReviewedBeforeRelease: true,
    unresolvedAuditItemsStayBlocked: true,
    noActionExecutedFromPage: true,
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

export function summarizeCrossLoopSafetyAuditInbox(
  model: Pick<CrossLoopSafetyAuditInboxModel, "auditItems">
): string {
  return `Cross-loop safety audit inbox prepares ${model.auditItems.length} audit item(s). Safety audit items are reviewed before release, unresolved audit items stay blocked, and no action is executed from this page.`;
}

export function buildCrossLoopSafetyAuditInboxModel(): CrossLoopSafetyAuditInboxModel {
  const auditItems = buildCrossLoopSafetyAuditInboxItems();
  const model: CrossLoopSafetyAuditInboxModel = {
    title: "Cross-loop safety audit inbox",
    summary: "",
    auditItems,
    boundary: buildCrossLoopSafetyAuditInboxBoundary(),
    auditLanguage: [...CROSS_LOOP_SAFETY_AUDIT_INBOX_LANGUAGE],
    advancedDetails: [
      "Cross-loop safety audit inbox",
      "Safety audit items are reviewed before release",
      "Unresolved audit items stay blocked",
      "No action is executed from this page",
      "Audit inbox identity",
      "Source handoff review",
      "Audited loop boundaries",
      "Approval gate checks",
      "Privacy/redaction checks",
      "Execution boundary checks",
      "Memory boundary checks",
      "Unresolved audit items",
      "Dashboard route",
      "Blocked reasons",
      "advanced audit details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCrossLoopSafetyAuditInbox(model) };
}
