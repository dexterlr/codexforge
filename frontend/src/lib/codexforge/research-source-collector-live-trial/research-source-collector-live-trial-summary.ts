import type {
  ResearchSourceCollectorBoundary,
  ResearchSourceCollectorTrial,
  ResearchSourceCollectorTrialModel,
} from "./research-source-collector-live-trial-types";
import { buildResearchSourceCollectorTrialStableKey } from "./research-source-collector-live-trial-types";

export const RESEARCH_SOURCE_COLLECTOR_TRIAL_LANGUAGE = [
  "Research source collector live trial",
  "Source collection requires explicit approval",
  "Sources are collected for review before use",
  "No source is fetched automatically from this page",
  "Citation attribution status",
  "Evidence inbox route",
] as const;

export function buildResearchSourceCollectorTrial(
  input: Omit<ResearchSourceCollectorTrial, "id"> & { idHint: string }
): ResearchSourceCollectorTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildResearchSourceCollectorTrialStableKey(
      "research-source-collector-live-trial",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildResearchSourceCollectorTrials(): ResearchSourceCollectorTrial[] {
  return [
    buildResearchSourceCollectorTrial({
      idHint: "reviewed-source-metadata-packet",
      status: "approval required",
      collectorTrialIdentity:
        "Collector trial identity: research-source-collector-live-trial-reviewed-source-metadata-packet.",
      sourceProviderBoundary:
        "Source provider boundary: /web-research-provider-boundary must approve provider, query, scope, privacy, and budget before any future source collection.",
      querySourceScopeSummary:
        "Query/source scope summary: narrow public research query with official and primary source preference, reviewed source count cap, and denied private/local scope.",
      collectedSourceSummary:
        "Collected source summary: modeled source metadata only, including title, publisher, date, source type, relevance note, and review status.",
      sourceQualitySignal:
        "Source quality signal: prefer primary, official, recent, attributable, non-duplicative, and directly relevant sources.",
      citationAttributionStatus:
        "Citation attribution status: citation details must be present before evidence can be cited, summarized, or moved to review.",
      duplicateSourceFreshnessNote:
        "Duplicate/source freshness note: duplicate sources are grouped, stale sources stay flagged, and missing dates remain blocked until reviewed.",
      redactionPrivacyStatus:
        "Redaction/privacy status: source metadata is redacted for secrets, private file names, hidden prompts, and sensitive user details before review.",
      evidenceInboxRoute:
        "Evidence inbox route: /research-evidence-inbox receives reviewed evidence packets after explicit approval.",
      blockedReasons: [
        "Source collection requires explicit approval",
        "Sources are collected for review before use",
        "No source is fetched automatically from this page",
      ],
      advancedSourceDetails:
        "Advanced source details: this source collector does not browse, call providers, fetch sources, ingest evidence, promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, execute tools, execute agents, call MCP tools, read local files, or write files.",
    }),
    buildResearchSourceCollectorTrial({
      idHint: "blocked-unapproved-collection",
      status: "blocked",
      collectorTrialIdentity:
        "Collector trial identity: research-source-collector-live-trial-blocked-unapproved-collection.",
      sourceProviderBoundary:
        "Source provider boundary: blocked because /web-research-provider-boundary has not approved query, source scope, privacy class, or budget.",
      querySourceScopeSummary:
        "Query/source scope summary: blocked when broad search, private source scope, credential-bearing content, or hidden local context is requested.",
      collectedSourceSummary:
        "Collected source summary: no sources are collected, normalized, cited, or moved forward while approval is missing.",
      sourceQualitySignal:
        "Source quality signal: blocked until source quality criteria and stale/conflict handling are reviewed.",
      citationAttributionStatus:
        "Citation attribution status: blocked when citation fields, publisher, date, or source route are missing.",
      duplicateSourceFreshnessNote:
        "Duplicate/source freshness note: blocked when freshness is unknown, conflicts are unresolved, or duplicates cannot be grouped.",
      redactionPrivacyStatus:
        "Redaction/privacy status: blocked until sensitive source details and secrets are excluded.",
      evidenceInboxRoute:
        "Evidence inbox route: /research-evidence-inbox stays review-only and receives nothing automatically.",
      blockedReasons: [
        "Provider boundary approval missing",
        "Source quality signal missing",
        "Redaction/privacy status missing",
      ],
      advancedSourceDetails:
        "Advanced source details: blocked collection cannot imply automatic browsing, web/search/provider calls, source fetching, source ingestion, citation, memory/RAG ingestion, token spend, command execution, file access, plugin execution, agent execution, or MCP runtime.",
    }),
  ];
}

export function buildResearchSourceCollectorBoundary(): ResearchSourceCollectorBoundary {
  return {
    sourceCollectorReviewOnly: true,
    sourceCollectionRequiresExplicitApproval: true,
    sourcesCollectedForReviewBeforeUse: true,
    noSourceFetchedAutomaticallyFromPage: true,
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

export function summarizeResearchSourceCollectorTrial(
  model: Pick<ResearchSourceCollectorTrialModel, "trials">
): string {
  return `Research source collector live trial models ${model.trials.length} source collection posture(s). Source collection requires explicit approval, sources are collected for review before use, and no source is fetched automatically from this page.`;
}

export function buildResearchSourceCollectorTrialModel(): ResearchSourceCollectorTrialModel {
  const trials = buildResearchSourceCollectorTrials();
  const model: ResearchSourceCollectorTrialModel = {
    title: "Research source collector live trial",
    summary: "",
    trials,
    boundary: buildResearchSourceCollectorBoundary(),
    collectorLanguage: [...RESEARCH_SOURCE_COLLECTOR_TRIAL_LANGUAGE],
    advancedDetails: [
      "Research source collector live trial",
      "Source collection requires explicit approval",
      "Sources are collected for review before use",
      "No source is fetched automatically from this page",
      "Collector trial identity",
      "Source provider boundary",
      "Query/source scope summary",
      "Collected source summary",
      "Source quality signal",
      "Citation attribution status",
      "Duplicate/source freshness note",
      "Redaction/privacy status",
      "Evidence inbox route",
      "Blocked reasons",
      "Advanced source details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchSourceCollectorTrial(model) };
}
