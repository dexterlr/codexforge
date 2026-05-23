import type { LiveTrialValidationCommand, LiveTrialValidationGuide } from "./coding-flow-live-trial-types";

export function buildLiveTrialValidationCommand(input: LiveTrialValidationCommand): LiveTrialValidationCommand {
  return { ...input, copyOnly: true };
}

function command(commandId: string, label: string, value: string, whenToUse: string, outputToCapture: string): LiveTrialValidationCommand {
  return buildLiveTrialValidationCommand({ commandId, label, command: value, whenToUse, outputToCapture, copyOnly: true });
}

export function buildLiveTrialValidationGuide(): LiveTrialValidationGuide {
  return {
    guideId: "coding-flow-live-trial-validation-guide",
    title: "Manual Validation Guide",
    commands: [
      command("npm-build", "Build", "npm run build", "After any UI or TypeScript change.", "Pass/fail and first relevant error."),
      command("targeted-smoke", "Targeted smoke", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-<touched-feature>.ps1", "When the touched surface has a known smoke.", "Pass/fail and failed assertion."),
      command("server-smoke", "Server smoke", "npm run smoke:codexforge:server", "Before finishing the trial.", "Overall smoke status."),
      command("diff-check", "Whitespace diff check", "git diff --check", "Before handoff.", "No whitespace errors or the exact failures."),
      command("status-short", "Git status", "git status --short", "Before result capture.", "Changed file list."),
      command("diff-stat", "Diff stat", "git diff --stat", "Before handoff.", "Small scope confirmation."),
    ],
    outputCaptureGuide: ["Do not auto-run commands from UI.", "Copy commands only.", "For UI copy only, include build plus targeted smoke when known.", "Capture capped output, not huge logs.", "Failed validation routes to /closed-loop."],
  };
}

export function summarizeLiveTrialValidationGuide(guide = buildLiveTrialValidationGuide()): string {
  return `${guide.commands.length} copy-only validation commands; no auto-run.`;
}
