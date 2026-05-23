"use client";

import type { CSSProperties } from "react";
import type { LiveTrialValidationGuide } from "../coding-flow-live-trial-types";

export function LiveTrialValidationGuidePanel({ guide }: { guide: LiveTrialValidationGuide }) {
  return (
    <section style={panel} data-codexforge-live-trial-validation-guide-panel="LiveTrialValidationGuidePanel renders npm run build npm run smoke:codexforge:server git diff --check no auto-run copy commands only">
      <h2 style={title}>{guide.title}</h2>
      <div style={commands}>
        {guide.commands.map((command) => <code key={`live-trial-command-${command.commandId}`} style={commandBox}>{command.command}</code>)}
      </div>
      <details style={details}>
        <summary style={summary}>Output capture guide</summary>
        <ul style={list}>{guide.outputCaptureGuide.map((item) => <li key={`live-trial-validation-${item}`}>{item}</li>)}</ul>
      </details>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 16 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0 };
const commands: CSSProperties = { display: "grid", gap: 8 };
const commandBox: CSSProperties = { background: "rgba(2,6,23,0.7)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#e0f2fe", display: "block", fontSize: 12, overflowX: "auto", padding: "8px 10px", whiteSpace: "pre" };
const details: CSSProperties = { color: "#dbeafe", fontSize: 13 };
const summary: CSSProperties = { cursor: "pointer", fontWeight: 900 };
const list: CSSProperties = { display: "grid", gap: 6, lineHeight: 1.45, marginBottom: 0 };
