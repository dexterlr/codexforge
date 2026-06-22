param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1372 Denied Command Failure Handling" `
  -ScriptFile "smoke-codexforge-denied-command-failure-handling.ps1" `
  -Domain "src\lib\codexforge\denied-command-failure-handling" `
  -Route "src\app\denied-command-failure-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Denied Command Failure Handling" `
  -RouteHref "/denied-command-failure-handling" `
  -Markers @("Denied command failure handling", "Denied command failure handling does not run commands", "Denied command failure handling requires explicit operator approval", "Denied command failure handling blocks non-allowlisted commands unsafe arguments unsafe working directories hidden environment access and shell escalation", "Denied command recovery remains blocked", "Denied command failure checklist")
