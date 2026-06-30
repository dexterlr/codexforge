param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1803 Simulated Strategy Scorecard Preview" `
  -ScriptFile "smoke-codexforge-simulated-strategy-scorecard-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-strategy-scorecard-preview" `
  -Route "src\app\simulated-strategy-scorecard-preview" `
  -CommandLabel "Go to Simulated Strategy Scorecard Preview" `
  -RouteHref "/simulated-strategy-scorecard-preview" `
  -Markers @("Simulated strategy scorecard preview", "Simulated strategy scorecard preview does not calculate real performance issue recommendations guarantee returns or promote strategies from the UI", "Simulated strategy scorecard preview requires deterministic synthetic scorecard fixtures only", "Simulated strategy scorecard preview shows simulated expectancy simulated win rate simulated drawdown simulated rule adherence simulated evidence completeness and no performance guarantee", "Denied simulated strategy scorecard paths remain blocked", "Simulated strategy scorecard checklist")
