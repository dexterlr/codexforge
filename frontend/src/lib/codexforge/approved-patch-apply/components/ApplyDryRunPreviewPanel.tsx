"use client";

import type { CSSProperties } from "react";
import type { ApprovedPatchApplyDryRunPreview } from "../index";

export function ApplyDryRunPreviewPanel({ preview }: { preview: ApprovedPatchApplyDryRunPreview }) {
  return (
    <section style={panel} data-codexforge-apply-dry-run-preview-panel="ApplyDryRunPreviewPanel renders dry-run preview says does not write files missing before-text ambiguous hunks multi-file mismatch risky path">
      <h3 style={title}>Dry-run preview</h3>
      <div style={strip}>Status: {preview.status} | Does not write files: {String(preview.doesNotWriteFiles)}</div>
      <ul style={list}>{preview.summary.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const title: CSSProperties = { fontSize: 13, margin: 0, overflowWrap: "anywhere" };
const strip: CSSProperties = { color: "#bfdbfe", fontSize: 12, fontWeight: 800, overflowWrap: "anywhere" };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, paddingLeft: 18 };
