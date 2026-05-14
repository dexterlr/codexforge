"use client";

import type { CSSProperties } from "react";
import type { CreativePatchHandoff } from "../creative-types";
import { buildCreativeReactKey } from "../creative-types";

export function CreativePatchHandoffPanel({ handoff }: { handoff: CreativePatchHandoff }) {
  return (
    <section data-codexforge-creative-patch-handoff-panel style={panel}>
      <div style={header}>
        <span style={eyebrow}>Safe Patch Preview handoff</span>
        <span style={pill}>preview-only</span>
      </div>
      <p style={body}>{handoff.safePatchPreviewBoundary}</p>
      <div style={grid}>
        {handoff.items.slice(0, 6).map((item, index) => (
          <article key={buildCreativeReactKey("patch-handoff", [item.id], index)} style={card}>
            <strong>{item.label}</strong>
            <span style={muted}>{item.previewType}</span>
            <p style={prompt}>{item.prompt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(96,165,250,0.24)", background: "rgba(7,18,35,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, alignItems: "center" };
const eyebrow: CSSProperties = { color: "#bfdbfe", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const pill: CSSProperties = { border: "1px solid rgba(96,165,250,0.28)", borderRadius: 7, padding: "6px 8px", color: "#dbeafe", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#dbeafe", fontSize: 12, lineHeight: 1.45 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(2,6,23,0.44)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0 };
const muted: CSSProperties = { color: "#93c5fd", fontSize: 11 };
const prompt: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 11, lineHeight: 1.45, overflowWrap: "anywhere" };
