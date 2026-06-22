param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1290 Real Controlled Operator Trial Packet Boundary" `
  -ScriptFile "smoke-codexforge-real-controlled-operator-trial-packet-boundary.ps1" `
  -Domain "src\lib\codexforge\real-controlled-operator-trial-packet-boundary" `
  -Route "src\app\real-controlled-operator-trial-packet-boundary" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Controlled Operator Trial Packet Boundary" `
  -RouteHref "/real-controlled-operator-trial-packet-boundary" `
  -Markers @("Real controlled operator trial packet boundary", "Real controlled operator trial packet boundary does not execute the real trial", "Real controlled operator trial packet requires explicit operator approval", "Trial packet prepares goal context file write command approval hold evidence result recovery and audit", "Denied real controlled operator trial paths remain blocked", "Real controlled operator trial packet checklist")
