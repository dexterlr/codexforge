"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { AssetDependencyHandoff } from "../asset-dependency-types";

export function AssetDependencyHandoffPanel({ handoff }: { handoff: AssetDependencyHandoff }) {
  return (
    <PreviewFoundationCard title="Copy asset checklist">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={handoff.checklist} />
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
