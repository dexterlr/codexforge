import type {
  ExtensionSandboxBoundaryReview,
  ExtensionSandboxBoundaryReviewBoundary,
  ExtensionSandboxBoundaryReviewModel,
} from "./extension-sandbox-boundary-review-types";
import { buildExtensionSandboxBoundaryReviewStableKey } from "./extension-sandbox-boundary-review-types";

export const EXTENSION_SANDBOX_BOUNDARY_REVIEW_LANGUAGE = [
  "Extension sandbox boundary review",
  "Sandbox review does not enable runtime execution",
  "Extensions cannot access files tools or providers without approved boundaries",
  "Runtime execution remains blocked until future approved executor",
  "Execution isolation model",
  "Audit recovery hooks",
] as const;

export function buildExtensionSandboxBoundaryReview(
  input: Omit<ExtensionSandboxBoundaryReview, "id"> & { idHint: string }
): ExtensionSandboxBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildExtensionSandboxBoundaryReviewStableKey(
      "extension-sandbox-boundary-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildExtensionSandboxBoundaryReviews(): ExtensionSandboxBoundaryReview[] {
  return [
    buildExtensionSandboxBoundaryReview({
      idHint: "reviewed-isolation-before-executor",
      status: "reviewed boundary",
      sandboxReviewIdentity:
        "Sandbox review identity: extension-sandbox-boundary-review-isolation-before-executor.",
      sourcePermissionPolicyBuilder:
        "Source permission policy builder: /extension-permission-policy-builder maps allowed and denied scopes without granting permissions.",
      executionIsolationModel:
        "Execution isolation model: future runtime work must start disabled, run only after explicit approval, constrain capabilities to a reviewed allowlist, and produce a redacted audit handoff.",
      localFileBoundary:
        "Local file boundary: extensions cannot browse paths, open arbitrary files, crawl directories, write files, delete files, apply patches, or auto-open local artifacts from UI.",
      networkBoundary:
        "Network boundary: extensions cannot call external services, arbitrary local endpoints, MCP servers, or cloud providers without an approved boundary.",
      providerBoundary:
        "Provider boundary: prompts, files, findings, API keys, secrets, and provider routing stay blocked until explicit provider review approves a narrow request.",
      mcpToolBoundary:
        "MCP/tool boundary: MCP runtime, MCP client, MCP server, and tool calls stay blocked; future tool use needs signed request, permission, audit, and recovery review.",
      memoryRagBoundary:
        "Memory/RAG boundary: memory and RAG are not ingested automatically, memory is not auto-promoted, and Brain graph mutation remains blocked from UI.",
      auditRecoveryHooks:
        "Audit recovery hooks: future execution must prepare redacted audit candidates, blocked reasons, recovery route, rollback note, and replay-safe review before activation.",
      releaseCandidateRoute:
        "Release candidate route: /extension-registry-release-candidate audits readiness after manifest, policy, and sandbox boundaries are reviewed.",
      blockedReasons: [
        "Sandbox review does not enable runtime execution",
        "Extensions cannot access files tools or providers without approved boundaries",
        "Runtime execution remains blocked until future approved executor",
      ],
      advancedSandboxDetails:
        "Advanced sandbox details: review-only sandbox boundaries cannot create runtime execution, run plugins, call tools, call agents, create MCP runtimes, call providers, mutate files, ingest memory, mutate registries, or grant Jarvisd permissions.",
    }),
    buildExtensionSandboxBoundaryReview({
      idHint: "blocked-missing-isolation",
      status: "blocked",
      sandboxReviewIdentity:
        "Sandbox review identity: extension-sandbox-boundary-review-blocked-missing-isolation.",
      sourcePermissionPolicyBuilder:
        "Source permission policy builder: blocked because allowed scope, denied scope, approval, or audit recovery requirement is incomplete.",
      executionIsolationModel:
        "Execution isolation model: blocked when runtime activation, process control, or capability execution is requested before a future approved executor exists.",
      localFileBoundary:
        "Local file boundary: blocked when arbitrary local file browsing, path crawling, file read/open, file write, patch apply, or deletion is requested.",
      networkBoundary:
        "Network boundary: blocked when arbitrary network, provider, local endpoint, or MCP tool calls are requested automatically.",
      providerBoundary:
        "Provider boundary: blocked when prompt/file sending, API key handling, provider registry mutation, or live routing is requested without explicit review.",
      mcpToolBoundary:
        "MCP/tool boundary: blocked when MCP runtime or tool execution is requested before signed request and permission boundaries are approved.",
      memoryRagBoundary:
        "Memory/RAG boundary: blocked when ingestion, auto-promotion, Brain graph mutation, appendEvent, or saveBrainGraph is requested from UI.",
      auditRecoveryHooks:
        "Audit/recovery hooks: blocked when redaction, audit note, recovery route, or rollback evidence is missing.",
      releaseCandidateRoute:
        "Release candidate route: /extension-registry-release-candidate remains blocked until the sandbox boundary is narrowed.",
      blockedReasons: [
        "Execution isolation model is incomplete",
        "Local file boundary is too broad",
        "Audit/recovery hooks are missing",
      ],
      advancedSandboxDetails:
        "Advanced sandbox details: blocked sandbox requests remain secondary and cannot imply runtime executor creation, command execution, file mutation, provider calls, MCP tool calls, memory ingestion, Brain graph mutation, or process control.",
    }),
  ];
}

export function buildExtensionSandboxBoundaryReviewBoundary(): ExtensionSandboxBoundaryReviewBoundary {
  return {
    sandboxReviewEnablesRuntimeExecution: false,
    runtimeExecutionBlockedUntilApprovedExecutor: true,
    extensionsCanAccessFilesToolsProvidersWithoutBoundaries: false,
    extensionInstallAllowedFromUi: false,
    extensionEnablementAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    pluginRuntimeCreated: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    mcpRuntimeCreated: false,
    mcpServerCreated: false,
    mcpClientCreated: false,
    mcpToolCallsAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    providerRegistryMutationAllowed: false,
    jarvisdRegistryMutationAllowed: false,
    jarvisdPermissionAutoGrantAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
    thirdPartyLicenseSecurityReviewRequired: true,
    futureExtensionAdoptionRequiresLicenseSecurityReview: true,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
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

export function summarizeExtensionSandboxBoundaryReview(
  model: Pick<ExtensionSandboxBoundaryReviewModel, "reviews">
): string {
  return `Extension sandbox boundary review documents ${model.reviews.length} isolation posture(s) before any runtime work. Sandbox review does not enable runtime execution, extensions cannot access files tools or providers without approved boundaries, and runtime execution remains blocked until future approved executor.`;
}

export function buildExtensionSandboxBoundaryReviewModel(): ExtensionSandboxBoundaryReviewModel {
  const reviews = buildExtensionSandboxBoundaryReviews();
  const model: ExtensionSandboxBoundaryReviewModel = {
    title: "Extension sandbox boundary review",
    summary: "",
    reviews,
    boundary: buildExtensionSandboxBoundaryReviewBoundary(),
    sandboxLanguage: [...EXTENSION_SANDBOX_BOUNDARY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Extension sandbox boundary review",
      "Sandbox review does not enable runtime execution",
      "Extensions cannot access files tools or providers without approved boundaries",
      "Runtime execution remains blocked until future approved executor",
      "Sandbox review identity",
      "Source permission policy builder",
      "Execution isolation model",
      "Local file boundary",
      "Network boundary",
      "Provider boundary",
      "MCP/tool boundary",
      "Memory/RAG boundary",
      "Audit recovery hooks",
      "Audit/recovery hooks",
      "Release candidate route",
      "Blocked reasons",
      "Advanced sandbox details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeExtensionSandboxBoundaryReview(model) };
}
