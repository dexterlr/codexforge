"use client";

import type { CSSProperties } from "react";
import type { MemoryPromotionGateInput, MemoryPromotionGateInputValidation } from "../memory-promotion-gate-types";

export function PromotionGateInputPanel({ input, validation }: { input: MemoryPromotionGateInput; validation: MemoryPromotionGateInputValidation }) {
  return (
    <section style={panel} data-codexforge-promotion-gate-input-panel="PromotionGateInputPanel renders stable key helper promotion gate input no auto-promotion no graph mutation">
      <Header title="Gate input" state={validation.valid ? "valid" : "blocked"} />
      <Metric label="Inbox card" value={input.inboxCardId} />
      <Metric label="Kind" value={input.memoryKind} />
      <Metric label="Review" value={input.reviewState} />
      <Metric label="Evidence" value={String(input.evidenceSnippets.length)} />
      <p style={body}>{input.proposedMemoryText}</p>
      {validation.blockedReasons.length > 0 ? <List title="Blocked" items={validation.blockedReasons} /> : null}
      {validation.warnings.length > 0 ? <List title="Warnings" items={validation.warnings} /> : null}
    </section>
  );
}

export function Header({ title, state }: { title: string; state: string }) {
  return <div style={header}><strong>{title}</strong><span style={pill}>{state}</span></div>;
}

export function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span style={labelStyle}>{label}</span><strong style={valueStyle}>{value}</strong></div>;
}

export function List({ title, items }: { title: string; items: readonly string[] }) {
  return <div style={list}><span style={labelStyle}>{title}</span>{items.map((item) => <span key={item} style={itemStyle}>{item}</span>)}</div>;
}

export const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 10, minWidth: 0 };
export const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
export const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(20,184,166,0.1)", color: "#ccfbf1", borderRadius: 999, padding: "4px 8px", fontSize: 11, fontWeight: 850, overflowWrap: "anywhere" };
export const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, padding: 8, display: "grid", gap: 4, minWidth: 0 };
export const labelStyle: CSSProperties = { color: "#94a3b8", fontSize: 11, fontWeight: 850, textTransform: "uppercase", overflowWrap: "anywhere" };
export const valueStyle: CSSProperties = { color: "#e2e8f0", fontSize: 13, lineHeight: 1.35, overflowWrap: "anywhere" };
export const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
export const list: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
export const itemStyle: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.35, overflowWrap: "anywhere" };
