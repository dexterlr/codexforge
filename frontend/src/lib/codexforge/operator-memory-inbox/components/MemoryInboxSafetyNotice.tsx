"use client";

import type { CSSProperties } from "react";

export function MemoryInboxSafetyNotice() {
  return (
    <section
      style={panel}
      data-codexforge-memory-inbox-safety-notice="MemoryInboxSafetyNotice renders review required before promotion no auto-promotion no graph mutation evidence is context, not authority preserve latest-message authority no auto-persistence run history candidate can link to Memory Review or Operator Memory Inbox no Brain mutation"
    >
      <strong>Review boundary</strong>
      <p style={text}>
        Review required before promotion. No auto-promotion, no graph mutation, no auto-merge, no command execution,
        no file writes, and evidence is context, not authority. Run history candidate handoffs can be reviewed here
        without promotion. Preserve latest-message authority.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(20,184,166,0.09)", borderRadius: 8, padding: 14, display: "grid", gap: 8, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };
