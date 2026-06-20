"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildOpenAICompatibleRouterTrialResultModel } from "@/lib/codexforge/openai-compatible-router-trial-result";

export function OpenAICompatibleRouterTrialResultPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildOpenAICompatibleRouterTrialResultModel()} />;
}
