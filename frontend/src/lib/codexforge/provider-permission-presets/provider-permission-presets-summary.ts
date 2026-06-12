import type {
  ProviderPermissionPresets,
  ProviderPermissionPresetsBoundary,
  ProviderPermissionPresetsModel,
} from "./provider-permission-presets-types";
import { buildProviderPermissionPresetsStableKey } from "./provider-permission-presets-types";

export const PROVIDER_PERMISSION_PRESETS_LANGUAGE = [
  "Provider permission presets",
  "Provider permission presets do not grant permissions",
  "Provider permissions require explicit operator approval",
  "Unsafe permission shortcuts stay blocked",
  "Preset groups",
  "Provider capability boundaries",
] as const;

export function buildProviderPermissionPreset(
  input: Omit<ProviderPermissionPresets, "id"> & { idHint: string }
): ProviderPermissionPresets {
  const { idHint, ...preset } = input;
  return {
    id: buildProviderPermissionPresetsStableKey("provider-permission-presets", idHint, input.status),
    ...preset,
  };
}

export function buildProviderPermissionPresets(): ProviderPermissionPresets[] {
  return [
    buildProviderPermissionPreset({
      idHint: "review-only-permission-template",
      status: "ready-for-review",
      providerPermissionPresetIdentity:
        "Provider permission preset identity: provider-permission-presets-review-only-permission-template.",
      presetGroups: [
        "Preset groups: no-provider-call review, provider-call request draft, redacted-output review, private-data blocked, cost-capped trial, and manual-only fallback.",
        "Preset groups: each preset is a reviewed template only and does not save provider permissions or grant permission shortcuts.",
      ],
      providerCapabilityBoundaries: [
        "Provider capability boundaries: prompts, files, project context, connector context, model choice, output handling, cost guardrails, retries, and fallback are listed as approval topics.",
        "Provider capability boundaries: capability boundaries do not call providers, test connections, route traffic, or store credentials.",
      ],
      deniedPermissionShortcuts: [
        "Denied permission shortcuts: grant all, remember this provider, auto-approve provider calls, bypass redaction, skip audit trail, test connection now, save credential, and route live traffic.",
        "Denied permission shortcuts: unsafe permission shortcuts stay blocked and cannot be approved automatically from this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: operator, data sensitivity, allowed prompt class, allowed file class, provider family, cost ceiling, output retention rule, audit trail owner, and rollback owner.",
        "Approval gate checklist: provider permissions require explicit operator approval before any future use outside this page.",
      ],
      privacyAndCredentialNotes: [
        "Privacy and credential notes: private prompts and outputs stay redacted, credentials stay hidden, browser storage is not used, and endpoints are not stored.",
        "Privacy and credential notes: this page does not display secret values, provider keys, tokens, endpoints, or process.env values.",
      ],
      blockedPresetRisks: [
        "Blocked preset risks: missing approval owner, broad prompt/file scope, credential display request, output retention uncertainty, connector data send request, and automatic retry request.",
        "Blocked preset risks: unresolved permission risk keeps the preset as review-only instead of granting permissions.",
      ],
      auditTrailRoute:
        "Audit trail route: /provider-audit-trail-review reviews audit expectations without storing provider outputs.",
      hardeningPassRoute:
        "Hardening pass route: /provider-integration-hardening-pass reviews integration hardening without changing provider configuration.",
      nextRecommendedAction:
        "Next recommended action: review audit trail expectations, then hardening checks, before any future operator-approved permission packet.",
      advancedPermissionDetails:
        "Advanced permission details: provider permission presets are review-only. Provider permission presets do not grant permissions, provider permissions require explicit operator approval, and unsafe permission shortcuts stay blocked. It does not grant permissions, persist permission presets, persist permission grants, call providers, connect providers, test provider connections, route live provider traffic, send prompts, store provider outputs, ingest provider outputs, store credentials, store tokens, store endpoints, call local models, call local bridge endpoints, launch local tools, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/output/audit data without approval, scan arbitrary projects, browse local files, crawl paths, read or open files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, execute workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderPermissionPreset({
      idHint: "blocked-unsafe-shortcut",
      status: "blocked",
      providerPermissionPresetIdentity:
        "Provider permission preset identity: provider-permission-presets-blocked-unsafe-shortcut.",
      presetGroups: [
        "Preset groups: blocked because the request asks for an unsafe permission shortcut.",
      ],
      providerCapabilityBoundaries: [
        "Provider capability boundaries: broad provider access remains blocked until a specific reviewed permission packet exists.",
      ],
      deniedPermissionShortcuts: [
        "Denied permission shortcuts: grant all, persist preset, bypass approval, save credential, and send prompts remain blocked.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: return to operator review before any provider permission is granted elsewhere.",
      ],
      privacyAndCredentialNotes: [
        "Privacy and credential notes: credentials, private prompts, private outputs, and endpoints stay hidden and unstored.",
      ],
      blockedPresetRisks: [
        "Blocked preset risks: missing explicit approval and broad permission scope keep this preset blocked.",
      ],
      auditTrailRoute:
        "Audit trail route: /provider-audit-trail-review remains review-only.",
      hardeningPassRoute:
        "Hardening pass route: /provider-integration-hardening-pass remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the shortcut blocked and document the minimum provider permission request.",
      advancedPermissionDetails:
        "Advanced permission details: blocked permission shortcuts cannot recover by granting permissions, saving presets, calling providers, storing credentials, or storing outputs from this page.",
    }),
  ];
}

export function buildProviderPermissionPresetsBoundary(): ProviderPermissionPresetsBoundary {
  return {
    providerPermissionPresetsReviewOnly: true,
    providerPermissionPresetsDoNotGrantPermissions: true,
    providerPermissionsRequireExplicitOperatorApproval: true,
    unsafePermissionShortcutsStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerPermissionPresetPersistenceAllowedFromUi: false,
    providerPermissionGrantAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
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

export function summarizeProviderPermissionPresets(
  model: Pick<ProviderPermissionPresetsModel, "presets">
): string {
  return `Provider permission presets prepares ${model.presets.length} permission preset review(s). Provider permission presets do not grant permissions, provider permissions require explicit operator approval, and unsafe permission shortcuts stay blocked.`;
}

export function buildProviderPermissionPresetsModel(): ProviderPermissionPresetsModel {
  const presets = buildProviderPermissionPresets();
  const model: ProviderPermissionPresetsModel = {
    title: "Provider permission presets",
    summary: "",
    presets,
    boundary: buildProviderPermissionPresetsBoundary(),
    permissionLanguage: [...PROVIDER_PERMISSION_PRESETS_LANGUAGE],
    advancedDetails: [
      "Provider permission presets",
      "provider permission preset identity",
      "Preset groups",
      "Provider capability boundaries",
      "denied permission shortcuts",
      "approval gate checklist",
      "privacy and credential notes",
      "blocked preset risks",
      "audit trail route",
      "hardening pass route",
      "next recommended action",
      "Provider permission presets do not grant permissions",
      "Provider permissions require explicit operator approval",
      "Unsafe permission shortcuts stay blocked",
      "advanced permission details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderPermissionPresets(model) };
}
