"use client";

import type { CSSProperties } from "react";
import type { ComfyUiHealthSafety } from "../comfyui-health-types";

export function ComfyUiHealthSafetyPanel({ safety }: { safety: ComfyUiHealthSafety }) {
  return <article style={card}><h2 style={title}>Safety</h2><ul style={list}>{safety.guarantees.map((item) => <li key={`comfyui-safe-${item}`}>{item}</li>)}</ul><p style={copy}>Blocked: {safety.blocked.join(", ")}.</p></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0, paddingLeft: 18 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
