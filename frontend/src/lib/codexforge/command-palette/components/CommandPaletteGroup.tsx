"use client";

import type { CSSProperties } from "react";
import type { CodexForgeCommand, CodexForgeCommandGroupModel } from "../command-palette-types";
import { CommandPaletteItem } from "./CommandPaletteItem";

export function CommandPaletteGroup({
  group,
  selectedId,
  onSelect,
}: {
  group: CodexForgeCommandGroupModel;
  selectedId?: string;
  onSelect: (command: CodexForgeCommand) => void;
}) {
  return (
    <section
      role="presentation"
      data-codexforge-command-palette-group="CommandPaletteGroup renders"
      style={section}
    >
      <div style={heading}>
        <h3 style={title}>{group.label}</h3>
        <span style={count}>{group.commands.length}</span>
      </div>
      <div style={items}>
        {group.commands.map((command) => (
          <CommandPaletteItem
            key={command.id}
            command={command}
            selected={selectedId === command.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = {
  display: "grid",
  gap: 8,
  minWidth: 0,
};

const heading: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  minWidth: 0,
};

const title: CSSProperties = {
  color: "#ccfbf1",
  fontSize: 11,
  fontWeight: 950,
  letterSpacing: 0,
  margin: 0,
  textTransform: "uppercase",
};

const count: CSSProperties = {
  color: "#64748b",
  fontSize: 11,
  fontWeight: 900,
};

const items: CSSProperties = {
  display: "grid",
  gap: 7,
  minWidth: 0,
};
