"use client";

import type { CSSProperties } from "react";
import type { VideoPromptStructure } from "../video-prompt-builder-types";

export function VideoPromptStructurePanel({ structure }: { structure: VideoPromptStructure }) {
  return <article style={card}><h2 style={title}>Prompt structure</h2><p style={copy}>Subject: {structure.subject}</p><p style={copy}>Scene: {structure.scene}</p><p style={copy}>Duration target: {structure.durationTarget}</p><p style={copy}>Motion notes: {structure.motionNotes}</p></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
