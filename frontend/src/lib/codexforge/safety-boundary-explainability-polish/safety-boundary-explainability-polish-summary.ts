import type {
  SafetyBoundaryExplainabilityPolish,
  SafetyBoundaryExplainabilityPolishBoundary,
  SafetyBoundaryExplainabilityPolishModel,
} from "./safety-boundary-explainability-polish-types";
import { buildSafetyBoundaryExplainabilityPolishStableKey } from "./safety-boundary-explainability-polish-types";

export const SAFETY_BOUNDARY_EXPLAINABILITY_POLISH_LANGUAGE = [
  "Safety boundary explainability polish",
  "Safety explanations do not weaken boundaries",
  "Approval gates remain enforced",
  "Blocked actions stay blocked until resolved",
  "Boundary explanation groups",
  "Why approval is required",
] as const;

export function buildSafetyBoundaryExplainabilityPolish(
  input: Omit<SafetyBoundaryExplainabilityPolish, "id"> & { idHint: string }
): SafetyBoundaryExplainabilityPolish {
  const { idHint, ...explanation } = input;
  return {
    id: buildSafetyBoundaryExplainabilityPolishStableKey(
      "safety-boundary-explainability-polish",
      idHint,
      input.status
    ),
    ...explanation,
  };
}

export function buildSafetyBoundaryExplainabilityPolishes(): SafetyBoundaryExplainabilityPolish[] {
  return [
    buildSafetyBoundaryExplainabilityPolish({
      idHint: "daily-boundary-language",
      status: "ready-for-review",
      explainabilityIdentity:
        "Explainability identity: safety-boundary-explainability-polish-daily-boundary-language.",
      boundaryExplanationGroups: [
        "Boundary explanation groups: approvals, notifications, recovery, local files, provider calls, memory mutation, and workflow execution.",
        "Boundary explanation groups: explanations clarify why boundaries exist without changing them.",
      ],
      noviceExplanationMode: [
        "Novice explanation mode: uses plain English, concrete blocked-action examples, and visible approval reminders.",
        "Novice explanation mode: says safety explanations do not weaken boundaries.",
      ],
      expertExplanationMode: [
        "Expert explanation mode: uses compact policy language while keeping approval gates and blocked-action reasons visible.",
        "Expert explanation mode: blocked actions stay blocked until resolved.",
      ],
      blockedActionExamples: [
        "Examples of blocked actions: saving notification preferences, changing approval policy, running recovery, applying patches, running commands, calling APIs, scanning projects, reading arbitrary files, or mutating memory from this page.",
        "Examples of blocked actions: automatic approval, workflow execution, notification sending, and recovery preset persistence stay blocked.",
      ],
      whyApprovalIsRequired: [
        "Why approval is required: approval gates remain enforced before policy changes, notification delivery, recovery use, file mutation, memory promotion, or tool execution.",
        "Why approval is required: operator approval protects private data, local files, live policy, validation evidence, and safety boundaries.",
      ],
      unresolvedExplanationGaps: [
        "Unresolved explanation gaps: any unclear boundary stays unresolved instead of being weakened.",
        "Unresolved explanation gaps: blocked actions stay blocked until resolved.",
      ],
      dailyOnboardingRoute:
        "Daily onboarding route: /daily-use-onboarding-polish keeps first-day safety reminders visible.",
      nextRecommendedAction:
        "Next recommended action: review novice and expert explanations, then keep unclear boundary language unresolved until operator approval and product review happen elsewhere.",
      advancedExplainabilityDetails:
        "Advanced explainability details: safety boundary explainability polish is review-only. Safety explanations do not weaken boundaries, approval gates remain enforced, blocked actions stay blocked until resolved, and this page does not change boundaries, approve actions, execute actions, change approval policy, persist approval presets, save notification preferences, create notifications, send notifications, run recovery, persist recovery presets, write browser storage, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/preference data without approval, run workflows, run shell commands, run git commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, read arbitrary local files, browse arbitrary local files, scan arbitrary projects, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildSafetyBoundaryExplainabilityPolish({
      idHint: "blocked-softening-copy",
      status: "blocked",
      explainabilityIdentity:
        "Explainability identity: safety-boundary-explainability-polish-blocked-softening-copy.",
      boundaryExplanationGroups: [
        "Boundary explanation groups: blocked when wording suggests an action can bypass approval or run automatically.",
      ],
      noviceExplanationMode: [
        "Novice explanation mode: blocked copy must say approval gates remain enforced.",
      ],
      expertExplanationMode: [
        "Expert explanation mode: compact copy cannot imply a weaker boundary.",
      ],
      blockedActionExamples: [
        "Examples of blocked actions: automatic approval, command execution, recovery execution, and file mutation remain blocked.",
      ],
      whyApprovalIsRequired: [
        "Why approval is required: approval protects boundaries even when an explanation is short.",
      ],
      unresolvedExplanationGaps: [
        "Unresolved explanation gaps: unclear safety copy stays unresolved instead of weakening a boundary.",
      ],
      dailyOnboardingRoute:
        "Daily onboarding route: /daily-use-onboarding-polish remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep boundary-softening language blocked until product review clarifies it without changing enforcement.",
      advancedExplainabilityDetails:
        "Advanced explainability details: blocked explanations cannot recover by changing boundaries, approving actions, running commands, writing files, calling APIs, or mutating memory from this page.",
    }),
  ];
}

export function buildSafetyBoundaryExplainabilityPolishBoundary(): SafetyBoundaryExplainabilityPolishBoundary {
  return {
    safetyBoundaryExplainabilityReviewOnly: true,
    safetyExplanationsDoNotWeakenBoundaries: true,
    approvalGatesRemainEnforced: true,
    blockedActionsStayBlockedUntilResolved: true,
    safetyBoundaryMutationAllowedFromUi: false,
    actionsApprovedFromUi: false,
    actionsExecutedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    approvalPolicyMutationAllowedFromUi: false,
    approvalPresetPersistenceAllowedFromUi: false,
    recoveryExecutionAllowedFromUi: false,
    recoveryPresetPersistenceAllowedFromUi: false,
    notificationPreferencePersistenceAllowedFromUi: false,
    notificationCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    settingsMutationAllowedFromUi: false,
    preferencePersistenceAllowedFromUi: false,
    localStorageWritesAllowedFromUi: false,
    sessionStorageWritesAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorPreferenceDataAutoSendAllowed: false,
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

export function summarizeSafetyBoundaryExplainabilityPolish(
  model: Pick<SafetyBoundaryExplainabilityPolishModel, "explanations">
): string {
  return `Safety boundary explainability polish prepares ${model.explanations.length} boundary explanation posture(s). Safety explanations do not weaken boundaries, approval gates remain enforced, and blocked actions stay blocked until resolved.`;
}

export function buildSafetyBoundaryExplainabilityPolishModel(): SafetyBoundaryExplainabilityPolishModel {
  const explanations = buildSafetyBoundaryExplainabilityPolishes();
  const model: SafetyBoundaryExplainabilityPolishModel = {
    title: "Safety boundary explainability polish",
    summary: "",
    explanations,
    boundary: buildSafetyBoundaryExplainabilityPolishBoundary(),
    explainabilityLanguage: [...SAFETY_BOUNDARY_EXPLAINABILITY_POLISH_LANGUAGE],
    advancedDetails: [
      "Safety boundary explainability polish",
      "Explainability identity",
      "Boundary explanation groups",
      "Novice explanation mode",
      "Expert explanation mode",
      "Examples of blocked actions",
      "Why approval is required",
      "Unresolved explanation gaps",
      "Daily onboarding route",
      "Next recommended action",
      "Safety explanations do not weaken boundaries",
      "Approval gates remain enforced",
      "Blocked actions stay blocked until resolved",
      "advanced explainability details collapsed/secondary",
      "no safety boundary mutation",
      "no action approval from UI",
      "no action execution from UI",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeSafetyBoundaryExplainabilityPolish(model) };
}
