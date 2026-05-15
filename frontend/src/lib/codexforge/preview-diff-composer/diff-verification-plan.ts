import {
  buildPreviewDiffComposerStableKey,
  uniquePreviewDiffComposerStrings,
  type DiffCompositionInput,
  type DiffVerificationPlan,
} from "./preview-diff-composer-types";

export function selectDiffVerificationChecks(
  input: DiffCompositionInput,
  targetFiles: readonly string[] = input.targetFiles
): DiffVerificationPlan {
  const fileText = targetFiles.join(" ").toLowerCase();
  const smokeScripts = [
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-preview-diff-composer.ps1",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-patch-preview.ps1",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-grounded-fix-recommendation.ps1",
  ];

  if (fileText.includes("chat") || fileText.includes("ai/page")) {
    smokeScripts.push("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-chat-recall-context.ps1");
  }
  if (fileText.includes("brain")) {
    smokeScripts.push("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-runtime.ps1");
  }
  if (fileText.includes("files")) {
    smokeScripts.push("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-files-command-center.ps1");
  }
  if (input.suggestedTests.length > 0) {
    smokeScripts.push(...input.suggestedTests.filter((test) => test.toLowerCase().includes("smoke")));
  }

  const checks = uniquePreviewDiffComposerStrings([
    "npm run build",
    "git diff --check",
    ...smokeScripts,
    ...input.suggestedTests,
  ]);

  return {
    id: `preview-diff-verification-plan-${buildPreviewDiffComposerStableKey(input.id, targetFiles.join("|"))}`,
    compositionInputId: input.id,
    checks,
    smokeScripts: uniquePreviewDiffComposerStrings(smokeScripts),
    summary: [`${checks.length} verification check(s) suggested; no tests are run here.`],
  };
}

export function buildDiffVerificationPlan(input: DiffCompositionInput): DiffVerificationPlan {
  const plan = selectDiffVerificationChecks(input);
  return {
    ...plan,
    id: `preview-diff-verification-plan-${buildPreviewDiffComposerStableKey(input.id)}`,
    summary: summarizeDiffVerificationPlan(plan),
  };
}

export function summarizeDiffVerificationPlan(plan: DiffVerificationPlan): string[] {
  return [
    `${plan.checks.length} checks suggested, including npm run build and git diff --check.`,
    `${plan.smokeScripts.length} smoke script(s) selected from file impact and queue metadata.`,
    "No command execution happens inside Preview Diff Composer.",
  ];
}
