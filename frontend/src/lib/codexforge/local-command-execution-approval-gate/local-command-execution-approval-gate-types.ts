export type LocalCommandExecutionApprovalRiskLevel = "low" | "medium" | "high" | "blocked";
export type LocalCommandExecutionApprovalStatus = "review-required" | "not-approved" | "blocked";

export type LocalCommandExecutionApproval = {
  id: string;
  commandIdentity: string;
  commandIntent: string;
  commandPreviewText: string;
  workingDirectoryScope: string;
  allowedScope: string;
  deniedScope: string;
  riskLevel: LocalCommandExecutionApprovalRiskLevel;
  environmentSecretsSafetyNote: string;
  approvalCopy: string;
  auditNote: string;
  blockedReasons: string[];
  status: LocalCommandExecutionApprovalStatus;
  advancedCommandDetails: string;
};

export type LocalCommandExecutionApprovalBoundary = {
  commandExecutionAllowedFromPage: false;
  shellExecutionWithoutApprovalAllowed: false;
  environmentValuesDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  runCommandCallAllowedFromUi: false;
  brokerExecutionCallAllowedFromUi: false;
  localExecutorApiCallAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type LocalCommandExecutionApprovalGateModel = {
  title: "Local command execution approval gate";
  summary: string;
  commands: LocalCommandExecutionApproval[];
  boundary: LocalCommandExecutionApprovalBoundary;
  approvalLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalCommandExecutionApprovalGateStableKey(
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
