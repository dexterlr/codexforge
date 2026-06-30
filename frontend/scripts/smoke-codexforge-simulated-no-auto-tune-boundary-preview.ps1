param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1814 Simulated No Auto Tune Boundary Preview" `
  -ScriptFile "smoke-codexforge-simulated-no-auto-tune-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-no-auto-tune-boundary-preview" `
  -Route "src\app\simulated-no-auto-tune-boundary-preview" `
  -CommandLabel "Go to Simulated No Auto Tune Boundary Preview" `
  -RouteHref "/simulated-no-auto-tune-boundary-preview" `
  -Markers @("Simulated no auto tune boundary preview", "Simulated no auto tune boundary preview blocks automatic parameter optimisation strategy promotion live signal generation and execution routing from the UI", "Simulated no auto tune boundary preview requires explicit operator approval for any future strategy change workflow", "Simulated no auto tune boundary preview shows denied auto tune denied auto promote denied live signal denied execution routing and backend-owned review boundary", "Denied simulated no auto tune paths remain blocked", "Simulated no auto tune boundary checklist")
