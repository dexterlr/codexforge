"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ShotLibraryHandoff } from "../shot-library-types";

export function ShotLibraryHandoffPanel({ handoff }: { handoff: ShotLibraryHandoff }) {
  return (
    <PreviewFoundationCard title="Shot handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[handoff.handoffText]} />
    </PreviewFoundationCard>
  );
}
