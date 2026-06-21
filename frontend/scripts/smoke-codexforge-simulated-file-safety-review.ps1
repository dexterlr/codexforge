param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1106 Simulated File Safety Review" `
  -ScriptFile "smoke-codexforge-simulated-file-safety-review.ps1" `
  -Domain "src\lib\codexforge\simulated-file-safety-review" `
  -Route "src\app\simulated-file-safety-review" `
  -MainPanel "SimulatedFileSafetyReviewPanel" `
  -CommandLabel "Go to Simulated File Safety Review" `
  -Modules @("simulated-file-safety-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileSafetyReviewStableKey", "buildSimulatedFileSafetyReview", "buildSimulatedFileSafetyReviewItems", "buildSimulatedFileSafetyReviewBoundary", "buildSimulatedFileSafetyReviewModel", "summarizeSimulatedFileSafetyReview", "SIMULATED_FILE_SAFETY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated file safety review", "Simulated file safety review does not approve mutations", "File safety review requires explicit operator approval", "Safety reviews gate paths secrets diffs and mutations", "Denied simulated file safety paths remain blocked", "Simulated file safety checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file safety review does not approve mutations", "File safety review requires explicit operator approval", "Denied simulated file safety paths remain blocked") `
  -RouteHref "/simulated-file-safety-review"

Write-Host "[OK] CodexForge Phase 1106 Simulated File Safety Review smoke passed."
