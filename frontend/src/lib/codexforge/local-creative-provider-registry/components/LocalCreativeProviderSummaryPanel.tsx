"use client";

import type { CSSProperties } from "react";
import type { LocalCreativeProviderSummary } from "../local-creative-provider-types";

export function LocalCreativeProviderSummaryPanel({ summary }: { summary: LocalCreativeProviderSummary }) {
  return <section style={card} data-local-creative-provider-summary-panel="LocalCreativeProviderSummaryPanel renders"><h2 style={title}>Local-first summary</h2><p style={copy}>{summary.summary}</p><p style={copy}>Providers: {summary.providerCount}. Local-first recommendations: {summary.localFirstCount}. No cloud credits are spent here.</p><p style={copy}>Next: {summary.nextAction}</p></section>;
}

const card: CSSProperties = { background: "rgba(20,83,45,0.16)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
