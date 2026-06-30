param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1777 Simulated Equity Curve Preview" `
  -ScriptFile "smoke-codexforge-simulated-equity-curve-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-equity-curve-preview" `
  -Route "src\app\simulated-equity-curve-preview" `
  -CommandLabel "Go to Simulated Equity Curve Preview" `
  -RouteHref "/simulated-equity-curve-preview" `
  -Markers @("Simulated equity curve preview", "Simulated equity curve preview does not read real account equity fetch live prices or guarantee performance from the UI", "Simulated equity curve preview requires deterministic synthetic equity points only", "Simulated equity curve preview shows simulated equity point simulated cumulative result simulated drawdown placeholder simulated high-water mark and no performance guarantee", "Denied simulated equity curve paths remain blocked", "Simulated equity curve checklist")
