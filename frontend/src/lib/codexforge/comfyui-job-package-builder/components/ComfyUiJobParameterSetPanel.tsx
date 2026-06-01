"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiJobParameterSet } from "../comfyui-job-package-types";

export function ComfyUiJobParameterSetPanel({ parameterSet }: { parameterSet: ComfyUiJobParameterSet }) {
  return (
    <PreviewFoundationCard title="Parameter set">
      <PreviewFoundationCopy>{parameterSet.label} keeps the first future draft small and reviewable.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={parameterSet.parameters} />
    </PreviewFoundationCard>
  );
}
