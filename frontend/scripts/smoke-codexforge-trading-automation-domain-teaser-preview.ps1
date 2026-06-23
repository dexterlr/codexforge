param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1637 Trading Automation Domain Teaser Preview" `
  -ScriptFile "smoke-codexforge-trading-automation-domain-teaser-preview.ps1" `
  -Domain "src\lib\codexforge\trading-automation-domain-teaser-preview" `
  -Route "src\app\trading-automation-domain-teaser-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Trading Automation Domain Teaser Preview" `
  -RouteHref "/trading-automation-domain-teaser-preview" `
  -Markers @("Trading automation domain teaser preview", "Trading automation domain teaser preview does not connect brokers place trades provide financial advice or execute orders from the UI", "Trading automation domain teaser preview requires explicit operator approval", "Trading automation domain teaser preview shows capital-limited automation profit lockbox reinvestment rules paper trading backtesting risk governor broker approval boundary and no guaranteed profit claims", "Denied trading automation teaser paths remain blocked", "Trading automation domain teaser checklist")
