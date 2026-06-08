import type {
  ResearchSummaryDraft,
  ResearchSummaryDraftBuilderBoundary,
  ResearchSummaryDraftBuilderModel,
} from "./research-summary-draft-builder-types";
import { buildResearchSummaryDraftBuilderStableKey } from "./research-summary-draft-builder-types";

export const RESEARCH_SUMMARY_DRAFT_BUILDER_LANGUAGE = [
  "Research summary draft builder",
  "Summaries are drafts until reviewed",
  "Unresolved conflicts stay visible",
  "Summaries are not auto-promoted to memory",
  "Evidence coverage summary",
  "Report export route",
] as const;

export function buildResearchSummaryDraft(
  input: Omit<ResearchSummaryDraft, "id"> & { idHint: string }
): ResearchSummaryDraft {
  const { idHint, ...summary } = input;
  return {
    id: buildResearchSummaryDraftBuilderStableKey(
      "research-summary-draft-builder",
      idHint,
      input.status
    ),
    ...summary,
  };
}

export function buildResearchSummaryDrafts(): ResearchSummaryDraft[] {
  return [
    buildResearchSummaryDraft({
      idHint: "reviewed-claims-summary-draft",
      status: "review required",
      summaryDraftIdentity:
        "Summary draft identity: research-summary-draft-builder-reviewed-claims-summary-draft.",
      sourceClaimBuilder:
        "Source claim builder: /research-claim-builder supplies reviewed claim candidates before summary drafting.",
      sourceCitationDraftReview:
        "Source citation draft review: /research-citation-draft-review supplies approved draft citations and missing metadata flags.",
      draftSummarySections: [
        "Draft summary sections: question, reviewed claims, supporting evidence, unresolved conflicts, citation readiness, and review notes",
        "Draft summary sections: summary copy remains a draft and does not become a final report automatically",
      ],
      evidenceCoverageSummary:
        "Evidence coverage summary: coverage is described as complete, partial, or blocked based on reviewed claim support and source quality notes.",
      unresolvedConflicts:
        "Unresolved conflicts: unresolved conflicts stay visible beside the draft summary until a reviewer resolves or excludes them.",
      citationReadiness:
        "Citation readiness: citations must remain draft-labeled until the citation draft review approves metadata and attribution.",
      reportExportRoute:
        "Report export route: /research-report-export-review reviews a draft report before any export or handoff.",
      blockedReasons: [
        "Summaries are drafts until reviewed",
        "Unresolved conflicts stay visible",
        "Summaries are not auto-promoted to memory",
      ],
      advancedSummaryDetails:
        "Advanced summary details: this builder does not call providers, browse the web, fetch sources, auto-export reports, write files, auto-promote memory, ingest memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute tools, execute agents, call MCP tools, run commands, or apply patches.",
    }),
    buildResearchSummaryDraft({
      idHint: "blocked-unready-citations",
      status: "blocked",
      summaryDraftIdentity: "Summary draft identity: research-summary-draft-builder-blocked-unready-citations.",
      sourceClaimBuilder:
        "Source claim builder: blocked until proposed claims are reviewed and conflict flags are handled.",
      sourceCitationDraftReview:
        "Source citation draft review: blocked until citation metadata, attribution readiness, and source quality flags are reviewed.",
      draftSummarySections: [
        "Draft summary sections: blocked introduction, blocked claim synthesis, blocked evidence coverage, and blocked citation note",
        "Draft summary sections: blocked drafts cannot be treated as final reports or exported automatically",
      ],
      evidenceCoverageSummary:
        "Evidence coverage summary: blocked because claim support, citation metadata, or evidence coverage is incomplete.",
      unresolvedConflicts:
        "Unresolved conflicts: unresolved conflicts stay visible and prevent a clean summary draft handoff.",
      citationReadiness:
        "Citation readiness: blocked because citations remain unapproved drafts or have missing metadata.",
      reportExportRoute:
        "Report export route: /research-report-export-review remains blocked until summary review is ready.",
      blockedReasons: [
        "Claim review incomplete",
        "Citation readiness incomplete",
        "Unresolved conflicts stay visible",
      ],
      advancedSummaryDetails:
        "Advanced summary details: blocked summaries cannot imply automatic browsing, provider traffic, source auto-fetching, auto-citation finalization, automatic report export, file export/write behavior, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, local file access, or command execution.",
    }),
  ];
}

export function buildResearchSummaryDraftBuilderBoundary(): ResearchSummaryDraftBuilderBoundary {
  return {
    summaryDraftReviewOnly: true,
    summariesDraftsUntilReviewed: true,
    unresolvedConflictsStayVisible: true,
    summariesNotAutoPromotedToMemory: true,
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

export function summarizeResearchSummaryDraftBuilder(
  model: Pick<ResearchSummaryDraftBuilderModel, "summaries">
): string {
  return `Research summary draft builder prepares ${model.summaries.length} summary draft posture(s). Summaries are drafts until reviewed, unresolved conflicts stay visible, and summaries are not auto-promoted to memory.`;
}

export function buildResearchSummaryDraftBuilderModel(): ResearchSummaryDraftBuilderModel {
  const summaries = buildResearchSummaryDrafts();
  const model: ResearchSummaryDraftBuilderModel = {
    title: "Research summary draft builder",
    summary: "",
    summaries,
    boundary: buildResearchSummaryDraftBuilderBoundary(),
    summaryLanguage: [...RESEARCH_SUMMARY_DRAFT_BUILDER_LANGUAGE],
    advancedDetails: [
      "Research summary draft builder",
      "Summaries are drafts until reviewed",
      "Unresolved conflicts stay visible",
      "Summaries are not auto-promoted to memory",
      "Summary draft identity",
      "Source claim builder",
      "Source citation draft review",
      "Draft summary sections",
      "Evidence coverage summary",
      "Unresolved conflicts",
      "Citation readiness",
      "Report export route",
      "Blocked reasons",
      "Advanced summary details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchSummaryDraftBuilder(model) };
}
