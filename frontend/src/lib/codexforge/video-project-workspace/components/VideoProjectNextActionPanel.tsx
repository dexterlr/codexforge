"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoProjectNextAction } from "../video-project-workspace-types";

export function VideoProjectNextActionPanel({ nextAction }: { nextAction: VideoProjectNextAction }) {
  return (
    <PreviewFoundationCard title="Next manual action">
      <PreviewFoundationCopy>{nextAction.label}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{nextAction.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["manual only", `route: ${nextAction.route}`, "nothing secretly renders"]} />
    </PreviewFoundationCard>
  );
}
