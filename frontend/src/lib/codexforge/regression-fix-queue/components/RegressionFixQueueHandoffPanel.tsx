"use client";

import type { CSSProperties } from "react";
import type { RegressionFixQueueHandoff } from "../regression-fix-queue-types";

type Props = {
  handoff: RegressionFixQueueHandoff;
  onCopyPrompt?: (prompt: string) => void;
};

export function RegressionFixQueueHandoffPanel({ handoff, onCopyPrompt }: Props) {
  return (
    <section
      style={panel}
      data-codexforge-regression-fix-queue-handoff-panel="RegressionFixQueueHandoffPanel renders handoff says preview diff only handoff says no file writes without approval handoff says no command execution without approval Safe Patch Preview Preview Diff Composer"
    >
      <div style={header}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Selected fix candidate</span>
          <h3 style={title}>Safe handoff prompt</h3>
        </div>
        <button type="button" onClick={() => onCopyPrompt?.(handoff.prompt)} style={button}>
          Copy fix queue prompt
        </button>
      </div>
      <pre style={prompt}>{handoff.prompt}</pre>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(20,184,166,0.08)", border: "1px solid rgba(94,234,212,0.18)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const header: CSSProperties = { alignItems: "flex-start", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere", textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 15, letterSpacing: 0, margin: "3px 0 0", overflowWrap: "anywhere" };
const button: CSSProperties = { background: "#5eead4", border: "1px solid rgba(94,234,212,0.34)", borderRadius: 8, color: "#021014", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "8px 10px" };
const prompt: CSSProperties = { background: "rgba(2,6,23,0.52)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#dbeafe", fontSize: 11, lineHeight: 1.45, margin: 0, maxHeight: 260, overflowWrap: "anywhere", overflowY: "auto", padding: 10, whiteSpace: "pre-wrap" };
