param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 612 First Controlled Launch Result Review" `
  -ScriptFile "smoke-codexforge-first-controlled-launch-result-review.ps1" `
  -Domain "src\lib\codexforge\first-controlled-launch-result-review" `
  -Route "src\app\first-controlled-launch-result-review" `
  -MainPanel "FirstControlledLaunchResultReviewPanel" `
  -CommandLabel "Go to First Controlled Launch Result Review" `
  -Modules @("first-controlled-launch-result-review-types.ts", "first-controlled-launch-result-review-summary.ts", "index.ts") `
  -Components @("FirstControlledLaunchResultReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstControlledLaunchResultReviewStableKey", "buildFirstControlledLaunchResultReview", "buildFirstControlledLaunchResultReviews", "buildFirstControlledLaunchResultReviewBoundary", "buildFirstControlledLaunchResultReviewModel", "summarizeFirstControlledLaunchResultReview", "FIRST_CONTROLLED_LAUNCH_RESULT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First controlled launch result review", "First controlled launch result review does not store live outputs", "Controlled launch results require operator review before use", "Unsafe controlled launch results remain blocked", "Result groups", "Acceptance checklist") `
  -PlainEnglish @("Controlled launch result identity", "Rejection checklist", "Reuse checklist", "Safety review checklist", "Denied result actions", "Unresolved result blockers", "Controlled launch recovery route", "Controlled launch hardening route", "Next recommended action", "no result reuse automation", "no result ingestion") `
  -RouteHref "/first-controlled-launch-result-review"

Write-Host "[OK] CodexForge Phase 612 first controlled launch result review smoke passed."
