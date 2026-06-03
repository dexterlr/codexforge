export type PatchPreviewWorkbenchStatus = "review-required" | "ready-for-review" | "blocked";

export type PatchPreview = {
  id: string;
  patchIdentity: string;
  sourceChangePlan: string;
  affectedFilesSummary: string;
  hunkSummary: string;
  riskSecretsScanStatus: string;
  testPlanSummary: string;
  approvalCopy: string;
  applyBoundaryRoute: string;
  rollbackNote: string;
  blockedReasons: string[];
  status: PatchPreviewWorkbenchStatus;
  advancedDiffDetails: string;
};

export type PatchPreviewWorkbenchBoundary = {
  previewOnly: true;
  rawDiffsPrimaryAllowed: false;
  suspectedSecretsRedacted: true;
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
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type PatchPreviewWorkbenchModel = {
  title: "Patch preview workbench";
  summary: string;
  previews: PatchPreview[];
  boundary: PatchPreviewWorkbenchBoundary;
  previewLanguage: string[];
  advancedDetails: string[];
};

export function buildPatchPreviewWorkbenchStableKey(
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
