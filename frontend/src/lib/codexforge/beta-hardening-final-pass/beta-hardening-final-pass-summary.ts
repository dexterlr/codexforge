import type {
  BetaHardeningFinalPass,
  BetaHardeningFinalPassBoundary,
  BetaHardeningFinalPassModel,
} from "./beta-hardening-final-pass-types";
import { buildBetaHardeningFinalPassStableKey } from "./beta-hardening-final-pass-types";

export const BETA_HARDENING_FINAL_PASS_LANGUAGE = [
  "Beta hardening final pass",
  "Beta hardening does not release or publish",
  "Unresolved blockers remain blocked",
  "Final approval requires explicit operator sign-off",
  "Final hardening groups",
  "Smoke build manual validation summary",
] as const;

export function buildBetaHardeningFinalPass(
  input: Omit<BetaHardeningFinalPass, "id"> & { idHint: string }
): BetaHardeningFinalPass {
  const { idHint, ...pass } = input;
  return {
    id: buildBetaHardeningFinalPassStableKey("beta-hardening-final-pass", idHint, input.status),
    ...pass,
  };
}

export function buildBetaHardeningFinalPasses(): BetaHardeningFinalPass[] {
  return [
    buildBetaHardeningFinalPass({
      idHint: "final-review-only-hardening",
      status: "ready-for-review",
      betaHardeningIdentity:
        "Beta hardening identity: beta-hardening-final-pass-final-review-only-hardening.",
      finalHardeningGroups: [
        "Final hardening groups: smoke stability, build warning cleanup, route coverage, command palette safety, beta issue triage, privacy review, secrets review, provider readiness, local bridge readiness, and operator cockpit readiness.",
        "Final hardening groups: every group is reviewed from static readiness language only; beta hardening does not release or publish.",
      ],
      smokeBuildManualValidationSummary: [
        "Smoke build manual validation summary: full smoke, targeted smoke, build warning, repaired Project Dependency Map smoke, repaired 382-385 smoke, 386-397 smoke, and 398-409 smoke remain manual validation evidence.",
        "Smoke build manual validation summary: this page does not run tests, run builds, run smoke checks, or update validation results from the UI.",
      ],
      privacySafetyBlockerSummary: [
        "Privacy/safety blocker summary: provider calls, local model calls, local bridge calls, connector calls, web/search calls, GitHub calls, credential display, browser token storage, file mutation, memory mutation, automations, and approval automation remain blocked.",
        "Privacy/safety blocker summary: unresolved blockers remain blocked until explicit operator sign-off happens outside this page.",
      ],
      unresolvedBetaRisks: [
        "Unresolved beta risks: unclear release scope, missing manual validation, privacy gaps, secret exposure risk, provider traffic requests, local model traffic requests, local bridge traffic requests, release-note publishing requests, and missing final approval.",
        "Unresolved beta risks: any request to publish beta, release beta, approve beta, connect providers, call local models, or mutate files blocks the final pass.",
      ],
      releaseCandidateRoute:
        "Release candidate route: /codexforge-beta-release-candidate reviews CodexForge beta release candidate readiness without publishing beta.",
      providerIntegrationRoute:
        "Provider integration route: /controlled-provider-integration-plan reviews provider integration planning without connecting providers.",
      nextRecommendedAction:
        "Next recommended action: review unresolved blockers, then open the CodexForge beta release candidate only after manual validation evidence is ready.",
      advancedBetaHardeningDetails:
        "Advanced beta hardening details: beta hardening final pass is review-only. Beta hardening does not release or publish, unresolved blockers remain blocked, and final approval requires explicit operator sign-off. It does not publish beta, release beta, publish release notes, export release notes, approve actions, automate approval, run workflows, run tests, run builds, run smoke checks, call provider APIs, connect providers, test provider connections, route live provider traffic, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model data without approval, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store endpoints, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaHardeningFinalPass({
      idHint: "blocked-missing-final-signoff",
      status: "blocked",
      betaHardeningIdentity:
        "Beta hardening identity: beta-hardening-final-pass-blocked-missing-final-signoff.",
      finalHardeningGroups: [
        "Final hardening groups: blocked while final operator sign-off, smoke stability, privacy, secrets, provider, local model, connector, automation, or route coverage findings remain unresolved.",
      ],
      smokeBuildManualValidationSummary: [
        "Smoke build manual validation summary: blocked because validation evidence must be reviewed manually and cannot be generated by this page.",
      ],
      privacySafetyBlockerSummary: [
        "Privacy/safety blocker summary: blocked because unresolved blockers remain blocked.",
      ],
      unresolvedBetaRisks: [
        "Unresolved beta risks: missing final sign-off, missing validation review, or any release/publish/provider/local-model request.",
      ],
      releaseCandidateRoute:
        "Release candidate route: /codexforge-beta-release-candidate remains review-only.",
      providerIntegrationRoute:
        "Provider integration route: /controlled-provider-integration-plan remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep beta hardening blocked until the named blocker is resolved outside this page.",
      advancedBetaHardeningDetails:
        "Advanced beta hardening details: blocked beta hardening cannot recover by publishing beta, releasing beta, calling providers, calling local models, writing files, mutating memory, or granting approval automatically.",
    }),
  ];
}

export function buildBetaHardeningFinalPassBoundary(): BetaHardeningFinalPassBoundary {
  return {
    betaHardeningFinalPassReviewOnly: true,
    betaHardeningDoesNotReleaseOrPublish: true,
    unresolvedBlockersRemainBlocked: true,
    finalApprovalRequiresExplicitOperatorSignOff: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    fullSmokeSuiteExecutionFromUiAllowed: false,
    releasePublishAllowedFromUi: false,
    betaPublishAllowedFromUi: false,
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

export function summarizeBetaHardeningFinalPass(
  model: Pick<BetaHardeningFinalPassModel, "passes">
): string {
  return `Beta hardening final pass reviews ${model.passes.length} beta hardening posture(s). Beta hardening does not release or publish, unresolved blockers remain blocked, and final approval requires explicit operator sign-off.`;
}

export function buildBetaHardeningFinalPassModel(): BetaHardeningFinalPassModel {
  const passes = buildBetaHardeningFinalPasses();
  const model: BetaHardeningFinalPassModel = {
    title: "Beta hardening final pass",
    summary: "",
    passes,
    boundary: buildBetaHardeningFinalPassBoundary(),
    hardeningLanguage: [...BETA_HARDENING_FINAL_PASS_LANGUAGE],
    advancedDetails: [
      "Beta hardening final pass",
      "beta hardening identity",
      "Final hardening groups",
      "Smoke build manual validation summary",
      "privacy/safety blocker summary",
      "unresolved beta risks",
      "release candidate route",
      "provider integration route",
      "next recommended action",
      "Beta hardening does not release or publish",
      "Unresolved blockers remain blocked",
      "Final approval requires explicit operator sign-off",
      "advanced beta hardening details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaHardeningFinalPass(model) };
}
