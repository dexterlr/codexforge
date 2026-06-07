import type {
  ProjectDependencyMapLiveTrial,
  ProjectDependencyMapLiveTrialBoundary,
  ProjectDependencyMapLiveTrialModel,
} from "./project-dependency-map-live-trial-types";
import { buildProjectDependencyMapLiveTrialStableKey } from "./project-dependency-map-live-trial-types";

export const PROJECT_DEPENDENCY_MAP_LIVE_TRIAL_LANGUAGE = [
  "Project dependency map live trial",
  "Dependency map does not install packages",
  "No commands are run from this page",
  "Approved indexed metadata",
  "External package summary",
  "Risk scan route",
] as const;

export function buildProjectDependencyMapLiveTrial(
  input: Omit<ProjectDependencyMapLiveTrial, "id"> & { idHint: string }
): ProjectDependencyMapLiveTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildProjectDependencyMapLiveTrialStableKey(
      "project-dependency-map-live-trial",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildProjectDependencyMapLiveTrials(): ProjectDependencyMapLiveTrial[] {
  return [
    buildProjectDependencyMapLiveTrial({
      idHint: "approved-indexed-metadata",
      status: "metadata-ready",
      dependencyTrialIdentity:
        "Dependency trial identity: project-dependency-map-live-trial-approved-metadata, a reviewed readiness shape for dependency and module relationships.",
      sourceIndexTrial:
        "Source index trial: /project-indexer-live-trial provides the approved indexed metadata dependency before relationships are reviewed.",
      dependencySourceSummary:
        "Dependency source summary: approved indexed metadata from trusted manifests, import/export metadata, app routes, CodexForge domain libraries, shared UI helpers, and smoke-script relationships.",
      internalModuleRelationshipSummary:
        "Internal module relationship summary: route clients import panels, panels import deterministic model builders, and model builders keep metadata separate from UI actions.",
      externalPackageSummary:
        "External package summary: external packages are summarized as review metadata only. Dependency map does not install packages.",
      staleUnknownMarkers:
        "Stale/unknown markers: missing, stale, or untrusted dependency metadata appears as unknown until the bounded project index is refreshed behind approval.",
      riskNote:
        "Risk note: command-heavy areas, provider-facing configuration, dependency drift, and suspected secret indicators route to review before any local action.",
      commandDryRunRoute:
        "Command dry-run route: /command-dry-run is the review path before any future command-based validation; no commands are run from this page.",
      riskScanRoute:
        "Risk scan route: /project-risk-scan-live-trial reviews redacted risk and suspected secret indicators.",
      auditHandoff:
        "Audit handoff: record dependency trial identity, source index trial, dependency source summary, internal relationships, external package summary, stale/unknown markers, risk note, routes, and blocked reasons without calling appendEvent from UI.",
      approvedMetadataRoute:
        "Approved metadata route: /api/codexforge/project/snapshot can provide server-only bounded metadata; this UI models the dependency and does not call it directly.",
      blockedReasons: [
        "Dependency map does not install packages",
        "No commands are run from this page",
        "Dependency details come from approved indexed metadata",
      ],
      advancedDependencyDetails:
        "Advanced dependency details: secondary metadata only. This page does not run package manager commands, execute shell commands, mutate files, write files, delete files, browse arbitrary files, run tests, run git commands, call Jarvisd directly, call providers, call GitHub APIs, apply patches, or install packages.",
    }),
    buildProjectDependencyMapLiveTrial({
      idHint: "unknown-metadata",
      status: "unknown",
      dependencyTrialIdentity:
        "Dependency trial identity: project-dependency-map-live-trial-unknown-metadata.",
      sourceIndexTrial:
        "Source index trial: unknown until /project-indexer-live-trial confirms approved indexed metadata.",
      dependencySourceSummary:
        "Dependency source summary: unavailable; this page will not execute commands to discover dependencies.",
      internalModuleRelationshipSummary:
        "Internal module relationship summary: unknown relationships stay marked for review rather than inferred from arbitrary browsing.",
      externalPackageSummary:
        "External package summary: unavailable; dependency map does not install packages to fill missing metadata.",
      staleUnknownMarkers:
        "Stale/unknown markers: unknown metadata is a stop-and-review state.",
      riskNote:
        "Risk note: unknown dependency metadata routes to risk review before validation or local action.",
      commandDryRunRoute:
        "Command dry-run route: /command-dry-run remains the review route for any future command.",
      riskScanRoute:
        "Risk scan route: /project-risk-scan-live-trial remains the redacted safety review path.",
      auditHandoff:
        "Audit handoff: preserve unknown metadata as review copy only; the UI does not mutate audit logs.",
      approvedMetadataRoute:
        "Approved metadata route: /api/codexforge/project/snapshot stays server-only and path-bounded; unknown UI state does not request it.",
      blockedReasons: [
        "Approved indexed metadata missing",
        "No command approval",
        "No package install behavior",
      ],
      advancedDependencyDetails:
        "Advanced dependency details: unknown dependency map stays metadata-only and cannot run discovery commands.",
    }),
  ];
}

export function buildProjectDependencyMapLiveTrialBoundary(): ProjectDependencyMapLiveTrialBoundary {
  return {
    approvedIndexedMetadataRequired: true,
    sourceIndexTrialRequired: true,
    packageInstallAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    directJarvisdCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    secretValuesDisplayedAllowed: false,
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
  };
}

export function summarizeProjectDependencyMapLiveTrial(
  model: Pick<ProjectDependencyMapLiveTrialModel, "trials">
): string {
  return `Project dependency map live trial prepares ${model.trials.length} dependency readiness shape(s). Dependency map does not install packages, no commands are run from this page, and dependency details come from approved indexed metadata.`;
}

export function buildProjectDependencyMapLiveTrialModel(): ProjectDependencyMapLiveTrialModel {
  const trials = buildProjectDependencyMapLiveTrials();
  const model: ProjectDependencyMapLiveTrialModel = {
    title: "Project dependency map live trial",
    summary: "",
    trials,
    boundary: buildProjectDependencyMapLiveTrialBoundary(),
    trialLanguage: [...PROJECT_DEPENDENCY_MAP_LIVE_TRIAL_LANGUAGE],
    advancedDetails: [
      "Project dependency map live trial",
      "Dependency map does not install packages",
      "No commands are run from this page",
      "Approved indexed metadata",
      "Dependency trial identity",
      "Source index trial",
      "Dependency source summary",
      "Internal module relationship summary",
      "External package summary",
      "Stale/unknown markers",
      "Risk note",
      "Command dry-run route",
      "Risk scan route",
      "Audit handoff",
      "Approved metadata route",
      "Blocked reasons",
      "No package install behavior",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectDependencyMapLiveTrial(model) };
}
