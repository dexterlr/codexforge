export function buildCodexForgeValidationChecklistPayload(): string {
  return [
    "CodexForge validation checklist",
    "",
    "1. Inspect first: review the changed files and preserve latest-message authority.",
    "2. Run: npm run build",
    "3. Run targeted smoke command placeholder: powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-<phase>.ps1",
    "4. Run: npm run smoke:codexforge:server",
    "5. Run: git diff --check",
    "6. Run: git status --short",
    "7. Confirm no file writes without approval and no command execution without approval.",
  ].join("\n");
}

export function buildCodexForgeSafePatchPromptPayload(): string {
  return [
    "Prepare a safe patch preview.",
    "",
    "Inspect first before patching.",
    "Preserve latest-message authority.",
    "Summarize intended files and risks before edits.",
    "No file writes without approval.",
    "No command execution without approval.",
    "Do not mutate Brain graph, memory, or source files from UI.",
  ].join("\n");
}

export function buildCodexForgeFileInspectionPromptPayload(): string {
  return [
    "Inspect this file from CodexForge Project Reader.",
    "",
    "Inspect first.",
    "Use read-only evidence only.",
    "No file writes without approval.",
    "No command execution without approval.",
    "Do not mutate Brain graph or auto-persist file reads.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeProjectReaderPatchPreviewPromptPayload(): string {
  return [
    "Prepare Real Patch Preview from CodexForge Project Reader.",
    "",
    "Inspect first.",
    "Use selected file metadata, purpose, risk, and capped preview as read-only evidence.",
    "No file writes without approval.",
    "No command execution without approval.",
    "Build preview-only patch plan, unified diff preview, risk, tests, rollback, and handoff.",
    "Use Patch Application Gate before apply.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeRealPatchReviewPromptPayload(): string {
  return [
    "Review Real Patch Preview v1.",
    "",
    "Inspect first.",
    "Patch is preview-only.",
    "Do not write without approval.",
    "Do not execute commands without approval.",
    "Review selected file path, change request, risk, tests, rollback, and unified diff preview.",
    "Use Patch Application Gate before apply.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeApplyGateHandoffPromptPayload(): string {
  return [
    "Prepare apply-gate handoff from Real Patch Preview v1.",
    "",
    "Inspect first.",
    "Patch preview is not approval to write.",
    "Do not apply, write files, or execute commands without explicit approval.",
    "Use Patch Application Gate before apply.",
    "Carry selected file path, requested change, preview-only diff, risk, test plan, and rollback plan.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeStabilizationHandoffPayload(): string {
  return [
    "CodexForge stabilization handoff",
    "",
    "Review build posture, smoke posture, verification output, regression triage, fix queue, patch preview, preview diff, and apply gate.",
    "Copy validation commands only; do not auto-run tests or rollback.",
    "Preserve latest-message authority.",
    "Required checks: npm run build, npm run smoke:codexforge:server, git diff --check, git status --short.",
  ].join("\n");
}

export function buildCodexForgeContinuityHandoffPromptPayload(): string {
  return [
    "CodexForge Continuity Handoff Packet",
    "",
    "Review current state, known risks, validation posture, rollback posture, memory posture, Brain continuity posture, runtime event posture, snapshot restore posture, and next safe actions.",
    "Keep this copy-only and read-only: no graph mutation, no snapshot restore, no appendEvent, no saveBrainGraph from UI, no command execution, no file writes, no auto-promotion, and no auto-persistence.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeContinuityValidationChecklistPayload(): string {
  return [
    "Continuity Handoff validation checklist",
    "",
    "[ ] npm run build",
    "[ ] powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-continuity-handoff.ps1",
    "[ ] powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-continuity.ps1",
    "[ ] powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-stabilization-command-center.ps1",
    "[ ] powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-global-activity-feed.ps1",
    "[ ] powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-command-palette.ps1",
    "[ ] npm run smoke:codexforge:server",
    "[ ] git diff --check",
    "[ ] git status --short",
    "[ ] git diff --stat",
  ].join("\n");
}

export function summarizeCodexForgeCopyPayloads(): string {
  return "Copy payloads cover validation checklist, safe patch prompt, file inspection prompt, Project Reader patch preview prompt, Real Patch Preview review prompt, apply-gate handoff prompt, stabilization handoff, Continuity Handoff prompt, and Continuity Handoff validation checklist with inspect first, no file writes without approval, no command execution without approval, and preserve latest-message authority.";
}
