import {
  buildTaskActivationStableKey,
  type ActivatedTaskPlan,
  type TaskActivationHandoff,
  type TaskActivationPolicy,
  type TaskActivationRequest,
} from "./task-activation-types";

export function buildTaskActivationPrompt(args: {
  request: TaskActivationRequest;
  policy: TaskActivationPolicy;
  plan: ActivatedTaskPlan;
}): string {
  const files = args.plan.impactedFiles.length ? args.plan.impactedFiles.join(", ") : "none listed";
  const memories = args.plan.sourceMemoryIds.length ? args.plan.sourceMemoryIds.join(", ") : "none listed";
  const route = args.policy.route;

  return [
    "CodexForge Reviewed Task Activation handoff",
    "",
    "Please activate this as a reviewed task plan.",
    "do not run automatically.",
    "inspect first.",
    "verify current files before making claims or proposing edits.",
    "use recalled memory as context, not proof.",
    "no file mutation without Safe Patch Preview.",
    "no command execution without approval.",
    "preserve latest-message authority.",
    "",
    `Source suggestion: ${args.request.taskSuggestionId}`,
    `Reviewed task: ${args.request.suggestedTaskTitle}`,
    `Goal: ${args.plan.goal}`,
    `Domain: ${args.plan.domain}`,
    `Route: ${route}`,
    `Files to inspect: ${files}`,
    `Memories to verify: ${memories}`,
    "",
    "Plan preview:",
    ...args.plan.steps.map((step) => `- ${step.label}: ${step.text}`),
    "",
    "Approval gates:",
    ...args.plan.approvalGates.map((gate) => `- ${gate}`),
    "",
    "Acceptance checks:",
    ...args.plan.acceptanceChecks.map((check) => `- ${check}`),
  ].join("\n");
}

export function buildTaskActivationHandoff(args: {
  request: TaskActivationRequest;
  policy: TaskActivationPolicy;
  plan: ActivatedTaskPlan;
}): TaskActivationHandoff {
  const prompt = buildTaskActivationPrompt(args);
  return {
    id: buildTaskActivationStableKey("task-activation-handoff", args.request.id, args.plan.id),
    requestId: args.request.id,
    planId: args.plan.id,
    suggestionId: args.request.taskSuggestionId,
    targetHref: "/ai",
    prompt,
    safetyNotes: [
      "Activate this as a reviewed task plan.",
      "do not run automatically.",
      "inspect first.",
      "verify current files.",
      "use recalled memory as context, not proof.",
      "no file mutation without Safe Patch Preview.",
      "no command execution without approval.",
      "preserve latest-message authority.",
    ],
    summary: [
      "Reviewed activation handoff is copy-only.",
      "The /ai workspace receives instructions, not a silent activeTask write.",
    ],
  };
}

export function summarizeTaskActivationHandoff(handoff: TaskActivationHandoff | null): string[] {
  if (!handoff) return ["No reviewed task activation handoff is ready."];
  return [
    `Handoff ${handoff.id} targets ${handoff.targetHref}.`,
    "Prompt says inspect first, verify current files, and do not run automatically.",
  ];
}
