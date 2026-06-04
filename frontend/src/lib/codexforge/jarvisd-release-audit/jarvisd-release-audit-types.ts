export type JarvisdReleaseDecision = "ready" | "ready-with-fixes" | "blocked";

export type JarvisdReleaseAudit = {
  id: string;
  releaseAuditIdentity: string;
  coveredJarvisdSurfaces: string[];
  contractReadiness: string;
  healthVersionReadiness: string;
  capabilityRegistryReadiness: string;
  permissionBoundaryReadiness: string;
  auditLogReadiness: string;
  recoveryReadiness: string;
  settingsReviewReadiness: string;
  knownGaps: string[];
  releaseDecision: JarvisdReleaseDecision;
  releaseDecisionLabel: string;
  nextRecommendedRoute: string;
  advancedAuditDetails: string;
};

export type JarvisdReleaseAuditBoundary = {
  jarvisdDeploymentAllowedFromUi: false;
  daemonActionAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  localStateMutationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  secretsInspectionAllowedFromUi: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  settingsAutoExportAllowed: false;
  settingsAutoImportAllowed: false;
  providerRegistryMutationAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdReleaseAuditModel = {
  title: "Jarvisd release audit";
  summary: string;
  audits: JarvisdReleaseAudit[];
  boundary: JarvisdReleaseAuditBoundary;
  auditLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdReleaseAuditStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
