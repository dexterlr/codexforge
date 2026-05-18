"use client";

import type { CSSProperties } from "react";

export function CommandPaletteEmptyState() {
  return (
    <div
      data-codexforge-command-palette-empty-state="CommandPaletteEmptyState renders"
      style={empty}
    >
      <strong style={title}>No matching safe command</strong>
      <p style={body}>Try route, validation, patch preview, regression, memory, or safety.</p>
    </div>
  );
}

const empty: CSSProperties = {
  border: "1px dashed rgba(148,163,184,0.2)",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  minWidth: 0,
  padding: 18,
  textAlign: "center",
};

const title: CSSProperties = {
  color: "#f8fafc",
  fontSize: 14,
  overflowWrap: "anywhere",
};

const body: CSSProperties = {
  color: "#94a3b8",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};
