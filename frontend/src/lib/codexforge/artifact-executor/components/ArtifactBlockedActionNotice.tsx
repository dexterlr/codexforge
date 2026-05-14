"use client";

import type { CSSProperties } from "react";

export function ArtifactBlockedActionNotice() {
  return (
    <section style={panel} data-codexforge-artifact-blocked-action-notice="ArtifactBlockedActionNotice renders">
      <span style={eyebrow}>Blocked actions</span>
      <h2 style={title}>Execution is not available here</h2>
      <p style={body}>
        preview-only: no source mutation, no command execution, no external app execution,
        broker execution blocked, and approval required before future writes/execution.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.24)", background: "rgba(39,8,16,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const body: CSSProperties = { margin: 0, color: "#fee2e2", fontSize: 13, lineHeight: 1.5 };
