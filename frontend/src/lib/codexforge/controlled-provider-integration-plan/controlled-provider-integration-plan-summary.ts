import type {
  ControlledProviderIntegrationPlan,
  ControlledProviderIntegrationPlanBoundary,
  ControlledProviderIntegrationPlanModel,
} from "./controlled-provider-integration-plan-types";
import { buildControlledProviderIntegrationPlanStableKey } from "./controlled-provider-integration-plan-types";

export const CONTROLLED_PROVIDER_INTEGRATION_PLAN_LANGUAGE = [
  "Controlled provider integration plan",
  "Provider integration plan does not connect providers",
  "Provider traffic requires explicit approval",
  "Keys and tokens are never displayed or stored here",
  "Provider families",
  "OpenAI-compatible API lane",
] as const;

export function buildControlledProviderIntegrationPlan(
  input: Omit<ControlledProviderIntegrationPlan, "id"> & { idHint: string }
): ControlledProviderIntegrationPlan {
  const { idHint, ...plan } = input;
  return {
    id: buildControlledProviderIntegrationPlanStableKey("controlled-provider-integration-plan", idHint, input.status),
    ...plan,
  };
}

export function buildControlledProviderIntegrationPlans(): ControlledProviderIntegrationPlan[] {
  return [
    buildControlledProviderIntegrationPlan({
      idHint: "review-only-provider-lanes",
      status: "ready-for-review",
      providerIntegrationPlanIdentity:
        "Provider integration plan identity: controlled-provider-integration-plan-review-only-provider-lanes.",
      providerFamilies: [
        "Provider families: OpenAI-compatible API providers, local model providers, creative providers, research providers, coding providers, connector-adjacent providers, and manual review fallback.",
        "Provider families: every provider family is a planning lane only; provider integration plan does not connect providers.",
      ],
      openAICompatibleApiLane: [
        "OpenAI-compatible API lane: planned for future explicit approval packets, redacted key handling, model allowlists, budget gates, no prompt/file/project data send by default, and no live traffic from this page.",
        "OpenAI-compatible API lane: no OpenAI-compatible provider is called, tested, connected, or stored here.",
      ],
      localModelLane: [
        "Local model lane: planned for manual local model trial review, local bridge dependency review, private endpoint handling, and explicit operator approval before any local model traffic.",
        "Local model lane: no local model is called and no local bridge endpoint is called from this plan.",
      ],
      creativeProviderLane: [
        "Creative provider lane: planned for asset generation boundaries, cost checks, local/cloud decision review, and artifact review before any creative provider call.",
        "Creative provider lane: this page does not generate images, generate video, run ComfyUI workflows, queue jobs, or launch local tools.",
      ],
      researchCodingProviderLane: [
        "Research/coding provider lane: planned for source privacy, prompt privacy, code-change approval, validation review, and explicit approval before any research or coding provider traffic.",
        "Research/coding provider lane: this page does not browse, search, fetch, call GitHub APIs, run code, apply patches, or send project data.",
      ],
      keyTokenSafetyRules: [
        "Key/token safety rules: Keys and tokens are never displayed or stored here.",
        "Key/token safety rules: localStorage, sessionStorage, endpoint storage, token storage, process.env display, secret display, and raw credential echoing stay blocked.",
      ],
      approvalGates: [
        "Approval gates: provider traffic requires explicit approval, provider connection tests require explicit approval, credential handling requires explicit approval, and prompt/file/project/model data sends require explicit approval.",
        "Approval gates: approval is reviewed here but never granted automatically.",
      ],
      blockedProviderIntegrationRisks: [
        "Blocked provider integration risks: connecting providers, testing provider connections, calling provider APIs, routing live traffic, storing keys, showing tokens, sending model data, calling local models, calling connectors, or calling local bridge endpoints.",
        "Blocked provider integration risks: unresolved blockers remain blocked until operator approval happens outside this page.",
      ],
      localModelTrialRoute:
        "Local model trial route: /local-model-provider-trial-review reviews local model trial readiness without calling local models.",
      betaReleaseCandidateRoute:
        "Beta release candidate route: /codexforge-beta-release-candidate reviews beta readiness without publishing beta.",
      nextRecommendedAction:
        "Next recommended action: review the local model provider trial route, then return to the beta release candidate route with a provider lane decision.",
      advancedProviderIntegrationDetails:
        "Advanced provider integration details: controlled provider integration plan is review-only. Provider integration plan does not connect providers, provider traffic requires explicit approval, and keys and tokens are never displayed or stored here. It does not call provider APIs, call OpenAI-compatible providers, connect providers, test provider connections, route live provider traffic, spend tokens, store keys, store tokens, store endpoints, show secrets, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, run workflows, run creative generation, run research, run coding changes, generate images, generate video, run ComfyUI workflows, queue jobs, launch local tools, send prompt/file/project/connector/provider/model data without approval, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildControlledProviderIntegrationPlan({
      idHint: "blocked-connection-request",
      status: "blocked",
      providerIntegrationPlanIdentity:
        "Provider integration plan identity: controlled-provider-integration-plan-blocked-connection-request.",
      providerFamilies: [
        "Provider families: blocked when a request asks this page to connect or test any provider.",
      ],
      openAICompatibleApiLane: [
        "OpenAI-compatible API lane: blocked because this plan cannot call or test OpenAI-compatible providers.",
      ],
      localModelLane: [
        "Local model lane: blocked because local model traffic requires a separate explicit approval path.",
      ],
      creativeProviderLane: [
        "Creative provider lane: blocked because generation and provider calls are outside this plan.",
      ],
      researchCodingProviderLane: [
        "Research/coding provider lane: blocked because research, coding, browsing, GitHub, or project-data sends are outside this plan.",
      ],
      keyTokenSafetyRules: [
        "Key/token safety rules: credentials stay private, redacted, undisplayed, and unstored.",
      ],
      approvalGates: [
        "Approval gates: blocked because approval cannot be granted automatically from this page.",
      ],
      blockedProviderIntegrationRisks: [
        "Blocked provider integration risks: live provider traffic, connection testing, credential storage, and data sends remain blocked.",
      ],
      localModelTrialRoute:
        "Local model trial route: /local-model-provider-trial-review remains review-only.",
      betaReleaseCandidateRoute:
        "Beta release candidate route: /codexforge-beta-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the provider lane blocked until an explicit approved future integration path exists.",
      advancedProviderIntegrationDetails:
        "Advanced provider integration details: blocked provider integration cannot recover by connecting providers, testing connections, calling local models, storing credentials, or routing traffic.",
    }),
  ];
}

export function buildControlledProviderIntegrationPlanBoundary(): ControlledProviderIntegrationPlanBoundary {
  return {
    controlledProviderIntegrationPlanReviewOnly: true,
    providerIntegrationPlanDoesNotConnectProviders: true,
    providerTrafficRequiresExplicitApproval: true,
    keysAndTokensNeverDisplayedOrStoredHere: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerKeyStorageAllowedFromUi: false,
    providerTokenStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelDataAutoSendAllowed: false,
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
    tokenStorageAllowed: false,
    endpointStorageAllowed: false,
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

export function summarizeControlledProviderIntegrationPlan(
  model: Pick<ControlledProviderIntegrationPlanModel, "plans">
): string {
  return `Controlled provider integration plan reviews ${model.plans.length} provider integration posture(s). Provider integration plan does not connect providers, provider traffic requires explicit approval, and keys and tokens are never displayed or stored here.`;
}

export function buildControlledProviderIntegrationPlanModel(): ControlledProviderIntegrationPlanModel {
  const plans = buildControlledProviderIntegrationPlans();
  const model: ControlledProviderIntegrationPlanModel = {
    title: "Controlled provider integration plan",
    summary: "",
    plans,
    boundary: buildControlledProviderIntegrationPlanBoundary(),
    providerIntegrationLanguage: [...CONTROLLED_PROVIDER_INTEGRATION_PLAN_LANGUAGE],
    advancedDetails: [
      "Controlled provider integration plan",
      "provider integration plan identity",
      "Provider families",
      "OpenAI-compatible API lane",
      "local model lane",
      "creative provider lane",
      "research/coding provider lane",
      "key/token safety rules",
      "approval gates",
      "blocked provider integration risks",
      "local model trial route",
      "beta release candidate route",
      "next recommended action",
      "Provider integration plan does not connect providers",
      "Provider traffic requires explicit approval",
      "Keys and tokens are never displayed or stored here",
      "advanced provider integration details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeControlledProviderIntegrationPlan(model) };
}
