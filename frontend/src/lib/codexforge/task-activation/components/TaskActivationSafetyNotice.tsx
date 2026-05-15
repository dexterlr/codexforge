import type { CSSProperties } from "react";

export function TaskActivationSafetyNotice() {
  return (
    <section
      style={panel}
      data-codexforge-task-activation-safety-notice="explicit review approval required no auto-run no file mutation without Safe Patch Preview use memory as context, not proof preserve latest-message authority"
    >
      <div style={eyebrow}>Activation safety</div>
      <div style={grid}>
        <strong style={title}>Explicit review approval required</strong>
        <p style={body}>
          Reviewed Task Activation creates a visible active plan preview and copy-only /ai handoff. It does not
          auto-run, auto-write, mutate files, mutate memory, or mutate the Brain graph.
        </p>
        <p style={body}>
          No file mutation without Safe Patch Preview. Use memory as context, not proof. preserve
          latest-message authority in the AI workspace.
        </p>
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 14, display: "grid", gap: 8, minWidth: 0 };
const grid: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
