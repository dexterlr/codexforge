"use client";

import type { CSSProperties } from "react";
import type { Storyboard } from "../creative-types";
import { buildCreativeReactKey } from "../creative-types";

export function StoryboardPanel({ storyboard }: { storyboard: Storyboard }) {
  return (
    <section data-codexforge-storyboard-panel style={panel}>
      <span style={eyebrow}>Storyboard</span>
      <h2 style={title}>{storyboard.title}</h2>
      <div style={shotGrid}>
        {storyboard.shots.map((shot, index) => (
          <article key={buildCreativeReactKey("storyboard-shot", [shot.id], index)} style={shotCard}>
            <span style={shotNumber}>Shot {shot.shotNumber}</span>
            <strong>{shot.camera}</strong>
            <span style={muted}>{shot.movement} / {shot.durationEstimate}</span>
            <p style={body}>{shot.visualDescription}</p>
            <span style={prompt}>{shot.promptHint}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.58)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const eyebrow: CSSProperties = { color: "#a7f3d0", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const shotGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 10 };
const shotCard: CSSProperties = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 12, display: "grid", gap: 7, minWidth: 0 };
const shotNumber: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12 };
const body: CSSProperties = { margin: 0, color: "#e2e8f0", fontSize: 12, lineHeight: 1.45 };
const prompt: CSSProperties = { color: "#fef3c7", fontSize: 11, overflowWrap: "anywhere" };
