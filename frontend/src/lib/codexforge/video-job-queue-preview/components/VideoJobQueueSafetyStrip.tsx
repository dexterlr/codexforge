"use client";

import type { CSSProperties } from "react";

export function VideoJobQueueSafetyStrip() {
  return <section style={strip}><strong>No render starts here:</strong><span>No unsafe execution buttons, no real video generation, no image generation, no ComfyUI workflow run, no prompt payload sent to providers, no cloud provider API calls.</span></section>;
}

const strip: CSSProperties = { alignItems: "center", background: "rgba(15,23,42,0.72)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, color: "#dbeafe", display: "flex", flexWrap: "wrap", gap: 8, padding: 12 };
