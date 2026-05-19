import type { CSSProperties } from "react";

export function ProjectReaderSafetyNotice() {
  return (
    <section
      data-codexforge-project-reader-safety-notice="ProjectReaderSafetyNotice renders read-only no file writes no command execution Safe Patch Preview preserve latest-message authority"
      style={panel}
    >
      <div style={eyebrow}>Read-only local project reader</div>
      <div style={grid}>
        <span>read-only</span>
        <span>no file writes</span>
        <span>no command execution</span>
        <span>no auto-persistence</span>
        <span>Safe Patch Preview for edits</span>
        <span>preserve latest-message authority</span>
      </div>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.24)",
  background: "rgba(20,184,166,0.10)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 9,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#99f6e4",
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
};

const grid: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  minWidth: 0,
};
