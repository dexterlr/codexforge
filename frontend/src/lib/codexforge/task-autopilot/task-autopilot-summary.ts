import type { TaskAutopilotBundle, TaskSignalExtractorInput } from "./task-autopilot-types";
import { buildTaskSignals, summarizeTaskSignals } from "./task-signal-extractor";
import { buildTaskSuggestions, summarizeTaskSuggestions } from "./task-suggestion-engine";
import { rankTaskSuggestions } from "./task-priority-ranker";
import { buildTaskAutopilotRiskPolicy } from "./task-risk-policy";
import { buildTaskReviewQueue } from "./task-review-queue";
import { buildTaskPlanPreview } from "./task-plan-preview";
import { buildTaskHandoff } from "./task-handoff";

export function buildTaskAutopilotSummary(input: TaskSignalExtractorInput = {}): TaskAutopilotBundle {
  const signals = buildTaskSignals(input);
  const suggestions = rankTaskSuggestions(buildTaskSuggestions(signals));
  const queue = buildTaskReviewQueue(suggestions);
  const activeSuggestion = suggestions[0] ?? null;
  const activePreview = activeSuggestion ? buildTaskPlanPreview(activeSuggestion) : null;
  const handoff = activeSuggestion ? buildTaskHandoff(activeSuggestion, activePreview) : null;

  return {
    signals,
    signalSummary: summarizeTaskSignals(signals),
    suggestions,
    suggestionSummary: summarizeTaskSuggestions(suggestions),
    policy: buildTaskAutopilotRiskPolicy(),
    queue,
    activePreview,
    handoff,
    summary: [
      "Task Memory Autopilot is deterministic, local-first, and review gated.",
      `${signals.length} signals produced ${suggestions.length} suggestions.`,
      "No auto-run, no file mutation without preview, and no graph mutation.",
    ],
  };
}
