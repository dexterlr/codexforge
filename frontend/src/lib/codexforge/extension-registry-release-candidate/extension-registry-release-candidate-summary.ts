import type {
  ExtensionRegistryReleaseCandidate,
  ExtensionRegistryReleaseCandidateBoundary,
  ExtensionRegistryReleaseCandidateModel,
} from "./extension-registry-release-candidate-types";
import { buildExtensionRegistryReleaseCandidateStableKey } from "./extension-registry-release-candidate-types";

export const EXTENSION_REGISTRY_RELEASE_CANDIDATE_LANGUAGE = [
  "Extension registry release candidate",
  "Registry release candidate remains review-only",
  "Extensions are not installed or enabled automatically",
  "Runtime execution remains behind approved boundaries",
  "Release decision",
  "Known gaps",
] as const;

export function buildExtensionRegistryReleaseCandidate(
  input: Omit<ExtensionRegistryReleaseCandidate, "id"> & { idHint: string }
): ExtensionRegistryReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildExtensionRegistryReleaseCandidateStableKey(
      "extension-registry-release-candidate",
      idHint,
      input.releaseDecision
    ),
    ...candidate,
  };
}

export function buildExtensionRegistryReleaseCandidates(): ExtensionRegistryReleaseCandidate[] {
  return [
    buildExtensionRegistryReleaseCandidate({
      idHint: "ready-with-fixes-review-only-registry",
      releaseCandidateIdentity:
        "Release candidate identity: extension-registry-release-candidate-review-only-ready-with-fixes.",
      coveredExtensionSurfaces: [
        "/extension-architecture-decision",
        "/extension-manifest-schema-review",
        "/extension-permission-policy-builder",
        "/extension-sandbox-boundary-review",
      ],
      manifestSchemaReadiness:
        "Manifest schema readiness: ready with fixes for static manifest identity, capability, permission, data, version, compatibility, denied-field, and blocked-reason review language.",
      permissionPolicyReadiness:
        "Permission policy readiness: ready with fixes for allowed scope, denied scope, data boundary, audit/recovery requirement, and approval requirement language; no permissions are granted automatically.",
      sandboxBoundaryReadiness:
        "Sandbox boundary readiness: ready with fixes for execution isolation, local file boundary, network boundary, provider boundary, MCP/tool boundary, memory/RAG boundary, and audit recovery hooks.",
      auditRecoveryReadiness:
        "Audit/recovery readiness: ready with fixes for redacted audit candidates, blocked reasons, recovery route, rollback note, and future replay-safe review.",
      licenseSecurityReviewReadiness:
        "License/security review readiness: ready with fixes because future extension adoption still requires license/security review before any third-party code is adopted.",
      knownGaps: [
        "No runtime plugin executor exists",
        "No MCP runtime exists",
        "No live registry install flow exists",
        "License/security review checklist still needs owner assignment",
        "Future approved executor contract is not designed in this batch",
      ],
      releaseDecision: "ready with fixes",
      releaseDecisionLabel:
        "Release decision: ready with fixes for a review-only extension registry release candidate; ready, ready with fixes, and blocked remain the only decision labels.",
      nextRecommendedRoute:
        "Next recommended route: /extension-manifest-schema-review if schema evidence needs another pass, otherwise keep runtime execution behind approved boundaries.",
      blockedReasons: [
        "Registry release candidate remains review-only",
        "Extensions are not installed or enabled automatically",
        "Runtime execution remains behind approved boundaries",
      ],
      advancedReleaseDetails:
        "Advanced release details: registry release candidate remains review-only and cannot install extensions, enable plugins, create a runtime executor, call MCP tools, call providers, mutate registries, browse files, ingest memory, or auto-promote memory.",
    }),
    buildExtensionRegistryReleaseCandidate({
      idHint: "blocked-runtime-executor-request",
      releaseCandidateIdentity:
        "Release candidate identity: extension-registry-release-candidate-blocked-runtime-executor-request.",
      coveredExtensionSurfaces: [
        "runtime executor request",
        "extension install request",
        "automatic enablement request",
      ],
      manifestSchemaReadiness:
        "Manifest schema readiness: blocked when runtime fields, install behavior, or automatic activation appears in the manifest.",
      permissionPolicyReadiness:
        "Permission policy readiness: blocked when allowed scope is broad, denied scope is incomplete, or permissions would be granted automatically.",
      sandboxBoundaryReadiness:
        "Sandbox boundary readiness: blocked when execution isolation, local file, network, provider, MCP/tool, or memory/RAG boundaries are missing.",
      auditRecoveryReadiness:
        "Audit/recovery readiness: blocked when redaction, blocked reasons, recovery route, rollback note, or review owner is missing.",
      licenseSecurityReviewReadiness:
        "License/security review readiness: blocked when third-party license/security review is missing or unclear.",
      knownGaps: [
        "Runtime execution requested before approved executor",
        "Automatic extension enablement requested",
        "Provider/Jarvisd registry mutation requested",
        "MCP or memory activation requested automatically",
      ],
      releaseDecision: "blocked",
      releaseDecisionLabel:
        "Release decision: blocked for any extension registry request that installs, enables, executes, mutates registries, or calls tools automatically.",
      nextRecommendedRoute:
        "Next recommended route: /extension-sandbox-boundary-review to narrow runtime and access boundaries before release readiness is reconsidered.",
      blockedReasons: [
        "Automatic install or enablement requested",
        "Runtime execution requested without approved boundaries",
        "License/security review missing",
      ],
      advancedReleaseDetails:
        "Advanced release details: blocked release candidates remain secondary and cannot imply plugin execution, MCP runtime creation, agent execution, file mutation, provider calls, Jarvisd capability execution, Brain graph mutation, or command execution.",
    }),
  ];
}

export function buildExtensionRegistryReleaseCandidateBoundary(): ExtensionRegistryReleaseCandidateBoundary {
  return {
    registryReleaseCandidateReviewOnly: true,
    extensionsInstalledAutomatically: false,
    extensionsEnabledAutomatically: false,
    runtimeExecutionBehindApprovedBoundaries: true,
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

export function summarizeExtensionRegistryReleaseCandidate(
  model: Pick<ExtensionRegistryReleaseCandidateModel, "candidates">
): string {
  return `Extension registry release candidate audits ${model.candidates.length} release posture(s). Registry release candidate remains review-only, extensions are not installed or enabled automatically, and runtime execution remains behind approved boundaries.`;
}

export function buildExtensionRegistryReleaseCandidateModel(): ExtensionRegistryReleaseCandidateModel {
  const candidates = buildExtensionRegistryReleaseCandidates();
  const model: ExtensionRegistryReleaseCandidateModel = {
    title: "Extension registry release candidate",
    summary: "",
    candidates,
    boundary: buildExtensionRegistryReleaseCandidateBoundary(),
    releaseLanguage: [...EXTENSION_REGISTRY_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Extension registry release candidate",
      "Registry release candidate remains review-only",
      "Extensions are not installed or enabled automatically",
      "Runtime execution remains behind approved boundaries",
      "Release candidate identity",
      "Covered extension surfaces",
      "Manifest schema readiness",
      "Permission policy readiness",
      "Sandbox boundary readiness",
      "Audit/recovery readiness",
      "License/security review readiness",
      "Known gaps",
      "Release decision",
      "Next recommended route",
      "Ready",
      "Ready with fixes",
      "Blocked",
      "Advanced release details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeExtensionRegistryReleaseCandidate(model) };
}
