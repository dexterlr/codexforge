"use client";

import type { CSSProperties } from "react";
import type { CodingFlowValidationCopyFix } from "../coding-flow-ux-fix-types";

export function CodingFlowValidationCopyFixPanel({ fix, onCopy }: { fix: CodingFlowValidationCopyFix; onCopy: (label: string, value: string) => void }) {
  const payload = [...fix.guidance, "", ...fix.checks.map((check) => `${check.label}: ${check.commandCopy}`)].join("\n");
  return (
    <section style={panel} data-codexforge-coding-flow-validation-copy-fix-panel="CodingFlowValidationCopyFixPanel renders validation copy says Copy these checks Run them in your terminal Paste the output back no auto-run">
      <div style={header}>
        <h2 style={title}>{fix.title}</h2>
        <button type="button" style={button} onClick={() => onCopy("validation copy", payload)}>Copy simplified validation copy</button>
      </div>
      <div style={grid}>
        {fix.guidance.map((line) => <strong key={`validation-guidance-${line}`} style={lineStyle}>{line}</strong>)}
      </div>
      <details style={details}>
        <summary style={summary}>Checks to copy</summary>
        <div style={grid}>
          {fix.checks.map((check) => <span key={check.id} style={small}>{check.label}: {check.meaning}</span>)}
        </div>
      </details>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", minWidth: 0 };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const button: CSSProperties = { background: "#5eead4", border: 0, borderRadius: 8, color: "#042f2e", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px" };
const grid: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const lineStyle: CSSProperties = { color: "#dbeafe", fontSize: 13 };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const summary: CSSProperties = { cursor: "pointer", fontWeight: 900 };
const small: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.35 };
