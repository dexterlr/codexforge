param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1150 Simulated Adapter Permission Review" `
  -ScriptFile "smoke-codexforge-simulated-adapter-permission-review.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-permission-review" `
  -Route "src\app\simulated-adapter-permission-review" `
  -MainPanel "SimulatedAdapterPermissionReviewPanel" `
  -CommandLabel "Go to Simulated Adapter Permission Review" `
  -Modules @("simulated-adapter-permission-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterPermissionReviewStableKey", "buildSimulatedAdapterPermissionReview", "buildSimulatedAdapterPermissionReviewItems", "buildSimulatedAdapterPermissionReviewBoundary", "buildSimulatedAdapterPermissionReviewModel", "summarizeSimulatedAdapterPermissionReview", "SIMULATED_ADAPTER_PERMISSION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter permission review", "Simulated adapter permission review does not grant permissions", "Adapter permission review requires explicit operator approval", "Permission reviews keep every adapter permission blocked", "Denied simulated adapter permission paths remain blocked", "Simulated adapter permission checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter permission review does not grant permissions", "Adapter permission review requires explicit operator approval", "Denied simulated adapter permission paths remain blocked") `
  -RouteHref "/simulated-adapter-permission-review"

Write-Host "[OK] CodexForge Phase 1150 Simulated Adapter Permission Review smoke passed."
