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
    "8. Validation Runner v1 route: /validation; approval-gated, allowlisted, request-ready/manual-only.",
  ].join("\n");
}

export function buildCodexForgeHardenedValidationChecklistPayload(): string {
  return [
    "Hardened apply validation checklist",
    "",
    "[ ] Preview diff reviewed",
    "[ ] Approval packet checked",
    "[ ] Rollback plan visible",
    "[ ] npm run build",
    "[ ] targeted smoke for changed surface",
    "[ ] npm run smoke:codexforge:server",
    "[ ] git diff --check",
    "[ ] git status --short",
    "[ ] git diff --stat",
    "[ ] Preserve latest-message authority",
    "[ ] No auto-apply and no auto-run",
  ].join("\n");
}

export function buildCodexForgeHardenedRollbackPlanPayload(): string {
  return [
    "Hardened rollback plan",
    "",
    "Before apply: git status --short",
    "Before apply: git diff --stat",
    "After apply before commit: git restore -- <target-file>",
    "After commit: git revert <commit-sha>",
    "If validation fails: keep diff/output and route to Closed Loop.",
    "If smoke fails: do not stack unrelated changes.",
  ].join("\n");
}

export function buildCodexForgeCompletionGuidancePayload(): string {
  return [
    "Completion guidance",
    "",
    "git status --short",
    "git diff --stat",
    "git add -A",
    "git commit -m \"<message>\"",
    "git tag <tag-if-appropriate>",
    "git push origin <branch> --follow-tags",
    "",
    "Do not execute these commands from the UI.",
  ].join("\n");
}

export function buildCodexForgeWorkflowHandoffPayload(): string {
  return [
    "Workflow result handoff",
    "",
    "Capture what happened.",
    "Include capped validation status and next action.",
    "No raw secrets, no huge raw output, and no auto-persist into Brain.",
    "Reviewed by operator status must be explicit.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeValidationResultSummaryPayload(): string {
  return [
    "Validation result summary",
    "",
    "Command: <reviewed command>",
    "Status: pass/fail/warning/unknown/not-run/manual-only",
    "Output excerpt: capped and supplied by operator only.",
    "Failure route: /closed-loop when validation failed.",
    "No command execution from UI.",
  ].join("\n");
}

export function buildCodexForgeMemoryReviewCandidatePayload(): string {
  return [
    "Workflow result memory review candidate",
    "",
    "Source result: <reviewed result id>",
    "Reusable lesson: <operator-reviewed summary>",
    "Excluded sensitive details: raw secrets, huge logs, source code snippets not reviewed.",
    "No-auto-promotion guarantee.",
    "Route only to Memory Review or Operator Memory Inbox.",
  ].join("\n");
}

export function buildCodexForgeCodingUxFixChecklistPayload(): string {
  return [
    "Coding Flow UX fix checklist",
    "",
    "[ ] One primary action above the fold",
    "[ ] Pick a file / Describe the change / Preview patch wording",
    "[ ] Apply blocked reasons explain preview, approval, or rollback",
    "[ ] Copy these checks / Run them in your terminal / Paste the output back",
    "[ ] Result handoff says what happened and what comes next",
    "[ ] Advanced details collapsed by default",
    "[ ] No auto-apply, no auto-run, approval required",
    "[ ] Preserve latest-message authority",
  ].join("\n");
}

export function buildCodexForgeSimplifiedValidationCopyPayload(): string {
  return [
    "Copy these checks.",
    "Run them in your terminal.",
    "Paste the output back for review.",
    "If a check fails, open Closed Loop.",
    "",
    "Build check: npm run build",
    "Targeted smoke: powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-coding-flow-ux-fix.ps1",
    "Server smoke: npm run smoke:codexforge:server",
    "Git diff check: git diff --check",
    "Status/stat check: git status --short and git diff --stat",
  ].join("\n");
}

export function buildCodexForgeRouteHandoffChecklistPayload(): string {
  return [
    "Coding Flow route handoff checklist",
    "",
    "/start -> /code-flow: Fix code.",
    "/code-flow -> /files: Pick a file.",
    "/code-flow -> /apply-validation: Review apply.",
    "/apply-validation -> /validation: Prepare checks.",
    "/validation -> /workflow-results: Capture result.",
    "/workflow-results -> /run-history: Review history.",
    "Failed validation -> /closed-loop: Review failure.",
    "/code-flow/trial -> /code-flow/trial-review: Review trial.",
    "/code-flow/trial-review -> /code-flow/ux-fixes: Open UX fixes.",
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

export function buildCodexForgeApprovedPatchApplyReviewPromptPayload(): string {
  return [
    "Review Approved Patch Apply v1.",
    "",
    "Inspect first.",
    "Approval required.",
    "No command execution from UI.",
    "No direct apply-diff from UI.",
    "No file writes without approval.",
    "Require preview diff, policy pass, preflight, dry-run preview, rollback plan, validation plan, and latest-message authority.",
    "If request-ready/blocked, proceed to Phase 59 Validation Runner v1 planning; do not apply automatically.",
  ].join("\n");
}

export function buildCodexForgeApplyGuardReviewPayload(): string {
  return [
    "Real Apply Guard Review report",
    "",
    "Review the apply guard before any apply automation increase.",
    "Check approval packet enforcement, preview diff, diff boundaries, path boundaries, rollback confidence, command/write separation, validation requirement, failure routing, and latest-message authority.",
    "No auto-apply.",
    "No auto-run.",
    "No file writes.",
    "No command execution.",
    "executionAllowed false in Phase 82.",
  ].join("\n");
}

export function buildCodexForgeApplyGuardRequiredFixesPayload(): string {
  return [
    "Real Apply Guard Review required fixes",
    "",
    "Fix safety blockers first: direct UI apply/write/run bypass, missing approval packet, unsafe diff boundary, unsafe path boundary, missing rollback, missing validation route, command/write mixing, or unclear blocked reason routing.",
    "Do not remove approval boundaries.",
    "Do not add direct apply buttons.",
    "Do not auto-run validation.",
  ].join("\n");
}

export function buildCodexForgeGuardedApplyCandidateBriefPayload(): string {
  return [
    "Guarded apply candidate brief",
    "",
    "Only proceed when go/no-go permits.",
    "Candidate still requires explicit approval, dry-run evidence, rollback guidance, validation checklist, path boundary proof, diff boundary proof, and latest-message authority.",
    "go-for-guarded-apply-candidate does not execute in Phase 82.",
    "executionAllowed false in Phase 82.",
  ].join("\n");
}

export function buildCodexForgeGuardedApplyCandidatePlanPayload(): string {
  return [
    "Guarded Apply Candidate Implementation Plan",
    "",
    "One file only.",
    "One preview diff only.",
    "One explicit approval packet tied to exact diff hash/label and latest request.",
    "One guarded apply request through an approved boundary only if present.",
    "One rollback plan with git restore and git revert guidance.",
    "One validation checklist separate from apply.",
    "One result handoff to Workflow Results and Run History.",
    "No combined apply + run validation button.",
    "No arbitrary write-file UI.",
    "No arbitrary apply-diff UI.",
    "No arbitrary run-command UI.",
    "Execution allowed false in Phase 83.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeGuardedApplyImplementationGapsPayload(): string {
  return [
    "Guarded Apply Candidate implementation gaps",
    "",
    "Blocker: no exact diff hash/label.",
    "Blocker: approval not tied to exact diff.",
    "Blocker: direct tool call risk.",
    "High: rollback not explicit enough.",
    "High: validation result capture missing.",
    "High: apply evidence not captured.",
    "Medium: UI still too confusing.",
    "Medium: missing smoke coverage.",
    "Clear blocker gaps before implementation.",
  ].join("\n");
}

export function buildCodexForgeGuardedApplyNextPromptPayload(): string {
  return [
    "Next guarded apply implementation prompt",
    "",
    "Inspect first.",
    "Do not enable real apply unless a policy-gated guarded boundary exists.",
    "Keep the first candidate to one low-risk text file and one exact preview diff.",
    "Require explicit approval tied to diff hash/label, selected file, and latest request.",
    "Keep apply and validation separate.",
    "No auto-apply, no auto-run, no automatic commit, no memory auto-promotion.",
  ].join("\n");
}

export function buildCodexForgeCreativeBridgeHandoffPayload(): string {
  return [
    "Creative Local Bridge v1 handoff",
    "",
    "Inspect first.",
    "Preview-only in Phase 61.",
    "No render execution without future guarded executor.",
    "No Blender, ComfyUI, Unreal, video render, provider, command, or artifact file execution from UI.",
    "Review bridge profile, adapter, job request, approval packet, artifact capture plan, and safety policy.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeBlenderAdapterPreviewPromptPayload(): string {
  return [
    "Blender Adapter Preview v1 prompt",
    "",
    "Inspect first.",
    "Use Creative Local Bridge v1 metadata only.",
    "Prepare a Blender scene adapter preview without launching Blender.",
    "Review typed scene model, object plan, material plan, lighting plan, camera plan, render settings, Python preview, and future executor packet.",
    "Do not render, run commands, write artifact files, call providers, or mutate source files from UI.",
    "Require future guarded executor before any local app execution.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeVideoRenderPlanPayload(): string {
  return [
    "Video Render Job Preview v1 render plan",
    "",
    "Inspect first.",
    "Plan creative video/cinematic intent to render input, timeline, shot plan, provider plan, queue preview, artifact expectations, approval packet, and policy.",
    "Do not execute renders, launch Blender, call ComfyUI, launch Unreal, run ffmpeg, execute commands, or write artifact files.",
    "Keep this preview-only and preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeVideoRenderQueuePayload(): string {
  return [
    "Video Render Job Preview v1 queue preview",
    "",
    "Copy queue metadata only.",
    "No render execution.",
    "No command execution.",
    "No ffmpeg execution.",
    "No file writes.",
    "Future executor boundary required before any local app action.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeVideoRenderFutureExecutorPacketPayload(): string {
  return [
    "Video Render future executor packet review",
    "",
    "Copy packet metadata only.",
    "No Blender execution.",
    "No ComfyUI execution.",
    "No Unreal execution.",
    "No ffmpeg execution.",
    "No render execution.",
    "No file writes.",
    "Future executor boundary required before any local app action.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeCreativeExecutorDryRunPayload(): string {
  return [
    "Guarded Creative Executor dry-run",
    "",
    "Copy dry-run plan only.",
    "No render execution.",
    "No command execution.",
    "No file writes.",
    "No Blender, ComfyUI, Unreal, ffmpeg, or local renderer execution.",
    "Future guarded executor remains request-ready only.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeCreativeExecutorFuturePacketPayload(): string {
  return [
    "Guarded Creative Executor future packet",
    "",
    "Review request, adapter allowlist, local bridge health, approval packet, preflight, dry-run, kill-switch plan, artifact capture plan, and result boundary.",
    "Do not execute from Command Palette.",
    "Do not launch local apps, render, package/build, call endpoints, write files, or call provider APIs.",
    "Execution disabled in Phase 67.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeCreativeSandboxReportPayload(): string {
  return [
    "Creative Execution Sandbox report",
    "",
    "Sandbox only.",
    "Simulation-only fake lifecycle.",
    "No real execution.",
    "No render execution.",
    "No command execution.",
    "No local HTTP calls.",
    "No provider API calls.",
    "No file writes.",
    "Review request, run model, lifecycle, cancellation path, fake artifacts, simulated logs, verification checks, review handoff, and next safe action.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeCreativeSandboxReviewHandoffPayload(): string {
  return [
    "Creative Execution Sandbox to Creative Artifact Review handoff",
    "",
    "Sandbox only.",
    "No real files written.",
    "No render executed.",
    "No local process launched.",
    "Artifact review is for placeholders/supplied evidence only.",
    "Open Creative Artifact Review after sandbox verification and artifact labeling are reviewed.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeLocalBridgeSetupGuidePayload(): string {
  return [
    "Local Bridge Health setup guide",
    "",
    "Review Blender, ComfyUI, Unreal, ffmpeg, artifact output boundary, adapter allowlist, and guarded executor policy.",
    "Preview-only/manual-only/future-guarded.",
    "No command execution, no local HTTP calls by default, no file writes, no render execution, and no local app launch.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeFutureHealthProbePacketPayload(): string {
  return [
    "Future health probe packet review",
    "",
    "Copy future probe metadata only.",
    "Require approval, explicit allowlist, operator review, safe metadata-only boundaries, and no execution by default.",
    "No Blender launch, no ComfyUI HTTP request, no Unreal launch, no ffmpeg version command, no artifact directory write, no command execution, and no render execution.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeCreativeReadinessReportPayload(): string {
  return [
    "Real Creative Executor Readiness Audit report",
    "",
    "Audit-only in Phase 70.",
    "Review bridge profiles, adapter allowlists, path boundaries, artifact output, dry-run evidence, approval, kill-switch, scorecard, and next action.",
    "No real execution.",
    "No render execution.",
    "No command execution.",
    "No local HTTP calls.",
    "No provider API calls.",
    "No file writes.",
    "Execution allowed false.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeCreativeReadinessHealthProbePacketPayload(): string {
  return [
    "Phase 71 Future Guarded Health Probe readiness packet",
    "",
    "Use only after Real Creative Executor Readiness Audit review.",
    "Require local bridge profile configuration, adapter allowlist, path boundaries, artifact output boundary, dry-run evidence, approval packet, kill-switch model, and smoke coverage.",
    "Recommend Phase 71 Future Guarded Health Probe, not real execution yet.",
    "No Blender launch, no ComfyUI endpoint call, no Unreal launch, no ffmpeg command, no render execution, no command execution, and no file writes from UI.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeCreativeMvpDesignPacketPayload(): string {
  return [
    "Real Creative Executor MVP Design packet",
    "",
    "Review the Phase 72 MVP candidate design.",
    "Recommended first MVP: artifact-capture-only.",
    "Execution allowed false.",
    "No real execution.",
    "No render execution.",
    "No command execution.",
    "No local HTTP calls.",
    "No provider API calls.",
    "No file writes.",
    "Require approval packet, output boundary, kill-switch posture, artifact review loop, and preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeCreativeMvpUserFlowPayload(): string {
  return [
    "User-friendly creative MVP flow",
    "",
    "Pick one creative tool path.",
    "Check setup.",
    "Review safety.",
    "Run sandbox.",
    "Approve future execution packet.",
    "Capture output.",
    "Review artifact.",
    "Decide next action.",
    "Keep advanced details secondary and do not execute anything from UI.",
  ].join("\n");
}

export function buildCodexForgeUnrealCommandPreviewPromptPayload(): string {
  return [
    "Unreal Adapter Preview v1 command preview prompt",
    "",
    "Inspect first.",
    "Use Creative Local Bridge v1 metadata only.",
    "Prepare an Unreal level/cinematic adapter preview without launching Unreal.",
    "Review typed level model, actor plan, asset plan, material plan, Blueprint plan, Sequencer plan, build settings, command preview, and future executor packet.",
    "Do not launch Unreal, execute editor commands, run Python or Blueprint automation, render, package/build, write artifact files, call providers, or mutate source files from UI.",
    "Require future guarded creative executor before any local app execution.",
    "Preserve latest-message authority.",
  ].join("\n");
}

export function buildCodexForgeUnrealFutureExecutorPacketPayload(): string {
  return [
    "Unreal future executor packet review",
    "",
    "Copy packet metadata only.",
    "No Unreal execution.",
    "No Unreal Editor launch.",
    "No render execution.",
    "No package/build.",
    "No file writes.",
    "Future executor boundary required before any local app action.",
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
  return "Copy payloads cover validation checklist, Validation Runner v1 checklist, safe patch prompt, file inspection prompt, Project Reader patch preview prompt, Real Patch Preview review prompt, apply-gate handoff prompt, Approved Patch Apply review prompt, Creative Local Bridge handoff, Video Render Job Preview plan, video render queue, video future executor packet, Guarded Creative Executor dry-run, Creative Execution Sandbox report, Real Creative Executor Readiness Audit report, Phase 71 Future Guarded Health Probe readiness packet, Real Creative Executor MVP Design packet, user-friendly creative MVP flow, Creative Execution Sandbox to Creative Artifact Review handoff, Blender Adapter Preview prompt, Unreal Adapter Preview prompt, stabilization handoff, Continuity Handoff prompt, and Continuity Handoff validation checklist with inspect first, no file writes without approval, no command execution without approval, and preserve latest-message authority.";
}

export function buildCodexForgeBlenderFutureExecutorPacketPayload(): string {
  return [
    "Blender future executor packet review",
    "",
    "Copy packet metadata only.",
    "No Blender execution.",
    "No render execution.",
    "No file writes.",
    "Future executor boundary required before any local app action.",
    "Preserve latest-message authority.",
  ].join("\n");
}
