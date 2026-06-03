import type {
  ProjectDependencyMap,
  ProjectDependencyMapBoundary,
  ProjectDependencyMapModel,
} from "./project-dependency-map-types";
import { buildProjectDependencyMapStableKey } from "./project-dependency-map-types";

export const PROJECT_DEPENDENCY_MAP_LANGUAGE = [
  "Project dependency map",
  "Dependency map does not install packages",
  "No commands are run from this page",
  "Approved indexed metadata",
  "External package summary",
  "Risk scanner route",
] as const;

export function buildProjectDependencyMap(
  input: Omit<ProjectDependencyMap, "id"> & { idHint: string }
): ProjectDependencyMap {
  const { idHint, ...map } = input;
  return {
    id: buildProjectDependencyMapStableKey(
      "project-dependency-map",
      idHint,
      input.status
    ),
    ...map,
  };
}

export function buildProjectDependencyMaps(): ProjectDependencyMap[] {
  return [
    buildProjectDependencyMap({
      idHint: "frontend-metadata-review",
      status: "review-required",
      projectSummary:
        "Project summary: CodexForge frontend dependency relationships are summarized from approved indexed metadata, not from package manager commands.",
      dependencySource:
        "Dependency source: approved indexed metadata from trusted workspace manifests, imports, route metadata, and component relationships.",
      dependencyGroup:
        "Dependency group: app routes, CodexForge domain libraries, shared UI helpers, smoke scripts, and external packages are separated for review.",
      internalModuleRelationship:
        "Internal module relationship: route clients import CodexForge panels; panels import deterministic model builders; model builders stay separate from UI actions.",
      externalPackageSummary:
        "External package summary: packages are summarized as review metadata only. Dependency map does not install packages.",
      riskNote:
        "Risk note: unknown or stale dependency metadata is marked for review before any local action, provider send, or package change.",
      staleUnknownMarker:
        "Stale/unknown marker: missing, stale, or untrusted dependency metadata appears as unknown until the approved index is refreshed behind the local boundary.",
      commandApprovalRoute:
        "Command approval route: /local-command-approval is required before any future command-based validation, package manager action, or shell task.",
      riskScannerRoute:
        "Risk scanner route: /project-risk-secrets-scan reviews suspected risks and redacted secret indicators.",
      blockedReasons: [
        "Dependency map does not install packages",
        "No commands are run from this page",
        "Dependency details come from approved indexed metadata",
      ],
      advancedDependencyDetails:
        "Advanced graph/details: review-only dependency metadata. This page does not run package manager commands, execute shell commands, mutate files, delete files, browse arbitrary files, call providers, or install packages.",
    }),
    buildProjectDependencyMap({
      idHint: "metadata-unknown",
      status: "unknown",
      projectSummary:
        "Project summary: dependency map unavailable because approved indexed metadata is missing or stale.",
      dependencySource:
        "Dependency source: unknown until the safe local project indexer prepares trusted workspace metadata.",
      dependencyGroup:
        "Dependency group: unknown groups stay clearly marked rather than inferred from arbitrary local browsing.",
      internalModuleRelationship:
        "Internal module relationship: unavailable until approved indexed metadata exists.",
      externalPackageSummary:
        "External package summary: unavailable; this page will not install packages to discover dependencies.",
      riskNote:
        "Risk note: stale or unknown dependency data should route to the risk scanner and command approval review before any action.",
      staleUnknownMarker:
        "Stale/unknown marker: unknown metadata is a stop-and-review state.",
      commandApprovalRoute:
        "Command approval route: /local-command-approval remains required for any future command.",
      riskScannerRoute:
        "Risk scanner route: /project-risk-secrets-scan remains the safety review path.",
      blockedReasons: [
        "Approved indexed metadata missing",
        "No command approval",
        "No package install behavior",
      ],
      advancedDependencyDetails:
        "Advanced graph/details: blocked dependency map stays metadata-only.",
    }),
  ];
}

export function buildProjectDependencyMapBoundary(): ProjectDependencyMapBoundary {
  return {
    approvedIndexedMetadataRequired: true,
    packageInstallAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    localActionsWithoutReviewAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeProjectDependencyMap(
  model: Pick<ProjectDependencyMapModel, "maps">
): string {
  return `Project dependency map prepares ${model.maps.length} dependency review shape(s). Dependency map does not install packages, no commands are run from this page, and dependency details come from approved indexed metadata.`;
}

export function buildProjectDependencyMapModel(): ProjectDependencyMapModel {
  const maps = buildProjectDependencyMaps();
  const model: ProjectDependencyMapModel = {
    title: "Project dependency map",
    summary: "",
    maps,
    boundary: buildProjectDependencyMapBoundary(),
    dependencyLanguage: [...PROJECT_DEPENDENCY_MAP_LANGUAGE],
    advancedDetails: [
      "Project dependency map",
      "Dependency map does not install packages",
      "No commands are run from this page",
      "Approved indexed metadata",
      "Project summary",
      "Dependency source",
      "Dependency group",
      "Internal module relationship",
      "External package summary",
      "Risk note",
      "Stale/unknown marker",
      "Command approval route",
      "Risk scanner route",
      "Blocked reasons",
      "Approved local boundary required",
      "No package install behavior",
    ],
  };
  return { ...model, summary: summarizeProjectDependencyMap(model) };
}
