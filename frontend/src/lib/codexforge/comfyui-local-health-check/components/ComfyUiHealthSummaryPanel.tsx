"use client";

import type { CSSProperties } from "react";
import type { ComfyUiHealthSummary } from "../comfyui-health-types";

export function ComfyUiHealthSummaryPanel({ summary }: { summary: ComfyUiHealthSummary }) {
  return <section style={card}><h2 style={title}>ComfyUI in plain English</h2><p style={copy}>ComfyUI is a local creative workflow tool. It can run image and video-style workflows on your workstation after you install it, but this page only explains health readiness.</p><p style={copy}>{summary.summary}</p><p style={copy}>Next: {summary.nextAction}</p></section>;
}

const card: CSSProperties = { background: "rgba(20,83,45,0.16)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
