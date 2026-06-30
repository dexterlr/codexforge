param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1789 Simulated Risk Review Queue Preview" `
  -ScriptFile "smoke-codexforge-simulated-risk-review-queue-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-risk-review-queue-preview" `
  -Route "src\app\simulated-risk-review-queue-preview" `
  -CommandLabel "Go to Simulated Risk Review Queue Preview" `
  -RouteHref "/simulated-risk-review-queue-preview" `
  -Markers @("Simulated risk review queue preview", "Simulated risk review queue preview does not override risk governor decisions approve execution mutate capital or trigger live kill switches from the UI", "Simulated risk review queue preview requires deterministic synthetic risk events only", "Simulated risk review queue preview shows simulated daily loss breach simulated drawdown breach simulated position risk breach simulated symbol block simulated strategy block and kill switch note", "Denied simulated risk review queue paths remain blocked", "Simulated risk review queue checklist")
