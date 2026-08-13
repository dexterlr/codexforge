import type { TaskSuggestionKind } from "@/lib/codexforge/task-autopilot";
import {
  buildTaskActivationStableKey,
  uniqueTaskActivationStrings,
  type TaskActivationDomain,
  type TaskActivationReadiness,
  type TaskActivationRequest,
  type TaskActivationRequestInput,
  type TaskActivationValidation,
} from "./task-activation-types";

const NO_RUN_GUARANTEE =
  "Reviewed Task Activation creates an active plan preview only: no auto-run, no auto-write, and no file mutation.";

function inferActivationDomain(kind: TaskSuggestionKind, tags: string[], goal: string): TaskActivationDomain {
  const text = `${kind} ${tags.join(" ")} ${goal}`.toLowerCase();
  if (text.includes("web") || text.includes("frontend") || text.includes("next")) return "web";
  if (text.includes("unreal")) return "unreal";
  if (text.includes("comfy")) return "comfyui";
  if (text.includes("video")) return "video";
  if (text.includes("movie") || kind === "plan-creative") return "movie";
  if (text.includes("server") || text.includes("game")) return "game-server";
  if (text.includes("automation") || text.includes("pipeline")) return "automation";
  if (kind === "fix" || kind === "harden" || kind === "prepare-patch" || kind === "refactor" || kind === "test") {
    return "debug";
  }
  if (kind === "promote-memory" || kind === "review-artifact" || kind === "document") return "research";
  return "general";
}

function routeStepForKind(kind: TaskSuggestionKind, title: string): string {
  if (kind === "prepare-patch" || kind === "fix" || kind === "refactor") {
    return "Route any file change through Safe Patch Preview before mutation.";
  }
  if (kind === "promote-memory") {
    return "Route memory promotion work through Memory Review before persistence or merge.";
  }
  if (title.toLowerCase().includes("graph") || title.toLowerCase().includes("merge")) {
    return "Route graph work through Brain Merge Review before any graph mutation.";
  }
  if (kind === "plan-creative") {
    return "Keep creative execution preview-only until a separate explicit execution review exists.";
  }
  return "Prepare a reviewed handoff prompt for the visible Jarvis composer.";
}

function buildRequestSteps(input: TaskActivationRequestInput): string[] {
  if (input.steps) return uniqueTaskActivationStrings(input.steps);

  return uniqueTaskActivationStrings([
    input.suggestion.suggestedFirstStep,
    "Inspect current files and source signals before relying on recalled context.",
    routeStepForKind(input.suggestion.kind, input.suggestion.title),
    "Preview the active task plan and wait for explicit operator activation.",
  ]);
}

function collectRiskNotes(input: TaskActivationRequestInput): string[] {
  const suggestion = input.suggestion;
  return uniqueTaskActivationStrings([
    ...suggestion.sourceSignals.flatMap((signal) => signal.riskHints),
    ...suggestion.acceptanceChecks.filter((check) => check.toLowerCase().includes("risk")),
    suggestion.riskLevel === "low" ? "" : `${suggestion.riskLevel} risk review required.`,
  ]);
}

function activationReadinessFor(input: TaskActivationRequestInput, steps: string[]): TaskActivationReadiness {
  const suggestion = input.suggestion;
  if (suggestion.reviewState === "blocked" || suggestion.safeNextAction === "blocked") return "blocked";
  if (steps.length === 0) return "blocked";
  if (input.approved === true) return "accepted";
  if (suggestion.reviewState === "handoff-ready") return "handoff-ready";
  return "needs-review";
}

export function buildTaskActivationRequest(input: TaskActivationRequestInput): TaskActivationRequest {
  const steps = buildRequestSteps(input);
  const sourceSignalIds = uniqueTaskActivationStrings(input.suggestion.sourceSignalIds);
  const relatedMemoryIds = uniqueTaskActivationStrings(
    input.suggestion.sourceSignals.flatMap((signal) => signal.relatedMemoryIds)
  );
  const relatedArtifactIds = uniqueTaskActivationStrings([
    ...input.suggestion.expectedArtifacts,
    ...input.suggestion.sourceSignals.flatMap((signal) => signal.relatedArtifactIds),
  ]);
  const relatedRunIds = uniqueTaskActivationStrings(
    input.suggestion.sourceSignals.flatMap((signal) => signal.relatedRunIds)
  );
  const tags = uniqueTaskActivationStrings([
    input.suggestion.kind,
    input.suggestion.riskLevel,
    ...input.suggestion.sourceSignals.flatMap((signal) => signal.tags),
  ]);
  const domain = input.domain ?? inferActivationDomain(input.suggestion.kind, tags, input.suggestion.goal);

  return {
    id: buildTaskActivationStableKey("task-activation-request", input.suggestion.id, input.suggestion.goal, steps.join(".")),
    taskSuggestionId: input.suggestion.id,
    suggestionReviewState: input.suggestion.reviewState,
    suggestionKind: input.suggestion.kind,
    suggestionSafeNextAction: input.suggestion.safeNextAction,
    approved: input.approved === true,
    approvalNote: input.approvalNote?.trim() ?? "",
    sourceSignalIds,
    suggestedTaskTitle: input.suggestion.title,
    goal: input.suggestion.goal,
    domain,
    tags,
    steps,
    risks: collectRiskNotes(input),
    riskLevel: input.suggestion.riskLevel,
    impactedFiles: uniqueTaskActivationStrings(input.suggestion.impactedFiles),
    relatedMemoryIds,
    relatedArtifactIds,
    relatedRunIds,
    activationReadiness: activationReadinessFor(input, steps),
    noRunGuarantee: NO_RUN_GUARANTEE,
  };
}

export function validateTaskActivationRequest(request: TaskActivationRequest): TaskActivationValidation {
  const reasons = [
    request.taskSuggestionId ? "" : "Task suggestion id is required.",
    request.goal.trim() ? "" : "Goal is required.",
    request.steps.length > 0 ? "" : "Empty task steps block activation.",
    request.noRunGuarantee.toLowerCase().includes("no auto-run")
      ? ""
      : "Request must carry a no-run guarantee.",
  ].filter(Boolean);

  const valid = reasons.length === 0;

  return {
    id: buildTaskActivationStableKey("task-activation-validation", request.id),
    requestId: request.id,
    valid,
    state: valid ? "valid" : "blocked",
    reasons,
    summary: summarizeTaskActivationRequest(request),
  };
}

export function summarizeTaskActivationRequest(request: TaskActivationRequest): string[] {
  return [
    `Activation request ${request.id} maps suggestion ${request.taskSuggestionId} to a reviewed active plan preview.`,
    request.approved
      ? "Explicit review approval is present on the request."
      : "Explicit review approval required before activation.",
    `${request.steps.length} task steps, ${request.impactedFiles.length} impacted files, and ${request.relatedMemoryIds.length} related memories are visible.`,
    request.noRunGuarantee,
  ];
}
