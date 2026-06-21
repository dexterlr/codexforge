param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1120 Simulated Command Risk Review" `
  -ScriptFile "smoke-codexforge-simulated-command-risk-review.ps1" `
  -Domain "src\lib\codexforge\simulated-command-risk-review" `
  -Route "src\app\simulated-command-risk-review" `
  -MainPanel "SimulatedCommandRiskReviewPanel" `
  -CommandLabel "Go to Simulated Command Risk Review" `
  -Modules @("simulated-command-risk-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandRiskReviewStableKey", "buildSimulatedCommandRiskReview", "buildSimulatedCommandRiskReviewItems", "buildSimulatedCommandRiskReviewBoundary", "buildSimulatedCommandRiskReviewModel", "summarizeSimulatedCommandRiskReview", "SIMULATED_COMMAND_RISK_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command risk review", "Simulated command risk review does not approve commands", "Command risk review requires explicit operator approval", "Risk reviews gate shell git test build smoke install runtime and deploy commands", "Denied simulated command risk paths remain blocked", "Simulated command risk checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command risk review does not approve commands", "Command risk review requires explicit operator approval", "Denied simulated command risk paths remain blocked") `
  -RouteHref "/simulated-command-risk-review"

Write-Host "[OK] CodexForge Phase 1120 Simulated Command Risk Review smoke passed."
