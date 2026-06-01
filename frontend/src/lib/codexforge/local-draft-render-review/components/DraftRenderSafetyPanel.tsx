"use client";
import type { CSSProperties } from "react";
import type { DraftRenderSafety } from "../local-draft-render-types";
export function DraftRenderSafetyPanel({ safety }: { safety: DraftRenderSafety }) { return <article style={card}><h2 style={title}>Safety</h2><p style={copy}>{safety.plainEnglish}</p><p style={copy}>No cloud spend: yes. Approval required: yes. No auto-run: yes. ComfyUI call allowed: no. Provider calls allowed: no.</p></article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
