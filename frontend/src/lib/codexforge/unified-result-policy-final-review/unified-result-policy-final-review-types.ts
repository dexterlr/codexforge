export type UnifiedResultPolicyFinalReviewStatus = "ready-for-review" | "blocked";

export type UnifiedResultPolicyFinalReview = {
  id: string;
  unifiedResultPolicyIdentity: string;
  resultGroups: string[];
  acceptanceChecklist: string[];
  rejectionChecklist: string[];
  reuseChecklist: string[];
  safetyReviewChecklist: string[];
  deniedResultShortcuts: string[];
  unresolvedResultBlockers: string[];
  recoveryPolicyRoute: string;
  settingsRoute: string;
  nextRecommendedAction: string;
  status: UnifiedResultPolicyFinalReviewStatus;
  advancedResultPolicyDetails: string;
};

export type UnifiedResultPolicyFinalReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  unifiedResultPolicyFinalReviewDoesNotApplyResultPolicy: true;
  resultPolicyChangesRequireExplicitOperatorApproval: true;
  unsafeResultsRemainBlocked: true;
  resultPolicyMutationAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  outputStorageAllowed: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type UnifiedResultPolicyFinalReviewModel = {
  title: "Unified result policy final review";
  summary: string;
  reviews: UnifiedResultPolicyFinalReview[];
  boundary: UnifiedResultPolicyFinalReviewBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedResultPolicyFinalReviewStableKey(
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
