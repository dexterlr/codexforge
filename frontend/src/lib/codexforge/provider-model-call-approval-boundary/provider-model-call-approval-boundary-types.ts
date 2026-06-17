import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type ProviderModelCallApprovalBoundaryStatus = "blocked" | "review-only";
export type ProviderModelCallApprovalBoundary = UniversalExecutionReviewPacket & { status: ProviderModelCallApprovalBoundaryStatus };
export type ProviderModelCallApprovalBoundaryBoundary = UniversalExecutionReviewBoundary;
export type ProviderModelCallApprovalBoundaryModel = UniversalExecutionReviewModel & {
  title: "Provider model call approval boundary";
  providerModelCallApprovalBoundaries: ProviderModelCallApprovalBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildProviderModelCallApprovalBoundaryStableKey } from "../universal-execution-review-kit";
