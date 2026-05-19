import type { CSSProperties } from "react";
import type { BlenderPythonPreview } from "../blender-adapter-types";
import { buildBlenderAdapterReactKey } from "../index";

export function BlenderPythonPreviewPanel({ preview }: { preview: BlenderPythonPreview }) {
  const copyPython = () => {
    void navigator.clipboard?.writeText(preview.scriptText);
  };

  return (
    <section style={panel} data-blender-python-preview-panel="BlenderPythonPreviewPanel renders">
      <div style={header}>
        <h2 style={title}>BlenderPythonPreviewPanel renders</h2>
        <button type="button" style={button} onClick={copyPython}>Copy Python preview</button>
      </div>
      <div style={badgeRow}>
        <span>copy Python preview allowed</span>
        <span>preview only comment</span>
        <span>create materials</span>
        <span>create objects</span>
        <span>create lights</span>
        <span>configure render settings</span>
      </div>
      <pre style={code}>{preview.scriptText}</pre>
      <ul style={list}>{preview.safetySummary.map((item, index) => <li key={buildBlenderAdapterReactKey("python", item, index)}>{item}</li>)}</ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(8,13,28,0.9)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const button: CSSProperties = { border: "1px solid rgba(94,234,212,0.32)", background: "rgba(20,184,166,0.16)", color: "#ccfbf1", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const badgeRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, color: "#a7f3d0", fontSize: 11, fontWeight: 800, textTransform: "uppercase" };
const code: CSSProperties = { margin: 0, maxHeight: 420, overflow: "auto", whiteSpace: "pre-wrap", overflowWrap: "anywhere", border: "1px solid rgba(148,163,184,0.18)", background: "#020617", borderRadius: 8, padding: 12, color: "#dbeafe", fontSize: 12, lineHeight: 1.45 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5 };
