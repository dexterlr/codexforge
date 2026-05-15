"use client";

import type { CSSProperties } from "react";
import type { DiffApprovalBoundary } from "../preview-diff-composer-types";

type Props = {
  boundary: DiffApprovalBoundary;
};

export function DiffApprovalBoundaryPanel({ boundary }: Props) {
  return (
    <section
      style={card}
      data-codexforge-preview-diff-composer-approval="DiffApprovalBoundaryPanel renders current file content is authority evidence is context, not proof no file writes without approval Safe Patch Preview"
    >
      <span style={eyebrow}>Approval Boundary</span>
      <div style={grid}>
        <span>Apply blocked</span>
        <strong>{String(boundary.applyBlocked)}</strong>
        <span>Write blocked</span>
        <strong>{String(boundary.writeBlocked)}</strong>
        <span>Command execution blocked</span>
        <strong>{String(boundary.commandExecutionBlocked)}</strong>
      </div>
      <ul style={list}>{boundary.summary.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(251,146,60,0.22)", background: "rgba(154,52,18,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fdba74", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "5px 10px", fontSize: 12, color: "#ffedd5" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fed7aa", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
