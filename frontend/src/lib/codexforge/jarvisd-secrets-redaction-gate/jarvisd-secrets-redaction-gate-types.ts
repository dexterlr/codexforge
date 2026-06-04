export type JarvisdSecretsRedactionStatus =
  | "redacted-before-review"
  | "approval-required"
  | "blocked";

export type JarvisdSecretsRedactionGate = {
  id: string;
  redactionGateIdentity: string;
  sourceCapability: string;
  findingCategory: string;
  redactionStatus: JarvisdSecretsRedactionStatus;
  sensitiveIndicatorSummary: string;
  allowedDisplayFields: string[];
  deniedDisplayFields: string[];
  approvalRequirement: string;
  auditHandoff: string;
  blockedReasons: string[];
  advancedRedactionDetails: string;
};

export type JarvisdSecretsRedactionGateBoundary = {
  redactionBeforeReviewRequired: true;
  secretValuesDisplayedAllowed: false;
  rawSecretDisplayAllowed: false;
  secretsExportedAllowed: false;
  automaticProviderSendAllowed: false;
  providerApiCallsAllowedFromUi: false;
  fileSendingApprovedByRedaction: false;
  providerSendingApprovedByRedaction: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  liveHandshakeAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  auditLogMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type JarvisdSecretsRedactionGateModel = {
  title: "Jarvisd secrets redaction gate";
  summary: string;
  gates: JarvisdSecretsRedactionGate[];
  boundary: JarvisdSecretsRedactionGateBoundary;
  redactionLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdSecretsRedactionGateStableKey(
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
