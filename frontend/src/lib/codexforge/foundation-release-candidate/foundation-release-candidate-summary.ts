import type {
  FoundationReleaseCandidate,
  FoundationReleaseCandidateBoundary,
  FoundationReleaseCandidateModel,
  FoundationReleaseLoopReadiness,
} from "./foundation-release-candidate-types";
import { buildFoundationReleaseCandidateStableKey } from "./foundation-release-candidate-types";

export const FOUNDATION_RELEASE_CANDIDATE_LANGUAGE = [
  "CodexForge foundation release candidate",
  "Foundation release candidate remains review-only",
  "Release does not ship automatically",
  "Execution remains behind explicit approval gates",
  "Release readiness by loop",
  "Release decision",
] as const;

export function buildFoundationReleaseLoopReadiness(
  input: Omit<FoundationReleaseLoopReadiness, "id"> & { idHint: string }
): FoundationReleaseLoopReadiness {
  const { idHint, ...readiness } = input;
  return {
    id: buildFoundationReleaseCandidateStableKey("foundation-release-loop-readiness", idHint, input.loopName),
    ...readiness,
  };
}

export function buildFoundationReleaseLoopReadinessList(): FoundationReleaseLoopReadiness[] {
  return [
    buildFoundationReleaseLoopReadiness({
      idHint: "coding-provider",
      loopName: "Coding and provider foundation",
      releaseReadiness:
        "Release readiness by loop: coding and provider paths have reviewed preview, apply, validation, provider policy, live-test gate, and recovery posture.",
      approvalGate:
        "Approval gate: code apply, command execution, tests, provider calls, token spend, and prompt/file/project data sending remain behind explicit approval gates.",
      route: "Route: /code-flow and /provider-policy-bundle-export-review.",
    }),
    buildFoundationReleaseLoopReadiness({
      idHint: "creative-extension",
      loopName: "Creative and extension foundation",
      releaseReadiness:
        "Release readiness by loop: creative workflow review, local bridge review, extension architecture, permission policy, sandbox boundary, and registry release are ready with review notes.",
      approvalGate:
        "Approval gate: generation, queue execution, hardware/system commands, plugin execution, tool execution, agent execution, extension runtime execution, and MCP runtime behavior stay blocked.",
      route: "Route: /local-creative and /extension-registry-release-candidate.",
    }),
    buildFoundationReleaseLoopReadiness({
      idHint: "research-connector-automation",
      loopName: "Research, connector, and automation foundation",
      releaseReadiness:
        "Release readiness by loop: research release, connector release, notification shell, reminder boundary, scheduled research boundary, and conditional watch inbox are reviewed.",
      approvalGate:
        "Approval gate: web/search calls, source refresh, connector APIs, OAuth, sync, token storage, reminders, schedules, watches, notifications, background work, and polling loops stay blocked.",
      route: "Route: /research-workspace-release-candidate, /connector-release-candidate, and /automation-release-candidate.",
    }),
    buildFoundationReleaseLoopReadiness({
      idHint: "project-dashboard-hardening",
      loopName: "Project knowledge, dashboard, and hardening foundation",
      releaseReadiness:
        "Release readiness by loop: project knowledge release, unified home, navigation review, cross-loop handoff, safety audit, dashboard release, guided trial, and hardening matrix are reviewed together.",
      approvalGate:
        "Approval gate: arbitrary local project scanning, file browsing, file writes, exports, memory ingestion, memory auto-promotion, Brain graph mutation, and release shipping stay blocked.",
      route: "Route: /project-knowledge-release-candidate, /operator-dashboard-release-candidate, /mvp-hardening-regression-matrix.",
    }),
  ];
}

export function buildFoundationReleaseCandidate(
  input: Omit<FoundationReleaseCandidate, "id"> & { idHint: string }
): FoundationReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildFoundationReleaseCandidateStableKey("foundation-release-candidate", idHint, input.releaseDecision),
    ...candidate,
  };
}

export function buildFoundationReleaseCandidates(): FoundationReleaseCandidate[] {
  const coveredFoundationLoops = buildFoundationReleaseLoopReadinessList();
  return [
    buildFoundationReleaseCandidate({
      idHint: "ready-with-fixes-review-candidate",
      releaseDecision: "ready with fixes",
      foundationReleaseIdentity:
        "Foundation release identity: codexforge-foundation-release-candidate-ready-with-fixes-review-candidate.",
      coveredFoundationLoops,
      releaseReadinessByLoop: coveredFoundationLoops.map(
        (loop) => `${loop.loopName}: ${loop.releaseReadiness} ${loop.approvalGate} ${loop.route}`
      ),
      regressionReadiness:
        "Regression readiness: /mvp-hardening-regression-matrix reviews core loop coverage, build/smoke evidence, safety boundaries, route/navigation coverage, known gaps, and blocked reasons without running checks.",
      safetyAuditReadiness:
        "Safety/audit readiness: /cross-loop-safety-audit-inbox confirms unresolved audit items stay blocked and no action is executed from release review.",
      operatorDashboardReadiness:
        "Operator dashboard readiness: /operator-dashboard-release-candidate remains review-only and does not run workflows automatically.",
      knownGaps: [
        "Known gap: current build and smoke evidence still need human confirmation outside this page.",
        "Known gap: release runbook must be finalized before operator handoff.",
        "Known gap: first real workflow trial must stay guided and approval-gated.",
      ],
      releaseRunbookRoute:
        "Release runbook route: /foundation-release-runbook-finalization reviews the operator runbook before use.",
      firstRealWorkflowRoute:
        "First real workflow route: /first-real-operator-workflow-trial prepares the guided real workflow trial behind explicit approvals.",
      advancedReleaseDetails:
        "Advanced release details: CodexForge foundation release candidate remains review-only and does not ship releases automatically, execute workflows, run builds, run smoke checks, run tests, run commands, run shell commands, run git commands, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, export files, apply patches, delete files, call provider APIs, call connector APIs, call web/search APIs, send prompt/file/project/connector data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFoundationReleaseCandidate({
      idHint: "blocked-release-boundary",
      releaseDecision: "blocked",
      foundationReleaseIdentity:
        "Foundation release identity: codexforge-foundation-release-candidate-blocked-release-boundary.",
      coveredFoundationLoops,
      releaseReadinessByLoop: [
        "Release readiness by loop: blocked while any foundation loop has unresolved regression, safety, route, command, privacy, or approval-gate coverage.",
      ],
      regressionReadiness:
        "Regression readiness: blocked until hardening checks are reviewed before release and unresolved regressions stay blocked.",
      safetyAuditReadiness:
        "Safety/audit readiness: blocked until safety audit items are accepted without executing any action.",
      operatorDashboardReadiness:
        "Operator dashboard readiness: blocked if dashboard cards imply workflow execution before approval.",
      knownGaps: [
        "Known gap: release decision cannot become ready by running actions from this page.",
        "Known gap: release runbook and first real workflow trial need separate review surfaces.",
      ],
      releaseRunbookRoute:
        "Release runbook route: /foundation-release-runbook-finalization stays blocked until this candidate has a reviewed decision.",
      firstRealWorkflowRoute:
        "First real workflow route: /first-real-operator-workflow-trial stays blocked until release runbook finalization is reviewed.",
      advancedReleaseDetails:
        "Advanced release details: blocked foundation release cannot recover by shipping automatically, executing workflows, calling APIs, writing files, storing tokens, promoting memory, mutating Brain graph data, creating automations, sending notifications, or starting background work.",
    }),
  ];
}

export function buildFoundationReleaseCandidateBoundary(): FoundationReleaseCandidateBoundary {
  return {
    foundationReleaseCandidateReviewOnly: true,
    releaseDoesNotShipAutomatically: true,
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
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    releaseShippingExecutionAllowedFromUi: false,
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

export function summarizeFoundationReleaseCandidate(
  model: Pick<FoundationReleaseCandidateModel, "candidates">
): string {
  return `CodexForge foundation release candidate reviews ${model.candidates.length} foundation release posture(s). Foundation release candidate remains review-only, release does not ship automatically, and execution remains behind explicit approval gates.`;
}

export function buildFoundationReleaseCandidateModel(): FoundationReleaseCandidateModel {
  const candidates = buildFoundationReleaseCandidates();
  const model: FoundationReleaseCandidateModel = {
    title: "CodexForge foundation release candidate",
    summary: "",
    candidates,
    boundary: buildFoundationReleaseCandidateBoundary(),
    releaseLanguage: [...FOUNDATION_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "CodexForge foundation release candidate",
      "Foundation release candidate remains review-only",
      "Release does not ship automatically",
      "Execution remains behind explicit approval gates",
      "Foundation release identity",
      "Covered foundation loops",
      "Release readiness by loop",
      "Regression readiness",
      "Safety/audit readiness",
      "Operator dashboard readiness",
      "Known gaps",
      "Release decision",
      "Release runbook route",
      "First real workflow route",
      "advanced release details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFoundationReleaseCandidate(model) };
}
