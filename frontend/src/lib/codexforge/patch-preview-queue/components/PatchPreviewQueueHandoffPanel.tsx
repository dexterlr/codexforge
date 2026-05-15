"use client";

import type { CSSProperties } from "react";
import type { PatchPreviewQueueHandoff } from "../patch-preview-queue-types";

type Props = {
  handoff: PatchPreviewQueueHandoff;
  onCopyPrompt?: (prompt: string) => void;
};

export function PatchPreviewQueueHandoffPanel({ handoff, onCopyPrompt }: Props) {
  return (
    <section
      style={panel}
      data-codexforge-patch-preview-queue-handoff-panel="PatchPreviewQueueHandoffPanel renders handoff says inspect first handoff says produce preview diff only Safe Patch Preview"
    >
      <div style={header}>
        <div>
          <span style={eyebrow}>Selected queued preview</span>
          <h3 style={title}>Safe Patch Preview handoff</h3>
        </div>
        <button type="button" onClick={() => onCopyPrompt?.(handoff.prompt)} style={button}>
          Copy queue handoff prompt
        </button>
      </div>
      <pre style={prompt}>{handoff.prompt}</pre>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(94,234,212,0.18)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 12, display: "grid", gap: 9, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "3px 0 0", fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(94,234,212,0.34)", background: "#5eead4", color: "#021014", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const prompt: CSSProperties = { margin: 0, border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.52)", color: "#dbeafe", padding: 10, whiteSpace: "pre-wrap", fontSize: 11, lineHeight: 1.45, overflowWrap: "anywhere", maxHeight: 260, overflowY: "auto" };
