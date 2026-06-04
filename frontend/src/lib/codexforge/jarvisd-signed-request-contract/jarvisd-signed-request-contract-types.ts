export type JarvisdSignedRequestSignatureStatus =
  | "absent"
  | "pending-approved-signer"
  | "verified"
  | "blocked";

export type JarvisdSignedRequestContract = {
  id: string;
  requestContractIdentity: string;
  requestPurpose: string;
  capabilityTarget: string;
  permissionBoundaryReference: string;
  nonceChallengeSummary: string;
  signatureStatus: JarvisdSignedRequestSignatureStatus;
  signatureStatusLabel: string;
  replayProtectionNote: string;
  expiryTimeoutPolicy: string;
  auditHandoff: string;
  blockedReasons: string[];
  advancedRequestDetails: string;
};

export type JarvisdSignedRequestContractBoundary = {
  requestSendAllowedFromUi: false;
  signingSecretDisplayAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  signingSecretGenerationAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  localStorageTokenStorageAllowed: false;
  daemonDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  automaticLocalActionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  processEnvDisplayAllowed: false;
  settingsAutoImportAllowed: false;
  providerRegistryMutationAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdSignedRequestContractModel = {
  title: "Jarvisd signed request contract";
  summary: string;
  contracts: JarvisdSignedRequestContract[];
  boundary: JarvisdSignedRequestContractBoundary;
  contractLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdSignedRequestContractStableKey(
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
