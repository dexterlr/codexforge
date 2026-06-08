import type {
  ResearchFreshnessRecheckBoundary,
  ResearchFreshnessRecheckBoundaryModel,
  ResearchFreshnessRecheckBoundaryReview,
} from "./research-freshness-recheck-boundary-types";
import { buildResearchFreshnessRecheckBoundaryStableKey } from "./research-freshness-recheck-boundary-types";

export const RESEARCH_FRESHNESS_RECHECK_BOUNDARY_LANGUAGE = [
  "Research freshness recheck boundary",
  "Freshness rechecks require explicit approval",
  "No source is refreshed from this page",
  "API keys and secrets are never displayed",
  "Allowed recheck scope",
  "Budget rate-limit guardrail",
] as const;

export function buildResearchFreshnessRecheckBoundaryReview(
  input: Omit<ResearchFreshnessRecheckBoundaryReview, "id"> & { idHint: string }
): ResearchFreshnessRecheckBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildResearchFreshnessRecheckBoundaryStableKey(
      "research-freshness-recheck-boundary",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildResearchFreshnessRecheckBoundaryReviews(): ResearchFreshnessRecheckBoundaryReview[] {
  return [
    buildResearchFreshnessRecheckBoundaryReview({
      idHint: "narrow-stale-source-recheck",
      status: "approval required",
      freshnessBoundaryIdentity:
        "Freshness boundary identity: research-freshness-recheck-boundary-narrow-stale-source-recheck.",
      sourceConflictResolver:
        "Source conflict resolver: /evidence-conflict-resolver-review supplies the stale or conflicting source that needs boundary review.",
      sourceReportDependency:
        "Source/report dependency: the stale source affects a draft claim, citation draft, summary draft, or report export review, but no output is changed here.",
      staleSourceSummary:
        "Stale source summary: one reviewed source is old, disputed, missing a date, or superseded and must remain flagged until review.",
      allowedRecheckScope:
        "Allowed recheck scope: one named public source or one narrow query, limited to the approved claim context and citation metadata needed for review.",
      deniedRecheckScope:
        "Denied recheck scope: broad web browsing, private local files, hidden prompts, credential-bearing pages, unrelated sources, automatic source collection, and automatic evidence update.",
      providerWebBoundaryDependency:
        "Provider/web boundary dependency: /web-research-provider-boundary must approve provider, query, privacy class, budget, and allowed source scope before any future recheck.",
      budgetRateLimitGuardrail:
        "Budget rate-limit guardrail: cap source count, provider spend, retry count, and request cadence before any future approved recheck.",
      approvalRequirement:
        "Approval requirement: freshness rechecks require explicit approval before any future provider, web, or source request.",
      blockedReasons: [
        "Freshness rechecks require explicit approval",
        "No source is refreshed from this page",
        "API keys and secrets are never displayed",
      ],
      advancedFreshnessDetails:
        "Advanced freshness details: this boundary does not browse the web, call providers, fetch sources, refresh sources, recheck freshness, update evidence, ingest evidence, auto-cite, finalize citations, export reports, write files, display API keys, display secrets, ingest memory, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, apply patches, delete files, or delete artifacts.",
    }),
    buildResearchFreshnessRecheckBoundaryReview({
      idHint: "blocked-broad-recheck",
      status: "blocked",
      freshnessBoundaryIdentity:
        "Freshness boundary identity: research-freshness-recheck-boundary-blocked-broad-recheck.",
      sourceConflictResolver:
        "Source conflict resolver: blocked until /evidence-conflict-resolver-review names the source, claim, conflict, and stale signal.",
      sourceReportDependency:
        "Source/report dependency: blocked when the affected claim, citation, summary, or report section is not identified.",
      staleSourceSummary:
        "Stale source summary: blocked when stale source details are vague, broad, private, unreviewed, or missing source metadata.",
      allowedRecheckScope:
        "Allowed recheck scope: blocked until a narrow public source or exact reviewed source target is approved.",
      deniedRecheckScope:
        "Denied recheck scope: broad crawling, arbitrary local file browsing, secret-bearing sources, automatic provider sends, automatic source refresh, and automatic evidence update remain denied.",
      providerWebBoundaryDependency:
        "Provider/web boundary dependency: blocked until /web-research-provider-boundary approves scope, privacy, and budget.",
      budgetRateLimitGuardrail:
        "Budget rate-limit guardrail: blocked until request caps, retry caps, spend caps, and rate-limit behavior are written in plain English.",
      approvalRequirement:
        "Approval requirement: blocked because explicit approval is missing.",
      blockedReasons: [
        "Allowed recheck scope missing",
        "Provider/web boundary dependency missing",
        "Budget rate-limit guardrail missing",
      ],
      advancedFreshnessDetails:
        "Advanced freshness details: blocked freshness reviews cannot imply source auto-fetching, source refresh, freshness auto-recheck, web/search/provider API calls, automatic provider send, prompt/file/source sending without approval, auto-spend tokens, evidence auto-update, auto-citation finalization, automatic report export, file export/write behavior, API key display, secret display, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP tool calls, local file access, command execution, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildResearchFreshnessRecheckBoundary(): ResearchFreshnessRecheckBoundary {
  return {
    freshnessRecheckBoundaryReviewOnly: true,
    freshnessRechecksRequireExplicitApproval: true,
    noSourceRefreshedFromPage: true,
    apiKeysAndSecretsNeverDisplayed: true,
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
    sourceAutoRefreshAllowed: false,
    sourceRefreshAllowedFromUi: false,
    sourceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowed: false,
    evidenceAutoUpdateAllowed: false,
    evidenceAutoCitationAllowed: false,
    citationAutoFinalizationAllowed: false,
    automaticReportExportAllowed: false,
    reportAutoExportAllowed: false,
    fileExportAllowedFromUi: false,
    freshnessAutoRecheckAllowed: false,
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

export function summarizeResearchFreshnessRecheckBoundary(
  model: Pick<ResearchFreshnessRecheckBoundaryModel, "reviews">
): string {
  return `Research freshness recheck boundary prepares ${model.reviews.length} freshness boundary posture(s). Freshness rechecks require explicit approval, no source is refreshed from this page, and API keys and secrets are never displayed.`;
}

export function buildResearchFreshnessRecheckBoundaryModel(): ResearchFreshnessRecheckBoundaryModel {
  const reviews = buildResearchFreshnessRecheckBoundaryReviews();
  const model: ResearchFreshnessRecheckBoundaryModel = {
    title: "Research freshness recheck boundary",
    summary: "",
    reviews,
    boundary: buildResearchFreshnessRecheckBoundary(),
    freshnessLanguage: [...RESEARCH_FRESHNESS_RECHECK_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Research freshness recheck boundary",
      "Freshness rechecks require explicit approval",
      "No source is refreshed from this page",
      "API keys and secrets are never displayed",
      "Freshness boundary identity",
      "Source conflict resolver",
      "Source/report dependency",
      "Stale source summary",
      "Allowed recheck scope",
      "Denied recheck scope",
      "Provider/web boundary dependency",
      "Budget rate-limit guardrail",
      "Approval requirement",
      "Blocked reasons",
      "Advanced freshness details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchFreshnessRecheckBoundary(model) };
}
