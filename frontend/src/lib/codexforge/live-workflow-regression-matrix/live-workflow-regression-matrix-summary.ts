import type {
  LiveWorkflowRegressionMatrix,
  LiveWorkflowRegressionMatrixBoundary,
  LiveWorkflowRegressionMatrixModel,
} from "./live-workflow-regression-matrix-types";
import { buildLiveWorkflowRegressionMatrixStableKey } from "./live-workflow-regression-matrix-types";

export const LIVE_WORKFLOW_REGRESSION_MATRIX_LANGUAGE = [
  "Live workflow regression matrix",
  "Live workflow regression matrix does not run tests",
  "Regression fixes require explicit operator approval",
  "Unresolved regressions stay blocked",
  "Regression groups",
  "Approval safety provider local connector automation checks",
] as const;

export function buildLiveWorkflowRegressionMatrix(
  input: Omit<LiveWorkflowRegressionMatrix, "id"> & { idHint: string }
): LiveWorkflowRegressionMatrix {
  const { idHint, ...review } = input;
  return {
    id: buildLiveWorkflowRegressionMatrixStableKey("live-workflow-regression-matrix", idHint, input.status),
    ...review,
  };
}

export function buildLiveWorkflowRegressionMatrixReviews(): LiveWorkflowRegressionMatrix[] {
  return [
    buildLiveWorkflowRegressionMatrix({
      idHint: "review-only-regression-matrix",
      status: "ready-for-review",
      liveWorkflowRegressionIdentity:
        "Live workflow regression identity: live-workflow-regression-matrix-review-only-regression-matrix.",
      regressionGroups: [
        "Regression groups: approval gates, safety boundaries, provider traffic, local model traffic, connector data, automation rules, evidence capture, result review, feedback review, replay, and hardening.",
      ],
      approvalSafetyProviderLocalConnectorAutomationChecks: [
        "Approval safety provider local connector automation checks: approval required, no provider calls, no local model calls, no connector API calls, no automation creation, and no output storage.",
      ],
      blockedRegressionGaps: [
        "Blocked regression gaps: unresolved regressions stay blocked until reviewed and approved outside this page.",
      ],
      deniedRegressionActions: [
        "Denied regression actions: run tests, execute workflows, apply patches, write files, create automations, call providers, call local models, call connectors, or mutate memory.",
      ],
      failurePatchRoute: "Failure patch route: /live-workflow-failure-patch-review reviews candidate patches without applying them.",
      hardeningPassRoute: "Hardening pass route: /live-workflow-hardening-pass reviews hardening readiness without applying changes.",
      nextRecommendedAction:
        "Next recommended action: keep regression fixes approval-gated, review unresolved gaps, and route candidate fixes to failure patch review.",
      advancedRegressionDetails:
        "Advanced regression details: live workflow regression matrix is review-only. Live workflow regression matrix does not run tests, regression fixes require explicit operator approval, and unresolved regressions stay blocked. It does not execute workflows, apply patches, write files, call providers, call local models, call connectors, create automations, mutate files, or mutate memory.",
    }),
    buildLiveWorkflowRegressionMatrix({
      idHint: "blocked-regression-gap",
      status: "blocked",
      liveWorkflowRegressionIdentity:
        "Live workflow regression identity: live-workflow-regression-matrix-blocked-regression-gap.",
      regressionGroups: [
        "Regression groups: blocked when coverage is missing for approval, safety, provider, local, connector, automation, replay, or hardening boundaries.",
      ],
      approvalSafetyProviderLocalConnectorAutomationChecks: [
        "Approval safety provider local connector automation checks: blocked because regression fixes require explicit operator approval.",
      ],
      blockedRegressionGaps: [
        "Blocked regression gaps: unresolved regressions stay blocked.",
      ],
      deniedRegressionActions: [
        "Denied regression actions: test execution, workflow execution, patch application, file write, and automation creation remain blocked.",
      ],
      failurePatchRoute: "Failure patch route: /live-workflow-failure-patch-review remains review-only.",
      hardeningPassRoute: "Hardening pass route: /live-workflow-hardening-pass remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the regression gap blocked until reviewed and approved outside this page.",
      advancedRegressionDetails:
        "Advanced regression details: blocked regression cannot recover by running tests, executing workflows, applying patches, writing files, or mutating memory.",
    }),
  ];
}

export function buildLiveWorkflowRegressionMatrixBoundary(): LiveWorkflowRegressionMatrixBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    liveWorkflowLaunchAllowedFromUi: false,
    liveActionExecutionAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    autoApprovalAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    evidenceAutoIngestionAllowedFromUi: false,
    resultAutoIngestionAllowedFromUi: false,
    feedbackAutoIngestionAllowedFromUi: false,
    recoveryAutoTriggerAllowedFromUi: false,
    replayExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    creativeAssetGenerationAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    hardeningApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
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

export function summarizeLiveWorkflowRegressionMatrix(
  model: Pick<LiveWorkflowRegressionMatrixModel, "reviews">
): string {
  return `Live workflow regression matrix tracks safety and quality coverage without running tests across ${model.reviews.length} regression matrix row(s). Live workflow regression matrix does not run tests, regression fixes require explicit operator approval, and unresolved regressions stay blocked.`;
}

export function buildLiveWorkflowRegressionMatrixModel(): LiveWorkflowRegressionMatrixModel {
  const reviews = buildLiveWorkflowRegressionMatrixReviews();
  const model: LiveWorkflowRegressionMatrixModel = {
    title: "Live workflow regression matrix",
    summary: "",
    reviews,
    boundary: buildLiveWorkflowRegressionMatrixBoundary(),
    reviewLanguage: [...LIVE_WORKFLOW_REGRESSION_MATRIX_LANGUAGE],
    advancedDetails: [
      "Live workflow regression matrix",
      "Live workflow regression matrix does not run tests",
      "Regression fixes require explicit operator approval",
      "Unresolved regressions stay blocked",
      "Regression groups",
      "Approval safety provider local connector automation checks",
      "live workflow regression identity",
      "live workflow regression identity",
      "Regression groups",
      "Approval safety provider local connector automation checks",
      "blocked regression gaps",
      "denied regression actions",
      "failure patch route",
      "hardening pass route",
      "next recommended action",
      "advanced regression details collapsed/secondary",
      "review-only",
      "approval required",
      "advanced details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLiveWorkflowRegressionMatrix(model) };
}
