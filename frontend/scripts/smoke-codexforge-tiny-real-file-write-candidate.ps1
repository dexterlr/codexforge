param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1355 Tiny Real File Write Candidate" `
  -ScriptFile "smoke-codexforge-tiny-real-file-write-candidate.ps1" `
  -Domain "src\lib\codexforge\tiny-real-file-write-candidate" `
  -Route "src\app\tiny-real-file-write-candidate" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real File Write Candidate" `
  -RouteHref "/tiny-real-file-write-candidate" `
  -Markers @("Tiny real file write candidate", "Tiny real file write candidate does not let the frontend write files directly", "Tiny real file write candidate requires explicit operator approval", "File write candidate is sandbox-bounded path-guarded diff-reviewed and backend-owned", "Denied tiny real file write paths remain blocked", "Tiny real file write checklist")
