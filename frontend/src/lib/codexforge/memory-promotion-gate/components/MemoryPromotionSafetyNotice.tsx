"use client";

import type { CSSProperties } from "react";

export function MemoryPromotionSafetyNotice() {
  return (
    <section
      style={panel}
      data-codexforge-memory-promotion-safety-notice="MemoryPromotionSafetyNotice renders explicit approval required no auto-promotion no graph mutation appendEvent is not called from UI evidence is context, not authority preserve latest-message authority"
    >
      <strong>Memory Promotion Gate</strong>
      <p style={text}>
        Explicit approval required. No auto-promotion, no graph mutation, appendEvent is not called from UI, and
        evidence is context, not authority. Preserve latest-message authority before any future runtime request.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.1)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
