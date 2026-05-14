"use client";

import type { CSSProperties } from "react";

export function BlockedRunNotice() {
  return (
    <section style={panel} data-codexforge-blocked-run-notice="BlockedRunNotice renders">
      <p style={eyebrow}>Blocked Execution</p>
      <h2 style={title}>broker execution blocked</h2>
      <p style={copy}>
        preview-only control center: approval required before execution; no desktop control/camera/trading execution.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(244,63,94,0.28)", background: "rgba(76,5,25,0.40)", borderRadius: 8, padding: 16, display: "grid", gap: 9, minWidth: 0 };
const eyebrow: CSSProperties = { margin: 0, color: "#fda4af", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, color: "#ffe4e6" };
const copy: CSSProperties = { margin: 0, color: "#fecdd3", fontSize: 13, lineHeight: 1.5 };
