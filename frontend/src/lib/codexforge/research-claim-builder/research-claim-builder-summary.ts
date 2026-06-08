import type {
  ResearchClaimBuilderBoundary,
  ResearchClaimBuilderClaim,
  ResearchClaimBuilderModel,
} from "./research-claim-builder-types";
import { buildResearchClaimBuilderStableKey } from "./research-claim-builder-types";

export const RESEARCH_CLAIM_BUILDER_LANGUAGE = [
  "Research claim builder",
  "Claims are reviewed before use",
  "Conflicting or stale evidence stays flagged",
  "Memory is not auto-promoted",
  "Supporting evidence summary",
  "Citation draft route",
] as const;

export function buildResearchClaimBuilderClaim(
  input: Omit<ResearchClaimBuilderClaim, "id"> & { idHint: string }
): ResearchClaimBuilderClaim {
  const { idHint, ...claim } = input;
  return {
    id: buildResearchClaimBuilderStableKey("research-claim-builder", idHint, input.status),
    ...claim,
  };
}

export function buildResearchClaimBuilderClaims(): ResearchClaimBuilderClaim[] {
  return [
    buildResearchClaimBuilderClaim({
      idHint: "reviewed-evidence-proposed-claim",
      status: "review required",
      claimBuilderIdentity: "Claim builder identity: research-claim-builder-reviewed-evidence-proposed-claim.",
      sourceEvidenceReviewInbox:
        "Source evidence review inbox: /research-evidence-inbox provides reviewed evidence packets before a proposed claim can be drafted.",
      proposedClaimSummary:
        "Proposed claim summary: draft one plain-English claim from reviewed evidence, with scope, qualifier, and review status visible.",
      supportingEvidenceSummary:
        "Supporting evidence summary: cite-ready evidence is summarized as source quality, relevance, freshness, and privacy status without raw research JSON above the fold.",
      conflictingStaleEvidenceFlags:
        "Conflicting/stale evidence flags: conflicting or stale evidence stays flagged and cannot be hidden by a stronger-looking claim.",
      confidenceQualitySignal:
        "Confidence/quality signal: medium confidence until a human reviews source quality, coverage, freshness, and conflict handling.",
      citationDraftRoute:
        "Citation draft route: /research-citation-draft-review prepares draft citations only after the claim is reviewed.",
      summaryDraftRoute:
        "Summary draft route: /research-summary-draft-builder can use reviewed claims only, not unreviewed evidence.",
      blockedReasons: [
        "Claims are reviewed before use",
        "Conflicting or stale evidence stays flagged",
        "Memory is not auto-promoted",
      ],
      advancedClaimDetails:
        "Advanced claim details: this builder does not browse the web, call providers, fetch sources, auto-cite, finalize citations, ingest evidence, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, export reports, write files, execute tools, execute agents, call MCP tools, run commands, or apply patches.",
    }),
    buildResearchClaimBuilderClaim({
      idHint: "blocked-unresolved-evidence",
      status: "blocked",
      claimBuilderIdentity: "Claim builder identity: research-claim-builder-blocked-unresolved-evidence.",
      sourceEvidenceReviewInbox:
        "Source evidence review inbox: blocked until /research-evidence-inbox resolves stale, conflicting, missing, or sensitive evidence.",
      proposedClaimSummary:
        "Proposed claim summary: blocked because the claim would overstate evidence coverage or erase unresolved conflict notes.",
      supportingEvidenceSummary:
        "Supporting evidence summary: blocked evidence remains summarized as missing attribution, stale source date, unresolved conflict, or redaction concern.",
      conflictingStaleEvidenceFlags:
        "Conflicting/stale evidence flags: unresolved conflicts stay attached to the claim candidate until a reviewer marks them resolved or unusable.",
      confidenceQualitySignal:
        "Confidence/quality signal: low confidence because source quality, freshness, or attribution is not ready for claim review.",
      citationDraftRoute:
        "Citation draft route: /research-citation-draft-review remains blocked until the claim is reviewed.",
      summaryDraftRoute:
        "Summary draft route: /research-summary-draft-builder remains blocked until the claim is reviewed.",
      blockedReasons: [
        "Evidence review incomplete",
        "Conflict/staleness signal unresolved",
        "Citation readiness missing",
      ],
      advancedClaimDetails:
        "Advanced claim details: blocked claim candidates cannot imply source fetching, automatic browsing, provider traffic, prompt/file/source sending, auto-citation finalization, report export, file export/write behavior, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, local file access, or command execution.",
    }),
  ];
}

export function buildResearchClaimBuilderBoundary(): ResearchClaimBuilderBoundary {
  return {
    claimBuilderReviewOnly: true,
    claimsReviewedBeforeUse: true,
    conflictingOrStaleEvidenceStaysFlagged: true,
    memoryNotAutoPromoted: true,
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

export function summarizeResearchClaimBuilder(
  model: Pick<ResearchClaimBuilderModel, "claims">
): string {
  return `Research claim builder prepares ${model.claims.length} proposed claim posture(s) from reviewed evidence. Claims are reviewed before use, conflicting or stale evidence stays flagged, and memory is not auto-promoted.`;
}

export function buildResearchClaimBuilderModel(): ResearchClaimBuilderModel {
  const claims = buildResearchClaimBuilderClaims();
  const model: ResearchClaimBuilderModel = {
    title: "Research claim builder",
    summary: "",
    claims,
    boundary: buildResearchClaimBuilderBoundary(),
    claimLanguage: [...RESEARCH_CLAIM_BUILDER_LANGUAGE],
    advancedDetails: [
      "Research claim builder",
      "Claims are reviewed before use",
      "Conflicting or stale evidence stays flagged",
      "Memory is not auto-promoted",
      "Claim builder identity",
      "Source evidence review inbox",
      "Proposed claim summary",
      "Supporting evidence summary",
      "Conflicting/stale evidence flags",
      "Confidence/quality signal",
      "Citation draft route",
      "Summary draft route",
      "Blocked reasons",
      "Advanced claim details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchClaimBuilder(model) };
}
