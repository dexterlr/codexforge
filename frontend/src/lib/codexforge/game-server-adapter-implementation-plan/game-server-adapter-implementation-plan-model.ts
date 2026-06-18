import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GAME_SERVER_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildGameServerAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { GAME_SERVER_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildGameServerAdapterImplementationPlanStableKey };

const GAME_SERVER_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "game-server-adapter-implementation-plan";

export function buildGameServerAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(GAME_SERVER_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildGameServerAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(GAME_SERVER_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildGameServerAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeGameServerAdapterImplementationPlan(model: { gameServerAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(GAME_SERVER_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.gameServerAdapterImplementationPlans);
}

export function buildGameServerAdapterImplementationPlanModel() {
  const gameServerAdapterImplementationPlans = buildGameServerAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(GAME_SERVER_ADAPTER_IMPLEMENTATION_PLAN_SLUG, gameServerAdapterImplementationPlans);
  return { ...model, gameServerAdapterImplementationPlans };
}
