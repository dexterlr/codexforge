param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1702 Paper Evidence Map Preview" `
  -ScriptFile "smoke-codexforge-paper-evidence-map-preview.ps1" `
  -Domain "src\lib\codexforge\paper-evidence-map-preview" `
  -Route "src\app\paper-evidence-map-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Paper Evidence Map Preview" `
  -RouteHref "/paper-evidence-map-preview" `
  -Markers @("Paper evidence map preview", "Paper evidence map preview does not persist evidence audit results or paper trading decisions from the UI", "Paper evidence map preview requires backend-owned capture", "Paper evidence map preview shows strategy evidence dataset evidence backtest evidence paper trade evidence risk evidence approval evidence result state redaction and audit continuity", "Denied paper evidence map paths remain blocked", "Paper evidence map checklist")
