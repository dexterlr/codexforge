"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildResearchAdapterContractReviewModel } from "@/lib/codexforge/research-adapter-contract-review";

export function ResearchAdapterContractReviewPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildResearchAdapterContractReviewModel()} />;
}
