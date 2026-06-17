import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type AutomationScheduleApprovalBoundaryStatus = "blocked" | "review-only";
export type AutomationScheduleApprovalBoundary = UniversalExecutionReviewPacket & { status: AutomationScheduleApprovalBoundaryStatus };
export type AutomationScheduleApprovalBoundaryBoundary = UniversalExecutionReviewBoundary;
export type AutomationScheduleApprovalBoundaryModel = UniversalExecutionReviewModel & {
  title: "Automation schedule approval boundary";
  automationScheduleApprovalBoundaries: AutomationScheduleApprovalBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildAutomationScheduleApprovalBoundaryStableKey } from "../universal-execution-review-kit";
