"use client";

import type { CSSProperties } from "react";
import type { RealCodingFlowSummary } from "../real-coding-flow-types";

const STEPS = ["Pick a file", "Describe change", "Preview patch", "Review apply", "Run checks", "Review result"] as const;

export function CodingFlowProgressPanel({ summary }: { summary: RealCodingFlowSummary }) {
  return (
    <section style={panel} data-codexforge-coding-flow-progress-panel="CodingFlowProgressPanel renders stable key helper stable key patterns Focus Mode UX calm workflow layout markers">
      {STEPS.map((step) => <span key={`coding-flow-progress-${step}`} style={pill}>{step}</span>)}
      <strong style={summaryText}>Next: {summary.nextSafeAction}</strong>
    </section>
  );
}

const panel: CSSProperties = { alignItems: "center", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0, padding: 10 };
const pill: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, color: "#dbeafe", fontSize: 11, fontWeight: 800, padding: "6px 8px" };
const summaryText: CSSProperties = { color: "#5eead4", fontSize: 12, marginLeft: "auto" };
