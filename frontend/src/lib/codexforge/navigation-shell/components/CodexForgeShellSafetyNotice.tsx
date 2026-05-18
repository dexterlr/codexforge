import type { CSSProperties } from "react";

export function CodexForgeShellSafetyNotice() {
  return (
    <section
      aria-label="CodexForge shell safety notice"
      data-codexforge-shell-safety-notice="CodexForgeShellSafetyNotice renders no mutation controls no auto-fix no command execution without approval no file writes without approval"
      style={notice}
    >
      <strong style={title}>Shell is navigation-only.</strong>
      <span style={body}>
        No auto-fix, no command execution without approval, no file writes without approval, no automatic memory
        promotion, and Brain graph mutation review required before graph changes.
      </span>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.18)",
  background: "rgba(251,191,36,0.07)",
  borderRadius: 8,
  color: "#fef3c7",
  display: "grid",
  gap: 5,
  minWidth: 0,
  padding: 11,
};

const title: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const body: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

