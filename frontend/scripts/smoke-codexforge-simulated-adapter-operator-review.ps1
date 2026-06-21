param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1158 Simulated Adapter Operator Review" `
  -ScriptFile "smoke-codexforge-simulated-adapter-operator-review.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-operator-review" `
  -Route "src\app\simulated-adapter-operator-review" `
  -MainPanel "SimulatedAdapterOperatorReviewPanel" `
  -CommandLabel "Go to Simulated Adapter Operator Review" `
  -Modules @("simulated-adapter-operator-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterOperatorReviewStableKey", "buildSimulatedAdapterOperatorReview", "buildSimulatedAdapterOperatorReviewItems", "buildSimulatedAdapterOperatorReviewBoundary", "buildSimulatedAdapterOperatorReviewModel", "summarizeSimulatedAdapterOperatorReview", "SIMULATED_ADAPTER_OPERATOR_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter operator review", "Simulated adapter operator review does not approve actions", "Adapter operator review requires explicit human approval", "Operator reviews keep adapter execution blocked", "Denied simulated adapter operator review paths remain blocked", "Simulated adapter operator review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter operator review does not approve actions", "Adapter operator review requires explicit human approval", "Denied simulated adapter operator review paths remain blocked") `
  -RouteHref "/simulated-adapter-operator-review"

Write-Host "[OK] CodexForge Phase 1158 Simulated Adapter Operator Review smoke passed."
