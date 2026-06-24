param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1654 Trading Evidence Audit Preview" `
  -ScriptFile "smoke-codexforge-trading-evidence-audit-preview.ps1" `
  -Domain "src\lib\codexforge\trading-evidence-audit-preview" `
  -Route "src\app\trading-evidence-audit-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Evidence Audit Preview" `
  -RouteHref "/trading-evidence-audit-preview" `
  -Markers @("Trading evidence audit preview", "Trading evidence audit preview does not persist evidence or audit from the UI", "Trading evidence audit preview requires backend-owned capture", "Trading evidence audit preview shows thesis evidence risk evidence backtest evidence paper-trade evidence broker approval evidence result state redaction and audit continuity", "Denied trading evidence audit paths remain blocked", "Trading evidence audit checklist")
