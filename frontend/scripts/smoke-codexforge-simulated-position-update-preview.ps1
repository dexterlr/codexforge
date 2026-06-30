param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1774 Simulated Position Update Preview" `
  -ScriptFile "smoke-codexforge-simulated-position-update-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-position-update-preview" `
  -Route "src\app\simulated-position-update-preview" `
  -CommandLabel "Go to Simulated Position Update Preview" `
  -RouteHref "/simulated-position-update-preview" `
  -Markers @("Simulated position update preview", "Simulated position update preview does not read live positions update portfolio holdings read broker fills or mutate ledgers from the UI", "Simulated position update preview requires deterministic synthetic position updates only", "Simulated position update preview shows simulated prior quantity simulated fill delta simulated new quantity simulated average price simulated exposure and denied live portfolio reads", "Denied simulated position update paths remain blocked", "Simulated position update checklist")
