"use client";

import type { CSSProperties } from "react";

export function ApplyValidationEmptyState() {
  return (
    <section style={emptyState} data-codexforge-apply-validation-empty-state="ApplyValidationEmptyState renders no giant raw JSON above fold">
      <strong>Start from a reviewed preview diff.</strong>
      <span>Missing preview routes back to Real Patch Preview. Missing approval routes back to Approved Patch Apply.</span>
    </section>
  );
}

const emptyState: CSSProperties = {
  border: "1px dashed rgba(148,163,184,0.35)",
  borderRadius: 8,
  color: "#cbd5e1",
  display: "grid",
  gap: 6,
  fontSize: 13,
  lineHeight: 1.45,
  padding: 12,
};
