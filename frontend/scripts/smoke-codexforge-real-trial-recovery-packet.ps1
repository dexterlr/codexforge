param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1299 Real Trial Recovery Packet" `
  -ScriptFile "smoke-codexforge-real-trial-recovery-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-recovery-packet" `
  -Route "src\app\real-trial-recovery-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Recovery Packet" `
  -RouteHref "/real-trial-recovery-packet" `
  -Markers @("Real trial recovery packet", "Real trial recovery packet does not execute recovery", "Real trial recovery packet requires explicit operator approval", "Recovery packet lists rollback retry stop restore explain-failure and manual-review options as blocked previews", "Denied real trial recovery paths remain blocked", "Real trial recovery checklist")
