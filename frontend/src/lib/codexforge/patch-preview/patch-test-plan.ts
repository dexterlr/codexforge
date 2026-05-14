import type { CodexForgePatchTestPlan } from "./patch-preview-types";

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/").toLowerCase();
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.trim().length > 0)));
}

export function selectSuggestedSmokeTests(filePath: string): string[] {
  const path = normalizePath(filePath);
  const tests: string[] = [];

  if (path.includes("/brain/")) {
    tests.push(
      "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-runtime.ps1",
      "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-memory-ingestion.ps1"
    );
  }

  if (path.includes("/files/") || path.includes("/app/files/")) {
    tests.push(
      "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-files-command-center.ps1",
      "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-file-brain-chat-workflow.ps1"
    );
  }

  if (path.includes("/capabilities/") || path.includes("/app/capabilities/")) {
    tests.push("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-capability-cockpit.ps1");
  }

  if (path.includes("/history/") || path.includes("history")) {
    tests.push(
      "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brand-clean.ps1",
      "npm run build"
    );
  }

  if (path.includes("/chat/") || path.includes("/ai/") || path.includes("chat")) {
    tests.push("npm run smoke:codexforge:server");
  }

  if (path.includes("/scripts/") || path.includes("smoke-")) {
    tests.push("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-all.ps1");
  }

  return unique(tests);
}

export function buildPatchTestPlan(filePath: string): CodexForgePatchTestPlan {
  const smokeTests = selectSuggestedSmokeTests(filePath);
  const suggestedTests = unique([
    "npm run build",
    "git diff --check",
    ...smokeTests,
  ]);

  return {
    filePath,
    suggestedTests,
    smokeTests,
    summary: summarizePatchTestPlan({ filePath, suggestedTests, smokeTests, summary: "" }),
  };
}

export function summarizePatchTestPlan(plan: CodexForgePatchTestPlan): string {
  return `${plan.suggestedTests.length} deterministic validations suggested for ${plan.filePath}, including build and diff whitespace checks.`;
}
