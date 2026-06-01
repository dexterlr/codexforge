"use client";

import type { CSSProperties } from "react";

export function LocalCreativeProviderEmptyState() {
  return <section style={card} data-local-creative-provider-empty-state="LocalCreativeProviderEmptyState renders"><h2 style={title}>Nothing runs yet</h2><p style={copy}>This registry explains what local creative providers are. The operator still installs tools, reviews health, chooses a workflow, and approves any future execution separately.</p></section>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: "0 0 8px" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
