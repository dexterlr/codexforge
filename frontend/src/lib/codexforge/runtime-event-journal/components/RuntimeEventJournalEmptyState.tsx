"use client";

import type { CSSProperties } from "react";

export function RuntimeEventJournalEmptyState() {
  return (
    <div
      style={empty}
      data-codexforge-runtime-event-journal-empty-state="RuntimeEventJournalEmptyState renders read-only empty state"
    >
      <strong style={title}>No matching journal entries</strong>
      <p style={text}>Adjust filters or search. Empty state does not create, persist, append, or mutate runtime data.</p>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const empty: CSSProperties = { border: "1px dashed rgba(148,163,184,0.22)", background: "rgba(255,255,255,0.025)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 16, textAlign: "center" };
const title: CSSProperties = { color: "#e2e8f0", fontSize: 15, lineHeight: 1.3, ...safeText };
const text: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
