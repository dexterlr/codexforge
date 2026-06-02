"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { RenderQueueControl } from "../local-render-queue-types";

export function RenderQueueControlPanel({ controls }: { controls: RenderQueueControl[] }) {
  return (
    <PreviewFoundationCard title="Preview controls">
      {controls.map((control) => (
        <PreviewFoundationCopy key={control.id}>{control.label}: {control.plainEnglish}</PreviewFoundationCopy>
      ))}
    </PreviewFoundationCard>
  );
}
