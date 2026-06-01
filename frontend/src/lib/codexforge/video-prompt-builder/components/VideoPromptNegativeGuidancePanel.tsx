"use client";

import type { CSSProperties } from "react";
import type { VideoPromptNegativeGuidance } from "../video-prompt-builder-types";

export function VideoPromptNegativeGuidancePanel({ guidance }: { guidance: VideoPromptNegativeGuidance }) {
  return <article style={card}><h2 style={title}>Things to avoid</h2><p style={copy}>{guidance.plainEnglish}</p><ul style={list}>{guidance.thingsToAvoid.map((item) => <li key={`avoid-${item}`}>{item}</li>)}</ul></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.6, margin: 0, paddingLeft: 18 };
