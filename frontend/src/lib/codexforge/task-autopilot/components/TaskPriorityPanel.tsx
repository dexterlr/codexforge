import type { CSSProperties } from "react";
import type { RankedTaskSuggestion } from "@/lib/codexforge/task-autopilot";

export function TaskPriorityPanel({ suggestion }: { suggestion: RankedTaskSuggestion | null }) {
  return (
    <section style={panel} data-codexforge-task-priority-panel>
      <div style={eyebrow}>Priority ranker</div>
      <strong style={title}>{suggestion ? `Score ${suggestion.priorityScore}` : "No suggestion selected"}</strong>
      <div style={list}>
        {(suggestion?.priorityReasons ?? ["Select a suggestion to inspect ranking reasons."]).map((reason) => (
          <span key={reason} style={item}>{reason}</span>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 14, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 6 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
