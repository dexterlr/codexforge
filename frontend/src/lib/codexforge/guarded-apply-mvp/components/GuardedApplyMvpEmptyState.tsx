"use client";

import type { CSSProperties } from "react";

export function GuardedApplyMvpEmptyState() {
  return (
    <section style={panel} data-codexforge-guarded-apply-mvp-empty="GuardedApplyMvpEmptyState renders">
      <h2 style={title}>Review apply request</h2>
      <p style={copy}>Start with one selected file and one preview diff. Copy handoffs only; this screen does not apply changes.</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px dashed rgba(125,211,252,0.28)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.55)" };
const title: CSSProperties = { fontSize: 18, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: "8px 0 0" };
