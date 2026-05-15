import type {
  RankedTaskSuggestion,
  TaskPriorityExplanation,
  TaskRiskLevel,
  TaskSuggestion,
} from "./task-autopilot-types";

const riskScores: Record<TaskRiskLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

function hasAny(text: string, terms: string[]): boolean {
  const normalized = text.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

export function scoreTaskSuggestionPriority(suggestion: TaskSuggestion): number {
  const combined = [
    suggestion.title,
    suggestion.goal,
    suggestion.whyNow,
    suggestion.kind,
    ...suggestion.acceptanceChecks,
    ...suggestion.sourceSignals.flatMap((signal) => [...signal.tags, ...signal.riskHints, ...signal.urgencyHints]),
  ].join(" ");

  let score = riskScores[suggestion.riskLevel] * 20;
  score += Math.round(suggestion.confidence * 20);
  score += Math.min(suggestion.sourceSignals.length, 5) * 6;
  score += Math.min(suggestion.impactedFiles.length, 5) * 4;

  if (hasAny(combined, ["critical", "safety", "unsafe"])) score += 18;
  if (hasAny(combined, ["blocked", "failing", "error"])) score += 14;
  if (hasAny(combined, ["test", "smoke", "missing tests"])) score += 10;
  if (hasAny(combined, ["stale", "contradiction"])) score += 8;
  if (hasAny(combined, ["mission", "readiness", "primary"])) score += 8;
  if (hasAny(combined, ["user-visible", "ui", "route", "page"])) score += 6;
  if (hasAny(combined, ["low effort", "quick", "small"])) score += 5;

  return score;
}

export function explainTaskSuggestionPriority(suggestion: TaskSuggestion): TaskPriorityExplanation {
  const reasons = [
    `${suggestion.riskLevel} risk severity contributes ${riskScores[suggestion.riskLevel] * 20} points.`,
    `Confidence contributes ${Math.round(suggestion.confidence * 20)} points.`,
    `${suggestion.sourceSignals.length} repeated source signals are present.`,
  ];

  if (suggestion.impactedFiles.length > 0) reasons.push(`${suggestion.impactedFiles.length} impacted files need inspection.`);
  if (suggestion.sourceSignals.some((signal) => signal.riskHints.length > 0)) reasons.push("Risk hints are present in source signals.");
  if (suggestion.sourceSignals.some((signal) => signal.urgencyHints.length > 0)) reasons.push("Urgency hints are present in source signals.");

  return {
    id: `priority:${suggestion.id}`,
    suggestionId: suggestion.id,
    score: scoreTaskSuggestionPriority(suggestion),
    reasons,
  };
}

export function rankTaskSuggestions(suggestions: TaskSuggestion[]): RankedTaskSuggestion[] {
  return suggestions
    .map((suggestion) => {
      const explanation = explainTaskSuggestionPriority(suggestion);
      return {
        ...suggestion,
        priorityScore: explanation.score,
        priorityReasons: explanation.reasons,
      };
    })
    .sort(
      (a, b) =>
        b.priorityScore - a.priorityScore ||
        riskScores[b.riskLevel] - riskScores[a.riskLevel] ||
        b.confidence - a.confidence ||
        a.id.localeCompare(b.id)
    );
}
