param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 605 Launch Rollback Plan Review" `
  -ScriptFile "smoke-codexforge-launch-rollback-plan-review.ps1" `
  -Domain "src\lib\codexforge\launch-rollback-plan-review" `
  -Route "src\app\launch-rollback-plan-review" `
  -MainPanel "LaunchRollbackPlanReviewPanel" `
  -CommandLabel "Go to Launch Rollback Plan Review" `
  -Modules @("launch-rollback-plan-review-types.ts", "launch-rollback-plan-review-summary.ts", "index.ts") `
  -Components @("LaunchRollbackPlanReviewPanel.tsx", "index.ts") `
  -Exports @("buildLaunchRollbackPlanReviewStableKey", "buildLaunchRollbackPlanReview", "buildLaunchRollbackPlanReviews", "buildLaunchRollbackPlanReviewBoundary", "buildLaunchRollbackPlanReviewModel", "summarizeLaunchRollbackPlanReview", "LAUNCH_ROLLBACK_PLAN_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Launch rollback plan review", "Launch rollback plan review does not trigger rollback", "Rollback actions require explicit operator approval", "Unsafe rollback shortcuts stay blocked", "Rollback groups", "Stop condition checklist") `
  -PlainEnglish @("Launch rollback plan identity", "Rollback action checklist", "Escalation checklist", "Evidence logging checklist", "Denied rollback actions", "Unresolved rollback blockers", "Monitoring plan route", "Support runbook route", "Next recommended action") `
  -RouteHref "/launch-rollback-plan-review"

Write-Host "[OK] CodexForge Phase 605 launch rollback plan review smoke passed."
