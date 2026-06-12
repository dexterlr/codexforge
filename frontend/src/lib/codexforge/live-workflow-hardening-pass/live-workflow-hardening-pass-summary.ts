import type {
  LiveWorkflowHardeningPass,
  LiveWorkflowHardeningPassBoundary,
  LiveWorkflowHardeningPassModel,
} from "./live-workflow-hardening-pass-types";
import { buildLiveWorkflowHardeningPassStableKey } from "./live-workflow-hardening-pass-types";

export const LIVE_WORKFLOW_HARDENING_PASS_LANGUAGE = [
  "Live workflow hardening pass",
  "Live workflow hardening pass does not apply changes",
  "Hardening changes require explicit operator approval",
  "Unresolved hardening risks stay blocked",
  "Hardening groups",
  "Safety boundary checklist",
] as const;

export function buildLiveWorkflowHardeningPass(
  input: Omit<LiveWorkflowHardeningPass, "id"> & { idHint: string }
): LiveWorkflowHardeningPass {
  const { idHint, ...review } = input;
  return {
    id: buildLiveWorkflowHardeningPassStableKey("live-workflow-hardening-pass", idHint, input.status),
    ...review,
  };
}

export function buildLiveWorkflowHardeningPassReviews(): LiveWorkflowHardeningPass[] {
  return [
    buildLiveWorkflowHardeningPass({
      idHint: "review-only-hardening-pass",
      status: "ready-for-review",
      liveWorkflowHardeningIdentity:
        "Live workflow hardening identity: live-workflow-hardening-pass-review-only-hardening-pass.",
      hardeningGroups: [
        "Hardening groups: evidence capture, result review, operator feedback, release candidate, replay, regression matrix, failure patch review, provider guard, local model guard, connector guard, and automation guard.",
      ],
      safetyBoundaryChecklist: [
        "Safety boundary checklist: hardening changes require explicit operator approval and this page does not apply changes.",
      ],
      evidenceResultFeedbackReplayRegressionStatus: [
        "Evidence result feedback replay regression status: evidence redacted, results reviewed, feedback review-only, replay not rerun, regressions blocked until approved.",
      ],
      deniedHardeningActions: [
        "Denied hardening actions: apply changes, execute workflows, apply patches, write files, call providers, call local models, call connectors, create automations, mutate files, or mutate memory.",
      ],
      unresolvedHardeningRisks: [
        "Unresolved hardening risks: unresolved hardening risks stay blocked until reviewed and approved outside this page.",
      ],
      providerLiveGuardRoute: "Provider live guard route: /provider-live-test-gate keeps provider live calls approval-gated.",
      localModelLiveGuardRoute: "Local model live guard route: /local-model-runtime-boundary-review keeps local model calls approval-gated.",
      nextRecommendedAction:
        "Next recommended action: keep hardening review-only, resolve unresolved risks, and require explicit operator approval before applying changes outside this page.",
      advancedHardeningDetails:
        "Advanced hardening details: live workflow hardening pass is review-only. Live workflow hardening pass does not apply changes, hardening changes require explicit operator approval, and unresolved hardening risks stay blocked. It does not execute workflows, call providers, call local models, call connectors, create automations, apply patches, mutate files, mutate memory, or persist approvals.",
    }),
    buildLiveWorkflowHardeningPass({
      idHint: "blocked-hardening-risk",
      status: "blocked",
      liveWorkflowHardeningIdentity:
        "Live workflow hardening identity: live-workflow-hardening-pass-blocked-hardening-risk.",
      hardeningGroups: [
        "Hardening groups: blocked when evidence, results, feedback, replay, regression, failure patch, provider, local model, connector, or automation guardrails are unresolved.",
      ],
      safetyBoundaryChecklist: [
        "Safety boundary checklist: blocked because hardening changes require explicit operator approval.",
      ],
      evidenceResultFeedbackReplayRegressionStatus: [
        "Evidence result feedback replay regression status: blocked until each review surface is complete and still review-only.",
      ],
      deniedHardeningActions: [
        "Denied hardening actions: applying changes, executing workflows, provider calls, local model calls, connector calls, file mutation, and memory mutation remain blocked.",
      ],
      unresolvedHardeningRisks: [
        "Unresolved hardening risks: unresolved hardening risks stay blocked.",
      ],
      providerLiveGuardRoute: "Provider live guard route: /provider-live-test-gate remains approval-gated.",
      localModelLiveGuardRoute: "Local model live guard route: /local-model-runtime-boundary-review remains approval-gated.",
      nextRecommendedAction:
        "Next recommended action: keep hardening blocked until all risks are reviewed and approved outside this page.",
      advancedHardeningDetails:
        "Advanced hardening details: blocked hardening cannot recover by applying changes, executing workflows, calling providers, calling local models, applying patches, or mutating memory.",
    }),
  ];
}

export function buildLiveWorkflowHardeningPassBoundary(): LiveWorkflowHardeningPassBoundary {
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

export function summarizeLiveWorkflowHardeningPass(
  model: Pick<LiveWorkflowHardeningPassModel, "reviews">
): string {
  return `Live workflow hardening pass summarizes hardening readiness without applying changes across ${model.reviews.length} hardening review item(s). Live workflow hardening pass does not apply changes, hardening changes require explicit operator approval, and unresolved hardening risks stay blocked.`;
}

export function buildLiveWorkflowHardeningPassModel(): LiveWorkflowHardeningPassModel {
  const reviews = buildLiveWorkflowHardeningPassReviews();
  const model: LiveWorkflowHardeningPassModel = {
    title: "Live workflow hardening pass",
    summary: "",
    reviews,
    boundary: buildLiveWorkflowHardeningPassBoundary(),
    reviewLanguage: [...LIVE_WORKFLOW_HARDENING_PASS_LANGUAGE],
    advancedDetails: [
      "Live workflow hardening pass",
      "Live workflow hardening pass does not apply changes",
      "Hardening changes require explicit operator approval",
      "Unresolved hardening risks stay blocked",
      "Hardening groups",
      "Safety boundary checklist",
      "live workflow hardening identity",
      "live workflow hardening identity",
      "Hardening groups",
      "Safety boundary checklist",
      "evidence result feedback replay regression status",
      "denied hardening actions",
      "unresolved hardening risks",
      "provider live guard route",
      "local model live guard route",
      "next recommended action",
      "advanced hardening details collapsed/secondary",
      "review-only",
      "approval required",
      "advanced details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLiveWorkflowHardeningPass(model) };
}
