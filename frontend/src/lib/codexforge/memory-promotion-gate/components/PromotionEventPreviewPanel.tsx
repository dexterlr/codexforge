"use client";

import type { MemoryPromotedEventPreview } from "../memory-promotion-gate-types";
import { Header, List, Metric, body, panel } from "./PromotionGateInputPanel";

export function PromotionEventPreviewPanel({ preview }: { preview: MemoryPromotedEventPreview }) {
  return (
    <section style={panel} data-codexforge-promotion-event-preview-panel="PromotionEventPreviewPanel renders memory.promoted future reducer boundary preview only no appendEvent no graph mutation">
      <Header title="Event preview" state={preview.type} />
      <Metric label="Event id" value={preview.eventId} />
      <Metric label="Memory id" value={preview.memoryId} />
      <Metric label="Evidence refs" value={String(preview.evidenceRefs.length)} />
      <p style={body}>{preview.futureReducerBoundary}</p>
      <pre style={{ ...body, maxHeight: 220, overflow: "auto" }}>{JSON.stringify(preview.payloadPreview, null, 2)}</pre>
      {preview.blockedReasons.length > 0 ? <List title="Blocked" items={preview.blockedReasons} /> : null}
    </section>
  );
}
