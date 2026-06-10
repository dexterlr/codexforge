import type {
  ProjectKnowledgeRealWorldTrialReview,
  ProjectKnowledgeRealWorldTrialReviewBoundary,
  ProjectKnowledgeRealWorldTrialReviewModel,
} from "./project-knowledge-real-world-trial-review-types";
import { buildProjectKnowledgeRealWorldTrialReviewStableKey } from "./project-knowledge-real-world-trial-review-types";

export const PROJECT_KNOWLEDGE_REAL_WORLD_TRIAL_REVIEW_LANGUAGE = [
  "Project knowledge real-world trial review",
  "Project knowledge trial review does not scan files",
  "Project memory promotion requires explicit approval",
  "Secrets and local paths stay redacted",
  "Snapshot timeline decision runbook readiness",
  "Unified trial report route",
] as const;

export function buildProjectKnowledgeRealWorldTrialReview(
  input: Omit<ProjectKnowledgeRealWorldTrialReview, "id"> & { idHint: string }
): ProjectKnowledgeRealWorldTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildProjectKnowledgeRealWorldTrialReviewStableKey(
      "project-knowledge-real-world-trial-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildProjectKnowledgeRealWorldTrialReviews(): ProjectKnowledgeRealWorldTrialReview[] {
  return [
    buildProjectKnowledgeRealWorldTrialReview({
      idHint: "operator-project-context-review",
      status: "ready-for-review",
      projectKnowledgeTrialIdentity:
        "Project knowledge trial identity: project-knowledge-real-world-trial-review-operator-project-context-review.",
      sourceProjectKnowledgeReleaseCandidate:
        "Source project knowledge release candidate: /project-knowledge-release-candidate supplies snapshot, timeline, decision log, runbook, memory boundary, known gaps, and blocked reasons.",
      operatorProjectScenario:
        "Operator project scenario: a real operator reviews project knowledge readiness from already reviewed evidence without scanning files, reading local files, running git commands, exporting runbooks, or promoting memory.",
      snapshotTimelineDecisionRunbookReadiness:
        "Snapshot timeline decision runbook readiness: snapshot, timeline, decision, and runbook summaries are reviewed as static evidence only and do not scan files or open local paths.",
      memoryPromotionBoundary:
        "Memory promotion boundary: project memory promotion requires explicit approval and cannot happen automatically from this page.",
      redactionChecklist: [
        "Redaction checklist: secrets and local paths stay redacted before review.",
        "Redaction checklist: raw file contents, secret values, private paths, tokens, API keys, environment values, and git details stay out of the page.",
        "Redaction checklist: prompt/file/project data is not sent without a separate approval gate.",
      ],
      blockedRealActions: [
        "Blocked real actions: file scanning, local file reads, arbitrary project scanning, arbitrary local file browsing, arbitrary path crawling, auto-open local files, git command execution, runbook export, file writes, file export, file mutation, file deletion, and memory promotion.",
        "Blocked real actions: provider API calls, connector API calls, web/search API calls, source fetching/browsing, local bridge calls, local tool launches, render/generation jobs, commands, shell commands, tests, builds, smoke checks, patch apply behavior, commits, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, reminders, schedules, automations, background jobs, notifications, polling loops, plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, and MCP tool calls.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: ready when the operator can review snapshot, timeline, decision, runbook, redaction, and memory boundaries without scanning or reading files.",
        "Trial outcome notes: blocked if a request asks the page to scan files, browse local paths, run git, export runbooks, reveal secrets, or promote memory.",
      ],
      unifiedTrialReportRoute:
        "Unified trial report route: /unified-workspace-real-world-trial-report collects all loop trial summaries without exporting or executing anything.",
      advancedProjectKnowledgeTrialDetails:
        "Advanced project knowledge trial details: project knowledge real-world trial review is review-only and does not scan files, read local files, browse local files, crawl paths, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, write files, export files, write runbooks, apply patches, delete files, call providers, call connectors, call web/search APIs, fetch sources, browse sources, send prompt/file/project/connector data without approval, call local bridge endpoints, launch local tools, run render jobs, run generation jobs, ingest memory, ingest RAG, auto-promote memory, promote project memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProjectKnowledgeRealWorldTrialReview({
      idHint: "blocked-file-scan-request",
      status: "blocked",
      projectKnowledgeTrialIdentity:
        "Project knowledge trial identity: project-knowledge-real-world-trial-review-blocked-file-scan-request.",
      sourceProjectKnowledgeReleaseCandidate:
        "Source project knowledge release candidate: blocked until /project-knowledge-release-candidate confirms project knowledge review posture.",
      operatorProjectScenario:
        "Operator project scenario: blocked when the request asks this page to scan files, read local files, run git commands, export runbooks, reveal paths, or promote memory.",
      snapshotTimelineDecisionRunbookReadiness:
        "Snapshot timeline decision runbook readiness: blocked until reviewed evidence exists without scanning files.",
      memoryPromotionBoundary:
        "Memory promotion boundary: blocked because project memory promotion requires explicit approval.",
      redactionChecklist: [
        "Redaction checklist: blocked because secrets and local paths stay redacted.",
      ],
      blockedRealActions: [
        "Blocked real actions: every project scan, local file, git, provider, connector, command, automation, memory, plugin, tool, agent, and MCP action remains blocked.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: blocked until file, path, git, redaction, export, and memory boundaries are explicit.",
      ],
      unifiedTrialReportRoute:
        "Unified trial report route: /unified-workspace-real-world-trial-report remains the next review-only handoff after project knowledge review.",
      advancedProjectKnowledgeTrialDetails:
        "Advanced project knowledge trial details: blocked project knowledge reviews cannot recover by scanning files, reading local paths, running git, writing runbooks, calling APIs, displaying secrets, promoting memory, mutating Brain graph data, or creating an MCP runtime.",
    }),
  ];
}

export function buildProjectKnowledgeRealWorldTrialReviewBoundary(): ProjectKnowledgeRealWorldTrialReviewBoundary {
  return {
    projectKnowledgeTrialReviewOnly: true,
    projectKnowledgeTrialReviewDoesNotScanFiles: true,
    projectMemoryPromotionRequiresExplicitApproval: true,
    secretsAndLocalPathsStayRedacted: true,
    localProjectScanRunsFromPage: false,
    projectFilesReadFromPage: false,
    gitCommandsRunFromPage: false,
    memoryPromotedAutomatically: false,
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
    runbookFileWriteAllowedFromUi: false,
    runbookExportAllowedFromUi: false,
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

export function summarizeProjectKnowledgeRealWorldTrialReview(
  model: Pick<ProjectKnowledgeRealWorldTrialReviewModel, "reviews">
): string {
  return `Project knowledge real-world trial review prepares ${model.reviews.length} project knowledge trial posture(s). Project knowledge trial review does not scan files, project memory promotion requires explicit approval, and secrets and local paths stay redacted.`;
}

export function buildProjectKnowledgeRealWorldTrialReviewModel(): ProjectKnowledgeRealWorldTrialReviewModel {
  const reviews = buildProjectKnowledgeRealWorldTrialReviews();
  const model: ProjectKnowledgeRealWorldTrialReviewModel = {
    title: "Project knowledge real-world trial review",
    summary: "",
    reviews,
    boundary: buildProjectKnowledgeRealWorldTrialReviewBoundary(),
    trialReviewLanguage: [...PROJECT_KNOWLEDGE_REAL_WORLD_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Project knowledge real-world trial review",
      "Project knowledge trial review does not scan files",
      "Project memory promotion requires explicit approval",
      "Secrets and local paths stay redacted",
      "Project knowledge trial identity",
      "Source project knowledge release candidate",
      "Operator project scenario",
      "Snapshot timeline decision runbook readiness",
      "Memory promotion boundary",
      "Redaction checklist",
      "Blocked real actions",
      "Trial outcome notes",
      "Unified trial report route",
      "advanced project knowledge trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectKnowledgeRealWorldTrialReview(model) };
}
