param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1686 Strategy Evidence Map Preview" `
  -ScriptFile "smoke-codexforge-strategy-evidence-map-preview.ps1" `
  -Domain "src\lib\codexforge\strategy-evidence-map-preview" `
  -Route "src\app\strategy-evidence-map-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Strategy Evidence Map Preview" `
  -RouteHref "/strategy-evidence-map-preview" `
  -Markers @("Strategy evidence map preview", "Strategy evidence map preview does not persist evidence audit results or trading decisions from the UI", "Strategy evidence map preview requires backend-owned capture", "Strategy evidence map preview shows hypothesis evidence indicator evidence signal evidence risk evidence backtest evidence paper-trade evidence approval evidence and audit continuity", "Denied strategy evidence map paths remain blocked", "Strategy evidence map checklist")
