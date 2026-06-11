import type {
  OperatorCockpitReleaseCandidate,
  OperatorCockpitReleaseCandidateBoundary,
  OperatorCockpitReleaseCandidateModel,
} from "./operator-cockpit-release-candidate-types";
import { buildOperatorCockpitReleaseCandidateStableKey } from "./operator-cockpit-release-candidate-types";

export const OPERATOR_COCKPIT_RELEASE_CANDIDATE_LANGUAGE = [
  "Operator cockpit release candidate",
  "Operator cockpit release candidate does not execute workflows",
  "Cockpit release requires explicit operator approval",
  "Unresolved blockers remain blocked",
  "Workflow readiness summary",
  "Safety and approval summary",
] as const;

export function buildOperatorCockpitReleaseCandidate(
  input: Omit<OperatorCockpitReleaseCandidate, "id"> & { idHint: string }
): OperatorCockpitReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildOperatorCockpitReleaseCandidateStableKey("operator-cockpit-release-candidate", idHint, input.status),
    ...candidate,
  };
}

export function buildOperatorCockpitReleaseCandidates(): OperatorCockpitReleaseCandidate[] {
  return [
    buildOperatorCockpitReleaseCandidate({
      idHint: "review-only-cockpit-release-candidate",
      status: "ready-with-fixes",
      operatorCockpitReleaseCandidateIdentity:
        "Operator cockpit release candidate identity: operator-cockpit-release-candidate-review-only-cockpit-release-candidate.",
      readinessGroups: [
        "Readiness groups: creative workflow readiness, research workflow readiness, coding workflow readiness, provider routing readiness, local bridge readiness, connector permission readiness, automation permission readiness, unified workspace search readiness, and safety approval readiness.",
        "Readiness groups: every group is reviewed from static readiness language only; operator cockpit release candidate does not execute workflows.",
      ],
      workflowReadinessSummary: [
        "Workflow readiness summary: creative readiness does not generate assets, research readiness does not run research, and coding readiness does not apply code.",
        "Workflow readiness summary: creative, research, and coding workflows remain approval-gated and blocked until explicit operator approval exists elsewhere.",
      ],
      providerLocalConnectorAutomationReadinessSummary: [
        "Provider/local/connector/automation readiness summary: provider routing, local bridge, connector permission, and automation permission audits remain review-only and do not call APIs, local services, connectors, or automation runtimes.",
        "Provider/local/connector/automation readiness summary: unresolved provider, local, connector, automation, and search blockers remain blocked.",
      ],
      safetyApprovalSummary: [
        "Safety and approval summary: cockpit release requires explicit operator approval, no approval is granted automatically, and no workflow can run from this page.",
        "Safety and approval summary: route coverage, command coverage, secret handling, file boundaries, memory boundaries, and review-only copy must stay intact before release.",
      ],
      blockedReleaseCandidateRisks: [
        "Blocked release candidate risks: unresolved workflow blockers, provider traffic requests, local bridge calls, connector calls, automation creation, live search, file mutation, memory mutation, token storage, missing validation, and missing operator approval.",
        "Blocked release candidate risks: release or publish requests remain blocked from this UI.",
      ],
      betaHardeningRoute:
        "Beta hardening route: /mvp-hardening-regression-matrix reviews beta hardening risks without executing workflows.",
      betaReleaseCandidateRoute:
        "Beta release candidate route: /foundation-beta-candidate reviews beta release readiness without publishing.",
      nextRecommendedAction:
        "Next recommended action: review unresolved blockers, then use the beta hardening route before any beta release candidate decision.",
      advancedCockpitReadinessDetails:
        "Advanced cockpit readiness details: operator cockpit release candidate is review-only. Operator cockpit release candidate does not execute workflows, cockpit release requires explicit operator approval, and unresolved blockers remain blocked. It does not execute creative workflows, generate assets, run research, browse, search, fetch, ingest evidence, apply code, run tests, run builds, run smoke checks, run shell commands, run git commands, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, launch local tools, create automations, create reminders, schedule tasks, create background jobs, send notifications, start polling loops, send prompt/file/project/connector/provider/workflow data without approval, scan projects, browse local files, crawl paths, read local files, open local files, auto-open files, mutate files, write files, delete files, export files, apply patches, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, publish releases, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildOperatorCockpitReleaseCandidate({
      idHint: "blocked-unresolved-workflow-readiness",
      status: "blocked",
      operatorCockpitReleaseCandidateIdentity:
        "Operator cockpit release candidate identity: operator-cockpit-release-candidate-blocked-unresolved-workflow-readiness.",
      readinessGroups: [
        "Readiness groups: blocked while any creative, research, coding, provider, local bridge, connector, automation, search, or safety group carries an unresolved blocker.",
      ],
      workflowReadinessSummary: [
        "Workflow readiness summary: blocked when creative generation, research execution, or code application is requested from this page.",
      ],
      providerLocalConnectorAutomationReadinessSummary: [
        "Provider/local/connector/automation readiness summary: blocked while API calls, local bridge calls, connector calls, or automation creation are requested.",
      ],
      safetyApprovalSummary: [
        "Safety and approval summary: blocked because cockpit release requires explicit operator approval and no approval is granted here.",
      ],
      blockedReleaseCandidateRisks: [
        "Blocked release candidate risks: unresolved blockers remain blocked and cannot be cleared by executing workflows.",
      ],
      betaHardeningRoute:
        "Beta hardening route: /mvp-hardening-regression-matrix remains review-only.",
      betaReleaseCandidateRoute:
        "Beta release candidate route: /foundation-beta-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep cockpit release blocked until the specific readiness blocker is reviewed elsewhere.",
      advancedCockpitReadinessDetails:
        "Advanced cockpit readiness details: blocked cockpit release cannot recover by executing workflows, calling APIs, writing files, storing tokens, promoting memory, creating automations, sending notifications, or publishing a release.",
    }),
  ];
}

export function buildOperatorCockpitReleaseCandidateBoundary(): OperatorCockpitReleaseCandidateBoundary {
  return {
    operatorCockpitReleaseCandidateReviewOnly: true,
    operatorCockpitReleaseCandidateDoesNotExecuteWorkflows: true,
    cockpitReleaseRequiresExplicitOperatorApproval: true,
    unresolvedBlockersRemainBlocked: true,
    releasePublishAllowedFromUi: false,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    creativeWorkflowExecutionAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    assetGenerationAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderWorkflowDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
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

export function summarizeOperatorCockpitReleaseCandidate(
  model: Pick<OperatorCockpitReleaseCandidateModel, "candidates">
): string {
  return `Operator cockpit release candidate reviews ${model.candidates.length} cockpit release posture(s). Operator cockpit release candidate does not execute workflows, cockpit release requires explicit operator approval, and unresolved blockers remain blocked.`;
}

export function buildOperatorCockpitReleaseCandidateModel(): OperatorCockpitReleaseCandidateModel {
  const candidates = buildOperatorCockpitReleaseCandidates();
  const model: OperatorCockpitReleaseCandidateModel = {
    title: "Operator cockpit release candidate",
    summary: "",
    candidates,
    boundary: buildOperatorCockpitReleaseCandidateBoundary(),
    cockpitLanguage: [...OPERATOR_COCKPIT_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Operator cockpit release candidate",
      "operator cockpit release candidate identity",
      "readiness groups",
      "Workflow readiness summary",
      "provider/local/connector/automation readiness summary",
      "Safety and approval summary",
      "blocked release candidate risks",
      "beta hardening route",
      "beta release candidate route",
      "next recommended action",
      "Operator cockpit release candidate does not execute workflows",
      "Cockpit release requires explicit operator approval",
      "Unresolved blockers remain blocked",
      "advanced cockpit readiness details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeOperatorCockpitReleaseCandidate(model) };
}
