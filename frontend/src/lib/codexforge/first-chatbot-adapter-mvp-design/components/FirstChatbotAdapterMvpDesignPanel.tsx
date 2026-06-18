"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildFirstChatbotAdapterMvpDesignModel } from "@/lib/codexforge/first-chatbot-adapter-mvp-design";

export function FirstChatbotAdapterMvpDesignPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildFirstChatbotAdapterMvpDesignModel()} />;
}
