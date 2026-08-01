"use client";

import type { CSSProperties } from "react";

export function CommandPaletteSearchBox({
  value,
  onChange,
  activeDescendantId,
}: {
  value: string;
  onChange: (value: string) => void;
  activeDescendantId?: string;
}) {
  return (
    <input
      autoFocus
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search routes, safe actions, validation, handoffs"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded="true"
      aria-activedescendant={activeDescendantId}
      aria-controls="codexforge-command-palette-results"
      aria-describedby="codexforge-command-palette-search-help"
      data-codexforge-command-palette-search-box="CommandPaletteSearchBox renders search supports label keywords"
      style={input}
      aria-label="Search command palette"
    />
  );
}

const input: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(2,6,23,0.72)",
  borderRadius: 8,
  color: "#f8fafc",
  fontSize: 15,
  fontWeight: 750,
  minWidth: 0,
  padding: "13px 14px",
  width: "100%",
};
