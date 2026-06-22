param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1375 Preflight Failure Handling" `
  -ScriptFile "smoke-codexforge-preflight-failure-handling.ps1" `
  -Domain "src\lib\codexforge\preflight-failure-handling" `
  -Route "src\app\preflight-failure-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Preflight Failure Handling" `
  -RouteHref "/preflight-failure-handling" `
  -Markers @("Preflight failure handling", "Preflight failure handling does not execute apply or run", "Preflight failure handling requires explicit operator approval", "Preflight failure handling checks goal plan diff command approval path guard command guard evidence result audit recovery and queue readiness", "Preflight recovery remains blocked", "Preflight failure checklist")
