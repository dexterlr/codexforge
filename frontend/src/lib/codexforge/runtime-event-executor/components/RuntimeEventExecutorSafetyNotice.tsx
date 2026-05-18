"use client";

import type { CSSProperties } from "react";

export function RuntimeEventExecutorSafetyNotice() {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-executor-safety="RuntimeEventExecutorSafetyNotice renders explicit approval required no direct UI graph mutation appendEvent is only allowed inside executor boundary no auto-promotion evidence is context, not authority preserve latest-message authority no auto-persistence"
    >
      <strong>Guarded Runtime Event Executor</strong>
      <p style={text}>
        Explicit approval required. No direct UI graph mutation. appendEvent is only allowed inside executor boundary.
        No auto-promotion. Evidence is context, not authority. Preserve latest-message authority.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.1)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
