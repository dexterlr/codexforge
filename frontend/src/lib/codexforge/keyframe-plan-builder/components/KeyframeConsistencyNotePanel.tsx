"use client";
import type { CSSProperties } from "react";
import type { KeyframeConsistencyNote } from "../keyframe-plan-types";
export function KeyframeConsistencyNotePanel({ consistency }: { consistency: KeyframeConsistencyNote }) { return <article style={card}><h2 style={title}>Consistency</h2><p style={copy}>{consistency.plainEnglish}</p><ul style={list}>{consistency.notes.map((note) => <li key={`keyframe-consistency-${note}`}>{note}</li>)}</ul></article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 }; const list: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.6, margin: 0, paddingLeft: 18 };
