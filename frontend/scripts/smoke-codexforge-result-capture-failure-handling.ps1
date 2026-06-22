param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1378 Result Capture Failure Handling" `
  -ScriptFile "smoke-codexforge-result-capture-failure-handling.ps1" `
  -Domain "src\lib\codexforge\result-capture-failure-handling" `
  -Route "src\app\result-capture-failure-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Result Capture Failure Handling" `
  -RouteHref "/result-capture-failure-handling" `
  -Markers @("Result capture failure handling", "Result capture failure handling does not persist results from the UI", "Result capture failure handling requires explicit operator approval", "Result capture failure handling previews missing success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states", "Result capture recovery remains blocked", "Result capture failure checklist")
