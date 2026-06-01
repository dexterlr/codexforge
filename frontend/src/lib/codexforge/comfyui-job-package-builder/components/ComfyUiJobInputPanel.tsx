"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiJobInput } from "../comfyui-job-package-types";

export function ComfyUiJobInputPanel({ inputs }: { inputs: ComfyUiJobInput[] }) {
  return (
    <PreviewFoundationCard title="Reviewed inputs">
      <PreviewFoundationCopy>The package collects planning handoffs. It does not send prompts or workflow data to a provider.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={inputs.map((input) => `${input.label}: ${input.source}`)} />
    </PreviewFoundationCard>
  );
}
