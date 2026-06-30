param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1776 Simulated Unrealised P&L Preview" `
  -ScriptFile "smoke-codexforge-simulated-unrealised-pnl-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-unrealised-pnl-preview" `
  -Route "src\app\simulated-unrealised-pnl-preview" `
  -CommandLabel "Go to Simulated Unrealised P&L Preview" `
  -RouteHref "/simulated-unrealised-pnl-preview" `
  -Markers @("Simulated unrealised P&L preview", "Simulated unrealised P&L preview does not fetch live prices calculate real portfolio value or read live broker positions from the UI", "Simulated unrealised P&L preview requires deterministic synthetic mark assumptions only", "Simulated unrealised P&L preview shows simulated mark price simulated open quantity simulated cost basis simulated unrealised result simulated exposure and no live market reads", "Denied simulated unrealised P&L paths remain blocked", "Simulated unrealised P&L checklist")
