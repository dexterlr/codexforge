param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1757 Synthetic Position Ledger Preview" `
  -ScriptFile "smoke-codexforge-synthetic-position-ledger-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-position-ledger-preview" `
  -Route "src\app\synthetic-position-ledger-preview" `
  -CommandLabel "Go to Synthetic Position Ledger Preview" `
  -RouteHref "/synthetic-position-ledger-preview" `
  -Markers @("Synthetic position ledger preview", "Synthetic position ledger preview does not read live positions portfolio holdings broker fills or account statements from the UI", "Synthetic position ledger preview requires deterministic synthetic ledger entries only", "Synthetic position ledger preview shows simulated symbol simulated quantity simulated average price simulated realised P&L simulated open risk and denied live portfolio reads", "Denied synthetic position ledger paths remain blocked", "Synthetic position ledger checklist")
