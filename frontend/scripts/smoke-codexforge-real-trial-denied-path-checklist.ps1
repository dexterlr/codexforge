param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1302 Real Trial Denied Path Checklist" `
  -ScriptFile "smoke-codexforge-real-trial-denied-path-checklist.ps1" `
  -Domain "src\lib\codexforge\real-trial-denied-path-checklist" `
  -Route "src\app\real-trial-denied-path-checklist" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Denied Path Checklist" `
  -RouteHref "/real-trial-denied-path-checklist" `
  -Markers @("Real trial denied path checklist", "Real trial denied path checklist does not mutate workflow state", "Real trial denied path checklist requires explicit operator approval", "Denied path checklist lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion", "Denied real trial checklist paths remain blocked", "Real trial denied path checklist")
