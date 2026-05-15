"use client";

import type { CSSProperties } from "react";
import type { BrainRecallSummary } from "../brain-recall-types";

export function BrainRecallSummaryPanel({ summary }: { summary: BrainRecallSummary }) {
  return (
    <section style={panel}>
      <strong>Recall summary</strong>
      <div style={stats}>
        <span>{summary.resultCount} results</span>
        <span>{summary.topResult ? summary.topResult.title : "No top result"}</span>
      </div>
      <p style={body}>{summary.safeHandoffSummary}</p>
      {summary.riskHints.length || summary.contradictionHints.length ? (
        <p style={body}>
          Risk and contradiction hints found: {[...summary.riskHints, ...summary.contradictionHints].slice(0, 3).join(" | ")}
        </p>
      ) : null}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.44)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const stats: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12, opacity: 0.76, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.8, overflowWrap: "anywhere" };
