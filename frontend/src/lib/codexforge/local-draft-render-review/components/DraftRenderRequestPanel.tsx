"use client";
import type { CSSProperties } from "react";
import type { DraftRenderRequest } from "../local-draft-render-types";
export function DraftRenderRequestPanel({ request }: { request: DraftRenderRequest }) { return <article style={card}><h2 style={title}>Draft request</h2><p style={copy}>Prompt exists: yes. Storyboard exists: yes. Keyframe plan exists: yes. Workflow selected: yes.</p><p style={copy}>Duration target: {request.durationTarget}. Resolution target: {request.resolutionTarget}. Local provider planned: yes.</p><p style={copy}>Artifact plan exists: yes. Recovery path exists: yes.</p></article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
