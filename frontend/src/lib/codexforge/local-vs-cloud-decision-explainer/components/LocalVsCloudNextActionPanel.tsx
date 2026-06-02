"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LocalVsCloudNextAction } from "../local-vs-cloud-types";

export function LocalVsCloudNextActionPanel({ nextAction }: { nextAction: LocalVsCloudNextAction }) {
  return (
    <PreviewFoundationCard title="Next safe action">
      <PreviewFoundationCopy>{nextAction.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[nextAction.label, nextAction.route, "manual only"]} />
    </PreviewFoundationCard>
  );
}
