import type {
  ProjectFileSearchPreview,
  ProjectFileSearchPreviewBoundary,
  ProjectFileSearchPreviewModel,
} from "./project-file-search-preview-types";
import { buildProjectFileSearchPreviewStableKey } from "./project-file-search-preview-types";

export const PROJECT_FILE_SEARCH_PREVIEW_LANGUAGE = [
  "Project file search preview",
  "Search only uses approved indexed workspace data",
  "Arbitrary local browsing is not allowed",
  "Sensitive matches stay redacted until review",
  "File operation approval route",
  "Result preview summary",
] as const;

export function buildProjectFileSearchPreview(
  input: Omit<ProjectFileSearchPreview, "id"> & { idHint: string }
): ProjectFileSearchPreview {
  const { idHint, ...preview } = input;
  return {
    id: buildProjectFileSearchPreviewStableKey(
      "project-file-search-preview",
      idHint,
      input.status
    ),
    ...preview,
  };
}

export function buildProjectFileSearchPreviews(): ProjectFileSearchPreview[] {
  return [
    buildProjectFileSearchPreview({
      idHint: "indexed-workspace-preview",
      status: "review-required",
      searchScopeSummary:
        "Search scope summary: approved indexed workspace data only, scoped to the trusted project metadata prepared by the safe local project indexer.",
      trustedWorkspaceDependency:
        "Trusted workspace dependency: workspace trust and allowed roots must be reviewed before search previews can be considered.",
      querySummary:
        "Query summary: sample searches can target path, extension, role, and safety category metadata without browsing the machine.",
      resultPreviewSummary:
        "Result preview summary: matching project entries are previewed as metadata cards; files are not auto-opened and arbitrary local browsing is not allowed.",
      excludedPaths:
        "Excluded paths: denied roots, dependency folders, build output, cache folders, generated artifacts, environment files, and suspected secret locations stay outside search results.",
      sensitiveMatchHandling:
        "Sensitive match handling: sensitive matches stay redacted until review and suspected secrets are never displayed as values.",
      fileOperationApprovalRoute:
        "File operation approval route: /local-file-approval is the review path before any future read, write, delete, or open request.",
      indexerRoute:
        "Indexer route: /safe-project-indexer explains the approved indexed workspace data dependency.",
      auditNote:
        "Audit note: record query summary, scope, result preview summary, redaction state, excluded paths, approval route, and blocked reasons.",
      blockedReasons: [
        "Search only uses approved indexed workspace data",
        "Arbitrary local browsing is not allowed",
        "Sensitive matches stay redacted until review",
      ],
      advancedSearchDetails:
        "Advanced results/details: secondary metadata only. This page does not browse files, auto-open files, mutate files, delete files, execute commands, call providers, or install packages.",
    }),
    buildProjectFileSearchPreview({
      idHint: "missing-index-blocked",
      status: "blocked",
      searchScopeSummary:
        "Search scope summary: blocked because approved indexed workspace data is not available.",
      trustedWorkspaceDependency:
        "Trusted workspace dependency: blocked until workspace trust and index scope are reviewed.",
      querySummary:
        "Query summary: no query can browse the local machine from this preview page.",
      resultPreviewSummary:
        "Result preview summary: no results are shown when the approved index is missing.",
      excludedPaths:
        "Excluded paths: all local paths remain excluded while the approved index is unavailable.",
      sensitiveMatchHandling:
        "Sensitive match handling: nothing is exposed; suspected secret text remains redacted.",
      fileOperationApprovalRoute:
        "File operation approval route: /local-file-approval remains required for any future file action.",
      indexerRoute:
        "Indexer route: /safe-project-indexer must be reviewed before search readiness.",
      auditNote:
        "Audit note: record blocked search preview state without file content, command output, provider calls, or secrets.",
      blockedReasons: [
        "No approved indexed workspace data",
        "Workspace trust missing",
        "Approved local boundary required",
      ],
      advancedSearchDetails:
        "Advanced results/details: blocked state remains metadata-only and cannot open files.",
    }),
  ];
}

export function buildProjectFileSearchPreviewBoundary(): ProjectFileSearchPreviewBoundary {
  return {
    approvedIndexedWorkspaceDataRequired: true,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenFilesAllowed: false,
    localActionsWithoutReviewAllowed: false,
    sensitiveMatchesRedactedUntilReview: true,
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

export function summarizeProjectFileSearchPreview(
  model: Pick<ProjectFileSearchPreviewModel, "previews">
): string {
  return `Project file search preview prepares ${model.previews.length} safe search readiness shape(s). Search only uses approved indexed workspace data, arbitrary local browsing is not allowed, and sensitive matches stay redacted until review.`;
}

export function buildProjectFileSearchPreviewModel(): ProjectFileSearchPreviewModel {
  const previews = buildProjectFileSearchPreviews();
  const model: ProjectFileSearchPreviewModel = {
    title: "Project file search preview",
    summary: "",
    previews,
    boundary: buildProjectFileSearchPreviewBoundary(),
    searchLanguage: [...PROJECT_FILE_SEARCH_PREVIEW_LANGUAGE],
    advancedDetails: [
      "Project file search preview",
      "Search only uses approved indexed workspace data",
      "Arbitrary local browsing is not allowed",
      "Sensitive matches stay redacted until review",
      "Search scope summary",
      "Trusted workspace dependency",
      "Query summary",
      "Result preview summary",
      "Excluded paths",
      "Sensitive match handling",
      "File operation approval route",
      "Indexer route",
      "Audit note",
      "Blocked reasons",
      "Approved local boundary required",
      "No auto-open files",
    ],
  };
  return { ...model, summary: summarizeProjectFileSearchPreview(model) };
}
