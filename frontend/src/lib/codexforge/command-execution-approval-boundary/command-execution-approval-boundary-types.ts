import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type CommandExecutionApprovalBoundaryStatus = "blocked" | "review-only";
export type CommandExecutionApprovalBoundary = UniversalExecutionReviewPacket & { status: CommandExecutionApprovalBoundaryStatus };
export type CommandExecutionApprovalBoundaryBoundary = UniversalExecutionReviewBoundary;
export type CommandExecutionApprovalBoundaryModel = UniversalExecutionReviewModel & {
  title: "Command execution approval boundary";
  commandExecutionApprovalBoundaries: CommandExecutionApprovalBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildCommandExecutionApprovalBoundaryStableKey } from "../universal-execution-review-kit";
