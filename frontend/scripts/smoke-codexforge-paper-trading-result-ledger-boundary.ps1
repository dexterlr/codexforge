param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1770 Paper Trading Result Ledger Boundary" `
  -ScriptFile "smoke-codexforge-paper-trading-result-ledger-boundary.ps1" `
  -Domain "src\lib\codexforge\paper-trading-result-ledger-boundary" `
  -Route "src\app\paper-trading-result-ledger-boundary" `
  -CommandLabel "Go to Paper Trading Result Ledger Boundary" `
  -RouteHref "/paper-trading-result-ledger-boundary" `
  -Markers @("Paper trading result ledger boundary", "Paper trading result ledger boundary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L or provide financial advice from the UI", "Paper trading result ledger boundary requires explicit operator approval", "Paper trading result ledger boundary prepares deterministic synthetic result ledger workflows without frontend execution", "Denied paper trading result ledger paths remain blocked", "Paper trading result ledger boundary checklist")
