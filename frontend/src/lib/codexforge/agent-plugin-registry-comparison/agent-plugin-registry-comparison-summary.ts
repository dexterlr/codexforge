import type {
  AgentPluginRegistryComparison,
  AgentPluginRegistryComparisonBoundary,
  AgentPluginRegistryComparisonModel,
} from "./agent-plugin-registry-comparison-types";
import { buildAgentPluginRegistryComparisonStableKey } from "./agent-plugin-registry-comparison-types";

export const AGENT_PLUGIN_REGISTRY_COMPARISON_LANGUAGE = [
  "Agent plugin registry comparison",
  "Plugin comparison does not execute plugins",
  "Third-party code is not vendored or copied",
  "Future plugin adoption requires license security review",
  "Plugin manifest lessons",
  "MCP boundary route",
] as const;

export function buildAgentPluginRegistryComparison(
  input: Omit<AgentPluginRegistryComparison, "id"> & { idHint: string }
): AgentPluginRegistryComparison {
  const { idHint, ...comparison } = input;
  return {
    id: buildAgentPluginRegistryComparisonStableKey(
      "agent-plugin-registry-comparison",
      idHint,
      input.comparisonIdentity
    ),
    ...comparison,
  };
}

export function buildAgentPluginRegistryComparisons(): AgentPluginRegistryComparison[] {
  return [
    buildAgentPluginRegistryComparison({
      idHint: "codexforge-extension-registry-needs",
      comparisonIdentity:
        "Comparison identity: agent-plugin-registry-comparison-codexforge-extension-registry-needs.",
      sourceReferenceSpikes: [
        "/ruflo-reference-architecture planning lessons for agent registry and plugin MCP boundary language",
        "/odysseus-reference-architecture planning lessons for self-hosted workspace consent and connector boundaries",
      ],
      codexForgeRegistryRequirements:
        "CodexForge registry requirements: every future plugin needs a stable identity, version label, owner, plain-English purpose, declared permissions, denied scope, health posture, audit handoff, recovery route, and disabled-by-default state.",
      pluginManifestLessons:
        "Plugin manifest lessons: a manifest should describe capability names, input/output shape, permission scope, data egress posture, local/remote boundary, and required approvals before any executor can be considered.",
      permissionScopeLessons:
        "Permission/scope lessons: broad agent, file, command, provider, MCP, or memory access stays blocked until a human-readable permission boundary narrows it.",
      auditRecoveryRequirements:
        "Audit/recovery requirements: future plugin actions must produce redacted audit candidates, blocked reasons, rollback notes, and a recovery route before any runtime adoption.",
      sandboxingNonGoals:
        "Sandboxing/non-goals: this comparison does not create a plugin runtime, does not execute plugins, does not call tools, does not run agents, and does not vendor Ruflo or Odysseus code.",
      risksGaps: [
        "License and security review are required before third-party adoption",
        "Manifest compatibility is unknown until CodexForge defines its own contract",
        "Sandboxing, signed requests, and audit requirements remain design inputs only",
      ],
      mcpBoundaryRoute: "MCP boundary route: /mcp-tool-boundary-comparison.",
      nextRecommendedRoute:
        "Next recommended route: /mcp-tool-boundary-comparison for review-only MCP tool boundary mapping.",
      advancedComparisonDetails:
        "Advanced comparison details: Plugin comparison does not execute plugins. Third-party code is not vendored or copied. Future plugin adoption requires license/security review, explicit permission boundaries, signed request and audit review, and a separate runtime implementation.",
    }),
    buildAgentPluginRegistryComparison({
      idHint: "blocked-runtime-adoption",
      comparisonIdentity:
        "Comparison identity: agent-plugin-registry-comparison-blocked-runtime-adoption.",
      sourceReferenceSpikes: [
        "Ruflo and Odysseus remain source reference routes only",
        "No third-party runtime compatibility is claimed from this comparison",
      ],
      codexForgeRegistryRequirements:
        "CodexForge registry requirements: blocked if a proposal skips registry ownership, manifest review, permission review, audit handoff, recovery path, or disabled-by-default posture.",
      pluginManifestLessons:
        "Plugin manifest lessons: blocked if manifest data is missing, executable code is copied in, or plugin capabilities are implied instead of declared.",
      permissionScopeLessons:
        "Permission/scope lessons: blocked if file, command, provider, Jarvisd, MCP, memory, or agent access is broad or automatic.",
      auditRecoveryRequirements:
        "Audit/recovery requirements: blocked when audit and recovery evidence is missing or when secret-bearing data would be displayed.",
      sandboxingNonGoals:
        "Sandboxing/non-goals: no plugin sandbox, plugin executor, agent executor, MCP runtime, file mutator, command runner, or package installer is created here.",
      risksGaps: [
        "Runtime security model is not implemented",
        "Third-party license posture is not reviewed",
        "Execution sandbox guarantees are not proven",
      ],
      mcpBoundaryRoute: "MCP boundary route: /mcp-tool-boundary-comparison.",
      nextRecommendedRoute:
        "Next recommended route: /jarvisd-execution-registry for existing capability review language.",
      advancedComparisonDetails:
        "Advanced comparison details: blocked adoption claims remain secondary and cannot imply automatic plugin enablement, MCP execution, agent execution, provider traffic, memory ingestion, local file access, command execution, or copied third-party code.",
    }),
  ];
}

export function buildAgentPluginRegistryComparisonBoundary(): AgentPluginRegistryComparisonBoundary {
  return {
    pluginComparisonExecutesPlugins: false,
    pluginRuntimeCreated: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
    rufloCodeVendoredOrCopied: false,
    odysseusCodeVendoredOrCopied: false,
    rufloRuntimeIntegrationAdded: false,
    odysseusRuntimeIntegrationAdded: false,
    licenseSecurityReviewRequired: true,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    jarvisdPermissionAutoGrantAllowed: false,
    daemonProcessCreationAllowedFromFrontend: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    localProcessMutationAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    artifactDeletionAllowed: false,
    patchApplyAllowedFromUi: false,
    apiKeyExportAllowed: false,
    secretExportAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    memoryAutoPromotionAllowed: false,
    memoryRagIngestionAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
    renderJobMutationAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeAgentPluginRegistryComparison(
  model: Pick<AgentPluginRegistryComparisonModel, "comparisons">
): string {
  return `Agent plugin registry comparison reviews ${model.comparisons.length} future registry decision posture(s). Plugin comparison does not execute plugins, third-party code is not vendored or copied, and future plugin adoption requires license security review.`;
}

export function buildAgentPluginRegistryComparisonModel(): AgentPluginRegistryComparisonModel {
  const comparisons = buildAgentPluginRegistryComparisons();
  const model: AgentPluginRegistryComparisonModel = {
    title: "Agent plugin registry comparison",
    summary: "",
    comparisons,
    boundary: buildAgentPluginRegistryComparisonBoundary(),
    registryLanguage: [...AGENT_PLUGIN_REGISTRY_COMPARISON_LANGUAGE],
    advancedDetails: [
      "Agent plugin registry comparison",
      "Plugin comparison does not execute plugins",
      "Third-party code is not vendored or copied",
      "Future plugin adoption requires license security review",
      "Future plugin adoption requires license/security review",
      "Comparison identity",
      "Source reference spikes",
      "CodexForge registry requirements",
      "Plugin manifest lessons",
      "Permission/scope lessons",
      "Audit/recovery requirements",
      "Sandboxing/non-goals",
      "Risks/gaps",
      "MCP boundary route",
      "Next recommended route",
      "Advanced comparison details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAgentPluginRegistryComparison(model) };
}
