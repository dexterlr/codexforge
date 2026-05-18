"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventReducerPreview } from "../runtime-event-executor-types";

export function RuntimeEventReducerPreviewPanel({ preview }: { preview: RuntimeEventReducerPreview }) {
  return (
    <section style={panel} data-codexforge-runtime-event-reducer-preview-panel="RuntimeEventReducerPreviewPanel renders reducer preview imports canonical graph types reducer preview does not import brain-graph">
      <strong>Runtime Event Reducer Preview</strong>
      <div style={grid}>
        <Mini label="Nodes" value={`${preview.graphBefore.nodeCount} to ${preview.graphAfter.nodeCount}`} />
        <Mini label="Edges" value={`${preview.graphBefore.edgeCount} to ${preview.graphAfter.edgeCount}`} />
      </div>
      <p style={text}>{preview.summary.join(" ")}</p>
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div style={mini}><span>{label}</span><strong>{value}</strong></div>;
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 };
const mini: CSSProperties = { border: "1px solid rgba(125,211,252,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, fontSize: 11, color: "#cbd5e1", overflowWrap: "anywhere" };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
