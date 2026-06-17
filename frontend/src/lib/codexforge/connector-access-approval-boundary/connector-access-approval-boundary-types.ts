import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type ConnectorAccessApprovalBoundaryStatus = "blocked" | "review-only";
export type ConnectorAccessApprovalBoundary = UniversalExecutionReviewPacket & { status: ConnectorAccessApprovalBoundaryStatus };
export type ConnectorAccessApprovalBoundaryBoundary = UniversalExecutionReviewBoundary;
export type ConnectorAccessApprovalBoundaryModel = UniversalExecutionReviewModel & {
  title: "Connector access approval boundary";
  connectorAccessApprovalBoundaries: ConnectorAccessApprovalBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildConnectorAccessApprovalBoundaryStableKey } from "../universal-execution-review-kit";
