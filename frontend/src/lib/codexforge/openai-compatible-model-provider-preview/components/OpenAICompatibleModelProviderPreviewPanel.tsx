"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildOpenAICompatibleModelProviderPreviewModel } from "@/lib/codexforge/openai-compatible-model-provider-preview";

export function OpenAICompatibleModelProviderPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildOpenAICompatibleModelProviderPreviewModel()} />;
}
