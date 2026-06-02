"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ImageGenerationReadiness } from "../local-image-generation-types";

export function ImageGenerationReadinessPanel({ readiness }: { readiness: ImageGenerationReadiness }) {
  return (
    <PreviewFoundationCard title="Workflow readiness">
      <PreviewFoundationCopy>{readiness.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`status: ${readiness.status}`, ...readiness.blockers]} />
    </PreviewFoundationCard>
  );
}
