"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildChatbotAdapterImplementationPlanModel } from "@/lib/codexforge/chatbot-adapter-implementation-plan";

export function ChatbotAdapterImplementationPlanPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildChatbotAdapterImplementationPlanModel()} />;
}
