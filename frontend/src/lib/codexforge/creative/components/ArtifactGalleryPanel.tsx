"use client";

import type { CSSProperties } from "react";
import type { CreativeArtifactGallery } from "../creative-types";
import { buildCreativeReactKey } from "../creative-types";

export function ArtifactGalleryPanel({ gallery }: { gallery: CreativeArtifactGallery }) {
  return (
    <section data-codexforge-artifact-gallery-panel style={panel}>
      <span style={eyebrow}>Artifact gallery</span>
      <div style={grid}>
        {gallery.artifacts.map((artifact, index) => (
          <article key={buildCreativeReactKey("creative-artifact", [artifact.artifactId], index)} style={card}>
            <span style={status}>{artifact.status}</span>
            <strong>{artifact.label}</strong>
            <span style={muted}>{artifact.type}</span>
            <span style={path}>{artifact.placeholderOutputPath}</span>
            <p style={body}>{artifact.reviewAction}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(7,12,24,0.74)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0 };
const status: CSSProperties = { color: "#99f6e4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 11 };
const path: CSSProperties = { color: "#bfdbfe", fontSize: 11, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
