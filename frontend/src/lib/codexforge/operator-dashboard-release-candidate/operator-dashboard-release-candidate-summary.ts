import type {
  OperatorDashboardLoopCard,
  OperatorDashboardReleaseBoundary,
  OperatorDashboardReleaseCandidate,
  OperatorDashboardReleaseCandidateModel,
} from "./operator-dashboard-release-candidate-types";
import { buildOperatorDashboardReleaseCandidateStableKey } from "./operator-dashboard-release-candidate-types";

export const OPERATOR_DASHBOARD_RELEASE_CANDIDATE_LANGUAGE = [
  "Operator dashboard release candidate",
  "Operator dashboard release remains review-only",
  "Dashboard does not run workflows automatically",
  "Execution remains behind explicit approval gates",
  "Release readiness by loop",
  "Guided trial route",
] as const;

export function buildOperatorDashboardLoopCard(input: Omit<OperatorDashboardLoopCard, "id"> & { idHint: string }): OperatorDashboardLoopCard {
  const { idHint, ...card } = input;
  return {
    id: buildOperatorDashboardReleaseCandidateStableKey("operator-dashboard-loop-card", idHint, input.loopName),
    ...card,
  };
}

export function buildOperatorDashboardLoopCards(): OperatorDashboardLoopCard[] {
  return [
    buildOperatorDashboardLoopCard({
      idHint: "coding",
      loopName: "Coding loop",
      releaseReadiness: "Release readiness by loop: coding is approval-gated through preview, apply review, validation planning, result capture, and recovery.",
      safetyReadiness: "Safety/audit readiness: code changes do not apply, tests do not run, and git commands do not execute from the dashboard.",
      nextRoute: "Next route: /code-flow.",
    }),
    buildOperatorDashboardLoopCard({
      idHint: "provider",
      loopName: "Provider loop",
      releaseReadiness: "Release readiness by loop: provider readiness is review-only unless a separate approved live-test boundary accepts a request.",
      safetyReadiness: "Safety/audit readiness: provider APIs are not called, prompts are not sent, and token spend does not start from the dashboard.",
      nextRoute: "Next route: /provider-policy-bundle-export-review.",
    }),
    buildOperatorDashboardLoopCard({
      idHint: "creative",
      loopName: "Creative loop",
      releaseReadiness: "Release readiness by loop: creative/local bridge surfaces show reviewed job, artifact, and safety posture only.",
      safetyReadiness: "Safety/audit readiness: media generation, workflow execution, queue execution, and hardware/system commands remain blocked from the dashboard.",
      nextRoute: "Next route: /local-creative.",
    }),
    buildOperatorDashboardLoopCard({
      idHint: "extension",
      loopName: "Extension loop",
      releaseReadiness: "Release readiness by loop: extension architecture, manifest, permission, sandbox, and registry release surfaces remain review-only.",
      safetyReadiness: "Safety/audit readiness: plugins, tools, agents, extension runtime execution, MCP runtime creation, and MCP tool calls remain blocked from the dashboard.",
      nextRoute: "Next route: /extension-registry-release-candidate.",
    }),
    buildOperatorDashboardLoopCard({
      idHint: "research",
      loopName: "Research loop",
      releaseReadiness: "Release readiness by loop: research release is summarized with evidence, citation, conflict, freshness, and report posture.",
      safetyReadiness: "Safety/audit readiness: web/search APIs, source refresh, provider calls, and automatic report export do not run from the dashboard.",
      nextRoute: "Next route: /research-workspace-release-candidate.",
    }),
    buildOperatorDashboardLoopCard({
      idHint: "connector",
      loopName: "Connector loop",
      releaseReadiness: "Release readiness by loop: connector release readiness stays approval-gated with privacy and redaction posture visible.",
      safetyReadiness: "Safety/audit readiness: connector APIs, OAuth, sync, email reads, calendar reads, contact reads, and token storage do not run from the dashboard.",
      nextRoute: "Next route: /connector-release-candidate.",
    }),
    buildOperatorDashboardLoopCard({
      idHint: "automation",
      loopName: "Automation loop",
      releaseReadiness: "Release readiness by loop: automation release summarizes reminder, schedule, watch, notification, and audit readiness.",
      safetyReadiness: "Safety/audit readiness: reminders, schedules, automations, background jobs, polling loops, and notifications are not created from the dashboard.",
      nextRoute: "Next route: /automation-release-candidate.",
    }),
    buildOperatorDashboardLoopCard({
      idHint: "project-knowledge",
      loopName: "Project knowledge loop",
      releaseReadiness: "Release readiness by loop: project knowledge release summarizes snapshot, timeline, decision log, runbook, and memory promotion posture.",
      safetyReadiness: "Safety/audit readiness: files are not read, runbooks are not exported, memory is not ingested, and memory is not promoted automatically from the dashboard.",
      nextRoute: "Next route: /project-knowledge-release-candidate.",
    }),
    buildOperatorDashboardLoopCard({
      idHint: "cross-loop-safety",
      loopName: "Cross-loop safety",
      releaseReadiness: "Release readiness by loop: cross-loop handoff and safety audit pages review handoff readiness before dashboard use.",
      safetyReadiness: "Safety/audit readiness: unresolved audit items stay blocked and private details stay redacted until approved.",
      nextRoute: "Next route: /cross-loop-safety-audit-inbox.",
    }),
  ];
}

export function buildOperatorDashboardReleaseCandidate(
  input: Omit<OperatorDashboardReleaseCandidate, "id"> & { idHint: string }
): OperatorDashboardReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildOperatorDashboardReleaseCandidateStableKey(
      "operator-dashboard-release-candidate",
      idHint,
      input.releaseDecision
    ),
    ...candidate,
  };
}

export function buildOperatorDashboardReleaseCandidates(): OperatorDashboardReleaseCandidate[] {
  const coveredLoopCards = buildOperatorDashboardLoopCards();
  return [
    buildOperatorDashboardReleaseCandidate({
      idHint: "operator-ready-review-dashboard",
      releaseDecision: "ready with fixes",
      dashboardReleaseIdentity:
        "Dashboard release identity: operator-dashboard-release-candidate-operator-ready-review-dashboard.",
      coveredLoopCards,
      releaseReadinessByLoop: coveredLoopCards.map(
        (card) => `${card.loopName}: ${card.releaseReadiness} ${card.safetyReadiness} ${card.nextRoute}`
      ),
      safetyAuditReadiness:
        "Safety/audit readiness: /cross-loop-safety-audit-inbox reviews approval, privacy, provider, connector, local file, automation, execution, and memory boundaries before release.",
      navigationReadiness:
        "Navigation readiness: /workspace-navigation-consolidation-review confirms route coverage, command coverage, and novice-friendly labels before dashboard release.",
      knownGaps: [
        "Known gap: release still needs human acceptance of the guided trial scenario.",
        "Known gap: dashboard copy should keep raw reference data collapsed or secondary.",
        "Known gap: no workflow can run automatically from dashboard cards.",
      ],
      guidedTrialRoute:
        "Guided trial route: /mvp-end-to-end-guided-trial walks through the dashboard as a simulated review-only operator trial.",
      nextRecommendedRoute:
        "Next recommended route: /mvp-end-to-end-guided-trial confirms the MVP path remains understandable before release.",
      advancedDashboardDetails:
        "Advanced dashboard details: operator dashboard release candidate remains review-only and does not execute workflows, run commands, run shell commands, run git commands, run tests, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, export files, apply patches, delete files, call provider APIs, call connector APIs, call web/search APIs, send prompt/file/project/connector data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildOperatorDashboardReleaseCandidate({
      idHint: "blocked-unresolved-audit-items",
      releaseDecision: "blocked",
      dashboardReleaseIdentity:
        "Dashboard release identity: operator-dashboard-release-candidate-blocked-unresolved-audit-items.",
      coveredLoopCards,
      releaseReadinessByLoop: [
        "Release readiness by loop: blocked while any covered loop has an unresolved safety audit item.",
      ],
      safetyAuditReadiness:
        "Safety/audit readiness: blocked because unresolved audit items stay blocked.",
      navigationReadiness:
        "Navigation readiness: blocked if route coverage, command registry coverage, or shortLabel uniqueness is missing.",
      knownGaps: [
        "Known gap: unresolved audit items must be cleared by review.",
        "Known gap: dashboard release cannot become ready by executing workflows automatically.",
      ],
      guidedTrialRoute:
        "Guided trial route: /mvp-end-to-end-guided-trial remains simulated and review-only until approved.",
      nextRecommendedRoute:
        "Next recommended route: /cross-loop-safety-audit-inbox resolves blocked safety items first.",
      advancedDashboardDetails:
        "Advanced dashboard details: blocked dashboard release cannot recover by executing workflows, calling APIs, writing files, storing tokens, promoting memory, mutating Brain graph data, creating automations, sending notifications, or starting background work.",
    }),
  ];
}

export function buildOperatorDashboardReleaseBoundary(): OperatorDashboardReleaseBoundary {
  return {
    operatorDashboardReleaseReviewOnly: true,
    dashboardDoesNotRunWorkflowsAutomatically: true,
    executionBehindExplicitApprovalGates: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeOperatorDashboardReleaseCandidate(
  model: Pick<OperatorDashboardReleaseCandidateModel, "candidates">
): string {
  return `Operator dashboard release candidate audits ${model.candidates.length} dashboard release posture(s). Operator dashboard release remains review-only, dashboard does not run workflows automatically, and execution remains behind explicit approval gates.`;
}

export function buildOperatorDashboardReleaseCandidateModel(): OperatorDashboardReleaseCandidateModel {
  const candidates = buildOperatorDashboardReleaseCandidates();
  const model: OperatorDashboardReleaseCandidateModel = {
    title: "Operator dashboard release candidate",
    summary: "",
    candidates,
    boundary: buildOperatorDashboardReleaseBoundary(),
    dashboardLanguage: [...OPERATOR_DASHBOARD_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Operator dashboard release candidate",
      "Operator dashboard release remains review-only",
      "Dashboard does not run workflows automatically",
      "Execution remains behind explicit approval gates",
      "Dashboard release identity",
      "Covered loop cards",
      "Release readiness by loop",
      "Safety/audit readiness",
      "Navigation readiness",
      "Known gaps",
      "Release decision",
      "Guided trial route",
      "Next recommended route",
      "advanced dashboard details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeOperatorDashboardReleaseCandidate(model) };
}
