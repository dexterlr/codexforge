param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1807 Simulated Risk Rule Review Preview" `
  -ScriptFile "smoke-codexforge-simulated-risk-rule-review-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-risk-rule-review-preview" `
  -Route "src\app\simulated-risk-rule-review-preview" `
  -CommandLabel "Go to Simulated Risk Rule Review Preview" `
  -RouteHref "/simulated-risk-rule-review-preview" `
  -Markers @("Simulated risk rule review preview", "Simulated risk rule review preview does not override risk governor decisions mutate capital approve execution or place trades from the UI", "Simulated risk rule review preview requires deterministic synthetic risk-rule review only", "Simulated risk rule review preview shows simulated position risk simulated max daily loss simulated drawdown rule simulated symbol rule simulated strategy rule and kill switch note", "Denied simulated risk rule review paths remain blocked", "Simulated risk rule review checklist")
