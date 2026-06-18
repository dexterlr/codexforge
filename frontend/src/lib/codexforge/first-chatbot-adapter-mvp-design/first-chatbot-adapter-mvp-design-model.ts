import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_CHATBOT_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstChatbotAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_CHATBOT_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstChatbotAdapterMvpDesignStableKey };

const FIRST_CHATBOT_ADAPTER_MVP_DESIGN_SLUG = "first-chatbot-adapter-mvp-design";

export function buildFirstChatbotAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_CHATBOT_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstChatbotAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_CHATBOT_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstChatbotAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstChatbotAdapterMvpDesign(model: { firstChatbotAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_CHATBOT_ADAPTER_MVP_DESIGN_SLUG, model.firstChatbotAdapterMvpDesigns);
}

export function buildFirstChatbotAdapterMvpDesignModel() {
  const firstChatbotAdapterMvpDesigns = buildFirstChatbotAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_CHATBOT_ADAPTER_MVP_DESIGN_SLUG, firstChatbotAdapterMvpDesigns);
  return { ...model, firstChatbotAdapterMvpDesigns };
}
