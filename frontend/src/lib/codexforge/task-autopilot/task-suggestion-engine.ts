import {
  buildTaskAutopilotStableKey,
  clampTaskConfidence,
  type TaskRiskLevel,
  type TaskSignal,
  type TaskSuggestion,
  type TaskSuggestionInput,
  type TaskSuggestionKind,
  type TaskSuggestionSummary,
} from "./task-autopilot-types";
import { buildTaskAutopilotRiskPolicy, isTaskSuggestionAllowed } from "./task-risk-policy";

function uniq(values: string[] = []): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}

function inferKind(signal: TaskSignal): TaskSuggestionKind {
  const text = `${signal.title} ${signal.summary} ${signal.tags.join(" ")} ${signal.riskHints.join(" ")}`.toLowerCase();
  if (signal.sourceType === "memory-candidate") return "promote-memory";
  if (signal.sourceType === "patch-preview") return "prepare-patch";
  if (signal.sourceType === "artifact-hint" || text.includes("artifact")) return "review-artifact";
  if (text.includes("test") || text.includes("smoke")) return "test";
  if (text.includes("doc") || text.includes("handoff")) return "document";
  if (text.includes("refactor")) return "refactor";
  if (text.includes("creative")) return "plan-creative";
  if (text.includes("critical") || text.includes("blocked") || text.includes("failing") || text.includes("error")) return "fix";
  if (text.includes("risk") || text.includes("policy") || text.includes("safety")) return "harden";
  return "inspect";
}

function inferRiskLevel(signals: TaskSignal[]): TaskRiskLevel {
  const text = signals.flatMap((signal) => [...signal.tags, ...signal.riskHints]).join(" ").toLowerCase();
  if (text.includes("critical")) return "critical";
  if (text.includes("high") || text.includes("blocked") || text.includes("contradiction")) return "high";
  if (text.includes("medium") || text.includes("stale") || text.includes("risk")) return "medium";
  return "low";
}

function defaultAcceptanceChecks(kind: TaskSuggestionKind): string[] {
  if (kind === "promote-memory") {
    return ["Memory Review queue item is visible.", "No auto-promotion occurs.", "Brain merge remains review gated."];
  }
  if (kind === "prepare-patch" || kind === "fix") {
    return ["Current files are inspected first.", "Safe Patch Preview is produced before any file mutation.", "Suggested tests are listed, not run automatically."];
  }
  if (kind === "test") {
    return ["Relevant smoke or build command is identified.", "Command execution requires approval.", "Expected pass/fail signal is documented."];
  }
  return ["Operator reviews source signals.", "Plan preview is visible.", "Handoff prompt stays preview-only."];
}

export function buildTaskSuggestion(input: TaskSuggestionInput): TaskSuggestion {
  const sourceSignalIds = uniq(input.sourceSignals.map((signal) => signal.id));
  const impactedFiles = uniq(input.impactedFiles ?? input.sourceSignals.flatMap((signal) => signal.filePaths));
  const expectedArtifacts = uniq(input.expectedArtifacts ?? input.sourceSignals.flatMap((signal) => signal.relatedArtifactIds));
  const riskLevel = input.riskLevel ?? inferRiskLevel(input.sourceSignals);
  const confidence = clampTaskConfidence(
    input.confidence ??
      (input.sourceSignals.reduce((sum, signal) => sum + signal.confidence, 0) / Math.max(input.sourceSignals.length, 1))
  );
  const id = buildTaskAutopilotStableKey("task-suggestion", input.kind, input.title, sourceSignalIds.join("."));
  const draft: TaskSuggestion = {
    id,
    kind: input.kind,
    title: input.title,
    goal: input.goal,
    whyNow: input.whyNow,
    sourceSignalIds,
    sourceSignals: input.sourceSignals,
    impactedFiles,
    expectedArtifacts,
    suggestedFirstStep: input.suggestedFirstStep ?? "Inspect the current source context and verify the recalled memory before planning.",
    acceptanceChecks: input.acceptanceChecks ?? defaultAcceptanceChecks(input.kind),
    riskLevel,
    confidence,
    reviewState: input.reviewState ?? "needs-review",
    safeNextAction: input.safeNextAction ?? "review-required",
  };
  const decision = isTaskSuggestionAllowed(draft, buildTaskAutopilotRiskPolicy());
  return { ...draft, safeNextAction: decision.safeNextAction };
}

export function buildTaskSuggestions(signals: TaskSignal[]): TaskSuggestion[] {
  const grouped = signals.reduce<Map<TaskSuggestionKind, TaskSignal[]>>((groups, signal) => {
    const kind = inferKind(signal);
    groups.set(kind, [...(groups.get(kind) ?? []), signal]);
    return groups;
  }, new Map());

  return Array.from(grouped)
    .map(([kind, sourceSignals]) => {
      const topSignal = [...sourceSignals].sort((a, b) => b.confidence - a.confidence || a.id.localeCompare(b.id))[0];
      const files = uniq(sourceSignals.flatMap((signal) => signal.filePaths));
      const risk = inferRiskLevel(sourceSignals);
      const title =
        kind === "promote-memory"
          ? "Review memory candidates before promotion"
          : kind === "prepare-patch"
            ? "Prepare Safe Patch Preview from current signals"
            : kind === "fix"
              ? `Investigate blocked or risky signal: ${topSignal.title}`
              : kind === "test"
                ? "Add or run review-gated validation plan"
                : `Inspect suggested task from ${topSignal.sourceType}`;

      return buildTaskSuggestion({
        kind,
        title,
        goal:
          kind === "inspect"
            ? `Inspect ${topSignal.title} using recalled memory as context, not proof.`
            : `Plan ${kind} work for ${topSignal.title}.`,
        whyNow:
          sourceSignals.length > 1
            ? `${sourceSignals.length} deterministic signals point at this task.`
            : topSignal.summary,
        sourceSignals,
        impactedFiles: files,
        expectedArtifacts: kind === "document" || kind === "review-artifact" ? sourceSignals.flatMap((signal) => signal.relatedArtifactIds) : [],
        suggestedFirstStep: files.length
          ? `Inspect ${files[0]} and verify current contents before proposing edits.`
          : "Review source signals and verify current state before proposing work.",
        riskLevel: risk,
      });
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function summarizeTaskSuggestions(suggestions: TaskSuggestion[]): TaskSuggestionSummary {
  const kindBreakdown = Array.from(
    suggestions.reduce<Map<TaskSuggestionKind, number>>((counts, suggestion) => {
      counts.set(suggestion.kind, (counts.get(suggestion.kind) ?? 0) + 1);
      return counts;
    }, new Map())
  )
    .map(([kind, count]) => ({ kind, count }))
    .sort((a, b) => a.kind.localeCompare(b.kind));

  return {
    id: "task-suggestion-summary",
    suggestionCount: suggestions.length,
    reviewRequiredCount: suggestions.filter((suggestion) => suggestion.reviewState !== "handoff-ready").length,
    blockedCount: suggestions.filter((suggestion) => suggestion.safeNextAction === "blocked").length,
    kindBreakdown,
    summary: [
      `${suggestions.length} deterministic task suggestions generated.`,
      "Suggestions are visible review items only; none become active tasks automatically.",
      `${kindBreakdown.length} task kinds are represented in the queue.`,
    ],
  };
}
