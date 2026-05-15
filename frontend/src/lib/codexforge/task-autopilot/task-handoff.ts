import type { TaskHandoff, TaskPlanPreview, TaskSuggestion } from "./task-autopilot-types";

export function buildTaskPromptHandoff(suggestion: TaskSuggestion, plan?: TaskPlanPreview | null): string {
  const files = suggestion.impactedFiles.length ? suggestion.impactedFiles.join(", ") : "none listed";
  const memories = suggestion.sourceSignals.flatMap((signal) => signal.relatedMemoryIds).join(", ") || "none listed";
  return [
    "CodexForge Task Memory Autopilot handoff",
    "",
    "Instructions:",
    "- Inspect first.",
    "- Use recalled memory as context, not proof.",
    "- Verify current files before making claims or proposing edits.",
    "- No file mutation without preview.",
    "- No command execution without approval.",
    "- Produce a plan/diff preview only where relevant.",
    "",
    `Suggested task: ${suggestion.title}`,
    `Goal: ${suggestion.goal}`,
    `Kind: ${suggestion.kind}`,
    `Risk: ${suggestion.riskLevel}`,
    `Files to inspect: ${files}`,
    `Memories to verify: ${memories}`,
    "",
    "Acceptance checks:",
    ...suggestion.acceptanceChecks.map((check) => `- ${check}`),
    "",
    plan ? "Plan preview:" : "Plan preview: requested before execution.",
    ...(plan ? plan.orderedSteps.map((step) => `- ${step.label}: ${step.detail}`) : []),
  ].join("\n");
}

export function buildTaskHandoff(suggestion: TaskSuggestion, plan?: TaskPlanPreview | null): TaskHandoff {
  return {
    id: `task-handoff:${suggestion.id}`,
    suggestionId: suggestion.id,
    prompt: buildTaskPromptHandoff(suggestion, plan),
    safetyNotes: [
      "Inspect first.",
      "Use recalled memory as context, not proof.",
      "Verify current files.",
      "No command execution without approval.",
      "No file mutation without preview.",
    ],
    summary: [
      "Handoff prompt is copy-only and does not auto-send.",
      "Prompt requests planning or diff preview only where relevant.",
    ],
  };
}

export function summarizeTaskHandoff(handoff: TaskHandoff | null): string[] {
  if (!handoff) return ["No task handoff selected."];
  return [`Handoff ready for ${handoff.suggestionId}.`, "Operator must copy or review it manually."];
}
