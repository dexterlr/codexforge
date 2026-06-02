"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ImageGenerationResult } from "../local-image-generation-types";

export function ImageGenerationResultPanel({ result }: { result: ImageGenerationResult }) {
  return (
    <PreviewFoundationCard title="Supplied result capture">
      <PreviewFoundationCopy>{result.reviewNote}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`result status: ${result.status}`, `artifact: ${result.suppliedArtifactLabel}`, `capture mode: ${result.captureMode}`]} />
    </PreviewFoundationCard>
  );
}
