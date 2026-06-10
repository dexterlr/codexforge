import type {
  FullSmokeSuiteStabilityPassBoundary,
  FullSmokeSuiteStabilityPassModel,
  FullSmokeSuiteStabilityReview,
} from "./full-smoke-suite-stability-pass-types";
import { buildFullSmokeSuiteStabilityPassStableKey } from "./full-smoke-suite-stability-pass-types";

export const FULL_SMOKE_SUITE_STABILITY_PASS_LANGUAGE = [
  "Full smoke suite stability pass",
  "Smoke stability pass does not run tests from this page",
  "Smoke results require operator review",
  "Unresolved smoke failures stay blocked",
  "Covered smoke groups",
  "Required manual validation",
] as const;

export function buildFullSmokeSuiteStabilityReview(
  input: Omit<FullSmokeSuiteStabilityReview, "id"> & { idHint: string }
): FullSmokeSuiteStabilityReview {
  const { idHint, ...review } = input;
  return {
    id: buildFullSmokeSuiteStabilityPassStableKey("full-smoke-suite-stability-pass", idHint, input.status),
    ...review,
  };
}

export function buildFullSmokeSuiteStabilityReviews(): FullSmokeSuiteStabilityReview[] {
  return [
    buildFullSmokeSuiteStabilityReview({
      idHint: "foundation-beta-readiness",
      status: "ready-for-review",
      smokeStabilityIdentity:
        "Smoke stability identity: full-smoke-suite-stability-pass-foundation-beta-readiness.",
      coveredSmokeGroups: [
        "Covered smoke groups: core shell, navigation shell, command UI simplification, route registry health, and route coverage remain reviewable.",
        "Covered smoke groups: safety boundary matrix, local-first privacy audit, secrets regression sweep, Project Dependency Map, and build-warning path boundary coverage stay protected.",
        "Covered smoke groups: provider, connector, automation, creative, memory, local project, and Jarvisd boundary suites remain operator-run checks outside this page.",
      ],
      latestValidationChecklist: [
        "Latest validation checklist: confirm all-smoke includes this phase exactly once before beta candidate review.",
        "Latest validation checklist: confirm the repaired Project Dependency Map smoke behavior stays preserved.",
        "Latest validation checklist: confirm server-only path boundary markers remain intact before treating the suite as stable.",
      ],
      knownFlakyAreas: [
        "Known flaky areas: local bridge live probes, render status polling, provider live trials, and external runtime availability need manual context before interpretation.",
        "Known flaky areas: optional local services can report unavailable without making the foundation beta candidate unsafe by themselves.",
      ],
      requiredManualValidation: [
        "Required manual validation: run the full smoke suite outside the UI when the operator is ready.",
        "Required manual validation: review failed or skipped smoke output before beta readiness is accepted.",
        "Required manual validation: confirm no smoke failure is waived without a named operator decision.",
      ],
      blockedStabilityRisks: [
        "Blocked stability risks: unresolved smoke failures stay blocked until the failing route, marker, or boundary is reviewed.",
        "Blocked stability risks: any request to run tests, builds, smoke checks, shell commands, or git commands from this page stays blocked.",
      ],
      betaCandidateRoute:
        "Beta candidate route: /foundation-beta-candidate reviews the foundation beta decision after smoke stability is reviewed.",
      feedbackIntakeRoute:
        "Feedback/intake route: /beta-trial-intake-review and /beta-feedback-inbox prepare beta review surfaces without collecting external data.",
      advancedSmokeStabilityDetails:
        "Advanced smoke stability details: full smoke suite stability pass is review-only. It does not run tests, run builds, run smoke checks, run the full smoke suite, execute workflows, approve actions automatically, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, launch local tools, send prompt/file/project/connector/feedback data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, mutate files, write files, export files, apply patches, delete files, ingest feedback, create issues, collect participant data, send invites, publish releases, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFullSmokeSuiteStabilityReview({
      idHint: "unresolved-smoke-failures",
      status: "blocked",
      smokeStabilityIdentity:
        "Smoke stability identity: full-smoke-suite-stability-pass-unresolved-smoke-failures.",
      coveredSmokeGroups: [
        "Covered smoke groups: failed, missing, or skipped required smokes are shown as blocked review items only.",
      ],
      latestValidationChecklist: [
        "Latest validation checklist: blocked failures require a copied operator note or follow-up route before any beta recommendation changes.",
      ],
      knownFlakyAreas: [
        "Known flaky areas: repeat failures that affect route coverage, command registry coverage, privacy, secrets, or server path boundaries are not treated as flaky here.",
      ],
      requiredManualValidation: [
        "Required manual validation: rerun the relevant smoke outside this page and attach the reviewed result through the existing operator process.",
      ],
      blockedStabilityRisks: [
        "Blocked stability risks: unresolved smoke failures stay blocked.",
        "Blocked stability risks: smoke results require operator review before any beta candidate posture changes.",
      ],
      betaCandidateRoute:
        "Beta candidate route: /foundation-beta-candidate stays review-only and cannot approve blocked smoke failures.",
      feedbackIntakeRoute:
        "Feedback/intake route: /beta-trial-intake-review stays blocked for trial scope that depends on unresolved smoke failures.",
      advancedSmokeStabilityDetails:
        "Advanced smoke stability details: blocked smoke stability cannot recover by running commands, launching tools, calling APIs, applying patches, mutating files, writing reports, ingesting feedback, sending invites, creating issues, or promoting memory from this page.",
    }),
  ];
}

export function buildFullSmokeSuiteStabilityPassBoundary(): FullSmokeSuiteStabilityPassBoundary {
  return {
    fullSmokeSuiteStabilityPassReviewOnly: true,
    smokeStabilityPassDoesNotRunTestsFromThisPage: true,
    smokeResultsRequireOperatorReview: true,
    unresolvedSmokeFailuresStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    promptFileProjectConnectorFeedbackDataAutoSendAllowed: false,
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
    fullSmokeSuiteExecutionFromUiAllowed: false,
    releasePublishAllowedFromUi: false,
    inviteSendingAllowedFromUi: false,
    participantDataCollectionAllowedFromUi: false,
    externalFeedbackFetchAllowedFromUi: false,
    feedbackIngestionAllowedFromUi: false,
    issueCreationAllowedFromUi: false,
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

export function summarizeFullSmokeSuiteStabilityPass(
  model: Pick<FullSmokeSuiteStabilityPassModel, "reviews">
): string {
  return `Full smoke suite stability pass prepares ${model.reviews.length} smoke stability review posture(s). Smoke stability pass does not run tests from this page, smoke results require operator review, and unresolved smoke failures stay blocked.`;
}

export function buildFullSmokeSuiteStabilityPassModel(): FullSmokeSuiteStabilityPassModel {
  const reviews = buildFullSmokeSuiteStabilityReviews();
  const model: FullSmokeSuiteStabilityPassModel = {
    title: "Full smoke suite stability pass",
    summary: "",
    reviews,
    boundary: buildFullSmokeSuiteStabilityPassBoundary(),
    smokeStabilityLanguage: [...FULL_SMOKE_SUITE_STABILITY_PASS_LANGUAGE],
    advancedDetails: [
      "Full smoke suite stability pass",
      "Smoke stability identity",
      "Covered smoke groups",
      "Latest validation checklist",
      "Known flaky areas",
      "Required manual validation",
      "Blocked stability risks",
      "Beta candidate route",
      "Feedback/intake route",
      "Smoke stability pass does not run tests from this page",
      "Smoke results require operator review",
      "Unresolved smoke failures stay blocked",
      "advanced smoke stability details collapsed/secondary",
      "no prompt/file/project data sending without approval",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFullSmokeSuiteStabilityPass(model) };
}
