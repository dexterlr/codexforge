"use client";

import type { CSSProperties } from "react";
import type { CodexForgeBrainCommandMode } from "./brain-command-center-types";
import { BrainMetricPill, BrainReadOnlyBadge } from "./ui";

type BrainCommandStatusBarProps = {
  activeMode: CodexForgeBrainCommandMode;
  commandCount: number;
  historyCount: number;
  selectedNodeId?: string | null;
  selectedNodeLabel?: string | null;
  paletteOpen?: boolean;
};

function formatModeLabel(mode: CodexForgeBrainCommandMode): string {
  return mode
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function BrainCommandStatusBar({
  activeMode,
  commandCount,
  historyCount,
  selectedNodeId,
  selectedNodeLabel,
  paletteOpen = false,
}: BrainCommandStatusBarProps) {
  return (
    <section data-codexforge-brain-command-status-bar style={barStyle}>
      <BrainMetricPill
        label="Active mode"
        value={
          <span data-codexforge-brain-active-mode={activeMode}>
          {formatModeLabel(activeMode)}
          </span>
        }
      />
      <BrainMetricPill
        label="Palette"
        value={paletteOpen ? "open" : "Ctrl+K / Cmd+K"}
      />
      <BrainMetricPill
        label="Focus target"
        value={selectedNodeLabel ?? selectedNodeId ?? "none selected"}
      />
      <BrainMetricPill label="Commands" value={`${commandCount} registered`} />
      <BrainMetricPill label="Session history" value={String(historyCount)} />
      <BrainReadOnlyBadge
        data-codexforge-brain-command-readonly
        label="read-only navigation"
        style={readonlyStyle}
      />
    </section>
  );
}

const barStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: 8,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(2,6,23,0.38)",
};

const readonlyStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 46,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.94)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};
