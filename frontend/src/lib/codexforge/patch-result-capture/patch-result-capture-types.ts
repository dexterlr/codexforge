export type PatchApplyResultStatus = "passed" | "failed" | "blocked" | "needs review";

export type PatchResult = {
  id: string;
  resultIdentity: string;
  patchIdentity: string;
  applyStatus: PatchApplyResultStatus;
  changedFilesSummary: string;
  validationSummary: string;
  riskSecretsFollowUp: string;
  rollbackStatus: string;
  reviewInboxHandoff: string;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedResultDetails: string;
};

export type PatchResultCaptureBoundary = {
  reviewBeforePromotionRequired: true;
  failedPatchesRetainedForRecovery: true;
  memoryAutoPromotionAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  localActionsWithoutReviewAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type PatchResultCaptureModel = {
  title: "Patch result capture";
  summary: string;
  results: PatchResult[];
  boundary: PatchResultCaptureBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildPatchResultCaptureStableKey(
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
