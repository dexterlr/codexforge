"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudFinalRenderJustification } from "../cloud-final-render-types";

export function CloudFinalRenderJustificationPanel({ justification }: { justification: CloudFinalRenderJustification }) {
  return (
    <PreviewFoundationCard title="Justification checks">
      <PreviewFoundationCopy>{justification.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={justification.checks.map((check) => `${check.check}: ${check.status}`)}
      />
    </PreviewFoundationCard>
  );
}
