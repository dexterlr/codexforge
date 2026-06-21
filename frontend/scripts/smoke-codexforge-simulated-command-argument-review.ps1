param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1117 Simulated Command Argument Review" `
  -ScriptFile "smoke-codexforge-simulated-command-argument-review.ps1" `
  -Domain "src\lib\codexforge\simulated-command-argument-review" `
  -Route "src\app\simulated-command-argument-review" `
  -MainPanel "SimulatedCommandArgumentReviewPanel" `
  -CommandLabel "Go to Simulated Command Argument Review" `
  -Modules @("simulated-command-argument-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandArgumentReviewStableKey", "buildSimulatedCommandArgumentReview", "buildSimulatedCommandArgumentReviewItems", "buildSimulatedCommandArgumentReviewBoundary", "buildSimulatedCommandArgumentReviewModel", "summarizeSimulatedCommandArgumentReview", "SIMULATED_COMMAND_ARGUMENT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command argument review", "Simulated command argument review does not execute arguments", "Command argument review requires explicit operator approval", "Argument reviews keep command execution blocked", "Denied simulated command argument paths remain blocked", "Simulated command argument checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command argument review does not execute arguments", "Command argument review requires explicit operator approval", "Denied simulated command argument paths remain blocked") `
  -RouteHref "/simulated-command-argument-review"

Write-Host "[OK] CodexForge Phase 1117 Simulated Command Argument Review smoke passed."
