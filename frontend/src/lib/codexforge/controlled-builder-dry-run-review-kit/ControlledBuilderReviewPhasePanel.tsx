"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import type { ControlledBuilderReviewModel } from "./controlled-builder-dry-run-review-kit";

export function ControlledBuilderReviewPhasePanel({ model }: { model: ControlledBuilderReviewModel }) {
  return (
    <UniversalExecutionReviewSurface
      phase={model.phase}
      title={model.title}
      subtitle={model.subtitle}
      primaryLabel={model.primaryLabel}
      anchor={model.anchor}
      plainEnglishTitle={model.plainEnglishTitle}
      plainEnglishCopy={model.plainEnglishCopy}
      language={model.language}
      markers={model.markers}
      links={model.links}
      packets={model.reviewPackets}
      advancedSummary={model.advancedSummary}
      advancedDetails={model.advancedDetails}
      advancedCopy={model.advancedCopy}
      dataScope={model.dataScope}
    />
  );
}
