"use client";
import type { CSSProperties } from "react";
export function LocalDraftRenderSafetyStrip() { return <section style={strip}><strong>Review only.</strong><span>No render button, no ComfyUI call, no provider calls, no local workflow run, no cloud spend.</span></section>; }
const strip: CSSProperties = { alignItems: "center", background: "rgba(20,83,45,0.28)", border: "1px solid rgba(74,222,128,0.22)", borderRadius: 8, color: "#dcfce7", display: "flex", flexWrap: "wrap", gap: 8, padding: 12 };
