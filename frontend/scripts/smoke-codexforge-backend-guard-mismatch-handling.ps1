param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1376 Backend Guard Mismatch Handling" `
  -ScriptFile "smoke-codexforge-backend-guard-mismatch-handling.ps1" `
  -Domain "src\lib\codexforge\backend-guard-mismatch-handling" `
  -Route "src\app\backend-guard-mismatch-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Backend Guard Mismatch Handling" `
  -RouteHref "/backend-guard-mismatch-handling" `
  -Markers @("Backend guard mismatch handling", "Backend guard mismatch handling does not release execution", "Backend guard mismatch handling requires explicit operator approval", "Backend guard mismatch handling blocks route mismatch packet mismatch approval mismatch path guard mismatch command guard mismatch and evidence contract mismatch", "Backend guard mismatch recovery remains blocked", "Backend guard mismatch checklist")
