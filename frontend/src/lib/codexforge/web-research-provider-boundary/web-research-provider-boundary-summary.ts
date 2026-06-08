import type {
  WebResearchProviderBoundary,
  WebResearchProviderBoundaryModel,
  WebResearchProviderBoundaryReview,
} from "./web-research-provider-boundary-types";
import { buildWebResearchProviderBoundaryStableKey } from "./web-research-provider-boundary-types";

export const WEB_RESEARCH_PROVIDER_BOUNDARY_LANGUAGE = [
  "Web research provider boundary",
  "Web research provider calls require explicit approval",
  "No web or provider request is sent from this page",
  "API keys and secrets are never displayed",
  "Allowed source scope",
  "Budget rate limit guardrail",
] as const;

export function buildWebResearchProviderBoundaryReview(
  input: Omit<WebResearchProviderBoundaryReview, "id"> & { idHint: string }
): WebResearchProviderBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildWebResearchProviderBoundaryStableKey(
      "web-research-provider-boundary",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildWebResearchProviderBoundaryReviews(): WebResearchProviderBoundaryReview[] {
  return [
    buildWebResearchProviderBoundaryReview({
      idHint: "approved-narrow-public-query",
      status: "approval required",
      boundaryIdentity:
        "Boundary identity: web-research-provider-boundary-approved-narrow-public-query.",
      sourceResearchWorkspace:
        "Source research workspace: /research-workspace defines the reviewed question, source requirements, and evidence criteria first.",
      providerSearchMethodSummary:
        "Provider/search method summary: future approved web search would use a narrow public query and return source metadata for review only.",
      queryPrivacyClassification:
        "Query/privacy classification: public, low sensitivity, no private files, no secrets, no hidden memory context, and no raw user-sensitive details.",
      allowedSourceScope:
        "Allowed source scope: official pages, primary sources, reputable documentation, and dated articles that can be cited and reviewed.",
      deniedSourceScope:
        "Denied source scope: private files, hidden local paths, credential-bearing pages, unreviewed forums for factual claims, and sources outside the approved query.",
      budgetRateLimitGuardrail:
        "Budget rate limit guardrail: tiny reviewed request count, capped token budget, no retry loop, no automatic fallback, and no auto-spend tokens.",
      approvalRequirement:
        "Approval requirement: web research provider calls require explicit approval for provider, query summary, allowed scope, denied scope, budget, and redaction posture.",
      sourceCollectorRoute:
        "Source collector route: /research-source-collector-trial receives reviewed source metadata after future approval, not from this page.",
      blockedReasons: [
        "Web research provider calls require explicit approval",
        "No web or provider request is sent from this page",
        "API keys and secrets are never displayed",
      ],
      advancedBoundaryDetails:
        "Advanced boundary details: this page does not browse, call web/search/provider APIs, send prompts/files/sources, store API keys in localStorage, display secrets, retry provider requests, auto-spend tokens, fetch sources, ingest evidence, mutate memory, or execute tools.",
    }),
    buildWebResearchProviderBoundaryReview({
      idHint: "blocked-sensitive-query",
      status: "blocked",
      boundaryIdentity:
        "Boundary identity: web-research-provider-boundary-blocked-sensitive-query.",
      sourceResearchWorkspace:
        "Source research workspace: blocked until /research-workspace removes private files, secrets, hidden memory, or sensitive raw details from the query summary.",
      providerSearchMethodSummary:
        "Provider/search method summary: blocked because the future request scope is too broad or sensitive.",
      queryPrivacyClassification:
        "Query/privacy classification: sensitive by default when the query could expose private project, file, memory, account, credential, or health details.",
      allowedSourceScope:
        "Allowed source scope: none until the operator approves a narrowed public source scope.",
      deniedSourceScope:
        "Denied source scope: all providers, broad web search, private/local content, and automatic collection remain blocked.",
      budgetRateLimitGuardrail:
        "Budget rate limit guardrail: blocked because no explicit request cap, spend cap, or retry policy is approved.",
      approvalRequirement:
        "Approval requirement: blocked until explicit approval can name query, provider, privacy class, source scope, and budget.",
      sourceCollectorRoute:
        "Source collector route: /research-source-collector-trial remains unavailable for automatic collection.",
      blockedReasons: [
        "Sensitive query",
        "Allowed source scope missing",
        "Approval requirement missing",
      ],
      advancedBoundaryDetails:
        "Advanced boundary details: blocked boundaries cannot imply browser navigation, provider traffic, source fetching, source ingestion, token spending, local file reading, command execution, memory/RAG ingestion, Brain graph mutation, plugin execution, agent execution, or MCP calls.",
    }),
  ];
}

export function buildWebResearchProviderBoundary(): WebResearchProviderBoundary {
  return {
    webResearchBoundaryReviewOnly: true,
    explicitApprovalRequired: true,
    noWebOrProviderRequestSentFromPage: true,
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
    sourceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowed: false,
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
    providerRegistryMutationAllowed: false,
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

export function summarizeWebResearchProviderBoundary(
  model: Pick<WebResearchProviderBoundaryModel, "reviews">
): string {
  return `Web research provider boundary reviews ${model.reviews.length} future provider posture(s). Web research provider calls require explicit approval, no web or provider request is sent from this page, and API keys and secrets are never displayed.`;
}

export function buildWebResearchProviderBoundaryModel(): WebResearchProviderBoundaryModel {
  const reviews = buildWebResearchProviderBoundaryReviews();
  const model: WebResearchProviderBoundaryModel = {
    title: "Web research provider boundary",
    summary: "",
    reviews,
    boundary: buildWebResearchProviderBoundary(),
    boundaryLanguage: [...WEB_RESEARCH_PROVIDER_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Web research provider boundary",
      "Web research provider calls require explicit approval",
      "No web or provider request is sent from this page",
      "API keys and secrets are never displayed",
      "Boundary identity",
      "Source research workspace",
      "Provider/search method summary",
      "Query/privacy classification",
      "Allowed source scope",
      "Denied source scope",
      "Budget rate limit guardrail",
      "Approval requirement",
      "Source collector route",
      "Blocked reasons",
      "Advanced boundary details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeWebResearchProviderBoundary(model) };
}
