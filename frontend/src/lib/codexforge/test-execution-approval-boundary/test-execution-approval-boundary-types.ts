export type TestExecutionApprovalStatus = "review-required" | "not-approved" | "blocked";

export type TestExecutionApprovalTrustStatus = "trusted-for-review" | "review-required" | "blocked";

export type TestExecutionApproval = {
  id: string;
  executionRequestIdentity: string;
  selectedTestCommand: string;
  workingDirectoryScope: string;
  workspaceTrustStatus: TestExecutionApprovalTrustStatus;
  commandApprovalStatus: string;
  allowedScope: string;
  deniedScope: string;
  timeoutPolicy: string;
  approvalCopy: string;
  blockedReasons: string[];
  status: TestExecutionApprovalStatus;
  advancedExecutionDetails: string;
};

export type TestExecutionApprovalBoundary = {
  testsExecutedFromPageAllowed: false;
  approvalRequiredBeforeAnyTestRun: true;
  futureExecutionBehindApprovedLocalBoundary: true;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  runCommandCallAllowedFromUi: false;
  brokerExecutionCallAllowedFromUi: false;
  localExecutorApiCallAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
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

export type TestExecutionApprovalBoundaryModel = {
  title: "Test execution approval boundary";
  summary: string;
  approvals: TestExecutionApproval[];
  boundary: TestExecutionApprovalBoundary;
  approvalLanguage: string[];
  advancedDetails: string[];
};

export function buildTestExecutionApprovalBoundaryStableKey(
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
