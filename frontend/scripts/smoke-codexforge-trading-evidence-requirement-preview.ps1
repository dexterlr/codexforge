param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1670 Trading Evidence Requirement Preview" `
  -ScriptFile "smoke-codexforge-trading-evidence-requirement-preview.ps1" `
  -Domain "src\lib\codexforge\trading-evidence-requirement-preview" `
  -Route "src\app\trading-evidence-requirement-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Trading Evidence Requirement Preview" `
  -RouteHref "/trading-evidence-requirement-preview" `
  -Markers @("Trading evidence requirement preview", "Trading evidence requirement preview does not persist evidence audit results or trading decisions from the UI", "Trading evidence requirement preview requires backend-owned capture", "Trading evidence requirement preview shows thesis evidence risk evidence backtest evidence paper-trade evidence approval evidence broker-boundary evidence and audit continuity", "Denied trading evidence requirement paths remain blocked", "Trading evidence requirement checklist")
