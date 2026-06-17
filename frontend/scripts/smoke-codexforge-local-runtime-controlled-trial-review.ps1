param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 644 Local Runtime Controlled Trial Review" `
  -ScriptFile "smoke-codexforge-local-runtime-controlled-trial-review.ps1" `
  -Domain "src\lib\codexforge\local-runtime-controlled-trial-review" `
  -Route "src\app\local-runtime-controlled-trial-review" `
  -MainPanel "LocalRuntimeControlledTrialReviewPanel" `
  -CommandLabel "Go to Local Runtime Controlled Trial Review" `
  -Modules @("local-runtime-controlled-trial-review-model.ts", "index.ts") `
  -Components @("LocalRuntimeControlledTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeControlledTrialReviewStableKey", "buildLocalRuntimeControlledTrialReview", "buildLocalRuntimeControlledTrialReviews", "buildLocalRuntimeControlledTrialReviewBoundary", "buildLocalRuntimeControlledTrialReviewModel", "summarizeLocalRuntimeControlledTrialReview", "LOCAL_RUNTIME_CONTROLLED_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Local runtime controlled trial review", "Local runtime controlled trial review does not start or stop runtimes", "Runtime results require operator review", "Log checklist", "Process checklist", "Port checklist", "Recovery checklist", "Packaging checklist") `
  -PlainEnglish @("Local runtime controlled trial review identity", "Log checklist", "Process checklist", "Port checklist", "Recovery checklist", "Packaging checklist", "Next recommended action") `
  -RouteHref "/local-runtime-controlled-trial-review"

Write-Host "[OK] CodexForge Phase 644 local runtime controlled trial review smoke passed."
