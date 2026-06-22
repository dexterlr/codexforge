param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1300 Real Trial Audit Packet" `
  -ScriptFile "smoke-codexforge-real-trial-audit-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-audit-packet" `
  -Route "src\app\real-trial-audit-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Audit Packet" `
  -RouteHref "/real-trial-audit-packet" `
  -Markers @("Real trial audit packet", "Real trial audit packet does not persist audit logs", "Real trial audit packet requires explicit operator approval", "Audit packet lists goal context file write command approval hold evidence result recovery operator and denied-path placeholders", "Denied real trial audit paths remain blocked", "Real trial audit checklist")
