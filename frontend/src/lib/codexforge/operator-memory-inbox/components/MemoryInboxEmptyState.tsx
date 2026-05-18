"use client";

import type { CSSProperties } from "react";

export function MemoryInboxEmptyState() {
  return (
    <section style={panel} data-codexforge-memory-inbox-empty-state="MemoryInboxEmptyState renders">
      <strong>No memory inbox cards</strong>
      <p style={text}>Signals can be adapted into local review cards, but nothing is auto-persisted or auto-promoted.</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 18, display: "grid", gap: 8, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };
