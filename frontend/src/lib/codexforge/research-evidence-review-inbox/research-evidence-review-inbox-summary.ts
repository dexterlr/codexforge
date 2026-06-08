import type {
  ResearchEvidenceReviewBoundary,
  ResearchEvidenceReviewInboxModel,
  ResearchEvidenceReviewPacket,
} from "./research-evidence-review-inbox-types";
import { buildResearchEvidenceReviewInboxStableKey } from "./research-evidence-review-inbox-types";

export const RESEARCH_EVIDENCE_REVIEW_INBOX_LANGUAGE = [
  "Research evidence review inbox",
  "Evidence is reviewed before use",
  "Memory promotion requires explicit review",
  "Stale or conflicting sources stay flagged",
  "Citation readiness",
  "Promotion policy",
] as const;

export function buildResearchEvidenceReviewPacket(
  input: Omit<ResearchEvidenceReviewPacket, "id"> & { idHint: string }
): ResearchEvidenceReviewPacket {
  const { idHint, ...packet } = input;
  return {
    id: buildResearchEvidenceReviewInboxStableKey(
      "research-evidence-review-inbox",
      idHint,
      input.status
    ),
    ...packet,
  };
}

export function buildResearchEvidenceReviewPackets(): ResearchEvidenceReviewPacket[] {
  return [
    buildResearchEvidenceReviewPacket({
      idHint: "reviewed-citable-evidence",
      status: "review required",
      evidenceInboxIdentity:
        "Evidence inbox identity: research-evidence-review-inbox-reviewed-citable-evidence.",
      sourceCollectorTrial:
        "Source collector trial: /research-source-collector-trial provides reviewed source metadata before an evidence packet can be evaluated.",
      evidencePacketSummary:
        "Evidence packet summary: concise finding, source route, citation fields, relevance note, freshness note, conflict flag, and redaction status.",
      citationReadiness:
        "Citation readiness: ready for human review only when source title, publisher, date, route, attribution, and relevance are present.",
      sourceQualityStatus:
        "Source quality status: primary or official sources are preferred; secondary sources need clear attribution and quality notes.",
      conflictStalenessSignal:
        "Conflict/staleness signal: stale or conflicting sources stay flagged and cannot be silently cited, summarized, or promoted.",
      redactionPrivacyStatus:
        "Redaction/privacy status: secrets, private file names, hidden prompts, personal data, and sensitive context stay excluded before review.",
      promotionPolicy:
        "Promotion policy: memory promotion requires explicit review, no automatic Brain graph mutation, and no automatic appendEvent or saveBrainGraph action from UI.",
      nextRecommendedRoute:
        "Next recommended route: /research-workspace for scope changes or /memory for a separately reviewed future memory candidate.",
      blockedReasons: [
        "Evidence is reviewed before use",
        "Memory promotion requires explicit review",
        "Stale or conflicting sources stay flagged",
      ],
      advancedEvidenceDetails:
        "Advanced evidence details: this inbox does not call providers, browse web pages, fetch sources, auto-cite, auto-summarize, ingest memory, promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, execute tools, execute agents, call MCP tools, read local files, write files, or apply patches.",
    }),
    buildResearchEvidenceReviewPacket({
      idHint: "blocked-stale-conflict",
      status: "blocked",
      evidenceInboxIdentity:
        "Evidence inbox identity: research-evidence-review-inbox-blocked-stale-conflict.",
      sourceCollectorTrial:
        "Source collector trial: blocked when source collector approval, citation metadata, quality signal, or redaction status is missing.",
      evidencePacketSummary:
        "Evidence packet summary: blocked because the finding is stale, conflicting, unattributed, sensitive, or disconnected from source review.",
      citationReadiness:
        "Citation readiness: blocked until attribution, route, publisher, date, and relevance can be reviewed.",
      sourceQualityStatus:
        "Source quality status: blocked when quality is unknown, source is duplicative, or the source class is not appropriate for the claim.",
      conflictStalenessSignal:
        "Conflict/staleness signal: blocked sources stay flagged until a human resolves the conflict or marks the evidence unusable.",
      redactionPrivacyStatus:
        "Redaction/privacy status: blocked until sensitive details and secret-like values are excluded.",
      promotionPolicy:
        "Promotion policy: blocked packets cannot be used, cited, summarized, or promoted to memory.",
      nextRecommendedRoute:
        "Next recommended route: /research-source-collector-trial for source cleanup before another evidence review.",
      blockedReasons: [
        "Citation readiness missing",
        "Source quality status unresolved",
        "Conflict/staleness signal unresolved",
      ],
      advancedEvidenceDetails:
        "Advanced evidence details: blocked evidence cannot imply provider calls, web browsing, source fetching, automatic citation, evidence ingestion, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, command execution, local file access, plugin execution, agent execution, or MCP runtime.",
    }),
  ];
}

export function buildResearchEvidenceReviewBoundary(): ResearchEvidenceReviewBoundary {
  return {
    evidenceInboxReviewOnly: true,
    evidenceReviewedBeforeUse: true,
    memoryPromotionRequiresExplicitReview: true,
    staleOrConflictingSourcesStayFlagged: true,
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
    evidenceAutoPromotionAllowed: false,
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

export function summarizeResearchEvidenceReviewInbox(
  model: Pick<ResearchEvidenceReviewInboxModel, "packets">
): string {
  return `Research evidence review inbox reviews ${model.packets.length} evidence packet posture(s). Evidence is reviewed before use, memory promotion requires explicit review, and stale or conflicting sources stay flagged.`;
}

export function buildResearchEvidenceReviewInboxModel(): ResearchEvidenceReviewInboxModel {
  const packets = buildResearchEvidenceReviewPackets();
  const model: ResearchEvidenceReviewInboxModel = {
    title: "Research evidence review inbox",
    summary: "",
    packets,
    boundary: buildResearchEvidenceReviewBoundary(),
    inboxLanguage: [...RESEARCH_EVIDENCE_REVIEW_INBOX_LANGUAGE],
    advancedDetails: [
      "Research evidence review inbox",
      "Evidence is reviewed before use",
      "Memory promotion requires explicit review",
      "Stale or conflicting sources stay flagged",
      "Evidence inbox identity",
      "Source collector trial",
      "Evidence packet summary",
      "Citation readiness",
      "Source quality status",
      "Conflict/staleness signal",
      "Redaction/privacy status",
      "Promotion policy",
      "Next recommended route",
      "Blocked reasons",
      "Advanced evidence details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchEvidenceReviewInbox(model) };
}
