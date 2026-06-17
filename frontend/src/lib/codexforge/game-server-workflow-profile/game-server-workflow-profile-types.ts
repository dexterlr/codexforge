import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type GameServerWorkflowProfileStatus = "blocked" | "review-only";
export type GameServerWorkflowProfile = UniversalExecutionReviewPacket & { status: GameServerWorkflowProfileStatus };
export type GameServerWorkflowProfileBoundary = UniversalExecutionReviewBoundary;
export type GameServerWorkflowProfileModel = UniversalExecutionReviewModel & {
  title: "Game server workflow profile";
  gameServerWorkflowProfiles: GameServerWorkflowProfile[];
};

export { buildUniversalExecutionReviewStableKey as buildGameServerWorkflowProfileStableKey } from "../universal-execution-review-kit";
