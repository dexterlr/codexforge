import type {
  ResearchProviderTrialReview,
  ResearchProviderTrialReviewBoundary,
  ResearchProviderTrialReviewModel,
} from "./research-provider-trial-review-types";
import { buildResearchProviderTrialReviewStableKey } from "./research-provider-trial-review-types";

export const RESEARCH_PROVIDER_TRIAL_REVIEW_LANGUAGE = [
  "Research provider trial review",
  "Research provider trial does not run research",
  "Research provider calls require explicit operator approval",
  "Evidence is not ingested automatically",
  "Research provider families",
  "Freshness conflict checklist",
] as const;

export function buildResearchProviderTrialReview(
  input: Omit<ResearchProviderTrialReview, "id"> & { idHint: string }
): ResearchProviderTrialReview {
  const { idHint, ...trial } = input;
  return {
    id: buildResearchProviderTrialReviewStableKey("research-provider-trial-review", idHint, input.status),
    ...trial,
  };
}

export function buildResearchProviderTrialReviews(): ResearchProviderTrialReview[] {
  return [
    buildResearchProviderTrialReview({
      idHint: "review-only-research-provider-lane",
      status: "ready-for-review",
      researchProviderTrialIdentity:
        "Research provider trial identity: research-provider-trial-review-review-only-research-provider-lane.",
      researchProviderFamilies: [
        "Research provider families: general web research, scholarly research, citation drafting, source conflict review, freshness review, connector-assisted evidence review, and local research support lanes are reviewed as labels only.",
        "Research provider families: provider choices stay advisory until an operator approves a future provider call outside this page.",
      ],
      evidenceCitationBoundaryNotes: [
        "Evidence and citation boundary notes: research provider trial does not run research, browse, search, fetch sources, or create citations from live data.",
        "Evidence and citation boundary notes: evidence is not ingested automatically and citation evidence stays reviewed before use.",
      ],
      freshnessConflictChecklist: [
        "Freshness conflict checklist: source date, conflict status, citation confidence, privacy status, connector scope, evidence owner, and manual recheck need explicit review.",
        "Freshness conflict checklist: missing freshness or conflicting evidence blocks the trial instead of starting a live search.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: research scope, source type, privacy class, provider family, connector boundary, freshness plan, evidence review, and explicit operator approval.",
        "Approval gate checklist: research provider calls require explicit operator approval before any future trial can run elsewhere.",
      ],
      deniedResearchProviderActions: [
        "Denied research provider actions: browsing, searching, fetching sources, connector calls, provider calls, prompt sending, evidence ingestion, output storage, citation generation, and workflow execution.",
        "Denied research provider actions: approval is reviewed here but never granted automatically.",
      ],
      blockedResearchTrialRisks: [
        "Blocked research trial risks: missing approval, stale source plan, conflicting evidence, connector uncertainty, private evidence exposure, output persistence request, prompt send request, and evidence ingestion request.",
        "Blocked research trial risks: any request to browse, search, fetch, or ingest evidence keeps the trial blocked.",
      ],
      codingProviderTrialRoute:
        "Coding provider trial route: /coding-provider-trial-review reviews coding provider readiness without applying code.",
      crossProviderComparisonRoute:
        "Cross-provider comparison route: /cross-provider-result-comparison compares provider suitability without calling providers.",
      nextRecommendedAction:
        "Next recommended action: review coding provider trial readiness, then compare provider suitability before requesting any explicit operator approval elsewhere.",
      advancedResearchProviderDetails:
        "Advanced research provider details: research provider trial review is review-only. Research provider trial does not run research, research provider calls require explicit operator approval, and evidence is not ingested automatically. It does not browse, search, fetch sources, run research, call providers, connect providers, test provider connections, route provider traffic, send prompts, create citations from live data, store outputs, ingest outputs, ingest evidence, call connectors, call web/search APIs, call GitHub APIs, call local models, call local bridge endpoints, send prompt/file/project/connector/provider/model/evidence/output data without approval, scan arbitrary projects, browse local files, crawl paths, read or open local files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildResearchProviderTrialReview({
      idHint: "blocked-live-research-request",
      status: "blocked",
      researchProviderTrialIdentity:
        "Research provider trial identity: research-provider-trial-review-blocked-live-research-request.",
      researchProviderFamilies: [
        "Research provider families: blocked when a request asks this page to select a provider and run live research.",
      ],
      evidenceCitationBoundaryNotes: [
        "Evidence and citation boundary notes: blocked because research provider trial does not run research or ingest evidence.",
      ],
      freshnessConflictChecklist: [
        "Freshness conflict checklist: blocked until freshness and conflict checks are reviewed manually.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: blocked until explicit operator approval is requested outside this page.",
      ],
      deniedResearchProviderActions: [
        "Denied research provider actions: provider calls, browsing, searching, fetching, evidence ingestion, output storage, and connector calls remain blocked.",
      ],
      blockedResearchTrialRisks: [
        "Blocked research trial risks: live research request, evidence ingestion request, and missing approval remain blocked.",
      ],
      codingProviderTrialRoute:
        "Coding provider trial route: /coding-provider-trial-review remains review-only.",
      crossProviderComparisonRoute:
        "Cross-provider comparison route: /cross-provider-result-comparison remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep research execution blocked and collect reviewed evidence requirements outside this page.",
      advancedResearchProviderDetails:
        "Advanced research provider details: blocked research provider trials cannot recover by browsing, searching, fetching, calling providers, storing outputs, ingesting evidence, writing files, or approving work from this page.",
    }),
  ];
}

export function buildResearchProviderTrialReviewBoundary(): ResearchProviderTrialReviewBoundary {
  return {
    researchProviderTrialReviewOnly: true,
    researchProviderTrialDoesNotRunResearch: true,
    researchProviderCallsRequireExplicitOperatorApproval: true,
    evidenceIsNotIngestedAutomatically: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    browsingAllowedFromUi: false,
    searchAllowedFromUi: false,
    sourceFetchAllowedFromUi: false,
    externalDataFetchingAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    evidenceAutoIngestionAllowed: false,
    providerApiCallsAllowedFromUi: false,
    researchProviderCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    providerOutputIngestionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelEvidenceOutputDataAutoSendAllowed: false,
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
    outputStorageAllowed: false,
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

export function summarizeResearchProviderTrialReview(
  model: Pick<ResearchProviderTrialReviewModel, "trials">
): string {
  return `Research provider trial review prepares ${model.trials.length} research provider trial posture(s). Research provider trial does not run research, research provider calls require explicit operator approval, and evidence is not ingested automatically.`;
}

export function buildResearchProviderTrialReviewModel(): ResearchProviderTrialReviewModel {
  const trials = buildResearchProviderTrialReviews();
  const model: ResearchProviderTrialReviewModel = {
    title: "Research provider trial review",
    summary: "",
    trials,
    boundary: buildResearchProviderTrialReviewBoundary(),
    trialLanguage: [...RESEARCH_PROVIDER_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Research provider trial review",
      "research provider trial identity",
      "Research provider families",
      "Evidence and citation boundary notes",
      "Freshness conflict checklist",
      "Approval gate checklist",
      "Denied research provider actions",
      "Blocked research trial risks",
      "Coding provider trial route",
      "Cross-provider comparison route",
      "Next recommended action",
      "Research provider trial does not run research",
      "Research provider calls require explicit operator approval",
      "Evidence is not ingested automatically",
      "advanced research provider details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchProviderTrialReview(model) };
}
