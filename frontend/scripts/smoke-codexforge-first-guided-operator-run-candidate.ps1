param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1272 First Guided Operator Run Candidate" `
  -ScriptFile "smoke-codexforge-first-guided-operator-run-candidate.ps1" `
  -Domain "src\lib\codexforge\first-guided-operator-run-candidate" `
  -Route "src\app\first-guided-operator-run-candidate" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to First Guided Operator Run Candidate" `
  -RouteHref "/first-guided-operator-run-candidate" `
  -Markers @("First guided operator run candidate", "First guided operator run candidate does not call models write files run commands persist evidence or execute recovery", "First guided operator run candidate requires explicit operator approval", "Candidate combines goal confirmation plan review diff review command review approval holds evidence result recovery timeline friction safety and completion", "Denied first guided operator run paths remain blocked", "First guided operator run checklist")
