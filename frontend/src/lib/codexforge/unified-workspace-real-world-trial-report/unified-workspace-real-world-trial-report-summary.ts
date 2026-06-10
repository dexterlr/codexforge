import type {
  UnifiedWorkspaceRealWorldTrialReport,
  UnifiedWorkspaceRealWorldTrialReportBoundary,
  UnifiedWorkspaceRealWorldTrialReportModel,
} from "./unified-workspace-real-world-trial-report-types";
import { buildUnifiedWorkspaceRealWorldTrialReportStableKey } from "./unified-workspace-real-world-trial-report-types";

export const UNIFIED_WORKSPACE_REAL_WORLD_TRIAL_REPORT_LANGUAGE = [
  "Unified workspace real-world trial report",
  "Unified trial report is reviewed before export or use",
  "No report file is written from this page",
  "Unresolved loop risks stay blocked",
  "Release readiness recommendation",
  "Daily operator polish route",
] as const;

export function buildUnifiedWorkspaceRealWorldTrialReport(
  input: Omit<UnifiedWorkspaceRealWorldTrialReport, "id"> & { idHint: string }
): UnifiedWorkspaceRealWorldTrialReport {
  const { idHint, ...report } = input;
  return {
    id: buildUnifiedWorkspaceRealWorldTrialReportStableKey(
      "unified-workspace-real-world-trial-report",
      idHint,
      input.status
    ),
    ...report,
  };
}

export function buildUnifiedWorkspaceRealWorldTrialReports(): UnifiedWorkspaceRealWorldTrialReport[] {
  return [
    buildUnifiedWorkspaceRealWorldTrialReport({
      idHint: "first-full-real-world-review-layer",
      status: "ready-for-review",
      unifiedReportIdentity:
        "Unified report identity: unified-workspace-real-world-trial-report-first-full-real-world-review-layer.",
      sourceRealWorldTrialReviews: [
        "Source real-world trial review: /coding-loop-real-world-trial-review.",
        "Source real-world trial review: /research-loop-real-world-trial-review.",
        "Source real-world trial review: /connector-loop-real-world-trial-review.",
        "Source real-world trial review: /automation-loop-real-world-trial-review.",
        "Source real-world trial review: /creative-local-bridge-real-world-trial-review.",
        "Source real-world trial review: /provider-governance-real-world-trial-review.",
        "Source real-world trial review: /project-knowledge-real-world-trial-review.",
      ],
      codingTrialOutcome:
        "Coding trial outcome: ready for review when patch, command, validation, commit, and file mutation boundaries remain explicit and separate.",
      researchTrialOutcome:
        "Research trial outcome: ready for review when evidence, citation, freshness, and conflict handling are reviewed without browsing or provider calls.",
      connectorTrialOutcome:
        "Connector trial outcome: ready for review when connector access, Gmail Calendar Contacts boundaries, redaction, and evidence review are clear without connector reads.",
      automationTrialOutcome:
        "Automation trial outcome: ready for review when reminder, watch, schedule, background work, and notification delivery boundaries are clear without creating automations.",
      creativeLocalBridgeTrialOutcome:
        "Creative/local bridge trial outcome: ready for review when local bridge readiness, Blender/Unreal/ComfyUI boundaries, render approvals, and artifact review are clear without launching tools.",
      providerGovernanceTrialOutcome:
        "Provider governance trial outcome: ready for review when provider policy, budget token guardrails, prompt privacy, apply gates, and export gates are clear without provider calls or token spend.",
      projectKnowledgeTrialOutcome:
        "Project knowledge trial outcome: ready for review when snapshot, timeline, decision, runbook, redaction, and memory promotion boundaries are clear without scanning files.",
      crossLoopRisks: [
        "Cross-loop risks: unresolved loop risks stay blocked until review accepts the risk or records a separate approval path.",
        "Cross-loop risks: report evidence is context only and cannot trigger export, execution, memory promotion, file writes, API calls, or automations.",
        "Cross-loop risks: secrets, local paths, tokens, private connector values, raw prompts, and raw files stay redacted.",
      ],
      releaseReadinessRecommendation:
        "Release readiness recommendation: ready with fixes for the first full real-world trial review layer after operator review confirms unresolved loop risks stay blocked.",
      blockedReasons: [
        "Blocked reason: unresolved loop risk.",
        "Blocked reason: report requested for export or use before review.",
        "Blocked reason: any request to execute workflows, call APIs, write files, or mutate memory from this page.",
      ],
      dailyOperatorPolishRoute:
        "Daily operator polish route: /code-flow/final-polish remains a review-only polish handoff before any daily operator use.",
      advancedReportDetails:
        "Advanced report details: unified workspace real-world trial report is review-only and does not export reports, write report files, execute workflows, run commands, run shell commands, run git commands, run tests, run builds, run smoke checks, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, apply patches, delete files, call provider APIs, spend tokens, call connector APIs, call web/search APIs, fetch sources, browse sources, send prompt/file/project/connector data without approval, call local bridge endpoints, launch local tools, run render jobs, run generation jobs, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildUnifiedWorkspaceRealWorldTrialReport({
      idHint: "blocked-unresolved-loop-risk",
      status: "blocked",
      unifiedReportIdentity:
        "Unified report identity: unified-workspace-real-world-trial-report-blocked-unresolved-loop-risk.",
      sourceRealWorldTrialReviews: [
        "Source real-world trial review: blocked until all loop trial reviews are reviewed.",
      ],
      codingTrialOutcome:
        "Coding trial outcome: blocked if patch, command, validation, commit, or file boundaries are unclear.",
      researchTrialOutcome:
        "Research trial outcome: blocked if browsing, source fetching, citation, or provider boundaries are unclear.",
      connectorTrialOutcome:
        "Connector trial outcome: blocked if OAuth, connector reads, token, or private value boundaries are unclear.",
      automationTrialOutcome:
        "Automation trial outcome: blocked if reminder, schedule, background work, or notification boundaries are unclear.",
      creativeLocalBridgeTrialOutcome:
        "Creative/local bridge trial outcome: blocked if local tool launch, bridge endpoint, render, generation, or artifact boundaries are unclear.",
      providerGovernanceTrialOutcome:
        "Provider governance trial outcome: blocked if provider call, token spend, prompt/file send, apply, export, or secret boundaries are unclear.",
      projectKnowledgeTrialOutcome:
        "Project knowledge trial outcome: blocked if scan, local file, git, redaction, export, or memory boundaries are unclear.",
      crossLoopRisks: [
        "Cross-loop risks: unresolved loop risks stay blocked.",
      ],
      releaseReadinessRecommendation:
        "Release readiness recommendation: blocked until unresolved loop risks are reviewed and no execution is implied.",
      blockedReasons: [
        "Blocked reason: unresolved loop risks stay blocked.",
      ],
      dailyOperatorPolishRoute:
        "Daily operator polish route: /code-flow/final-polish remains review-only after blocked risks are resolved.",
      advancedReportDetails:
        "Advanced report details: blocked unified reports cannot recover by exporting files, executing workflows, calling APIs, writing files, promoting memory, mutating Brain graph data, or creating an MCP runtime.",
    }),
  ];
}

export function buildUnifiedWorkspaceRealWorldTrialReportBoundary(): UnifiedWorkspaceRealWorldTrialReportBoundary {
  return {
    unifiedWorkspaceTrialReportReviewOnly: true,
    unifiedTrialReportReviewedBeforeExportOrUse: true,
    noReportFileWrittenFromPage: true,
    unresolvedLoopRisksStayBlocked: true,
    reportExportAllowedFromUi: false,
    reportFileWrittenFromPage: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    codingTaskExecutionAllowedFromUi: false,
    taskExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commitCreationAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    sourceAutoFetchAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorDataReadFromPageAllowed: false,
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeUnifiedWorkspaceRealWorldTrialReport(
  model: Pick<UnifiedWorkspaceRealWorldTrialReportModel, "reports">
): string {
  return `Unified workspace real-world trial report prepares ${model.reports.length} release-readiness report posture(s). Unified trial report is reviewed before export or use, no report file is written from this page, and unresolved loop risks stay blocked.`;
}

export function buildUnifiedWorkspaceRealWorldTrialReportModel(): UnifiedWorkspaceRealWorldTrialReportModel {
  const reports = buildUnifiedWorkspaceRealWorldTrialReports();
  const model: UnifiedWorkspaceRealWorldTrialReportModel = {
    title: "Unified workspace real-world trial report",
    summary: "",
    reports,
    boundary: buildUnifiedWorkspaceRealWorldTrialReportBoundary(),
    reportLanguage: [...UNIFIED_WORKSPACE_REAL_WORLD_TRIAL_REPORT_LANGUAGE],
    advancedDetails: [
      "Unified workspace real-world trial report",
      "Unified trial report is reviewed before export or use",
      "No report file is written from this page",
      "Unresolved loop risks stay blocked",
      "Unified report identity",
      "Source real-world trial reviews",
      "Coding trial outcome",
      "Research trial outcome",
      "Connector trial outcome",
      "Automation trial outcome",
      "Creative/local bridge trial outcome",
      "Provider governance trial outcome",
      "Project knowledge trial outcome",
      "Cross-loop risks",
      "Release readiness recommendation",
      "Blocked reasons",
      "Daily operator polish route",
      "advanced report details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedWorkspaceRealWorldTrialReport(model) };
}
