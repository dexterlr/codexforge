"use client";

import type { CSSProperties } from "react";

export function RealApplyGuardReviewEmptyState() {
  return (
    <section style={panel} data-codexforge-real-apply-guard-review-empty-state="RealApplyGuardReviewEmptyState renders Review the apply guard empty state no auto-apply no auto-run approval required rollback preserve latest-message authority">
      <h2 style={title}>No apply request selected</h2>
      <p style={copy}>Use the default audit packet or bring a reviewed preview, approval, rollback, and validation summary. This page reviews readiness only.</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
