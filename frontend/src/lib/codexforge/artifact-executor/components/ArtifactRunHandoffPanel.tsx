"use client";

import type { CSSProperties } from "react";
import { buildArtifactReactKey, type ArtifactRunHandoff } from "@/lib/codexforge/artifact-executor";

export function ArtifactRunHandoffPanel({ handoff }: { handoff: ArtifactRunHandoff }) {
  return (
    <section style={panel} data-codexforge-artifact-run-handoff-panel="ArtifactRunHandoffPanel renders">
      <div style={header}>
        <span style={eyebrow}>Run handoff</span>
        <strong style={badge}>{handoff.previewRunPayload.mode}</strong>
      </div>
      <p style={body}>{handoff.reviewPrompt}</p>
      <div style={grid}>
        {handoff.connectedSurfaces.map((surface, index) => (
          <span key={buildArtifactReactKey("handoff-surface", surface, index)} style={pill}>{surface}</span>
        ))}
      </div>
      <p style={body}>
        Future execution stays gated through Operator Run Center and Local Bridge consent where relevant.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(6,24,22,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.30)", color: "#ccfbf1", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#ccfbf1", fontSize: 13, lineHeight: 1.5 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8 };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(15,23,42,0.58)", borderRadius: 8, padding: "9px 10px", color: "#d1fae5", fontSize: 12, fontWeight: 800, textTransform: "uppercase", textAlign: "center" };
