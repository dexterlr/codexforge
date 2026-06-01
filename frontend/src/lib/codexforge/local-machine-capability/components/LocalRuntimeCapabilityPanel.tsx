"use client";

import type { CSSProperties } from "react";
import type { LocalRuntimeCapability } from "../local-machine-capability-types";

export function LocalRuntimeCapabilityPanel({ runtime }: { runtime: LocalRuntimeCapability }) {
  return <article style={card}><span style={tag}>Runtime fit</span><h2 style={title}>Local-first posture</h2><p style={copy}>Recommended: {runtime.localFirstRecommended ? "yes" : "manual review"}.</p><ul style={list}>{runtime.strengths.map((item) => <li key={item}>{item}</li>)}</ul><p style={copy}>{runtime.blocked}</p></article>;
}
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.5 };
