import type {
  ProjectMemoryPromotionBoundaryModel,
  ProjectMemoryPromotionBoundaryPolicy,
  ProjectMemoryPromotionBoundaryReview,
} from "./project-memory-promotion-boundary-types";
import { buildProjectMemoryPromotionBoundaryStableKey } from "./project-memory-promotion-boundary-types";

export const PROJECT_MEMORY_PROMOTION_BOUNDARY_LANGUAGE = [
  "Project memory promotion boundary",
  "Memory promotion requires explicit review",
  "No project memory is promoted from this page",
  "Secrets and local paths stay redacted",
  "Candidate knowledge summary",
  "Knowledge release route",
] as const;

export function buildProjectMemoryPromotionBoundaryReview(
  input: Omit<ProjectMemoryPromotionBoundaryReview, "id"> & { idHint: string }
): ProjectMemoryPromotionBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildProjectMemoryPromotionBoundaryStableKey(
      "project-memory-promotion-boundary",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildProjectMemoryPromotionBoundaryReviews(): ProjectMemoryPromotionBoundaryReview[] {
  return [
    buildProjectMemoryPromotionBoundaryReview({
      idHint: "reviewed-project-knowledge-loop",
      status: "ready-for-review",
      promotionBoundaryIdentity:
        "Promotion boundary identity: project-memory-promotion-boundary-reviewed-project-knowledge-loop.",
      sourceSnapshotTimelineDecisionLogRunbook:
        "Source snapshot/timeline/decision log/runbook: reviewed snapshot, change timeline, decision log, and runbook export review provide the only project knowledge considered here.",
      candidateKnowledgeSummary:
        "Candidate knowledge summary: durable lessons, approved project scope, accepted decisions, unresolved questions, and safe handoff notes are summarized for human review only.",
      allowedPromotionScope: [
        "Allowed promotion scope: plain-English project lesson after explicit review.",
        "Allowed promotion scope: redacted project decision that has a reviewed rationale.",
        "Allowed promotion scope: reusable runbook note that excludes raw local paths, secrets, logs, and private provider or connector payloads.",
      ],
      deniedPromotionScope: [
        "Denied promotion scope: raw file contents, raw local paths, secrets, API keys, tokens, provider payloads, connector data, git history, test output, and unreviewed project scans.",
        "Denied promotion scope: automatic memory/RAG ingestion, Brain graph mutation, appendEvent calls, saveBrainGraph calls, and direct promotion from the UI.",
      ],
      redactionPrivacyChecklist: [
        "Redaction/privacy checklist: secrets and local paths stay redacted.",
        "Redaction/privacy checklist: private connector data is excluded.",
        "Redaction/privacy checklist: provider prompts, files, and project data are not sent without approval.",
        "Redaction/privacy checklist: local project knowledge remains review-only until an operator approves promotion elsewhere.",
      ],
      approvalRequirement:
        "Approval requirement: memory promotion requires explicit review in a separate approved memory boundary before any project memory can be promoted.",
      knowledgeReleaseRoute:
        "Knowledge release route: /project-knowledge-release-candidate audits the whole project knowledge loop after this promotion boundary is reviewed.",
      blockedReasons: [
        "Memory promotion requires explicit review",
        "No project memory is promoted from this page",
        "Secrets and local paths stay redacted",
      ],
      advancedMemoryDetails:
        "Advanced memory details: this page does not scan arbitrary local projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, write files, export files, write runbooks, apply patches, delete files, call providers, call connectors, call web/search APIs, send prompt/file/project data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProjectMemoryPromotionBoundaryReview({
      idHint: "blocked-unreviewed-project-knowledge",
      status: "blocked",
      promotionBoundaryIdentity:
        "Promotion boundary identity: project-memory-promotion-boundary-blocked-unreviewed-project-knowledge.",
      sourceSnapshotTimelineDecisionLogRunbook:
        "Source snapshot/timeline/decision log/runbook: blocked until snapshot, timeline, decision log, and runbook review are all accepted.",
      candidateKnowledgeSummary:
        "Candidate knowledge summary: unavailable because this page will not read project files, run git commands, rescan local paths, or infer missing knowledge automatically.",
      allowedPromotionScope: [
        "Allowed promotion scope: unavailable until reviewed local project knowledge exists.",
      ],
      deniedPromotionScope: [
        "Denied promotion scope: unreviewed project knowledge, raw local paths, raw files, secrets, provider payloads, connector data, and automatic memory promotion.",
      ],
      redactionPrivacyChecklist: [
        "Redaction/privacy checklist: blocked by default when reviewed sources are missing.",
        "Redaction/privacy checklist: secrets and local paths stay redacted even when the candidate is blocked.",
      ],
      approvalRequirement:
        "Approval requirement: blocked because memory promotion requires explicit review and no approved project memory boundary has accepted this candidate.",
      knowledgeReleaseRoute:
        "Knowledge release route: /project-knowledge-release-candidate stays available for release audit after the missing reviews are resolved.",
      blockedReasons: [
        "Reviewed project knowledge is missing",
        "Memory promotion requires explicit review",
        "No project memory is promoted from this page",
      ],
      advancedMemoryDetails:
        "Advanced memory details: blocked promotion cannot recover by scanning projects, reading files, reading git history, exporting runbooks, calling providers, calling connectors, ingesting memory, auto-promoting memory, mutating Brain graph, calling appendEvent, or calling saveBrainGraph.",
    }),
  ];
}

export function buildProjectMemoryPromotionBoundaryPolicy(): ProjectMemoryPromotionBoundaryPolicy {
  return {
    memoryPromotionRequiresExplicitReview: true,
    projectMemoryPromotedFromPage: false,
    secretsAndLocalPathsRedacted: true,
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

export function summarizeProjectMemoryPromotionBoundary(
  model: Pick<ProjectMemoryPromotionBoundaryModel, "reviews">
): string {
  return `Project memory promotion boundary prepares ${model.reviews.length} reviewed promotion state(s). Memory promotion requires explicit review, no project memory is promoted from this page, and secrets and local paths stay redacted.`;
}

export function buildProjectMemoryPromotionBoundaryModel(): ProjectMemoryPromotionBoundaryModel {
  const reviews = buildProjectMemoryPromotionBoundaryReviews();
  const model: ProjectMemoryPromotionBoundaryModel = {
    title: "Project memory promotion boundary",
    summary: "",
    reviews,
    boundary: buildProjectMemoryPromotionBoundaryPolicy(),
    promotionLanguage: [...PROJECT_MEMORY_PROMOTION_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Project memory promotion boundary",
      "Memory promotion requires explicit review",
      "No project memory is promoted from this page",
      "Secrets and local paths stay redacted",
      "Promotion boundary identity",
      "Source snapshot/timeline/decision log/runbook",
      "Candidate knowledge summary",
      "Allowed promotion scope",
      "Denied promotion scope",
      "Redaction/privacy checklist",
      "Approval requirement",
      "Knowledge release route",
      "Blocked reasons",
      "Advanced memory details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectMemoryPromotionBoundary(model) };
}
