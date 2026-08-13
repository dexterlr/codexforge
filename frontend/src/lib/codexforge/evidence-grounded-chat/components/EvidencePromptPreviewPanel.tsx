"use client";

import type { CSSProperties } from "react";
import type { EvidenceGroundedChatPrompt } from "../evidence-grounded-chat-types";

type EvidencePromptPreviewPanelProps = {
  prompt: EvidenceGroundedChatPrompt;
  onCopyPrompt?: (prompt: string) => void;
  onUsePrompt?: (prompt: string) => void;
};

export function EvidencePromptPreviewPanel({ prompt, onCopyPrompt, onUsePrompt }: EvidencePromptPreviewPanelProps) {
  const ready = prompt.selectedEvidenceIds.length > 0;
  return (
    <section data-codexforge-evidence-prompt-preview-panel="EvidencePromptPreviewPanel renders prompt says use context, not proof prompt says verify current files prompt says do not write files without Safe Patch Preview" style={panel}>
      <div style={top}>
        <strong>Prompt preview</strong>
        <span style={pill}>{prompt.selectedEvidenceIds.length} evidence refs</span>
      </div>
      <pre style={pre}>{prompt.prefix}</pre>
      <div style={buttons}>
        {ready && onUsePrompt ? (
          <button type="button" style={button} onClick={() => onUsePrompt(prompt.prefix)}>
            Use evidence prompt
          </button>
        ) : null}
        {ready && onCopyPrompt ? (
          <button type="button" style={secondaryButton} onClick={() => onCopyPrompt(prompt.prefix)}>
            Copy evidence prompt
          </button>
        ) : null}
      </div>
      {!ready ? <p style={empty}>No prompt action is available until reviewed evidence is selected.</p> : null}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, display: "grid", gap: 8, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.22)", borderRadius: 8, padding: "4px 7px", fontSize: 11, fontWeight: 850 };
const pre: CSSProperties = { margin: 0, maxHeight: 220, overflow: "auto", whiteSpace: "pre-wrap", fontSize: 11, lineHeight: 1.5, border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, padding: 8, overflowWrap: "anywhere" };
const buttons: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const button: CSSProperties = { border: "1px solid rgba(94,234,212,0.42)", background: "#5eead4", color: "#021014", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const secondaryButton: CSSProperties = { border: "1px solid rgba(125,211,252,0.22)", background: "rgba(14,165,233,0.1)", color: "#dbeafe", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 850, cursor: "pointer" };
const empty: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, color: "#fef3c7", overflowWrap: "anywhere" };
