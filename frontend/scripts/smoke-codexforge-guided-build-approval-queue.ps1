param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1029 Guided Build Approval Queue" `
  -ScriptFile "smoke-codexforge-guided-build-approval-queue.ps1" `
  -Domain "src\lib\codexforge\guided-build-approval-queue" `
  -Route "src\app\guided-build-approval-queue" `
  -MainPanel "GuidedBuildApprovalQueuePanel" `
  -CommandLabel "Go to Guided Build Approval Queue" `
  -Modules @("guided-build-approval-queue-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildApprovalQueueStableKey", "buildGuidedBuildApprovalQueue", "buildGuidedBuildApprovalQueueItems", "buildGuidedBuildApprovalQueueBoundary", "buildGuidedBuildApprovalQueueModel", "summarizeGuidedBuildApprovalQueue", "GUIDED_BUILD_APPROVAL_QUEUE_LANGUAGE") `
  -PhaseMarkers @("Guided build approval queue", "Guided build approval queue does not approve actions", "Approval queue decisions require explicit operator approval", "Approval queues list every gated model backend and domain action", "Denied guided build approval queue paths remain blocked", "Guided build approval queue checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build approval queue does not approve actions", "Approval queue decisions require explicit operator approval", "Denied guided build approval queue paths remain blocked") `
  -RouteHref "/guided-build-approval-queue"

Write-Host "[OK] CodexForge Phase 1029 Guided Build Approval Queue smoke passed."
