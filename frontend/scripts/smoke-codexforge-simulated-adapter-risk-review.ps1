param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1153 Simulated Adapter Risk Review" `
  -ScriptFile "smoke-codexforge-simulated-adapter-risk-review.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-risk-review" `
  -Route "src\app\simulated-adapter-risk-review" `
  -MainPanel "SimulatedAdapterRiskReviewPanel" `
  -CommandLabel "Go to Simulated Adapter Risk Review" `
  -Modules @("simulated-adapter-risk-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterRiskReviewStableKey", "buildSimulatedAdapterRiskReview", "buildSimulatedAdapterRiskReviewItems", "buildSimulatedAdapterRiskReviewBoundary", "buildSimulatedAdapterRiskReviewModel", "summarizeSimulatedAdapterRiskReview", "SIMULATED_ADAPTER_RISK_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter risk review", "Simulated adapter risk review does not approve adapters", "Adapter risk review requires explicit operator approval", "Risk reviews gate file command runtime provider connector automation creative research and game server adapters", "Denied simulated adapter risk paths remain blocked", "Simulated adapter risk checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter risk review does not approve adapters", "Adapter risk review requires explicit operator approval", "Denied simulated adapter risk paths remain blocked") `
  -RouteHref "/simulated-adapter-risk-review"

Write-Host "[OK] CodexForge Phase 1153 Simulated Adapter Risk Review smoke passed."
