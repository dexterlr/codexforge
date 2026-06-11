import type {
  RecoveryPresetLibrary,
  RecoveryPresetLibraryBoundary,
  RecoveryPresetLibraryModel,
} from "./recovery-preset-library-types";
import { buildRecoveryPresetLibraryStableKey } from "./recovery-preset-library-types";

export const RECOVERY_PRESET_LIBRARY_LANGUAGE = [
  "Recovery preset library",
  "Recovery presets do not run recovery steps",
  "Recovery presets require operator approval before use",
  "Validation evidence is required before retry",
  "Failure category mapping",
  "Manual recovery checklist",
] as const;

export function buildRecoveryPreset(
  input: Omit<RecoveryPresetLibrary, "id"> & { idHint: string }
): RecoveryPresetLibrary {
  const { idHint, ...preset } = input;
  return {
    id: buildRecoveryPresetLibraryStableKey("recovery-preset-library", idHint, input.status),
    ...preset,
  };
}

export function buildRecoveryPresetLibrary(): RecoveryPresetLibrary[] {
  return [
    buildRecoveryPreset({
      idHint: "validation-retry-review",
      status: "ready-for-review",
      recoveryPresetIdentity:
        "Recovery preset identity: recovery-preset-library-validation-retry-review.",
      presetGroups: [
        "Preset groups: validation retry review, failed command review, apply rollback review, provider failure review, and blocked workflow review.",
        "Preset groups: every preset is a preview and is not persisted from this page.",
      ],
      failureCategoryMapping: [
        "Failure category mapping: validation failure maps to evidence review, command failure maps to manual command inspection, and apply failure maps to rollback evidence review.",
        "Failure category mapping: this page does not scan projects, run recovery, run commands, or apply patches.",
      ],
      manualRecoveryChecklist: [
        "Manual recovery checklist: confirm failure category, review approval policy, inspect validation evidence, choose a manual checklist, and request operator approval before use.",
        "Manual recovery checklist: recovery presets do not run recovery steps.",
      ],
      validationEvidenceRequirements: [
        "Validation evidence requirements: validation evidence is required before retry.",
        "Validation evidence requirements: retry remains blocked when evidence is missing, stale, secret-bearing, or not tied to the failure category.",
      ],
      blockedRecoveryPresets: [
        "Blocked recovery presets: automatic recovery execution, command runs, patch application, file writes, preset persistence, and browser storage writes stay blocked.",
        "Blocked recovery presets: recovery presets require operator approval before use.",
      ],
      safetyExplainabilityRoute:
        "Safety explainability route: /safety-boundary-explainability-polish explains why recovery boundaries remain enforced.",
      approvalPolicyRoute:
        "Approval policy route: /approval-policy-presets reviews approval gates without changing live policy.",
      nextRecommendedAction:
        "Next recommended action: review manual recovery checklist and validation evidence requirements before any separate approved recovery attempt happens elsewhere.",
      advancedRecoveryPresetDetails:
        "Advanced recovery preset details: recovery preset library is review-only. Recovery presets do not run recovery steps, recovery presets require operator approval before use, validation evidence is required before retry, and this page does not run recovery, run commands, apply patches, save recovery presets, change approval policy, persist approval presets, approve actions, automate approvals, save notification preferences, create notifications, send notifications, write browser storage, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/preference data without approval, run workflows, run shell commands, run git commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, read arbitrary local files, browse arbitrary local files, scan arbitrary projects, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildRecoveryPreset({
      idHint: "blocked-auto-recovery",
      status: "blocked",
      recoveryPresetIdentity:
        "Recovery preset identity: recovery-preset-library-blocked-auto-recovery.",
      presetGroups: [
        "Preset groups: blocked when a preset implies automatic recovery execution or persistence.",
      ],
      failureCategoryMapping: [
        "Failure category mapping: blocked because unresolved failures cannot map directly to recovery execution.",
      ],
      manualRecoveryChecklist: [
        "Manual recovery checklist: blocked presets remain manual review notes only.",
      ],
      validationEvidenceRequirements: [
        "Validation evidence requirements: validation evidence is required before retry.",
      ],
      blockedRecoveryPresets: [
        "Blocked recovery presets: command runs, patch application, recovery execution, file writes, and preset persistence remain blocked.",
      ],
      safetyExplainabilityRoute:
        "Safety explainability route: /safety-boundary-explainability-polish remains explanation-only.",
      approvalPolicyRoute:
        "Approval policy route: /approval-policy-presets remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep recovery blocked until evidence and operator approval are reviewed outside this page.",
      advancedRecoveryPresetDetails:
        "Advanced recovery preset details: blocked recovery presets cannot recover by running commands, applying patches, writing files, saving presets, calling APIs, executing workflows, or mutating memory from this page.",
    }),
  ];
}

export function buildRecoveryPresetLibraryBoundary(): RecoveryPresetLibraryBoundary {
  return {
    recoveryPresetLibraryReviewOnly: true,
    recoveryPresetsDoNotRunRecoverySteps: true,
    recoveryPresetsRequireOperatorApprovalBeforeUse: true,
    validationEvidenceIsRequiredBeforeRetry: true,
    recoveryExecutionAllowedFromUi: false,
    recoveryPresetPersistenceAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    approvalPolicyMutationAllowedFromUi: false,
    approvalPresetPersistenceAllowedFromUi: false,
    actionsApprovedFromUi: false,
    actionsExecutedFromUi: false,
    approvalAutomationAllowedFromUi: false,
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
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
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

export function summarizeRecoveryPresetLibrary(
  model: Pick<RecoveryPresetLibraryModel, "presets">
): string {
  return `Recovery preset library prepares ${model.presets.length} recovery preset preview posture(s). Recovery presets do not run recovery steps, recovery presets require operator approval before use, and validation evidence is required before retry.`;
}

export function buildRecoveryPresetLibraryModel(): RecoveryPresetLibraryModel {
  const presets = buildRecoveryPresetLibrary();
  const model: RecoveryPresetLibraryModel = {
    title: "Recovery preset library",
    summary: "",
    presets,
    boundary: buildRecoveryPresetLibraryBoundary(),
    recoveryLanguage: [...RECOVERY_PRESET_LIBRARY_LANGUAGE],
    advancedDetails: [
      "Recovery preset library",
      "Recovery preset identity",
      "Preset groups",
      "Failure category mapping",
      "Manual recovery checklist",
      "Validation evidence requirements",
      "Blocked recovery presets",
      "Safety explainability route",
      "Approval policy route",
      "Next recommended action",
      "Recovery presets do not run recovery steps",
      "Recovery presets require operator approval before use",
      "Validation evidence is required before retry",
      "advanced recovery preset details collapsed/secondary",
      "no recovery execution",
      "no recovery preset persistence",
      "no command execution",
      "no patch apply behavior",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRecoveryPresetLibrary(model) };
}
