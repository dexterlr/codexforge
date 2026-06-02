"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftReadiness } from "../local-video-draft-types";

export function VideoDraftReadinessPanel({ readiness }: { readiness: VideoDraftReadiness }) {
  return (
    <PreviewFoundationCard title="Draft readiness">
      <PreviewFoundationCopy>{readiness.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`status: ${readiness.status}`, ...readiness.blockers]} />
    </PreviewFoundationCard>
  );
}
