import type {
  CodexForgeExtensionArchitectureDecision,
  CodexForgeExtensionArchitectureDecisionBoundary,
  CodexForgeExtensionArchitectureDecisionModel,
} from "./codexforge-extension-architecture-decision-types";
import { buildCodexForgeExtensionArchitectureDecisionStableKey } from "./codexforge-extension-architecture-decision-types";

export const CODEXFORGE_EXTENSION_ARCHITECTURE_DECISION_LANGUAGE = [
  "CodexForge extension architecture decision",
  "Extension architecture does not enable plugins automatically",
  "Runtime execution remains behind approved boundaries",
  "Third-party adoption requires license security review",
  "Staged rollout recommendation",
  "Release decision",
] as const;

export function buildCodexForgeExtensionArchitectureDecision(
  input: Omit<CodexForgeExtensionArchitectureDecision, "id"> & { idHint: string }
): CodexForgeExtensionArchitectureDecision {
  const { idHint, ...decision } = input;
  return {
    id: buildCodexForgeExtensionArchitectureDecisionStableKey(
      "codexforge-extension-architecture-decision",
      idHint,
      input.releaseDecision
    ),
    ...decision,
  };
}

export function buildCodexForgeExtensionArchitectureDecisions(): CodexForgeExtensionArchitectureDecision[] {
  return [
    buildCodexForgeExtensionArchitectureDecision({
      idHint: "proceed-with-fixes-safe-shell",
      architectureDecisionIdentity:
        "Architecture decision identity: codexforge-extension-architecture-decision-safe-shell-proceed-with-fixes.",
      sourceComparisonSurfaces: [
        "/agent-plugin-registry-comparison",
        "/mcp-tool-boundary-comparison",
        "/agent-memory-rag-pattern-review",
      ],
      recommendedExtensionShape:
        "Recommended extension shape: a disabled-by-default extension registry with manifest review, permission mapping, signed request design, audit/recovery handoff, and memory review dependency before runtime work.",
      permissionModel:
        "Permission model: explicit scope, denied scope, operator consent, expiry, review route, and approved boundary are required before any future runtime execution.",
      auditRecoveryModel:
        "Audit/recovery model: future execution must produce redacted audit candidates, blocked reasons, recovery route, and rollback notes without mutating audit logs from UI.",
      memoryRagPolicy:
        "Memory/RAG policy: memory and RAG are not ingested automatically; memory promotion requires explicit review and secret values are redacted before review.",
      nonGoals:
        "Non-goals: no plugin runtime, no MCP runtime, no memory ingestion, no provider or Jarvisd registry mutation, no third-party code copy, and no runtime enablement from this decision page.",
      stagedRolloutRecommendation:
        "Staged rollout recommendation: proceed with fixes for architecture documentation, then build separate approved runtime gates only after license/security review and permission contracts exist.",
      releaseDecision: "proceed with fixes",
      releaseDecisionLabel:
        "Release decision: proceed with fixes for review-only extension architecture; proceed, proceed with fixes, and blocked remain the only release decision labels.",
      nextRecommendedRoute:
        "Next recommended route: /jarvisd-runtime-enforcement for existing approved-boundary language before any future runtime design.",
      blockedReasons: [
        "Runtime execution remains behind approved boundaries",
        "Third-party adoption requires license/security review",
        "Extension architecture does not enable plugins automatically",
      ],
      advancedDecisionDetails:
        "Advanced decision details: runtime execution remains behind approved boundaries, extension architecture does not enable plugins automatically, MCP tools are not enabled, memory is not ingested, and provider/Jarvisd registries are not mutated.",
    }),
    buildCodexForgeExtensionArchitectureDecision({
      idHint: "proceed-documentation-only",
      architectureDecisionIdentity:
        "Architecture decision identity: codexforge-extension-architecture-decision-documentation-only-proceed.",
      sourceComparisonSurfaces: [
        "/agent-plugin-registry-comparison",
        "/mcp-tool-boundary-comparison",
        "/agent-memory-rag-pattern-review",
      ],
      recommendedExtensionShape:
        "Recommended extension shape: proceed only for documentation, route copy, smoke coverage, and operator-facing decision language.",
      permissionModel:
        "Permission model: proceed documentation can name future boundaries but cannot grant permissions or execute capabilities.",
      auditRecoveryModel:
        "Audit/recovery model: proceed documentation can describe audit candidates and recovery routes without appending events or mutating logs.",
      memoryRagPolicy:
        "Memory/RAG policy: proceed documentation can describe reviewed candidate flow only; no ingestion or promotion happens here.",
      nonGoals:
        "Non-goals: no runtime adapter, no MCP support, no plugin execution, no provider send, no command execution, and no file mutation.",
      stagedRolloutRecommendation:
        "Staged rollout recommendation: proceed for static decision coverage and keep implementation gates separate.",
      releaseDecision: "proceed",
      releaseDecisionLabel:
        "Release decision: proceed only for read-only decision documentation and smoke coverage.",
      nextRecommendedRoute:
        "Next recommended route: /agent-plugin-registry-comparison if registry assumptions need review.",
      blockedReasons: [
        "Proceed scope is documentation-only",
        "Runtime implementation is outside this batch",
      ],
      advancedDecisionDetails:
        "Advanced decision details: proceed does not imply activation. It keeps comparison surfaces static and leaves runtime execution behind future approved boundaries.",
    }),
    buildCodexForgeExtensionArchitectureDecision({
      idHint: "blocked-runtime-enable",
      architectureDecisionIdentity:
        "Architecture decision identity: codexforge-extension-architecture-decision-blocked-runtime-enable.",
      sourceComparisonSurfaces: [
        "Plugin registry runtime enablement request",
        "MCP tool execution request",
        "Memory auto-ingestion request",
      ],
      recommendedExtensionShape:
        "Recommended extension shape: blocked when a plan tries to enable plugins, MCP tools, memory ingestion, provider traffic, local commands, or registry mutation automatically.",
      permissionModel:
        "Permission model: blocked when explicit permission boundaries, consent, denied scope, and approved runtime boundary are missing.",
      auditRecoveryModel:
        "Audit/recovery model: blocked when audit, recovery, redaction, rollback, or replay protection evidence is missing.",
      memoryRagPolicy:
        "Memory/RAG policy: blocked when memory ingestion or promotion would happen without explicit review.",
      nonGoals:
        "Non-goals: blocked scope cannot create runtime plugin execution, enable MCP tools, ingest memory, mutate provider/Jarvisd registries, or copy third-party code.",
      stagedRolloutRecommendation:
        "Staged rollout recommendation: blocked until license/security review, permission contracts, signed request review, audit recovery, and memory review policy are complete.",
      releaseDecision: "blocked",
      releaseDecisionLabel:
        "Release decision: blocked for automatic extension runtime enablement.",
      nextRecommendedRoute:
        "Next recommended route: /mcp-tool-boundary-comparison if tool boundary scope needs narrowing.",
      blockedReasons: [
        "Runtime execution requested without approved boundaries",
        "Third-party adoption review missing",
        "Memory or MCP activation requested automatically",
      ],
      advancedDecisionDetails:
        "Advanced decision details: blocked decisions remain read-only and cannot execute plugins, run MCP tools, ingest memory, mutate registries, call providers, browse files, run commands, or change local processes.",
    }),
  ];
}

export function buildCodexForgeExtensionArchitectureDecisionBoundary(): CodexForgeExtensionArchitectureDecisionBoundary {
  return {
    extensionArchitectureEnablesPluginsAutomatically: false,
    runtimeExecutionBehindApprovedBoundaries: true,
    pluginRuntimeCreated: false,
    pluginExecutionAllowedFromUi: false,
    mcpToolsEnabled: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    providerRegistryMutationAllowed: false,
    jarvisdRegistryMutationAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
    thirdPartyLicenseSecurityReviewRequired: true,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
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
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
    renderJobMutationAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeCodexForgeExtensionArchitectureDecision(
  model: Pick<CodexForgeExtensionArchitectureDecisionModel, "decisions">
): string {
  return `CodexForge extension architecture decision consolidates ${model.decisions.length} extension decision posture(s). Extension architecture does not enable plugins automatically, runtime execution remains behind approved boundaries, and third-party adoption requires license security review.`;
}

export function buildCodexForgeExtensionArchitectureDecisionModel(): CodexForgeExtensionArchitectureDecisionModel {
  const decisions = buildCodexForgeExtensionArchitectureDecisions();
  const model: CodexForgeExtensionArchitectureDecisionModel = {
    title: "CodexForge extension architecture decision",
    summary: "",
    decisions,
    boundary: buildCodexForgeExtensionArchitectureDecisionBoundary(),
    decisionLanguage: [...CODEXFORGE_EXTENSION_ARCHITECTURE_DECISION_LANGUAGE],
    advancedDetails: [
      "CodexForge extension architecture decision",
      "Extension architecture does not enable plugins automatically",
      "Runtime execution remains behind approved boundaries",
      "Third-party adoption requires license security review",
      "Third-party adoption requires license/security review",
      "Architecture decision identity",
      "Source comparison surfaces",
      "Recommended extension shape",
      "Permission model",
      "Audit/recovery model",
      "Memory/RAG policy",
      "Non-goals",
      "Staged rollout recommendation",
      "Release decision",
      "Next recommended route",
      "Proceed",
      "Proceed with fixes",
      "Blocked",
      "Advanced decision details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodexForgeExtensionArchitectureDecision(model) };
}
