"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativeCloudFallbackPolicy } from "../creative-cost-saver-types";

export function CreativeCloudFallbackPolicyPanel({ policy }: { policy: CreativeCloudFallbackPolicy }) {
  return (
    <PreviewFoundationCard title="Cloud fallback later">
      <PreviewFoundationCopy>{policy.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={policy.allowedWhen} />
      <PreviewFoundationCopy>{policy.blockedUntil}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
