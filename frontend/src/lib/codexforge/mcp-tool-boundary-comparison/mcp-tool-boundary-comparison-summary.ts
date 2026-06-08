import type {
  McpToolBoundaryComparison,
  McpToolBoundaryComparisonBoundary,
  McpToolBoundaryComparisonModel,
} from "./mcp-tool-boundary-comparison-types";
import { buildMcpToolBoundaryComparisonStableKey } from "./mcp-tool-boundary-comparison-types";

export const MCP_TOOL_BOUNDARY_COMPARISON_LANGUAGE = [
  "MCP tool boundary comparison",
  "MCP tools are not executed from this page",
  "MCP support is review-only in this spike",
  "Future MCP adoption requires explicit permission boundaries",
  "Permission boundary mapping",
  "Denied tool scope",
] as const;

export function buildMcpToolBoundaryComparison(
  input: Omit<McpToolBoundaryComparison, "id"> & { idHint: string }
): McpToolBoundaryComparison {
  const { idHint, ...comparison } = input;
  return {
    id: buildMcpToolBoundaryComparisonStableKey(
      "mcp-tool-boundary-comparison",
      idHint,
      input.comparisonIdentity
    ),
    ...comparison,
  };
}

export function buildMcpToolBoundaryComparisons(): McpToolBoundaryComparison[] {
  return [
    buildMcpToolBoundaryComparison({
      idHint: "reviewed-tool-category-map",
      comparisonIdentity:
        "Comparison identity: mcp-tool-boundary-comparison-reviewed-tool-category-map.",
      sourcePluginRegistryComparison:
        "Source plugin registry comparison: /agent-plugin-registry-comparison defines disabled-by-default manifest and permission expectations before any future tool support.",
      mcpCapabilityCategories: [
        "Read-only metadata tools",
        "Provider-adjacent tools",
        "Local workspace tools",
        "Command or process tools",
        "Memory and retrieval tools",
      ],
      permissionBoundaryMapping:
        "Permission boundary mapping: each capability category must map to a narrow Jarvisd-style permission, denied scope, approval copy, consent expiry, and recovery route.",
      signedRequestAuditMapping:
        "Signed request/audit mapping: future tool calls require signed request review and redacted audit handoff before any runtime can execute outside this page.",
      localRemoteToolRiskSplit:
        "Local/remote tool risk split: local tools can expose files, commands, processes, or endpoint secrets; remote tools can expose prompts, files, tokens, costs, and data egress.",
      deniedToolScope: [
        "No command execution",
        "No arbitrary file browsing",
        "No provider request",
        "No MCP server or client runtime",
        "No tool call from UI",
      ],
      approvalRequirement:
        "Approval requirement: future MCP adoption requires explicit permission boundaries and separate approved runtime work.",
      memoryRagRoute: "Memory/RAG route: /agent-memory-rag-pattern-review.",
      blockedReasons: [
        "MCP support is review-only in this spike",
        "MCP tools are not executed from this page",
        "MCP boundaries are review-only",
      ],
      advancedBoundaryDetails:
        "Advanced MCP boundary details: this page does not create an MCP server, MCP client, tool executor, local command bridge, file browser, provider sender, or memory ingestion path.",
    }),
    buildMcpToolBoundaryComparison({
      idHint: "blocked-overbroad-tool",
      comparisonIdentity:
        "Comparison identity: mcp-tool-boundary-comparison-blocked-overbroad-tool.",
      sourcePluginRegistryComparison:
        "Source plugin registry comparison: blocked plugin registry entries remain disabled when tool scope is vague or broad.",
      mcpCapabilityCategories: [
        "Arbitrary local file access",
        "Shell command bundles",
        "Provider senders",
        "Memory writers",
      ],
      permissionBoundaryMapping:
        "Permission boundary mapping: blocked if the permission is broader than the reviewed purpose or cannot name denied scope plainly.",
      signedRequestAuditMapping:
        "Signed request/audit mapping: blocked if request identity, consent, replay protection, redaction, or audit handoff is missing.",
      localRemoteToolRiskSplit:
        "Local/remote tool risk split: blocked when either side can mutate local state, spend tokens, expose secrets, or send prompts/files without approval.",
      deniedToolScope: [
        "No shell command execution",
        "No git command execution from UI",
        "No test execution from UI",
        "No arbitrary path crawling",
        "No secret export",
      ],
      approvalRequirement:
        "Approval requirement: blocked tools need a new design review before they can move beyond comparison copy.",
      memoryRagRoute: "Memory/RAG route: /agent-memory-rag-pattern-review.",
      blockedReasons: [
        "Denied tool scope is too broad",
        "Explicit permission boundary is missing",
        "Audit and recovery mapping is incomplete",
      ],
      advancedBoundaryDetails:
        "Advanced MCP boundary details: blocked MCP tool claims remain secondary and cannot imply runtime support, tool calls, plugin execution, command execution, provider traffic, or file access.",
    }),
  ];
}

export function buildMcpToolBoundaryComparisonBoundary(): McpToolBoundaryComparisonBoundary {
  return {
    mcpSupportReviewOnly: true,
    mcpRuntimeCreated: false,
    mcpServerCreated: false,
    mcpClientCreated: false,
    mcpToolsExecutedFromPage: false,
    mcpToolCallsAllowedFromUi: false,
    externalToolsExecutedFromUi: false,
    localCommandsExecutedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    explicitPermissionBoundariesRequired: true,
    signedRequestAuditRequiredBeforeExecution: true,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
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
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeMcpToolBoundaryComparison(
  model: Pick<McpToolBoundaryComparisonModel, "comparisons">
): string {
  return `MCP tool boundary comparison reviews ${model.comparisons.length} future tool boundary posture(s). MCP tools are not executed from this page, MCP support is review-only in this spike, and future MCP adoption requires explicit permission boundaries.`;
}

export function buildMcpToolBoundaryComparisonModel(): McpToolBoundaryComparisonModel {
  const comparisons = buildMcpToolBoundaryComparisons();
  const model: McpToolBoundaryComparisonModel = {
    title: "MCP tool boundary comparison",
    summary: "",
    comparisons,
    boundary: buildMcpToolBoundaryComparisonBoundary(),
    boundaryLanguage: [...MCP_TOOL_BOUNDARY_COMPARISON_LANGUAGE],
    advancedDetails: [
      "MCP tool boundary comparison",
      "MCP tools are not executed from this page",
      "MCP support is review-only in this spike",
      "Future MCP adoption requires explicit permission boundaries",
      "MCP boundaries are review-only",
      "Comparison identity",
      "Source plugin registry comparison",
      "MCP capability categories",
      "Permission boundary mapping",
      "Signed request/audit mapping",
      "Local/remote tool risk split",
      "Denied tool scope",
      "Approval requirement",
      "Memory/RAG route",
      "Blocked reasons",
      "Advanced MCP boundary details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeMcpToolBoundaryComparison(model) };
}
