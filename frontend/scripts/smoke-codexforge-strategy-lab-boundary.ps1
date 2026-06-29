param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1674 Strategy Lab Boundary" `
  -ScriptFile "smoke-codexforge-strategy-lab-boundary.ps1" `
  -Domain "src\lib\codexforge\strategy-lab-boundary" `
  -Route "src\app\strategy-lab-boundary" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Strategy Lab Boundary" `
  -RouteHref "/strategy-lab-boundary" `
  -Markers @("Strategy lab boundary", "Strategy lab boundary does not execute signals connect brokers place trades fetch live market data provide financial advice or enable automation from the UI", "Strategy lab boundary requires explicit operator approval before any future strategy workflow", "Strategy lab boundary prepares backend-owned strategy and signal workflows without frontend trading execution", "Denied strategy lab paths remain blocked", "Strategy lab boundary checklist")
