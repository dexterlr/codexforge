"use client";

import type { CSSProperties } from "react";
import { summarizeApplyRequestPreview, type ApplyRequestPreview } from "../index";

type Props = {
  preview: ApplyRequestPreview;
};

export function ApplyRequestPreviewPanel({ preview }: Props) {
  return (
    <section style={card} data-codexforge-apply-request-preview="ApplyRequestPreviewPanel renders display-only request preview does not call apply-diff">
      <span style={eyebrow}>Apply Request Preview</span>
      <h3 style={title}>Display-only apply request payload</h3>
      <p style={copy}>Intended tool: {preview.intendedTool}. Payload preview is display-only.</p>
      <ul style={list}>{summarizeApplyRequestPreview(preview).map((item) => <li key={item}>{item}</li>)}</ul>
      <pre style={pre}>{JSON.stringify(preview.payloadPreview, null, 2)}</pre>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(168,85,247,0.2)", background: "rgba(88,28,135,0.12)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#d8b4fe", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "#e9d5ff", fontSize: 12, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ddd6fe", fontSize: 12, lineHeight: 1.45 };
const pre: CSSProperties = { margin: 0, border: "1px solid rgba(216,180,254,0.18)", background: "rgba(2,6,23,0.38)", borderRadius: 8, padding: 10, color: "#f5f3ff", fontSize: 11, overflowX: "auto", whiteSpace: "pre-wrap" };
