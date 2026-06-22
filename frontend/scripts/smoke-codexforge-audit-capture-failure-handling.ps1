param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1379 Audit Capture Failure Handling" `
  -ScriptFile "smoke-codexforge-audit-capture-failure-handling.ps1" `
  -Domain "src\lib\codexforge\audit-capture-failure-handling" `
  -Route "src\app\audit-capture-failure-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Audit Capture Failure Handling" `
  -RouteHref "/audit-capture-failure-handling" `
  -Markers @("Audit capture failure handling", "Audit capture failure handling does not persist audit logs from the UI", "Audit capture failure handling requires explicit operator approval", "Audit capture failure handling previews missing goal plan diff apply command approval evidence result recovery queue operator and denied-path records", "Audit capture recovery remains blocked", "Audit capture failure checklist")
