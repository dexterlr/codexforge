"use client";

import type { CSSProperties } from "react";
import type { GuardedApplyMvpBoundary } from "../guarded-apply-mvp-types";

export function GuardedApplyMvpBoundaryPanel({ boundary }: { boundary: GuardedApplyMvpBoundary }) {
  return (
    <section style={panel} data-codexforge-guarded-apply-mvp-boundary="GuardedApplyMvpBoundaryPanel renders request-ready policy-gated executionAllowed false Do not fabricate success Do not auto-apply">
      <div style={eyebrow}>Boundary</div>
      <h2 style={title}>{boundary.status}</h2>
      <p style={copy}>{boundary.boundaryNotes[0]}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
