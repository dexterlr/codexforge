param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1133 Simulated Runtime Process Review" `
  -ScriptFile "smoke-codexforge-simulated-runtime-process-review.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-process-review" `
  -Route "src\app\simulated-runtime-process-review" `
  -MainPanel "SimulatedRuntimeProcessReviewPanel" `
  -CommandLabel "Go to Simulated Runtime Process Review" `
  -Modules @("simulated-runtime-process-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeProcessReviewStableKey", "buildSimulatedRuntimeProcessReview", "buildSimulatedRuntimeProcessReviewItems", "buildSimulatedRuntimeProcessReviewBoundary", "buildSimulatedRuntimeProcessReviewModel", "summarizeSimulatedRuntimeProcessReview", "SIMULATED_RUNTIME_PROCESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime process review", "Simulated runtime process review does not spawn processes", "Runtime process review requires explicit operator approval", "Process reviews keep runtime execution blocked", "Denied simulated runtime process paths remain blocked", "Simulated runtime process checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime process review does not spawn processes", "Runtime process review requires explicit operator approval", "Denied simulated runtime process paths remain blocked") `
  -RouteHref "/simulated-runtime-process-review"

Write-Host "[OK] CodexForge Phase 1133 Simulated Runtime Process Review smoke passed."
