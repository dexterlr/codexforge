"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudFinalRenderRequest } from "../cloud-final-render-types";

export function CloudFinalRenderRequestPanel({ request }: { request: CloudFinalRenderRequest }) {
  return (
    <PreviewFoundationCard title="Render request">
      <PreviewFoundationCopy>{request.projectName}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          request.providerOption,
          request.requestedCapability,
          request.localDraftStatus,
          request.promptAssetStatus,
        ]}
      />
      <PreviewFoundationCopy>Manual approval required before any real cloud render path.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
