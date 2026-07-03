"use client";

import type { CSSProperties } from "react";
import { CommandPaletteShortcutHint } from "./CommandPaletteShortcutHint";

export function CommandPaletteTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-codexforge-command-palette-trigger="CommandPaletteTrigger renders Command Palette Ctrl+K Cmd+K"
      style={trigger}
      aria-label="Open Command Palette"
    >
      <span style={label}>Command Palette</span>
      <CommandPaletteShortcutHint compact />
    </button>
  );
}

const trigger: CSSProperties = {
  alignItems: "center",
  border: "1px solid rgba(94,234,212,0.3)",
  background: "linear-gradient(135deg, rgba(20,184,166,0.16), rgba(14,165,233,0.1))",
  borderRadius: 8,
  color: "#ecfeff",
  cursor: "pointer",
  display: "inline-flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "space-between",
  minWidth: 0,
  padding: "9px 10px",
  boxShadow: "0 14px 36px rgba(20,184,166,0.08)",
};

const label: CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  overflowWrap: "anywhere",
};
