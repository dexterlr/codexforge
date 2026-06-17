import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type UniversalExecutionBoundaryInventoryStatus = "blocked" | "review-only";
export type UniversalExecutionBoundaryInventory = UniversalExecutionReviewPacket & { status: UniversalExecutionBoundaryInventoryStatus };
export type UniversalExecutionBoundaryInventoryBoundary = UniversalExecutionReviewBoundary;
export type UniversalExecutionBoundaryInventoryModel = UniversalExecutionReviewModel & {
  title: "Universal execution boundary inventory";
  universalExecutionBoundaryInventories: UniversalExecutionBoundaryInventory[];
};

export { buildUniversalExecutionReviewStableKey as buildUniversalExecutionBoundaryInventoryStableKey } from "../universal-execution-review-kit";
