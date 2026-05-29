import type { ManualTrialValidationCapture } from "./live-manual-trial-types";

export function buildManualTrialValidationCapture(): ManualTrialValidationCapture {
  return { commands: ["npm run build", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-coding-flow-live-manual-trial.ps1", "npm run smoke:codexforge:server", "git diff --check"], outputRequired: true, noAutoRun: true, copyTemplate: "Validation result: command, exit code, pasted output excerpt, pass/fail/blocked." };
}
