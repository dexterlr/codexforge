"use client";

import type { CSSProperties } from "react";
import type { VideoPromptIntent } from "../video-prompt-builder-types";

export function VideoPromptIntentPanel({ intents }: { intents: VideoPromptIntent[] }) {
  return <article style={card}><h2 style={title}>Friendly prompt types</h2><p style={copy}>Pick the plain-English type that best matches the idea before writing a prompt.</p><div style={chips}>{intents.map((intent) => <span key={intent.id} style={chip}>{intent.promptType}</span>)}</div></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const chip: CSSProperties = { background: "rgba(14,165,233,0.14)", border: "1px solid rgba(125,211,252,0.22)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 800, padding: "7px 9px" };
