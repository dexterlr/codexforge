"use client";
import type { CSSProperties } from "react";
import type { DraftRenderReadiness } from "../local-draft-render-types";
export function DraftRenderReadinessPanel({ readiness }: { readiness: DraftRenderReadiness }) { return <article style={card}><h2 style={title}>Readiness</h2><p style={copy}>Ready for later approval review: {readiness.ready ? "yes" : "no"}.</p><p style={copy}>Blockers: {readiness.blockers.length === 0 ? "none" : readiness.blockers.join(", ")}.</p><p style={copy}>Next step: {readiness.nextStep}</p></article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
