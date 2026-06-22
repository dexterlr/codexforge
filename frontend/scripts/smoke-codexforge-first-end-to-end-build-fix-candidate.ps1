param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1256 First End-to-End Build Fix Candidate" `
  -ScriptFile "smoke-codexforge-first-end-to-end-build-fix-candidate.ps1" `
  -Domain "src\lib\codexforge\first-end-to-end-build-fix-candidate" `
  -Route "src\app\first-end-to-end-build-fix-candidate" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to First End to End Build Fix Candidate" `
  -RouteHref "/first-end-to-end-build-fix-candidate" `
  -Markers @("First end-to-end build fix candidate", "First end-to-end build fix candidate does not call models write files run commands persist evidence or execute recovery", "First end-to-end build fix candidate requires explicit operator approval", "Candidate combines goal context plan diff command risk approval holds evidence result recovery audit and cockpit flow", "Denied first end-to-end build fix paths remain blocked", "First end-to-end build fix checklist")
