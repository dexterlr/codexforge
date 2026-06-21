param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1125 Simulated Command Operator Review" `
  -ScriptFile "smoke-codexforge-simulated-command-operator-review.ps1" `
  -Domain "src\lib\codexforge\simulated-command-operator-review" `
  -Route "src\app\simulated-command-operator-review" `
  -MainPanel "SimulatedCommandOperatorReviewPanel" `
  -CommandLabel "Go to Simulated Command Operator Review" `
  -Modules @("simulated-command-operator-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandOperatorReviewStableKey", "buildSimulatedCommandOperatorReview", "buildSimulatedCommandOperatorReviewItems", "buildSimulatedCommandOperatorReviewBoundary", "buildSimulatedCommandOperatorReviewModel", "summarizeSimulatedCommandOperatorReview", "SIMULATED_COMMAND_OPERATOR_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command operator review", "Simulated command operator review does not approve actions", "Command operator review requires explicit human approval", "Operator reviews keep command execution blocked", "Denied simulated command operator review paths remain blocked", "Simulated command operator review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command operator review does not approve actions", "Command operator review requires explicit human approval", "Denied simulated command operator review paths remain blocked") `
  -RouteHref "/simulated-command-operator-review"

Write-Host "[OK] CodexForge Phase 1125 Simulated Command Operator Review smoke passed."
