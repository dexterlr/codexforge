import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CHATBOT_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildChatbotAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { CHATBOT_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildChatbotAdapterImplementationPlanStableKey };

const CHATBOT_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "chatbot-adapter-implementation-plan";

export function buildChatbotAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(CHATBOT_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildChatbotAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(CHATBOT_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildChatbotAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeChatbotAdapterImplementationPlan(model: { chatbotAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(CHATBOT_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.chatbotAdapterImplementationPlans);
}

export function buildChatbotAdapterImplementationPlanModel() {
  const chatbotAdapterImplementationPlans = buildChatbotAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(CHATBOT_ADAPTER_IMPLEMENTATION_PLAN_SLUG, chatbotAdapterImplementationPlans);
  return { ...model, chatbotAdapterImplementationPlans };
}
