import type {
  MvpHardeningRegressionMatrix,
  MvpHardeningRegressionMatrixBoundary,
  MvpHardeningRegressionMatrixLoopCoverage,
  MvpHardeningRegressionMatrixModel,
} from "./mvp-hardening-regression-matrix-types";
import { buildMvpHardeningRegressionMatrixStableKey } from "./mvp-hardening-regression-matrix-types";

export const MVP_HARDENING_REGRESSION_MATRIX_LANGUAGE = [
  "MVP hardening regression matrix",
  "Regression matrix does not run tests from this page",
  "Hardening checks are reviewed before release",
  "Unresolved regressions stay blocked",
  "Core loop coverage",
  "Release candidate route",
] as const;

export function buildMvpHardeningRegressionMatrixLoopCoverage(
  input: Omit<MvpHardeningRegressionMatrixLoopCoverage, "id"> & { idHint: string }
): MvpHardeningRegressionMatrixLoopCoverage {
  const { idHint, ...coverage } = input;
  return {
    id: buildMvpHardeningRegressionMatrixStableKey(
      "mvp-hardening-regression-matrix-loop",
      idHint,
      input.loopName
    ),
    ...coverage,
  };
}

export function buildMvpHardeningRegressionMatrixLoopCoverages(): MvpHardeningRegressionMatrixLoopCoverage[] {
  return [
    buildMvpHardeningRegressionMatrixLoopCoverage({
      idHint: "coding-provider",
      loopName: "Coding and provider loops",
      coverageSummary:
        "Core loop coverage: coding preview, apply approval, validation capture, provider policy, live-test boundary, and provider recovery remain reviewed.",
      safetyBoundaryCoverage:
        "Safety boundary coverage: no tests, shell commands, git commands, provider API calls, token spend, or prompt/file/project data sending runs from the matrix.",
      routeNavigationCoverage:
        "Route/navigation coverage: /code-flow, /apply-validation, /provider-policy-bundle-export-review, and /operator-dashboard-release-candidate remain linked through the release path.",
    }),
    buildMvpHardeningRegressionMatrixLoopCoverage({
      idHint: "creative-extension",
      loopName: "Creative and extension loops",
      coverageSummary:
        "Core loop coverage: creative workflow review, local bridge posture, artifact review, extension architecture, permission policy, sandbox boundary, and registry release are included.",
      safetyBoundaryCoverage:
        "Safety boundary coverage: no media generation, queue execution, hardware/system command, plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, or MCP tool call starts.",
      routeNavigationCoverage:
        "Route/navigation coverage: /local-creative, /creative-sandbox, /extension-registry-release-candidate, and /mcp-tool-boundary-comparison stay review routes.",
    }),
    buildMvpHardeningRegressionMatrixLoopCoverage({
      idHint: "research-connector",
      loopName: "Research and connector loops",
      coverageSummary:
        "Core loop coverage: evidence inbox, report export review, runbook posture, connector privacy, redaction review, and connector release readiness are included.",
      safetyBoundaryCoverage:
        "Safety boundary coverage: no web/search API call, source refresh, provider request, connector API call, OAuth flow, sync, token storage, or secret display runs.",
      routeNavigationCoverage:
        "Route/navigation coverage: /research-workspace-release-candidate, /research-runbook-finalization, /connector-release-candidate, and /cross-loop-safety-audit-inbox stay visible.",
    }),
    buildMvpHardeningRegressionMatrixLoopCoverage({
      idHint: "automation-project-dashboard",
      loopName: "Automation, project knowledge, and dashboard loops",
      coverageSummary:
        "Core loop coverage: reminders, scheduled checks, conditional watches, notification shell, project snapshots, project runbook review, memory boundary, dashboard release, and guided trial are included.",
      safetyBoundaryCoverage:
        "Safety boundary coverage: no reminder, task schedule, automation, background job, notification, polling loop, arbitrary local file browsing, file write, file export, memory ingestion, or memory auto-promotion runs.",
      routeNavigationCoverage:
        "Route/navigation coverage: /automation-release-candidate, /project-knowledge-release-candidate, /operator-dashboard-release-candidate, and /mvp-end-to-end-guided-trial remain protected.",
    }),
  ];
}

export function buildMvpHardeningRegressionMatrix(
  input: Omit<MvpHardeningRegressionMatrix, "id"> & { idHint: string }
): MvpHardeningRegressionMatrix {
  const { idHint, ...matrix } = input;
  return {
    id: buildMvpHardeningRegressionMatrixStableKey("mvp-hardening-regression-matrix", idHint, input.status),
    ...matrix,
  };
}

export function buildMvpHardeningRegressionMatrices(): MvpHardeningRegressionMatrix[] {
  const coreLoopCoverage = buildMvpHardeningRegressionMatrixLoopCoverages();
  return [
    buildMvpHardeningRegressionMatrix({
      idHint: "foundation-hardening-review",
      status: "ready-for-review",
      regressionMatrixIdentity:
        "Regression matrix identity: mvp-hardening-regression-matrix-foundation-hardening-review.",
      sourceGuidedTrial:
        "Source guided trial: /mvp-end-to-end-guided-trial supplies the simulated review-only operator path that this hardening matrix reviews before release.",
      coreLoopCoverage,
      buildSmokeCoverageSummary:
        "Build/smoke coverage summary: build and smoke outcomes are reviewed as operator-provided evidence only; no build execution from UI, no smoke execution from UI, and no test execution from UI occurs from this page.",
      safetyBoundaryCoverage:
        "Safety boundary coverage: approval, provider, connector, web/search, local file, command, git, shell, memory, Brain graph, automation, plugin, tool, agent, extension runtime, MCP, token, secret, and route coverage boundaries remain blocked from UI execution.",
      routeNavigationCoverage:
        "Route/navigation coverage: navigation shell and command registry coverage stay present for the guided trial, dashboard release candidate, hardening matrix, and foundation release candidate route.",
      knownGaps: [
        "Known gap: human reviewer still needs to confirm the current build and smoke evidence outside this page.",
        "Known gap: unresolved regressions stay blocked and cannot be cleared by clicking the matrix.",
        "Known gap: release readiness still needs the foundation release candidate decision.",
      ],
      releaseCandidateRoute:
        "Release candidate route: /codexforge-foundation-release-candidate reviews the full foundation release decision after hardening coverage is accepted.",
      blockedReasons: [
        "Blocked reason: missing reviewed build/smoke evidence.",
        "Blocked reason: unresolved regression or safety audit item.",
        "Blocked reason: route or command coverage missing from the release path.",
      ],
      advancedRegressionDetails:
        "Advanced regression details: MVP hardening regression matrix is review-only and does not run tests, run builds, run smoke checks, execute workflows, ship releases, run commands, run shell commands, run git commands, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, export files, apply patches, delete files, call provider APIs, call connector APIs, call web/search APIs, send prompt/file/project/connector data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildMvpHardeningRegressionMatrix({
      idHint: "blocked-unresolved-regression",
      status: "blocked",
      regressionMatrixIdentity:
        "Regression matrix identity: mvp-hardening-regression-matrix-blocked-unresolved-regression.",
      sourceGuidedTrial:
        "Source guided trial: blocked until /mvp-end-to-end-guided-trial has reviewed each core loop without implying real execution.",
      coreLoopCoverage,
      buildSmokeCoverageSummary:
        "Build/smoke coverage summary: blocked until a human reviewer supplies current build, smoke, and regression notes outside this page.",
      safetyBoundaryCoverage:
        "Safety boundary coverage: blocked when any execution, provider, connector, local file, automation, or memory boundary is unresolved.",
      routeNavigationCoverage:
        "Route/navigation coverage: blocked if route coverage, command registry coverage, duplicate route href checks, or duplicate shortLabel checks are missing.",
      knownGaps: [
        "Known gap: unresolved regression still needs owner review.",
        "Known gap: blocked hardening evidence cannot be replaced by automatic test execution.",
      ],
      releaseCandidateRoute:
        "Release candidate route: /codexforge-foundation-release-candidate remains unavailable until hardening checks are reviewed before release.",
      blockedReasons: [
        "Blocked reason: unresolved regressions stay blocked.",
        "Blocked reason: regression matrix does not run tests from this page.",
      ],
      advancedRegressionDetails:
        "Advanced regression details: blocked matrix entries stay blocked and cannot recover by running tests, running builds, running smoke checks, shipping a release, executing workflows, calling APIs, writing files, storing tokens, promoting memory, mutating Brain graph data, creating automations, sending notifications, or starting background work.",
    }),
  ];
}

export function buildMvpHardeningRegressionMatrixBoundary(): MvpHardeningRegressionMatrixBoundary {
  return {
    regressionMatrixReviewOnly: true,
    regressionMatrixDoesNotRunTestsFromPage: true,
    hardeningChecksReviewedBeforeRelease: true,
    unresolvedRegressionsStayBlocked: true,
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
    regressionChecksRunFromUiAllowed: false,
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

export function summarizeMvpHardeningRegressionMatrix(
  model: Pick<MvpHardeningRegressionMatrixModel, "matrices">
): string {
  return `MVP hardening regression matrix reviews ${model.matrices.length} release hardening posture(s). Regression matrix does not run tests from this page, hardening checks are reviewed before release, and unresolved regressions stay blocked.`;
}

export function buildMvpHardeningRegressionMatrixModel(): MvpHardeningRegressionMatrixModel {
  const matrices = buildMvpHardeningRegressionMatrices();
  const model: MvpHardeningRegressionMatrixModel = {
    title: "MVP hardening regression matrix",
    summary: "",
    matrices,
    boundary: buildMvpHardeningRegressionMatrixBoundary(),
    regressionLanguage: [...MVP_HARDENING_REGRESSION_MATRIX_LANGUAGE],
    advancedDetails: [
      "MVP hardening regression matrix",
      "Regression matrix does not run tests from this page",
      "Hardening checks are reviewed before release",
      "Unresolved regressions stay blocked",
      "Regression matrix identity",
      "Source guided trial",
      "Core loop coverage",
      "Build/smoke coverage summary",
      "Safety boundary coverage",
      "Route/navigation coverage",
      "Known gaps",
      "Release candidate route",
      "Blocked reasons",
      "advanced regression details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeMvpHardeningRegressionMatrix(model) };
}
