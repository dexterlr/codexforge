import type { LiveRunInput, LiveRunInputSource, LiveRunValidation } from "./coding-flow-live-run-types";

export function buildLiveRunStableKey(...parts: Array<string | null | undefined>): string {
  return (parts.filter(Boolean).join(":").toLowerCase().replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 96)) || "coding-flow-live-run";
}

export function buildLiveRunInput(source: LiveRunInputSource = {}): LiveRunInput {
  const selectedFile = source.selectedFile?.trim() || null;
  return { runId: source.runId?.trim() || `live-run:${buildLiveRunStableKey(selectedFile, source.changeDescription)}`, selectedFile, changeDescription: source.changeDescription?.trim() || null, currentStep: source.currentStep ?? "start", validationStatus: source.validationStatus ?? "unknown", noAutoApply: true, noAutoRun: true, noHiddenPersistence: true, latestMessageAuthorityReminder: "Preserve latest-message authority at each handoff." };
}

export function validateLiveRunInput(input: LiveRunInput): LiveRunValidation {
  const warnings: string[] = [];
  if (!input.selectedFile) warnings.push("Pick file before preview patch.");
  if (!input.changeDescription) warnings.push("Describe change before preview patch.");
  return { ok: input.noAutoApply && input.noAutoRun && input.noHiddenPersistence, blockedReasons: [], warnings };
}
