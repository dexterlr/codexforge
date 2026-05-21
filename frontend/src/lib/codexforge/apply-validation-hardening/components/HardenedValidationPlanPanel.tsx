"use client";

import type { CSSProperties } from "react";
import type { HardenedValidationPlan } from "../index";

export function HardenedValidationPlanPanel({ plan, onCopy }: { plan: HardenedValidationPlan; onCopy?: (label: string, value: string) => void }) {
  const commands = plan.commands.map((command) => command.command).join("\n");
  return (
    <section style={panel} data-codexforge-hardened-validation-plan-panel="HardenedValidationPlanPanel renders validation plan includes npm run build npm run smoke:codexforge:server git diff --check maps real-coding-flow to smoke-codexforge-real-coding-flow.ps1 no auto-run">
      <div style={header}><span style={eyebrow}>Validation</span><strong>{plan.commands.length} commands</strong></div>
      <h2 style={title}>Validation plan</h2>
      <p style={copy}>Commands are copy-only. This panel does not run commands directly and does not auto-run validation.</p>
      <button type="button" style={button} onClick={() => onCopy?.("hardened validation checklist", commands)}>Copy validation checklist</button>
      <details style={details}>
        <summary>Selected commands</summary>
        <ol style={list}>{plan.commands.map((command) => <li key={`validation-command-${command.id}`}><code>{command.command}</code></li>)}</ol>
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
