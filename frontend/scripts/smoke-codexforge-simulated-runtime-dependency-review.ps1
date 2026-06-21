param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1136 Simulated Runtime Dependency Review" `
  -ScriptFile "smoke-codexforge-simulated-runtime-dependency-review.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-dependency-review" `
  -Route "src\app\simulated-runtime-dependency-review" `
  -MainPanel "SimulatedRuntimeDependencyReviewPanel" `
  -CommandLabel "Go to Simulated Runtime Dependency Review" `
  -Modules @("simulated-runtime-dependency-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeDependencyReviewStableKey", "buildSimulatedRuntimeDependencyReview", "buildSimulatedRuntimeDependencyReviewItems", "buildSimulatedRuntimeDependencyReviewBoundary", "buildSimulatedRuntimeDependencyReviewModel", "summarizeSimulatedRuntimeDependencyReview", "SIMULATED_RUNTIME_DEPENDENCY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime dependency review", "Simulated runtime dependency review does not install dependencies", "Runtime dependency review requires explicit operator approval", "Dependency reviews show requirements without installation", "Denied simulated runtime dependency paths remain blocked", "Simulated runtime dependency checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime dependency review does not install dependencies", "Runtime dependency review requires explicit operator approval", "Denied simulated runtime dependency paths remain blocked") `
  -RouteHref "/simulated-runtime-dependency-review"

Write-Host "[OK] CodexForge Phase 1136 Simulated Runtime Dependency Review smoke passed."
