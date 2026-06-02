"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiMetadataTarget } from "../comfyui-metadata-probe-types";

export function ComfyUiMetadataTargetPanel({ target }: { target: ComfyUiMetadataTarget }) {
  return (
    <PreviewFoundationCard title="Metadata target">
      <PreviewFoundationCopy>{target.name}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{target.baseUrl}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[target.localOnly ? "local-only status" : "not local", "metadata-only target"]} />
    </PreviewFoundationCard>
  );
}
