"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildChatbotAdapterContractReviewModel } from "@/lib/codexforge/chatbot-adapter-contract-review";

export function ChatbotAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildChatbotAdapterContractReviewModel()} />;
}
