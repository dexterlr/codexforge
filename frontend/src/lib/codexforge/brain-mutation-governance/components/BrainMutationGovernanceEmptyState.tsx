"use client";

import type { CSSProperties } from "react";

export function BrainMutationGovernanceEmptyState() {
  return (
    <div
      style={empty}
      data-codexforge-brain-mutation-governance-empty-state="BrainMutationGovernanceEmptyState renders read-only empty governance no direct UI graph mutation"
    >
      <strong style={title}>No governance rows visible</strong>
      <span style={text}>
        Supply deterministic labels or review the default boundary registry. The console remains read-only and
        review-gated.
      </span>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const empty: CSSProperties = {
  border: "1px dashed rgba(148,163,184,0.24)",
  background: "rgba(15,23,42,0.38)",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  minWidth: 0,
  padding: 14,
};
const title: CSSProperties = { color: "#f8fafc", fontSize: 14, ...safeText };
const text: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, ...safeText };
