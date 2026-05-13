"use client";

import type { CSSProperties } from "react";
import type { CodexForgeBrainCommandMode } from "./brain-command-center-types";

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
      <div style={itemStyle}>
        <span style={eyebrowStyle}>Active mode</span>
        <strong data-codexforge-brain-active-mode={activeMode}>
          {formatModeLabel(activeMode)}
        </strong>
      </div>
      <div style={itemStyle}>
        <span style={eyebrowStyle}>Palette</span>
        <strong>{paletteOpen ? "open" : "Ctrl+K / Cmd+K"}</strong>
      </div>
      <div style={itemStyle}>
        <span style={eyebrowStyle}>Focus target</span>
        <strong>{selectedNodeLabel ?? selectedNodeId ?? "none selected"}</strong>
      </div>
      <div style={itemStyle}>
        <span style={eyebrowStyle}>Commands</span>
        <strong>{commandCount} registered</strong>
      </div>
      <div style={itemStyle}>
        <span style={eyebrowStyle}>Session history</span>
        <strong>{historyCount}</strong>
      </div>
      <div
        data-codexforge-brain-command-readonly
        style={readonlyStyle}
      >
        read-only navigation
      </div>
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

const itemStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  minWidth: 0,
  padding: 8,
  borderRadius: 8,
  background: "rgba(255,255,255,0.035)",
  fontSize: 12,
  lineHeight: 1.35,
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

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

