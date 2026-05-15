import type { CSSProperties } from "react";

export function TaskAutopilotSafetyNotice() {
  return (
    <section style={panel} data-codexforge-task-autopilot-safety>
      <div style={eyebrow}>Safety boundary</div>
      <strong style={title}>Review required, no auto-run</strong>
      <p style={body}>
        Inspect first. Use recalled memory as context, not proof. Verify current files before planning.
        No file mutation without preview, no command execution without approval, and no Brain graph mutation from this UI.
      </p>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.24)",
  background: "rgba(8,13,24,0.86)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 8,
  minWidth: 0,
};
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };
