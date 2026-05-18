"use client";

import type { CSSProperties } from "react";
import type { CodexForgeCommandShortcut } from "../command-palette-types";

export function CommandPaletteFooter({
  shortcuts,
}: {
  shortcuts: readonly CodexForgeCommandShortcut[];
}) {
  return (
    <footer
      data-codexforge-command-palette-footer="CommandPaletteFooter renders Ctrl+K Cmd+K Escape Enter Arrow keys no command execution without approval no file writes without approval"
      style={footer}
    >
      {shortcuts.map((shortcut) => (
        <span key={shortcut.id} style={shortcutStyle}>
          {shortcut.keys.join(" / ")}: {shortcut.label}
        </span>
      ))}
    </footer>
  );
}

const footer: CSSProperties = {
  borderTop: "1px solid rgba(148,163,184,0.12)",
  color: "#94a3b8",
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  minWidth: 0,
  paddingTop: 10,
};

const shortcutStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 850,
  overflowWrap: "anywhere",
};
