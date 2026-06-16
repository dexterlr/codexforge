param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 606 Launch Monitoring Plan Review" `
  -ScriptFile "smoke-codexforge-launch-monitoring-plan-review.ps1" `
  -Domain "src\lib\codexforge\launch-monitoring-plan-review" `
  -Route "src\app\launch-monitoring-plan-review" `
  -MainPanel "LaunchMonitoringPlanReviewPanel" `
  -CommandLabel "Go to Launch Monitoring Plan Review" `
  -Modules @("launch-monitoring-plan-review-types.ts", "launch-monitoring-plan-review-summary.ts", "index.ts") `
  -Components @("LaunchMonitoringPlanReviewPanel.tsx", "index.ts") `
  -Exports @("buildLaunchMonitoringPlanReviewStableKey", "buildLaunchMonitoringPlanReview", "buildLaunchMonitoringPlanReviews", "buildLaunchMonitoringPlanReviewBoundary", "buildLaunchMonitoringPlanReviewModel", "summarizeLaunchMonitoringPlanReview", "LAUNCH_MONITORING_PLAN_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Launch monitoring plan review", "Launch monitoring plan review does not start monitoring jobs", "Monitoring setup requires explicit operator approval", "Unresolved monitoring blockers stay blocked", "Monitoring groups", "Operator review cadence checklist") `
  -PlainEnglish @("Launch monitoring plan identity", "Evidence logging checklist", "Alert notification checklist", "Privacy redaction checklist", "Denied monitoring actions", "Unresolved monitoring blockers", "Support runbook route", "Go/no-go candidate route", "Next recommended action") `
  -RouteHref "/launch-monitoring-plan-review"

Write-Host "[OK] CodexForge Phase 606 launch monitoring plan review smoke passed."
