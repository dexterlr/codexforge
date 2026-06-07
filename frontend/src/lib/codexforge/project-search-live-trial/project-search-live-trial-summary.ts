import type {
  ProjectSearchLiveTrial,
  ProjectSearchLiveTrialBoundary,
  ProjectSearchLiveTrialModel,
} from "./project-search-live-trial-types";
import { buildProjectSearchLiveTrialStableKey } from "./project-search-live-trial-types";

export const PROJECT_SEARCH_LIVE_TRIAL_LANGUAGE = [
  "Project search live trial",
  "Search only uses approved bounded indexed workspace data",
  "Arbitrary local browsing is not allowed",
  "Sensitive matches stay redacted until review",
  "Result preview summary",
  "File preview bridge route",
] as const;

export function buildProjectSearchLiveTrial(
  input: Omit<ProjectSearchLiveTrial, "id"> & { idHint: string }
): ProjectSearchLiveTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildProjectSearchLiveTrialStableKey(
      "project-search-live-trial",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildProjectSearchLiveTrials(): ProjectSearchLiveTrial[] {
  return [
    buildProjectSearchLiveTrial({
      idHint: "bounded-indexed-search",
      status: "redacted-preview",
      searchTrialIdentity:
        "Search trial identity: project-search-live-trial-bounded-index, a reviewed readiness shape for bounded workspace search.",
      sourceIndexTrial:
        "Source index trial: /project-indexer-live-trial must show approved bounded workspace data before search readiness is reviewed.",
      querySummary:
        "Query summary: reviewed path, extension, route, component, smoke marker, and safety-category metadata query only.",
      approvedSearchScope:
        "Approved search scope: search only uses approved bounded indexed workspace data from the trusted canonical frontend workspace.",
      excludedPathsSummary:
        "Excluded paths summary: denied roots, dependency folders, build output, cache folders, generated artifacts, environment files, suspected secret stores, and unrelated repositories stay out of search scope.",
      resultPreviewSummary:
        "Result preview summary: results are summarized as metadata previews; the page does not browse arbitrary files and does not auto-open files.",
      sensitiveMatchHandling:
        "Sensitive match handling: sensitive matches stay redacted until review, suspected secrets are represented as indicators, and secret values are never displayed.",
      redactionStatus:
        "Redaction status: redacted preview only; raw sensitive snippets are not exposed in this UI.",
      filePreviewBridgeRoute:
        "File preview bridge route: /jarvisd-file-preview-bridge remains the reviewed route before any future bounded file preview.",
      auditHandoff:
        "Audit handoff: record search trial identity, source index trial, query summary, approved scope, excluded paths, result preview summary, redaction status, bridge route, and blocked reasons without calling appendEvent from UI.",
      serverSearchRoute:
        "Server search route: /api/codexforge/project/search is already server-only, path-bounded, read-only, capped, and command-free; this UI models the dependency and does not call it directly.",
      blockedReasons: [
        "Search only uses approved bounded indexed workspace data",
        "Arbitrary local browsing is not allowed",
        "Sensitive matches stay redacted until review",
      ],
      advancedSearchDetails:
        "Advanced results/details: secondary redacted metadata only. This page does not browse arbitrary files, auto-open files, mutate files, write files, delete files, execute commands, run tests, run git commands, call Jarvisd directly, call providers, call GitHub APIs, apply patches, or install packages.",
    }),
    buildProjectSearchLiveTrial({
      idHint: "missing-index-blocked",
      status: "blocked",
      searchTrialIdentity:
        "Search trial identity: project-search-live-trial-missing-index.",
      sourceIndexTrial:
        "Source index trial: blocked because /project-indexer-live-trial has not confirmed approved bounded indexed workspace data.",
      querySummary:
        "Query summary: blocked; no fallback local machine search is started from this UI.",
      approvedSearchScope:
        "Approved search scope: unavailable until the approved bounded index is reviewed.",
      excludedPathsSummary:
        "Excluded paths summary: all local paths remain excluded while the source index trial is blocked.",
      resultPreviewSummary:
        "Result preview summary: unavailable; arbitrary local browsing is not allowed.",
      sensitiveMatchHandling:
        "Sensitive match handling: blocked and redacted by default; sensitive matches stay redacted until review.",
      redactionStatus:
        "Redaction status: blocked and redacted by default.",
      filePreviewBridgeRoute:
        "File preview bridge route: /jarvisd-file-preview-bridge remains unavailable until approved scope exists.",
      auditHandoff:
        "Audit handoff: preserve missing-index blocked reason as review copy only; the UI does not mutate audit logs.",
      serverSearchRoute:
        "Server search route: /api/codexforge/project/search stays server-only and path-bounded; blocked UI state does not request it.",
      blockedReasons: [
        "No source index trial",
        "No approved bounded indexed workspace data",
        "Arbitrary local browsing is not allowed",
      ],
      advancedSearchDetails:
        "Advanced results/details: blocked search cannot browse paths, open files, mutate files, execute commands, or send findings to providers.",
    }),
  ];
}

export function buildProjectSearchLiveTrialBoundary(): ProjectSearchLiveTrialBoundary {
  return {
    approvedBoundedIndexedWorkspaceDataRequired: true,
    sourceIndexTrialRequired: true,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    sensitiveMatchesRedactedUntilReview: true,
    secretValuesDisplayedAllowed: false,
    directJarvisdCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeProjectSearchLiveTrial(
  model: Pick<ProjectSearchLiveTrialModel, "trials">
): string {
  return `Project search live trial prepares ${model.trials.length} bounded search readiness shape(s). Search only uses approved bounded indexed workspace data, arbitrary local browsing is not allowed, and sensitive matches stay redacted until review.`;
}

export function buildProjectSearchLiveTrialModel(): ProjectSearchLiveTrialModel {
  const trials = buildProjectSearchLiveTrials();
  const model: ProjectSearchLiveTrialModel = {
    title: "Project search live trial",
    summary: "",
    trials,
    boundary: buildProjectSearchLiveTrialBoundary(),
    trialLanguage: [...PROJECT_SEARCH_LIVE_TRIAL_LANGUAGE],
    advancedDetails: [
      "Project search live trial",
      "Search only uses approved bounded indexed workspace data",
      "Arbitrary local browsing is not allowed",
      "Sensitive matches stay redacted until review",
      "Search trial identity",
      "Source index trial",
      "Query summary",
      "Approved search scope",
      "Excluded paths summary",
      "Result preview summary",
      "Sensitive match handling",
      "Redaction status",
      "File preview bridge route",
      "Audit handoff",
      "Server search route",
      "Blocked reasons",
      "Approved bounded indexed workspace data required",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectSearchLiveTrial(model) };
}
