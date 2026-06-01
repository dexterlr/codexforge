"use client";

import type { CSSProperties } from "react";
import type { LocalGpuProfile } from "../local-machine-capability-types";

export function LocalGpuProfilePanel({ gpu }: { gpu: LocalGpuProfile }) {
  return <article style={card}><span style={tag}>Dual GPU</span><h2 style={title}>{gpu.label}</h2><p style={copy}>{gpu.gpuCount} {gpu.gpuClass} GPUs with {gpu.cooling}.</p><p style={copy}>{gpu.vramGuidance}</p><p style={copy}>{gpu.safestParallelUse}</p></article>;
}
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
