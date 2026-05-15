import type { CSSProperties } from "react";
import type { RankedTaskSuggestion } from "@/lib/codexforge/task-autopilot";

export function TaskSuggestionCard({
  suggestion,
  selected,
  onSelect,
}: {
  suggestion: RankedTaskSuggestion;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button type="button" onClick={() => onSelect(suggestion.id)} style={card(selected)} data-codexforge-task-suggestion-card>
      <span style={topline}>
        <span style={pill}>{suggestion.kind}</span>
        <span style={risk}>{suggestion.riskLevel}</span>
      </span>
      <strong style={title}>{suggestion.title}</strong>
      <span style={body}>{suggestion.whyNow}</span>
      <span style={meta}>
        Review required - no auto-run - score {suggestion.priorityScore}
      </span>
    </button>
  );
}

function card(selected: boolean): CSSProperties {
  return {
    textAlign: "left",
    color: "inherit",
    border: selected ? "1px solid rgba(45,212,191,0.54)" : "1px solid rgba(148,163,184,0.16)",
    background: selected ? "rgba(20,184,166,0.13)" : "rgba(2,6,23,0.48)",
    borderRadius: 8,
    padding: 13,
    display: "grid",
    gap: 8,
    minWidth: 0,
    cursor: "pointer",
  };
}
const topline: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" };
const pill: CSSProperties = { color: "#bae6fd", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const risk: CSSProperties = { color: "#fef3c7", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 14, lineHeight: 1.25, overflowWrap: "anywhere" };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const meta: CSSProperties = { color: "#99f6e4", fontSize: 11, fontWeight: 800 };
