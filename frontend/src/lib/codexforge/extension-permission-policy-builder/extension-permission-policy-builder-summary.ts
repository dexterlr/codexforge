import type {
  ExtensionPermissionPolicyBuilder,
  ExtensionPermissionPolicyBuilderBoundary,
  ExtensionPermissionPolicyBuilderModel,
} from "./extension-permission-policy-builder-types";
import { buildExtensionPermissionPolicyBuilderStableKey } from "./extension-permission-policy-builder-types";

export const EXTENSION_PERMISSION_POLICY_BUILDER_LANGUAGE = [
  "Extension permission policy builder",
  "Permission policies do not grant permissions automatically",
  "Extension permissions require explicit review",
  "Denied scopes remain blocked",
  "Allowed permission scope",
  "Sandbox boundary route",
] as const;

export function buildExtensionPermissionPolicyBuilder(
  input: Omit<ExtensionPermissionPolicyBuilder, "id"> & { idHint: string }
): ExtensionPermissionPolicyBuilder {
  const { idHint, ...policy } = input;
  return {
    id: buildExtensionPermissionPolicyBuilderStableKey(
      "extension-permission-policy-builder",
      idHint,
      input.status
    ),
    ...policy,
  };
}

export function buildExtensionPermissionPolicyBuilders(): ExtensionPermissionPolicyBuilder[] {
  return [
    buildExtensionPermissionPolicyBuilder({
      idHint: "manifest-declarations-to-review-scopes",
      status: "mapped for review",
      policyBuilderIdentity:
        "Policy builder identity: extension-permission-policy-builder-review-scope-map.",
      sourceManifestSchemaReview:
        "Source manifest schema review: /extension-manifest-schema-review supplies identity, capability, permission, data, version, denied-field, and blocked-reason declarations.",
      requestedCapabilities: [
        "review-only extension metadata",
        "operator-facing route handoff",
        "static policy explanation",
        "future audit packet planning",
      ],
      allowedPermissionScope: [
        "read static manifest metadata",
        "display review labels",
        "link to approved review routes",
        "record blocked reasons as copy-only model text",
      ],
      deniedPermissionScope: [
        "install extensions",
        "enable plugins",
        "execute tools or agents",
        "browse arbitrary local files",
        "mutate provider or Jarvisd registries",
        "grant Jarvisd permissions automatically",
      ],
      dataBoundaryPolicy:
        "Data boundary policy: local file, provider, MCP, memory, RAG, and Jarvisd access stay denied until a human-readable boundary and explicit approval exist.",
      auditRecoveryRequirement:
        "Audit/recovery requirement: future adoption must include redacted audit notes, blocked reasons, recovery route, rollback note, and review owner before execution can be considered.",
      approvalRequirement:
        "Approval requirement: extension permissions require explicit review, denied scopes remain blocked, and permission policies do not grant permissions automatically.",
      sandboxBoundaryRoute:
        "Sandbox boundary route: /extension-sandbox-boundary-review reviews isolation before any future executor is designed.",
      blockedReasons: [
        "Permission policies do not grant permissions automatically",
        "Extension permissions require explicit review",
        "Denied scopes remain blocked",
      ],
      advancedPermissionDetails:
        "Advanced permission details: this builder maps review language only and cannot grant permissions, mutate provider/Jarvisd registries, browse files, execute extensions, call MCP tools, ingest memory, or call providers.",
    }),
    buildExtensionPermissionPolicyBuilder({
      idHint: "blocked-broad-scope-request",
      status: "blocked",
      policyBuilderIdentity:
        "Policy builder identity: extension-permission-policy-builder-blocked-broad-scope.",
      sourceManifestSchemaReview:
        "Source manifest schema review: blocked because requested manifest scope is broad, automatic, or not paired with denied scope.",
      requestedCapabilities: [
        "blocked broad file access",
        "blocked provider access",
        "blocked MCP tool access",
        "blocked agent access",
      ],
      allowedPermissionScope: [
        "none until the request is narrowed to review-only metadata",
      ],
      deniedPermissionScope: [
        "local command execution",
        "arbitrary path crawling",
        "automatic provider send",
        "memory auto-promotion",
        "extension runtime execution",
      ],
      dataBoundaryPolicy:
        "Data boundary policy: blocked requests cannot read files, crawl paths, send prompts/files to providers, store secrets, or ingest memory.",
      auditRecoveryRequirement:
        "Audit/recovery requirement: blocked until audit, recovery, redaction, owner, rollback, and expiry evidence are explicit.",
      approvalRequirement:
        "Approval requirement: blocked until the operator can review allowed scope, denied scope, and sandbox boundary language in plain English.",
      sandboxBoundaryRoute:
        "Sandbox boundary route: /extension-sandbox-boundary-review remains the next review route after scope is narrowed.",
      blockedReasons: [
        "Requested capabilities are broad",
        "Denied permission scope is incomplete",
        "Approval requirement is missing",
      ],
      advancedPermissionDetails:
        "Advanced permission details: blocked policies remain secondary and cannot imply automatic grant, extension installation, runtime execution, provider traffic, Jarvisd capability execution, local file access, command execution, memory ingestion, or registry mutation.",
    }),
  ];
}

export function buildExtensionPermissionPolicyBuilderBoundary(): ExtensionPermissionPolicyBuilderBoundary {
  return {
    permissionPoliciesGrantAutomatically: false,
    permissionGrantAllowedFromUi: false,
    extensionPermissionsRequireExplicitReview: true,
    deniedScopesRemainBlocked: true,
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

export function summarizeExtensionPermissionPolicyBuilder(
  model: Pick<ExtensionPermissionPolicyBuilderModel, "policies">
): string {
  return `Extension permission policy builder maps ${model.policies.length} manifest permission posture(s) to allowed and denied review scopes. Permission policies do not grant permissions automatically, extension permissions require explicit review, and denied scopes remain blocked.`;
}

export function buildExtensionPermissionPolicyBuilderModel(): ExtensionPermissionPolicyBuilderModel {
  const policies = buildExtensionPermissionPolicyBuilders();
  const model: ExtensionPermissionPolicyBuilderModel = {
    title: "Extension permission policy builder",
    summary: "",
    policies,
    boundary: buildExtensionPermissionPolicyBuilderBoundary(),
    policyLanguage: [...EXTENSION_PERMISSION_POLICY_BUILDER_LANGUAGE],
    advancedDetails: [
      "Extension permission policy builder",
      "Permission policies do not grant permissions automatically",
      "Extension permissions require explicit review",
      "Denied scopes remain blocked",
      "Policy builder identity",
      "Source manifest schema review",
      "Requested capabilities",
      "Allowed permission scope",
      "Denied permission scope",
      "Data boundary policy",
      "Audit/recovery requirement",
      "Approval requirement",
      "Sandbox boundary route",
      "Blocked reasons",
      "Advanced permission details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeExtensionPermissionPolicyBuilder(model) };
}
