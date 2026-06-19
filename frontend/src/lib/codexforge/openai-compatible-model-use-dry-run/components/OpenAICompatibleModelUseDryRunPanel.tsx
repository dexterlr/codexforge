"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildOpenAICompatibleModelUseDryRunModel } from "@/lib/codexforge/openai-compatible-model-use-dry-run";

export function OpenAICompatibleModelUseDryRunPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildOpenAICompatibleModelUseDryRunModel()} />;
}

