import type {
  ProjectKnowledgeSearchPreview,
  ProjectKnowledgeSearchPreviewBoundary,
  ProjectKnowledgeSearchPreviewModel,
} from "./project-knowledge-search-preview-types";
import { buildProjectKnowledgeSearchPreviewStableKey } from "./project-knowledge-search-preview-types";

export const PROJECT_KNOWLEDGE_SEARCH_PREVIEW_LANGUAGE = [
  "Project knowledge search preview",
  "Project knowledge search preview does not scan files",
  "Search results are simulated for review",
  "Private project details stay redacted",
  "Searchable knowledge groups",
  "Ranking preview",
] as const;

export function buildProjectKnowledgeSearchPreview(
  input: Omit<ProjectKnowledgeSearchPreview, "id"> & { idHint: string }
): ProjectKnowledgeSearchPreview {
  const { idHint, ...preview } = input;
  return {
    id: buildProjectKnowledgeSearchPreviewStableKey("project-knowledge-search-preview", idHint, input.status),
    ...preview,
  };
}

export function buildProjectKnowledgeSearchPreviews(): ProjectKnowledgeSearchPreview[] {
  return [
    buildProjectKnowledgeSearchPreview({
      idHint: "reviewed-project-knowledge-groups",
      status: "ready-for-review",
      projectKnowledgeSearchIdentity:
        "Project knowledge search identity: project-knowledge-search-preview-reviewed-project-knowledge-groups.",
      searchableKnowledgeGroups: [
        "Searchable knowledge groups: reviewed project snapshot summaries, reviewed change timeline summaries, reviewed decision log summaries, reviewed runbook notes, reviewed memory promotion boundary, and reviewed project knowledge release candidate notes.",
        "Searchable knowledge groups: labels, routes, redacted summaries, readiness states, and blocked reasons only.",
      ],
      deniedSearchScopes: [
        "Denied search scopes: project knowledge search preview does not scan files.",
        "Denied search scopes: raw file contents, arbitrary local files, private local paths, git history, provider payloads, connector data, web sources, secrets, tokens, and unreviewed project details remain denied.",
      ],
      redactionPrivacySummary: [
        "Redaction and privacy summary: private project details stay redacted.",
        "Redaction and privacy summary: simulated results show safe labels and redacted summaries, not raw project data.",
      ],
      rankingPreview: [
        "Ranking preview: exact reviewed route matches rank first, blocked safety gaps rank above convenience matches, and private unapproved sources rank as unavailable.",
        "Ranking preview: search results are simulated for review and do not come from a live search.",
      ],
      blockedSearchRisks: [
        "Blocked search risks: file scanning, local file reads, arbitrary project browsing, path crawling, live search, query persistence, evidence ingestion, memory mutation, and API calls.",
        "Blocked search risks: any prompt/file/project/connector/search/evidence data sending without approval remains blocked.",
      ],
      unifiedSearchCandidateRoute:
        "Unified search candidate route: /unified-workspace-search-release-candidate reviews release readiness without running live search.",
      privacyAuditRoute:
        "Privacy audit route: /local-first-privacy-audit reviews privacy boundaries before any source can become searchable.",
      nextRecommendedAction:
        "Next recommended action: review denied search scopes and redaction posture before opening the unified search candidate.",
      advancedSearchDetails:
        "Advanced search details: project knowledge search preview is review-only. Project knowledge search preview does not scan files, search results are simulated for review, and private project details stay redacted. It does not execute actions, approve actions, automate approval, run live search, run search, persist search queries, scan project files, read project files, read local files, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/search/evidence data without approval, browse local files, crawl paths, read or open arbitrary local files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProjectKnowledgeSearchPreview({
      idHint: "blocked-file-scan-request",
      status: "blocked",
      projectKnowledgeSearchIdentity:
        "Project knowledge search identity: project-knowledge-search-preview-blocked-file-scan-request.",
      searchableKnowledgeGroups: [
        "Searchable knowledge groups: blocked because the request asks for unreviewed project file scanning.",
      ],
      deniedSearchScopes: [
        "Denied search scopes: raw local files, arbitrary paths, and unreviewed project directories remain denied.",
      ],
      redactionPrivacySummary: [
        "Redaction and privacy summary: private project details stay redacted.",
      ],
      rankingPreview: [
        "Ranking preview: blocked file scan requests appear as unavailable and are not searched.",
      ],
      blockedSearchRisks: [
        "Blocked search risks: project scan, local file read, live search, query persistence, provider call, connector call, local bridge call, file write, evidence ingestion, and memory promotion.",
      ],
      unifiedSearchCandidateRoute:
        "Unified search candidate route: /unified-workspace-search-release-candidate cannot approve denied scopes automatically.",
      privacyAuditRoute:
        "Privacy audit route: /local-first-privacy-audit keeps private data local until reviewed.",
      nextRecommendedAction:
        "Next recommended action: keep the search request blocked and ask for a reviewed redacted project summary instead.",
      advancedSearchDetails:
        "Advanced search details: blocked project knowledge search cannot recover by scanning files, reading files, running search, calling APIs, persisting queries, ingesting evidence, or promoting memory from this page.",
    }),
  ];
}

export function buildProjectKnowledgeSearchPreviewBoundary(): ProjectKnowledgeSearchPreviewBoundary {
  return {
    projectKnowledgeSearchPreviewReviewOnly: true,
    projectKnowledgeSearchPreviewDoesNotScanFiles: true,
    searchResultsAreSimulatedForReview: true,
    privateProjectDetailsStayRedacted: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    liveSearchExecutionAllowedFromUi: false,
    searchExecutionAllowedFromUi: false,
    searchQueryPersistenceAllowedFromUi: false,
    projectFileScanAllowedFromUi: false,
    projectFilesReadFromPage: false,
    localFileReadAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorSearchEvidenceDataAutoSendAllowed: false,
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
    evidenceIngestionAllowedFromUi: false,
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

export function summarizeProjectKnowledgeSearchPreview(
  model: Pick<ProjectKnowledgeSearchPreviewModel, "previews">
): string {
  return `Project knowledge search preview prepares ${model.previews.length} safe search preview posture(s). Project knowledge search preview does not scan files, search results are simulated for review, and private project details stay redacted.`;
}

export function buildProjectKnowledgeSearchPreviewModel(): ProjectKnowledgeSearchPreviewModel {
  const previews = buildProjectKnowledgeSearchPreviews();
  const model: ProjectKnowledgeSearchPreviewModel = {
    title: "Project knowledge search preview",
    summary: "",
    previews,
    boundary: buildProjectKnowledgeSearchPreviewBoundary(),
    searchLanguage: [...PROJECT_KNOWLEDGE_SEARCH_PREVIEW_LANGUAGE],
    advancedDetails: [
      "Project knowledge search preview",
      "Project knowledge search identity",
      "Searchable knowledge groups",
      "Denied search scopes",
      "Redaction and privacy summary",
      "Ranking preview",
      "Blocked search risks",
      "Unified search candidate route",
      "Privacy audit route",
      "Next recommended action",
      "Project knowledge search preview does not scan files",
      "Search results are simulated for review",
      "Private project details stay redacted",
      "advanced search details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectKnowledgeSearchPreview(model) };
}
