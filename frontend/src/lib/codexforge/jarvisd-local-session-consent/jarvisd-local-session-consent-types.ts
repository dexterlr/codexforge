export type JarvisdLocalSessionConsentStatus =
  | "review-only"
  | "pending-explicit-approval"
  | "blocked";

export type JarvisdLocalSessionConsent = {
  id: string;
  sessionIdentity: string;
  operatorIntent: string;
  workspaceTrustDependency: string;
  requestedCapabilities: string[];
  allowedSessionScope: string[];
  deniedSessionScope: string[];
  expiryPolicy: string;
  revocationGuidance: string;
  auditRequirement: string;
  consentCopy: string;
  consentStatus: JarvisdLocalSessionConsentStatus;
  blockedReasons: string[];
  advancedConsentDetails: string;
};

export type JarvisdLocalSessionConsentBoundary = {
  liveSessionCreationAllowedFromUi: false;
  automaticPermissionGrantAllowed: false;
  localActionAllowedWithoutApproval: false;
  sessionTokenStorageAllowedInBrowser: false;
  localStorageSessionTokenAllowed: false;
  daemonDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  settingsAutoImportAllowed: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  processEnvDisplayAllowed: false;
  providerRegistryMutationAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdLocalSessionConsentModel = {
  title: "Jarvisd local session consent";
  summary: string;
  sessions: JarvisdLocalSessionConsent[];
  boundary: JarvisdLocalSessionConsentBoundary;
  consentLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdLocalSessionConsentStableKey(
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
