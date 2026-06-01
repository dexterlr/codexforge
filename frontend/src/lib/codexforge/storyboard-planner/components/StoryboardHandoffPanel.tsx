"use client";
import type { CSSProperties } from "react";
import type { StoryboardHandoff } from "../storyboard-planner-types";
export function StoryboardHandoffPanel({ handoff }: { handoff: StoryboardHandoff }) { return <article style={card}><h2 style={title}>Copy handoff</h2><p style={copy}>Copy storyboard allowed: {handoff.storyboardText}</p><p style={copy}>Copy keyframe handoff allowed: {handoff.keyframeHandoff}</p><p style={copy}>{handoff.nextStep}</p></article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
