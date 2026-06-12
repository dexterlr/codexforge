import type {
  CodingProviderTrialReview,
  CodingProviderTrialReviewBoundary,
  CodingProviderTrialReviewModel,
} from "./coding-provider-trial-review-types";
import { buildCodingProviderTrialReviewStableKey } from "./coding-provider-trial-review-types";

export const CODING_PROVIDER_TRIAL_REVIEW_LANGUAGE = [
  "Coding provider trial review",
  "Coding provider trial does not apply code",
  "Coding provider calls require explicit operator approval",
  "Validation is required before use",
  "Coding provider families",
  "Patch apply boundary notes",
] as const;

export function buildCodingProviderTrialReview(
  input: Omit<CodingProviderTrialReview, "id"> & { idHint: string }
): CodingProviderTrialReview {
  const { idHint, ...trial } = input;
  return {
    id: buildCodingProviderTrialReviewStableKey("coding-provider-trial-review", idHint, input.status),
    ...trial,
  };
}

export function buildCodingProviderTrialReviews(): CodingProviderTrialReview[] {
  return [
    buildCodingProviderTrialReview({
      idHint: "review-only-coding-provider-lane",
      status: "ready-for-review",
      codingProviderTrialIdentity:
        "Coding provider trial identity: coding-provider-trial-review-review-only-coding-provider-lane.",
      codingProviderFamilies: [
        "Coding provider families: code review, patch planning, test planning, refactor planning, bug diagnosis, migration planning, local coding model, and cloud coding provider lanes are reviewed as labels only.",
        "Coding provider families: provider choices stay advisory until an operator approves a future provider call outside this page.",
      ],
      patchApplyBoundaryNotes: [
        "Patch apply boundary notes: coding provider trial does not apply code, write files, run commands, or create commits.",
        "Patch apply boundary notes: proposed changes must remain review material until approval and validation happen elsewhere.",
      ],
      validationRequirementChecklist: [
        "Validation requirement checklist: reviewed diff intent, risk class, rollback note, test plan, smoke plan, owner, expected result, and evidence capture are required before use.",
        "Validation requirement checklist: validation is required before use and is not run from this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: provider call approval, prompt privacy approval, patch preview approval, file mutation approval, command approval, validation approval, and explicit operator approval.",
        "Approval gate checklist: coding provider calls require explicit operator approval before any future trial can run elsewhere.",
      ],
      deniedCodingProviderActions: [
        "Denied coding provider actions: provider calls, prompt sending, code application, patch application, file writes, command execution, git execution, tests, builds, smoke checks, output storage, and workflow execution.",
        "Denied coding provider actions: approval is reviewed here but never granted automatically.",
      ],
      blockedCodingTrialRisks: [
        "Blocked coding trial risks: missing approval, unreviewed patch, missing validation plan, file mutation request, command request, output persistence request, prompt send request, and unclear rollback.",
        "Blocked coding trial risks: any request to apply code, run commands, or run validation keeps the trial blocked.",
      ],
      creativeProviderTrialRoute:
        "Creative provider trial route: /creative-provider-trial-review reviews creative provider readiness without generating assets.",
      crossProviderComparisonRoute:
        "Cross-provider comparison route: /cross-provider-result-comparison compares provider suitability without calling providers.",
      nextRecommendedAction:
        "Next recommended action: review creative and research provider trial readiness, then compare provider suitability before requesting any explicit operator approval elsewhere.",
      advancedCodingProviderDetails:
        "Advanced coding provider details: coding provider trial review is review-only. Coding provider trial does not apply code, coding provider calls require explicit operator approval, and validation is required before use. It does not call providers, connect providers, test provider connections, route provider traffic, send prompts, store outputs, ingest outputs, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, apply code, apply patches, write files, mutate files, delete files, export files, run commands, run shell commands, run git commands, run tests, run builds, run smoke checks, create commits, send prompt/file/project/connector/provider/model/output data without approval, scan arbitrary projects, browse local files, crawl paths, read or open local files, auto-open local files, run workflows, execute actions, approve actions, automate approval, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCodingProviderTrialReview({
      idHint: "blocked-code-apply-request",
      status: "blocked",
      codingProviderTrialIdentity:
        "Coding provider trial identity: coding-provider-trial-review-blocked-code-apply-request.",
      codingProviderFamilies: [
        "Coding provider families: blocked when a request asks this page to choose a provider and apply code.",
      ],
      patchApplyBoundaryNotes: [
        "Patch apply boundary notes: blocked because coding provider trial does not apply code or patches.",
      ],
      validationRequirementChecklist: [
        "Validation requirement checklist: blocked because validation is required before use and cannot run from this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: blocked until explicit operator approval is requested outside this page.",
      ],
      deniedCodingProviderActions: [
        "Denied coding provider actions: provider calls, prompt sending, patch apply, file writes, commands, tests, builds, smoke checks, and output storage remain blocked.",
      ],
      blockedCodingTrialRisks: [
        "Blocked coding trial risks: code apply request, command execution request, validation run request, and missing approval remain blocked.",
      ],
      creativeProviderTrialRoute:
        "Creative provider trial route: /creative-provider-trial-review remains review-only.",
      crossProviderComparisonRoute:
        "Cross-provider comparison route: /cross-provider-result-comparison remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep code application blocked and collect reviewed validation requirements outside this page.",
      advancedCodingProviderDetails:
        "Advanced coding provider details: blocked coding provider trials cannot recover by calling providers, applying code, writing files, running commands, storing outputs, or approving work from this page.",
    }),
  ];
}

export function buildCodingProviderTrialReviewBoundary(): CodingProviderTrialReviewBoundary {
  return {
    codingProviderTrialReviewOnly: true,
    codingProviderTrialDoesNotApplyCode: true,
    codingProviderCallsRequireExplicitOperatorApproval: true,
    validationIsRequiredBeforeUse: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    codeApplyAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    providerApiCallsAllowedFromUi: false,
    codingProviderCallsAllowedFromUi: false,
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
    promptFileProjectConnectorProviderModelOutputDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
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

export function summarizeCodingProviderTrialReview(
  model: Pick<CodingProviderTrialReviewModel, "trials">
): string {
  return `Coding provider trial review prepares ${model.trials.length} coding provider trial posture(s). Coding provider trial does not apply code, coding provider calls require explicit operator approval, and validation is required before use.`;
}

export function buildCodingProviderTrialReviewModel(): CodingProviderTrialReviewModel {
  const trials = buildCodingProviderTrialReviews();
  const model: CodingProviderTrialReviewModel = {
    title: "Coding provider trial review",
    summary: "",
    trials,
    boundary: buildCodingProviderTrialReviewBoundary(),
    trialLanguage: [...CODING_PROVIDER_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Coding provider trial review",
      "coding provider trial identity",
      "Coding provider families",
      "Patch apply boundary notes",
      "Validation requirement checklist",
      "Approval gate checklist",
      "Denied coding provider actions",
      "Blocked coding trial risks",
      "Creative provider trial route",
      "Cross-provider comparison route",
      "Next recommended action",
      "Coding provider trial does not apply code",
      "Coding provider calls require explicit operator approval",
      "Validation is required before use",
      "advanced coding provider details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodingProviderTrialReview(model) };
}
