"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ComfyUiJobPackageHandoff } from "../comfyui-job-package-types";

export function ComfyUiJobPackageHandoffPanel({ handoff }: { handoff: ComfyUiJobPackageHandoff }) {
  return (
    <PreviewFoundationCard title="Copy package handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
