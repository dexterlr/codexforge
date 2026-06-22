param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1301 Real Trial Operator Checklist" `
  -ScriptFile "smoke-codexforge-real-trial-operator-checklist.ps1" `
  -Domain "src\lib\codexforge\real-trial-operator-checklist" `
  -Route "src\app\real-trial-operator-checklist" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Operator Checklist" `
  -RouteHref "/real-trial-operator-checklist" `
  -Markers @("Real trial operator checklist", "Real trial operator checklist does not mark real work complete", "Real trial operator checklist requires explicit operator approval", "Operator checklist confirms goal context file write command approval hold evidence result recovery audit and denied paths", "Denied real trial operator checklist paths remain blocked", "Real trial operator checklist")
