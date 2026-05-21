"use client";

import type { CSSProperties } from "react";

export function CodingFlowEmptyState() {
  return (
    <section style={panel} data-codexforge-coding-flow-empty-state="CodingFlowEmptyState renders Pick a file Inspect it before preparing a patch Preview patch no auto-apply no auto-run">
      <h2 style={title}>Pick a file</h2>
      <p style={copy}>Start in Files when you need context. Inspect it before preparing a patch.</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px dashed rgba(125,211,252,0.28)", borderRadius: 8, color: "#dbeafe", padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: "6px 0 0" };
