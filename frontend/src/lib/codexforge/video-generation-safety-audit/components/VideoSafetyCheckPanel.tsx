"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoSafetyCheck } from "../video-generation-safety-types";

export function VideoSafetyCheckPanel({ checks }: { checks: VideoSafetyCheck[] }) {
  return (
    <PreviewFoundationCard title="Pass, warn, block checks">
      <PreviewFoundationCopy>Clear pass/warn/block categories show what must be safe before a future real trial.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={checks.map((check) => `${check.status}: ${check.check}`)} />
    </PreviewFoundationCard>
  );
}
