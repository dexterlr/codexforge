param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1587 Trading Analysis Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-trading-analysis-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\trading-analysis-worker-profile-preview" `
  -Route "src\app\trading-analysis-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Trading Analysis Worker Profile Preview" `
  -RouteHref "/trading-analysis-worker-profile-preview" `
  -Markers @("Trading analysis worker profile preview", "Trading analysis worker profile preview does not provide financial advice place trades or call broker connectors from the UI", "Trading analysis worker profile preview requires explicit operator approval", "Trading analysis worker profile preview covers market data needs risk notes analysis evidence result audit disclaimers and denied trading actions", "Denied trading analysis worker paths remain blocked", "Trading analysis worker profile checklist")
