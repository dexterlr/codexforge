"use client";

import type { CSSProperties } from "react";
import { buildStabilizationStableKey, type StabilizationSignal, type StabilizationSignalSummary } from "../index";

export function StabilizationSignalPanel({
  signals,
  summary,
}: {
  signals: readonly StabilizationSignal[];
  summary: StabilizationSignalSummary;
}) {
  return (
    <section style={panel} data-codexforge-stabilization-signal-panel="StabilizationSignalPanel renders">
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Signals</span>
          <h2 style={heading}>Verification to posture</h2>
        </div>
        <span style={badge}>{summary.reviewRequiredCount} review</span>
      </div>
      <div style={list}>
        {signals.map((signal) => (
          <article key={buildStabilizationStableKey("signal", signal.id)} style={item}>
            <div style={row}>
              <strong style={title}>{signal.title}</strong>
              <span style={severity}>{signal.severity}</span>
            </div>
            <p style={detail}>{signal.detail}</p>
            <div style={meta}>
              <span>source: {signal.source}</span>
              <span>surface: {signal.relatedSurface}</span>
              <span>{signal.recommendedAction}</span>
            </div>
            {signal.relatedFiles.length > 0 ? (
              <div style={files}>
                {signal.relatedFiles.map((file) => (
                  <span key={buildStabilizationStableKey("signal-file", signal.id, file)} style={filePill}>{file}</span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(96,165,250,0.2)", background: "rgba(30,64,175,0.12)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const badge: CSSProperties = { border: "1px solid rgba(96,165,250,0.28)", background: "rgba(96,165,250,0.1)", borderRadius: 8, padding: "6px 8px", color: "#dbeafe", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const list: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const item: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.38)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start", minWidth: 0 };
const title: CSSProperties = { overflowWrap: "anywhere" };
const severity: CSSProperties = { color: "#bfdbfe", fontSize: 10, fontWeight: 900, textTransform: "uppercase", whiteSpace: "nowrap" };
const detail: CSSProperties = { margin: 0, color: "#dbeafe", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
const meta: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, color: "#cbd5e1", fontSize: 11, lineHeight: 1.35, minWidth: 0, overflowWrap: "anywhere" };
const files: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const filePill: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: "5px 7px", fontSize: 11, overflowWrap: "anywhere" };
