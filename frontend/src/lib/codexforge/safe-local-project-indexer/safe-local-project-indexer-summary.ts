import type {
  SafeLocalProjectIndex,
  SafeLocalProjectIndexerBoundary,
  SafeLocalProjectIndexerModel,
} from "./safe-local-project-indexer-types";
import { buildSafeLocalProjectIndexerStableKey } from "./safe-local-project-indexer-types";

export const SAFE_LOCAL_PROJECT_INDEXER_LANGUAGE = [
  "Safe local project indexer",
  "Indexing remains behind approved local boundary",
  "Arbitrary local file crawling is not allowed",
  "Secrets are not read or displayed",
  "Allowed roots summary",
  "Excluded paths summary",
] as const;

export function buildSafeLocalProjectIndex(
  input: Omit<SafeLocalProjectIndex, "id"> & { idHint: string }
): SafeLocalProjectIndex {
  const { idHint, ...index } = input;
  return {
    id: buildSafeLocalProjectIndexerStableKey(
      "safe-local-project-indexer",
      idHint,
      input.trustedWorkspaceStatus
    ),
    ...index,
  };
}

export function buildSafeLocalProjectIndexes(): SafeLocalProjectIndex[] {
  return [
    buildSafeLocalProjectIndex({
      idHint: "canonical-frontend-metadata",
      projectIdentity:
        "Project identity: canonical CodexForge frontend workspace, identified by reviewed workspace metadata rather than arbitrary local browsing.",
      trustedWorkspaceStatus: "review-required",
      allowedRootsSummary:
        "Allowed roots summary: only a reviewed workspace root can be indexed, and the index request must pass workspace trust, Jarvisd permission, and file operation approval checks.",
      deniedRootsSummary:
        "Denied roots summary: parent folders, home folders, secret stores, provider credential locations, system folders, unrelated repositories, and arbitrary paths stay blocked.",
      indexScope:
        "Index scope: metadata-first project map with paths, extensions, known project roles, and safety notes from approved indexed workspace metadata.",
      fileTypeSummary:
        "File type summary: source, route, component, config, docs, and smoke-script categories are summarized without reading secret values.",
      excludedPathsSummary:
        "Excluded paths summary: dependency folders, build output, cache folders, private credentials, generated artifacts, environment files, and denied roots stay out of scope.",
      privacySecretsPolicy:
        "Privacy/secrets policy: secrets are not read or displayed; suspected secret locations are represented only as redacted safety indicators.",
      auditNote:
        "Audit note: record project identity, trust status, allowed roots summary, denied roots summary, index scope, excluded paths summary, blocked reasons, and approval state.",
      blockedReasons: [
        "Indexing remains behind approved local boundary",
        "Arbitrary local file crawling is not allowed",
        "Secrets are not read or displayed",
      ],
      advancedIndexDetails:
        "Advanced index details: this page is readiness-only. It does not browse files, read arbitrary paths, mutate files, delete files, execute commands, call Jarvisd directly from arbitrary UI, call providers, or install packages.",
    }),
    buildSafeLocalProjectIndex({
      idHint: "untrusted-workspace-blocked",
      projectIdentity:
        "Project identity: unknown or untrusted workspace.",
      trustedWorkspaceStatus: "blocked",
      allowedRootsSummary:
        "Allowed roots summary: no roots are available until workspace trust is reviewed.",
      deniedRootsSummary:
        "Denied roots summary: all local paths remain denied while workspace identity is unknown.",
      indexScope:
        "Index scope: blocked because approved indexed workspace metadata does not exist yet.",
      fileTypeSummary:
        "File type summary: unavailable until the approved local boundary confirms a trusted workspace.",
      excludedPathsSummary:
        "Excluded paths summary: everything remains excluded until the operator reviews trust and scope.",
      privacySecretsPolicy:
        "Privacy/secrets policy: no file content or secret value is read, displayed, exported, included, or sent to a provider.",
      auditNote:
        "Audit note: record the blocked state without local file contents, command output, provider calls, or secrets.",
      blockedReasons: [
        "Workspace trust missing",
        "No allowed roots summary",
        "Approved local boundary required",
      ],
      advancedIndexDetails:
        "Advanced index details: blocked workspaces cannot start indexing, search, dependency mapping, or risk scanning.",
    }),
  ];
}

export function buildSafeLocalProjectIndexerBoundary(): SafeLocalProjectIndexerBoundary {
  return {
    indexingBehindApprovedLocalBoundary: true,
    arbitraryLocalFileCrawlingAllowed: false,
    secretsReadAllowed: false,
    secretsDisplayedAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    localActionsWithoutReviewAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeSafeLocalProjectIndexer(
  model: Pick<SafeLocalProjectIndexerModel, "indexes">
): string {
  return `Safe local project indexer prepares ${model.indexes.length} project index readiness shape(s). Indexing remains behind approved local boundary, arbitrary local file crawling is not allowed, and secrets are not read or displayed.`;
}

export function buildSafeLocalProjectIndexerModel(): SafeLocalProjectIndexerModel {
  const indexes = buildSafeLocalProjectIndexes();
  const model: SafeLocalProjectIndexerModel = {
    title: "Safe local project indexer",
    summary: "",
    indexes,
    boundary: buildSafeLocalProjectIndexerBoundary(),
    indexerLanguage: [...SAFE_LOCAL_PROJECT_INDEXER_LANGUAGE],
    advancedDetails: [
      "Safe local project indexer",
      "Indexing remains behind approved local boundary",
      "Arbitrary local file crawling is not allowed",
      "Secrets are not read or displayed",
      "Project identity",
      "Trusted workspace status",
      "Allowed roots summary",
      "Denied roots summary",
      "Index scope",
      "File type summary",
      "Excluded paths summary",
      "Privacy/secrets policy",
      "Audit note",
      "Blocked reasons",
      "Approved local boundary required",
      "Nothing reads arbitrary files automatically",
    ],
  };
  return { ...model, summary: summarizeSafeLocalProjectIndexer(model) };
}
