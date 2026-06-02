"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { DryRunHandoff } from "../comfyui-dry-run-types";

export function DryRunHandoffPanel({ handoff }: { handoff: DryRunHandoff }) {
  return (
    <PreviewFoundationCard title="Copy dry run handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
