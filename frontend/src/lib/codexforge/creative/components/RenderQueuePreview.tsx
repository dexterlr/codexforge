"use client";

import type { CSSProperties } from "react";
import type { RenderQueuePreview as RenderQueuePreviewData } from "../creative-types";
import { buildCreativeReactKey } from "../creative-types";

export function RenderQueuePreview({ queue }: { queue: RenderQueuePreviewData }) {
  return (
    <section data-codexforge-render-queue-preview style={panel}>
      <div style={header}>
        <span style={eyebrow}>Render queue preview</span>
        <span style={pill}>No render execution</span>
      </div>
      <div style={grid}>
        {queue.items.map((item, index) => (
          <article key={buildCreativeReactKey("render-queue", [item.id], index)} style={card}>
            <strong>{item.capability}</strong>
            <span style={muted}>{item.adapter}</span>
            <span style={status}>{item.status}</span>
            <p style={body}>{item.sideEffectSummary}</p>
            <span style={path}>{item.estimatedArtifactPathPlaceholder}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(250,204,21,0.18)", background: "rgba(20,14,3,0.38)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center" };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const pill: CSSProperties = { border: "1px solid rgba(250,204,21,0.26)", borderRadius: 7, padding: "6px 8px", color: "#fef3c7", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(2,6,23,0.46)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0 };
const muted: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const status: CSSProperties = { color: "#99f6e4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#e2e8f0", fontSize: 12, lineHeight: 1.45 };
const path: CSSProperties = { color: "#bfdbfe", fontSize: 11, overflowWrap: "anywhere" };
