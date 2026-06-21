param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1134 Simulated Runtime Port Review" `
  -ScriptFile "smoke-codexforge-simulated-runtime-port-review.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-port-review" `
  -Route "src\app\simulated-runtime-port-review" `
  -MainPanel "SimulatedRuntimePortReviewPanel" `
  -CommandLabel "Go to Simulated Runtime Port Review" `
  -Modules @("simulated-runtime-port-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimePortReviewStableKey", "buildSimulatedRuntimePortReview", "buildSimulatedRuntimePortReviewItems", "buildSimulatedRuntimePortReviewBoundary", "buildSimulatedRuntimePortReviewModel", "summarizeSimulatedRuntimePortReview", "SIMULATED_RUNTIME_PORT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime port review", "Simulated runtime port review does not open ports", "Runtime port review requires explicit operator approval", "Port reviews show planned bindings without binding", "Denied simulated runtime port paths remain blocked", "Simulated runtime port checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime port review does not open ports", "Runtime port review requires explicit operator approval", "Denied simulated runtime port paths remain blocked") `
  -RouteHref "/simulated-runtime-port-review"

Write-Host "[OK] CodexForge Phase 1134 Simulated Runtime Port Review smoke passed."
