import type {
  ProviderGovernanceRealWorldTrialReview,
  ProviderGovernanceRealWorldTrialReviewBoundary,
  ProviderGovernanceRealWorldTrialReviewModel,
} from "./provider-governance-real-world-trial-review-types";
import { buildProviderGovernanceRealWorldTrialReviewStableKey } from "./provider-governance-real-world-trial-review-types";

export const PROVIDER_GOVERNANCE_REAL_WORLD_TRIAL_REVIEW_LANGUAGE = [
  "Provider governance real-world trial review",
  "Provider governance trial review does not call providers",
  "Token spending requires explicit approval",
  "Prompt file data is not sent automatically",
  "Budget token guardrail summary",
  "Project knowledge trial route",
] as const;

export function buildProviderGovernanceRealWorldTrialReview(
  input: Omit<ProviderGovernanceRealWorldTrialReview, "id"> & { idHint: string }
): ProviderGovernanceRealWorldTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildProviderGovernanceRealWorldTrialReviewStableKey(
      "provider-governance-real-world-trial-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildProviderGovernanceRealWorldTrialReviews(): ProviderGovernanceRealWorldTrialReview[] {
  return [
    buildProviderGovernanceRealWorldTrialReview({
      idHint: "operator-policy-readiness-review",
      status: "ready-for-review",
      providerTrialIdentity:
        "Provider trial identity: provider-governance-real-world-trial-review-operator-policy-readiness-review.",
      sourceProviderGovernanceSurfaces:
        "Source provider governance/policy surfaces: /provider-governance-release-candidate, /provider-policy-bundle-export-review, /provider-budget-guardrails, /prompt-privacy-classifier, and /router-recommendation-apply-review provide reviewed policy posture without provider calls.",
      operatorProviderScenario:
        "Operator provider scenario: a real operator reviews whether a provider policy is ready for a future approved workflow without calling providers, spending tokens, sending prompt/file data, applying policy, or exporting files.",
      selectedProviderPolicySummary:
        "Selected provider policy summary: local-first by default, provider routing remains review-gated, secrets are excluded, and live provider traffic stays blocked until explicit approval.",
      budgetTokenGuardrailSummary:
        "Budget token guardrail summary: zero token spending from this page, cost estimates are advisory, and token spending requires explicit approval.",
      promptPrivacyReview:
        "Prompt privacy review: prompt file data is not sent automatically, prompt/file/project data stays local unless a separate approval gate accepts the send, and secret values are never displayed.",
      applyExportApprovalGates: [
        "Apply/export approval gates: explicit approval is required before provider policy apply behavior.",
        "Apply/export approval gates: explicit approval is required before policy export, settings export, or report file writing.",
        "Apply/export approval gates: explicit approval is required before provider calls, token spend, retry behavior, registry changes, or prompt/file data send.",
      ],
      blockedRealActions: [
        "Blocked real actions: provider API calls, token spending, automatic provider send, prompt/file/project data sending, policy apply behavior, provider registry mutation, settings export, report export, file writes, and secret display.",
        "Blocked real actions: connector API calls, web/search API calls, source fetching/browsing, local bridge calls, local tool launches, render/generation jobs, commands, shell commands, git commands, tests, builds, smoke checks, patch apply behavior, commits, file mutation, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, reminders, schedules, automations, background jobs, notifications, polling loops, plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, and MCP tool calls.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: ready when selected provider policy, privacy review, budget guardrails, apply gates, export gates, and blocked reasons are clear.",
        "Trial outcome notes: blocked if a request tries to call providers, spend tokens, send prompt/file data, apply policy, export files, inspect secrets, or mutate memory.",
      ],
      projectKnowledgeTrialRoute:
        "Project knowledge trial route: /project-knowledge-real-world-trial-review reviews local project knowledge readiness without scanning files or promoting memory.",
      advancedProviderTrialDetails:
        "Advanced provider trial details: provider governance real-world trial review is review-only and does not call providers, spend tokens, send prompt data, send file data, send project data, apply provider policy, export settings, write reports, mutate provider registry, inspect secrets, display secrets, store tokens, store API keys in localStorage, call connectors, call web/search APIs, fetch sources, browse sources, call local bridge endpoints, launch local tools, run render jobs, run generation jobs, run workflows, run commands, run shell commands, run git commands, run tests, run builds, run smoke checks, apply patches, create commits, mutate files, write files, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderGovernanceRealWorldTrialReview({
      idHint: "blocked-provider-call-request",
      status: "blocked",
      providerTrialIdentity:
        "Provider trial identity: provider-governance-real-world-trial-review-blocked-provider-call-request.",
      sourceProviderGovernanceSurfaces:
        "Source provider governance/policy surfaces: blocked until provider policy, privacy, budget, apply, and export gates are reviewed.",
      operatorProviderScenario:
        "Operator provider scenario: blocked when this page is asked to call a provider, spend tokens, send prompts or files, apply policy, export files, reveal secrets, or mutate settings.",
      selectedProviderPolicySummary:
        "Selected provider policy summary: blocked until the selected policy can be reviewed without provider calls or secrets.",
      budgetTokenGuardrailSummary:
        "Budget token guardrail summary: blocked because token spending requires explicit approval.",
      promptPrivacyReview:
        "Prompt privacy review: blocked because prompt file data is not sent automatically.",
      applyExportApprovalGates: [
        "Apply/export approval gates: blocked because explicit approval is missing.",
      ],
      blockedRealActions: [
        "Blocked real actions: every provider, connector, web, command, file, creative, automation, memory, plugin, tool, agent, and MCP action remains blocked.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: blocked until policy, privacy, budget, token, provider, and export boundaries are explicit.",
      ],
      projectKnowledgeTrialRoute:
        "Project knowledge trial route: /project-knowledge-real-world-trial-review remains the next review-only handoff after provider governance review.",
      advancedProviderTrialDetails:
        "Advanced provider trial details: blocked provider governance reviews cannot recover by calling providers, spending tokens, sending prompt or file data, exporting settings, writing files, displaying secrets, promoting memory, mutating Brain graph data, or creating an MCP runtime.",
    }),
  ];
}

export function buildProviderGovernanceRealWorldTrialReviewBoundary(): ProviderGovernanceRealWorldTrialReviewBoundary {
  return {
    providerGovernanceTrialReviewOnly: true,
    providerGovernanceTrialReviewDoesNotCallProviders: true,
    tokenSpendingRequiresExplicitApproval: true,
    promptFileDataNotSentAutomatically: true,
    providerApiCallsAllowedFromUi: false,
    tokenSpendAllowedFromUi: false,
    autoSpendTokensAllowed: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    providerRegistryMutationAllowed: false,
    silentProviderRegistryMutationAllowed: false,
    policyApplyAllowedFromUi: false,
    exportWriteAllowedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    codingTaskExecutionAllowedFromUi: false,
    taskExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commitCreationAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    sourceAutoFetchAllowed: false,
    connectorApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorDataReadFromPageAllowed: false,
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeProviderGovernanceRealWorldTrialReview(
  model: Pick<ProviderGovernanceRealWorldTrialReviewModel, "reviews">
): string {
  return `Provider governance real-world trial review prepares ${model.reviews.length} provider trial posture(s). Provider governance trial review does not call providers, token spending requires explicit approval, and prompt file data is not sent automatically.`;
}

export function buildProviderGovernanceRealWorldTrialReviewModel(): ProviderGovernanceRealWorldTrialReviewModel {
  const reviews = buildProviderGovernanceRealWorldTrialReviews();
  const model: ProviderGovernanceRealWorldTrialReviewModel = {
    title: "Provider governance real-world trial review",
    summary: "",
    reviews,
    boundary: buildProviderGovernanceRealWorldTrialReviewBoundary(),
    trialReviewLanguage: [...PROVIDER_GOVERNANCE_REAL_WORLD_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider governance real-world trial review",
      "Provider governance trial review does not call providers",
      "Token spending requires explicit approval",
      "Prompt file data is not sent automatically",
      "Provider trial identity",
      "Source provider governance/policy surfaces",
      "Operator provider scenario",
      "Selected provider policy summary",
      "Budget token guardrail summary",
      "Prompt privacy review",
      "Apply/export approval gates",
      "Blocked real actions",
      "Trial outcome notes",
      "Project knowledge trial route",
      "advanced provider trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderGovernanceRealWorldTrialReview(model) };
}
