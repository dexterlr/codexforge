param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1354 Tiny Real Controlled Trial Boundary" `
  -ScriptFile "smoke-codexforge-tiny-real-controlled-trial-boundary.ps1" `
  -Domain "src\lib\codexforge\tiny-real-controlled-trial-boundary" `
  -Route "src\app\tiny-real-controlled-trial-boundary" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Controlled Trial Boundary" `
  -RouteHref "/tiny-real-controlled-trial-boundary" `
  -Markers @("Tiny real controlled trial boundary", "Tiny real controlled trial boundary does not allow broad execution", "Tiny real controlled trial requires explicit operator approval", "Tiny real controlled trial separates cockpit preview from backend-owned guarded execution", "Denied tiny real controlled trial paths remain blocked", "Tiny real controlled trial checklist")
