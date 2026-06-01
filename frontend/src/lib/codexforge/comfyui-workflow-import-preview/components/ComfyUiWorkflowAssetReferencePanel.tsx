"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiWorkflowAssetReference } from "../comfyui-workflow-import-types";

export function ComfyUiWorkflowAssetReferencePanel({ assets }: { assets: ComfyUiWorkflowAssetReference[] }) {
  return (
    <PreviewFoundationCard title="Asset references">
      <PreviewFoundationCopy>Assets are models, LoRAs, images, or paths a workflow might expect later. Preview never downloads them.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={assets.map((asset) => `${asset.assetKind}: ${asset.reference} (${asset.status})`)} />
    </PreviewFoundationCard>
  );
}
