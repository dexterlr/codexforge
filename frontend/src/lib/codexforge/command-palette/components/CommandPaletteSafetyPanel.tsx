"use client";

import type { CSSProperties } from "react";
import type { CodexForgeCommandSafetyReport } from "../command-palette-types";
import { summarizeCodexForgeCommandSafety } from "../command-safety";

export function CommandPaletteSafetyPanel({
  report,
}: {
  report: CodexForgeCommandSafetyReport;
}) {
  return (
    <aside
      data-codexforge-command-palette-safety-panel="CommandPaletteSafetyPanel renders no command execution without approval no file writes without approval preserve latest-message authority"
      style={panel}
    >
      <span style={eyebrow}>Safety</span>
      <p style={summary}>{summarizeCodexForgeCommandSafety(report)}</p>
      <div style={list}>
        {report.items.slice(0, 5).map((item) => (
          <span key={item.id} style={pill}>
            {item.label}
          </span>
        ))}
      </div>
    </aside>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  display: "grid",
  gap: 8,
  minWidth: 0,
  padding: 11,
};

const eyebrow: CSSProperties = {
  color: "#5eead4",
  fontSize: 11,
  fontWeight: 950,
  textTransform: "uppercase",
};

const summary: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};

const list: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  minWidth: 0,
};

const pill: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: 6,
  color: "#e2e8f0",
  fontSize: 10,
  fontWeight: 850,
  padding: "4px 6px",
};
