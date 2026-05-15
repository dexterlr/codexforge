"use client";

import type { CSSProperties } from "react";
import type { GroundedFixPreviewHandoff } from "../grounded-fix-types";

export function FixPreviewHandoffPanel({
  handoff,
  onCopyPrompt,
  onUsePrompt,
}: {
  handoff: GroundedFixPreviewHandoff;
  onCopyPrompt?: (prompt: string) => void;
  onUsePrompt?: (prompt: string) => void;
}) {
  return (
    <section data-codexforge-grounded-fix-preview-handoff-panel="FixPreviewHandoffPanel renders handoff says inspect first no command execution without approval" style={card}>
      <h3 style={title}>Safe Patch Preview handoff</h3>
      <p style={body}>Prepare Safe Patch Preview. This copies a prompt only; it does not auto-send, auto-run, or write files.</p>
      <pre style={preview}>{handoff.prompt}</pre>
      <div style={actions}>
        <button type="button" style={button} onClick={() => onUsePrompt?.(handoff.prompt)}>Use fix prompt</button>
        <button type="button" style={secondary} onClick={() => onCopyPrompt?.(handoff.prompt)}>Copy fix prompt</button>
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.1)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const preview: CSSProperties = { margin: 0, whiteSpace: "pre-wrap", maxHeight: 180, overflow: "auto", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, fontSize: 11, lineHeight: 1.45 };
const actions: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const button: CSSProperties = { color: "#021014", border: "1px solid rgba(94,234,212,0.42)", background: "#5eead4", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const secondary: CSSProperties = { color: "#f8fafc", border: "1px solid rgba(45,212,191,0.26)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 850, cursor: "pointer" };
