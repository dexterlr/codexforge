import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_GAME_SERVER_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstGameServerAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_GAME_SERVER_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstGameServerAdapterMvpDesignStableKey };

const FIRST_GAME_SERVER_ADAPTER_MVP_DESIGN_SLUG = "first-game-server-adapter-mvp-design";

export function buildFirstGameServerAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_GAME_SERVER_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstGameServerAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_GAME_SERVER_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstGameServerAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstGameServerAdapterMvpDesign(model: { firstGameServerAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_GAME_SERVER_ADAPTER_MVP_DESIGN_SLUG, model.firstGameServerAdapterMvpDesigns);
}

export function buildFirstGameServerAdapterMvpDesignModel() {
  const firstGameServerAdapterMvpDesigns = buildFirstGameServerAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_GAME_SERVER_ADAPTER_MVP_DESIGN_SLUG, firstGameServerAdapterMvpDesigns);
  return { ...model, firstGameServerAdapterMvpDesigns };
}
