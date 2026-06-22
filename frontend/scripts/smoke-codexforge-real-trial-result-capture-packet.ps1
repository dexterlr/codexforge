param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1298 Real Trial Result Capture Packet" `
  -ScriptFile "smoke-codexforge-real-trial-result-capture-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-result-capture-packet" `
  -Route "src\app\real-trial-result-capture-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Result Capture Packet" `
  -RouteHref "/real-trial-result-capture-packet" `
  -Markers @("Real trial result capture packet", "Real trial result capture packet does not persist results", "Real trial result capture packet requires explicit operator approval", "Result capture packet lists success denied blocked failed timeout needs-review and manual-review states", "Denied real trial result paths remain blocked", "Real trial result capture checklist")
