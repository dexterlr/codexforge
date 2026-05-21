"use client";

import type { CSSProperties } from "react";
import type { HardenedRollbackPlan } from "../index";

export function HardenedRollbackPlanPanel({ plan, onCopy }: { plan: HardenedRollbackPlan; onCopy?: (label: string, value: string) => void }) {
  const copyText = plan.options.map((option) => `${option.label}\n${option.command ?? option.detail}`).join("\n\n");
  return (
    <section style={panel} data-codexforge-hardened-rollback-plan-panel="HardenedRollbackPlanPanel renders rollback plan mentions git restore git revert copy rollback plan allowed">
      <div style={header}><span style={eyebrow}>Rollback</span><strong>{plan.ready ? "Ready" : "Not ready"}</strong></div>
      <h2 style={title}>Rollback plan</h2>
      <p style={copy}>Before apply, check git status and review diff. If validation fails, keep diff/output and route to Closed Loop.</p>
      <button type="button" style={button} onClick={() => onCopy?.("rollback plan", copyText)}>Copy rollback plan</button>
      <details style={details}>
        <summary>Rollback commands and failure handling</summary>
        <ul style={list}>{plan.options.map((option) => <li key={`rollback-${option.id}`}>{option.label}: {option.command ?? option.detail}</li>)}</ul>
      </details>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.68)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 17, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const button: CSSProperties = { background: "rgba(20,184,166,0.14)", border: "1px solid rgba(45,212,191,0.35)", borderRadius: 8, color: "#ecfeff", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "8px 10px", width: "fit-content" };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const list: CSSProperties = { margin: "8px 0 0", paddingLeft: 18 };
