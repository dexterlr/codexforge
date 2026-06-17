param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 653 First File Write Trial Review" `
  -ScriptFile "smoke-codexforge-first-file-write-trial-review.ps1" `
  -Domain "src\lib\codexforge\first-file-write-trial-review" `
  -Route "src\app\first-file-write-trial-review" `
  -MainPanel "FirstFileWriteTrialReviewPanel" `
  -CommandLabel "Go to First File Write Trial Review" `
  -Modules @("first-file-write-trial-review-model.ts", "index.ts") `
  -Components @("FirstFileWriteTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstFileWriteTrialReviewStableKey", "buildFirstFileWriteTrialReview", "buildFirstFileWriteTrialReviews", "buildFirstFileWriteTrialReviewBoundary", "buildFirstFileWriteTrialReviewModel", "summarizeFirstFileWriteTrialReview", "FIRST_FILE_WRITE_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First file write trial review", "First file write trial review does not apply or persist file writes", "File write trial outputs require operator review", "File-write evidence", "File-write result", "File-write recovery", "Packaging readiness") `
  -PlainEnglish @("First file write trial review identity", "File-write evidence", "File-write result", "File-write recovery", "Packaging readiness", "Next recommended action") `
  -RouteHref "/first-file-write-trial-review"

Write-Host "[OK] CodexForge Phase 653 first file write trial review smoke passed."
