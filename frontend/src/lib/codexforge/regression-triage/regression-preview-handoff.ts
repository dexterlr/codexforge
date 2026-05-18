import {
  uniqueRegressionStrings,
  type RegressionCauseCandidate,
  type RegressionFixRecommendation,
  type RegressionImpactMap,
  type RegressionPreviewHandoff,
  type RegressionRollbackAdvice,
  type RegressionSignal,
} from "./regression-triage-types";

export function buildRegressionPatchPreviewPrompt(args: {
  signals?: readonly RegressionSignal[] | null;
  causes?: readonly RegressionCauseCandidate[] | null;
  impactMap?: RegressionImpactMap | null;
  rollbackAdvice?: RegressionRollbackAdvice | null;
  fixRecommendation?: RegressionFixRecommendation | null;
} = {}): string {
  const signals = args.signals ?? [];
  const causes = args.causes ?? [];
  const impactedFiles = args.impactMap?.items.map((item) => item.filePath) ?? [];
  const rollbackAdvice = args.rollbackAdvice?.options.map((option) =>
    `${option.title}${option.commandPreview ? `: ${option.commandPreview}` : ""}`
  ) ?? [];
  const suggestedTests = uniqueRegressionStrings([
    ...(args.impactMap?.items.flatMap((item) => item.suggestedSmokeScripts) ?? []),
    ...(args.fixRecommendation?.candidates.flatMap((candidate) => candidate.suggestedTests) ?? []),
  ]);

  return [
    "Self-Healing Regression Triage handoff",
    "",
    "Inspect failed output first.",
    "Verify current files before trusting triage context.",
    "Evidence is context, not proof.",
    "Produce preview diff only.",
    "Route all edits through Safe Patch Preview.",
    "No file writes without approval.",
    "No command execution without approval.",
    "Preserve latest-message authority.",
    "",
    "Signals",
    ...(signals.length ? signals.map((signal) => `- ${signal.id}: ${signal.type} / ${signal.severity} / ${signal.snippet}`) : ["- No signals supplied."]),
    "",
    "Suspected causes",
    ...(causes.length ? causes.map((cause) => `- ${cause.causeId}: ${cause.title} (${cause.reason})`) : ["- No suspected causes yet."]),
    "",
    "Impacted files",
    ...(impactedFiles.length ? impactedFiles.map((filePath) => `- ${filePath}`) : ["- No impacted files mapped."]),
    "",
    "Rollback advice",
    ...(rollbackAdvice.length ? rollbackAdvice.map((item) => `- ${item}`) : ["- No rollback advice beyond inspect first."]),
    "",
    "Suggested tests",
    ...(suggestedTests.length ? suggestedTests.map((test) => `- ${test}`) : ["- Add reviewed verification before preview."]),
  ].join("\n");
}

export function buildRegressionPreviewHandoff(args: {
  signals?: readonly RegressionSignal[] | null;
  causes?: readonly RegressionCauseCandidate[] | null;
  impactMap?: RegressionImpactMap | null;
  rollbackAdvice?: RegressionRollbackAdvice | null;
  fixRecommendation?: RegressionFixRecommendation | null;
} = {}): RegressionPreviewHandoff {
  const prompt = buildRegressionPatchPreviewPrompt(args);
  const suggestedTests = uniqueRegressionStrings([
    ...(args.impactMap?.items.flatMap((item) => item.suggestedSmokeScripts) ?? []),
    ...(args.fixRecommendation?.candidates.flatMap((candidate) => candidate.suggestedTests) ?? []),
  ]);

  return {
    id: "regression-preview-handoff",
    prompt,
    signals: (args.signals ?? []).map((signal) => signal.id),
    causes: (args.causes ?? []).map((cause) => cause.causeId),
    impactedFiles: args.impactMap?.items.map((item) => item.filePath) ?? [],
    rollbackAdvice: args.rollbackAdvice?.options.map((option) => option.title) ?? [],
    suggestedTests,
    safetyInstructions: [
      "Inspect failed output first.",
      "Verify current files.",
      "Evidence is context, not proof.",
      "Produce preview diff only.",
      "Route all edits through Safe Patch Preview.",
      "No file writes without approval.",
      "No command execution without approval.",
      "Preserve latest-message authority.",
    ],
    summary: summarizeRegressionPreviewHandoff({ prompt, suggestedTests }),
  };
}

export function summarizeRegressionPreviewHandoff(args: RegressionPreviewHandoff | {
  prompt: string;
  suggestedTests: readonly string[];
}): string[] {
  return [
    `Preview handoff prompt has ${args.prompt.length} characters.`,
    `${args.suggestedTests.length} suggested tests are included for review.`,
    "Handoff is preview diff only and requires Safe Patch Preview before edits.",
  ];
}
