import type { CodingFlowValidationCopyFix } from "./coding-flow-ux-fix-types";

export function buildValidationGuidanceCopy(): string[] {
  return ["Copy these checks.", "Run them in your terminal.", "Paste the output back for review.", "If a check fails, open Closed Loop."];
}

export function buildCodingFlowValidationCopyFix(): CodingFlowValidationCopyFix {
  return {
    copyId: "coding-flow-validation-copy-simple",
    title: "Simplified validation copy",
    guidance: buildValidationGuidanceCopy(),
    checks: [
      { id: "build-check", label: "Build check", meaning: "Confirms the app compiles.", commandCopy: "npm run build" },
      { id: "targeted-smoke", label: "Targeted smoke", meaning: "Checks the changed surface.", commandCopy: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-coding-flow-ux-fix.ps1" },
      { id: "server-smoke", label: "Server smoke", meaning: "Checks the managed smoke path.", commandCopy: "npm run smoke:codexforge:server" },
      { id: "git-diff-check", label: "Git diff check", meaning: "Catches whitespace errors.", commandCopy: "git diff --check" },
      { id: "status-stat-check", label: "Status/stat check", meaning: "Shows changed files before handoff.", commandCopy: "git status --short && git diff --stat" },
    ],
    status: "simple-copy-ready",
  };
}

export function summarizeCodingFlowValidationCopyFix(fix: CodingFlowValidationCopyFix): string {
  return `${fix.title}: ${fix.guidance.join(" ")}`;
}
