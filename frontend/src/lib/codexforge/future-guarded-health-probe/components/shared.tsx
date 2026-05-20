"use client";

import type { CSSProperties, ReactNode } from "react";
import { buildFutureHealthProbeReactKey } from "../future-health-probe-types";

export function ProbePanel({ title, marker, children }: { title: string; marker: string; children: ReactNode }) {
  return (
    <section style={panel} data-future-health-probe-panel={marker}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  );
}

export function ProbeList({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
      <strong style={kicker}>{title}</strong>
      <ul style={list}>
        {items.map((item, index) => (
          <li key={buildFutureHealthProbeReactKey(title, item, index)}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ProbeMetric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

export const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.68)", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0, maxWidth: "100%", overflow: "hidden" };
export const titleStyle: CSSProperties = { margin: 0, fontSize: 18, lineHeight: 1.2, letterSpacing: 0, overflowWrap: "normal", wordBreak: "normal" };
export const kicker: CSSProperties = { color: "#99f6e4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
export const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5, fontSize: 13, minWidth: 0, overflowWrap: "break-word" };
export const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10, minWidth: 0 };
export const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0, overflowWrap: "break-word" };
export const pill: CSSProperties = { display: "inline-block", width: "fit-content", border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 7, padding: "4px 7px", color: "#ccfbf1", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
export const codeBox: CSSProperties = { border: "1px solid rgba(94,234,212,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, padding: 10, color: "#dbeafe", fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-wrap", overflowWrap: "break-word", overflowX: "auto", minWidth: 0 };
export const copyButton: CSSProperties = { border: "1px solid rgba(125,211,252,0.26)", background: "rgba(14,165,233,0.14)", color: "#e0f2fe", borderRadius: 8, padding: "8px 10px", fontWeight: 900, fontSize: 12, cursor: "pointer", width: "fit-content" };
export const textarea: CSSProperties = { border: "1px solid rgba(148,163,184,0.22)", background: "rgba(2,6,23,0.52)", color: "#e5e7eb", borderRadius: 8, padding: 10, minHeight: 86, resize: "vertical", width: "100%", maxWidth: "100%", fontSize: 13, lineHeight: 1.45, overflowWrap: "break-word" };
