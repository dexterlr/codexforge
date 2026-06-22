param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1356 Tiny Real Command Candidate" `
  -ScriptFile "smoke-codexforge-tiny-real-command-candidate.ps1" `
  -Domain "src\lib\codexforge\tiny-real-command-candidate" `
  -Route "src\app\tiny-real-command-candidate" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Command Candidate" `
  -RouteHref "/tiny-real-command-candidate" `
  -Markers @("Tiny real command candidate", "Tiny real command candidate does not let the frontend run commands directly", "Tiny real command candidate requires explicit operator approval", "Command candidate is allowlisted argument-guarded working-directory-guarded timeout-bounded and backend-owned", "Denied tiny real command paths remain blocked", "Tiny real command checklist")
