param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1297 Real Trial Evidence Capture Packet" `
  -ScriptFile "smoke-codexforge-real-trial-evidence-capture-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-evidence-capture-packet" `
  -Route "src\app\real-trial-evidence-capture-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Evidence Capture Packet" `
  -RouteHref "/real-trial-evidence-capture-packet" `
  -Markers @("Real trial evidence capture packet", "Real trial evidence capture packet does not persist evidence", "Real trial evidence capture packet requires explicit operator approval", "Evidence capture packet lists diff command stdout stderr exit code approval timestamp operator and audit placeholders", "Denied real trial evidence paths remain blocked", "Real trial evidence capture checklist")
