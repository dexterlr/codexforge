param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1371 Denied Path Failure Handling" `
  -ScriptFile "smoke-codexforge-denied-path-failure-handling.ps1" `
  -Domain "src\lib\codexforge\denied-path-failure-handling" `
  -Route "src\app\denied-path-failure-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Denied Path Failure Handling" `
  -RouteHref "/denied-path-failure-handling" `
  -Markers @("Denied path failure handling", "Denied path failure handling does not mutate files", "Denied path failure handling requires explicit operator approval", "Denied path failure handling blocks traversal arbitrary files binary writes generated-file violations and workspace escape", "Denied path failure recovery remains blocked", "Denied path failure checklist")
