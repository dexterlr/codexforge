param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1118 Simulated Command Environment Review" `
  -ScriptFile "smoke-codexforge-simulated-command-environment-review.ps1" `
  -Domain "src\lib\codexforge\simulated-command-environment-review" `
  -Route "src\app\simulated-command-environment-review" `
  -MainPanel "SimulatedCommandEnvironmentReviewPanel" `
  -CommandLabel "Go to Simulated Command Environment Review" `
  -Modules @("simulated-command-environment-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandEnvironmentReviewStableKey", "buildSimulatedCommandEnvironmentReview", "buildSimulatedCommandEnvironmentReviewItems", "buildSimulatedCommandEnvironmentReviewBoundary", "buildSimulatedCommandEnvironmentReviewModel", "summarizeSimulatedCommandEnvironmentReview", "SIMULATED_COMMAND_ENVIRONMENT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command environment review", "Simulated command environment review does not read env values", "Command environment review requires explicit operator approval", "Environment reviews show variable names without secret values", "Denied simulated command environment paths remain blocked", "Simulated command environment checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command environment review does not read env values", "Command environment review requires explicit operator approval", "Denied simulated command environment paths remain blocked") `
  -RouteHref "/simulated-command-environment-review"

Write-Host "[OK] CodexForge Phase 1118 Simulated Command Environment Review smoke passed."
