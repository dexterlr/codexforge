"use client";

import type { CSSProperties } from "react";

export function GlobalActivityEmptyState() {
  return (
    <div style={empty} data-codexforge-global-activity-empty-state="GlobalActivityEmptyState renders">
      <strong>No activity visible</strong>
      <span>Adjust filters or continue next phase after preserving latest-message authority.</span>
    </div>
  );
}

const empty: CSSProperties = { border: "1px dashed rgba(148,163,184,0.24)", borderRadius: 8, padding: 18, display: "grid", gap: 6, color: "#cbd5e1", minWidth: 0 };
