"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoFailureRetryPlan } from "../video-failure-recovery-types";

export function VideoFailureRetryPlanPanel({ retryPlan }: { retryPlan: VideoFailureRetryPlan }) {
  return (
    <PreviewFoundationCard title="Retry plan">
      <PreviewFoundationCopy>{retryPlan.label} stays copy-only and cannot run from this screen.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={retryPlan.steps} />
    </PreviewFoundationCard>
  );
}
