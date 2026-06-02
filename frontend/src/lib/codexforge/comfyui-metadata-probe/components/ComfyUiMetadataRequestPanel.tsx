"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiMetadataRequest } from "../comfyui-metadata-probe-types";

export function ComfyUiMetadataRequestPanel({ request }: { request: ComfyUiMetadataRequest }) {
  return (
    <PreviewFoundationCard title="Metadata request contract">
      <PreviewFoundationCopy>These are metadata fields only. The request contract has no prompt payload and no workflow payload.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={request.allowedChecks} />
    </PreviewFoundationCard>
  );
}
