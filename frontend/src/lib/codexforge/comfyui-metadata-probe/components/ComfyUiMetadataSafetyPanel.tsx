"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiMetadataSafety } from "../comfyui-metadata-probe-types";

export function ComfyUiMetadataSafetyPanel({ safety }: { safety: ComfyUiMetadataSafety }) {
  return (
    <PreviewFoundationCard title="Metadata safety">
      <PreviewFoundationCopy>Metadata readiness checks are not render jobs. They cannot ask ComfyUI to create anything.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={safety.guarantees} />
      <PreviewFoundationCopy>Blocked: {safety.blocked.join(", ")}.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
