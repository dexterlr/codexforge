import type {
  JarvisdSafeFileSearchBridge,
  JarvisdSafeFileSearchBridgeBoundary,
  JarvisdSafeFileSearchBridgeModel,
} from "./jarvisd-safe-file-search-bridge-types";
import { buildJarvisdSafeFileSearchBridgeStableKey } from "./jarvisd-safe-file-search-bridge-types";

export const JARVISD_SAFE_FILE_SEARCH_BRIDGE_LANGUAGE = [
  "Jarvisd safe file search bridge",
  "Search only uses approved indexed workspace data",
  "Arbitrary local browsing is not allowed",
  "Sensitive matches stay redacted until review",
  "Secret values are never displayed",
  "Excluded paths summary",
  "Result capture route",
  "File bridges are reviewed before use",
  "Approved local boundary required",
] as const;

export function buildJarvisdSafeFileSearchBridge(
  input: Omit<JarvisdSafeFileSearchBridge, "id"> & { idHint: string }
): JarvisdSafeFileSearchBridge {
  const { idHint, ...search } = input;
  return {
    id: buildJarvisdSafeFileSearchBridgeStableKey(
      "jarvisd-safe-file-search-bridge",
      idHint,
      input.searchResultStatus
    ),
    ...search,
  };
}

export function buildJarvisdSafeFileSearchBridges(): JarvisdSafeFileSearchBridge[] {
  return [
    buildJarvisdSafeFileSearchBridge({
      idHint: "approved-index-redacted-results",
      searchBridgeIdentity:
        "Search bridge identity: jarvisd-safe-file-search-bridge-approved-index, a future reviewed handoff for scoped indexed search.",
      workspaceTrustDependency:
        "Workspace trust dependency: /workspace-trust-policy must confirm the trusted workspace before any search bridge can be reviewed.",
      indexSyncDependency:
        "Index sync dependency: /jarvisd-index-sync must provide approved indexed workspace data before search can be considered.",
      querySummary:
        "Query summary: reviewed path, extension, role, and symbol metadata query only; no arbitrary local browsing or live search runs from this UI.",
      allowedSearchScope:
        "Allowed search scope: approved indexed workspace data for the trusted project root, with sensitive matches redacted until review.",
      excludedPathsSummary:
        "Excluded paths summary: denied roots, dependency folders, build output, cache folders, environment files, credential paths, generated artifacts, and unrelated repositories stay excluded.",
      sensitiveMatchHandling:
        "Sensitive match handling: sensitive matches stay redacted until review and secret values are never displayed.",
      redactionStatus:
        "Redaction status: redacted result summaries only; raw secret values, prompts, tokens, and credential material stay hidden.",
      resultCaptureRoute:
        "Result capture route: /review-inbox receives redacted search-result summaries for operator review, not raw file contents.",
      auditHandoff:
        "Audit handoff: send query summary, approved scope, redaction status, result capture route, and blocked reasons to /jarvisd-audit-ingestion without mutating logs from UI.",
      blockedReasons: [
        "Search only uses approved indexed workspace data",
        "Arbitrary local browsing is not allowed",
        "Sensitive matches stay redacted until review",
      ],
      searchResultStatus: "redacted-results",
      advancedSearchDetails:
        "Advanced results/details: this bridge does not browse files, auto-open files, call live search from arbitrary UI, mutate files, call Jarvisd directly, execute commands, or send findings to providers.",
    }),
    buildJarvisdSafeFileSearchBridge({
      idHint: "missing-index-blocked",
      searchBridgeIdentity:
        "Search bridge identity: jarvisd-safe-file-search-bridge-missing-index.",
      workspaceTrustDependency:
        "Workspace trust dependency: blocked until the workspace trust review is current.",
      indexSyncDependency:
        "Index sync dependency: blocked because approved indexed workspace data is missing.",
      querySummary:
        "Query summary: no query can browse or search the local machine from this page.",
      allowedSearchScope:
        "Allowed search scope: unavailable until approved indexed workspace data exists.",
      excludedPathsSummary:
        "Excluded paths summary: all local paths remain excluded while the approved index is unavailable.",
      sensitiveMatchHandling:
        "Sensitive match handling: unavailable and redacted by default; no secret values are displayed.",
      redactionStatus:
        "Redaction status: blocked and redacted by default.",
      resultCaptureRoute:
        "Result capture route: /review-inbox remains the reviewed capture path once safe results exist.",
      auditHandoff:
        "Audit handoff: preserve missing-index blocked reason as review copy only; no appendEvent call from UI.",
      blockedReasons: [
        "No approved indexed workspace data",
        "Approved local boundary required",
        "Live search from arbitrary UI is blocked",
      ],
      searchResultStatus: "blocked",
      advancedSearchDetails:
        "Advanced results/details: blocked search cannot browse paths, open files, mutate files, execute commands, or call provider APIs.",
    }),
  ];
}

export function buildJarvisdSafeFileSearchBridgeBoundary(): JarvisdSafeFileSearchBridgeBoundary {
  return {
    approvedIndexedWorkspaceDataRequired: true,
    approvedLocalBoundaryRequired: true,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    liveSearchAllowedFromUi: false,
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
    sensitiveMatchesRedactedUntilReview: true,
    secretValuesDisplayedAllowed: false,
    secretsExportedAllowed: false,
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

export function summarizeJarvisdSafeFileSearchBridge(
  model: Pick<JarvisdSafeFileSearchBridgeModel, "searches">
): string {
  return `Jarvisd safe file search bridge prepares ${model.searches.length} redacted search handoff shape(s). Search only uses approved indexed workspace data, arbitrary local browsing is not allowed, and sensitive matches stay redacted until review.`;
}

export function buildJarvisdSafeFileSearchBridgeModel(): JarvisdSafeFileSearchBridgeModel {
  const searches = buildJarvisdSafeFileSearchBridges();
  const model: JarvisdSafeFileSearchBridgeModel = {
    title: "Jarvisd safe file search bridge",
    summary: "",
    searches,
    boundary: buildJarvisdSafeFileSearchBridgeBoundary(),
    searchLanguage: [...JARVISD_SAFE_FILE_SEARCH_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Jarvisd safe file search bridge",
      "Search only uses approved indexed workspace data",
      "Arbitrary local browsing is not allowed",
      "Sensitive matches stay redacted until review",
      "Secret values are never displayed",
      "Search bridge identity",
      "Workspace trust dependency",
      "Index sync dependency",
      "Query summary",
      "Allowed search scope",
      "Excluded paths summary",
      "Sensitive match handling",
      "Redaction status",
      "Result capture route",
      "Audit handoff",
      "Blocked reasons",
      "File bridges are reviewed before use",
      "Approved local boundary required",
    ],
  };
  return { ...model, summary: summarizeJarvisdSafeFileSearchBridge(model) };
}
