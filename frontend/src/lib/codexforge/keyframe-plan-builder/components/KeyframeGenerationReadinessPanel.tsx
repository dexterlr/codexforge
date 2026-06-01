"use client";
import type { CSSProperties } from "react";
import type { KeyframeGenerationReadiness } from "../keyframe-plan-types";
export function KeyframeGenerationReadinessPanel({ readiness }: { readiness: KeyframeGenerationReadiness }) { return <article style={card}><h2 style={title}>Generation readiness</h2><p style={copy}>{readiness.plainEnglish}</p><p style={copy}>Readiness status: {readiness.status}. Approval required later: yes. Image generation allowed now: no. Provider calls allowed: no.</p><p style={copy}>Other statuses: needs-prompt, ready-for-review, ready-for-local-image-generation-later, blocked, not-needed.</p></article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
