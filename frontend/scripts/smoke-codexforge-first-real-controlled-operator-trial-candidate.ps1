param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1304 First Real Controlled Operator Trial Candidate" `
  -ScriptFile "smoke-codexforge-first-real-controlled-operator-trial-candidate.ps1" `
  -Domain "src\lib\codexforge\first-real-controlled-operator-trial-candidate" `
  -Route "src\app\first-real-controlled-operator-trial-candidate" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to First Real Controlled Operator Trial Candidate" `
  -RouteHref "/first-real-controlled-operator-trial-candidate" `
  -Markers @("First real controlled operator trial candidate", "First real controlled operator trial candidate does not execute the real trial", "First real controlled operator trial candidate requires explicit operator approval", "Candidate combines goal context file write command approval hold evidence result recovery audit operator checklist denied path checklist and go no-go review", "Denied first real controlled operator trial paths remain blocked", "First real controlled operator trial checklist")
