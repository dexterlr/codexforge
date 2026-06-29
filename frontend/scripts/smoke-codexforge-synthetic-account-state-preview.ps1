param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1755 Synthetic Account State Preview" `
  -ScriptFile "smoke-codexforge-synthetic-account-state-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-account-state-preview" `
  -Route "src\app\synthetic-account-state-preview" `
  -CommandLabel "Go to Synthetic Account State Preview" `
  -RouteHref "/synthetic-account-state-preview" `
  -Markers @("Synthetic account state preview", "Synthetic account state preview does not read real broker accounts balances portfolios margin buying power or live P&L from the UI", "Synthetic account state preview requires synthetic fixtures only", "Synthetic account state preview shows deterministic starting cash simulated equity simulated realised P&L simulated unrealised P&L simulated exposure and no real account reads", "Denied synthetic account state paths remain blocked", "Synthetic account state checklist")
