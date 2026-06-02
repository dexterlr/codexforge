"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { RenderQueuePolicy } from "../local-render-queue-types";

export function RenderQueuePolicyPanel({ policy }: { policy: RenderQueuePolicy }) {
  return (
    <PreviewFoundationCard title="Queue policy">
      <PreviewFoundationCopy>{policy.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={policy.rules} />
    </PreviewFoundationCard>
  );
}
