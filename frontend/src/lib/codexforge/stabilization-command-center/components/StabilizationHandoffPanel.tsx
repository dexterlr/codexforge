"use client";

import type { CSSProperties } from "react";
import { buildStabilizationStableKey, type StabilizationHandoff } from "../index";

export function StabilizationHandoffPanel({
  handoff,
  onCopyPrompt,
  onCopyValidationChecklist,
}: {
  handoff: StabilizationHandoff;
  onCopyPrompt?: (prompt: string) => void;
  onCopyValidationChecklist?: (commands: string) => void;
}) {
  return (
    <section style={panel} data-codexforge-stabilization-handoff-panel="StabilizationHandoffPanel renders inspect current state first use Safe Patch Preview for edits evidence is context, not proof no file writes without approval no command execution without approval">
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Handoff</span>
          <h2 style={heading}>Copy-only stabilization prompt</h2>
          <p style={detail}>Includes blockers, warnings, next action, and validation commands.</p>
        </div>
        <div style={buttons}>
          <button type="button" style={button} onClick={() => onCopyPrompt?.(handoff.prompt)}>Copy prompt</button>
          <button type="button" style={secondaryButton} onClick={() => onCopyValidationChecklist?.(handoff.validationCommands.join("\n"))}>Copy validation checklist</button>
        </div>
      </div>
      <div style={summaryGrid}>
        {handoff.summary.map((item) => (
          <span key={buildStabilizationStableKey("handoff-summary", item)} style={summaryItem}>{item}</span>
        ))}
      </div>
      <pre style={prompt}>{handoff.prompt}</pre>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(15,23,42,0.58)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: "4px 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const detail: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const buttons: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const button: CSSProperties = { border: "1px solid rgba(45,212,191,0.38)", background: "#5eead4", borderRadius: 8, color: "#021014", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px" };
const secondaryButton: CSSProperties = { border: "1px solid rgba(125,211,252,0.22)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", cursor: "pointer", fontSize: 12, fontWeight: 850, padding: "9px 11px" };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 8 };
const summaryItem: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.34)", borderRadius: 8, padding: 9, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const prompt: CSSProperties = { margin: 0, border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.54)", borderRadius: 8, color: "#e2e8f0", fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace", fontSize: 12, lineHeight: 1.55, maxHeight: 360, overflow: "auto", overflowWrap: "anywhere", padding: 12, whiteSpace: "pre-wrap" };
