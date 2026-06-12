import type {
  CreativeProviderTrialReview,
  CreativeProviderTrialReviewBoundary,
  CreativeProviderTrialReviewModel,
} from "./creative-provider-trial-review-types";
import { buildCreativeProviderTrialReviewStableKey } from "./creative-provider-trial-review-types";

export const CREATIVE_PROVIDER_TRIAL_REVIEW_LANGUAGE = [
  "Creative provider trial review",
  "Creative provider trial does not generate assets",
  "Creative provider calls require explicit operator approval",
  "Generated assets are reviewed before use",
  "Creative provider families",
  "Asset generation boundary notes",
] as const;

export function buildCreativeProviderTrialReview(
  input: Omit<CreativeProviderTrialReview, "id"> & { idHint: string }
): CreativeProviderTrialReview {
  const { idHint, ...trial } = input;
  return {
    id: buildCreativeProviderTrialReviewStableKey("creative-provider-trial-review", idHint, input.status),
    ...trial,
  };
}

export function buildCreativeProviderTrialReviews(): CreativeProviderTrialReview[] {
  return [
    buildCreativeProviderTrialReview({
      idHint: "review-only-creative-provider-lane",
      status: "ready-for-review",
      creativeProviderTrialIdentity:
        "Creative provider trial identity: creative-provider-trial-review-review-only-creative-provider-lane.",
      creativeProviderFamilies: [
        "Creative provider families: image, video, audio, storyboard, style transfer, local creative runtime, and cloud creative provider lanes are reviewed as labels only.",
        "Creative provider families: provider choices stay advisory until an operator approves a future provider call outside this page.",
      ],
      assetGenerationBoundaryNotes: [
        "Asset generation boundary notes: creative provider trial does not generate assets, queue jobs, create files, or export media.",
        "Asset generation boundary notes: generated assets are reviewed before use and no generated output is stored from this page.",
      ],
      localBridgeDependencyNotes: [
        "Local bridge dependency notes: local bridge readiness is a dependency note only; this page does not call local bridge endpoints or launch local tools.",
        "Local bridge dependency notes: local endpoints, credentials, prompts, and output details stay redacted.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: creative intent, prompt privacy, provider family, cost posture, local bridge boundary, output review, and explicit operator approval.",
        "Approval gate checklist: creative provider calls require explicit operator approval before any future trial can run elsewhere.",
      ],
      deniedCreativeProviderActions: [
        "Denied creative provider actions: provider calls, prompt sending, asset generation, local bridge calls, local tool launches, output storage, output ingestion, file writes, exports, and workflow execution.",
        "Denied creative provider actions: approval is reviewed here but never granted automatically.",
      ],
      blockedCreativeTrialRisks: [
        "Blocked creative trial risks: missing approval, unresolved provider privacy, unreviewed generated assets, local bridge dependency uncertainty, output persistence request, prompt send request, and file mutation request.",
        "Blocked creative trial risks: any request to generate images, video, audio, or other assets keeps the trial blocked.",
      ],
      researchProviderTrialRoute:
        "Research provider trial route: /research-provider-trial-review reviews research provider readiness without running research.",
      crossProviderComparisonRoute:
        "Cross-provider comparison route: /cross-provider-result-comparison compares provider suitability without calling providers.",
      nextRecommendedAction:
        "Next recommended action: review research and coding provider trials, then compare provider suitability before requesting any explicit operator approval elsewhere.",
      advancedCreativeProviderDetails:
        "Advanced creative provider details: creative provider trial review is review-only. Creative provider trial does not generate assets, creative provider calls require explicit operator approval, and generated assets are reviewed before use. It does not call providers, connect providers, test provider connections, route provider traffic, send prompts, generate media, generate images, generate video, create assets, call local models, call local bridge endpoints, launch local tools, store outputs, ingest outputs, store credentials, store tokens, store endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/output data without approval, scan arbitrary projects, browse local files, crawl paths, read or open local files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCreativeProviderTrialReview({
      idHint: "blocked-generation-request",
      status: "blocked",
      creativeProviderTrialIdentity:
        "Creative provider trial identity: creative-provider-trial-review-blocked-generation-request.",
      creativeProviderFamilies: [
        "Creative provider families: blocked when a request asks this page to choose a live provider and generate assets.",
      ],
      assetGenerationBoundaryNotes: [
        "Asset generation boundary notes: blocked because creative provider trial does not generate assets.",
      ],
      localBridgeDependencyNotes: [
        "Local bridge dependency notes: blocked because local bridge endpoint calls and local tool launching are denied here.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: blocked until explicit operator approval is requested outside this page.",
      ],
      deniedCreativeProviderActions: [
        "Denied creative provider actions: provider calls, prompt sending, generation, output storage, and local bridge calls remain blocked.",
      ],
      blockedCreativeTrialRisks: [
        "Blocked creative trial risks: live generation request, output persistence request, and missing approval remain blocked.",
      ],
      researchProviderTrialRoute:
        "Research provider trial route: /research-provider-trial-review remains review-only.",
      crossProviderComparisonRoute:
        "Cross-provider comparison route: /cross-provider-result-comparison remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep generation blocked and collect a reviewed approval packet outside this page.",
      advancedCreativeProviderDetails:
        "Advanced creative provider details: blocked creative provider trials cannot recover by calling providers, generating assets, storing outputs, writing files, or approving work from this page.",
    }),
  ];
}

export function buildCreativeProviderTrialReviewBoundary(): CreativeProviderTrialReviewBoundary {
  return {
    creativeProviderTrialReviewOnly: true,
    creativeProviderTrialDoesNotGenerateAssets: true,
    creativeProviderCallsRequireExplicitOperatorApproval: true,
    generatedAssetsAreReviewedBeforeUse: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    creativeWorkflowExecutionAllowedFromUi: false,
    assetGenerationAllowedFromUi: false,
    mediaGenerationAllowedFromUi: false,
    imageGenerationAllowedFromUi: false,
    videoGenerationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    creativeProviderCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    providerOutputIngestionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
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

export function summarizeCreativeProviderTrialReview(
  model: Pick<CreativeProviderTrialReviewModel, "trials">
): string {
  return `Creative provider trial review prepares ${model.trials.length} creative provider trial posture(s). Creative provider trial does not generate assets, creative provider calls require explicit operator approval, and generated assets are reviewed before use.`;
}

export function buildCreativeProviderTrialReviewModel(): CreativeProviderTrialReviewModel {
  const trials = buildCreativeProviderTrialReviews();
  const model: CreativeProviderTrialReviewModel = {
    title: "Creative provider trial review",
    summary: "",
    trials,
    boundary: buildCreativeProviderTrialReviewBoundary(),
    trialLanguage: [...CREATIVE_PROVIDER_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Creative provider trial review",
      "creative provider trial identity",
      "Creative provider families",
      "Asset generation boundary notes",
      "Local bridge dependency notes",
      "Approval gate checklist",
      "Denied creative provider actions",
      "Blocked creative trial risks",
      "Research provider trial route",
      "Cross-provider comparison route",
      "Next recommended action",
      "Creative provider trial does not generate assets",
      "Creative provider calls require explicit operator approval",
      "Generated assets are reviewed before use",
      "advanced creative provider details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCreativeProviderTrialReview(model) };
}
