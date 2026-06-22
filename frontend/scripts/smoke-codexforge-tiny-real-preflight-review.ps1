param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1361 Tiny Real Preflight Review" `
  -ScriptFile "smoke-codexforge-tiny-real-preflight-review.ps1" `
  -Domain "src\lib\codexforge\tiny-real-preflight-review" `
  -Route "src\app\tiny-real-preflight-review" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Preflight Review" `
  -RouteHref "/tiny-real-preflight-review" `
  -Markers @("Tiny real preflight review", "Tiny real preflight review does not execute apply or run", "Tiny real preflight review requires explicit operator approval", "Preflight review verifies goal plan diff command approval ticket path guard command guard evidence result audit and recovery readiness", "Denied tiny real preflight paths remain blocked", "Tiny real preflight checklist")
