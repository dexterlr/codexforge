"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { RenderQueueState } from "../local-render-queue-types";

export function RenderQueueStatePanel({ states }: { states: RenderQueueState[] }) {
  return (
    <PreviewFoundationCard title="Queue states">
      {states.map((state) => (
        <PreviewFoundationCopy key={state.id}>{state.label}: {state.plainEnglish}</PreviewFoundationCopy>
      ))}
    </PreviewFoundationCard>
  );
}
