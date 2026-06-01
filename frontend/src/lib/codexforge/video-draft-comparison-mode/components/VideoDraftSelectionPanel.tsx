"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftSelection } from "../video-draft-comparison-types";

export function VideoDraftSelectionPanel({ selection }: { selection: VideoDraftSelection }) {
  return (
    <PreviewFoundationCard title="Selection">
      <PreviewFoundationCopy>{selection.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`Decision: ${selection.decision}`, `Selected draft: ${selection.selectedDraftId}`, "Manual review required"]} />
    </PreviewFoundationCard>
  );
}
