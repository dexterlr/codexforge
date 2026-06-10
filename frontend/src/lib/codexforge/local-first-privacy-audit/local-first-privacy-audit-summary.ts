import type {
  LocalFirstPrivacyAudit,
  LocalFirstPrivacyAuditBoundary,
  LocalFirstPrivacyAuditModel,
} from "./local-first-privacy-audit-types";
import { buildLocalFirstPrivacyAuditStableKey } from "./local-first-privacy-audit-types";

export const LOCAL_FIRST_PRIVACY_AUDIT_LANGUAGE = [
  "Local-first privacy audit",
  "Local-first privacy audit does not scan local files",
  "Private data is not sent automatically",
  "Unresolved privacy risks stay blocked",
  "Local-first guarantee summary",
  "Memory boundary audit",
] as const;

export function buildLocalFirstPrivacyAudit(
  input: Omit<LocalFirstPrivacyAudit, "id"> & { idHint: string }
): LocalFirstPrivacyAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildLocalFirstPrivacyAuditStableKey("local-first-privacy-audit", idHint, input.status),
    ...audit,
  };
}

export function buildLocalFirstPrivacyAudits(): LocalFirstPrivacyAudit[] {
  return [
    buildLocalFirstPrivacyAudit({
      idHint: "daily-local-first-boundary",
      status: "ready-for-review",
      privacyAuditIdentity:
        "Privacy audit identity: local-first-privacy-audit-daily-boundary.",
      localFirstGuaranteeSummary: [
        "Local-first guarantee summary: private data is not sent automatically.",
        "Local-first guarantee summary: review pages may describe safe boundaries but do not call providers, connectors, web/search APIs, or local bridge endpoints.",
      ],
      fileBoundaryAudit: [
        "File boundary audit: local-first privacy audit does not scan local files.",
        "File boundary audit: no arbitrary project scanning, local file browsing, path crawling, file read/open, auto-open, write, export, patch, or delete behavior is available.",
      ],
      connectorBoundaryAudit: [
        "Connector boundary audit: connector data stays private and redacted until an explicit reviewed connector route approves a safe summary.",
        "Connector boundary audit: no connector API calls, connector sync, connector reads, or connector token display happens here.",
      ],
      providerBoundaryAudit: [
        "Provider boundary audit: no provider API calls, no prompt payload sent to providers, and no cloud provider API calls occur from this page.",
        "Provider boundary audit: private prompt, file, project, and connector data is not sent without approval.",
      ],
      automationBoundaryAudit: [
        "Automation boundary audit: no reminders, schedules, automations, background jobs, notifications, or polling loops are created.",
        "Automation boundary audit: unresolved automation privacy risks stay blocked.",
      ],
      memoryBoundaryAudit: [
        "Memory boundary audit: no memory/RAG ingestion, no memory auto-promotion, no Brain graph mutation, and no appendEvent/saveBrainGraph calls from UI.",
        "Memory boundary audit: private memory candidates require explicit review before promotion elsewhere.",
      ],
      unresolvedPrivacyRisks: [
        "Unresolved privacy risks: unresolved privacy risks stay blocked.",
        "Unresolved privacy risks: any source with unclear consent, redaction, token handling, provider sharing, connector scope, file boundary, automation behavior, or memory promotion stays blocked.",
      ],
      secretsRegressionRoute:
        "Secrets regression route: /secrets-token-storage-regression-sweep reviews secret and token storage boundaries.",
      nextRecommendedRoute:
        "Next recommended route: /secrets-token-storage-regression-sweep before enabling any future source search or connector summary.",
      advancedPrivacyDetails:
        "Advanced privacy details: local-first privacy audit is review-only. It does not scan local files, read local files, browse files, crawl paths, open files, call connectors, call providers, call web/search APIs, call local bridge endpoints, send private data automatically, execute actions, approve actions, run workflows, run searches, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalFirstPrivacyAudit({
      idHint: "unresolved-private-source",
      status: "blocked",
      privacyAuditIdentity:
        "Privacy audit identity: local-first-privacy-audit-unresolved-private-source.",
      localFirstGuaranteeSummary: [
        "Local-first guarantee summary: unresolved private sources stay local and blocked.",
      ],
      fileBoundaryAudit: [
        "File boundary audit: blocked sources cannot trigger local file scans, reads, opens, exports, writes, patches, or deletes.",
      ],
      connectorBoundaryAudit: [
        "Connector boundary audit: blocked connector scopes cannot trigger connector API calls or connector data reads.",
      ],
      providerBoundaryAudit: [
        "Provider boundary audit: blocked provider sharing cannot send prompts, files, project data, connector data, or private summaries.",
      ],
      automationBoundaryAudit: [
        "Automation boundary audit: blocked privacy risks cannot create reminders, schedules, automations, notifications, background jobs, or polling loops.",
      ],
      memoryBoundaryAudit: [
        "Memory boundary audit: blocked private data cannot be ingested or promoted to memory.",
      ],
      unresolvedPrivacyRisks: [
        "Unresolved privacy risks: unresolved privacy risks stay blocked until the operator reviews consent, scope, redaction, token handling, and retention.",
      ],
      secretsRegressionRoute:
        "Secrets regression route: /secrets-token-storage-regression-sweep reviews token handling before source approval.",
      nextRecommendedRoute:
        "Next recommended route: /dashboard-density-navigation-polish to keep the blocked route visible without exposing private details.",
      advancedPrivacyDetails:
        "Advanced privacy details: blocked privacy risks cannot execute, search, scan, read, send, store, mutate, schedule, poll, notify, or promote anything from this page.",
    }),
  ];
}

export function buildLocalFirstPrivacyAuditBoundary(): LocalFirstPrivacyAuditBoundary {
  return {
    localFirstPrivacyAuditReviewOnly: true,
    localFirstPrivacyAuditDoesNotScanLocalFiles: true,
    privateDataIsNotSentAutomatically: true,
    unresolvedPrivacyRisksStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    localFileScanAllowedFromUi: false,
    localFileReadAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    approvalAutomationAllowedFromUi: false,
    searchExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
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
    sessionStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeLocalFirstPrivacyAudit(
  model: Pick<LocalFirstPrivacyAuditModel, "audits">
): string {
  return `Local-first privacy audit prepares ${model.audits.length} privacy audit posture(s). Local-first privacy audit does not scan local files, private data is not sent automatically, and unresolved privacy risks stay blocked.`;
}

export function buildLocalFirstPrivacyAuditModel(): LocalFirstPrivacyAuditModel {
  const audits = buildLocalFirstPrivacyAudits();
  const model: LocalFirstPrivacyAuditModel = {
    title: "Local-first privacy audit",
    summary: "",
    audits,
    boundary: buildLocalFirstPrivacyAuditBoundary(),
    privacyLanguage: [...LOCAL_FIRST_PRIVACY_AUDIT_LANGUAGE],
    advancedDetails: [
      "Local-first privacy audit",
      "Privacy audit identity",
      "Local-first guarantee summary",
      "File boundary audit",
      "Connector boundary audit",
      "Provider boundary audit",
      "Automation boundary audit",
      "Memory boundary audit",
      "Unresolved privacy risks",
      "Secrets regression route",
      "Next recommended route",
      "Local-first privacy audit does not scan local files",
      "Private data is not sent automatically",
      "Unresolved privacy risks stay blocked",
      "advanced privacy details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalFirstPrivacyAudit(model) };
}
