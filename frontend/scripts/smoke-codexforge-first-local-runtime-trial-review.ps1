param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 657 First Local Runtime Trial Review" `
  -ScriptFile "smoke-codexforge-first-local-runtime-trial-review.ps1" `
  -Domain "src\lib\codexforge\first-local-runtime-trial-review" `
  -Route "src\app\first-local-runtime-trial-review" `
  -MainPanel "FirstLocalRuntimeTrialReviewPanel" `
  -CommandLabel "Go to First Local Runtime Trial Review" `
  -Modules @("first-local-runtime-trial-review-model.ts", "index.ts") `
  -Components @("FirstLocalRuntimeTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstLocalRuntimeTrialReviewStableKey", "buildFirstLocalRuntimeTrialReview", "buildFirstLocalRuntimeTrialReviews", "buildFirstLocalRuntimeTrialReviewBoundary", "buildFirstLocalRuntimeTrialReviewModel", "summarizeFirstLocalRuntimeTrialReview", "FIRST_LOCAL_RUNTIME_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First local runtime trial review", "First local runtime trial review does not start or stop runtimes", "Runtime results require operator review", "Runtime evidence", "Runtime result", "Runtime recovery", "Runtime packaging", "Runtime handoff readiness") `
  -PlainEnglish @("First local runtime trial review identity", "Runtime evidence", "Runtime result", "Runtime recovery", "Runtime packaging", "Runtime handoff readiness", "Next recommended action") `
  -RouteHref "/first-local-runtime-trial-review"

Write-Host "[OK] CodexForge Phase 657 first local runtime trial review smoke passed."
