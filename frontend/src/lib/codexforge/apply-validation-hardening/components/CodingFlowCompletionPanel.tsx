"use client";

import type { CSSProperties } from "react";
import type { CodingFlowCompletion } from "../index";

export function CodingFlowCompletionPanel({ completion, onCopy }: { completion: CodingFlowCompletion; onCopy?: (label: string, value: string) => void }) {
  return (
    <section style={panel} data-codexforge-coding-flow-completion-panel="CodingFlowCompletionPanel renders completion guidance includes git status --short git diff --stat git add git commit tag push copy completion guidance allowed">
      <div style={header}><span style={eyebrow}>Completion</span><strong>{completion.status}</strong></div>
      <h2 style={title}>Coding flow completion</h2>
      <div style={checkGrid}>{completion.checklist.map((item) => <span key={`completion-${item.id}`} style={pill}>{item.complete ? "Done" : "Open"}: {item.label}</span>)}</div>
      <button type="button" style={button} onClick={() => onCopy?.("completion guidance", completion.successGuidance.join("\n"))}>Copy completion guidance</button>
      <details style={details}>
        <summary>Commit, tag, and push guidance</summary>
        <ol style={list}>{completion.successGuidance.map((command) => <li key={`completion-guidance-${command}`}><code>{command}</code></li>)}</ol>
      </details>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.68)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 17, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const checkGrid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7 };
const pill: CSSProperties = { background: "rgba(2,6,23,0.4)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 11, fontWeight: 800, padding: "6px 7px" };
const button: CSSProperties = { background: "rgba(20,184,166,0.14)", border: "1px solid rgba(45,212,191,0.35)", borderRadius: 8, color: "#ecfeff", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "8px 10px", width: "fit-content" };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const list: CSSProperties = { margin: "8px 0 0", paddingLeft: 18 };
