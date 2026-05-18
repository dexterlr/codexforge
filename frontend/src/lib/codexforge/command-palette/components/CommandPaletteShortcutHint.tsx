"use client";

import type { CSSProperties } from "react";
import { getCodexForgeCommandPaletteShortcutLabel } from "../command-shortcuts";

export function CommandPaletteShortcutHint({ compact = false }: { compact?: boolean }) {
  return (
    <span
      data-codexforge-command-palette-shortcut-hint="CommandPaletteShortcutHint renders Ctrl+K Cmd+K Escape"
      style={compact ? compactHint : hint}
    >
      {getCodexForgeCommandPaletteShortcutLabel()}
    </span>
  );
}

const hint: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.2)",
  borderRadius: 6,
  color: "#cbd5e1",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1,
  padding: "5px 7px",
  whiteSpace: "nowrap",
};

const compactHint: CSSProperties = {
  ...hint,
  padding: "4px 6px",
};
