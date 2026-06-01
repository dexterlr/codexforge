"use client";

import type { CSSProperties } from "react";
import type { LocalVideoWorkflowSummary } from "../local-video-workflow-types";

export function LocalVideoWorkflowSummaryPanel({ summary }: { summary: LocalVideoWorkflowSummary }) {
  return <section style={card}><h2 style={title}>Workflow summary</h2><p style={copy}>{summary.summary}</p><p style={copy}>Local draft workflows: {summary.localDraftCount}. No final render starts from this catalog.</p><p style={copy}>Next: {summary.nextAction}</p></section>;
}

const card: CSSProperties = { background: "rgba(20,83,45,0.16)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
