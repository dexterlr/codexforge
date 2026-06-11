import type {
  ApprovalPolicyPresets,
  ApprovalPolicyPresetsBoundary,
  ApprovalPolicyPresetsModel,
} from "./approval-policy-presets-types";
import { buildApprovalPolicyPresetsStableKey } from "./approval-policy-presets-types";

export const APPROVAL_POLICY_PRESETS_LANGUAGE = [
  "Approval policy presets",
  "Approval presets do not change live policy",
  "Policy changes require explicit operator approval",
  "Unsafe approval shortcuts stay blocked",
  "Preset groups",
  "Required approval gates",
] as const;

export function buildApprovalPolicyPreset(
  input: Omit<ApprovalPolicyPresets, "id"> & { idHint: string }
): ApprovalPolicyPresets {
  const { idHint, ...preset } = input;
  return {
    id: buildApprovalPolicyPresetsStableKey("approval-policy-presets", idHint, input.status),
    ...preset,
  };
}

export function buildApprovalPolicyPresets(): ApprovalPolicyPresets[] {
  return [
    buildApprovalPolicyPreset({
      idHint: "daily-safe-review",
      status: "ready-for-review",
      approvalPolicyPresetIdentity:
        "Approval policy preset identity: approval-policy-presets-daily-safe-review.",
      presetGroups: [
        "Preset groups: daily review, blocked-risk escalation, recovery retry review, notification delivery review, and expert fast-path review.",
        "Preset groups: all presets are previews and are not persisted from this page.",
      ],
      noviceExpertPresetPreview: [
        "Novice/expert preset preview: novice mode keeps every gate visible and explains why approval is required.",
        "Novice/expert preset preview: expert mode may use compact wording, but approval gates remain visible and enforced.",
      ],
      requiredApprovalGates: [
        "Required approval gates: policy changes require explicit operator approval.",
        "Required approval gates: approval presets do not change live policy.",
      ],
      deniedAutomationPolicy: [
        "Denied automation policy: unsafe approval shortcuts stay blocked.",
        "Denied automation policy: this page cannot approve actions, approve policies, run workflows, create automations, or change live policy.",
      ],
      blockedPresetRisks: [
        "Blocked preset risks: policy mutation, approval automation, preset persistence, workflow execution, file writes, browser storage writes, and memory mutation stay blocked.",
        "Blocked preset risks: shortcuts that bypass operator approval, redaction, validation evidence, or recovery review remain blocked.",
      ],
      recoveryPresetLibraryRoute:
        "Recovery preset library route: /recovery-preset-library reviews recovery presets without running recovery steps.",
      safetyExplainabilityRoute:
        "Safety explainability route: /safety-boundary-explainability-polish explains boundaries without weakening them.",
      nextRecommendedAction:
        "Next recommended action: review required approval gates, then inspect recovery presets and safety explanations before any separate approved policy change happens elsewhere.",
      advancedPolicyDetails:
        "Advanced policy details: approval policy presets is review-only. Approval presets do not change live policy, policy changes require explicit operator approval, unsafe approval shortcuts stay blocked, and this page does not change approval policy, persist approval presets, approve actions, automate approvals, save preferences, create notifications, send notifications, run recovery, persist recovery presets, write browser storage, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/preference data without approval, run workflows, run shell commands, run git commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, read arbitrary local files, browse arbitrary local files, scan arbitrary projects, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildApprovalPolicyPreset({
      idHint: "blocked-auto-approval",
      status: "blocked",
      approvalPolicyPresetIdentity:
        "Approval policy preset identity: approval-policy-presets-blocked-auto-approval.",
      presetGroups: [
        "Preset groups: blocked when a preset implies automatic approval or live policy mutation.",
      ],
      noviceExpertPresetPreview: [
        "Novice/expert preset preview: both modes keep unsafe approval shortcuts blocked.",
      ],
      requiredApprovalGates: [
        "Required approval gates: policy changes require explicit operator approval.",
      ],
      deniedAutomationPolicy: [
        "Denied automation policy: automatic approvals, workflow execution, and live policy changes remain denied.",
      ],
      blockedPresetRisks: [
        "Blocked preset risks: policy mutation, preset persistence, approval automation, and hidden gates remain blocked.",
      ],
      recoveryPresetLibraryRoute:
        "Recovery preset library route: /recovery-preset-library remains review-only.",
      safetyExplainabilityRoute:
        "Safety explainability route: /safety-boundary-explainability-polish remains explanation-only.",
      nextRecommendedAction:
        "Next recommended action: keep this preset blocked until an explicit operator approval request is reviewed outside this page.",
      advancedPolicyDetails:
        "Advanced policy details: blocked approval presets cannot recover by changing policy, saving presets, approving actions, writing storage, executing workflows, calling APIs, or mutating memory from this page.",
    }),
  ];
}

export function buildApprovalPolicyPresetsBoundary(): ApprovalPolicyPresetsBoundary {
  return {
    approvalPolicyPresetsReviewOnly: true,
    approvalPresetsDoNotChangeLivePolicy: true,
    policyChangesRequireExplicitOperatorApproval: true,
    unsafeApprovalShortcutsStayBlocked: true,
    approvalPolicyMutationAllowedFromUi: false,
    approvalPresetPersistenceAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    actionsApprovedFromUi: false,
    actionsExecutedFromUi: false,
    settingsMutationAllowedFromUi: false,
    preferencePersistenceAllowedFromUi: false,
    notificationPreferencePersistenceAllowedFromUi: false,
    notificationCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    recoveryExecutionAllowedFromUi: false,
    recoveryPresetPersistenceAllowedFromUi: false,
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

export function summarizeApprovalPolicyPresets(
  model: Pick<ApprovalPolicyPresetsModel, "presets">
): string {
  return `Approval policy presets prepares ${model.presets.length} approval preset preview posture(s). Approval presets do not change live policy, policy changes require explicit operator approval, and unsafe approval shortcuts stay blocked.`;
}

export function buildApprovalPolicyPresetsModel(): ApprovalPolicyPresetsModel {
  const presets = buildApprovalPolicyPresets();
  const model: ApprovalPolicyPresetsModel = {
    title: "Approval policy presets",
    summary: "",
    presets,
    boundary: buildApprovalPolicyPresetsBoundary(),
    policyLanguage: [...APPROVAL_POLICY_PRESETS_LANGUAGE],
    advancedDetails: [
      "Approval policy presets",
      "Approval policy preset identity",
      "Preset groups",
      "Novice/expert preset preview",
      "Required approval gates",
      "Denied automation policy",
      "Blocked preset risks",
      "Recovery preset library route",
      "Safety explainability route",
      "Next recommended action",
      "Approval presets do not change live policy",
      "Policy changes require explicit operator approval",
      "Unsafe approval shortcuts stay blocked",
      "advanced policy details collapsed/secondary",
      "no approval policy mutation",
      "no approval preset persistence",
      "no approval automation",
      "no localStorage writes",
      "no sessionStorage writes",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeApprovalPolicyPresets(model) };
}
