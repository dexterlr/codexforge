import type { CSSProperties } from "react";
import type { RealPatchPreviewHandoff } from "../real-patch-preview-types";

export function PatchPreviewHandoffPanel({
  handoff,
  onCopyReviewPrompt,
  onCopyApplyGatePrompt,
}: {
  handoff: RealPatchPreviewHandoff | null;
  onCopyReviewPrompt: () => void;
  onCopyApplyGatePrompt: () => void;
}) {
  return (
    <section
      style={panel}
      data-codexforge-patch-preview-handoff-panel="PatchPreviewHandoffPanel renders Copy patch review prompt Copy apply-gate handoff Patch Application Gate inspect first"
    >
      <div style={eyebrow}>Patch Preview Handoff</div>
      {handoff ? (
        <>
          <p style={copy}>{handoff.summary}</p>
          <div style={buttons}>
            <button type="button" onClick={onCopyReviewPrompt} style={button}>
              Copy patch review prompt
            </button>
            <button type="button" onClick={onCopyApplyGatePrompt} style={button}>
              Copy apply-gate handoff
            </button>
          </div>
          <pre style={pre}>{handoff.reviewPrompt}</pre>
        </>
      ) : (
        <p style={copy}>Handoff prompts appear after preparing preview-only artifacts.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "rgba(8,47,73,0.24)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const eyebrow: CSSProperties = { color: "#99f6e4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.45, margin: 0, overflowWrap: "anywhere" };
const buttons: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const button: CSSProperties = { background: "rgba(20,184,166,0.16)", border: "1px solid rgba(45,212,191,0.28)", borderRadius: 8, color: "#ccfbf1", cursor: "pointer", fontSize: 12, fontWeight: 850, padding: "9px 10px" };
const pre: CSSProperties = { background: "rgba(2,6,23,0.74)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, color: "#dbeafe", fontSize: 11, lineHeight: 1.45, margin: 0, maxHeight: 240, overflow: "auto", overflowWrap: "anywhere", padding: 10, whiteSpace: "pre-wrap" };
