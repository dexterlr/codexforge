import type {
  CrossProviderResultComparison,
  CrossProviderResultComparisonBoundary,
  CrossProviderResultComparisonModel,
} from "./cross-provider-result-comparison-types";
import { buildCrossProviderResultComparisonStableKey } from "./cross-provider-result-comparison-types";

export const CROSS_PROVIDER_RESULT_COMPARISON_LANGUAGE = [
  "Cross-provider result comparison",
  "Cross-provider comparison does not call providers",
  "Provider comparisons are reviewed before use",
  "Private outputs stay redacted",
  "Comparison groups",
  "Validation evidence comparison",
] as const;

export function buildCrossProviderResultComparison(
  input: Omit<CrossProviderResultComparison, "id"> & { idHint: string }
): CrossProviderResultComparison {
  const { idHint, ...comparison } = input;
  return {
    id: buildCrossProviderResultComparisonStableKey("cross-provider-result-comparison", idHint, input.status),
    ...comparison,
  };
}

export function buildCrossProviderResultComparisons(): CrossProviderResultComparison[] {
  return [
    buildCrossProviderResultComparison({
      idHint: "review-only-provider-suitability",
      status: "ready-for-review",
      crossProviderComparisonIdentity:
        "Cross-provider comparison identity: cross-provider-result-comparison-review-only-provider-suitability.",
      comparisonGroups: [
        "Comparison groups: creative provider trials, research provider trials, coding provider trials, local model trials, cost and rate-limit review, safety regression review, and provider response review are compared as reviewed summaries only.",
        "Comparison groups: cross-provider comparison does not call providers, route traffic, store outputs, or ingest responses.",
      ],
      creativeResearchCodingProviderComparison: [
        "Creative/research/coding provider comparison: creative providers are judged on asset boundary readiness, research providers on evidence and citation boundaries, and coding providers on patch and validation boundaries.",
        "Creative/research/coding provider comparison: suitability is advisory until provider comparisons are reviewed before use.",
      ],
      safetyComparison: [
        "Safety comparison: missing approval, prompt privacy uncertainty, credential risk, unsafe retry, private output exposure, and unclear validation evidence keep provider selection blocked.",
        "Safety comparison: private outputs stay redacted and are not displayed or stored by this page.",
      ],
      costRateComparison: [
        "Cost/rate comparison: budget status, rate-limit posture, retry limits, fallback policy, and manual owner are compared from static review notes.",
        "Cost/rate comparison: this page does not fetch billing, test connections, spend tokens, or route live provider traffic.",
      ],
      validationEvidenceComparison: [
        "Validation evidence comparison: trial owner, reviewed prompt class, expected output handling, safety status, cost posture, and manual validation notes are compared.",
        "Validation evidence comparison: missing evidence blocks selection rather than starting a provider call or storing provider output.",
      ],
      deniedComparisonActions: [
        "Denied comparison actions: provider calls, prompt sending, provider connection tests, provider routing, response ingestion, output storage, credential storage, billing fetch, connector calls, web/search calls, and GitHub calls.",
        "Denied comparison actions: approval is reviewed here but never granted automatically.",
      ],
      blockedComparisonRisks: [
        "Blocked comparison risks: unreviewed private output, missing trial approval, stale cost posture, unresolved safety regression, missing validation evidence, credential exposure, and request to route live traffic.",
        "Blocked comparison risks: any request to call providers or store outputs keeps the comparison blocked.",
      ],
      providerSelectionUxRoute:
        "Provider selection UX route: /provider-routing-readiness-audit reviews provider selection UX without routing live traffic.",
      providerAuditTrailRoute:
        "Provider audit trail route: /provider-audit-log reviews audit trail posture without calling provider or GitHub APIs.",
      nextRecommendedAction:
        "Next recommended action: review blocked risks, then use provider selection UX only as an approval-gated planning step.",
      advancedComparisonDetails:
        "Advanced comparison details: cross-provider result comparison is review-only. Cross-provider comparison does not call providers, provider comparisons are reviewed before use, and private outputs stay redacted. It does not call providers, connect providers, test provider connections, route provider traffic, send prompts, store outputs, ingest outputs, ingest responses, fetch billing, spend tokens, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/output data without approval, scan arbitrary projects, browse local files, crawl paths, read or open local files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCrossProviderResultComparison({
      idHint: "blocked-live-comparison-request",
      status: "blocked",
      crossProviderComparisonIdentity:
        "Cross-provider comparison identity: cross-provider-result-comparison-blocked-live-comparison-request.",
      comparisonGroups: [
        "Comparison groups: blocked when a request asks this page to compare providers by calling them live.",
      ],
      creativeResearchCodingProviderComparison: [
        "Creative/research/coding provider comparison: blocked because provider suitability cannot be generated from live traffic here.",
      ],
      safetyComparison: [
        "Safety comparison: blocked until private outputs stay redacted and reviewed evidence exists.",
      ],
      costRateComparison: [
        "Cost/rate comparison: blocked because this page does not fetch billing, spend tokens, retry providers, or test connections.",
      ],
      validationEvidenceComparison: [
        "Validation evidence comparison: blocked because missing evidence cannot trigger provider calls or output ingestion.",
      ],
      deniedComparisonActions: [
        "Denied comparison actions: provider calls, output storage, response ingestion, prompt sending, routing, and credential use remain blocked.",
      ],
      blockedComparisonRisks: [
        "Blocked comparison risks: live provider call request, private output exposure request, response ingestion request, and missing approval remain blocked.",
      ],
      providerSelectionUxRoute:
        "Provider selection UX route: /provider-routing-readiness-audit remains review-only.",
      providerAuditTrailRoute:
        "Provider audit trail route: /provider-audit-log remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep live comparison blocked and collect reviewed provider trial summaries outside this page.",
      advancedComparisonDetails:
        "Advanced comparison details: blocked cross-provider comparisons cannot recover by calling providers, routing traffic, storing outputs, ingesting responses, writing files, or approving provider use from this page.",
    }),
  ];
}

export function buildCrossProviderResultComparisonBoundary(): CrossProviderResultComparisonBoundary {
  return {
    crossProviderResultComparisonReviewOnly: true,
    crossProviderComparisonDoesNotCallProviders: true,
    providerComparisonsAreReviewedBeforeUse: true,
    privateOutputsStayRedacted: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    providerOutputIngestionAllowedFromUi: false,
    responseIngestionAllowedFromUi: false,
    outputStorageAllowed: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelOutputDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
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
    credentialStorageAllowed: false,
    endpointStorageAllowed: false,
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeCrossProviderResultComparison(
  model: Pick<CrossProviderResultComparisonModel, "comparisons">
): string {
  return `Cross-provider result comparison prepares ${model.comparisons.length} comparison posture(s). Cross-provider comparison does not call providers, provider comparisons are reviewed before use, and private outputs stay redacted.`;
}

export function buildCrossProviderResultComparisonModel(): CrossProviderResultComparisonModel {
  const comparisons = buildCrossProviderResultComparisons();
  const model: CrossProviderResultComparisonModel = {
    title: "Cross-provider result comparison",
    summary: "",
    comparisons,
    boundary: buildCrossProviderResultComparisonBoundary(),
    comparisonLanguage: [...CROSS_PROVIDER_RESULT_COMPARISON_LANGUAGE],
    advancedDetails: [
      "Cross-provider result comparison",
      "cross-provider comparison identity",
      "Comparison groups",
      "Creative/research/coding provider comparison",
      "Safety comparison",
      "Cost/rate comparison",
      "Validation evidence comparison",
      "Denied comparison actions",
      "Blocked comparison risks",
      "Provider selection UX route",
      "Provider audit trail route",
      "Next recommended action",
      "Cross-provider comparison does not call providers",
      "Provider comparisons are reviewed before use",
      "Private outputs stay redacted",
      "advanced comparison details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCrossProviderResultComparison(model) };
}
