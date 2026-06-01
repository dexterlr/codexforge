"use client";
import type { CSSProperties } from "react";
export function StoryboardSafetyStrip() { return <section style={strip}><strong>Storyboard only.</strong><span>No render button, no workflow run, no image generation, no provider calls.</span></section>; }
const strip: CSSProperties = { alignItems: "center", background: "rgba(20,83,45,0.28)", border: "1px solid rgba(74,222,128,0.22)", borderRadius: 8, color: "#dcfce7", display: "flex", flexWrap: "wrap", gap: 8, padding: 12 };
