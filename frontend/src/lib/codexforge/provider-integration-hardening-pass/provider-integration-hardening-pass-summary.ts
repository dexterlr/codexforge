import type {
  ProviderIntegrationHardeningPass,
  ProviderIntegrationHardeningPassBoundary,
  ProviderIntegrationHardeningPassModel,
} from "./provider-integration-hardening-pass-types";
import { buildProviderIntegrationHardeningPassStableKey } from "./provider-integration-hardening-pass-types";

export const PROVIDER_INTEGRATION_HARDENING_PASS_LANGUAGE = [
  "Provider integration hardening pass",
  "Provider integration hardening does not call providers",
  "Provider configuration changes require explicit operator approval",
  "Unresolved provider risks stay blocked",
  "Hardening groups",
  "Credential boundary checklist",
] as const;

export function buildProviderIntegrationHardeningPass(
  input: Omit<ProviderIntegrationHardeningPass, "id"> & { idHint: string }
): ProviderIntegrationHardeningPass {
  const { idHint, ...hardeningPass } = input;
  return {
    id: buildProviderIntegrationHardeningPassStableKey(
      "provider-integration-hardening-pass",
      idHint,
      input.status
    ),
    ...hardeningPass,
  };
}

export function buildProviderIntegrationHardeningPasses(): ProviderIntegrationHardeningPass[] {
  return [
    buildProviderIntegrationHardeningPass({
      idHint: "review-only-integration-hardening",
      status: "ready-for-review",
      providerIntegrationHardeningIdentity:
        "Provider integration hardening identity: provider-integration-hardening-pass-review-only-integration-hardening.",
      hardeningGroups: [
        "Hardening groups: credential boundary, provider routing boundary, permission preset review, audit trail review, failover review, cost/rate review, safety regression review, and blocked-risk review.",
        "Hardening groups: groups are reviewed as static hardening checks and do not call providers or change provider configuration.",
      ],
      credentialBoundaryChecklist: [
        "Credential boundary checklist: credentials stay hidden, tokens stay hidden, endpoints stay hidden, browser storage is not used, process.env values are not printed, and no example real keys are displayed.",
        "Credential boundary checklist: this hardening pass does not store credentials, tokens, endpoints, private prompts, provider outputs, or provider settings.",
      ],
      providerRoutingChecklist: [
        "Provider routing checklist: no provider is selected, no provider is switched, no provider traffic is routed, no connection is tested, and provider routing still requires explicit approval.",
        "Provider routing checklist: provider configuration changes require explicit operator approval and unresolved provider risks stay blocked.",
      ],
      failoverCostSafetyChecklist: [
        "Failover/cost/safety checklist: review fallback owner, cost ceiling, retry limit, rate-limit posture, safety regression status, redaction owner, and manual recovery route.",
        "Failover/cost/safety checklist: cost and safety checks are advisory only and do not spend tokens, retry providers, call billing, or clear blockers.",
      ],
      deniedHardeningShortcuts: [
        "Denied hardening shortcuts: call provider now, test connection, save settings, grant permissions, switch provider, route live traffic, bypass audit trail, store outputs, and run validation.",
        "Denied hardening shortcuts: hardening cannot approve changes, execute workflows, mutate files, mutate memory, or launch local tools from this page.",
      ],
      unresolvedHardeningRisks: [
        "Unresolved hardening risks: credential exposure request, missing approval owner, broad permission scope, stale cost posture, missing audit trail, private prompt uncertainty, and output retention request.",
        "Unresolved hardening risks: unresolved provider risks stay blocked instead of triggering provider calls or configuration changes.",
      ],
      connectorLivePermissionRoute:
        "Connector live permission route: /connector-permission-readiness-audit reviews connector permission readiness without calling connector APIs.",
      automationDryRunRoute:
        "Automation dry-run route: /automation-permission-readiness-audit reviews automation dry-run posture without creating schedules, tasks, or background jobs.",
      nextRecommendedAction:
        "Next recommended action: complete connector permission and automation dry-run reviews, then prepare a manual approval packet outside this page.",
      advancedHardeningDetails:
        "Advanced hardening details: provider integration hardening pass is review-only. Provider integration hardening does not call providers, provider configuration changes require explicit operator approval, and unresolved provider risks stay blocked. It does not call providers, change provider configuration, persist settings, select providers, switch providers, persist provider selections, persist permission presets, grant permissions, persist permission grants, connect providers, test provider connections, route provider traffic, send prompts, store provider outputs, ingest provider outputs, persist audit events, mutate files, write files, export files, apply patches, delete files, mutate memory, call local models, call local bridge endpoints, launch local tools, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/output/audit data without approval, scan arbitrary projects, browse local files, crawl paths, read or open files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, execute workflows, execute actions, approve actions, automate approval, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderIntegrationHardeningPass({
      idHint: "blocked-configuration-change",
      status: "blocked",
      providerIntegrationHardeningIdentity:
        "Provider integration hardening identity: provider-integration-hardening-pass-blocked-configuration-change.",
      hardeningGroups: [
        "Hardening groups: blocked because the request asks the page to change provider configuration.",
      ],
      credentialBoundaryChecklist: [
        "Credential boundary checklist: credentials, tokens, endpoints, provider settings, and process.env values stay hidden and unstored.",
      ],
      providerRoutingChecklist: [
        "Provider routing checklist: no provider route is activated and no provider configuration is changed.",
      ],
      failoverCostSafetyChecklist: [
        "Failover/cost/safety checklist: unresolved fallback, cost, and safety risks remain blocked.",
      ],
      deniedHardeningShortcuts: [
        "Denied hardening shortcuts: provider call, connection test, configuration change, settings persistence, permission grant, live routing, and validation execution remain blocked.",
      ],
      unresolvedHardeningRisks: [
        "Unresolved hardening risks: missing explicit approval and requested configuration change keep this hardening pass blocked.",
      ],
      connectorLivePermissionRoute:
        "Connector live permission route: /connector-permission-readiness-audit remains review-only.",
      automationDryRunRoute:
        "Automation dry-run route: /automation-permission-readiness-audit remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep configuration changes blocked and write a manual approval packet outside this page.",
      advancedHardeningDetails:
        "Advanced hardening details: blocked provider hardening cannot recover by calling providers, changing provider configuration, persisting settings, mutating files, mutating memory, or granting permissions from this page.",
    }),
  ];
}

export function buildProviderIntegrationHardeningPassBoundary(): ProviderIntegrationHardeningPassBoundary {
  return {
    providerIntegrationHardeningPassReviewOnly: true,
    providerIntegrationHardeningDoesNotCallProviders: true,
    providerConfigurationChangesRequireExplicitOperatorApproval: true,
    unresolvedProviderRisksStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    providerConfigurationChangesAllowedFromUi: false,
    providerSettingsPersistenceAllowedFromUi: false,
    providerSelectionPersistenceAllowedFromUi: false,
    providerPermissionPresetPersistenceAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    providerOutputIngestionAllowedFromUi: false,
    providerAuditEventPersistenceAllowedFromUi: false,
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
    memoryMutationAllowedFromUi: false,
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

export function summarizeProviderIntegrationHardeningPass(
  model: Pick<ProviderIntegrationHardeningPassModel, "hardeningPasses">
): string {
  return `Provider integration hardening pass prepares ${model.hardeningPasses.length} hardening review(s). Provider integration hardening does not call providers, provider configuration changes require explicit operator approval, and unresolved provider risks stay blocked.`;
}

export function buildProviderIntegrationHardeningPassModel(): ProviderIntegrationHardeningPassModel {
  const hardeningPasses = buildProviderIntegrationHardeningPasses();
  const model: ProviderIntegrationHardeningPassModel = {
    title: "Provider integration hardening pass",
    summary: "",
    hardeningPasses,
    boundary: buildProviderIntegrationHardeningPassBoundary(),
    hardeningLanguage: [...PROVIDER_INTEGRATION_HARDENING_PASS_LANGUAGE],
    advancedDetails: [
      "Provider integration hardening pass",
      "provider integration hardening identity",
      "Hardening groups",
      "Credential boundary checklist",
      "provider routing checklist",
      "failover/cost/safety checklist",
      "denied hardening shortcuts",
      "unresolved hardening risks",
      "connector live permission route",
      "automation dry-run route",
      "next recommended action",
      "Provider integration hardening does not call providers",
      "Provider configuration changes require explicit operator approval",
      "Unresolved provider risks stay blocked",
      "advanced hardening details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderIntegrationHardeningPass(model) };
}
