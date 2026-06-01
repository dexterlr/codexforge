"use client";
import type { CSSProperties } from "react";
import type { StoryboardShotTiming } from "../storyboard-planner-types";
export function StoryboardShotTimingPanel({ timings }: { timings: StoryboardShotTiming[] }) { return <article style={card}><h2 style={title}>Timing</h2>{timings.map((timing) => <p key={timing.id} style={copy}>Shot {timing.order}: {timing.durationTarget}. {timing.timingNote}</p>)}</article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
