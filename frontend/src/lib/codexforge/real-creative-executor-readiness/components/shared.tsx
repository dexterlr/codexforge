"use client";

import type { CSSProperties, ReactNode } from "react";
import type {
  RealCreativeReadinessAuditItem,
  RealCreativeReadinessAuditStatus,
} from "../real-creative-readiness-types";
import { buildRealCreativeReadinessReactKey } from "../real-creative-readiness-types";

export function ReadinessPanel({
  title,
  marker,
  children,
}: {
  title: string;
  marker: string;
  children: ReactNode;
}) {
  return (
    <section style={panel} data-real-creative-readiness-panel={marker}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  );
}

export function ReadinessMetric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function ReadinessList({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={listBlock}>
      <strong style={subhead}>{title}</strong>
      <ul style={list}>
        {items.map((item, index) => (
          <li key={buildRealCreativeReadinessReactKey(title, item, index)}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ReadinessAuditRows({ items }: { items: RealCreativeReadinessAuditItem[] }) {
  return (
    <div style={rows}>
      {items.map((item, index) => (
        <article key={buildRealCreativeReadinessReactKey(item.itemId, item.label, index)} style={row}>
          <div style={rowHeader}>
            <strong style={rowTitle}>{item.label}</strong>
            <span style={{ ...statusPill, ...statusStyle(item.status) }}>{item.status}</span>
          </div>
          <p style={body}>{item.detail}</p>
          <p style={muted}>{item.evidence}</p>
          <p style={muted}>Next: {item.nextStep}</p>
        </article>
      ))}
    </div>
  );
}

function statusStyle(status: RealCreativeReadinessAuditStatus): CSSProperties {
  if (status === "ready") return { borderColor: "rgba(45,212,191,0.32)", color: "#ccfbf1" };
  if (status === "warning") return { borderColor: "rgba(250,204,21,0.36)", color: "#fef3c7" };
  if (status === "needs-config") return { borderColor: "rgba(251,146,60,0.36)", color: "#fed7aa" };
  if (status === "blocker") return { borderColor: "rgba(248,113,113,0.42)", color: "#fecaca" };
  return { borderColor: "rgba(148,163,184,0.24)", color: "#cbd5e1" };
}

export const page: CSSProperties = { minHeight: 0, color: "#f8fafc", background: "transparent", padding: 0, display: "grid", gap: 16, minWidth: 0, maxWidth: "100%", fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
export const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0, maxWidth: "100%", overflow: "hidden" };
export const titleStyle: CSSProperties = { margin: 0, fontSize: 18, lineHeight: 1.2, letterSpacing: 0, overflowWrap: "normal", wordBreak: "normal" };
export const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, minWidth: 0, overflowWrap: "break-word" };
export const muted: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 12, lineHeight: 1.45, minWidth: 0, overflowWrap: "break-word" };
export const listBlock: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
export const subhead: CSSProperties = { color: "#99f6e4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
export const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5, fontSize: 13, minWidth: 0, overflowWrap: "break-word" };
export const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0, overflowWrap: "break-word" };
export const rows: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
export const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 10, display: "grid", gap: 7, minWidth: 0 };
export const rowHeader: CSSProperties = { display: "flex", alignItems: "start", justifyContent: "space-between", gap: 8, minWidth: 0 };
export const rowTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, lineHeight: 1.25, minWidth: 0, overflowWrap: "break-word" };
export const statusPill: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 7, padding: "4px 7px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", whiteSpace: "nowrap" };
export const codeStyle: CSSProperties = { border: "1px solid rgba(94,234,212,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, padding: 10, display: "grid", gap: 6, minWidth: 0, overflowX: "auto", whiteSpace: "normal", overflowWrap: "break-word" };
export const copyButton: CSSProperties = { border: "1px solid rgba(94,234,212,0.32)", background: "rgba(20,184,166,0.14)", color: "#f8fafc", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer", maxWidth: "100%", overflowWrap: "break-word" };
