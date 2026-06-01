"use client";
import type { CSSProperties } from "react";
import type { StoryboardContinuity } from "../storyboard-planner-types";
export function StoryboardContinuityPanel({ continuity }: { continuity: StoryboardContinuity }) { return <article style={card}><h2 style={title}>Continuity</h2><p style={copy}>{continuity.plainEnglish}</p><ul style={list}>{continuity.continuityNotes.map((note) => <li key={`continuity-${note}`}>{note}</li>)}</ul></article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 }; const list: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.6, margin: 0, paddingLeft: 18 };
