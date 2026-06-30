param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1784 First Paper Trading Result Ledger Candidate" `
  -ScriptFile "smoke-codexforge-first-paper-trading-result-ledger-candidate.ps1" `
  -Domain "src\lib\codexforge\first-paper-trading-result-ledger-candidate" `
  -Route "src\app\first-paper-trading-result-ledger-candidate" `
  -CommandLabel "Go to First Paper Trading Result Ledger Candidate" `
  -RouteHref "/first-paper-trading-result-ledger-candidate" `
  -Markers @("First paper trading result ledger candidate", "First paper trading result ledger candidate does not enable real broker workflows live trading order placement paper execution credential storage account reads ledger persistence or dispatch from the UI", "First paper trading result ledger candidate requires explicit operator approval", "Candidate combines simulated fills rejections cancels position updates realised P&L unrealised P&L equity curve drawdown ledger risk event ledger audit packet evidence continuity export boundary cockpit summary and denied paths", "Denied first paper trading result ledger paths remain blocked", "First paper trading result ledger checklist")
