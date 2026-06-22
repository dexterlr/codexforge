param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1381 Manual Review Handling" `
  -ScriptFile "smoke-codexforge-manual-review-handling.ps1" `
  -Domain "src\lib\codexforge\manual-review-handling" `
  -Route "src\app\manual-review-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Manual Review Handling" `
  -RouteHref "/manual-review-handling" `
  -Markers @("Manual review handling", "Manual review handling does not execute recovery", "Manual review handling requires explicit operator approval", "Manual review handling previews review reasons blocked action summary evidence gaps result gaps audit gaps and next safe operator choices", "Manual review recovery remains blocked", "Manual review checklist")
