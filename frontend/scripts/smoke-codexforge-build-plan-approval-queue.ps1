param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1051 Build Plan Approval Queue" `
  -ScriptFile "smoke-codexforge-build-plan-approval-queue.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-queue" `
  -Route "src\app\build-plan-approval-queue" `
  -MainPanel "BuildPlanApprovalQueuePanel" `
  -CommandLabel "Go to Build Plan Approval Queue" `
  -Modules @("build-plan-approval-queue-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalQueueStableKey", "buildBuildPlanApprovalQueue", "buildBuildPlanApprovalQueueItems", "buildBuildPlanApprovalQueueBoundary", "buildBuildPlanApprovalQueueModel", "summarizeBuildPlanApprovalQueue", "BUILD_PLAN_APPROVAL_QUEUE_LANGUAGE") `
  -PhaseMarkers @("Build plan approval queue", "Build plan approval queue does not persist approval decisions", "Approval queue decisions require explicit operator approval", "Approval queue items remain preview-only until operator signoff", "Denied build plan approval queue paths remain blocked", "Build plan approval queue checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval queue does not persist approval decisions", "Approval queue decisions require explicit operator approval", "Denied build plan approval queue paths remain blocked") `
  -RouteHref "/build-plan-approval-queue"

Write-Host "[OK] CodexForge Phase 1051 Build Plan Approval Queue smoke passed."
