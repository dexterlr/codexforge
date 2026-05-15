import { buildGroundedFixFileImpact } from "./fix-file-impact";
import type { GroundedFixCandidate, GroundedFixPatchPreviewInput, GroundedFixPreviewHandoff } from "./grounded-fix-types";

export function buildGroundedFixPatchPreviewInput(candidate: GroundedFixCandidate): GroundedFixPatchPreviewInput {
  const impact = buildGroundedFixFileImpact(candidate);
  return {
    goal: candidate.goal,
    targetFiles: candidate.targetFiles,
    evidence: candidate.evidenceIds,
    risks: candidate.relatedRisks,
    suggestedTests: impact.items.flatMap((item) => item.suggestedSmokeScripts),
    rollbackReminders: [
      "Keep the preview diff reversible.",
      "Do not write files without approval.",
      "Preserve latest-message authority.",
    ],
    previewOnly: true,
    safePatchPreviewRequired: true,
  };
}

export function buildGroundedFixPrompt(candidate: GroundedFixCandidate): string {
  const input = buildGroundedFixPatchPreviewInput(candidate);
  return [
    "Grounded Fix Recommendation handoff",
    "",
    "Inspect first. Verify current files before relying on evidence.",
    "Evidence is context, not proof.",
    "Produce preview diff only.",
    "Route mutation through Safe Patch Preview.",
    "No file writes without approval.",
    "No command execution without approval.",
    "Preserve latest-message authority.",
    "",
    `Goal: ${input.goal}`,
    `Target files: ${input.targetFiles.length ? input.targetFiles.join(", ") : "Verify current file targets first."}`,
    `Evidence ids: ${input.evidence.length ? input.evidence.join(", ") : "Manual goal only."}`,
    `Risks: ${input.risks.length ? input.risks.join(", ") : "No additional risk hints supplied."}`,
    `Suggested tests: ${input.suggestedTests.length ? input.suggestedTests.join(", ") : "Add a test plan before preview."}`,
    `Rollback reminders: ${input.rollbackReminders.join(" ")}`,
  ].join("\n");
}

export function buildGroundedFixPreviewHandoff(candidate: GroundedFixCandidate): GroundedFixPreviewHandoff {
  const patchPreviewInput = buildGroundedFixPatchPreviewInput(candidate);
  return {
    id: "grounded-fix-preview-handoff",
    candidateId: candidate.id,
    targetFiles: candidate.targetFiles,
    prompt: buildGroundedFixPrompt(candidate),
    patchPreviewInput,
    safetyInstructions: [
      "Inspect first.",
      "Verify current files.",
      "Evidence is context, not proof.",
      "Produce preview diff only.",
      "Use Safe Patch Preview for edits.",
      "No file writes without approval.",
      "No command execution without approval.",
      "Preserve latest-message authority.",
    ],
    summary: summarizeGroundedFixPreviewHandoff(patchPreviewInput),
  };
}

export function summarizeGroundedFixPreviewHandoff(input: GroundedFixPatchPreviewInput): string[] {
  return [
    `Preview handoff prepared for ${input.targetFiles.length} target files.`,
    "Handoff requires inspection first and preview diff only.",
    "Safe Patch Preview is required for any edits.",
  ];
}
