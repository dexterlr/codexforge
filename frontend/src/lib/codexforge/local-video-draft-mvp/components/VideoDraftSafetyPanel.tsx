"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftSafety } from "../local-video-draft-types";

export function VideoDraftSafetyPanel({ safety }: { safety: VideoDraftSafety }) {
  return (
    <PreviewFoundationCard title="Safety review">
      <PreviewFoundationCopy>{safety.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["local-only", "draft only", "final later", "no render", "no queue mutation", "approval required"]} />
    </PreviewFoundationCard>
  );
}
