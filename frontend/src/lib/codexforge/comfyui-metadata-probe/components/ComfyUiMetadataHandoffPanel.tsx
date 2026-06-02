"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ComfyUiMetadataHandoff } from "../comfyui-metadata-probe-types";

export function ComfyUiMetadataHandoffPanel({ handoff }: { handoff: ComfyUiMetadataHandoff }) {
  return (
    <PreviewFoundationCard title="Copy metadata handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
