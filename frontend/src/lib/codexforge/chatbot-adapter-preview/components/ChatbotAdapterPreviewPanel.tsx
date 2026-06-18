"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildChatbotAdapterPreviewModel } from "@/lib/codexforge/chatbot-adapter-preview";

export function ChatbotAdapterPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildChatbotAdapterPreviewModel()} />;
}
