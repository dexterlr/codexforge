export type ConnectorExecutionBoundaryReadinessReviewStatus = "ready-for-review" | "blocked";

export type ConnectorExecutionBoundaryReadinessReview = {
  id: string;
  connectorExecutionBoundaryIdentity: string;
  connectorBoundaryGroups: string[];
  accountPermissionChecklist: string[];
  sourceRedactionChecklist: string[];
  evidenceCitationChecklist: string[];
  rollbackRevocationChecklist: string[];
  deniedConnectorExecutionActions: string[];
  unresolvedConnectorBoundaryBlockers: string[];
  automationExecutionReadinessRoute: string;
  backendBoundaryInventoryRoute: string;
  nextRecommendedAction: string;
  status: ConnectorExecutionBoundaryReadinessReviewStatus;
  advancedConnectorExecutionBoundaryDetails: string;
};

export type ConnectorExecutionBoundaryReadinessReviewBoundary = {
  reviewOnly: true; approvalRequired: true; connectorApiCallsAllowedFromUi: false; connectorAccountConnectionAllowedFromUi: false; connectorDataFetchAllowedFromUi: false; connectorDataStorageAllowedFromUi: false; workflowExecutionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type ConnectorExecutionBoundaryReadinessReviewModel = {
  title: "Connector execution boundary readiness review";
  summary: string;
  connectorReviews: ConnectorExecutionBoundaryReadinessReview[];
  boundary: ConnectorExecutionBoundaryReadinessReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildConnectorExecutionBoundaryReadinessReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
