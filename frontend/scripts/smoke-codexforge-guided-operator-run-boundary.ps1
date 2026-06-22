param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1258 Guided Operator Run Boundary" `
  -ScriptFile "smoke-codexforge-guided-operator-run-boundary.ps1" `
  -Domain "src\lib\codexforge\guided-operator-run-boundary" `
  -Route "src\app\guided-operator-run-boundary" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Run Boundary" `
  -RouteHref "/guided-operator-run-boundary" `
  -Markers @("Guided operator run boundary", "Guided operator run boundary does not call models write files or run commands", "Guided operator run requires explicit operator approval", "Guided operator run unifies goal plan diff command approval holds evidence result recovery timeline and completion", "Denied guided operator run paths remain blocked", "Guided operator run checklist")
