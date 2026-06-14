export type UnifiedEvidencePolicyFinalReviewStatus = "ready-for-review" | "blocked";

export type UnifiedEvidencePolicyFinalReview = {
  id: string;
  unifiedEvidencePolicyIdentity: string;
  evidenceGroups: string[];
  captureChecklist: string[];
  citationSourceChecklist: string[];
  redactionPrivacyChecklist: string[];
  retentionChecklist: string[];
  deniedEvidenceShortcuts: string[];
  unresolvedEvidenceBlockers: string[];
  resultPolicyRoute: string;
  recoveryPolicyRoute: string;
  nextRecommendedAction: string;
  status: UnifiedEvidencePolicyFinalReviewStatus;
  advancedEvidencePolicyDetails: string;
};

export type UnifiedEvidencePolicyFinalReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  unifiedEvidencePolicyFinalReviewDoesNotApplyEvidencePolicy: true;
  evidencePolicyChangesRequireExplicitOperatorApproval: true;
  privateEvidenceRemainsRedacted: true;
  evidencePolicyMutationAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  outputStorageAllowed: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type UnifiedEvidencePolicyFinalReviewModel = {
  title: "Unified evidence policy final review";
  summary: string;
  reviews: UnifiedEvidencePolicyFinalReview[];
  boundary: UnifiedEvidencePolicyFinalReviewBoundary;
  evidenceLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedEvidencePolicyFinalReviewStableKey(
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
