import type { CodexForgePatchPreviewPlanInput } from "../patch-preview";
import type { PatchPreviewQueueHandoff, PatchPreviewQueueItem } from "./patch-preview-queue-types";

export function buildPatchPreviewQueuePatchInput(item: PatchPreviewQueueItem): CodexForgePatchPreviewPlanInput {
  return {
    ...item.patchPreviewPlanInput,
    selectedFilePath: item.primaryFile,
    goal: item.goal,
    expectedTouchedFiles: item.targetFiles,
    hasTestsOrSmokeScripts: item.suggestedTests.length > 0,
    appearsSafetyCritical: item.riskLevel === "high" || item.riskLevel === "critical",
    requiresApproval: true,
    capabilityPolicyPosture:
      "Inspect first; Safe Patch Preview only; produce preview diff only; no file writes without approval; no command execution without approval; preserve latest-message authority.",
  };
}

export function buildPatchPreviewQueuePrompt(item: PatchPreviewQueueItem): string {
  const input = buildPatchPreviewQueuePatchInput(item);
  return [
    "Patch Preview Queue handoff",
    "",
    "Inspect first.",
    "Verify current files before relying on queued evidence.",
    "Evidence is context, not proof.",
    "Produce preview diff only.",
    "Route all edits through Safe Patch Preview.",
    "No file writes without approval.",
    "No command execution without approval.",
    "Preserve latest-message authority.",
    "",
    `Goal: ${input.goal}`,
    `Primary file: ${item.primaryFile}`,
    `Target files: ${item.targetFiles.length ? item.targetFiles.join(", ") : "Verify target files first."}`,
    `Evidence ids: ${item.evidenceIds.length ? item.evidenceIds.join(", ") : "Attach evidence before preview."}`,
    `Risk: ${item.riskLevel}`,
    `Confidence: ${item.confidence}`,
    `Suspected root cause: ${item.suspectedRootCause}`,
    `Recommended approach: ${item.recommendedApproach}`,
    `Suggested tests: ${item.suggestedTests.length ? item.suggestedTests.join(", ") : "Add suggested tests before preview."}`,
    `Rollback notes: ${item.rollbackNotes.join(" ")}`,
    `No-mutation guarantee: ${item.noMutationGuarantee}`,
  ].join("\n");
}

export function buildPatchPreviewQueueHandoff(item: PatchPreviewQueueItem): PatchPreviewQueueHandoff {
  const patchPreviewPlanInput = buildPatchPreviewQueuePatchInput(item);
  return {
    id: "patch-preview-queue-handoff",
    itemId: item.id,
    prompt: buildPatchPreviewQueuePrompt(item),
    patchPreviewPlanInput,
    safetyInstructions: [
      "Inspect first.",
      "Verify current files.",
      "Evidence is context, not proof.",
      "Produce preview diff only.",
      "Route all edits through Safe Patch Preview.",
      "No file writes without approval.",
      "No command execution without approval.",
      "Preserve latest-message authority.",
    ],
    summary: summarizePatchPreviewQueueHandoff(item),
  };
}

export function summarizePatchPreviewQueueHandoff(item: PatchPreviewQueueItem): string[] {
  return [
    `Safe Patch Preview handoff prepared for ${item.primaryFile}.`,
    "Handoff requires inspect first, current file verification, and preview diff only.",
    "Operator decision remains explicit; the queue does not auto-send, auto-run, auto-write, or apply patches.",
  ];
}
