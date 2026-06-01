"use client";
import type { CSSProperties } from "react";
export function ProviderConnectionTestSafetyStrip() { return <section style={strip}><strong>No provider call buttons</strong><span>This page explains connection tests. It does not call cloud providers, send prompts, or collect secrets.</span></section>; }
const strip: CSSProperties = { border: "1px solid rgba(251,191,36,0.28)", borderRadius: 8, background: "rgba(120,53,15,0.18)", color: "#fde68a", display: "grid", gap: 4, padding: 12, fontSize: 13 };
