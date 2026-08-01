"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import type { CodexForgeCommand } from "../command-palette-types";

export function CommandPaletteItem({
  command,
  selected,
  onSelect,
}: {
  command: CodexForgeCommand;
  selected: boolean;
  onSelect: (command: CodexForgeCommand) => void;
}) {
  const disabled = Boolean(command.disabledReason);
  const itemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected) itemRef.current?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  return (
    <button
      ref={itemRef}
      id={`codexforge-command-${command.id}`}
      role="option"
      aria-selected={selected}
      type="button"
      disabled={disabled}
      onClick={() => onSelect(command)}
      data-codexforge-command-palette-item="CommandPaletteItem renders route actions navigate only copy actions copy text only"
      style={{
        ...item,
        ...(selected ? selectedItem : null),
        ...(disabled ? disabledItem : null),
      }}
    >
      <span style={itemMain}>
        <span style={title}>{command.label}</span>
        <span style={description}>{command.disabledReason ?? command.description}</span>
      </span>
      <span style={meta}>{command.kind}</span>
    </button>
  );
}

const item: CSSProperties = {
  alignItems: "start",
  border: "1px solid rgba(148,163,184,0.13)",
  background: "rgba(15,23,42,0.62)",
  borderRadius: 8,
  color: "#f8fafc",
  cursor: "pointer",
  display: "grid",
  gap: 10,
  gridTemplateColumns: "minmax(0, 1fr) auto",
  minWidth: 0,
  padding: 11,
  textAlign: "left",
  width: "100%",
};

const selectedItem: CSSProperties = {
  borderColor: "rgba(94,234,212,0.44)",
  background: "rgba(20,184,166,0.14)",
};

const disabledItem: CSSProperties = {
  cursor: "not-allowed",
  opacity: 0.56,
};

const itemMain: CSSProperties = {
  display: "grid",
  gap: 4,
  minWidth: 0,
};

const title: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  overflowWrap: "anywhere",
};

const description: CSSProperties = {
  color: "#94a3b8",
  fontSize: 12,
  lineHeight: 1.4,
  overflowWrap: "anywhere",
};

const meta: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  borderRadius: 6,
  color: "#bae6fd",
  fontSize: 10,
  fontWeight: 900,
  padding: "4px 6px",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};
