param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1779 Simulated Risk Event Ledger Preview" `
  -ScriptFile "smoke-codexforge-simulated-risk-event-ledger-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-risk-event-ledger-preview" `
  -Route "src\app\simulated-risk-event-ledger-preview" `
  -CommandLabel "Go to Simulated Risk Event Ledger Preview" `
  -RouteHref "/simulated-risk-event-ledger-preview" `
  -Markers @("Simulated risk event ledger preview", "Simulated risk event ledger preview does not override risk governor decisions place trades approve execution or mutate capital from the UI", "Simulated risk event ledger preview requires backend-owned synthetic risk event capture", "Simulated risk event ledger preview shows synthetic daily loss breach synthetic max drawdown breach synthetic position risk breach synthetic symbol block synthetic strategy block and operator review", "Denied simulated risk event ledger paths remain blocked", "Simulated risk event ledger checklist")
