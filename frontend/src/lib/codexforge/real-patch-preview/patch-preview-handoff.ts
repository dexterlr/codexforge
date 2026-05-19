import {
  buildRealPatchPreviewStableId,
  type PatchChangeRequest,
  type PatchPreviewContext,
  type RealPatchPreviewHandoff,
  type RealPatchPreviewPlan,
  type RealPatchPreviewRiskReport,
  type RealPatchPreviewRollbackPlan,
  type RealPatchPreviewTestPlan,
  type UnifiedDiffPreview,
} from "./real-patch-preview-types";

type HandoffInput = {
  request: PatchChangeRequest;
  context: PatchPreviewContext;
  plan: RealPatchPreviewPlan;
  diffPreview: UnifiedDiffPreview;
  riskReport: RealPatchPreviewRiskReport;
  testPlan: RealPatchPreviewTestPlan;
  rollbackPlan: RealPatchPreviewRollbackPlan;
};

function linesForCommonHeader(input: HandoffInput): string[] {
  return [
    "CodexForge Real Patch Preview v1 handoff",
    "",
    "Operating rules:",
    "- inspect first",
    "- patch is preview-only",
    "- do not write without approval",
    "- do not execute commands without approval",
    "- use Patch Application Gate before apply",
    "- preserve latest-message authority",
    "",
    `Selected file: ${input.context.filePath}`,
    `Change request: ${input.request.requestedChangeText}`,
    `Risk: ${input.riskReport.level} (${input.riskReport.score})`,
  ];
}

export function buildRealPatchApplyPromptPreview(input: HandoffInput): string {
  return [
    ...linesForCommonHeader(input),
    "",
    "Apply-gate handoff preview:",
    "Use this only after explicit approval and current file inspection. Real Patch Preview v1 does not apply patches.",
    "",
    "Preview diff:",
    input.diffPreview.diffText,
    "",
    "Tests to copy and run manually after approved changes:",
    ...input.testPlan.commands.map((command) => `- ${command}`),
    "",
    "Rollback:",
    ...input.rollbackPlan.notes.map((note) => `- ${note}`),
  ].join("\n");
}

export function buildRealPatchReviewPrompt(input: HandoffInput): string {
  return [
    ...linesForCommonHeader(input),
    "",
    "Review task:",
    "Review the preview-only patch plan, risk, tests, rollback notes, and diff artifact. Do not write files, do not apply diffs, do not execute commands, and do not mutate Brain graph.",
    "",
    "Plan summary:",
    input.plan.summary,
    "",
    "Risk summary:",
    input.riskReport.summary,
    "",
    "Diff summary:",
    input.diffPreview.summary,
  ].join("\n");
}

export function buildRealPatchPreviewHandoff(input: HandoffInput): RealPatchPreviewHandoff {
  const reviewPrompt = buildRealPatchReviewPrompt(input);
  const applyGatePromptPreview = buildRealPatchApplyPromptPreview(input);
  const handoff: RealPatchPreviewHandoff = {
    id: buildRealPatchPreviewStableId("real-patch-handoff", input.request.id, input.diffPreview.id),
    selectedFilePath: input.context.filePath,
    reviewPrompt,
    applyGatePromptPreview,
    summary: "",
    copyOnly: true,
    previewOnly: true,
  };

  return {
    ...handoff,
    summary: summarizeRealPatchPreviewHandoff(handoff),
  };
}

export function summarizeRealPatchPreviewHandoff(handoff: RealPatchPreviewHandoff): string {
  return `Copy-only handoff ready for ${handoff.selectedFilePath}: inspect first, preview-only, do not write without approval, and use Patch Application Gate before apply.`;
}
