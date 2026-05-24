"use client";

import type { CSSProperties } from "react";
import type { ApplyCommandWriteSeparation } from "../real-apply-guard-review-types";

export function ApplyCommandWriteSeparationPanel({ separation }: { separation: ApplyCommandWriteSeparation }) {
  return (
    <section style={panel} data-codexforge-apply-command-write-separation-panel="ApplyCommandWriteSeparationPanel renders no direct run-command from UI no mixed apply+validate unsafe button no broker execution bypass validation commands copy manual by default">
      <h2 style={heading}>Command/write separation</h2>
      <span style={badge}>{separation.overallStatus}</span>
      <ul style={list}>{separation.summary.map((line) => <li key={`separation-${line}`} style={item}>{line}</li>)}</ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const heading: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const badge: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900 };
const list: CSSProperties = { display: "grid", gap: 6, margin: 0, paddingLeft: 18 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.35 };
