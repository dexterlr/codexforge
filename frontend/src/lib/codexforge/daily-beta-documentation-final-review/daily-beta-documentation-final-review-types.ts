export type DailyBetaDocumentationFinalReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaDocumentationFinalReview = {
  id: string;
  dailyBetaDocumentationIdentity: string;
  documentationGroups: string[];
  operatorRunbookChecklist: string[];
  checkpointDocsChecklist: string[];
  releaseNotesChecklist: string[];
  safetyWordingChecklist: string[];
  deniedDocumentationShortcuts: string[];
  unresolvedDocumentationBlockers: string[];
  onboardingFinalReviewRoute: string;
  releaseSignoffRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaDocumentationFinalReviewStatus;
  advancedDocumentationDetails: string;
};

export type DailyBetaDocumentationFinalReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaDocumentationFinalReviewDoesNotPublishDocumentationAutomatically: true;
  documentationChangesRequireExplicitOperatorApproval: true;
  staleDailyBetaDocumentationBlockersStayBlocked: true;
  documentationPublishAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
};

export type DailyBetaDocumentationFinalReviewModel = {
  title: "Daily Beta documentation final review";
  summary: string;
  reviews: DailyBetaDocumentationFinalReview[];
  boundary: DailyBetaDocumentationFinalReviewBoundary;
  documentationLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyBetaDocumentationFinalReviewStableKey(
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
