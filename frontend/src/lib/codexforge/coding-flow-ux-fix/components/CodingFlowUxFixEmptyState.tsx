"use client";

import type { CSSProperties } from "react";

export function CodingFlowUxFixEmptyState() {
  return (
    <section style={panel} data-codexforge-coding-flow-ux-fix-empty-state="CodingFlowUxFixEmptyState renders Pick a file to start No UX friction logged Preview before applying anything no auto-apply no auto-run approval required">
      <h2 style={title}>No UX friction logged</h2>
      <p style={copy}>Run a trial, then record what felt confusing. Until then, use the default checklist to fix wording, panels, empty states, and route handoffs.</p>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
