"use client";

import type { CSSProperties } from "react";

export function EvidenceGroundingSafetyNotice() {
  return (
    <section
      data-codexforge-evidence-grounding-safety-notice="EvidenceGroundingSafetyNotice renders selected evidence only no hidden context injection evidence is context, not proof verify current files before edits no file mutation without Safe Patch Preview preserve latest-message authority"
      style={notice}
    >
      <strong style={title}>Grounding boundary</strong>
      <div style={grid}>
        <span>selected evidence only</span>
        <span>No hidden context injection</span>
        <span>evidence is context, not proof</span>
        <span>verify current files before edits</span>
        <span>no file mutation without Safe Patch Preview</span>
        <span>preserve latest-message authority</span>
      </div>
    </section>
  );
}

const notice: CSSProperties = { border: "1px solid rgba(250,204,21,0.22)", background: "rgba(250,204,21,0.08)", borderRadius: 8, padding: 10, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { color: "#fde68a", fontSize: 12, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, fontSize: 11, opacity: 0.86, overflowWrap: "anywhere" };
