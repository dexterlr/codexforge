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
  background:
    "radial-gradient(720px 420px at 24% 12%, rgba(45,212,191,0.16), transparent 60%), rgba(2,6,23,0.82)",
  display: "grid",
  inset: 0,
  justifyItems: "center",
  overflowY: "auto",
  padding: "8vh min(4vw, 42px)",
  position: "fixed",
  zIndex: 80,
};

const panel: CSSProperties = {
  border: "1px solid rgba(94,234,212,0.26)",
  background:
    "linear-gradient(145deg, rgba(3,7,18,0.98), rgba(15,23,42,0.96) 56%, rgba(8,47,73,0.82))",
  borderRadius: 8,
  boxShadow: "0 34px 110px rgba(0,0,0,0.52), 0 0 34px rgba(45,212,191,0.08)",
  color: "#f8fafc",
  display: "grid",
  gap: 12,
  maxWidth: 940,
  minWidth: 0,
  padding: 14,
  width: "min(100%, 940px)",
};
