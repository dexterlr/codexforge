"use client";

import type { CSSProperties, ReactNode } from "react";
import { buildCreativeExecutorReactKey } from "../guarded-creative-executor-types";

export function ExecutorMetric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function ExecutorList({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
      <strong style={{ fontSize: 12, textTransform: "uppercase", color: "#99f6e4" }}>{title}</strong>
      <ul style={list}>
        {items.map((item, index) => (
          <li key={buildCreativeExecutorReactKey(title, item, index)}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ExecutorPanel({ children, marker }: { children: ReactNode; marker: string }) {
  return <section style={panel} data-creative-executor-panel={marker}>{children}</section>;
}

export const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0, maxWidth: "100%", overflow: "hidden" };
export const titleStyle: CSSProperties = { margin: 0, fontSize: 18, lineHeight: 1.2, letterSpacing: 0, overflowWrap: "normal", wordBreak: "normal" };
export const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5, fontSize: 13, minWidth: 0, overflowWrap: "break-word" };
export const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0, overflowWrap: "break-word" };
export const codeStyle: CSSProperties = { border: "1px solid rgba(94,234,212,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, padding: 10, display: "grid", gap: 6, minWidth: 0, overflowX: "auto", whiteSpace: "normal", overflowWrap: "break-word" };
export const pill: CSSProperties = { display: "inline-block", width: "fit-content", border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 7, padding: "4px 7px", color: "#ccfbf1", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
