"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudVideoFallbackPolicy } from "../cloud-video-provider-types";

export function CloudVideoFallbackPolicyPanel({ policy }: { policy: CloudVideoFallbackPolicy }) {
  return (
    <PreviewFoundationCard title="Fallback policy">
      <PreviewFoundationCopy>{policy.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={policy.allowedWhen} />
      <PreviewFoundationCopy>{policy.blockedUntil}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
