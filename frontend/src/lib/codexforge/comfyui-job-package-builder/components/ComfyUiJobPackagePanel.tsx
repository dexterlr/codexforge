"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiJobPackage } from "../comfyui-job-package-types";

export function ComfyUiJobPackagePanel({ jobPackage }: { jobPackage: ComfyUiJobPackage }) {
  return (
    <PreviewFoundationCard title="Job package">
      <PreviewFoundationCopy>{jobPackage.title}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["Future submit blocked", "Reviewed package only", `${jobPackage.inputs.length} inputs collected`]} />
    </PreviewFoundationCard>
  );
}
