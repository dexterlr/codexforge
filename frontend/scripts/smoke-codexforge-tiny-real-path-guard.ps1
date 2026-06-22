param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1359 Tiny Real Path Guard" `
  -ScriptFile "smoke-codexforge-tiny-real-path-guard.ps1" `
  -Domain "src\lib\codexforge\tiny-real-path-guard" `
  -Route "src\app\tiny-real-path-guard" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Path Guard" `
  -RouteHref "/tiny-real-path-guard" `
  -Markers @("Tiny real path guard", "Tiny real path guard does not browse arbitrary files or write files from the frontend", "Tiny real path guard requires explicit operator approval", "Path guard checks workspace root containment traversal denial generated file policy binary guard and rollback readiness", "Denied tiny real path guard paths remain blocked", "Tiny real path guard checklist")
