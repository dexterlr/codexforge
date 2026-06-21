param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1148 Simulated Adapter Selection Review" `
  -ScriptFile "smoke-codexforge-simulated-adapter-selection-review.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-selection-review" `
  -Route "src\app\simulated-adapter-selection-review" `
  -MainPanel "SimulatedAdapterSelectionReviewPanel" `
  -CommandLabel "Go to Simulated Adapter Selection Review" `
  -Modules @("simulated-adapter-selection-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterSelectionReviewStableKey", "buildSimulatedAdapterSelectionReview", "buildSimulatedAdapterSelectionReviewItems", "buildSimulatedAdapterSelectionReviewBoundary", "buildSimulatedAdapterSelectionReviewModel", "summarizeSimulatedAdapterSelectionReview", "SIMULATED_ADAPTER_SELECTION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter selection review", "Simulated adapter selection review does not call adapters", "Adapter selection review requires explicit operator approval", "Selection reviews show adapter choices without execution", "Denied simulated adapter selection paths remain blocked", "Simulated adapter selection checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter selection review does not call adapters", "Adapter selection review requires explicit operator approval", "Denied simulated adapter selection paths remain blocked") `
  -RouteHref "/simulated-adapter-selection-review"

Write-Host "[OK] CodexForge Phase 1148 Simulated Adapter Selection Review smoke passed."
