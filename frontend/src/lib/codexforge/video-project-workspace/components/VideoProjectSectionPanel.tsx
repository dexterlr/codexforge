"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoProjectSection } from "../video-project-workspace-types";

export function VideoProjectSectionPanel({ sections }: { sections: VideoProjectSection[] }) {
  return (
    <PreviewFoundationCard title="What belongs together">
      <PreviewFoundationCopy>Prompts, styles, shots, keyframes, artifacts, drafts, reviews, and export handoff notes are grouped by section.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={sections.map((section) => `${section.title}: ${section.status}`)} />
    </PreviewFoundationCard>
  );
}
