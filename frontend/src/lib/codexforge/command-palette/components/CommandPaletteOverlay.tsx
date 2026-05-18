"use client";

import type { CSSProperties, ReactNode } from "react";

export function CommandPaletteOverlay({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CodexForge Command Palette"
      data-codexforge-command-palette-overlay="CommandPaletteOverlay renders"
      style={backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div style={panel}>{children}</div>
    </div>
  );
}

const backdrop: CSSProperties = {
  alignItems: "start",
  background: "rgba(2,6,23,0.74)",
  display: "grid",
  inset: 0,
  justifyItems: "center",
  overflowY: "auto",
  padding: "8vh min(4vw, 42px)",
  position: "fixed",
  zIndex: 80,
};

const panel: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.2)",
  background: "linear-gradient(145deg, rgba(3,7,18,0.98), rgba(15,23,42,0.96))",
  borderRadius: 8,
  boxShadow: "0 28px 80px rgba(0,0,0,0.44)",
  color: "#f8fafc",
  display: "grid",
  gap: 12,
  maxWidth: 940,
  minWidth: 0,
  padding: 14,
  width: "min(100%, 940px)",
};
