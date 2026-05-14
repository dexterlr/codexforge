"use client";

import type { CSSProperties } from "react";
import { buildArtifactReactKey, type ArtifactPreviewSet } from "@/lib/codexforge/artifact-executor";

export function ArtifactPreviewPanel({ set }: { set: ArtifactPreviewSet }) {
  return (
    <section style={panel} data-codexforge-artifact-preview-panel="ArtifactPreviewPanel renders">
      <div style={header}>
        <span style={eyebrow}>Preview panel</span>
        <strong style={badge}>no writes</strong>
      </div>
      <div style={previewGrid}>
        {set.previews.slice(0, 4).map((preview, index) => (
          <article key={buildArtifactReactKey("preview", preview.artifactId, index)} style={card}>
            <span style={type}>{preview.type}</span>
            <strong>{preview.title}</strong>
            <span style={path}>{preview.targetPlaceholderPath}</span>
            <pre style={pre}>{preview.contentPreview}</pre>
          </article>
        ))}
      </div>
      <p style={body}>
        preview-only previews are string or JSON data only; no source mutation, no command execution,
        and no external app execution.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(5,13,29,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(125,211,252,0.28)", color: "#e0f2fe", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const previewGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 12, display: "grid", gap: 7, minWidth: 0, overflow: "hidden" };
const type: CSSProperties = { color: "#bfdbfe", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const path: CSSProperties = { color: "#93c5fd", fontSize: 11, overflowWrap: "anywhere" };
const pre: CSSProperties = { margin: 0, maxHeight: 240, overflow: "auto", whiteSpace: "pre-wrap", overflowWrap: "anywhere", color: "#dbeafe", background: "rgba(2,6,23,0.72)", border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, padding: 10, fontSize: 11, lineHeight: 1.45 };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
