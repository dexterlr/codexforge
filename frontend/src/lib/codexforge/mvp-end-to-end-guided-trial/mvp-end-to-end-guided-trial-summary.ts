import type {
  MvpEndToEndGuidedTrial,
  MvpEndToEndGuidedTrialBoundary,
  MvpEndToEndGuidedTrialModel,
  MvpEndToEndGuidedTrialStep,
} from "./mvp-end-to-end-guided-trial-types";
import { buildMvpEndToEndGuidedTrialStableKey } from "./mvp-end-to-end-guided-trial-types";

export const MVP_END_TO_END_GUIDED_TRIAL_LANGUAGE = [
  "MVP end-to-end guided trial",
  "Guided trial is review-only until approved",
  "No workflow runs automatically",
  "Blocked actions remain blocked",
  "Trial scenario summary",
  "Expected review gates",
] as const;

export function buildMvpEndToEndGuidedTrialStep(
  input: Omit<MvpEndToEndGuidedTrialStep, "id"> & { idHint: string }
): MvpEndToEndGuidedTrialStep {
  const { idHint, ...step } = input;
  return {
    id: buildMvpEndToEndGuidedTrialStableKey("mvp-end-to-end-guided-trial-step", idHint, input.loopName),
    ...step,
  };
}

export function buildMvpEndToEndGuidedTrialSteps(): MvpEndToEndGuidedTrialStep[] {
  return [
    buildMvpEndToEndGuidedTrialStep({
      idHint: "coding",
      loopName: "Coding loop",
      stepSummary: "Trial step: review a safe coding goal, patch preview posture, validation plan, result capture, and recovery handoff.",
      expectedReviewGate: "Expected review gate: explicit apply approval and separate validation approval.",
      simulatedOutcome: "Simulated outcome: operator understands the safe route without applying a patch or running tests from UI.",
      blockedActions: ["Blocked action: patch apply.", "Blocked action: command, shell, git, and test execution."],
      route: "Route: /code-flow.",
    }),
    buildMvpEndToEndGuidedTrialStep({
      idHint: "provider",
      loopName: "Provider loop",
      stepSummary: "Trial step: review provider policy, live-test boundaries, cost/latency posture, and failure recovery posture.",
      expectedReviewGate: "Expected review gate: explicit provider live-test approval before any API request.",
      simulatedOutcome: "Simulated outcome: no provider API call, prompt send, token spend, or provider retry starts.",
      blockedActions: ["Blocked action: provider API call.", "Blocked action: prompt/file/project data sending without approval."],
      route: "Route: /provider-policy-bundle-export-review.",
    }),
    buildMvpEndToEndGuidedTrialStep({
      idHint: "creative",
      loopName: "Creative loop",
      stepSummary: "Trial step: review creative/local bridge posture, workflow safety, artifact review, and queue boundaries.",
      expectedReviewGate: "Expected review gate: explicit creative execution approval and approved local bridge boundary.",
      simulatedOutcome: "Simulated outcome: no media generation, workflow execution, queue execution, or hardware/system command runs.",
      blockedActions: ["Blocked action: workflow execution.", "Blocked action: job queue execution.", "Blocked action: media generation."],
      route: "Route: /local-creative.",
    }),
    buildMvpEndToEndGuidedTrialStep({
      idHint: "extension",
      loopName: "Extension loop",
      stepSummary: "Trial step: review extension architecture, manifest, permission policy, sandbox boundary, and registry release posture.",
      expectedReviewGate: "Expected review gate: explicit extension runtime approval outside this simulated trial.",
      simulatedOutcome: "Simulated outcome: no plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, or MCP tool call starts.",
      blockedActions: ["Blocked action: plugin execution.", "Blocked action: tool execution.", "Blocked action: MCP runtime creation."],
      route: "Route: /extension-registry-release-candidate.",
    }),
    buildMvpEndToEndGuidedTrialStep({
      idHint: "research",
      loopName: "Research loop",
      stepSummary: "Trial step: review evidence inbox, claim builder, citation draft, report export review, conflict resolver, and freshness boundary.",
      expectedReviewGate: "Expected review gate: explicit approval before web/search, source refresh, provider call, or report export.",
      simulatedOutcome: "Simulated outcome: no web/search API call, source fetch, source refresh, citation finalization, or file export runs.",
      blockedActions: ["Blocked action: web/search API call.", "Blocked action: source refresh.", "Blocked action: report export/write behavior."],
      route: "Route: /research-workspace-release-candidate.",
    }),
    buildMvpEndToEndGuidedTrialStep({
      idHint: "connector",
      loopName: "Connector loop",
      stepSummary: "Trial step: review connector privacy, redaction, evidence capture, and release readiness.",
      expectedReviewGate: "Expected review gate: explicit connector approval before OAuth, sync, or connector data access.",
      simulatedOutcome: "Simulated outcome: no connector API call, OAuth request, email read, calendar read, contact read, sync, token storage, or secret display occurs.",
      blockedActions: ["Blocked action: connector API call.", "Blocked action: OAuth request.", "Blocked action: connector token storage."],
      route: "Route: /connector-release-candidate.",
    }),
    buildMvpEndToEndGuidedTrialStep({
      idHint: "automation",
      loopName: "Automation loop",
      stepSummary: "Trial step: review reminders, scheduled research checks, conditional watches, notification center, and audit recovery readiness.",
      expectedReviewGate: "Expected review gate: explicit automation approval before reminders, schedules, watches, notifications, polling, or background work.",
      simulatedOutcome: "Simulated outcome: no reminder, schedule, automation, background job, polling loop, or notification is created.",
      blockedActions: ["Blocked action: reminder creation.", "Blocked action: task scheduling.", "Blocked action: background job creation."],
      route: "Route: /automation-release-candidate.",
    }),
    buildMvpEndToEndGuidedTrialStep({
      idHint: "project-knowledge",
      loopName: "Project knowledge loop",
      stepSummary: "Trial step: review snapshot, timeline, decision log, runbook export, memory boundary, and knowledge release posture.",
      expectedReviewGate: "Expected review gate: explicit local project and memory approval before file reads, exports, ingestion, or memory promotion.",
      simulatedOutcome: "Simulated outcome: no arbitrary project scanning, file browsing, path crawling, file read/open, file export, memory ingestion, or memory auto-promotion occurs.",
      blockedActions: ["Blocked action: arbitrary local file browsing.", "Blocked action: file export/write behavior.", "Blocked action: memory auto-promotion."],
      route: "Route: /project-knowledge-release-candidate.",
    }),
    buildMvpEndToEndGuidedTrialStep({
      idHint: "dashboard",
      loopName: "Operator dashboard",
      stepSummary: "Trial step: review dashboard release decision, loop cards, safety audit readiness, navigation readiness, and next recommended route.",
      expectedReviewGate: "Expected review gate: explicit operator release decision after safety audit and dashboard review.",
      simulatedOutcome: "Simulated outcome: dashboard remains review-only and does not run workflows automatically.",
      blockedActions: ["Blocked action: workflow execution.", "Blocked action: dashboard-triggered local or cloud action."],
      route: "Route: /operator-dashboard-release-candidate.",
    }),
  ];
}

export function buildMvpEndToEndGuidedTrial(
  input: Omit<MvpEndToEndGuidedTrial, "id"> & { idHint: string }
): MvpEndToEndGuidedTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildMvpEndToEndGuidedTrialStableKey("mvp-end-to-end-guided-trial", idHint, input.status),
    ...trial,
  };
}

export function buildMvpEndToEndGuidedTrials(): MvpEndToEndGuidedTrial[] {
  const steps = buildMvpEndToEndGuidedTrialSteps();
  return [
    buildMvpEndToEndGuidedTrial({
      idHint: "operator-review-only-foundation-trial",
      status: "ready-for-review",
      guidedTrialIdentity:
        "Guided trial identity: mvp-end-to-end-guided-trial-operator-review-only-foundation-trial.",
      trialScenarioSummary:
        "Trial scenario summary: a novice operator reviews one safe handoff across coding, provider, creative, extension, research, connector, automation, project knowledge, and dashboard loops without executing workflows.",
      steps,
      expectedReviewGates: steps.map((step) => step.expectedReviewGate),
      simulatedOutcomes: steps.map((step) => step.simulatedOutcome),
      blockedActions: steps.flatMap((step) => step.blockedActions),
      regressionMatrixRoute:
        "Regression matrix route: /stabilization reviews build, smoke, regression, route, command, and safety posture after the simulated trial.",
      releaseCandidateRoute:
        "Release candidate route: /operator-dashboard-release-candidate reviews dashboard release readiness before any real operator release decision.",
      advancedTrialDetails:
        "Advanced trial details: MVP end-to-end guided trial is review-only until approved and does not execute workflows, run commands, run shell commands, run git commands, run tests, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, export files, apply patches, delete files, call provider APIs, call connector APIs, call web/search APIs, send prompt/file/project/connector data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildMvpEndToEndGuidedTrial({
      idHint: "blocked-live-execution-request",
      status: "blocked",
      guidedTrialIdentity:
        "Guided trial identity: mvp-end-to-end-guided-trial-blocked-live-execution-request.",
      trialScenarioSummary:
        "Trial scenario summary: blocked if the trial request asks to execute a workflow, run tests from UI, call APIs, write files, create automations, or promote memory.",
      steps,
      expectedReviewGates: [
        "Expected review gates: blocked actions remain blocked until a separate explicit approval gate exists.",
      ],
      simulatedOutcomes: [
        "Simulated outcome: blocked trial keeps the operator on review-only routes.",
      ],
      blockedActions: [
        "Blocked action: no workflow runs automatically.",
        "Blocked action: no action is executed from this simulated trial.",
      ],
      regressionMatrixRoute:
        "Regression matrix route: /stabilization stays the review route for blocked trial findings.",
      releaseCandidateRoute:
        "Release candidate route: /operator-dashboard-release-candidate remains blocked until safety audit items are clear.",
      advancedTrialDetails:
        "Advanced trial details: blocked guided trial cannot recover by executing workflows, calling APIs, running tests, writing files, storing tokens, promoting memory, mutating Brain graph data, creating automations, sending notifications, or starting background work.",
    }),
  ];
}

export function buildMvpEndToEndGuidedTrialBoundary(): MvpEndToEndGuidedTrialBoundary {
  return {
    guidedTrialReviewOnlyUntilApproved: true,
    noWorkflowRunsAutomatically: true,
    blockedActionsRemainBlocked: true,
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

export function summarizeMvpEndToEndGuidedTrial(
  model: Pick<MvpEndToEndGuidedTrialModel, "trials">
): string {
  return `MVP end-to-end guided trial prepares ${model.trials.length} simulated operator trial posture(s). Guided trial is review-only until approved, no workflow runs automatically, and blocked actions remain blocked.`;
}

export function buildMvpEndToEndGuidedTrialModel(): MvpEndToEndGuidedTrialModel {
  const trials = buildMvpEndToEndGuidedTrials();
  const model: MvpEndToEndGuidedTrialModel = {
    title: "MVP end-to-end guided trial",
    summary: "",
    trials,
    boundary: buildMvpEndToEndGuidedTrialBoundary(),
    trialLanguage: [...MVP_END_TO_END_GUIDED_TRIAL_LANGUAGE],
    advancedDetails: [
      "MVP end-to-end guided trial",
      "Guided trial is review-only until approved",
      "No workflow runs automatically",
      "Blocked actions remain blocked",
      "Guided trial identity",
      "Trial scenario summary",
      "Expected review gates",
      "Simulated outcomes",
      "Blocked actions",
      "Regression matrix route",
      "Release candidate route",
      "advanced trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeMvpEndToEndGuidedTrial(model) };
}
