"use client";

import type { CSSProperties } from "react";
import type { ApprovedPatchApplyValidationCapture } from "../index";

export function ApplyValidationCapturePanel({
  capture,
  manualResultText,
  onManualResultTextChange,
  onCopy,
}: {
  capture: ApprovedPatchApplyValidationCapture;
  manualResultText: string;
  onManualResultTextChange: (value: string) => void;
  onCopy?: (label: string, value: string) => void;
}) {
  const checklist = capture.commands.map((command) => command.command).join("\n");

  return (
    <section style={panel} data-codexforge-apply-validation-capture-panel="ApplyValidationCapturePanel renders validation capture includes npm run build npm run smoke:codexforge:server git diff --check UI can copy commands only">
      <div style={header}>
        <h3 style={title}>Validation capture</h3>
        <button type="button" style={button} onClick={() => onCopy?.("validation checklist", checklist)}>Copy validation</button>
      </div>
      <div style={commands}>
        {capture.commands.map((command) => (
          <code key={command.id} style={commandStyle}>{command.command}</code>
        ))}
      </div>
      <textarea
        style={textarea}
        value={manualResultText}
        onChange={(event) => onManualResultTextChange(event.target.value)}
        placeholder="Paste manual validation result text after running commands outside the UI."
      />
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const title: CSSProperties = { fontSize: 13, margin: 0, overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(125,211,252,0.25)", background: "rgba(14,165,233,0.12)", borderRadius: 8, color: "#dbeafe", cursor: "pointer", fontSize: 11, fontWeight: 900, padding: "7px 8px" };
const commands: CSSProperties = { display: "grid", gap: 5 };
const commandStyle: CSSProperties = { background: "rgba(2,6,23,0.72)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#bfdbfe", fontSize: 11, minWidth: 0, overflowWrap: "anywhere", padding: 7, whiteSpace: "pre-wrap" };
const textarea: CSSProperties = { background: "rgba(2,6,23,0.76)", border: "1px solid rgba(148,163,184,0.22)", borderRadius: 8, color: "#e2e8f0", font: "inherit", fontSize: 12, minHeight: 68, padding: 8, resize: "vertical" };
