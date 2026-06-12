import type {
  ProviderSelectionUxPolish,
  ProviderSelectionUxPolishBoundary,
  ProviderSelectionUxPolishModel,
} from "./provider-selection-ux-polish-types";
import { buildProviderSelectionUxPolishStableKey } from "./provider-selection-ux-polish-types";

export const PROVIDER_SELECTION_UX_POLISH_LANGUAGE = [
  "Provider selection UX polish",
  "Provider selection polish does not switch live providers",
  "Provider choice requires explicit operator approval",
  "Provider selections are preview-only here",
  "Provider choice groups",
  "Provider capability labels",
] as const;

export function buildProviderSelectionUxPolish(
  input: Omit<ProviderSelectionUxPolish, "id"> & { idHint: string }
): ProviderSelectionUxPolish {
  const { idHint, ...selection } = input;
  return {
    id: buildProviderSelectionUxPolishStableKey("provider-selection-ux-polish", idHint, input.status),
    ...selection,
  };
}

export function buildProviderSelectionUxPolishes(): ProviderSelectionUxPolish[] {
  return [
    buildProviderSelectionUxPolish({
      idHint: "review-only-provider-choice-preview",
      status: "ready-for-review",
      providerSelectionIdentity:
        "Provider selection identity: provider-selection-ux-polish-review-only-provider-choice-preview.",
      providerChoiceGroups: [
        "Provider choice groups: creative, research, coding, local model, remote model, fallback, and blocked experimental choices are shown as planning labels only.",
        "Provider choice groups: the grouping is explanatory and does not select a live provider, route traffic, or persist a provider choice.",
      ],
      providerCapabilityLabels: [
        "Provider capability labels: reasoning, code review, citation help, structured output, image planning, privacy-sensitive work, low-cost drafts, and manual-only fallback are plain-English labels.",
        "Provider capability labels: labels describe reviewed suitability and never trigger connection tests, prompts, credential use, or output storage.",
      ],
      recommendedUseHints: [
        "Recommended-use hints: choose a candidate only after sensitivity, approval owner, evidence status, cost posture, and failure fallback have been reviewed.",
        "Recommended-use hints: provider selections are preview-only here and any future live provider choice requires explicit operator approval.",
      ],
      deniedSelectionActions: [
        "Denied selection actions: switching providers, saving provider selections, connecting providers, testing provider connections, routing live provider traffic, sending prompts, spending tokens, storing credentials, and storing outputs.",
        "Denied selection actions: this page cannot approve provider use automatically or execute a provider workflow.",
      ],
      selectionSafetyChecklist: [
        "Selection safety checklist: confirm the intended task type, data sensitivity, private prompt status, permission preset review, audit trail review, cost guardrail, and explicit operator approval.",
        "Selection safety checklist: provider selection polish does not switch live providers and does not persist provider selections.",
      ],
      blockedSelectionRisks: [
        "Blocked selection risks: missing approval, private prompt uncertainty, credential exposure request, provider output storage request, unreviewed permission preset, missing audit trail, live test request, and routing request.",
        "Blocked selection risks: unresolved risks keep selection preview-only instead of selecting or switching a provider.",
      ],
      permissionPresetsRoute:
        "Permission presets route: /provider-permission-presets reviews provider permission templates without granting permissions.",
      auditTrailRoute:
        "Audit trail route: /provider-audit-trail-review reviews audit expectations without storing live provider outputs.",
      nextRecommendedAction:
        "Next recommended action: review permission presets, then audit trail expectations, before any future operator-approved provider selection packet.",
      advancedSelectionDetails:
        "Advanced selection details: provider selection UX polish is review-only. Provider selection polish does not switch live providers, provider choice requires explicit operator approval, and provider selections are preview-only here. It does not switch providers, persist provider selections, call providers, connect providers, test provider connections, route live provider traffic, send prompts, store provider outputs, ingest provider outputs, persist provider trial data, store credentials, store tokens, store endpoints, call local models, call local bridge endpoints, launch local tools, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/output/audit data without approval, scan arbitrary projects, browse local files, crawl paths, read or open files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, execute workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderSelectionUxPolish({
      idHint: "blocked-live-provider-switch",
      status: "blocked",
      providerSelectionIdentity:
        "Provider selection identity: provider-selection-ux-polish-blocked-live-provider-switch.",
      providerChoiceGroups: [
        "Provider choice groups: blocked because the request asks the UI to switch a live provider.",
      ],
      providerCapabilityLabels: [
        "Provider capability labels: capability labels stay advisory and cannot activate provider traffic.",
      ],
      recommendedUseHints: [
        "Recommended-use hints: return to operator approval before any live provider choice is made elsewhere.",
      ],
      deniedSelectionActions: [
        "Denied selection actions: live provider switching, selection persistence, provider calls, provider connection tests, prompt sending, and credential storage remain blocked.",
      ],
      selectionSafetyChecklist: [
        "Selection safety checklist: keep the provider choice preview-only until permission and audit reviews are complete.",
      ],
      blockedSelectionRisks: [
        "Blocked selection risks: the live switch request, missing explicit approval, and missing audit review keep this preview blocked.",
      ],
      permissionPresetsRoute:
        "Permission presets route: /provider-permission-presets remains review-only.",
      auditTrailRoute:
        "Audit trail route: /provider-audit-trail-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: do not switch providers from this page; document the missing approval and review the preset route.",
      advancedSelectionDetails:
        "Advanced selection details: blocked provider selection cannot recover by switching providers, persisting selection, calling providers, routing traffic, storing credentials, or storing outputs from this page.",
    }),
  ];
}

export function buildProviderSelectionUxPolishBoundary(): ProviderSelectionUxPolishBoundary {
  return {
    providerSelectionUxPolishReviewOnly: true,
    providerSelectionPolishDoesNotSwitchLiveProviders: true,
    providerChoiceRequiresExplicitOperatorApproval: true,
    providerSelectionsArePreviewOnlyHere: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerSelectionPersistenceAllowedFromUi: false,
    liveProviderSwitchingAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    providerOutputIngestionAllowedFromUi: false,
    providerCredentialsStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelOutputAuditDataAutoSendAllowed: false,
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
    credentialStorageAllowed: false,
    endpointStorageAllowed: false,
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    outputStorageAllowed: false,
    auditEventPersistenceAllowedFromUi: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeProviderSelectionUxPolish(
  model: Pick<ProviderSelectionUxPolishModel, "selections">
): string {
  return `Provider selection UX polish prepares ${model.selections.length} provider choice preview(s). Provider selection polish does not switch live providers, provider choice requires explicit operator approval, and provider selections are preview-only here.`;
}

export function buildProviderSelectionUxPolishModel(): ProviderSelectionUxPolishModel {
  const selections = buildProviderSelectionUxPolishes();
  const model: ProviderSelectionUxPolishModel = {
    title: "Provider selection UX polish",
    summary: "",
    selections,
    boundary: buildProviderSelectionUxPolishBoundary(),
    selectionLanguage: [...PROVIDER_SELECTION_UX_POLISH_LANGUAGE],
    advancedDetails: [
      "Provider selection UX polish",
      "provider selection identity",
      "Provider choice groups",
      "Provider capability labels",
      "recommended-use hints",
      "denied selection actions",
      "selection safety checklist",
      "blocked selection risks",
      "permission presets route",
      "audit trail route",
      "next recommended action",
      "Provider selection polish does not switch live providers",
      "Provider choice requires explicit operator approval",
      "Provider selections are preview-only here",
      "advanced selection details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderSelectionUxPolish(model) };
}
