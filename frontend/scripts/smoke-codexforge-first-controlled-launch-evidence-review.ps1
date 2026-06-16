param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 611 First Controlled Launch Evidence Review" `
  -ScriptFile "smoke-codexforge-first-controlled-launch-evidence-review.ps1" `
  -Domain "src\lib\codexforge\first-controlled-launch-evidence-review" `
  -Route "src\app\first-controlled-launch-evidence-review" `
  -MainPanel "FirstControlledLaunchEvidenceReviewPanel" `
  -CommandLabel "Go to First Controlled Launch Evidence Review" `
  -Modules @("first-controlled-launch-evidence-review-types.ts", "first-controlled-launch-evidence-review-summary.ts", "index.ts") `
  -Components @("FirstControlledLaunchEvidenceReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstControlledLaunchEvidenceReviewStableKey", "buildFirstControlledLaunchEvidenceReview", "buildFirstControlledLaunchEvidenceReviews", "buildFirstControlledLaunchEvidenceReviewBoundary", "buildFirstControlledLaunchEvidenceReviewModel", "summarizeFirstControlledLaunchEvidenceReview", "FIRST_CONTROLLED_LAUNCH_EVIDENCE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First controlled launch evidence review", "First controlled launch evidence review does not ingest evidence automatically", "Controlled launch evidence requires operator review before use", "Private launch evidence stays redacted", "Evidence groups", "Launch monitoring evidence checklist") `
  -PlainEnglish @("Controlled launch evidence identity", "Boundary evidence checklist", "Citation/source checklist", "Redaction/privacy checklist", "Denied evidence actions", "Unresolved evidence blockers", "Controlled launch result route", "Controlled launch recovery route", "Next recommended action", "no auto-ingest launch evidence", "no test output storage") `
  -RouteHref "/first-controlled-launch-evidence-review"

Write-Host "[OK] CodexForge Phase 611 first controlled launch evidence review smoke passed."
