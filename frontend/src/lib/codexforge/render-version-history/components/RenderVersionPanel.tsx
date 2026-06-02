"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { RenderVersion } from "../render-version-history-types";

export function RenderVersionPanel({ versions }: { versions: RenderVersion[] }) {
  return (
    <PreviewFoundationCard title="Version records">
      <PreviewFoundationCopy>Each version says what kind of output it represents and whether it is the latest. There is no fake playback.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={versions.map((version) => `${version.label}: ${version.kind}${version.isLatest ? " latest" : ""}`)} />
    </PreviewFoundationCard>
  );
}
