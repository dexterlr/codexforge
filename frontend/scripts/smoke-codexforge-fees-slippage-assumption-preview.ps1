param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1693 Fees Slippage Assumption Preview" `
  -ScriptFile "smoke-codexforge-fees-slippage-assumption-preview.ps1" `
  -Domain "src\lib\codexforge\fees-slippage-assumption-preview" `
  -Route "src\app\fees-slippage-assumption-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Fees Slippage Assumption Preview" `
  -RouteHref "/fees-slippage-assumption-preview" `
  -Markers @("Fees slippage assumption preview", "Fees slippage assumption preview does not calculate live execution costs or access broker accounts", "Fees slippage assumption preview requires explicit operator approval", "Fees slippage assumption preview shows commission assumptions spread assumptions slippage assumptions liquidity caveats fill model caveats and conservative result adjustment", "Denied fees slippage paths remain blocked", "Fees slippage assumption checklist")
