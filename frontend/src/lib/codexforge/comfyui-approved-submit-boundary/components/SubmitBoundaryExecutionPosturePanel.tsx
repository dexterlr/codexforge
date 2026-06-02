"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { SubmitBoundaryExecutionPosture } from "../comfyui-submit-boundary-types";

export function SubmitBoundaryExecutionPosturePanel({ posture }: { posture: SubmitBoundaryExecutionPosture }) {
  return (
    <PreviewFoundationCard title="Execution posture">
      <PreviewFoundationCopy>{posture.label}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{posture.explanation}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[posture.status, posture.executionAllowed ? "execution allowed" : "execution blocked"]} />
    </PreviewFoundationCard>
  );
}
