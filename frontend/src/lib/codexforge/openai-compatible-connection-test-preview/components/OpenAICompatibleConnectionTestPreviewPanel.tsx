"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildOpenAICompatibleConnectionTestPreviewModel } from "@/lib/codexforge/openai-compatible-connection-test-preview";

export function OpenAICompatibleConnectionTestPreviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildOpenAICompatibleConnectionTestPreviewModel()} />;
}
