"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildOpenAICompatibleProviderTestPacketModel } from "@/lib/codexforge/openai-compatible-provider-test-packet";

export function OpenAICompatibleProviderTestPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildOpenAICompatibleProviderTestPacketModel()} />;
}
