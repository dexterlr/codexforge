"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudFinalRenderReadiness } from "../cloud-final-render-types";

export function CloudFinalRenderReadinessPanel({ readiness }: { readiness: CloudFinalRenderReadiness }) {
  return (
    <PreviewFoundationCard title="Readiness">
      <PreviewFoundationCopy>{readiness.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[readiness.status, ...readiness.blockers]} />
      <PreviewFoundationCopy>{readiness.nextStep}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
