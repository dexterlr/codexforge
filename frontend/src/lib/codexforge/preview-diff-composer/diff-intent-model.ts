import {
  buildPreviewDiffComposerStableKey,
  type DiffCompositionInput,
  type DiffIntentChange,
  type DiffIntentModel,
  type PreviewDiffIntentCategory,
} from "./preview-diff-composer-types";
import { selectDiffVerificationChecks } from "./diff-verification-plan";

function inferCategory(input: DiffCompositionInput, filePath: string): PreviewDiffIntentCategory {
  const text = `${input.goal} ${input.recommendedApproach} ${filePath}`.toLowerCase();
  if (text.includes("test") || filePath.includes(".test.") || filePath.includes(".spec.")) return "test";
  if (text.includes("docs") || filePath.toLowerCase().endsWith(".md")) return "docs";
  if (text.includes("guard") || text.includes("blocked") || text.includes("policy")) return "guard";
  if (text.includes("rename")) return "rename";
  if (text.includes("remove")) return "remove";
  if (text.includes("refactor")) return "refactor";
  if (text.includes("add") || text.includes("create")) return "add";
  if (input.confidence < 0.35) return "investigation";
  return "update";
}

function inferAffectedSymbols(filePath: string): string[] {
  const basename = filePath.split("/").pop() ?? filePath;
  const stem = basename.replace(/\.[^.]+$/, "");
  return [stem, "current exported symbols", "visible UI state or typed helper contract"];
}

export function buildDiffIntentChange(
  input: DiffCompositionInput,
  filePath: string,
  category: PreviewDiffIntentCategory = inferCategory(input, filePath)
): DiffIntentChange {
  return {
    id: `preview-diff-intent-change-${buildPreviewDiffComposerStableKey(input.id, filePath, category)}`,
    category,
    targetFile: filePath,
    whatShouldChange: input.recommendedApproach,
    whyItShouldChange: input.suspectedRootCause,
    expectedAffectedSymbols: inferAffectedSymbols(filePath),
    expectedRisk: input.riskLevel,
    acceptanceCriteria: [
      "Current file content has been inspected before any real edit.",
      "The real diff is minimal and matches the reviewed intent.",
      "Safe Patch Preview review happens before file mutation.",
    ],
    evidenceReferences: input.evidenceIds,
    verificationChecks: selectDiffVerificationChecks(input, [filePath]).checks,
  };
}

export function buildDiffIntentModel(input: DiffCompositionInput): DiffIntentModel {
  const changes = input.targetFiles.map((filePath) => buildDiffIntentChange(input, filePath));
  return {
    id: `preview-diff-intent-${buildPreviewDiffComposerStableKey(input.id)}`,
    compositionInputId: input.id,
    goal: input.goal,
    changes,
    summary: summarizeDiffIntentModel({ id: "pending", compositionInputId: input.id, goal: input.goal, changes, summary: [] }),
  };
}

export function summarizeDiffIntentModel(model: DiffIntentModel): string[] {
  return [
    `${model.changes.length} intent change(s) prepared for preview-only composition.`,
    "Intent describes what and why; it does not fabricate exact source edits.",
    "Verification checks remain suggestions and are not executed here.",
  ];
}
