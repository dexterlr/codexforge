param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1775 Simulated Realised P&L Preview" `
  -ScriptFile "smoke-codexforge-simulated-realised-pnl-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-realised-pnl-preview" `
  -Route "src\app\simulated-realised-pnl-preview" `
  -CommandLabel "Go to Simulated Realised P&L Preview" `
  -RouteHref "/simulated-realised-pnl-preview" `
  -Markers @("Simulated realised P&L preview", "Simulated realised P&L preview does not calculate real P&L read accounts read fills or issue profit claims from the UI", "Simulated realised P&L preview requires deterministic synthetic closed-position examples only", "Simulated realised P&L preview shows simulated entry price simulated exit price simulated fees simulated slippage simulated realised result and no guaranteed profit claims", "Denied simulated realised P&L paths remain blocked", "Simulated realised P&L checklist")
