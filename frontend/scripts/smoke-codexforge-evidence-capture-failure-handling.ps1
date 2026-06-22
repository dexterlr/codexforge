param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1377 Evidence Capture Failure Handling" `
  -ScriptFile "smoke-codexforge-evidence-capture-failure-handling.ps1" `
  -Domain "src\lib\codexforge\evidence-capture-failure-handling" `
  -Route "src\app\evidence-capture-failure-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Evidence Capture Failure Handling" `
  -RouteHref "/evidence-capture-failure-handling" `
  -Markers @("Evidence capture failure handling", "Evidence capture failure handling does not persist evidence from the UI", "Evidence capture failure handling requires explicit operator approval", "Evidence capture failure handling previews missing stdout stderr exit code diff approval redaction operator audit and queue references", "Evidence capture recovery remains blocked", "Evidence capture failure checklist")
