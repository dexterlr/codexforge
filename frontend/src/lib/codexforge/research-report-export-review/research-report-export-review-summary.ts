import type {
  ResearchReportExportReview,
  ResearchReportExportReviewBoundary,
  ResearchReportExportReviewModel,
} from "./research-report-export-review-types";
import { buildResearchReportExportReviewStableKey } from "./research-report-export-review-types";

export const RESEARCH_REPORT_EXPORT_REVIEW_LANGUAGE = [
  "Research report export review",
  "Exports require review before use",
  "Reports are not exported automatically",
  "Sensitive data and secrets are excluded",
  "Export format options",
  "Approval requirement",
] as const;

export function buildResearchReportExportReview(
  input: Omit<ResearchReportExportReview, "id"> & { idHint: string }
): ResearchReportExportReview {
  const { idHint, ...review } = input;
  return {
    id: buildResearchReportExportReviewStableKey(
      "research-report-export-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildResearchReportExportReviews(): ResearchReportExportReview[] {
  return [
    buildResearchReportExportReview({
      idHint: "summary-ready-export-review",
      status: "review required",
      exportReviewIdentity: "Export review identity: research-report-export-review-summary-ready-export-review.",
      sourceSummaryDraftBuilder:
        "Source summary draft builder: /research-summary-draft-builder supplies a reviewed draft summary before export review can begin.",
      includedSectionsSummary:
        "Included sections summary: research question, reviewed claims, supporting evidence, citation notes, unresolved conflicts, exclusions, and approval note.",
      citationReadiness:
        "Citation readiness: citations remain draft-labeled until approved; missing metadata blocks export readiness.",
      excludedSensitiveData:
        "Excluded sensitive data: sensitive data and secrets are excluded, including private prompts, hidden memory, file paths, API keys, tokens, and secret-like values.",
      unresolvedConflictFlags:
        "Unresolved conflict flags: unresolved conflicts stay visible and must be approved, excluded, or marked blocked before use.",
      exportFormatOptions: [
        "Export format options: reviewed Markdown packet",
        "Export format options: reviewed plain-text report",
        "Export format options: reviewed citation appendix",
      ],
      approvalRequirement:
        "Approval requirement: exports require review before use and a human approval note before any future handoff.",
      nextRecommendedRoute:
        "Next recommended route: /research-summary-draft-builder for summary edits or /research-workspace for scope changes.",
      blockedReasons: [
        "Exports require review before use",
        "Reports are not exported automatically",
        "Sensitive data and secrets are excluded",
      ],
      advancedExportDetails:
        "Advanced export details: this review does not export files, write files, call providers, browse the web, fetch sources, auto-promote memory, ingest memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute tools, execute agents, call MCP tools, run commands, apply patches, delete files, or delete artifacts.",
    }),
    buildResearchReportExportReview({
      idHint: "blocked-unresolved-report",
      status: "blocked",
      exportReviewIdentity: "Export review identity: research-report-export-review-blocked-unresolved-report.",
      sourceSummaryDraftBuilder:
        "Source summary draft builder: blocked until the draft summary has reviewed claims, reviewed citations, and visible conflict handling.",
      includedSectionsSummary:
        "Included sections summary: blocked because required sections, citation notes, exclusions, or approval notes are missing.",
      citationReadiness:
        "Citation readiness: blocked because citation drafts are unapproved, missing metadata, or carry source quality flags.",
      excludedSensitiveData:
        "Excluded sensitive data: blocked until sensitive data and secrets are excluded from visible report content and handoff notes.",
      unresolvedConflictFlags:
        "Unresolved conflict flags: blocked conflicts remain visible and prevent report use.",
      exportFormatOptions: [
        "Export format options: blocked Markdown packet",
        "Export format options: blocked plain-text report",
        "Export format options: blocked citation appendix",
      ],
      approvalRequirement:
        "Approval requirement: blocked reports require reviewer approval before any future export path is considered.",
      nextRecommendedRoute:
        "Next recommended route: /research-citation-draft-review for citation cleanup or /research-summary-draft-builder for summary cleanup.",
      blockedReasons: [
        "Citation readiness incomplete",
        "Unresolved conflict flags remain open",
        "Approval requirement missing",
      ],
      advancedExportDetails:
        "Advanced export details: blocked report reviews cannot imply automatic report export, file export/write behavior, provider calls, source auto-fetching, auto-citation finalization, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, local file access, command execution, file deletion, or artifact deletion.",
    }),
  ];
}

export function buildResearchReportExportReviewBoundary(): ResearchReportExportReviewBoundary {
  return {
    exportReviewOnly: true,
    exportsRequireReviewBeforeUse: true,
    reportsNotExportedAutomatically: true,
    sensitiveDataAndSecretsExcluded: true,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderCallsAllowed: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    promptFileSourceAutoSendAllowed: false,
    sourceAutoSendAllowed: false,
    sourceAutoFetchAllowed: false,
    sourceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowed: false,
    evidenceAutoCitationAllowed: false,
    citationAutoFinalizationAllowed: false,
    automaticReportExportAllowed: false,
    reportAutoExportAllowed: false,
    fileExportAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    providerRetryAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionInstallAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpServerCreated: false,
    mcpClientCreated: false,
    mcpToolCallsAllowedFromUi: false,
    jarvisdPermissionAutoGrantAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    artifactDeletionAllowed: false,
    patchApplyAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeResearchReportExportReview(
  model: Pick<ResearchReportExportReviewModel, "reviews">
): string {
  return `Research report export review prepares ${model.reviews.length} export review posture(s). Exports require review before use, reports are not exported automatically, and sensitive data and secrets are excluded.`;
}

export function buildResearchReportExportReviewModel(): ResearchReportExportReviewModel {
  const reviews = buildResearchReportExportReviews();
  const model: ResearchReportExportReviewModel = {
    title: "Research report export review",
    summary: "",
    reviews,
    boundary: buildResearchReportExportReviewBoundary(),
    exportLanguage: [...RESEARCH_REPORT_EXPORT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Research report export review",
      "Exports require review before use",
      "Reports are not exported automatically",
      "Sensitive data and secrets are excluded",
      "Export review identity",
      "Source summary draft builder",
      "Included sections summary",
      "Citation readiness",
      "Excluded sensitive data",
      "Unresolved conflict flags",
      "Export format options",
      "Approval requirement",
      "Next recommended route",
      "Blocked reasons",
      "Advanced export details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchReportExportReview(model) };
}
