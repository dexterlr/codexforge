import type { CSSProperties } from "react";
import type { RankedTaskSuggestion, TaskSuggestionSummary } from "@/lib/codexforge/task-autopilot";
import { TaskSuggestionCard } from "./TaskSuggestionCard";

export function TaskSuggestionQueue({
  suggestions,
  summary,
  selectedId,
  onSelect,
}: {
  suggestions: RankedTaskSuggestion[];
  summary: TaskSuggestionSummary;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section style={panel} data-codexforge-task-suggestion-queue>
      <div style={eyebrow}>Prioritized suggestion queue</div>
      <h2 style={heading}>Suggested next tasks from memory</h2>
      <p style={body}>
        {summary.suggestionCount} suggestions are deterministic and review required. No active task is created silently.
      </p>
      <div style={stack}>
        {suggestions.map((suggestion) => (
          <TaskSuggestionCard key={suggestion.id} suggestion={suggestion} selected={suggestion.id === selectedId} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const stack: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
