param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1370 Real Trial Hardening Boundary" `
  -ScriptFile "smoke-codexforge-real-trial-hardening-boundary.ps1" `
  -Domain "src\lib\codexforge\real-trial-hardening-boundary" `
  -Route "src\app\real-trial-hardening-boundary" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Real Trial Hardening Boundary" `
  -RouteHref "/real-trial-hardening-boundary" `
  -Markers @("Real trial hardening boundary", "Real trial hardening boundary does not broaden execution", "Real trial hardening requires explicit operator approval", "Hardening boundary keeps tiny real trial behind backend-owned guarded execution", "Denied real trial hardening paths remain blocked", "Real trial hardening checklist")
