import { validateMemoryEventWorkspacePath } from "./memory-event-path-guard";
import {
  buildMemoryEventStableKey,
  type MemoryEventPersistenceRequest,
  type MemoryEventValidation,
  type MemoryEventValidationIssue,
} from "./memory-persistence-types";

export function validateMemoryEventContent(
  request: MemoryEventPersistenceRequest
): MemoryEventValidation {
  const pathValidation = validateMemoryEventWorkspacePath(request.targetRelativePath);
  const issues: MemoryEventValidationIssue[] = [];

  if (request.approved !== true) issues.push("missing-approval");
  if (request.sourceRefs.length === 0) issues.push("missing-source-refs");
  if (!request.content.trim()) issues.push("empty-content");
  if (request.type !== "memory.promoted") issues.push("unsupported-event-type");
  if (pathValidation.traversal) issues.push("path-traversal");
  if (pathValidation.absolutePath) issues.push("absolute-path");
  if (pathValidation.sourceMutationAttempt) issues.push("source-mutation-attempt");
  if (request.contradictionRisk >= 0.75 && !request.contradictionAcknowledged) {
    issues.push("high-contradiction-risk");
  }
  if (request.reviewState !== "approved-for-promotion") issues.push("missing-review-state");
  if (!request.safetyNote.trim()) issues.push("missing-safety-note");

  const state = issues.length === 0 ? "valid" : issues.includes("high-contradiction-risk") ? "review" : "blocked";
  const validation: MemoryEventValidation = {
    id: buildMemoryEventStableKey("memory-event-validation", request.eventId),
    state,
    issues,
    pathValidation,
    summary: [],
  };

  return { ...validation, summary: summarizeMemoryEventValidation(validation) };
}

export function validateMemoryEventSet(
  requests: readonly MemoryEventPersistenceRequest[]
): MemoryEventValidation[] {
  return requests.map(validateMemoryEventContent);
}

export function summarizeMemoryEventValidation(validation: MemoryEventValidation): string[] {
  if (validation.issues.length === 0) {
    return [
      "Memory event validation passed.",
      "Explicit approval required and present.",
      "No auto-promotion and no direct graph mutation.",
      ".codexforge/memory-events path guard passed.",
    ];
  }

  return [
    `Memory event validation is ${validation.state} with ${validation.issues.length} issue(s).`,
    ...validation.issues.map((issue) => `Detected ${issue}.`),
    "Persistence remains blocked until validation passes.",
  ];
}
