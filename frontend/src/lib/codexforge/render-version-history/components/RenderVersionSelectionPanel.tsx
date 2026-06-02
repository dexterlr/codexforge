"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { RenderVersionSelection } from "../render-version-history-types";

export function RenderVersionSelectionPanel({ selection }: { selection: RenderVersionSelection }) {
  return (
    <PreviewFoundationCard title="Latest version">
      <PreviewFoundationCopy>{selection.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`selected: ${selection.selectedVersionId}`, `latest: ${selection.latestVersionId}`, "manual review required"]} />
    </PreviewFoundationCard>
  );
}
