param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1380 Operator Stop Handling" `
  -ScriptFile "smoke-codexforge-operator-stop-handling.ps1" `
  -Domain "src\lib\codexforge\operator-stop-handling" `
  -Route "src\app\operator-stop-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Operator Stop Handling" `
  -RouteHref "/operator-stop-handling" `
  -Markers @("Operator stop handling", "Operator stop handling does not kill processes from the UI", "Operator stop handling requires explicit operator approval", "Operator stop handling previews stop request acknowledgement backend halt boundary evidence capture result capture audit capture and manual review path", "Operator stop recovery remains blocked", "Operator stop checklist")
