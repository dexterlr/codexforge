param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1273 Controlled Guided Operator Run Hardening Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-guided-operator-run-hardening-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-guided-operator-run-hardening-release-candidate" `
  -Route "src\app\controlled-guided-operator-run-hardening-release-candidate" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Controlled Guided Operator Run Hardening Release Candidate" `
  -RouteHref "/controlled-guided-operator-run-hardening-release-candidate" `
  -Markers @("Controlled guided operator run hardening release candidate", "Controlled guided operator run hardening release candidate does not call models write files run commands persist results or execute recovery", "Controlled guided operator run hardening release requires explicit operator approval", "Release candidate makes the first guided operator run safer clearer and easier to use", "Denied controlled guided operator run paths remain blocked", "Controlled guided operator run hardening release checklist")
