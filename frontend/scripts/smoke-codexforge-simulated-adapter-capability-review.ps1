param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1149 Simulated Adapter Capability Review" `
  -ScriptFile "smoke-codexforge-simulated-adapter-capability-review.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-capability-review" `
  -Route "src\app\simulated-adapter-capability-review" `
  -MainPanel "SimulatedAdapterCapabilityReviewPanel" `
  -CommandLabel "Go to Simulated Adapter Capability Review" `
  -Modules @("simulated-adapter-capability-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterCapabilityReviewStableKey", "buildSimulatedAdapterCapabilityReview", "buildSimulatedAdapterCapabilityReviewItems", "buildSimulatedAdapterCapabilityReviewBoundary", "buildSimulatedAdapterCapabilityReviewModel", "summarizeSimulatedAdapterCapabilityReview", "SIMULATED_ADAPTER_CAPABILITY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter capability review", "Simulated adapter capability review does not probe capabilities", "Adapter capability review requires explicit operator approval", "Capability reviews show declared abilities without probing", "Denied simulated adapter capability paths remain blocked", "Simulated adapter capability checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter capability review does not probe capabilities", "Adapter capability review requires explicit operator approval", "Denied simulated adapter capability paths remain blocked") `
  -RouteHref "/simulated-adapter-capability-review"

Write-Host "[OK] CodexForge Phase 1149 Simulated Adapter Capability Review smoke passed."
