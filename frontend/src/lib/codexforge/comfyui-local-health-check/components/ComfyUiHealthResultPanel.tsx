"use client";

import type { CSSProperties } from "react";
import type { ComfyUiHealthResult } from "../comfyui-health-types";

export function ComfyUiHealthResultPanel({ result }: { result: ComfyUiHealthResult }) {
  return <article style={card}><h2 style={title}>Current result</h2><p style={badge}>{result.status}</p><p style={copy}>{result.meaning}</p></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const badge: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
