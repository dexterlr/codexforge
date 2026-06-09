import type {
  ProjectKnowledgeReleaseCandidate,
  ProjectKnowledgeReleaseCandidateBoundary,
  ProjectKnowledgeReleaseCandidateModel,
} from "./project-knowledge-release-candidate-types";
import { buildProjectKnowledgeReleaseCandidateStableKey } from "./project-knowledge-release-candidate-types";

export const PROJECT_KNOWLEDGE_RELEASE_CANDIDATE_LANGUAGE = [
  "Project knowledge release candidate",
  "Project knowledge release remains review-only",
  "No project files are read from this page",
  "No memory is promoted automatically",
  "Release decision",
  "Known gaps",
] as const;

export function buildProjectKnowledgeReleaseCandidate(
  input: Omit<ProjectKnowledgeReleaseCandidate, "id"> & { idHint: string }
): ProjectKnowledgeReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildProjectKnowledgeReleaseCandidateStableKey(
      "project-knowledge-release-candidate",
      idHint,
      input.releaseDecision
    ),
    ...candidate,
  };
}

export function buildProjectKnowledgeReleaseCandidates(): ProjectKnowledgeReleaseCandidate[] {
  return [
    buildProjectKnowledgeReleaseCandidate({
      idHint: "review-only-project-knowledge-loop",
      releaseDecision: "ready with fixes",
      releaseCandidateIdentity:
        "Release candidate identity: project-knowledge-release-candidate-review-only-project-knowledge-loop.",
      coveredProjectKnowledgeSurfaces: [
        "Covered project knowledge surface: /local-project-snapshot-review snapshot review.",
        "Covered project knowledge surface: /local-project-change-timeline change timeline review.",
        "Covered project knowledge surface: /local-project-decision-log decision log review.",
        "Covered project knowledge surface: /local-project-runbook-export-review runbook export review.",
        "Covered project knowledge surface: /project-memory-promotion-boundary memory promotion boundary.",
      ],
      snapshotReadiness:
        "Snapshot readiness: reviewed project scope is present and no local project scan runs from this release page.",
      timelineReadiness:
        "Timeline readiness: reviewed change events are present and no git history is read from this release page.",
      decisionLogReadiness:
        "Decision log readiness: decisions, rationales, affected areas, unresolved questions, and memory promotion policy stay visible for review.",
      runbookExportReadiness:
        "Runbook export readiness: runbook package is reviewed as text only and no runbook file is written or exported from this page.",
      memoryPromotionReadiness:
        "Memory promotion readiness: memory promotion requires explicit review and no memory is promoted automatically.",
      knownGaps: [
        "Known gaps: release still needs human acceptance of redaction and privacy posture.",
        "Known gaps: release cannot promote memory until a separate approved memory boundary accepts the candidate.",
        "Known gaps: release cannot export files, run tests, run git commands, or rescan project files from this page.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /unified-workspace-home-review starts consolidating the reviewed project knowledge loop into a coherent operator workspace.",
      advancedReleaseDetails:
        "Advanced release details: this project knowledge release candidate remains review-only and does not read project files, scan arbitrary local projects, browse local files, crawl paths, open files, read git history, run git commands, run shell commands, run tests, write files, export files, write runbooks, apply patches, delete files, call providers, call connectors, call web/search APIs, send prompt/file/project data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProjectKnowledgeReleaseCandidate({
      idHint: "blocked-unreviewed-memory-boundary",
      releaseDecision: "blocked",
      releaseCandidateIdentity:
        "Release candidate identity: project-knowledge-release-candidate-blocked-unreviewed-memory-boundary.",
      coveredProjectKnowledgeSurfaces: [
        "Covered project knowledge surface: blocked until promotion boundary review is complete.",
      ],
      snapshotReadiness:
        "Snapshot readiness: blocked if reviewed snapshot context is missing.",
      timelineReadiness:
        "Timeline readiness: blocked if reviewed timeline context is missing.",
      decisionLogReadiness:
        "Decision log readiness: blocked if decisions or unresolved questions are missing.",
      runbookExportReadiness:
        "Runbook export readiness: blocked if runbook review has not confirmed no file is written from the page.",
      memoryPromotionReadiness:
        "Memory promotion readiness: blocked until /project-memory-promotion-boundary confirms explicit review requirements.",
      knownGaps: [
        "Known gaps: memory promotion boundary not accepted.",
        "Known gaps: release decision cannot become ready by reading project files from this page.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /project-memory-promotion-boundary resolves memory promotion review before this release candidate continues.",
      advancedReleaseDetails:
        "Advanced release details: blocked release cannot recover by reading files, scanning paths, running git, exporting runbooks, calling providers, calling connectors, ingesting memory, promoting memory, mutating Brain graph, calling appendEvent, or calling saveBrainGraph.",
    }),
  ];
}

export function buildProjectKnowledgeReleaseCandidateBoundary(): ProjectKnowledgeReleaseCandidateBoundary {
  return {
    projectKnowledgeReleaseReviewOnly: true,
    projectFilesReadFromPage: false,
    memoryPromotedAutomatically: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    runbookFileWriteAllowedFromUi: false,
    runbookExportAllowedFromUi: false,
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
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeProjectKnowledgeReleaseCandidate(
  model: Pick<ProjectKnowledgeReleaseCandidateModel, "candidates">
): string {
  return `Project knowledge release candidate audits ${model.candidates.length} release posture(s). Project knowledge release remains review-only, no project files are read from this page, and no memory is promoted automatically.`;
}

export function buildProjectKnowledgeReleaseCandidateModel(): ProjectKnowledgeReleaseCandidateModel {
  const candidates = buildProjectKnowledgeReleaseCandidates();
  const model: ProjectKnowledgeReleaseCandidateModel = {
    title: "Project knowledge release candidate",
    summary: "",
    candidates,
    boundary: buildProjectKnowledgeReleaseCandidateBoundary(),
    releaseLanguage: [...PROJECT_KNOWLEDGE_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Project knowledge release candidate",
      "Project knowledge release remains review-only",
      "No project files are read from this page",
      "No memory is promoted automatically",
      "Release candidate identity",
      "Covered project knowledge surfaces",
      "Snapshot readiness",
      "Timeline readiness",
      "Decision log readiness",
      "Runbook export readiness",
      "Memory promotion readiness",
      "Known gaps",
      "Release decision",
      "Next recommended route",
      "Advanced release details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectKnowledgeReleaseCandidate(model) };
}
