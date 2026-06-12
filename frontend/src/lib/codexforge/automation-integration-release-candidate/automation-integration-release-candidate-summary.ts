import type {
  AutomationIntegrationReleaseCandidate,
  AutomationIntegrationReleaseCandidateBoundary,
  AutomationIntegrationReleaseCandidateModel,
} from "./automation-integration-release-candidate-types";
import { buildAutomationIntegrationReleaseCandidateStableKey } from "./automation-integration-release-candidate-types";

export const AUTOMATION_INTEGRATION_RELEASE_CANDIDATE_LANGUAGE = [
  "Automation integration release candidate",
  "Automation integration release candidate does not run automations",
  "Live automation requires explicit approval",
  "Denied automation paths remain blocked",
  "Automation family matrix",
  "Schedule safety status",
] as const;

export function buildAutomationIntegrationReleaseCandidate(
  input: Omit<AutomationIntegrationReleaseCandidate, "id"> & { idHint: string }
): AutomationIntegrationReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildAutomationIntegrationReleaseCandidateStableKey(
      "automation-integration-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildAutomationIntegrationReleaseCandidates(): AutomationIntegrationReleaseCandidate[] {
  return [
    buildAutomationIntegrationReleaseCandidate({
      idHint: "review-only-automation-readiness",
      status: "ready-for-review",
      automationIntegrationCandidateIdentity:
        "Automation integration candidate identity: automation-integration-release-candidate-review-only-automation-readiness.",
      automationFamilyMatrix: [
        "Automation family matrix: dry-run trials preview behavior only and do not create automations.",
        "Automation family matrix: approval queue review keeps approvals manual and does not approve actions automatically.",
        "Automation family matrix: schedule safety review checks cadence and quiet hours without scheduling tasks.",
        "Automation family matrix: connector/provider boundaries remain review-only and no live calls are made.",
      ],
      dryRunStatus:
        "Dry-run status: automation dry-run trial review is ready for operator review and dry-run output is reviewed before use.",
      approvalQueueStatus:
        "Approval queue status: automation approvals require explicit operator review and denied automation actions remain blocked.",
      scheduleSafetyStatus:
        "Schedule safety status: automation schedule safety review does not schedule tasks and unsafe schedule shortcuts stay blocked.",
      deniedAutomationPaths: [
        "Denied automation paths: run automations, create automations, persist automation rules, persist approval decisions, create schedules, schedule tasks, create reminders, create watches, start polling loops, create background jobs, send notifications, call connectors, call providers, mutate files, or mutate memory.",
      ],
      blockedIntegrationRisks: [
        "Blocked integration risks: missing explicit approval, unsafe cadence, automatic approval request, connector fetch request, provider send request, local bridge call request, file mutation request, or memory promotion request.",
      ],
      dailyOperatorHomeRoute:
        "Daily operator home route: /daily-operator-home keeps automation readiness visible without running workflows.",
      globalReviewInboxRoute:
        "Global review inbox route: /global-review-inbox keeps unresolved automation review items manual.",
      nextRecommendedAction:
        "Next recommended action: keep denied automation paths blocked, review dry-run output, queue explicit approvals manually, and re-check schedule safety before any live automation proposal.",
      advancedReleaseCandidateDetails:
        "Advanced release candidate details: automation integration release candidate is review-only. Automation integration release candidate does not run automations, live automation requires explicit approval, and denied automation paths remain blocked. It does not run automations, create automations, persist automation rules, persist approval decisions, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, call connector APIs, connect connector accounts, fetch connector data, store connector data, call providers, test provider connections, route provider traffic, send prompts to providers, store provider outputs, call local models, call local bridge endpoints, launch local tools, generate creative assets, run research, execute coding workflows, apply patches, browse web or search APIs, call GitHub APIs, scan arbitrary projects, browse local files, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildAutomationIntegrationReleaseCandidate({
      idHint: "blocked-live-automation-path",
      status: "blocked",
      automationIntegrationCandidateIdentity:
        "Automation integration candidate identity: automation-integration-release-candidate-blocked-live-automation-path.",
      automationFamilyMatrix: [
        "Automation family matrix: blocked because live automation or automatic approval is implied.",
      ],
      dryRunStatus:
        "Dry-run status: blocked until dry-run output is reviewed before use.",
      approvalQueueStatus:
        "Approval queue status: blocked until automation approvals require explicit operator review.",
      scheduleSafetyStatus:
        "Schedule safety status: blocked until unsafe schedule shortcuts stay blocked.",
      deniedAutomationPaths: [
        "Denied automation paths: live automation execution, automatic approval, schedule creation, notification sending, connector calls, provider calls, file mutation, and memory mutation remain blocked.",
      ],
      blockedIntegrationRisks: [
        "Blocked integration risks: live automation request, automatic approval request, unsafe schedule, connector/provider request, or mutation request.",
      ],
      dailyOperatorHomeRoute:
        "Daily operator home route: /daily-operator-home remains review-only.",
      globalReviewInboxRoute:
        "Global review inbox route: /global-review-inbox remains manual.",
      nextRecommendedAction:
        "Next recommended action: keep denied automation paths blocked and return to dry-run, approval queue, and schedule safety review.",
      advancedReleaseCandidateDetails:
        "Advanced release candidate details: blocked automation integration cannot recover by running automations, approving actions, creating schedules, creating reminders, creating watches, sending notifications, calling connectors, calling providers, mutating files, or mutating memory.",
    }),
  ];
}

export function buildAutomationIntegrationReleaseCandidateBoundary(): AutomationIntegrationReleaseCandidateBoundary {
  return {
    automationIntegrationReleaseCandidateReviewOnly: true,
    automationIntegrationReleaseCandidateDoesNotRunAutomations: true,
    liveAutomationRequiresExplicitApproval: true,
    deniedAutomationPathsRemainBlocked: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    actionsApprovedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationRulePersistenceAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    watchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerLiveConnectionTestsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    creativeAssetGenerationAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    webSearchApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    evidenceAutoIngestionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    tokenStorageAllowed: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    outputStorageAllowed: false,
    automationDataStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeAutomationIntegrationReleaseCandidate(
  model: Pick<AutomationIntegrationReleaseCandidateModel, "candidates">
): string {
  return `Automation integration release candidate summarizes ${model.candidates.length} automation readiness candidate(s). Automation integration release candidate does not run automations, live automation requires explicit approval, and denied automation paths remain blocked.`;
}

export function buildAutomationIntegrationReleaseCandidateModel(): AutomationIntegrationReleaseCandidateModel {
  const candidates = buildAutomationIntegrationReleaseCandidates();
  const model: AutomationIntegrationReleaseCandidateModel = {
    title: "Automation integration release candidate",
    summary: "",
    candidates,
    boundary: buildAutomationIntegrationReleaseCandidateBoundary(),
    releaseLanguage: [...AUTOMATION_INTEGRATION_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Automation integration release candidate",
      "automation integration candidate identity",
      "Automation family matrix",
      "dry-run status",
      "approval queue status",
      "Schedule safety status",
      "denied automation paths",
      "blocked integration risks",
      "daily operator home route",
      "global review inbox route",
      "next recommended action",
      "Automation integration release candidate does not run automations",
      "Live automation requires explicit approval",
      "Denied automation paths remain blocked",
      "advanced release candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAutomationIntegrationReleaseCandidate(model) };
}
