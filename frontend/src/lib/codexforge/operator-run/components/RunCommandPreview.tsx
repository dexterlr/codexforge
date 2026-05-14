"use client";

import type { CSSProperties } from "react";
import type { OperatorRun } from "../run-types";

export function RunCommandPreview({ run }: { run: OperatorRun }) {
  return (
    <section style={panel} data-codexforge-run-command-preview="RunCommandPreview renders">
      <p style={eyebrow}>Command Preview</p>
      <h2 style={title}>Queued Run Preview</h2>
      <div style={command}>
        <span>source: {run.sourceSurface}</span>
        <span>capability: {run.capabilityId}</span>
        <span>adapter: {run.adapterId}</span>
        <span>tool: {run.toolName}</span>
      </div>
      <p style={copy}>No shell commands run from UI. No Blender/Unreal/ComfyUI execution occurs here.</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(8,13,28,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { margin: 0, color: "#f0abfc", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const command: CSSProperties = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(2,6,23,0.74)", borderRadius: 8, padding: 12, display: "grid", gap: 6, color: "#f5d0fe", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, color: "#f5d0fe", fontSize: 13 };
