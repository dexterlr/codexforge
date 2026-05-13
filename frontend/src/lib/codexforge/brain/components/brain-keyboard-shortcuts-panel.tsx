"use client";

import type { CSSProperties } from "react";
import {
  formatBrainKeyboardShortcut,
  summarizeBrainKeyboardShortcuts,
} from "./commands";

type BrainKeyboardShortcutsPanelProps = {
  open?: boolean;
  onClose?: () => void;
};

export function BrainKeyboardShortcutsPanel({
  open = true,
  onClose,
}: BrainKeyboardShortcutsPanelProps) {
  const groups = summarizeBrainKeyboardShortcuts();

  return (
    <section
      data-codexforge-brain-keyboard-shortcuts-panel
      data-codexforge-brain-keyboard-shortcuts-open={open ? "true" : "false"}
      style={panelStyle}
    >
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Keyboard shortcuts</div>
          <h2 style={titleStyle}>Cognitive navigation keys</h2>
        </div>
        {onClose && open ? (
          <button type="button" onClick={onClose} style={buttonStyle}>
            Close
          </button>
        ) : (
          <span style={pillStyle}>?</span>
        )}
      </div>

      <div style={gridStyle}>
        {groups.map((group) => (
          <section key={group.category} style={groupStyle}>
            <div style={eyebrowStyle}>{group.label}</div>
            <div style={shortcutGridStyle}>
              {group.shortcuts.map((shortcut) => (
                <div
                  key={shortcut.id}
                  data-codexforge-brain-keyboard-shortcut
                  style={shortcutStyle}
                >
                  <kbd style={kbdStyle}>{formatBrainKeyboardShortcut(shortcut)}</kbd>
                  <span style={shortcutTextStyle}>
                    <strong>{shortcut.label}</strong>
                    <span>{shortcut.description}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(15,23,42,0.72)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 10,
};

const groupStyle: CSSProperties = {
  display: "grid",
  gap: 7,
  alignContent: "start",
};

const shortcutGridStyle: CSSProperties = {
  display: "grid",
  gap: 6,
};

const shortcutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "82px minmax(0, 1fr)",
  gap: 8,
  alignItems: "start",
  padding: 8,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.035)",
  fontSize: 11,
  lineHeight: 1.35,
};

const kbdStyle: CSSProperties = {
  display: "inline-flex",
  justifyContent: "center",
  borderRadius: 6,
  padding: "4px 6px",
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(2,6,23,0.58)",
  color: "rgba(224,242,254,0.96)",
  fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
  fontSize: 10,
  fontWeight: 900,
  whiteSpace: "nowrap",
};

const shortcutTextStyle: CSSProperties = {
  display: "grid",
  gap: 3,
  minWidth: 0,
  color: "rgba(226,232,240,0.75)",
};

const buttonStyle: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "inherit",
  borderRadius: 8,
  padding: "7px 9px",
  fontSize: 11,
  fontWeight: 900,
  cursor: "pointer",
};

const pillStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 8px",
  background: "rgba(14,165,233,0.14)",
  color: "rgba(186,230,253,0.92)",
  fontSize: 11,
  fontWeight: 900,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 16,
  lineHeight: 1.2,
};

