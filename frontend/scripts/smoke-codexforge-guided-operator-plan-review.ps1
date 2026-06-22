param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1260 Guided Operator Plan Review" `
  -ScriptFile "smoke-codexforge-guided-operator-plan-review.ps1" `
  -Domain "src\lib\codexforge\guided-operator-plan-review" `
  -Route "src\app\guided-operator-plan-review" `
  -MainPanel "GuidedOperatorRunRoutePanel" `
  -CommandLabel "Go to Guided Operator Plan Review" `
  -RouteHref "/guided-operator-plan-review" `
  -Markers @("Guided operator plan review", "Guided operator plan review does not execute plans", "Guided operator plan review requires explicit operator approval before future execution", "Plan review explains intended file changes commands risks evidence result and recovery in plain language", "Denied guided operator plan paths remain blocked", "Guided operator plan review checklist")
