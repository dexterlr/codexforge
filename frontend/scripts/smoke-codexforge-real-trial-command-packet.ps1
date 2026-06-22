param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1294 Real Trial Command Packet" `
  -ScriptFile "smoke-codexforge-real-trial-command-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-command-packet" `
  -Route "src\app\real-trial-command-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Command Packet" `
  -RouteHref "/real-trial-command-packet" `
  -Markers @("Real trial command packet", "Real trial command packet does not run commands", "Real trial command packet requires explicit operator approval", "Command packet shows allowlist arguments working directory environment names evidence result and recovery readiness", "Denied real trial command paths remain blocked", "Real trial command checklist")
