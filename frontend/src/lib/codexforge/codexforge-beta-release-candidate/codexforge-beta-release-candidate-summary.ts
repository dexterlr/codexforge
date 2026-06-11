import type {
  CodexForgeBetaReleaseCandidate,
  CodexForgeBetaReleaseCandidateBoundary,
  CodexForgeBetaReleaseCandidateModel,
} from "./codexforge-beta-release-candidate-types";
import { buildCodexForgeBetaReleaseCandidateStableKey } from "./codexforge-beta-release-candidate-types";

export const CODEXFORGE_BETA_RELEASE_CANDIDATE_LANGUAGE = [
  "CodexForge beta release candidate",
  "Beta release candidate does not publish beta",
  "Beta release requires explicit operator approval",
  "Unresolved blockers remain blocked",
  "Readiness groups",
  "Approval checklist",
] as const;

export function buildCodexForgeBetaReleaseCandidate(
  input: Omit<CodexForgeBetaReleaseCandidate, "id"> & { idHint: string }
): CodexForgeBetaReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildCodexForgeBetaReleaseCandidateStableKey("codexforge-beta-release-candidate", idHint, input.status),
    ...candidate,
  };
}

export function buildCodexForgeBetaReleaseCandidates(): CodexForgeBetaReleaseCandidate[] {
  return [
    buildCodexForgeBetaReleaseCandidate({
      idHint: "operator-beta-review",
      status: "ready-for-review",
      betaReleaseCandidateIdentity:
        "Beta release candidate identity: codexforge-beta-release-candidate-operator-beta-review.",
      readinessGroups: [
        "Readiness groups: beta hardening final pass, operator cockpit release candidate, creative workflow readiness, research workflow readiness, coding workflow readiness, full smoke stability, route coverage, command palette safety, privacy, secrets, provider planning, local model planning, connector permissions, and automation permissions.",
        "Readiness groups: readiness is reviewed only; CodexForge beta release candidate does not publish beta.",
      ],
      workflowReadinessSummary: [
        "Workflow readiness summary: creative, research, and coding workflows have readiness language, blocked execution paths, and approval boundaries visible.",
        "Workflow readiness summary: this page does not generate assets, run research, apply code, run validation, or execute workflows.",
      ],
      providerLocalConnectorAutomationReadinessSummary: [
        "Provider/local/connector/automation readiness summary: controlled provider integration, local model trial review, local bridge readiness, connector permission readiness, and automation permission readiness remain approval-gated.",
        "Provider/local/connector/automation readiness summary: no provider, local model, connector, or automation traffic is started here.",
      ],
      releaseBlockers: [
        "Release blockers: unresolved privacy, secrets, smoke, build warning, route coverage, provider, local model, local bridge, connector, automation, workflow, file, memory, release-note, or approval blockers.",
        "Release blockers: any request to publish beta, release beta, create release notes, export files, approve automatically, connect providers, call local models, or call APIs remains blocked.",
      ],
      approvalChecklist: [
        "Approval checklist: operator reviews beta hardening, smoke/build/manual validation, privacy/safety blockers, release blockers, provider integration plan, local model trial review, and release-note wording outside this page.",
        "Approval checklist: beta release requires explicit operator approval, and unresolved blockers remain blocked.",
      ],
      controlledProviderIntegrationRoute:
        "Controlled provider integration route: /controlled-provider-integration-plan reviews provider integration planning without connecting providers.",
      localModelTrialRoute:
        "Local model trial route: /local-model-provider-trial-review reviews local model trial readiness without calling local models.",
      nextRecommendedAction:
        "Next recommended action: review the controlled provider integration plan and local model provider trial review before any beta approval decision.",
      advancedBetaReleaseCandidateDetails:
        "Advanced beta candidate details: CodexForge beta release candidate is review-only. Beta release candidate does not publish beta, beta release requires explicit operator approval, and unresolved blockers remain blocked. It does not publish beta, release beta, create release notes, publish release notes, export release notes, call providers, connect providers, test provider connections, route live provider traffic, call local models, call local bridge endpoints, call connectors, call web/search APIs, call GitHub APIs, run workflows, run creative workflows, run research, apply code, run tests, run builds, run smoke checks, approve actions, automate approval, send prompt/file/project/connector/provider/model data without approval, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store endpoints, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCodexForgeBetaReleaseCandidate({
      idHint: "blocked-unresolved-release-blockers",
      status: "blocked",
      betaReleaseCandidateIdentity:
        "Beta release candidate identity: codexforge-beta-release-candidate-blocked-unresolved-release-blockers.",
      readinessGroups: [
        "Readiness groups: blocked while any beta hardening, workflow, provider, local model, connector, automation, smoke, privacy, secrets, or approval group has unresolved blockers.",
      ],
      workflowReadinessSummary: [
        "Workflow readiness summary: blocked when a workflow execution request is attached to beta release review.",
      ],
      providerLocalConnectorAutomationReadinessSummary: [
        "Provider/local/connector/automation readiness summary: blocked when provider traffic, local model traffic, connector calls, or automation creation are requested.",
      ],
      releaseBlockers: [
        "Release blockers: unresolved blockers remain blocked and cannot be cleared by this route.",
      ],
      approvalChecklist: [
        "Approval checklist: blocked because explicit operator approval has not been granted here.",
      ],
      controlledProviderIntegrationRoute:
        "Controlled provider integration route: /controlled-provider-integration-plan remains review-only.",
      localModelTrialRoute:
        "Local model trial route: /local-model-provider-trial-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep beta release candidate blocked until the named blocker is resolved elsewhere.",
      advancedBetaReleaseCandidateDetails:
        "Advanced beta candidate details: blocked beta release candidate cannot recover by publishing beta, creating release notes, connecting providers, calling local models, writing files, mutating memory, or granting approval automatically.",
    }),
  ];
}

export function buildCodexForgeBetaReleaseCandidateBoundary(): CodexForgeBetaReleaseCandidateBoundary {
  return {
    codexForgeBetaReleaseCandidateReviewOnly: true,
    betaReleaseCandidateDoesNotPublishBeta: true,
    betaReleaseRequiresExplicitOperatorApproval: true,
    unresolvedBlockersRemainBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    creativeWorkflowExecutionAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    releasePublishAllowedFromUi: false,
    betaPublishAllowedFromUi: false,
    releaseNotesCreationAllowedFromUi: false,
    releaseNotesPublishAllowedFromUi: false,
    releaseNotesExportAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
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

export function summarizeCodexForgeBetaReleaseCandidate(
  model: Pick<CodexForgeBetaReleaseCandidateModel, "candidates">
): string {
  return `CodexForge beta release candidate reviews ${model.candidates.length} beta release candidate posture(s). Beta release candidate does not publish beta, beta release requires explicit operator approval, and unresolved blockers remain blocked.`;
}

export function buildCodexForgeBetaReleaseCandidateModel(): CodexForgeBetaReleaseCandidateModel {
  const candidates = buildCodexForgeBetaReleaseCandidates();
  const model: CodexForgeBetaReleaseCandidateModel = {
    title: "CodexForge beta release candidate",
    summary: "",
    candidates,
    boundary: buildCodexForgeBetaReleaseCandidateBoundary(),
    betaReleaseCandidateLanguage: [...CODEXFORGE_BETA_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "CodexForge beta release candidate",
      "beta release candidate identity",
      "Readiness groups",
      "workflow readiness summary",
      "provider/local/connector/automation readiness summary",
      "release blockers",
      "Approval checklist",
      "controlled provider integration route",
      "local model trial route",
      "next recommended action",
      "Beta release candidate does not publish beta",
      "Beta release requires explicit operator approval",
      "Unresolved blockers remain blocked",
      "advanced beta candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodexForgeBetaReleaseCandidate(model) };
}
