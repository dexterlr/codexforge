param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1685 Signal Invalidation Notes Preview" `
  -ScriptFile "smoke-codexforge-signal-invalidation-notes-preview.ps1" `
  -Domain "src\lib\codexforge\signal-invalidation-notes-preview" `
  -Route "src\app\signal-invalidation-notes-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Signal Invalidation Notes Preview" `
  -RouteHref "/signal-invalidation-notes-preview" `
  -Markers @("Signal invalidation notes preview", "Signal invalidation notes preview does not stop trades control brokers or automate exits from the UI", "Signal invalidation notes preview requires explicit operator approval", "Signal invalidation notes preview shows invalidation triggers thesis break risk breach data failure catalyst miss and operator review boundary", "Denied signal invalidation paths remain blocked", "Signal invalidation notes checklist")
