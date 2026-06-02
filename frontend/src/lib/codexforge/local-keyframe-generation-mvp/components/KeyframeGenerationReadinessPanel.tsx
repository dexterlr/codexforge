"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { KeyframeGenerationReadiness } from "../local-keyframe-generation-types";

export function KeyframeGenerationReadinessPanel({ readiness }: { readiness: KeyframeGenerationReadiness }) {
  return (
    <PreviewFoundationCard title="Keyframe readiness">
      <PreviewFoundationCopy>{readiness.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`status: ${readiness.status}`, ...readiness.blockers]} />
    </PreviewFoundationCard>
  );
}
