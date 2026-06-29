param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1762 Synthetic Slippage Fee Preview" `
  -ScriptFile "smoke-codexforge-synthetic-slippage-fee-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-slippage-fee-preview" `
  -Route "src\app\synthetic-slippage-fee-preview" `
  -CommandLabel "Go to Synthetic Slippage Fee Preview" `
  -RouteHref "/synthetic-slippage-fee-preview" `
  -Markers @("Synthetic slippage fee preview", "Synthetic slippage fee preview does not fetch exchange fees live spreads broker commissions or market microstructure data from the UI", "Synthetic slippage fee preview requires deterministic fee and slippage assumptions only", "Synthetic slippage fee preview shows simulated fee assumption simulated slippage assumption simulated spread assumption simulated liquidity note and denied live market reads", "Denied synthetic slippage fee paths remain blocked", "Synthetic slippage fee checklist")
