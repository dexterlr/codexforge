"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { KeyframeGenerationResult } from "../local-keyframe-generation-types";

export function KeyframeGenerationResultPanel({ result }: { result: KeyframeGenerationResult }) {
  return (
    <PreviewFoundationCard title="Supplied keyframes">
      <PreviewFoundationCopy>{result.reviewNote}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`result status: ${result.status}`, `capture mode: ${result.captureMode}`, ...result.suppliedKeyframeLabels]} />
    </PreviewFoundationCard>
  );
}
