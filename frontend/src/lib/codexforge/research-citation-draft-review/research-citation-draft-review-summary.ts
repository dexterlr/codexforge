import type {
  ResearchCitationDraft,
  ResearchCitationDraftReviewBoundary,
  ResearchCitationDraftReviewModel,
} from "./research-citation-draft-review-types";
import { buildResearchCitationDraftReviewStableKey } from "./research-citation-draft-review-types";

export const RESEARCH_CITATION_DRAFT_REVIEW_LANGUAGE = [
  "Research citation draft review",
  "Citations are drafts until approved",
  "Missing metadata remains flagged",
  "No citation is exported automatically",
  "Attribution readiness",
  "Citation format note",
] as const;

export function buildResearchCitationDraft(
  input: Omit<ResearchCitationDraft, "id"> & { idHint: string }
): ResearchCitationDraft {
  const { idHint, ...citation } = input;
  return {
    id: buildResearchCitationDraftReviewStableKey(
      "research-citation-draft-review",
      idHint,
      input.status
    ),
    ...citation,
  };
}

export function buildResearchCitationDrafts(): ResearchCitationDraft[] {
  return [
    buildResearchCitationDraft({
      idHint: "claim-backed-draft-citation",
      status: "review required",
      citationReviewIdentity:
        "Citation review identity: research-citation-draft-review-claim-backed-draft-citation.",
      sourceClaimBuilder:
        "Source claim builder: /research-claim-builder supplies reviewed proposed claims before citation drafts can be reviewed.",
      sourceEvidenceInbox:
        "Source evidence inbox: /research-evidence-inbox supplies reviewed source metadata and evidence quality notes.",
      draftCitationSummary:
        "Draft citation summary: title, publisher, date, route, attribution note, claim link, source quality, and review status.",
      attributionReadiness:
        "Attribution readiness: ready for human review when author or publisher, source title, access route, date, and claim support are visible.",
      missingMetadataFlags:
        "Missing metadata flags: missing metadata remains flagged until a reviewer confirms the citation can be approved or rejected.",
      sourceQualityFlags:
        "Source quality flags: source authority, freshness, conflicts, duplicates, and redaction status stay visible.",
      citationFormatNote:
        "Citation format note: format is a draft note for review, not a finalized citation style or exported bibliography.",
      summaryDraftRoute:
        "Summary draft route: /research-summary-draft-builder can use approved citation drafts only after review.",
      blockedReasons: [
        "Citations are drafts until approved",
        "Missing metadata remains flagged",
        "No citation is exported automatically",
      ],
      advancedCitationDetails:
        "Advanced citation details: this review does not browse the web, fetch sources, call providers, auto-cite final output, finalize citations, export citations, export reports, write files, ingest memory, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute tools, execute agents, call MCP tools, run commands, or apply patches.",
    }),
    buildResearchCitationDraft({
      idHint: "blocked-missing-metadata",
      status: "blocked",
      citationReviewIdentity: "Citation review identity: research-citation-draft-review-blocked-missing-metadata.",
      sourceClaimBuilder:
        "Source claim builder: blocked until the linked claim is reviewed and has support that matches the evidence packet.",
      sourceEvidenceInbox:
        "Source evidence inbox: blocked until evidence metadata includes title, source route, publisher or author, date, and quality status.",
      draftCitationSummary:
        "Draft citation summary: blocked because attribution is incomplete, stale, conflicting, or sensitive.",
      attributionReadiness:
        "Attribution readiness: not ready because missing attribution would make the draft look more final than it is.",
      missingMetadataFlags:
        "Missing metadata flags: missing publisher, date, source route, or claim support remains visible.",
      sourceQualityFlags:
        "Source quality flags: blocked sources keep conflict, stale, duplicate, low-quality, or redaction flags attached.",
      citationFormatNote:
        "Citation format note: no citation is exported automatically and no final citation format is implied.",
      summaryDraftRoute:
        "Summary draft route: /research-summary-draft-builder remains blocked until citation review approves the draft.",
      blockedReasons: [
        "Claim review incomplete",
        "Missing metadata remains flagged",
        "Source quality flags unresolved",
      ],
      advancedCitationDetails:
        "Advanced citation details: blocked citation drafts cannot imply source auto-fetching, automatic browsing, provider calls, auto-citation finalization, file export/write behavior, automatic report export, memory/RAG ingestion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, local file access, or command execution.",
    }),
  ];
}

export function buildResearchCitationDraftReviewBoundary(): ResearchCitationDraftReviewBoundary {
  return {
    citationDraftReviewOnly: true,
    citationsDraftsUntilApproved: true,
    missingMetadataRemainsFlagged: true,
    noCitationExportedAutomatically: true,
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
    citationFinalizationAllowedFromUi: false,
    automaticCitationExportAllowed: false,
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

export function summarizeResearchCitationDraftReview(
  model: Pick<ResearchCitationDraftReviewModel, "citations">
): string {
  return `Research citation draft review prepares ${model.citations.length} citation draft posture(s). Citations are drafts until approved, missing metadata remains flagged, and no citation is exported automatically.`;
}

export function buildResearchCitationDraftReviewModel(): ResearchCitationDraftReviewModel {
  const citations = buildResearchCitationDrafts();
  const model: ResearchCitationDraftReviewModel = {
    title: "Research citation draft review",
    summary: "",
    citations,
    boundary: buildResearchCitationDraftReviewBoundary(),
    citationLanguage: [...RESEARCH_CITATION_DRAFT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Research citation draft review",
      "Citations are drafts until approved",
      "Missing metadata remains flagged",
      "No citation is exported automatically",
      "Citation review identity",
      "Source claim builder",
      "Source evidence inbox",
      "Draft citation summary",
      "Attribution readiness",
      "Missing metadata flags",
      "Source quality flags",
      "Citation format note",
      "Summary draft route",
      "Blocked reasons",
      "Advanced citation details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchCitationDraftReview(model) };
}
