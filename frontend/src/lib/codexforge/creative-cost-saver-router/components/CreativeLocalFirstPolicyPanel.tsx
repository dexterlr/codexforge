"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativeLocalFirstPolicy } from "../creative-cost-saver-types";

export function CreativeLocalFirstPolicyPanel({ policy }: { policy: CreativeLocalFirstPolicy }) {
  return (
    <PreviewFoundationCard title="Local-first policy">
      <PreviewFoundationCopy>{policy.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={policy.steps} />
      <PreviewFoundationCopy>{policy.approvalBoundary}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
