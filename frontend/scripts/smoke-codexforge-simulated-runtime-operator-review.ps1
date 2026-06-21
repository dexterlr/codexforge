param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1142 Simulated Runtime Operator Review" `
  -ScriptFile "smoke-codexforge-simulated-runtime-operator-review.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-operator-review" `
  -Route "src\app\simulated-runtime-operator-review" `
  -MainPanel "SimulatedRuntimeOperatorReviewPanel" `
  -CommandLabel "Go to Simulated Runtime Operator Review" `
  -Modules @("simulated-runtime-operator-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeOperatorReviewStableKey", "buildSimulatedRuntimeOperatorReview", "buildSimulatedRuntimeOperatorReviewItems", "buildSimulatedRuntimeOperatorReviewBoundary", "buildSimulatedRuntimeOperatorReviewModel", "summarizeSimulatedRuntimeOperatorReview", "SIMULATED_RUNTIME_OPERATOR_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime operator review", "Simulated runtime operator review does not approve actions", "Runtime operator review requires explicit human approval", "Operator reviews keep runtime execution blocked", "Denied simulated runtime operator review paths remain blocked", "Simulated runtime operator review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime operator review does not approve actions", "Runtime operator review requires explicit human approval", "Denied simulated runtime operator review paths remain blocked") `
  -RouteHref "/simulated-runtime-operator-review"

Write-Host "[OK] CodexForge Phase 1142 Simulated Runtime Operator Review smoke passed."
