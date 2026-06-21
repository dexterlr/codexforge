param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1151 Simulated Adapter Input Review" `
  -ScriptFile "smoke-codexforge-simulated-adapter-input-review.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-input-review" `
  -Route "src\app\simulated-adapter-input-review" `
  -MainPanel "SimulatedAdapterInputReviewPanel" `
  -CommandLabel "Go to Simulated Adapter Input Review" `
  -Modules @("simulated-adapter-input-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterInputReviewStableKey", "buildSimulatedAdapterInputReview", "buildSimulatedAdapterInputReviewItems", "buildSimulatedAdapterInputReviewBoundary", "buildSimulatedAdapterInputReviewModel", "summarizeSimulatedAdapterInputReview", "SIMULATED_ADAPTER_INPUT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter input review", "Simulated adapter input review does not submit inputs", "Adapter input review requires explicit operator approval", "Input reviews show contracts without dispatch", "Denied simulated adapter input paths remain blocked", "Simulated adapter input checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter input review does not submit inputs", "Adapter input review requires explicit operator approval", "Denied simulated adapter input paths remain blocked") `
  -RouteHref "/simulated-adapter-input-review"

Write-Host "[OK] CodexForge Phase 1151 Simulated Adapter Input Review smoke passed."
