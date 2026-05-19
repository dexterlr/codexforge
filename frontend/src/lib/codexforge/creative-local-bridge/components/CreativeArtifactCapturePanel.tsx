"use client";

import type { CSSProperties } from "react";
import type { CreativeArtifactCapturePlan } from "../creative-local-bridge-types";
import { buildCreativeLocalBridgeReactKey } from "../creative-local-bridge-summary";

export function CreativeArtifactCapturePanel({ plan }: { plan: CreativeArtifactCapturePlan }) {
  return (
    <section style={card} data-codexforge-creative-artifact-capture-panel="CreativeArtifactCapturePanel renders artifact capture plan includes image artifact capture plan includes video artifact capture plan includes blender-file">
      <span style={eyebrow}>Artifacts</span>
      <strong>Artifact Capture Plan</strong>
      <div style={grid}>
        {plan.items.map((item) => (
          <article key={buildCreativeLocalBridgeReactKey("artifact", item.expectedArtifactId)} style={tile}>
            <strong>{item.label}</strong>
            <p style={copy}>{item.type} / {item.sourceAdapter}</p>
            <p style={path}>{item.placeholderOutputPath}</p>
            <p style={muted}>{item.noWriteGuarantee}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(34,197,94,0.2)", background: "rgba(7,28,18,0.76)", borderRadius: 8, padding: 16, display: "grid", gap: 10 };
const eyebrow: CSSProperties = { color: "#86efac", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 8 };
const tile: CSSProperties = { border: "1px solid rgba(34,197,94,0.16)", borderRadius: 8, padding: 10, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: "6px 0 0", color: "#bbf7d0", fontSize: 13 };
const path: CSSProperties = { margin: "6px 0 0", color: "#d9f99d", fontSize: 12, overflowWrap: "anywhere" };
const muted: CSSProperties = { margin: "6px 0 0", color: "#a7f3d0", fontSize: 12, lineHeight: 1.45 };
