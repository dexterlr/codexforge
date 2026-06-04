import type {
  JarvisdWorkspaceIndexSync,
  JarvisdWorkspaceIndexSyncBoundary,
  JarvisdWorkspaceIndexSyncModel,
} from "./jarvisd-workspace-index-sync-types";
import { buildJarvisdWorkspaceIndexSyncStableKey } from "./jarvisd-workspace-index-sync-types";

export const JARVISD_WORKSPACE_INDEX_SYNC_LANGUAGE = [
  "Jarvisd workspace index sync",
  "Index sync remains behind approved local boundary",
  "Arbitrary local file crawling is not allowed",
  "Secrets are not read or displayed",
  "Secret values are never displayed",
  "Allowed roots summary",
  "Recovery route",
  "Approved local boundary required",
] as const;

export function buildJarvisdWorkspaceIndexSync(
  input: Omit<JarvisdWorkspaceIndexSync, "id"> & { idHint: string }
): JarvisdWorkspaceIndexSync {
  const { idHint, ...sync } = input;
  return {
    id: buildJarvisdWorkspaceIndexSyncStableKey(
      "jarvisd-workspace-index-sync",
      idHint,
      input.syncStatus
    ),
    ...sync,
  };
}

export function buildJarvisdWorkspaceIndexSyncs(): JarvisdWorkspaceIndexSync[] {
  return [
    buildJarvisdWorkspaceIndexSync({
      idHint: "trusted-workspace-metadata-sync",
      indexSyncIdentity:
        "Index sync identity: jarvisd-workspace-index-sync-trusted-metadata, a future approved metadata sync handoff for trusted workspace roots.",
      trustedWorkspaceDependency:
        "Trusted workspace dependency: /workspace-trust-policy must confirm a reviewed workspace root before index sync can be considered.",
      allowedRootsSummary:
        "Allowed roots summary: reviewed project-relative workspace roots only, scoped to metadata categories needed for project intelligence.",
      deniedRootsSummary:
        "Denied roots summary: parent folders, home folders, credential stores, system folders, environment files, unrelated repositories, and arbitrary paths stay blocked.",
      excludedPathsSummary:
        "Excluded paths summary: dependency folders, build output, caches, generated artifacts, private credential paths, large binary outputs, and denied roots are excluded.",
      fileTypePolicy:
        "File type policy: source, route, component, config-name, docs, and smoke-script metadata can be summarized; secrets are not read or displayed.",
      syncStatus: "metadata-sync-ready",
      privacySecretsPolicy:
        "Privacy/secrets policy: index sync remains behind approved local boundary, secrets are not read or displayed, and sensitive indicators stay redacted.",
      auditHandoff:
        "Audit handoff: route sync identity, trusted workspace dependency, allowed roots summary, excluded paths summary, status, and blocked reasons to /jarvisd-audit-ingestion without appendEvent from UI.",
      recoveryRoute:
        "Recovery route: /jarvisd-recovery-console handles blocked, stale, or revoked sync posture for operator review.",
      blockedReasons: [
        "Index sync remains behind approved local boundary",
        "Arbitrary local file crawling is not allowed",
        "Secrets are not read or displayed",
      ],
      advancedSyncDetails:
        "Advanced sync details: this page does not browse files, crawl arbitrary paths, mutate files, call Jarvisd directly, execute commands, call providers, or display secret values.",
    }),
    buildJarvisdWorkspaceIndexSync({
      idHint: "revoked-trust-blocked",
      indexSyncIdentity:
        "Index sync identity: jarvisd-workspace-index-sync-revoked-trust.",
      trustedWorkspaceDependency:
        "Trusted workspace dependency: blocked because workspace trust is missing, expired, or revoked.",
      allowedRootsSummary:
        "Allowed roots summary: no roots are allowed while workspace trust is blocked.",
      deniedRootsSummary:
        "Denied roots summary: all local paths remain denied until trust and scope are reviewed.",
      excludedPathsSummary:
        "Excluded paths summary: everything remains excluded while approved local boundary review is missing.",
      fileTypePolicy:
        "File type policy: unavailable until trusted workspace metadata sync is reviewed.",
      syncStatus: "blocked",
      privacySecretsPolicy:
        "Privacy/secrets policy: no file contents or secret values are read, displayed, exported, or sent to a provider.",
      auditHandoff:
        "Audit handoff: preserve revoked-trust blocked reason as review copy only; audit logs are not mutated from UI.",
      recoveryRoute:
        "Recovery route: /jarvisd-recovery-console for trust recovery and operator-visible blocked reasons.",
      blockedReasons: [
        "Workspace trust missing or revoked",
        "Approved local boundary required",
        "Arbitrary path crawling is blocked",
      ],
      advancedSyncDetails:
        "Advanced sync details: blocked sync cannot crawl paths, open files, mutate files, execute commands, or call Jarvisd.",
    }),
  ];
}

export function buildJarvisdWorkspaceIndexSyncBoundary(): JarvisdWorkspaceIndexSyncBoundary {
  return {
    approvedLocalBoundaryRequired: true,
    trustedWorkspaceRequired: true,
    arbitraryLocalFileCrawlingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    secretsReadAllowed: false,
    secretValuesDisplayedAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    liveHandshakeAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeJarvisdWorkspaceIndexSync(
  model: Pick<JarvisdWorkspaceIndexSyncModel, "syncs">
): string {
  return `Jarvisd workspace index sync prepares ${model.syncs.length} metadata sync readiness shape(s). Index sync remains behind approved local boundary, arbitrary local file crawling is not allowed, and secrets are not read or displayed.`;
}

export function buildJarvisdWorkspaceIndexSyncModel(): JarvisdWorkspaceIndexSyncModel {
  const syncs = buildJarvisdWorkspaceIndexSyncs();
  const model: JarvisdWorkspaceIndexSyncModel = {
    title: "Jarvisd workspace index sync",
    summary: "",
    syncs,
    boundary: buildJarvisdWorkspaceIndexSyncBoundary(),
    syncLanguage: [...JARVISD_WORKSPACE_INDEX_SYNC_LANGUAGE],
    advancedDetails: [
      "Jarvisd workspace index sync",
      "Index sync remains behind approved local boundary",
      "Arbitrary local file crawling is not allowed",
      "Secrets are not read or displayed",
      "Secret values are never displayed",
      "Index sync identity",
      "Trusted workspace dependency",
      "Allowed roots summary",
      "Denied roots summary",
      "Excluded paths summary",
      "File type policy",
      "Sync status",
      "Privacy/secrets policy",
      "Audit handoff",
      "Recovery route",
      "Blocked reasons",
      "Approved local boundary required",
    ],
  };
  return { ...model, summary: summarizeJarvisdWorkspaceIndexSync(model) };
}
