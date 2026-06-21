param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1152 Simulated Adapter Output Review" `
  -ScriptFile "smoke-codexforge-simulated-adapter-output-review.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-output-review" `
  -Route "src\app\simulated-adapter-output-review" `
  -MainPanel "SimulatedAdapterOutputReviewPanel" `
  -CommandLabel "Go to Simulated Adapter Output Review" `
  -Modules @("simulated-adapter-output-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterOutputReviewStableKey", "buildSimulatedAdapterOutputReview", "buildSimulatedAdapterOutputReviewItems", "buildSimulatedAdapterOutputReviewBoundary", "buildSimulatedAdapterOutputReviewModel", "summarizeSimulatedAdapterOutputReview", "SIMULATED_ADAPTER_OUTPUT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter output review", "Simulated adapter output review does not persist outputs", "Adapter output review requires explicit operator approval", "Output reviews route future outputs through shared evidence and result review", "Denied simulated adapter output paths remain blocked", "Simulated adapter output checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter output review does not persist outputs", "Adapter output review requires explicit operator approval", "Denied simulated adapter output paths remain blocked") `
  -RouteHref "/simulated-adapter-output-review"

Write-Host "[OK] CodexForge Phase 1152 Simulated Adapter Output Review smoke passed."
