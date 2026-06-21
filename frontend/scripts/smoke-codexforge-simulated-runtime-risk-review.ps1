param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1137 Simulated Runtime Risk Review" `
  -ScriptFile "smoke-codexforge-simulated-runtime-risk-review.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-risk-review" `
  -Route "src\app\simulated-runtime-risk-review" `
  -MainPanel "SimulatedRuntimeRiskReviewPanel" `
  -CommandLabel "Go to Simulated Runtime Risk Review" `
  -Modules @("simulated-runtime-risk-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeRiskReviewStableKey", "buildSimulatedRuntimeRiskReview", "buildSimulatedRuntimeRiskReviewItems", "buildSimulatedRuntimeRiskReviewBoundary", "buildSimulatedRuntimeRiskReviewModel", "summarizeSimulatedRuntimeRiskReview", "SIMULATED_RUNTIME_RISK_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime risk review", "Simulated runtime risk review does not approve runtimes", "Runtime risk review requires explicit operator approval", "Risk reviews gate dev servers game servers local bridges model runtimes and background workers", "Denied simulated runtime risk paths remain blocked", "Simulated runtime risk checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime risk review does not approve runtimes", "Runtime risk review requires explicit operator approval", "Denied simulated runtime risk paths remain blocked") `
  -RouteHref "/simulated-runtime-risk-review"

Write-Host "[OK] CodexForge Phase 1137 Simulated Runtime Risk Review smoke passed."
