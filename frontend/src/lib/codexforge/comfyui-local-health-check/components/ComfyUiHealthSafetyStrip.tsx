"use client";

import type { CSSProperties } from "react";

export function ComfyUiHealthSafetyStrip() {
  return <section style={strip} data-comfyui-health-safety-strip="ComfyUiHealthSafetyStrip renders"><strong>Preview-only:</strong><span>No ComfyUI workflow run, no prompt sent, no image generation, no real video generation, no cloud provider API calls.</span></section>;
}

const strip: CSSProperties = { alignItems: "center", background: "rgba(15,23,42,0.72)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, color: "#dbeafe", display: "flex", flexWrap: "wrap", gap: 8, padding: 12 };
