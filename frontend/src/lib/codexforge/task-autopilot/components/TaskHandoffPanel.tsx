import type { CSSProperties } from "react";
import type { TaskHandoff } from "@/lib/codexforge/task-autopilot";

export function TaskHandoffPanel({ handoff, copied, onCopy }: { handoff: TaskHandoff | null; copied?: boolean; onCopy?: () => void }) {
  return (
    <section style={panel} data-codexforge-task-handoff-panel>
      <div style={eyebrow}>User-approved handoff</div>
      <strong style={title}>Copy handoff prompt only</strong>
      <pre style={prompt}>{handoff?.prompt ?? "Select and preview a task before copying a handoff prompt."}</pre>
      <button type="button" onClick={onCopy} disabled={!handoff} style={button}>
        {copied ? "Copied" : "Copy handoff prompt"}
      </button>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "rgba(8,13,24,0.82)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const prompt: CSSProperties = { margin: 0, maxHeight: 300, overflow: "auto", whiteSpace: "pre-wrap", overflowWrap: "anywhere", color: "#dbeafe", border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.55)", borderRadius: 8, padding: 10, fontSize: 11, lineHeight: 1.45 };
const button: CSSProperties = { color: "#021014", border: "1px solid rgba(94,234,212,0.42)", background: "#5eead4", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
