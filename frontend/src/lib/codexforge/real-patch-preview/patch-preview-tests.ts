import {
  buildRealPatchPreviewStableId,
  uniqueRealPatchPreviewStrings,
  type PatchChangeRequest,
  type PatchPreviewContext,
  type RealPatchPreviewTestPlan,
} from "./real-patch-preview-types";

function normalizePath(path: string): string {
  return path.trim().replace(/\\/g, "/").toLowerCase();
}

function smokeCommand(scriptName: string): string {
  return `powershell -ExecutionPolicy Bypass -File .\\scripts\\${scriptName}`;
}

export function selectRealPatchPreviewSmokeTests(input: {
  filePath: string;
  context?: PatchPreviewContext | null;
  request?: PatchChangeRequest | null;
}): string[] {
  const path = normalizePath(input.filePath);
  const requestText = input.request?.requestedChangeText.toLowerCase() ?? "";
  const checks: string[] = [smokeCommand("smoke-codexforge-real-patch-preview.ps1")];

  if (path.includes("/files") || path.includes("local-project-reader")) {
    checks.push(smokeCommand("smoke-codexforge-local-project-reader.ps1"));
  }
  if (path.includes("real-patch-preview") || path.includes("patch-preview") || requestText.includes("patch preview")) {
    checks.push(smokeCommand("smoke-codexforge-real-patch-preview.ps1"));
    checks.push(smokeCommand("smoke-codexforge-patch-preview.ps1"));
  }
  if (path.includes("preview-diff-composer") || requestText.includes("preview diff")) {
    checks.push(smokeCommand("smoke-codexforge-preview-diff-composer.ps1"));
  }
  if (path.includes("patch-application-gate") || path.includes("apply-diff") || path.includes("apply")) {
    checks.push(smokeCommand("smoke-codexforge-patch-application-gate.ps1"));
    checks.push(smokeCommand("smoke-codexforge-apply-diff-dry-run.ps1"));
    checks.push(smokeCommand("smoke-codexforge-apply-diff-execution-gate.ps1"));
  }
  if (path.includes("brain") || path.includes("runtime") || path.includes("graph")) {
    checks.push(smokeCommand("smoke-codexforge-brain-runtime.ps1"));
  }
  if (path.includes("command-palette")) {
    checks.push(smokeCommand("smoke-codexforge-command-palette.ps1"));
  }
  if (path.includes("navigation") || path.includes("shell")) {
    checks.push(smokeCommand("smoke-codexforge-navigation-shell.ps1"));
  }
  if (path.includes("/app/") || path.endsWith("page.tsx") || path.endsWith("layout.tsx") || path.endsWith("route.ts")) {
    checks.push("npm run smoke:codexforge:server");
  }
  const smokeMatch = input.filePath.replace(/\\/g, "/").match(/scripts\/(smoke-codexforge-[^/]+\.ps1)$/);
  if (smokeMatch) checks.push(smokeCommand(smokeMatch[1]));

  return uniqueRealPatchPreviewStrings(checks);
}

export function buildRealPatchPreviewTestPlan(input: {
  filePath: string;
  context?: PatchPreviewContext | null;
  request?: PatchChangeRequest | null;
}): RealPatchPreviewTestPlan {
  const smokeTests = selectRealPatchPreviewSmokeTests(input);
  const commands = uniqueRealPatchPreviewStrings([
    "npm run build",
    "git diff --check",
    ...smokeTests,
  ]);
  const targetedChecks = commands.filter((command) => command.includes("smoke-codexforge"));

  return {
    id: buildRealPatchPreviewStableId("real-patch-tests", input.filePath, commands.join("|")),
    filePath: input.filePath,
    commands,
    smokeTests,
    targetedChecks,
    copyOnlyNotice: "UI may copy validation commands only; it does not execute them.",
    summary: summarizeRealPatchPreviewTestPlan({
      id: "pending",
      filePath: input.filePath,
      commands,
      smokeTests,
      targetedChecks,
      copyOnlyNotice: "",
      summary: "",
    }),
  };
}

export function summarizeRealPatchPreviewTestPlan(plan: RealPatchPreviewTestPlan): string {
  return `Test plan for ${plan.filePath}: ${plan.commands.length} copy-only command(s), including npm run build and git diff --check.`;
}
