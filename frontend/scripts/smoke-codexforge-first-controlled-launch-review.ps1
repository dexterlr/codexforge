param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 610 First Controlled Launch Review" `
  -ScriptFile "smoke-codexforge-first-controlled-launch-review.ps1" `
  -Domain "src\lib\codexforge\first-controlled-launch-review" `
  -Route "src\app\first-controlled-launch-review" `
  -MainPanel "FirstControlledLaunchReviewPanel" `
  -CommandLabel "Go to First Controlled Launch Review" `
  -Modules @("first-controlled-launch-review-types.ts", "first-controlled-launch-review-summary.ts", "index.ts") `
  -Components @("FirstControlledLaunchReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstControlledLaunchReviewStableKey", "buildFirstControlledLaunchReview", "buildFirstControlledLaunchReviews", "buildFirstControlledLaunchReviewBoundary", "buildFirstControlledLaunchReviewModel", "summarizeFirstControlledLaunchReview", "FIRST_CONTROLLED_LAUNCH_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First controlled launch review", "First controlled launch review does not execute launch", "Controlled launch decisions require explicit operator approval", "Unresolved controlled launch blockers stay blocked", "Launch review groups", "Boundary approval checklist") `
  -PlainEnglish @("First controlled launch review identity", "Launch plan status", "Operator decision checklist", "Rollback monitoring checklist", "Denied launch review actions", "Unresolved launch review blockers", "Controlled launch evidence route", "Controlled launch result route", "Next recommended action", "no launch decision persistence", "no controlled launch auto-proceed") `
  -RouteHref "/first-controlled-launch-review"

Write-Host "[OK] CodexForge Phase 610 first controlled launch review smoke passed."
