param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1135 Simulated Runtime Environment Review" `
  -ScriptFile "smoke-codexforge-simulated-runtime-environment-review.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-environment-review" `
  -Route "src\app\simulated-runtime-environment-review" `
  -MainPanel "SimulatedRuntimeEnvironmentReviewPanel" `
  -CommandLabel "Go to Simulated Runtime Environment Review" `
  -Modules @("simulated-runtime-environment-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeEnvironmentReviewStableKey", "buildSimulatedRuntimeEnvironmentReview", "buildSimulatedRuntimeEnvironmentReviewItems", "buildSimulatedRuntimeEnvironmentReviewBoundary", "buildSimulatedRuntimeEnvironmentReviewModel", "summarizeSimulatedRuntimeEnvironmentReview", "SIMULATED_RUNTIME_ENVIRONMENT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime environment review", "Simulated runtime environment review does not read env values", "Runtime environment review requires explicit operator approval", "Environment reviews show variable names without secret values", "Denied simulated runtime environment paths remain blocked", "Simulated runtime environment checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime environment review does not read env values", "Runtime environment review requires explicit operator approval", "Denied simulated runtime environment paths remain blocked") `
  -RouteHref "/simulated-runtime-environment-review"

Write-Host "[OK] CodexForge Phase 1135 Simulated Runtime Environment Review smoke passed."
