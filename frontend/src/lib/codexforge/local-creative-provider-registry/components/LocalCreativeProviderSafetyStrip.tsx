"use client";

import type { CSSProperties } from "react";

export function LocalCreativeProviderSafetyStrip() {
  return <section style={strip} data-local-creative-provider-safety-strip="LocalCreativeProviderSafetyStrip renders"><strong>Safety boundary:</strong><span>No run buttons, no image generation, no real video generation, no ComfyUI workflow run, no prompt payload sent to providers, and no cloud provider API calls.</span></section>;
}

const strip: CSSProperties = { alignItems: "center", background: "rgba(15,23,42,0.72)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, color: "#dbeafe", display: "flex", flexWrap: "wrap", gap: 8, padding: 12 };
