import type {
  FirstControlledProviderTrial,
  FirstControlledProviderTrialBoundary,
  FirstControlledProviderTrialModel,
} from "./first-controlled-provider-trial-types";
import { buildFirstControlledProviderTrialStableKey } from "./first-controlled-provider-trial-types";

export const FIRST_CONTROLLED_PROVIDER_TRIAL_LANGUAGE = [
  "First controlled provider trial",
  "First controlled provider trial does not send provider traffic",
  "Provider calls require explicit operator approval",
  "Trial evidence is reviewed before use",
  "Trial stages",
  "Provider eligibility checklist",
] as const;

export function buildFirstControlledProviderTrial(
  input: Omit<FirstControlledProviderTrial, "id"> & { idHint: string }
): FirstControlledProviderTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildFirstControlledProviderTrialStableKey("first-controlled-provider-trial", idHint, input.status),
    ...trial,
  };
}

export function buildFirstControlledProviderTrials(): FirstControlledProviderTrial[] {
  return [
    buildFirstControlledProviderTrial({
      idHint: "review-only-trial-plan",
      status: "ready-for-review",
      firstControlledProviderTrialIdentity:
        "First controlled provider trial identity: first-controlled-provider-trial-review-only-trial-plan.",
      trialStages: [
        "Trial stages: review provider eligibility, review prompt safety, review approval gates, review validation evidence, then route any approved evidence to a response inbox review.",
        "Trial stages: every stage is review-only; first controlled provider trial does not send provider traffic.",
      ],
      providerEligibilityChecklist: [
        "Provider eligibility checklist: credential boundary reviewed, failover policy reviewed, cost and rate-limit review available, prompt privacy reviewed, operator owner named, and provider family mapped.",
        "Provider eligibility checklist: eligibility is a checklist only and does not connect providers.",
      ],
      promptSafetyChecklist: [
        "Prompt safety checklist: private prompt details stay redacted, prompt classes are reviewed as labels, prompt replay is denied, and provider calls require explicit operator approval.",
        "Prompt safety checklist: no prompt is sent to a provider from this surface.",
      ],
      approvalGates: [
        "Approval gates: provider call approval, prompt approval, credential approval, cost approval, response review approval, and evidence review approval must remain explicit.",
        "Approval gates: approval is reviewed here but never granted automatically.",
      ],
      validationEvidenceRequirements: [
        "Validation evidence requirements: approved trial owner, provider family, redacted prompt class, expected response handling, cost/rate-limit posture, response inbox route, and manual validation notes.",
        "Validation evidence requirements: trial evidence is reviewed before use.",
      ],
      deniedTrialActions: [
        "Denied trial actions: provider API calls, OpenAI-compatible calls, local model calls, provider connection tests, provider traffic routing, prompt sending, response storage, credential storage, retry calls, and provider switching.",
        "Denied trial actions: file mutation, memory mutation, workflow execution, shell execution, git execution, connector calls, web/search calls, GitHub calls, background jobs, and polling loops.",
      ],
      blockedTrialRisks: [
        "Blocked trial risks: missing approval, unredacted prompt, credential exposure, live provider traffic, unreviewed response, budget uncertainty, unsafe retry, provider switch, data send without approval, and unresolved safety regression.",
        "Blocked trial risks: unresolved risks stay blocked until reviewed elsewhere.",
      ],
      providerResponseInboxRoute:
        "Provider response inbox route: /provider-response-review-inbox reviews response handling without storing provider responses.",
      costRateLimitRoute:
        "Cost and rate-limit route: /provider-cost-rate-limit-review reviews cost and rate-limit policy without calling providers.",
      nextRecommendedAction:
        "Next recommended action: review the response inbox and cost/rate-limit policy before asking an operator for any future provider-call approval.",
      advancedTrialDetails:
        "Advanced trial details: first controlled provider trial is review-only. First controlled provider trial does not send provider traffic, provider calls require explicit operator approval, and trial evidence is reviewed before use. It does not call provider APIs, call OpenAI-compatible providers, connect providers, test provider connections, route provider traffic, send prompts, store provider responses, ingest provider responses, store credentials, store tokens, store endpoints, switch providers, retry provider calls, fetch billing, spend tokens, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/credential/response data without approval, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFirstControlledProviderTrial({
      idHint: "blocked-provider-call-request",
      status: "blocked",
      firstControlledProviderTrialIdentity:
        "First controlled provider trial identity: first-controlled-provider-trial-blocked-provider-call-request.",
      trialStages: [
        "Trial stages: blocked when a request asks this page to send a prompt or call a provider.",
      ],
      providerEligibilityChecklist: [
        "Provider eligibility checklist: blocked until credential, failover, response, and cost reviews are complete.",
      ],
      promptSafetyChecklist: [
        "Prompt safety checklist: blocked because prompts cannot be sent from this review surface.",
      ],
      approvalGates: [
        "Approval gates: blocked because provider calls require explicit operator approval outside this page.",
      ],
      validationEvidenceRequirements: [
        "Validation evidence requirements: blocked because provider evidence cannot be generated here.",
      ],
      deniedTrialActions: [
        "Denied trial actions: provider calls, prompt sending, response storage, credential storage, routing, and retry calls remain blocked.",
      ],
      blockedTrialRisks: [
        "Blocked trial risks: live traffic request, prompt send request, and unreviewed evidence request remain blocked.",
      ],
      providerResponseInboxRoute:
        "Provider response inbox route: /provider-response-review-inbox remains review-only.",
      costRateLimitRoute:
        "Cost and rate-limit route: /provider-cost-rate-limit-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the provider trial blocked until response, cost, and safety reviews are complete.",
      advancedTrialDetails:
        "Advanced trial details: blocked first controlled provider trial cannot recover by calling providers, sending prompts, storing responses, writing files, or mutating memory.",
    }),
  ];
}

export function buildFirstControlledProviderTrialBoundary(): FirstControlledProviderTrialBoundary {
  return {
    firstControlledProviderTrialReviewOnly: true,
    firstControlledProviderTrialDoesNotSendProviderTraffic: true,
    providerCallsRequireExplicitOperatorApproval: true,
    trialEvidenceIsReviewedBeforeUse: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    providerSwitchingAllowedFromUi: false,
    providerRetryCallsAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerResponseStorageAllowedFromUi: false,
    providerResponseIngestionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelCredentialResponseDataAutoSendAllowed: false,
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
    responseStorageAllowed: false,
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

export function summarizeFirstControlledProviderTrial(
  model: Pick<FirstControlledProviderTrialModel, "trials">
): string {
  return `First controlled provider trial prepares ${model.trials.length} trial posture(s). First controlled provider trial does not send provider traffic, provider calls require explicit operator approval, and trial evidence is reviewed before use.`;
}

export function buildFirstControlledProviderTrialModel(): FirstControlledProviderTrialModel {
  const trials = buildFirstControlledProviderTrials();
  const model: FirstControlledProviderTrialModel = {
    title: "First controlled provider trial",
    summary: "",
    trials,
    boundary: buildFirstControlledProviderTrialBoundary(),
    trialLanguage: [...FIRST_CONTROLLED_PROVIDER_TRIAL_LANGUAGE],
    advancedDetails: [
      "First controlled provider trial",
      "first controlled provider trial identity",
      "Trial stages",
      "Provider eligibility checklist",
      "Prompt safety checklist",
      "Approval gates",
      "Validation evidence requirements",
      "Denied trial actions",
      "Blocked trial risks",
      "Provider response inbox route",
      "Cost and rate-limit route",
      "Next recommended action",
      "First controlled provider trial does not send provider traffic",
      "Provider calls require explicit operator approval",
      "Trial evidence is reviewed before use",
      "advanced trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstControlledProviderTrial(model) };
}
