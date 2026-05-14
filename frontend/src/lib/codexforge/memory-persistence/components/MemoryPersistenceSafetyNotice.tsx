"use client";

import type { CSSProperties } from "react";

export function MemoryPersistenceSafetyNotice() {
  return (
    <section
      style={panel}
      data-codexforge-memory-persistence-safety="MemoryPersistenceSafetyNotice renders explicit approval required no auto-promotion no direct graph mutation .codexforge/memory-events"
    >
      <span style={eyebrow}>Persistence safety</span>
      <h2 style={title}>Approved event ledger only</h2>
      <p style={copy}>
        Explicit approval required. Approved persistence writes only to .codexforge/memory-events,
        with no auto-promotion and no direct graph mutation.
      </p>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(6,78,59,0.22)", borderRadius: 8, padding: 16, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 19, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#d1fae5", fontSize: 13, lineHeight: 1.55, ...safeText };
