param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1794 Simulated Exception Queue Preview" `
  -ScriptFile "smoke-codexforge-simulated-exception-queue-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-exception-queue-preview" `
  -Route "src\app\simulated-exception-queue-preview" `
  -CommandLabel "Go to Simulated Exception Queue Preview" `
  -RouteHref "/simulated-exception-queue-preview" `
  -Markers @("Simulated exception queue preview", "Simulated exception queue preview does not retry orders recover live execution call brokers or mutate order state from the UI", "Simulated exception queue preview requires deterministic synthetic exceptions only", "Simulated exception queue preview shows simulated stale intent simulated missing evidence simulated risk hold simulated kill switch hold simulated export hold and operator review", "Denied simulated exception queue paths remain blocked", "Simulated exception queue checklist")
