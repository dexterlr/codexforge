param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1792 Simulated Metric Cards Preview" `
  -ScriptFile "smoke-codexforge-simulated-metric-cards-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-metric-cards-preview" `
  -Route "src\app\simulated-metric-cards-preview" `
  -CommandLabel "Go to Simulated Metric Cards Preview" `
  -RouteHref "/simulated-metric-cards-preview" `
  -Markers @("Simulated metric cards preview", "Simulated metric cards preview does not calculate real performance read live accounts fetch live prices or guarantee returns from the UI", "Simulated metric cards preview requires deterministic synthetic metric cards only", "Simulated metric cards preview shows simulated equity card simulated drawdown card simulated risk event card simulated review queue card simulated evidence card and no real P&L", "Denied simulated metric cards paths remain blocked", "Simulated metric cards checklist")
