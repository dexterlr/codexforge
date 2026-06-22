param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1295 Real Trial Approval Packet" `
  -ScriptFile "smoke-codexforge-real-trial-approval-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-approval-packet" `
  -Route "src\app\real-trial-approval-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Approval Packet" `
  -RouteHref "/real-trial-approval-packet" `
  -Markers @("Real trial approval packet", "Real trial approval packet does not approve actions or persist approvals", "Real trial approval packet requires explicit human approval", "Approval packet explains exactly what would be approved and what remains blocked", "Denied real trial approval paths remain blocked", "Real trial approval checklist")
