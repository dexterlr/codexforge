"use client";

import type { CSSProperties } from "react";
import type { VideoPromptStyle } from "../video-prompt-builder-types";

export function VideoPromptStylePanel({ stylePlan }: { stylePlan: VideoPromptStyle }) {
  return <article style={card}><h2 style={title}>Style</h2><p style={copy}>Style: {stylePlan.style}</p><p style={copy}>Lighting: {stylePlan.lighting}</p><p style={copy}>Mood: {stylePlan.mood}</p></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
