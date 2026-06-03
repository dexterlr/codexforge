export type ProviderGovernanceReleaseDecision =
  | "ready"
  | "ready-with-fixes"
  | "blocked";

export type ProviderGovernanceReleaseAudit = {
  id: string;
  auditIdentity: string;
  coveredGovernanceSurfaces: string[];
  routeReadiness: string;
  smokeReadiness: string;
  privacyReadiness: string;
  budgetReadiness: string;
  auditLogReadiness: string;
  runbookReadiness: string;
  knownGaps: string[];
  releaseDecision: ProviderGovernanceReleaseDecision;
  releaseDecisionLabel: string;
  handoffSummary: string;
  advancedAuditDetails: string;
};

export type ProviderGovernanceReleaseAuditBoundary = {
  releaseDeploymentAllowedFromUi: false;
  secretsInspectionAllowedFromUi: false;
  secretsDisplayedAllowed: false;
  providerApiCallsAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
  automaticProviderSendAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  settingsAutoExportAllowed: false;
  settingsAutoImportAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  shellCommandExecutionAllowedFromUi: false;
};

export type ProviderGovernanceReleaseAuditModel = {
  title: "Provider governance release audit";
  summary: string;
  audits: ProviderGovernanceReleaseAudit[];
  boundary: ProviderGovernanceReleaseAuditBoundary;
  auditLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderGovernanceReleaseAuditStableKey(
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
