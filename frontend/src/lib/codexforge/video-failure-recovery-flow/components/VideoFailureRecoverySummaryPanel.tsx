"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoFailureRecoverySummary } from "../video-failure-recovery-types";

export function VideoFailureRecoverySummaryPanel({ summary }: { summary: VideoFailureRecoverySummary }) {
  return (
    <PreviewFoundationCard title="Recovery summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Failure should feel fixable: diagnose, choose a safe next step, copy a plan, and review before retry.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
