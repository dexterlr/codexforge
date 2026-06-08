import type {
  ExtensionManifestSchemaReview,
  ExtensionManifestSchemaReviewBoundary,
  ExtensionManifestSchemaReviewModel,
} from "./extension-manifest-schema-review-types";
import { buildExtensionManifestSchemaReviewStableKey } from "./extension-manifest-schema-review-types";

export const EXTENSION_MANIFEST_SCHEMA_REVIEW_LANGUAGE = [
  "Extension manifest schema review",
  "Schema review does not install or run extensions",
  "Third-party code is not vendored or copied",
  "Future extension adoption requires license security review",
  "Capability declarations",
  "Permission policy route",
] as const;

export function buildExtensionManifestSchemaReview(
  input: Omit<ExtensionManifestSchemaReview, "id"> & { idHint: string }
): ExtensionManifestSchemaReview {
  const { idHint, ...review } = input;
  return {
    id: buildExtensionManifestSchemaReviewStableKey(
      "extension-manifest-schema-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildExtensionManifestSchemaReviews(): ExtensionManifestSchemaReview[] {
  return [
    buildExtensionManifestSchemaReview({
      idHint: "reviewed-static-manifest-shape",
      status: "accepted for review",
      schemaReviewIdentity:
        "Schema review identity: extension-manifest-schema-review-static-shape.",
      sourceExtensionArchitectureDecision:
        "Source extension architecture decision: /extension-architecture-decision keeps runtime execution behind approved boundaries before any manifest becomes adoptable.",
      manifestIdentityFields: [
        "extension id",
        "display name",
        "publisher label",
        "homepage or documentation reference",
        "license reference",
        "schema version",
      ],
      capabilityDeclarations: [
        "declared feature area",
        "review-only capability labels",
        "human-readable operator purpose",
        "required approval route",
      ],
      permissionDeclarations: [
        "requested permission name",
        "requested scope",
        "denied scope",
        "review reason",
        "expiry or re-review note",
      ],
      dataAccessDeclarations: [
        "declared data category",
        "local-only requirement",
        "provider-send blocked by default",
        "memory and RAG ingestion blocked by default",
      ],
      versionCompatibilityPolicy:
        "Version/compatibility policy: manifests must name a schema version, CodexForge compatibility range, migration note, and blocked fallback for unknown fields.",
      deniedManifestFields: [
        "runtime entry points",
        "automatic activation flags",
        "post-adoption command hooks",
        "provider credential fields",
        "local path crawling rules",
        "memory auto-promotion rules",
      ],
      permissionPolicyRoute:
        "Permission policy route: /extension-permission-policy-builder maps requested declarations to allowed and denied review scopes.",
      blockedReasons: [
        "Schema review does not install or run extensions",
        "Third-party code is not vendored or copied",
        "Future extension adoption requires license/security review",
      ],
      advancedManifestDetails:
        "Advanced manifest details: schema review is static and cannot install extensions, enable plugins, create an executor, create an MCP runtime, call providers, browse files, mutate registries, ingest memory, or copy third-party code.",
    }),
    buildExtensionManifestSchemaReview({
      idHint: "blocked-runtime-bearing-manifest",
      status: "blocked",
      schemaReviewIdentity:
        "Schema review identity: extension-manifest-schema-review-blocked-runtime-fields.",
      sourceExtensionArchitectureDecision:
        "Source extension architecture decision: blocked when a manifest asks for runtime execution before approved boundaries exist.",
      manifestIdentityFields: [
        "blocked until extension id, publisher label, license reference, and schema version are present",
      ],
      capabilityDeclarations: [
        "blocked when capability declarations are broad, automatic, or not reviewable",
      ],
      permissionDeclarations: [
        "blocked when requested scope omits denied scope, approval route, or expiry",
      ],
      dataAccessDeclarations: [
        "blocked when file, provider, MCP, memory, RAG, agent, or Jarvisd access is vague or automatic",
      ],
      versionCompatibilityPolicy:
        "Version/compatibility policy: blocked when compatibility is missing, unknown, or implies silent migration.",
      deniedManifestFields: [
        "extension executor instructions",
        "automatic install instructions",
        "tool call instructions",
        "agent launch instructions",
        "secrets",
      ],
      permissionPolicyRoute:
        "Permission policy route: /extension-permission-policy-builder must remain the next review step, not a permission grant.",
      blockedReasons: [
        "Runtime field requested without approved executor",
        "Permission scope is not explicit",
        "License/security review is missing",
      ],
      advancedManifestDetails:
        "Advanced manifest details: blocked manifests remain secondary and cannot imply extension install behavior, extension runtime executor creation, MCP tool calls, provider traffic, local file access, memory ingestion, agent execution, or registry mutation.",
    }),
  ];
}

export function buildExtensionManifestSchemaReviewBoundary(): ExtensionManifestSchemaReviewBoundary {
  return {
    schemaReviewInstallsExtensions: false,
    schemaReviewRunsExtensions: false,
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

export function summarizeExtensionManifestSchemaReview(
  model: Pick<ExtensionManifestSchemaReviewModel, "reviews">
): string {
  return `Extension manifest schema review defines ${model.reviews.length} static manifest review shape(s). Schema review does not install or run extensions, third-party code is not vendored or copied, and future extension adoption requires license security review.`;
}

export function buildExtensionManifestSchemaReviewModel(): ExtensionManifestSchemaReviewModel {
  const reviews = buildExtensionManifestSchemaReviews();
  const model: ExtensionManifestSchemaReviewModel = {
    title: "Extension manifest schema review",
    summary: "",
    reviews,
    boundary: buildExtensionManifestSchemaReviewBoundary(),
    schemaLanguage: [...EXTENSION_MANIFEST_SCHEMA_REVIEW_LANGUAGE],
    advancedDetails: [
      "Extension manifest schema review",
      "Schema review does not install or run extensions",
      "Third-party code is not vendored or copied",
      "Future extension adoption requires license security review",
      "Future extension adoption requires license/security review",
      "Schema review identity",
      "Source extension architecture decision",
      "Manifest identity fields",
      "Capability declarations",
      "Permission declarations",
      "Data access declarations",
      "Version/compatibility policy",
      "Denied manifest fields",
      "Permission policy route",
      "Blocked reasons",
      "Advanced manifest details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeExtensionManifestSchemaReview(model) };
}
