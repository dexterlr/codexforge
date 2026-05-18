"use client";

import type { CSSProperties } from "react";

export function RuntimeEventJournalSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-runtime-event-journal-safety-notice="RuntimeEventJournalSafetyNotice renders read-only no graph mutation no appendEvent from UI append-only audit evidence is context, not authority preserve latest-message authority no auto-persistence"
    >
      <strong style={title}>Read-only runtime event journal</strong>
      <p style={text}>
        This surface is read-only: no graph mutation, no appendEvent from UI, no auto-persistence, and no execution controls.
        It preserves append-only audit visibility, treats evidence is context, not authority, and preserve latest-message authority.
      </p>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const notice: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.22)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  minWidth: 0,
  padding: 12,
};
const title: CSSProperties = { color: "#ccfbf1", fontSize: 13, lineHeight: 1.3, ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, margin: 0, ...safeText };
