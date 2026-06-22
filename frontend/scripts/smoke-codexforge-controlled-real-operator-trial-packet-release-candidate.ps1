param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1305 Controlled Real Operator Trial Packet Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-real-operator-trial-packet-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-real-operator-trial-packet-release-candidate" `
  -Route "src\app\controlled-real-operator-trial-packet-release-candidate" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Controlled Real Operator Trial Packet Release Candidate" `
  -RouteHref "/controlled-real-operator-trial-packet-release-candidate" `
  -Markers @("Controlled real operator trial packet release candidate", "Controlled real operator trial packet release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery", "Controlled real operator trial packet release requires explicit operator approval", "Release candidate prepares CodexForge for a future real controlled operator trial without executing it", "Denied controlled real operator trial packet paths remain blocked", "Controlled real operator trial packet release checklist")
